(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

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
      };
      module.exports = notesModel2;
    }
  });

  // src/notesView.js
  var require_notesView = __commonJS({
    "src/notesView.js"(exports, module) {
      var notesView2 = class {
        constructor(model2) {
          this.model = model2;
          const addButtonEl = document.querySelector("#add-note");
          const inputEl = document.querySelector("#message-input");
          addButtonEl.addEventListener("click", () => {
            this.model.addNote(inputEl.value);
            this.clearNotes();
            this.displayNotes();
            inputEl.value = "";
          });
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
      };
      module.exports = notesView2;
    }
  });

  // src/index.js
  var notesModel = require_notesModel();
  var notesView = require_notesView();
  var model = new notesModel();
  var view = new notesView(model);
  view.displayNotes();
})();
