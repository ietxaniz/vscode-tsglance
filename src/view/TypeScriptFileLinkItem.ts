import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";

export class TypeScriptFileLinkItem extends TypeScriptItem {
  constructor(public readonly link: string, public readonly line: number) {
    super(vscode.workspace.asRelativePath(link));
    this.iconPath = new vscode.ThemeIcon('code');

    this.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [
        vscode.Uri.file(link), // File path
        { selection: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, 0)) }
      ]
    };
  }
}
