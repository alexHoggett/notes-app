(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/notesClient.js
  var require_notesClient = __commonJS({
    "src/notesClient.js"(exports, module) {
      var notesClient2 = class {
        loadNotes(callback, errorCallback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          }).catch((error) => {
            errorCallback();
          });
        }
        createNote(note, errorCallback) {
          const data = { content: note };
          fetch("http://localhost:3000/notes", {
            method: "POST",
            // or 'PUT'
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }).catch((error) => {
            errorCallback();
          });
        }
      };
      module.exports = notesClient2;
    }
  });

  // src/notesModel.js
  var require_notesModel = __commonJS({
    "src/notesModel.js"(exports, module) {
      var notesModel2 = class {
        constructor() {
          this.notes = [];
        }
        addNote(note) {
          this.notes.push(note);
        }
        getNotes() {
          return this.notes;
        }
        reset() {
          this.notes = [];
        }
        setNotes(notes) {
          this.notes = notes;
        }
      };
      module.exports = notesModel2;
    }
  });

  // src/notesView.js
  var require_notesView = __commonJS({
    "src/notesView.js"(exports, module) {
      var notesView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          const addButtonEl = document.querySelector("#add-note");
          const inputEl = document.querySelector("#message-input");
          addButtonEl.addEventListener("click", () => {
            this.addNote(inputEl);
          });
        }
        addNote(inputEl) {
          this.client.createNote(inputEl.value, this.displayError);
          this.clearNotes();
          this.displayNotesFromApi();
          inputEl.value = "";
        }
        displayNotes() {
          const notes = this.model.getNotes();
          notes.forEach((note) => {
            const element = document.createElement("div");
            element.append(note);
            element.classList.add("note");
            document.querySelector("body").append(element);
          });
        }
        clearNotes() {
          const notes = document.querySelectorAll(".note");
          notes.forEach((note) => {
            note.remove();
          });
        }
        displayNotesFromApi() {
          this.client.loadNotes((data) => {
            this.model.setNotes(data);
            this.displayNotes();
          }, () => {
            this.displayError();
          });
        }
        displayError() {
          const content = "Oops, something went wrong!";
          const element = document.createElement("div");
          element.append(content);
          document.querySelector("h1").append(element);
        }
      };
      module.exports = notesView2;
    }
  });

  // src/index.js
  var notesClient = require_notesClient();
  var notesModel = require_notesModel();
  var notesView = require_notesView();
  var model = new notesModel();
  var client = new notesClient();
  var view = new notesView(model, client);
  view.displayNotesFromApi();
})();
