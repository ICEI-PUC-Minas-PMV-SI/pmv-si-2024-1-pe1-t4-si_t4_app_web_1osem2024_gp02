document.addEventListener("DOMContentLoaded", function() {
    fetch('/src/pages/components/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebarContainer').innerHTML = data;
    });
});