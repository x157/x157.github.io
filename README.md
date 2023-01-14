# x157.github.io

This is the source for [x157.github.io](https://x157.github.io)

This site uses:

- [Jekyll](https://jekyllrb.com/)
- [Jekyll Sitemap Plugin](https://github.com/jekyll/jekyll-sitemap)
- the [Hacker](https://github.com/pages-themes/hacker) GitHub Pages theme


# Preferred Editor

I'm a JetBrains fanboi.  I edit this repository with:

- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
  - Plugin: [Liquid](https://plugins.jetbrains.com/plugin/14388-liquid)
  - Plugin: [Markdown](https://plugins.jetbrains.com/plugin/7793-markdown)
  - Plugin: [Ruby](https://plugins.jetbrains.com/plugin/1293-ruby)
  - Plugin: [YAML](https://plugins.jetbrains.com/plugin/13126-yaml)

# Local Testing

I'm now able to locally test x157.github.io on my Windows workstation thanks to WSL.  It's amazing to have Linux on Windows.  Thanks WSL!

To set it up, follow the steps below.  For additional reading, consider: [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)


## Set up [WSL](https://docs.microsoft.com/en-us/windows/wsl/setup/environment) - Windows Linux Subsystem
- [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/setup/environment) - Linux on Windows
- requires Reboot

## Install [Jekyll](https://jekyllrb.com/docs/)
- requires Ruby:
  - install rbenv
  - install ruby + headers (required)
  ```shell
  sudo apt install rbenv
  sudo apt install ruby-dev
  ```
- requires `github-pages` gem
  - to install:
    ```shell
    gem install github-pages
    gem install jekyll-theme-hacker
    ```
  - Update these gems whenever you get out of sync with Github
    ```shell
    gem update github-pages jekyll-theme-hacker
    ```

## Clone this repo
- Repo MUST BE:
  - Owned by your Linux user
  - On your Linux filesystem
- Must initialize it the first time:
  ```shell
  git clone https://github.com/x157/x157.github.io
  cd x157.github.io
  ./script/bootstrap
  ```
  - While `bootstrap` fails, find + fix errors + try again.

## View your local copy
```shell
cd x157.github.io
bundle exec jekyll serve
```
- Open browser to [http://localhost:4000](http://localhost:4000)
- *Notice: You may need to restart Jekyll each time you save a file in order to see the change.*
  - If so, try `jekyll serve --livereload`
