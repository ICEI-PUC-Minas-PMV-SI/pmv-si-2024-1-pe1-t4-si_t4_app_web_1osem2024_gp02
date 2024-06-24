let transactions = [];
let selectedMonthYear = new Date();

renderSelectedMonthYear();
renderAlerts();

function getCorrectDate(date) {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day);
}

function getTransactionFromThisMonth() {
    return transactions.filter((t) => {
        const [year, month] = t.date.split("-");
        return (
            parseInt(year, 10) === selectedMonthYear.getFullYear() &&
            parseInt(month, 10) === selectedMonthYear.getMonth() + 1
        );
    });
}

function renderSelectedMonthYear() {
    const selectedMonthYearSpan = document.getElementById("monthYear");
    const dateText = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
    }).format(selectedMonthYear);
    selectedMonthYearSpan.textContent =
        dateText.charAt(0).toUpperCase() + dateText.slice(1);
}

function renderResultFromMonth() {
    const monthResult = document.getElementById("monthResult");

    const currentMonthTransactions = getTransactionFromThisMonth();

    const resultWrapper = document.getElementById("resultWrapper");
    if (currentMonthTransactions.length === 0) {
        resultWrapper.style.display = "none";
        return;
    }

    resultWrapper.style.display = "flex";

    const totalIncome = currentMonthTransactions
        .filter((t) => t.type === "Receita")
        .reduce((acc, t) => acc + t.value, 0);
    const totalExpense = currentMonthTransactions
        .filter((t) => t.type === "Despesa")
        .reduce((acc, t) => acc + t.value, 0);
    const balance = totalIncome - totalExpense;

    monthResult.innerHTML = `${balance < 0 ? "-" : "+"} R$ ${Math.abs(
        balance
    ).toFixed(2)}`;
    monthResult.className = balance < 0 ? "negative" : "positive";
}

function changeMonthYear(increment) {
    selectedMonthYear.setMonth(selectedMonthYear.getMonth() + increment);
    updateUI();
}

function renderAlerts() {
    const alerts = document.getElementById("transactionAlerts");

    const unpaidTransactions = transactions.filter((t) => {
        return (
            !t.wasPaid && getCorrectDate(t.date).getTime() <= new Date().getTime()
        );
    });

    alerts.innerHTML = ``;

    if (unpaidTransactions.length) {
        const div = document.createElement("div");
        div.className = "transaction-alert";
        div.innerHTML = `<i class="fas fa-exclamation"  style="font-size: 12px;"></i><span>Você tem ${unpaidTransactions.length} transação(ões) pendente(s) de pagamento.</span>`;
        alerts.appendChild(div);
    }
}

function updateUI() {
    renderSelectedMonthYear();
    renderAlerts();
    renderTransactions();
    renderResultFromMonth();
}

function renderTransactions() {
    const currentMonthTransactions = transactions.filter((t) => {
        const [year, month] = t.date.split("-");
        return (
            parseInt(year, 10) === selectedMonthYear.getFullYear() &&
            parseInt(month, 10) === selectedMonthYear.getMonth() + 1
        );
    });

    const list = document.getElementById("transactionsList");
    list.innerHTML = ""; // Limpa a lista existente
    if (currentMonthTransactions.length === 0) {
        list.innerHTML =
            '<p style="text-align: center">Nenhuma transação cadastrada para esse mês.</p>';
    } else {
        currentMonthTransactions.forEach((transaction) => {
            const [year, month, day] = transaction.date.split("-");

            const date = new Date(year, month - 1, day);
            const isDateValid = !isNaN(date.getTime());
            const formattedDate = isDateValid
                ? new Intl.DateTimeFormat("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                }).format(date)
                : "";

            const div = document.createElement("div");
            div.className = `transaction-item ${
                transaction.type === "Receita" ? "income" : "expense"
            }`;
            div.innerHTML = `
                <div class="transaction-item-content">
                    <div class="transaction-type-bg ${
                transaction.type === "Receita" ? "income" : "expense"
            }">
                        <i class="fas ${
                transaction.type === "Receita"
                    ? "fa-arrow-down"
                    : "fa-arrow-up"
            }"></i>
                    </div>
                    
                    <div class="transaction-item-desc-value">
                        <div class="transaction-description">${
                transaction.description
            }</div>
                        <div class="transaction-value ${
                transaction.type === "Receita" ? "income" : "expense"
            }">${transaction.type === "Receita" ? "+" : "-"} R$ ${
                transaction.value
            }</div>
                    </div>

                    <div class="transaction-category">${
                transaction.category
            }</div>
                    
                    <div class="transaction-date">${formattedDate}</div>
                </div>
                
                <div>
                    <div class="transaction-actions">
                        <button class="change-was-paid ${
                transaction.wasPaid ? "paid" : "unpaid"
            }" onclick="changeWasPaid(${
                transaction.id
            })"><i class="fas ${
                transaction.wasPaid ? "fa-thumbs-up" : "fa-thumbs-down"
            }"></i></button>
                        <button class="remove" onclick="confirmDeletion(${
                transaction.id
            })"><i class="fas fa-trash"></i></button>
                        <button class="edit" onclick="showModal('${
                transaction.type === "Receita"
                    ? "editIncomeModal"
                    : "editExpenseModal"
            }', ${transaction.type === "Receita"}, ${
                transaction.id
            })"><i class="fas fa-pen"></i></button>
                    </div>
                </div>
            `;

            list.appendChild(div);
        });
    }
}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
    const storedTransactions = localStorage.getItem("transactions");
    transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
}

