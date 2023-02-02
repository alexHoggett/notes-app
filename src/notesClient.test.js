const notesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('notesClient class', () => {
    it('calls fetch and loads notes', (done) => {
        const client = new notesClient();

        fetch.mockResponseOnce(JSON.stringify({
            note: "some note"
        }));

        client.loadNotes((returnedDataFromApi) => {
          expect(returnedDataFromApi.note).toEqual("some note")

          done();
        })
   })
})