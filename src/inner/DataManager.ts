import * as vscode from 'vscode';

import { definitionType } from "./interfaces";
import { loadWorkspaceData } from "./loadWorkspaceData";

export class DataManager {
  private static instance: DataManager;
  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private constructor() {};
  private _refresh:()=>void = () => {};

  private _items:definitionType[] = [];

  public get interfaces(): definitionType[] {
    return this._items;
  }

  public async loadWorkspaceData() {
    this._items = await loadWorkspaceData();
    this._refresh();
  }

  public print() {
    const outputChannel = vscode.window.createOutputChannel('TSGlance - Interfaces');
    outputChannel.show();

    this._items.forEach((item) => {
      outputChannel.append(`${item.name} - ${item.itemType} - ${item.file}\n`);
    });
  }

  public setRefresh = (refresh:()=>void) => {
    this._refresh = refresh;
  };

  public getClassDefinitionFile = (className:string):string => {
    const classDefinition = this._items.find((item) => item.name === className);
    if (classDefinition) {
      return classDefinition.file;
    }
    return '';
  }
}