function saveEditedTransaction() {
    const isIncome = document.getElementById("editIncomeId").value !== "";
    const prefix = isIncome ? "editIncome" : "editExpense";

    const description = document
        .getElementById(prefix + "Description")
        .value.trim();
    const value = parseFloat(document.getElementById(prefix + "Value").value);
    const date = document.getElementById(`${prefix}Date`).value;
    const category = document.getElementById(`${prefix}Category`).value;

    console.log(`Saving ${isIncome ? "Income" : "Expense"}: `, {
        description,
        value,
    });

    if (!description) {
        alert("Por favor, digite uma descrição.");
        return;
    }

    if (isNaN(value)) {
        alert("Por favor, digite um valor válido.");
        return;
    }

    if (isNaN(new Date(date))) {
        alert("Por favor, digite uma data válida.");
        return;
    }

    if (!category) {
        alert("Por favor, selecione uma categoria.");
        return;
    }

    const id = document.getElementById(`${prefix}Id`).value;

    const wasPaid = document.getElementById(prefix + "WasPaid").checked;

    const transactionIndex = transactions.findIndex(
        (t) => t.id === parseInt(id, 10)
    );
    if (transactionIndex !== -1) {
        transactions[transactionIndex] = {
            id: parseInt(id, 10),
            type: transactions[transactionIndex].type,
            description,
            value,
            date,
            category,
            wasPaid,
        };
        saveToLocalStorage();
        updateUI();
        hideModal(isIncome ? "editIncomeModal" : "editExpenseModal");
    } else {
        alert("Transação não encontrada.");
    }
}

function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveToLocalStorage(); // salva depois de deletar
    updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    updateUI();
});

function clearModal(isIncome) {
    var prefix = isIncome ? "editIncome" : "editExpense";
    document.getElementById(prefix + "Description").value = "";
    document.getElementById(prefix + "Value").value = "";
    document.getElementById(prefix + "Date").value = "";
    document.getElementById(prefix + "Category").selectedIndex = 0;
    document.getElementById(prefix + "Id").value = "";
    console.log("Modal cleared for: " + (isIncome ? "Income" : "Expense"));
}

function showModal(modalId, isIncome, transactionId) {
    clearModal(isIncome); // Limpa modal antes de qualquer coisa
    if (transactionId !== undefined) {
        const transaction = transactions.find((t) => t.id === transactionId);
        if (!transaction) {
            alert("Transação não encontrada.");
            return;
        }
        // Configura os campos do modal com os valores da transação
        const prefix = isIncome ? "editIncome" : "editExpense";
        document.getElementById(prefix + "Description").value =
            transaction.description;
        document.getElementById(prefix + "Value").value = transaction.value;
        document.getElementById(prefix + "Date").value = transaction.date;
        document.getElementById(prefix + "Category").value = transaction.category;
        document.getElementById(prefix + "Id").value = transaction.id;
        document.getElementById(prefix + "WasPaid").checked = transaction.wasPaid;
    }
    document.getElementById(modalId).style.display = "flex";
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    console.log("Modal hidden: " + modalId);
}

function addIncome() {
    const description = document.getElementById("incomeDescription").value;
    const value = parseFloat(document.getElementById("incomeValue").value);
    const date = document.getElementById("incomeDate").value;
    const category = document.getElementById("incomeCategory").value || "N/A";
    const wasPaid = document.getElementById("incomeWasPaid").checked || false;

    if (!description) {
        alert("Por favor, digite uma descrição.");
        return;
    }

    if (isNaN(value)) {
        alert("Por favor, digite um valor válido.");
        return;
    }

    if (isNaN(new Date(date))) {
        alert("Por favor, digite uma data válida.");
        return;
    }

    if (!category) {
        alert("Por favor, selecione uma categoria.");
        return;
    }

    transactions.push({
        id: transactions.length,
        type: "Receita",
        description,
        value,
        date,
        category,
        wasPaid,
    });
    saveToLocalStorage();
    updateUI();
    hideModal("addIncomeModal");
}

function addExpense() {
    const description = document.getElementById("expenseDescription").value;
    const value = parseFloat(document.getElementById("expenseValue").value);
    const date = document.getElementById("expenseDate").value;
    const category = document.getElementById("expenseCategory").value || "N/A";
    const wasPaid = document.getElementById("expenseWasPaid").checked || false;

    if (!description) {
        alert("Por favor, digite uma descrição.");
        return;
    }

    if (isNaN(value)) {
        alert("Por favor, digite um valor válido.");
        return;
    }

    if (isNaN(new Date(date))) {
        alert("Por favor, digite uma data válida.");
        return;
    }

    if (!category) {
        alert("Por favor, selecione uma categoria.");
        return;
    }

    transactions.push({
        id: transactions.length,
        type: "Despesa",
        description,
        value,
        date,
        category,
        wasPaid,
    });
    saveToLocalStorage();
    updateUI();
    hideModal("addExpenseModal");
}

function confirmDeletion(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
        const confirmMessage = `Você deseja realmente remover esta transação: ${transaction.description} - R$${transaction.value}?`;
        document.getElementById("removalConfirmationText").textContent =
            confirmMessage;
        showModal("confirmRemovalModal");
        transactionToRemove = id; // Armazena o ID da transação a ser removida
    }
}

function changeWasPaid(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
        transaction.wasPaid = !transaction.wasPaid;
        saveToLocalStorage();
        updateUI();
    }
}

function deleteConfirmedTransaction() {
    deleteTransaction(transactionToRemove);
    hideModal("confirmRemovalModal");
}
