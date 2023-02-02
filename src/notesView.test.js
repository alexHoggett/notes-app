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
    view = new notesView(model);

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
    view = new notesView(model);

    const button = document.querySelector('#add-note');
    document.querySelector('#message-input').value = 'hello world';
    button.click();
    button.click();
    query = document.querySelectorAll('.note');
    expect(query.length).toBe(2);
  });

  it ('call loadNotes(callback) on client class and displays a list of notes', async () => {
    const mockClient = {
      loadNotes: jest.fn()
    }


    mockClient.loadNotes.mockResolvedValueOnce(["This note is coming from the server", "Another note"]);

    const model = new notesModel();
    const view = new notesView(model, mockClient);
    await view.displayNotesFromApi();
    expect(mockClient.loadNotes).toHaveBeenCalled();

    // console.log(mockClient.loadNotes(callback));

    const query = document.querySelectorAll('.note');
    console.log(query);

    expect(query.length).toBe(2);
    expect(query[0].textContent).toBe("This note is coming from the server");
  });    
});