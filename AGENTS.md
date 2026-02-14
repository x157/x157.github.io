# Agent Rules & Guidelines

This document contains rules and guidelines for AI Agents working on the `x157.github.io` project.

## URL Standards
- **Clean URLs**: Do **NOT** create URLs with file extensions (e.g., `/foo.html`). Always use the clean path (e.g., `/foo`).
    - Jekyll will automatically handle the resolution of `foo.md` or `foo.html` to `/foo` in the build process (permalinks).
    - When linking to internal pages, always use the clean URL format.

## Content Management
- **Backward Compatibility**: Always ensure legacy URLs redirect to new locations.
- **Privacy**: Do not add tracking scripts beyond the approved Google Analytics configuration.

## Development Environment
- **Documentation**: Whenever new setup steps for WSL or local development are discovered, **IMMEDIATELY** update `DEVELOPMENT.md`.
- **Consistency**: Ensure `DEVELOPMENT.md` is the single source of truth for setting up the project locally.
- **Shell Compatibility**:
    - **Testing**: Always run tests and the local server inside **WSL (Windows Subsystem for Linux)**, as detailed in `DEVELOPMENT.md`. Do not attempt to run `jekyll` or `bundle` commands directly in PowerShell on Windows.
    - Assume the environment is **Windows PowerShell (`pwsh`)**.
    - Do **NOT** assume POSIX commands (like `grep`, `ls`, `cat`) exist natively unless running inside WSL.
    - Use `Select-String` instead of `grep`, `Get-Content` instead of `cat`, etc.
    - Explicitly use `pwsh` for scripts where possible to avoid legacy `powershell.exe` issues.
