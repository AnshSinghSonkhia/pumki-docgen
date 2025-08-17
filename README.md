# pumki-docgen

Generate beautiful MDX documentation for your React components automatically.

## Features
- Parses TypeScript React component props
- Generates ready-to-use MDX docs with usage, installation, and props tables
- CLI for easy integration

## Installation

You can use `pumki-docgen` via npx (no install required) or install it globally:

```bash
npx pumki-docgen <component.tsx> <output.mdx>
# or install globally
npm install -g pumki-docgen
# or
pnpm add -g pumki-docgen
```

## Usage

```bash
npx pumki-docgen <component.tsx> <output.mdx>
```

Example (real usage):

```bash
npx pumki-docgen components/pumki-ui/animations/ballpit.tsx content/animations/ballpit.mdx
```

This will generate an MDX documentation file for your component, including:
- Usage example
- Installation instructions
- Props table (auto-generated from your TypeScript interface)

## How it works
- Parses the component file for an interface ending with `Props`
- Extracts prop names, types, and optional/default status
- Generates an MDX file with a preview, installation, usage, and props table

## CLI Reference

```
npx pumki-docgen <component.tsx> <output.mdx>
```
- `<component.tsx>`: Path to your React component file
- `<output.mdx>`: Path to the output MDX file

## Example Output
See `HoverCard.mdx` for a sample generated file.

## License
MIT