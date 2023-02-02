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
  
  it ('adds a new note', () => {
    const model = new notesModel();
    const view = new notesView(model);

    const button = document.querySelector('#add-note');
    document.querySelector('#message-input').value = 'hello world';
    button.click();

    query = document.querySelectorAll('.note');
    expect(query.length).toBe(1);
    expect(query[0].textContent).toBe('hello world');
    expect(query[0].className).toBe('note');
  });

  it ('clears old notes, before rendering new ones', () => {
    const model = new notesModel();
    const view = new notesView(model);

    const button = document.querySelector('#add-note');
    document.querySelector('#message-input').value = 'hello world';
    button.click();
    button.click();
    query = document.querySelectorAll('.note');
    expect(query.length).toBe(2);
  });

  it ('calls loadNotes(callback) on client class and displays a list of notes', () => {
    const mockClient = {
      loadNotes: jest.fn(callback => {
        callback(["This note is coming from the server", "Another note"]);
      })
    }

    const model = new notesModel();
    const view = new notesView(model, mockClient);

    view.displayNotesFromApi();
    expect(mockClient.loadNotes).toHaveBeenCalled();
  
    const query = document.querySelectorAll('.note');
    expect(query.length).toBe(2);
    expect(query[0].textContent).toBe("This note is coming from the server");
  });    
});