const CChart = document.getElementById("categoria-Chart");
const EChart = document.getElementById("entry-charts");
const PDChart = document.getElementById("day-charts");
const saldo = document.getElementById("saldo");

const CategoryToReadable = {
  market: "Mercado",
  leisure: "Lazer",
  health: "Saúde",
  transport: "Transporte",
  education: "Educação",
  house: "Casa",
  selfcare: "Cuidados Pessoais",
  travel: "Viagem",
};

let transactions = [];

// Carregar transações do LocalStorage ou inicializar como vazio
function loadFromLocalStorage() {
  const storedTransactions = localStorage.getItem("transactions");
  transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
}
loadFromLocalStorage();

let selectedMonthYear = new Date();

function renderSelectedMonthYear() {
  const selectedMonthYearSpan = document.getElementById("monthYear");
  const dateText = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(selectedMonthYear);
  selectedMonthYearSpan.textContent =
    dateText.charAt(0).toUpperCase() + dateText.slice(1);
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

function changeMonthYear(increment) {
  selectedMonthYear.setMonth(selectedMonthYear.getMonth() + increment);
  updateUI();
}

function updateUI() {
  renderSelectedMonthYear();
  renderCharts();
}

// Definição dos gráficos
let graficoCategoria = null;
let graficoReceitaDespesa = null;
let graficoBalancoDiario = null;

// Função para processar os dados e atualizar os gráficos
function renderCharts() {
  const currentMonthTransactions = getTransactionFromThisMonth();

  // Filtrar apenas despesas para o gráfico de categorias
  const expenseTransactions = currentMonthTransactions.filter(
    (item) => item.type === "Despesa"
  );

  const categories = [
    ...new Set(expenseTransactions.map((item) => item.category)),
  ];

  const data = categories.map((category) => {
    return expenseTransactions
      .filter((item) => item.category === category)
      .reduce((acc, item) => acc + item.value, 0);
  });

  const totalReceitas = currentMonthTransactions
    .filter((item) => item.type === "Receita")
    .reduce((acc, item) => acc + item.value, 0);

  const totalDespesas = currentMonthTransactions
    .filter((item) => item.type === "Despesa")
    .reduce((acc, item) => acc + item.value, 0);

  const totalSaldo = totalReceitas - totalDespesas;

  // Exibir o saldo total no elemento
  saldo.textContent = totalSaldo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const balances = [];
  const dates = [...new Set(currentMonthTransactions.map((item) => item.date))];

  dates.forEach((date) => {
    const balanceOfDay = currentMonthTransactions
      .filter((item) => item.date === date)
      .reduce((acc, item) => {
        if (item.type === "Receita") {
          return acc + item.value;
        } else {
          return acc - item.value;
        }
      }, 0);
    balances.push(balanceOfDay);
  });

  const backgroundColors = balances.map((balance) => {
    if (balance >= 0) {
      return "rgba(54, 162, 235)"; // Verde claro para saldo positivo
    } else {
      return "rgba(255, 99, 132)"; // Vermelho claro para saldo negativo
    }
  });

  // Destruir gráficos existentes
  if (graficoCategoria) graficoCategoria.destroy();
  if (graficoReceitaDespesa) graficoReceitaDespesa.destroy();
  if (graficoBalancoDiario) graficoBalancoDiario.destroy();

  // Recriar os gráficos
  graficoCategoria = new Chart(CChart, {
    type: "bar",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Valor Gasto",
          data: data,
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  graficoReceitaDespesa = new Chart(EChart, {
    type: "bar",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [
        {
          label: "Valores",
          data: [totalReceitas, totalDespesas],
          borderWidth: 1,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  graficoBalancoDiario = new Chart(PDChart, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: ["Receitas", "Despesas"],
          data: balances,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            callback: function (value, index, values) {
              return value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
            },
          },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

document
  .getElementById("prevMonth")
  .addEventListener("click", () => changeMonthYear(-1));
document
  .getElementById("nextMonth")
  .addEventListener("click", () => changeMonthYear(1));
