/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const notesView = require('./notesView');
const notesModel = require('./notesModel');

describe ('notesView class', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it ('constructs', () => {
    const model = new notesModel();
    const view = new notesView(model);
    expect(view.model).toBe(model);
  });
  
  it ('displays all notes', () => {
    const model = new notesModel();
    model.addNote('First Note');
    model.addNote('Second Note');
    view = new notesView(model);
    view.displayNotes();

    query = document.querySelectorAll('.note');
    expect(query.length).toBe(2);
    expect(query[0].textContent).toBe("First Note");
    expect(query[1].textContent).toBe("Second Note");
    expect(query[0].className).toBe("note");
    expect(query[1].className).toBe("note");
  });
})