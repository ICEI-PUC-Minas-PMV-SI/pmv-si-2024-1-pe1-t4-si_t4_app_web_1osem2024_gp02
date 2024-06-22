let transactions = [];

let selectedMonthYear = new Date();
let selectedGoal = null;

let goals = {
    total: 0,
    market: 0,
    leisure: 0,
    health: 0,
    transport: 0,
    education: 0,
    house: 0,
    selfcare: 0,
    travel: 0,
};

const colorByCategory = {
    'market': 'red',
    'leisure': 'yellow',
    'health': 'blue',
    'transport': 'green',
    'education': 'black',
    'house': 'purple',
    'selfcare': 'light-blue',
    'travel': 'pink',
}

const GoalsToReadable = {
    'market': 'Mercado',
    'leisure': 'Lazer',
    'health': 'Saúde',
    'transport': 'Transporte',
    'education': 'Educação',
    'house': 'Casa',
    'selfcare': 'Cuidados Pessoais',
    'travel': 'Viagem',
}

function loadTransactionsFromLocalStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
}

function saveToLocalStorage() {
    localStorage.setItem('goals', JSON.stringify(goals));
}

function getTransactionsByMonthYear(monthYear) {
    return transactions.filter(transaction => {
        const [year, month] = transaction.date.split('-');
        const transactionDate = new Date(year, month - 1);
        return transactionDate.getMonth() === monthYear.getMonth() && transactionDate.getFullYear() === monthYear.getFullYear();
    });
}

function renderSelectedMonthYear() {
    const selectedMonthYearSpan = document.getElementById('monthYear');
    const dateText = new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric'}).format(selectedMonthYear);
    selectedMonthYearSpan.textContent = dateText.charAt(0).toUpperCase() + dateText.slice(1);
}

function changeMonthYear(increment) {
    selectedMonthYear.setMonth(selectedMonthYear.getMonth() + increment);
    updateUI()
}

function loadGoalsFromLocalStorage() {
    const storedGoals = localStorage.getItem('goals');
    if (storedGoals) {
        goals = JSON.parse(storedGoals);
    }
}

function calculateGoal(goal) {
    const categoryTotal = goals[goal];
    const transactions = getTransactionsByMonthYear(selectedMonthYear);

    const spent = transactions.reduce((acc, transaction) => {
        if (goal === 'total') {
            return acc + (transaction.type === 'Despesa' ? transaction.value : 0);
        }

        if (transaction.category === GoalsToReadable[goal]) {
            return acc + (transaction.type === 'Despesa' ? transaction.value : 0);
        }
        return acc;
    }, 0)

    return {categoryTotal, categoryCurrent: spent - categoryTotal};
}

function renderTotal() {
    const {categoryTotal, categoryCurrent} = calculateGoal('total');

    const totalElement = document.querySelector('.goal-card-current.total');
    const goalElement = document.querySelector('.goal-card-goal.total');

    totalElement.textContent = `R$ ${Math.abs(categoryCurrent).toFixed(2)}`;
    totalElement.classList.remove('text-red', 'text-green');
    totalElement.classList.add(categoryCurrent < 0 ? 'text-green' : 'text-red');
    goalElement.textContent = `R$ ${categoryTotal ? categoryTotal.toFixed(2) : '-'}`;
}

function openEdit(goal) {
    selectedGoal = goal;
    const input = document.getElementById('editGoalInput');
    input.value = goals[goal] || 0;

    const editGoal = document.getElementById('editGoal');
    editGoal.style.display = 'flex';
}

function closeEdit() {
    selectedGoal = null;

    const editGoal = document.getElementById('editGoal');
    editGoal.style.display = 'none';
}

function confirmEdit() {
    const input = document.getElementById('editGoalInput');
    const value = parseFloat(input.value);

    if (Number.isNaN(value)) {
        alert('Valor inválido!');
        return;
    }

    if (value < 0) {
        alert('Valor não pode ser negativo!');
        return;
    }

    goals[selectedGoal] = value || 0;
    saveToLocalStorage()

    updateUI()

    closeEdit()
}

function renderByCategory() {
    const categories = Object.keys(goals).filter(goal => goal !== 'total');

    const list = document.querySelector('.goal-categories-list');
    list.innerHTML = '';

    for (const category of categories) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'card-line relative'

        const {categoryTotal, categoryCurrent} = calculateGoal(category);

        categoryElement.innerHTML = `
            <div class="circle bg-${colorByCategory[category]}"></div>
            <span class="goal-card-title">${GoalsToReadable[category]}</span>
            <div class="text-right">
                <span class="${categoryCurrent < 0 ? 'text-green' : 'text-red'} goal-card-current">R$ ${Math.abs(categoryCurrent).toFixed(2)}</span>
                <span class="text-bold goal-card-goal">R$ ${categoryTotal ? categoryTotal.toFixed(2) : '-'}</span>
            </div>
            <button class="edit-goal" onclick="openEdit('${category}')">
                <i class="fas fa-pen"></i>
            </button>`;

        list.appendChild(categoryElement);
    }
}

function updateUI() {
    renderTotal()
    renderByCategory()
    renderSelectedMonthYear()
}

document.addEventListener('DOMContentLoaded', () => {
    loadTransactionsFromLocalStorage();
    loadGoalsFromLocalStorage()
    updateUI();
});
