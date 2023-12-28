import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";
import { definitionType, tsItemKind } from "../inner/interfaces";

import { TypeScriptFileLinkItem } from "./TypeScriptFileLinkItem";
import { TypeScriptFieldItem } from "./TypeScriptFieldItem";
import { TypeScriptMethodItem } from "./TypeScriptMethodItem";
import { TypeScriptAccessorItem } from "./TypeScriptAccessorItem";

import { parseTypeScriptClass } from "../inner/parseTypeScriptClass";
import { DataManager } from "../inner/DataManager";

export class TypeScriptClassItem extends TypeScriptItem {
  private _children: TypeScriptItem[] = [];
  constructor(public readonly item: definitionType) {
    super(item.name);
    this.iconPath = new vscode.ThemeIcon('symbol-class');

    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }

  getChildren(): Thenable<TypeScriptItem[]> {
    const classDetails = parseTypeScriptClass(this.item.file, this.item.name);
    console.log('classDetails', classDetails);
    this._children = [];
    this._children.push(new TypeScriptFileLinkItem(this.item.file, 0));
    const dataManager = DataManager.getInstance();
    classDetails.inherits.forEach((className) => {
      const classDefinitionFile = dataManager.getClassDefinitionFile(className);
      if (classDefinitionFile) {
        this._children.push(new TypeScriptClassItem({ name: className, itemType: tsItemKind.class, file: classDefinitionFile }));
      }
    });
    classDetails.fields.forEach((field) => {
      this._children.push(new TypeScriptFieldItem(field.name, this.item.file, field.lineNumber));
    });
    classDetails.methods.forEach((method) => {
      this._children.push(new TypeScriptMethodItem(method.name, this.item.file, method.lineNumber));
    });
    classDetails.accessors.forEach((accessor) => {
      this._children.push(new TypeScriptAccessorItem(accessor.name, this.item.file, accessor.lineNumber));
    });
    return Promise.resolve(this._children);
  }
}
