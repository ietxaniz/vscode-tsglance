import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";

export class TypeScriptEnumMemberItem extends TypeScriptItem {
  constructor(public readonly name: string, public readonly value: string, public readonly fileName: string, public readonly lineNumber: number) {
    super(`${name} = ${value}`);
    this.iconPath = new vscode.ThemeIcon('symbol-enum-member');

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
