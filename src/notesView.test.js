/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const notesView = require('./notesView');
const notesModel = require('./notesModel');
const notesClient = require('./notesClient');

// require('jest-fetch-mock').enableMocks();

describe ('notesView class', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it ('constructs', () => {
    const model = new notesModel();
    const client = new notesClient();
    const view = new notesView(model, client);
    expect(view.model).toBe(model);
  });
  
  it ('adds a new note', () => {
    const model = new notesModel();
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest.fn(callback => {
        callback(["hello world"]);
      })
    }
    const view = new notesView(model, mockClient);

    const button = document.querySelector('#add-note');
    document.querySelector('#message-input').value = 'hello world';
    button.click();

    const query = document.querySelectorAll('.note');
    expect(query.length).toBe(1);
    expect(query[0].textContent).toBe('hello world');
    expect(query[0].className).toBe('note');
  });

  it ('clears old notes, before rendering new ones', () => {
    const model = new notesModel();
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest
        .fn()
        .mockImplementationOnce(callback => {
          callback(["hello world"]);
        })
        .mockImplementationOnce(callback => {
          callback(["hello world", "hello world"]);
        })
    }

    const view = new notesView(model, mockClient);

    const button = document.querySelector('#add-note');
    document.querySelector('#message-input').value = 'hello world';
    button.click();
    button.click();
    const query = document.querySelectorAll('.note');
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

  it ('makes a call to the API when we add a note', async () => {
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest.fn()
    }

    // mockClient.createNote.mockResolvedValueOnce(['this has been added by the API']);

    const model = new notesModel();
    const view = new notesView(model, mockClient);

    const input = document.querySelector('#message-input')
    input.value = 'this has been added by the API';
    const button = document.querySelector('#add-note');
    button.click();

    expect(mockClient.createNote).toHaveBeenCalledWith('this has been added by the API');
  });

  it ('shows an error on the page, when the fetch request fails', () => {
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest.fn()
    }
    const model = new notesModel();
    const view = new notesView(model, mockClient);

    view.displayError();
    expect(document.body.innerHTML.includes('Oops, something went wrong!')).toBe(true);
  })
});