import * as ts from "typescript";
import * as fs from "fs";

export const parseTypeScriptClass = (filePath: string, className: string): ClassDetails => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, true);

  let classDetails: ClassDetails = { name: className, fields: [], methods: [], accessors: [], inherits: [] };

  const findClass = (node: ts.Node) => {
    if (ts.isClassDeclaration(node) && node.name?.text === className) {
      classDetails.name = node.name.text;
      if (node.heritageClauses) {
        node.heritageClauses.forEach(clause => {
          clause.types.forEach(type => {
            const typeName = type.expression.getText(sourceFile).split('<')[0]; // Extracts the base class name
            classDetails.inherits.push(typeName);
          });
        });
      }

      node.members.forEach(member => {
        if (member.name) {
          const memberName = member.name.getText(sourceFile);
          if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
            classDetails.fields.push({ name: memberName, type: 'field', access: 'public', 'lineNumber':  sourceFile.getLineAndCharacterOfPosition(member.pos).line + 1});
          }
          if (member.kind === ts.SyntaxKind.MethodDeclaration) {
            classDetails.methods.push({ name: memberName, type: 'method', access: 'public', 'lineNumber': sourceFile.getLineAndCharacterOfPosition(member.pos).line + 1 });
          }
          if (member.kind === ts.SyntaxKind.GetAccessor || member.kind === ts.SyntaxKind.SetAccessor) {
            let contains = false;
            classDetails.accessors.forEach(accessor => {
              if (accessor.name === memberName) {
                contains = true;
              }
            });
            if (!contains) {
              classDetails.accessors.push({ name: memberName, type: 'accessor', access: 'public', 'lineNumber': sourceFile.getLineAndCharacterOfPosition(member.pos).line + 1 });
            }
          }
        }
      });
    }
  };

  sourceFile.forEachChild(findClass);

  return classDetails;
};

interface ClassDetails {
  name: string;
  fields: ClassMember[];
  methods: ClassMember[];
  accessors: ClassMember[];
  inherits: string[];
}

interface ClassMember {
  name: string;
  type: 'field' | 'method' | 'accessor';
  access: 'private' | 'public';
  lineNumber: number;
}
