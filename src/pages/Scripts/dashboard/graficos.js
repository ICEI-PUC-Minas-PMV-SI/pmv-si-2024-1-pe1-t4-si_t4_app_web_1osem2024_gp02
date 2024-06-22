const ctx = document.getElementById("gp-Chart");
let transactions = [];

function loadFromLocalStorage() {
  const storedTransactions = localStorage.getItem("transactions");
  const storedNextId = localStorage.getItem("nextId");
  transactions = storedTransactions ? JSON.parse(storedTransactions) : [];
  nextId = storedNextId ? parseInt(storedNextId, 10) : 1;
}
loadFromLocalStorage();

console.log(transactions);

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
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
