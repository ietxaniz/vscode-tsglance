import * as ts from "typescript";
import * as fs from "fs";

export const parseTypeScriptInterface = (filePath: string, interfaceName: string): InterfaceDetails => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);

    let interfaceDetails: InterfaceDetails = { name: "", fields: [], lineNumber: 0 };

    const findInterface = (node: ts.Node) => {
      if (ts.isInterfaceDeclaration(node) && node.name.text === interfaceName) {
        const name = node.name.text;
        const fields = [] as { name: string; lineNumber: number }[];
        node.members.forEach(member => {
          if (ts.isPropertySignature(member) && member.name) {
            let fieldName = member.name.getText(sourceFile);
            fields.push({ name: fieldName, lineNumber: sourceFile.getLineAndCharacterOfPosition(member.pos).line + 1}) ;
          }
        });
        const lineNumber = sourceFile.getLineAndCharacterOfPosition(node.name.pos).line;
        interfaceDetails = { name, fields, lineNumber };
      }
    };

    sourceFile.forEachChild(findInterface);
    return interfaceDetails;
  } catch (error) {
    console.error('Error reading file:', error);
    return { name: "", fields: [], lineNumber: 0 };
  }
};

export interface InterfaceDetails {
  name: string;
  fields: { name: string; lineNumber: number }[];
  lineNumber: number;
}
