import * as vscode from "vscode";
import * as ts from "typescript";
import * as fs from "fs";

import { definitionType, tsItemKind } from "./interfaces";

export const loadWorkspaceData = async (): Promise<definitionType[]> => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showInformationMessage("No folder or workspace opened");
    return [];
  }

  const tsFiles = await vscode.workspace.findFiles("src/**/*.ts"); // , '**/node_modules/**'

  const items: definitionType[] = [];

  for (const file of tsFiles) {
    const filePath = file.fsPath;
    const sourceFile = ts.createSourceFile(filePath, fs.readFileSync(filePath).toString(), ts.ScriptTarget.Latest);

    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        items.push({ name: node.name.text, file: filePath, itemType: tsItemKind.interface });
      }
      if (ts.isClassDeclaration(node)) {
        if (node.name) {
          items.push({ name: node.name.text, file: filePath, itemType: tsItemKind.class });
        }
      }
      if (ts.isEnumDeclaration(node)) {
        items.push({ name: node.name.text, file: filePath, itemType: tsItemKind.enum });
      }
      if (ts.isTypeAliasDeclaration(node)) {
        items.push({ name: node.name.text, file: filePath, itemType: tsItemKind.type });
      }
    });
  }
  return items.sort((a, b) => a.name.localeCompare(b.name));
};
