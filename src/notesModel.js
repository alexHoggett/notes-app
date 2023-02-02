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

  setNotes(notes){
    this.notes = notes;
  }
}

module.exports = notesModel;