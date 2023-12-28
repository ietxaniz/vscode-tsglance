import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";
import { definitionType } from "../inner/interfaces";
import { TypeScriptFileLinkItem } from "./TypeScriptFileLinkItem";
import { parseTypeScriptInterface } from "../inner/parseTypeScriptInterface";
import { TypeScriptFieldItem } from "./TypeScriptFieldItem";

export class TypeScriptInterfaceItem extends TypeScriptItem {
  private _children: TypeScriptItem[] = [];
  constructor(public readonly item: definitionType) {
    super(item.name);
    this.iconPath = new vscode.ThemeIcon('symbol-interface');

    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }

  getChildren(): Thenable<TypeScriptItem[]> {
    const interfaceDetails = parseTypeScriptInterface(this.item.file, this.item.name);
    this._children = [];
    this._children.push(new TypeScriptFileLinkItem(this.item.file, interfaceDetails.lineNumber));
    interfaceDetails.fields.forEach(field => {
      this._children.push(new TypeScriptFieldItem(field.name, this.item.file, field.lineNumber));
    });
    return Promise.resolve(this._children);
  }

}


