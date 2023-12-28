import * as vscode from 'vscode';
import { loadData } from './commands/loadData';
import { TypeScriptTreeDataProvider } from './view/TypeScriptTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new TypeScriptTreeDataProvider();

  context.subscriptions.push(vscode.commands.registerCommand('tsglance.loadData', loadData));
  context.subscriptions.push(vscode.window.createTreeView('tsglance-view', { treeDataProvider: provider }));
}

export function deactivate() {}
