import * as ts from "typescript";
import * as fs from "fs";

export const parseTypeScriptEnum = (filePath: string, enumName: string): EnumDetails => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);

    let enumDetails: EnumDetails = { name: "", members: [], lineNumber: 0 };

    const findEnum = (node: ts.Node) => {
      if (ts.isEnumDeclaration(node) && node.name.text === enumName) {
        const name = node.name.text;
        const members = node.members.map(member => ({
          name: member.name.getText(sourceFile),
          value: member.initializer ? member.initializer.getText(sourceFile) : '',
          lineNumber: sourceFile.getLineAndCharacterOfPosition(member.pos).line + 1
        }));
        const lineNumber = sourceFile.getLineAndCharacterOfPosition(node.name.pos).line + 1;
        enumDetails = { name, members, lineNumber };
      }
    };

    sourceFile.forEachChild(findEnum);
    return enumDetails;
  } catch (error) {
    console.error('Error reading file:', error);
    return { name: "", members: [], lineNumber: 0 };
  }
};

export interface EnumDetails {
  name: string;
  members: { name: string; value: string; lineNumber: number }[];
  lineNumber: number;
}
