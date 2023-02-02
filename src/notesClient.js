class notesClient{
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) => {
        callback(data)
      });
  }

  createNote(note) {
    const data = { content: note };
    fetch('http://localhost:3000/notes', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
}

module.exports = notesClient;