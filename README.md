# x157.github.io

This is the source for [x157.github.io](https://x157.github.io)

This site uses:

- [Jekyll](https://jekyllrb.com/)
- the [Hacker](https://github.com/pages-themes/hacker) GitHub Pages theme


# Local Testing

I'm now able to locally test x157.github.io on my Windows workstation thanks to WSL.  It's amazing to have Linux on Windows.  Thanks WSL!

To set it up, follow the steps below.  For additional reading, consider: [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)


## Set up [WSL](https://docs.microsoft.com/en-us/windows/wsl/setup/environment) - Windows Linux Subsystem
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
    
    gem install jekyll-coffeescript
    gem install jekyll-default-layout
    gem install jekyll-gist
    gem install jekyll-github-metadata
    gem install jekyll-optional-front-matter
    gem install jekyll-paginate
    gem install jekyll-readme-index
    gem install jekyll-relative-links
    gem install jekyll-titles-from-headings
    ```
  - Regularly update all of these gems to stay up to date with Github

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
  - If `bootstrap` fails, check for and fix errors and try again.

## View your local copy
```shell
cd x157.github.io
bundle exec jekyll serve --livereload
```
- Open browser to [http://localhost:4000](http://localhost:4000)
- `--livereload` tag causes Jekyll to automatically reload modified source files without requiring a restart
