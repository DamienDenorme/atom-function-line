"use babel";
import {CompositeDisposable} from "atom";

export default class FunctionStyler {
  constructor(options) {
    // this.config = options.config;
    this.workspace = options.workspace;
    this.subscriptions = new CompositeDisposable();
  };

  activate(state) {
    this.workspace.observeTextEditors(editor => {
      const markerLayer = editor.addMarkerLayer();
      const fileGrammar = atom.grammars.getGrammars().filter(grammar => grammar.scopeName === "source.js")[0];

      this.addHeaders(editor, markerLayer, fileGrammar);

      editor.onDidStopChanging(() => this.addHeaders(editor, markerLayer, fileGrammar));

      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "pokinano-functions-styler:toggle": () => this.toggle()
      }));
    });
  }

  deactivate() {}

  serialssize() {}

  toggle() {}

  addHeaders(editor, markerLayer, grammar) {
    markerLayer.clear();

    // console.log("grammar ==> ", grammar);

    const lines = grammar.tokenizeLines(editor.getText());
    lines.forEach((line, lineNumber) => {
      line.forEach(token => {
        // console.log("token.scopes ==> ", token.scopes);
        if (token.scopes.includes("meta.function.method.definition.js") && token.scopes.includes("entity.name.function.js")) {
          const marker = markerLayer.markBufferRange([
            [
              lineNumber, 0
            ],
            [
              lineNumber, 120
            ]
          ]);

          const functionHeader = document.createElement("div");
          functionHeader.style.margin = 0;
          functionHeader.style.borderBottom = "solid 1px #ccc";

          editor.decorateMarker(marker, {
            type: "block",
            item: functionHeader
          });
        }
      });
    });
  }
};
