const notesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe ('notesClient class', () => {
  it ('calls fetch and loads notes', (done) => {
    const client = new notesClient();

    fetch.mockResponseOnce(JSON.stringify({
      note: "some note"
    }));

    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.note).toEqual("some note")
      done();
    });
  });


  it ('uses the POST method to post notes to the notes API', async () => {
    const client = new notesClient();
    await client.createNote('this is a new note');

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/notes",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "this is a new note" }),
      })
    );
  });

  it ('calls fetch and loads text from an API that converts text to emojis', () => {
    const client = new notesClient();

    fetch.mockResponseOnce(JSON.stringify({
      text: "this is an emoji 🌍"
    }));

    client.getEmojified('this is an emoji :earth_africa:');
    
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.text).toEqual("this is an emoji 🌍")
      done();
    });
  });
})