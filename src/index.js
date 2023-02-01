const notesModel = require('./notesModel');
const notesView = require('./notesView');

model = new notesModel();
model.addNote('The is an example note');

view = new notesView(model);
view.displayNotes();