import open from 'open';
import * as vscode from 'vscode';

import { cache } from '../workspace';
import { getReferenceAtPosition, findUriByRef } from '../utils';

const openReferenceInDefaultApp = async () => {
  const activeTextEditor = vscode.window.activeTextEditor;

  if (activeTextEditor) {
    const refAtPos = getReferenceAtPosition(
      activeTextEditor.document,
      activeTextEditor.selection.start,
    );

    if (refAtPos) {
      const uri = findUriByRef(cache.getWorkspaceCache().allUris, refAtPos.ref);

      if (uri) {
        await open(uri.fsPath);
      } else {
        vscode.window.showWarningMessage(
          'Linked file does not exist yet. Try to create a new one by clicking on the link.',
        );
      }
    }
  }
};

export default openReferenceInDefaultApp;
