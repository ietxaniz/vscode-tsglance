import * as vscode from "vscode";

export class TypeScriptItem extends vscode.TreeItem {
  constructor(public readonly name: string) {
    super(name);
  }

  getChildren(): Thenable<TypeScriptItem[]> {
    return Promise.resolve([]);
  }

}

