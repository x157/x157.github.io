# Agent Rules & Guidelines

This document contains rules and guidelines for AI Agents working on the `x157.github.io` project.

## Dependencies and Requirements
- **CRITICAL:** PowerShell 7+ is required. To check your version use `pwsh -Command 'Write-Output $PSVersionTable.PSVersion.Major'` and try whatever executables you have in your path like `pwsh` or `powershell`. Note `powershell` can sometimes be version 5 on older Windows systems, prefer use of `pwsh`.

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
    - **Running Local Server**: Use the following command to start the server from Windows: `wsl bash -c 'cd; bundle exec jekyll serve --livereload'`
    - Assume the environment is **Windows PowerShell (`pwsh`)**.
    - Do **NOT** assume POSIX commands (like `grep`, `ls`, `cat`) exist natively unless running inside WSL.
    - Use `Select-String` instead of `grep`, `Get-Content` instead of `cat`, etc.
    - Explicitly use `pwsh` for scripts where possible to avoid legacy `powershell.exe` issues.
    - **WSL Command Quoting**: Always wrap the command passed to `wsl` in SINGLE quotes to avoid shell expansion issues on the Windows side.
        - BAD: `wsl bash -c "echo $HOME"` (Windows tries to expand `$HOME`)
        - GOOD: `wsl bash -c 'echo $HOME'` (Passed literally to bash)
