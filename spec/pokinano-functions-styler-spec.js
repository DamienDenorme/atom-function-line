'use babel';

import PokinanoFunctionsStyler from '../lib/pokinano-functions-styler';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PokinanoFunctionsStyler', () => {
  let workspaceElement;
  let activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pokinano-functions-styler');
  });

  describe('when the pokinano-functions-styler is activated', () => {
    it('sets the color of functions background', () => {});
  });

  describe('when the pokinano-functions-styler:toggle event is triggered', () => {
    it('changes the color of functions background', () => {});
  });
});
