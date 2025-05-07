document.addEventListener('DOMContentLoaded', function() {
    const voteForm = document.getElementById('vote-form');
    const voteButton = document.getElementById('vote-button');
    const voteError = document.getElementById('vote-error');
    const voteSuccess = document.getElementById('vote-success');
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');
    const showResultsButton = document.getElementById('show-results-button');

    const storageKey = 'votingResults';
    const options = [
        { id: '1', name: 'Opción A' },
        { id: '2', name: 'Opción B' },
        { id: '3', name: 'Opción C' },
        // Agrega más opciones aquí (deben coincidir con el HTML)
    ];

    // Cargar resultados almacenados al cargar la página
    let currentResults = JSON.parse(localStorage.getItem(storageKey)) || {};
    renderResults();

    if (voteButton) {
        voteButton.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="vote"]:checked');
            if (!selectedOption) {
                voteError.style.display = 'block';
                voteSuccess.style.display = 'none';
                return;
            }

            voteError.style.display = 'none';
            voteSuccess.style.display = 'block';

            const optionId = selectedOption.value;
            currentResults[optionId] = (currentResults[optionId] || 0) + 1;
            localStorage.setItem(storageKey, JSON.stringify(currentResults));

            // Desmarcar la opción después de votar (opcional)
            selectedOption.checked = false;
        });
    }

    if (showResultsButton) {
        showResultsButton.addEventListener('click', function() {
            resultsSection.style.display = 'block';
            renderResults();
        });
    }

    function renderResults() {
        resultsList.innerHTML = '';
        if (currentResults && Object.keys(currentResults).length > 0) {
            for (const optionId in currentResults) {
                const option = options.find(opt => opt.id === optionId);
                const li = document.createElement('li');
                li.textContent = `${option ? option.name : 'Opción Desconocida'}: ${currentResults[optionId]} votos`;
                resultsList.appendChild(li);
            }
        } else {
            const li = document.createElement('li');
            li.textContent = 'Aún no hay votos registrados localmente.';
            resultsList.appendChild(li);
        }
    }
});