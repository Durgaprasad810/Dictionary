document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('Input');

    const searchButton = document.getElementById('searchbutton');
    
    const outputField = document.getElementById('display');

    searchButton.addEventListener('click', function() {
        const data = inputField.value.trim();

        function isValidWord(data) {

            return /^[A-Za-z]+$/.test(data);
        }

        if (!data) {
            alert('Please enter a word.');
            return;
        }
        else if(!isValidWord(data)){
            alert('Invalid word. Word should only contain alphabets.');
        }
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(detailsOfWord => {
            if (detailsOfWord && detailsOfWord.length > 0) {
                let extrat_data = '';
                detailsOfWord.forEach(item => {
                    if (item.meanings && item.meanings.length > 0) {
                        item.meanings.forEach(meaning => {
                            extrat_data += `<p><h4>Part of Speech:</h4> ${meaning.partOfSpeech}</p>`;
                            extrat_data += `<p><h4>Meaning:</h4> ${meaning.definitions[0].definition}</p>`;
                            extrat_data += '<hr>';
                        });
                    }
                });
                outputField.innerHTML = extrat_data;
            } 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            outputField.innerHTML = '<p>Invalid word/Error fetching data. Try again.</p>';
        });
        
    });
});
