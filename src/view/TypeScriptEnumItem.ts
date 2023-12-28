import * as vscode from "vscode";

import { TypeScriptItem } from "./TypeScriptItem";
import { definitionType } from "../inner/interfaces";
import { TypeScriptFileLinkItem } from "./TypeScriptFileLinkItem";
import { TypeScriptEnumMemberItem } from "./TypeScriptEnumMemberItem";
import { parseTypeScriptEnum } from "../inner/parseTypeScriptEnum";

export class TypeScriptEnumItem extends TypeScriptItem {
  private _children: TypeScriptItem[] = [];
  constructor(public readonly item: definitionType) {
    super(item.name);
    this.iconPath = new vscode.ThemeIcon("symbol-enum");

    this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
  }

  getChildren(): Thenable<TypeScriptItem[]> {
    const enumDetails = parseTypeScriptEnum(this.item.file, this.item.name);
    this._children = [];
    this._children.push(new TypeScriptFileLinkItem(this.item.file, enumDetails.lineNumber));
    enumDetails.members.forEach((member) => {
      this._children.push(new TypeScriptEnumMemberItem(member.name, member.value, this.item.file, member.lineNumber));
    });
    return Promise.resolve(this._children);
  }
}
