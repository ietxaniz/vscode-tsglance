import * as ts from "typescript";
import * as fs from "fs";

export const parseTypeScriptType = (filePath: string, typeName: string): TypeDetails => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);

    let typeDetails: TypeDetails = { name: "", definition: "", lineNumber: 0 };

    const findType = (node: ts.Node) => {
      if (ts.isTypeAliasDeclaration(node) && node.name.text === typeName) {
        const name = node.name.text;
        const definition = node.type.getText(sourceFile);
        const lineNumber = sourceFile.getLineAndCharacterOfPosition(node.pos).line;
        typeDetails = { name, definition, lineNumber };
      }
    };

    sourceFile.forEachChild(findType);
    return typeDetails;
  } catch (error) {
    console.error('Error reading file:', error);
    return { name: "", definition: "", lineNumber: 0 };
  }
};

export interface TypeDetails {
  name: string;
  definition: string;
  lineNumber: number;
}
