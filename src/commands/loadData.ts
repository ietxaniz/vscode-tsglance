import * as vscode from 'vscode';
import { DataManager } from '../inner/DataManager';

export const loadData = async () => {
  const data = DataManager.getInstance();
  data.loadWorkspaceData();
};
