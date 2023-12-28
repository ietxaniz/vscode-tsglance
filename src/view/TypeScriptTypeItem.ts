import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";
import { definitionType } from "../inner/interfaces";
import { TypeScriptFileLinkItem } from "./TypeScriptFileLinkItem";
import { parseTypeScriptType } from "../inner/parseTypeScriptType";

export class TypeScriptTypeItem extends TypeScriptItem {
  private _children: TypeScriptItem[] = [];
  constructor(public readonly item: definitionType) {
    super(item.name);
    this.iconPath = new vscode.ThemeIcon('symbol-parameter');

    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }

  getChildren(): Thenable<TypeScriptItem[]> {
      const typeDetails = parseTypeScriptType(this.item.file, this.item.name);
      this._children = [];
      this._children.push(new TypeScriptFileLinkItem(this.item.file, typeDetails.lineNumber));
      return Promise.resolve(this._children);
  }
}
