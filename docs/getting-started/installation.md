# Installation

This guide will help you install Yuho-2 on your system.

## Prerequisites

Before installing Yuho, ensure you have:

- **Rust 1.70 or higher** (for building from source)
- **Cargo** (Rust package manager, comes with Rust)
- **Git** (for development installation)

### Check Rust Version

```bash
rustc --version
cargo --version
```

You should see output like `rustc 1.70.x` or higher.

### Install Rust

If you don't have Rust installed:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Or visit [rustup.rs](https://rustup.rs/) for platform-specific instructions.

## Installation Methods

=== "Production (cargo)"

    ### Install from Crates.io (Recommended)

    Once published, you can install Yuho directly from crates.io:

    ```bash
    cargo install yuho
    ```

    Verify the installation:

    ```bash
    yuho --version
    ```

=== "Development (source)"

    ### Install from Source

    For development or to get the latest features:

    1. Clone the repository:

    ```bash
    git clone https://github.com/gongahkia/yuho-2.git
    cd yuho-2
    ```

    2. Build and install:

    ```bash
    cargo build --release
    cargo install --path .
    ```

    Or for development (debug mode):

    ```bash
    cargo build
    ```

    3. Verify installation:

    ```bash
    yuho --version
    ```

=== "Docker"

    ### Using Docker

    The easiest way to run Yuho without installing Rust:

    1. Pull the image (once available):

    ```bash
    docker pull yuho:latest
    ```

    Or build locally:

    ```bash
    git clone https://github.com/gongahkia/yuho-2.git
    cd yuho-2
    docker build -t yuho:latest .
    ```

    2. Run Yuho:

    ```bash
    # Check a file
    docker run --rm -v $(pwd):/workspace yuho:latest check example.yh

    # Start REPL
    docker run --rm -it yuho:latest yuho repl
    ```

    3. Using docker-compose:

    ```bash
    # Development environment
    docker-compose up yuho-dev

    # Run tests
    docker-compose up yuho-test

    # Interactive REPL
    docker-compose run --rm yuho-repl
    ```

## Verify Installation

After installation, verify Yuho is working:

```bash
# Check version
yuho --version

# Get help
yuho --help

# Try the REPL
yuho repl
```

You should see output indicating Yuho v2.0.0 or later.

## Development Setup

If you plan to contribute to Yuho:

1. Clone and build:

```bash
git clone https://github.com/gongahkia/yuho-2.git
cd yuho-2
cargo build
```

2. Run tests:

```bash
cargo test
```

3. Check code quality:

```bash
cargo clippy
cargo fmt --check
```

4. Build documentation:

```bash
cargo doc --open
```

## Platform-Specific Notes

### Linux

Rust installation should work out of the box on most distributions. You may need to install additional dependencies:

```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# Fedora
sudo dnf install gcc
```

### macOS

Rust works great on macOS. Ensure you have Xcode Command Line Tools:

```bash
xcode-select --install
```

### Windows

1. Install Rust from [rustup.rs](https://rustup.rs/)
2. Install Visual Studio C++ Build Tools
3. Use PowerShell or Command Prompt for commands

## Troubleshooting

### Command not found

If `yuho` command is not found after installation:

1. Check if Cargo's bin directory is in PATH:

```bash
echo $PATH | grep .cargo/bin
```

2. Add Cargo's bin directory to your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.cargo/bin:$PATH"
```

### Build errors

If you encounter build errors:

1. Update Rust to the latest version:

```bash
rustup update
```

2. Clean build artifacts and rebuild:

```bash
cargo clean
cargo build --release
```

### Docker issues

Ensure Docker is running:

```bash
docker --version
docker ps
```

### Z3 Solver Issues

If Z3 integration is not working:

1. Ensure Z3 is installed on your system
2. Check Z3 is in your PATH
3. Refer to Z3 installation documentation

## Next Steps

- [Quick Start Guide](quickstart.md) - Get started with Yuho
- [Your First Program](first-program.md) - Write your first Yuho program
- [CLI Commands](../cli/commands.md) - Learn the command-line interface

