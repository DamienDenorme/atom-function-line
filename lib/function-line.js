"use babel";

export default class FunctionStyler {
  constructor() {
    this.config = {
      lineColor: {
        type: "color",
        default: "#373b41"
      }
    };
  }

  activate(state) {
    atom.workspace.observeTextEditors(editor => {
      const markerLayer = editor.addMarkerLayer();
      const rootScopes = editor.getRootScopeDescriptor().getScopesArray();
      const fileGrammar = atom.grammars
        .getGrammars()
        .filter(grammar => grammar.scopeName === rootScopes[0])[0];

      this.addHeaders(editor, markerLayer, fileGrammar);

      editor.onDidStopChanging(() =>
        this.addHeaders(editor, markerLayer, fileGrammar)
      );

      atom.config.onDidChange("function-line.lineColor", event => {
        atom.config.set("function-line.lineColor", event.newValue);
        this.addHeaders(editor, markerLayer, fileGrammar);
      });
    });
  }

  addHeaders(editor, markerLayer, grammar) {
    markerLayer.clear();

    const lines = grammar.tokenizeLines(editor.getText());
    lines.forEach((line, lineNumber) => {
      line.forEach(token => {
        if (
          token.scopes.some(this.isFunctionDefinition) &&
          token.scopes.some(this.isFunctionName)
        ) {
          const marker = markerLayer.markBufferRange([
            [lineNumber, 0],
            [lineNumber, 120]
          ]);

          const functionHeader = document.createElement("div");
          const lineColor = atom.config
            .get("function-line.lineColor")
            .toHexString();
          functionHeader.style.borderBottom = `solid 1px ${lineColor}`;
          functionHeader.style.margin = 0;

          editor.decorateMarker(marker, {
            type: "block",
            item: functionHeader
          });
        }
      });
    });
  }

  isFunctionDefinition(element) {
    return element.match(/meta\.function\.method\.definition/);
  }

  isFunctionName(element) {
    return element.match(/entity\.name\.function/);
  }
}
