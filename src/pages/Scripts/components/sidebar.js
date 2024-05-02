document.addEventListener("DOMContentLoaded", function() {
    fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebarContainer').innerHTML = data;
    });
});