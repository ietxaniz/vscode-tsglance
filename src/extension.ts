// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { refresh } from './commands/listInterfaces';
import { TypeScriptTreeDataProvider } from './view/TypeScriptTreeDataProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  const provider = new TypeScriptTreeDataProvider();

  context.subscriptions.push(vscode.commands.registerCommand('tsglance.refresh', refresh));
  context.subscriptions.push(vscode.window.createTreeView('tsglance-view', { treeDataProvider: provider }));
}

// This method is called when your extension is deactivated
export function deactivate() {}
