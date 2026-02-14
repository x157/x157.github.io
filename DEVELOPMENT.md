# Development Setup

## Prerequisites (Windows)
We recommend using **WSL (Windows Subsystem for Linux)** for the best compatibility with Jekyll.

### 1. Verification
Ensure WSL is installed (PowerShell):
```powershell
wsl --version
```

### 2. Install Ruby & Jekyll (in WSL)
Open your WSL terminal (e.g., Ubuntu) and run:

1.  **Update & Install Ruby**:
    ```bash
    sudo apt update
    sudo apt install ruby-full build-essential zlib1g-dev
    ```

2.  **Configure Gem Path** (avoids using sudo for gems):
    ```bash
    echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
    echo 'export GEM_HOME="~/gems"' >> ~/.bashrc
    echo 'export PATH="~/gems/bin:$PATH"' >> ~/.bashrc
    source ~/.bashrc
    ```

3.  **Install Jekyll & Bundler**:
    ```bash
    gem install jekyll bundler
    ```

## Running Locally

1.  **Clone/Setup Repo (in WSL)**:
    ```bash
    git clone https://github.com/x157/x157.github.io.git
    cd x157.github.io
    bundle add jekyll-redirect-from
    bundle install
    ```

2.  **Start Server**:
    ```bash
    bundle exec jekyll serve --host 0.0.0.0 --livereload
    ```
    *Tip: If `bundle` is not found, restart your terminal to load the new path configuration.*

3.  **View Site**:
    Open [http://localhost:4000](http://localhost:4000) in your Windows browser.
