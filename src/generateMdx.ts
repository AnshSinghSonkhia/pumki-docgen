import { PropInfo } from "./parseProps.js";
import path from "path";

function toPascalCase(fileName: string): string {
  const base = fileName.replace(/\.tsx$/, "");
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function generateMdx(
  props: PropInfo[],
  inputPath: string
): string {
  const fileName = path.basename(inputPath, ".tsx");
  const componentName = toPascalCase(fileName);
  const relativePath = inputPath
    .replace(/^components\//, "@/components/")
    .replace(/\\/g, "/"); // fix Windows backslashes

  return `---
title: "${componentName} - Pumki UI"
---

import { Tabs } from 'nextra/components'
import { Callout } from 'nextra/components'
import { CodeBlock } from '../../components/docs/code-block'
import { Preview, ResponsivePreview } from '../../components/docs/preview'
import { Button } from '../../components/ui/button'
import ${componentName} from '${relativePath}'

# ${componentName}

<Preview 
  code={\`'use client';

import ${componentName} from '${relativePath}'

export const ${componentName}Demo = () => {
    return (
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <${componentName} />
        </div>
    );
};\`}
>
    <${componentName} />
</Preview>

## Installation

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']} defaultIndex="1">
  <Tabs.Tab>
    <CodeBlock language="bash" showLineNumbers={false}>
      {\`pnpm dlx pumki add ${fileName}\`}
    </CodeBlock>
  </Tabs.Tab>
  <Tabs.Tab>
    <CodeBlock language="bash" showLineNumbers={false}>
      {\`npx pumki add ${fileName}\`}
    </CodeBlock>
  </Tabs.Tab>
  <Tabs.Tab>
    <CodeBlock language="bash" showLineNumbers={false}>
      {\`yarn dlx pumki add ${fileName}\`}
    </CodeBlock>
  </Tabs.Tab>
  <Tabs.Tab>
    <CodeBlock language="bash" showLineNumbers={false}>
      {\`bun x pumki add ${fileName}\`}
    </CodeBlock>
  </Tabs.Tab>
</Tabs>

## Usage

<br/>

<CodeBlock language="typescript" showLineNumbers={false}>
    {\`import ${componentName} from '${relativePath}';\`}
</CodeBlock>

<br/>

<CodeBlock language="typescript">
    {\`<${componentName} />\`}
</CodeBlock>

## Props

import { PumkiTable, PumkiTableStyles } from '../../components/docs/PumkiTable'

<PumkiTableStyles />
<PumkiTable>
<table className="pumki-table">
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${props
      .map(
        (p) =>
          `<tr><td><code>${p.name}</code></td><td><code>${p.type}</code></td><td><code>${
            p.defaultValue ?? (p.isOptional ? "—" : "required")
          }</code></td><td>// TODO: description</td></tr>`
      )
      .join("\n    ")}
  </tbody>
</table>
</PumkiTable>
`;
}
