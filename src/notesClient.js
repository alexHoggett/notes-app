class notesClient{
    loadNotes(callback) {
        fetch('http://localhost:3000/notes')
          .then((response) => response.json())
          .then((data) => {
            callback(data)
          });
    }
}

module.exports = notesClient;



// fetch('https://api.github.com/repos/' + repoName)
//   .then((response) => response.json()) // 1. convert JSON to JS object
//   .then((data) => {
//     // 2. `data` is now a full JS object, so we can access its properties  
//     callback(data)
//   });