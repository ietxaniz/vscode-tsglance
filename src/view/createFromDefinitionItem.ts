import { definitionType, tsItemKind } from '../inner/interfaces';
import { TypeScriptInterfaceItem } from './TypeScriptInterfaceItem';
import { TypeScriptTypeItem } from './TypeScriptTypeItem';
import { TypeScriptClassItem } from './TypeScriptClassItem';
import { TypeScriptEnumItem } from './TypeScriptEnumItem';
import { TypeScriptItem } from './TypeScriptItem';

export const createFromDefinitionItem = (item: definitionType):TypeScriptItem => {
  if (item.itemType === tsItemKind.interface) {
    return new TypeScriptInterfaceItem(item);
  }
  if (item.itemType === tsItemKind.type) {
    return new TypeScriptTypeItem(item);
  }
  if (item.itemType === tsItemKind.class) {
    return new TypeScriptClassItem(item);
  }
  if (item.itemType === tsItemKind.enum) {
    return new TypeScriptEnumItem(item);
  }
  throw new Error(`Unknown item type: ${item.itemType}`);
};
