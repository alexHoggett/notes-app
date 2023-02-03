class notesView{
  constructor(model, client){
    this.model = model;
    this.client = client;

    const addButtonEl = document.querySelector('#add-note');
    const inputEl = document.querySelector('#message-input');

    addButtonEl.addEventListener('click', () => {
      this.addNote(inputEl);
    });
  }

  addNote(inputEl){
    this.client.createNote(inputEl.value, this.displayError);
    this.clearNotes();
    this.displayNotesFromApi();
    inputEl.value = '';
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

  displayNotesFromApi() {
    this.client.loadNotes((data) => {
      this.model.setNotes(data);
      this.displayNotes();
    }, () => {
      this.displayError();
    });
  }

  displayError(){
    // insert error message
    const content = 'Oops, something went wrong!';
    const element = document.createElement('div');
    element.append(content);
    document.querySelector('h1').append(element);
  }
}

module.exports = notesView;