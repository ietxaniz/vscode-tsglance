import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";

export class TypeScriptMethodItem extends TypeScriptItem {
  constructor(public readonly name: string, public readonly fileName: string, public readonly lineNumber: number) {
    super(name);
    this.iconPath = new vscode.ThemeIcon('symbol-method');

    this.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [
        vscode.Uri.file(fileName), // File path
        { selection: new vscode.Range(new vscode.Position(lineNumber, 0), new vscode.Position(lineNumber, 0)) }
      ]
    };
  }
}
