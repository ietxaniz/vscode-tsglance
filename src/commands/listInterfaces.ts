import * as vscode from 'vscode';
import { DataManager } from '../inner/DataManager';

export const refresh = async () => {
  const data = DataManager.getInstance();
  data.loadWorkspaceData();
};
