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
      };
      module.exports = notesView2;
    }
  });

  // src/index.js
  var notesModel = require_notesModel();
  var notesView = require_notesView();
  model = new notesModel();
  model.addNote("The is an example note");
  view = new notesView(model);
  view.displayNotes();
})();
