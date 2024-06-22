document.addEventListener("DOMContentLoaded", function() {
    fetch('/src/pages/components/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebarContainer').innerHTML = data;
    })
    .then(data => {
        const path = window.location.pathname;

            const pathToButtonId = {
                "/src/pages/dashboard/": "resumoBtn",
                "/src/pages/transacoes/": "transacoesBtn",
                "/src/pages/metas/": "metasBtn"
            };

            if (pathToButtonId) {
                const activeButtonId = pathToButtonId[path];

                document.getElementById(activeButtonId).style.backgroundColor = "green";
            }
    });
});