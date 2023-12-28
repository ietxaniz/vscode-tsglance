import * as vscode from 'vscode';
import * as ts from 'typescript';
import * as fs from 'fs';

export const listWorkspaceInterfaces = async () => {
  const tsFiles = await vscode.workspace.findFiles('**/*.ts'); // , '**/node_modules/**'

    const interfaces:string[] = [];

    for (const file of tsFiles) {
        const filePath = file.fsPath;
        const sourceFile = ts.createSourceFile(
            filePath,
            fs.readFileSync(filePath).toString(),
            ts.ScriptTarget.Latest
        );

        ts.forEachChild(sourceFile, node => {
            if (ts.isInterfaceDeclaration(node)) {
                interfaces.push(node.name.text);
            }
        });
    }

    return interfaces.sort();
};
