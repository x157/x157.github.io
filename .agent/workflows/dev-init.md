---
description: Initialize development environment for testing by reading DEVELOPMENT.md
---

1. Read `DEVELOPMENT.md` to identify the required setup steps for "Windows + WSL".
2. Verify that WSL is installed by running `wsl --version`.
3. Check if Ruby and Jekyll are installed within WSL as per the instructions.
4. If Ruby or Jekyll are missing, run the installation commands documented in `DEVELOPMENT.md` (e.g., `apt install ruby-full`, `gem install jekyll bundler`).
5. Ensure the local gem path configuration is set up in `~/.bashrc` as described in `DEVELOPMENT.md`.
6. Run `bundle install` within the project directory (inside wsl if necessary) to install all site dependencies.
