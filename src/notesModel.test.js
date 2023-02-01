const notesModel = require('./notesModel');

describe ('notesModel class', () => {

  it('adds a note to the model', () => {
    model = new notesModel();

    model.addNote('Buy milk');
    model.addNote('Go to the gym');

    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']
    );
  });

  it ('resets and clears the array of notes', () => {
    model = new notesModel();

    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });

  it ('initialises with no notes', () => {
    model = new notesModel();
    model.getNotes();
    expect(model.getNotes()).toEqual([]);
  })

});