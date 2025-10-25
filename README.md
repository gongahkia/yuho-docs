# Yuho Documentation

This repository contains the official documentation website for [Yuho](https://github.com/gongahkia/yuho), a domain-specific language for simplifying legal reasoning.

## Overview

The documentation is built using [MkDocs](https://www.mkdocs.org/) with the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

## Repository Structure

```
yuho-docs/
├── docs/              # Documentation source files
│   ├── about/        # About, FAQ, changelog, etc.
│   ├── api/          # API reference documentation
│   ├── cli/          # CLI command documentation
│   ├── development/  # Development guides
│   ├── examples/     # Code examples
│   ├── getting-started/  # Installation and quickstart
│   ├── language/     # Language guide
│   ├── transpilers/  # Transpiler documentation
│   ├── javascripts/  # Custom JavaScript
│   ├── stylesheets/  # Custom CSS
│   └── index.md      # Homepage
├── site/             # Built static site (generated)
└── mkdocs.yml        # MkDocs configuration
```

## Building the Documentation

### Prerequisites

- Python 3.7+
- pip

### Installation

Install MkDocs and required dependencies:

```bash
pip install mkdocs
pip install mkdocs-material
pip install mkdocstrings[python]
```

### Local Development

To serve the documentation locally with live reload:

```bash
mkdocs serve
```

The documentation will be available at `http://127.0.0.1:8000/`

### Building

To build the static site:

```bash
mkdocs build
```

The built site will be in the `site/` directory.

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

To manually deploy:

```bash
mkdocs gh-deploy
```

## Contributing

Contributions to the documentation are welcome! Please see the main [Yuho repository](https://github.com/gongahkia/yuho) for contribution guidelines.

## License

Same license as the main Yuho project.
