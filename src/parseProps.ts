import { Project, InterfaceDeclaration, PropertySignature } from "ts-morph";

export interface PropInfo {
  name: string;
  type: string;
  isOptional: boolean;
  defaultValue?: string;
}

export function parseProps(filePath: string): PropInfo[] {
  const project = new Project();
  project.addSourceFileAtPath(filePath);

  const sourceFile = project.getSourceFileOrThrow(filePath);

  // Find interface ending with "Props"
  const interfaceDec = sourceFile.getInterfaces().find((i: InterfaceDeclaration) =>
    i.getName().endsWith("Props")
  );

  if (!interfaceDec) return [];

  return interfaceDec.getProperties().map((prop: PropertySignature) => ({
    name: prop.getName(),
    type: prop.getType().getText(),
    isOptional: prop.hasQuestionToken(),
    defaultValue: undefined // TODO: extract from initializer (if default assigned in component)
  }));
}
