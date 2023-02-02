class notesView{
  constructor(model, client){
    this.model = model;
    this.client = client;

    const addButtonEl = document.querySelector('#add-note');
    const inputEl = document.querySelector('#message-input');

    addButtonEl.addEventListener('click', () => {
      this.model.addNote(inputEl.value);
      this.clearNotes();
      this.displayNotes();
      inputEl.value = '';
    });
  }

  displayNotes(){
    const notes = this.model.getNotes();

    notes.forEach(note => {
      const element = document.createElement('div');
      element.append(note);
      element.classList.add("note");
      document.querySelector('body').append(element);
    })
  }

  clearNotes(){
    const notes = document.querySelectorAll('.note');

    notes.forEach(note => {
      note.remove();
    });
  }

  displayNotesFromApi(callback) {
    this.client.loadNotes((data) => {
      this.displayNotes();
    });
  }
}

module.exports = notesView;