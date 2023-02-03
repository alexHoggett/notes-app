class notesClient{
  loadNotes(callback, errorCallback) {
    fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        errorCallback();
      })
  }

  createNote(note, errorCallback) {
    const data = { content: note };
    fetch('http://localhost:3000/notes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .catch((error) => {
      errorCallback();
    })
  }
}

module.exports = notesClient;