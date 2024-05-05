document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("Sidebar");
  var menuButton = document.querySelector(".menu");
  var buttons = document.querySelectorAll('.menu-btn');
  var sections = {
    'resumoBtn': 'resumoSection',
    'transacoesBtn': 'transacoesSection',
    'metasBtn': 'metasSection'
  };
  var conteudoPrincipal = document.getElementById('conteudoPrincipal');

  function toggleSection(buttonId) {
    Object.keys(sections).forEach(function(key) {
      document.getElementById(sections[key]).classList.add('hidden');
    });
    if (document.getElementById(sections[buttonId]).classList.contains('hidden')) {
      document.getElementById(sections[buttonId]).classList.remove('hidden');
      conteudoPrincipal.classList.add('hidden');
    } else {
      conteudoPrincipal.classList.remove('hidden');
    }
  }

  function activateButton(button) {
    buttons.forEach(function(btn) {
      btn.classList.remove('green-button');
    });
    button.classList.add('green-button');
  }

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      toggleSection(this.id);
      activateButton(this);
    });
  });

  menuButton.addEventListener('click', function() {
    sidebar.style.display = (sidebar.style.display === 'flex') ? 'none' : 'flex';
  });

  window.addEventListener('click', function(event) {
    if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.style.display = 'none';
    }
  });
});


let transactions = [];
    let nextId = 1;  // Inicia IDs a partir de 1
    let currentTransactionType = '';
    
    function renderTransactions() {
      const list = document.getElementById('transactionsList');
      list.innerHTML = ''; // Limpa a lista existente
      transactions.forEach(transaction => {
          const div = document.createElement('div');
          div.className = `transaction-item ${transaction.type === 'Receita' ? 'income' : 'expense'}`;
          div.innerHTML = `
              <div class="transaction-type"><strong>Tipo:</strong> ${transaction.type}</div>
              <div class="transaction-description"><strong>Descrição:</strong> ${transaction.description}</div>
              <div class="transaction-value"><strong>Valor:</strong> R$ ${transaction.value}</div>
              <div class="transaction-date"><strong>Data:</strong> ${transaction.date}</div>
              <div class="transaction-category"><strong>Categoria:</strong> ${transaction.category}</div>
              <div class="transaction-actions">
                  <button class="edit" onclick="showModal('${transaction.type === 'Receita' ? 'editIncomeModal' : 'editExpenseModal'}', ${transaction.type === 'Receita'}, ${transaction.id})"><i class="fas fa-edit"></i> Editar</button>
                  <button class="remove" onclick="confirmDeletion(${transaction.id})"><i class="fas fa-trash"></i> Remover</button>
              </div>
          `;
          list.appendChild(div);
      });
  }
  
    function saveToLocalStorage() {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('nextId', nextId.toString());
    }

    function loadFromLocalStorage() {
      const storedTransactions = localStorage.getItem('transactions');
      const storedNextId = localStorage.getItem('nextId');
      transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
      nextId = storedNextId ? parseInt(storedNextId, 10) : 1;
    }

    function showAddTransactionForm(type) {
      currentTransactionType = type;
      document.getElementById('transactionForm').classList.remove('hidden');
      document.getElementById('categoria').value = '';
      document.getElementById('valor').value = '';
      document.getElementById('transacaoId').value = '';
    }

    function editTransaction(id) {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction) {
        console.error('Transação não encontrada.');
        return;
      }
    
      if (transaction.type === 'Receita') {
        document.getElementById('editIncomeDescription').value = transaction.description || '';
        document.getElementById('editIncomeValue').value = transaction.value || '';
        document.getElementById('editIncomeDate').value = transaction.date || '';
        document.getElementById('editIncomeCategory').value = transaction.category || '';
        document.getElementById('editIncomeId').value = id;
        showModal('editIncomeModal');
      } else if (transaction.type === 'Despesa') {
        document.getElementById('editExpenseDescription').value = transaction.description || '';
        document.getElementById('editExpenseValue').value = transaction.value || '';
        document.getElementById('editExpenseDate').value = transaction.date || '';
        document.getElementById('editExpenseCategory').value = transaction.category || '';
        document.getElementById('editExpenseId').value = id;
        showModal('editExpenseModal');
      }
    }
    
    function saveEditedTransaction() {
      const isIncome = document.getElementById('editIncomeId').value !== '';
      const prefix = isIncome ? 'editIncome' : 'editExpense';
      const description = document.getElementById(prefix + 'Description').value.trim();
      const value = parseFloat(document.getElementById(prefix + 'Value').value);
      
      console.log(`Saving ${isIncome ? "Income" : "Expense"}: `, { description, value });
    
      if (!description || isNaN(value)) {
        alert('Por favor, digite uma descrição e um valor válidos.');
        return;
      }
    
      const id = document.getElementById(`${prefix}Id`).value;
      const date = document.getElementById(`${prefix}Date`).value;
      const category = document.getElementById(`${prefix}Category`).value;
    
      const transactionIndex = transactions.findIndex(t => t.id === parseInt(id, 10));
      if (transactionIndex !== -1) {
        transactions[transactionIndex] = {
          id: parseInt(id, 10),
          type: transactions[transactionIndex].type,
          description,
          value,
          date,
          category
        };
        saveToLocalStorage();
        renderTransactions();
        hideModal(isIncome ? 'editIncomeModal' : 'editExpenseModal');
      } else {
        alert('Transação não encontrada.');
      }
    }
    
    
    
    function saveTransaction() {
      const id = document.getElementById('transacaoId').value;
      const category = document.getElementById('categoria').value;
      const value = parseFloat(document.getElementById('valor').value);
      if (id) {
        const transaction = transactions.find(t => t.id === parseInt(id, 10));
        transaction.category = category;
        transaction.value = value;
        transaction.type = currentTransactionType;
      } else {
        transactions.push({ id: nextId++, type: currentTransactionType, category, value });
      }
      saveToLocalStorage();  //salva
      renderTransactions();
      hideTransactionForm();
    }

    function deleteTransaction(id) {
      transactions = transactions.filter(t => t.id !== id);
      saveToLocalStorage();  // salva depois de deletar
      renderTransactions();
    }

    function hideTransactionForm() {
      document.getElementById('transactionForm').classList.add('hidden');
    }

    document.addEventListener('DOMContentLoaded', () => {
      loadFromLocalStorage();
      renderTransactions();
    });

    function clearModal(isIncome) {
      var prefix = isIncome ? 'editIncome' : 'editExpense';
      document.getElementById(prefix + 'Description').value = '';
      document.getElementById(prefix + 'Value').value = '';
      document.getElementById(prefix + 'Date').value = '';
      document.getElementById(prefix + 'Category').selectedIndex = 0;
      document.getElementById(prefix + 'Id').value = '';
      console.log("Modal cleared for: " + (isIncome ? "Income" : "Expense"));
    }

    function showModal(modalId, isIncome, transactionId) {
      clearModal(isIncome);  // Limpa modal antes de qualquer coisa
      if (transactionId !== undefined) {
        const transaction = transactions.find(t => t.id === transactionId);
        if (!transaction) {
          alert('Transação não encontrada.');
          return;
        }
        // Configura os campos do modal com os valores da transação
        const prefix = isIncome ? 'editIncome' : 'editExpense';
        document.getElementById(prefix + 'Description').value = transaction.description;
        document.getElementById(prefix + 'Value').value = transaction.value;
        document.getElementById(prefix + 'Date').value = transaction.date;
        document.getElementById(prefix + 'Category').value = transaction.category;
        document.getElementById(prefix + 'Id').value = transaction.id;
      }
      document.getElementById(modalId).style.display = 'block';
    }
    
    

function hideModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  console.log("Modal hidden: " + modalId);
}

    function addIncome() {
      const description = document.getElementById('incomeDescription').value;
      const value = parseFloat(document.getElementById('incomeValue').value);
      const date = document.getElementById('incomeDate').value;
      const category = document.getElementById('incomeCategory').value || 'N/A';
      if (!description || isNaN(value)) {
        alert('Por favor, digite uma descrição e um valor válido.');
        return;
      }
      transactions.push({ id: nextId++, type: 'Receita', description, value, date, category });
      saveToLocalStorage();
      renderTransactions();
      hideModal('addIncomeModal');
    }

    function addExpense() {
      const description = document.getElementById('expenseDescription').value;
      const value = parseFloat(document.getElementById('expenseValue').value);
      const date = document.getElementById('expenseDate').value;
      const category = document.getElementById('expenseCategory').value || 'N/A';
      if (!description || isNaN(value)) {
        alert('Por favor, digite uma descrição e um valor válido.');
        return;
      }
      transactions.push({ id: nextId++, type: 'Despesa', description, value, date, category });
      saveToLocalStorage();
      renderTransactions();
      hideModal('addExpenseModal');
    }

    function confirmDeletion(id) {
      const transaction = transactions.find(t => t.id === id);
      if (transaction) {
        const confirmMessage = `Você deseja realmente remover esta transação: ${transaction.description} - R$${transaction.value}?`;
        document.getElementById('removalConfirmationText').textContent = confirmMessage;
        showModal('confirmRemovalModal');
        transactionToRemove = id; // Armazena o ID da transação a ser removida
      }
    }
    
    function deleteConfirmedTransaction() {
      deleteTransaction(transactionToRemove);
      hideModal('confirmRemovalModal');
    }