export enum tsItemKind {
  interface = "interface",
  class = "class",
  enum = "enum",
  type = "type",
}

export interface definitionType {
  name: string;
  file: string;
  itemType: tsItemKind;
}
