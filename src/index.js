const notesClient = require('./notesClient');
const notesModel = require('./notesModel');
const notesView = require('./notesView');

const model = new notesModel();
const client = new notesClient();
const view = new notesView(model, client);

// model.setNotes();
// view.displayNotes();
// view.displayNotesFromApi();