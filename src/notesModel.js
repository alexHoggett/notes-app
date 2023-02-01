class notesModel{
  constructor(){
    this.notes = [];
  }

  addNote(note){
    this.notes.push(note);
  }

  getNotes(){
    return this.notes;
  }

  reset(){
    this.notes = [];
  }
}

module.exports = notesModel;