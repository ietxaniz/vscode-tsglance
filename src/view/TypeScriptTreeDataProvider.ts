import * as vscode from "vscode";

import { DataManager } from "../inner/DataManager";
import { TypeScriptItem } from "./TypeScriptItem";
import { createFromDefinitionItem } from "./createFromDefinitionItem";

export class TypeScriptTreeDataProvider implements vscode.TreeDataProvider<TypeScriptItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TypeScriptItem | undefined> = new vscode.EventEmitter<TypeScriptItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<TypeScriptItem | undefined> = this._onDidChangeTreeData.event;

  constructor() {
    const dataManager = DataManager.getInstance();
    dataManager.setRefresh(this.refresh.bind(this));
  }

  getTreeItem(element: TypeScriptItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TypeScriptItem): Thenable<TypeScriptItem[]> {
    if (element) {
      return element.getChildren();
    } else {
      // Return root level items
      const dataManager = DataManager.getInstance();
      return Promise.resolve(dataManager.interfaces.map((item) => createFromDefinitionItem(item)));
    }
    return Promise.resolve([]);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

}
