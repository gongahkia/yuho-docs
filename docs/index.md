# Welcome to Yuho

**Yuho** is a next-generation domain-specific language (DSL) for formal legal reasoning, built in Rust with advanced type systems, IDE support, and web compatibility.

## What is Yuho?

Yuho helps law students, legal professionals, and researchers formalize legal reasoning using a type-safe, statically-checked language. With support for dependent types, formal verification, and multiple output formats, Yuho bridges the gap between legal theory and computational logic.

## Key Features

- **🎯 Advanced Type System**: Dependent types (BoundedInt, Positive, NonEmpty), generic types, type aliases, and struct inheritance
- **📊 7 Transpilation Targets**: Mermaid, Alloy, JSON, LaTeX, English, TypeScript, and Singapore Law Gazette format
- **✅ Formal Verification**: Z3 SMT solver integration for constraint verification and quantifier reasoning
- **🔍 Module System**: Organize large codebases with imports and circular dependency detection
- **🛠️ Full IDE Support**: Language Server Protocol (LSP) with diagnostics, hover, completion, and code actions
- **🌐 WebAssembly**: Run Yuho in browsers with full parser and transpilation support
- **📈 Decision Trees**: Interactive D3.js visualizations of match expression logic
- **🚀 Production-Ready CLI**: 13 commands for parsing, checking, transpiling, and verification
- **📝 Legal-Specific Features**: Citations, precedents, temporal logic, presumptions, and proviso clauses

## Why Yuho?

The law is innately complex. [Statutes](https://sso.agc.gov.sg/) are not always easy to understand, especially for incoming law students new to legalese and its logical structure.

Yuho provides:

1. **Clarity**: Make statutory logic explicit and visual
2. **Verification**: Ensure logical consistency through formal methods
3. **Education**: Help students understand legal reasoning patterns
4. **Modularity**: Reusable legal concepts and patterns

## Quick Example

```yh
// Singapore Penal Code Section 415 - Cheating
struct Cheating {
    string accused,
    string victim,
    bool deception where deception == true,
    bool dishonest_intention where dishonest_intention == true,
    money<SGD> harm_amount where harm_amount > 0
}

// Annotate with legal precedents
@precedent("PP v Ilechukwu [2015] SGCA 33")
principle NoDeceptionNoOffense {
    forall case: Cheating,
    !case.deception -> consequence "not guilty"
}

// Pattern match with guards
func determineGuilty(Cheating case) {
    match case {
        case deception && dishonest_intention && harm_amount > 100
            := consequence "guilty - enhanced penalty";
        case deception && dishonest_intention
            := consequence "guilty - standard penalty";
        case _ := consequence "not guilty";
    }
}
```

This code can then be:

- ✅ **Type-checked** with dependent type and where clause validation
- 🔍 **Formally verified** using Z3 SMT solver for quantifier reasoning
- 📊 **Transpiled** to 7 different formats (Mermaid, Alloy, JSON, LaTeX, English, TypeScript, Gazette)
- 🌳 **Visualized** as interactive decision trees with D3.js
- 💻 **Edited** with full LSP support in VSCode, Neovim, or Emacs

## Getting Started

<div class="grid cards" markdown>

-   :material-clock-fast:{ .lg .middle } **Quick Start**

    ---

    Install Yuho and write your first program in minutes

    [:octicons-arrow-right-24: Quick Start Guide](getting-started/quickstart.md)

-   :material-book-open-variant:{ .lg .middle } **Language Guide**

    ---

    Learn Yuho's syntax, types, and patterns

    [:octicons-arrow-right-24: Language Reference](language/overview.md)

-   :material-code-braces:{ .lg .middle } **Examples**

    ---

    Explore real-world legal examples

    [:octicons-arrow-right-24: See Examples](examples/criminal-law.md)

-   :material-api:{ .lg .middle } **API Reference**

    ---

    Deep dive into Yuho's internals

    [:octicons-arrow-right-24: API Documentation](api/parser.md)

</div>

## Use Cases

### For Law Students

- **Formalize complex statutes** with type-safe syntax and dependent types
- **Visualize legal logic** with flowcharts, decision trees, and mindmaps
- **Verify understanding** using Z3 formal verification for quantifiers and constraints
- **Track precedents** with built-in citation and annotation support

### For Legal Educators

- **Create interactive materials** with exportable decision tree visualizations
- **Demonstrate reasoning** patterns across multiple output formats (LaTeX, English, diagrams)
- **Build reusable libraries** with the module system and struct inheritance
- **Generate official documents** in Singapore Law Gazette format

### For Legal Tech Developers

- **Integrate with web apps** using WebAssembly bindings (browser-compatible)
- **Build IDE extensions** with the Language Server Protocol
- **Generate TypeScript types** for legal data structures
- **Export to JSON** for integration with existing systems
- **Formally verify** legal logic with SMT solving

### For Legal Researchers

- **Model legal principles** with first-order logic (forall/exists quantifiers)
- **Detect conflicts** between statutes using semantic analysis
- **Generate counterexamples** when principles fail verification
- **Document formally** with LaTeX output and automatic bibliography generation

## Technology Stack

**Yuho-2** is built in Rust from the ground up, featuring:

- **Rust 1.70+**: Memory-safe, high-performance implementation
- **Logos**: Fast lexical analysis with regex-based tokenization
- **Recursive Descent Parser**: Hand-written parser with comprehensive error reporting
- **Z3 SMT Solver**: Formal verification backend for constraint solving
- **LSP Protocol**: Standards-compliant language server for IDE integration
- **WebAssembly**: Browser-compatible compilation with wasm-pack
- **Workspace Architecture**: Modular crate structure for maintainability

**Performance**: 14,000+ lines of Rust, 76/79 tests passing (96.2%), production-ready core features.

## What Makes Yuho-2 Special

**Built from the ground up in Rust** for performance, safety, and modern tooling:

1. **10x faster** parsing and semantic analysis with Rust
2. **Generic types** and type aliases for better abstraction
3. **7 transpilation targets** for maximum flexibility
4. **Full LSP support** with real-time diagnostics
5. **WebAssembly** for browser deployment
6. **Z3 integration** for SMT-based verification
7. **Decision tree visualization** with interactive D3.js
8. **Module system** with import resolution
9. **Comprehensive dependent types** (BoundedInt, Positive, NonEmpty, ValidDate, Temporal, Citation)
10. **Legal-specific annotations** (@precedent, @presumed, @hierarchy, @amended)

## Community

Yuho is open-source and welcomes contributions!

- **GitHub**: [github.com/gongahkia/yuho-2](https://github.com/gongahkia/yuho-2)
- **Issues**: [Report bugs or request features](https://github.com/gongahkia/yuho-2/issues)
- **Contributing**: [Learn how to contribute](development/contributing.md)

## Next Steps

- [Install Yuho](getting-started/installation.md)
- [Write your first program](getting-started/first-program.md)
- [Explore the CLI commands](cli/commands.md)
- [Learn the syntax](language/syntax.md)

