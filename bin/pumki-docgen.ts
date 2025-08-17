#!/usr/bin/env node

import { generateMdx } from "../src/generateMdx.js";
import { parseProps } from "../src/parseProps.js";
import fs from "fs";
import path from "path";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: pumki-docgen <component.tsx> <output.mdx>");
  process.exit(1);
}

(async () => {
  const props = parseProps(inputPath);

  const componentName = path.basename(inputPath, path.extname(inputPath));
  const mdx = generateMdx(props, inputPath);

  fs.writeFileSync(outputPath, mdx, "utf-8");
  console.log(`✅ Generated docs at ${outputPath}`);
})();
