class notesView{
  constructor(model){
    this.model = model;
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

}

module.exports = notesView;