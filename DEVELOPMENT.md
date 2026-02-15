# Development Setup

There are three supported ways to test the site:
1.  **Windows + WSL** (Current)
2.  **Any + Docker** (Planned)
3.  **Local** (Planned)

## 1. Windows + WSL

### Prerequisites
We recommend using **WSL (Windows Subsystem for Linux)** for the best compatibility with Jekyll on Windows.

#### 1. Verification
Ensure WSL is installed (PowerShell):
```pwsh
wsl --version
```

#### 2. Install Ruby & Jekyll (using WSL)

0. **Check if already installed**:
    ```pwsh
    wsl bash -ic 'gem list jekyll'
    ```

1.  **Update & Install Ruby**:
    ```pwsh
    wsl -u root bash -ic 'apt update'
    wsl -u root bash -ic 'apt install ruby-full build-essential zlib1g-dev'
    ```

2.  **Configure Gem Path** (avoids using sudo for gems):
    ```pwsh
    $foundSetup = wsl bash -ic "grep '# Install Ruby Gems to ~/gems' ~/.bashrc | wc -l"
    if ($foundSetup -eq 0) {
        echo '# Install Ruby Gems to ~/gems' | wsl bash -ic 'tee -a ~/.bashrc'
        echo 'export GEM_HOME="~/gems"' | wsl bash -ic 'tee -a ~/.bashrc'
        echo 'export PATH="~/gems/bin:$PATH"' | wsl bash -ic 'tee -a ~/.bashrc'
    }
    ```

3.  **Install Jekyll & Bundler**:
    ```pwsh
    wsl bash -ic 'gem install jekyll bundler'
    ```

### Running

1.  **Clone/Setup Repo (in WSL)**:
    ```bash
    git clone https://github.com/x157/x157.github.io.git
    cd x157.github.io
    bundle add jekyll-redirect-from
    bundle install
    ```

2.  **Start Server**:
    This command will NOT exit until the server is stopped. To stop the server, press `Ctrl+C`.
    ```bash
    bundle exec jekyll serve --livereload
    ```

    > [!IMPORTANT]
    > **AI Agents**: You **MUST** run this command inside WSL using the following format to ensure bash starts in the home directory:
    > `wsl bash -c 'cd; bundle exec jekyll serve --livereload'`

    *Tip: If `bundle` is not found, restart your terminal to load the new path configuration.*

3.  **View Site**:
    Open [http://localhost:4000](http://localhost:4000) in your Windows browser.

## 2. Any + Docker
*Details coming soon.*

## 3. Local
*Details coming soon.*
