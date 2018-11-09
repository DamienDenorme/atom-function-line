"use babel";
import {CompositeDisposable} from "atom";

export default class FunctionStyler {
  constructor(options) {
    // this.config = options.config;
    this.workspace = options.workspace;
    this.grammar = options.grammar;
    this.subscriptions = new CompositeDisposable();
  };

  activate(state) {
    this.workspace.observeTextEditors(editor => {
      let javaScriptGrammar;
      const markerLayer = editor.addMarkerLayer();

      this.grammar.forEach(grammar => {
        if (this.grammar.name === "JavaScript" || "TypeScript") {
          javaScriptGrammar = grammar;
        }
      });

      this.addHeaders(editor, markerLayer, javaScriptGrammar);

      editor.onDidStopChanging(() => this.addHeaders(editor, markerLayer, javaScriptGrammar));

      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "pokinano-functions-styler:toggle": () => this.toggle()
      }));
    });
  }

  deactivate() {}

  serialssize() {}

  toggle() {}

  addHeaders(editor, markerLayer, javaScriptGrammar) {
    markerLayer.clear();

    const lines = javaScriptGrammar.tokenizeLines(editor.getText());
    lines.forEach((line, lineNumber) => {
      line.forEach(token => {
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
          functionHeader.classList.add("function-header");
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
