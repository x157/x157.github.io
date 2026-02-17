# Development Dockerfile for Jekyll site
FROM ruby:3.3-slim

# Install build dependencies for native gem extensions
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    git \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

# Expose Jekyll's default port + LiveReload port
EXPOSE 4000 35729

# Entrypoint: install/update gems then exec the CMD
# This handles Gemfile.lock platform mismatches when bind-mounting from the host
ENTRYPOINT ["sh", "-c", "bundle install && exec \"$@\"", "--"]

# Default command: serve with livereload, bind to all interfaces so the
# host can reach the container
CMD ["bundle", "exec", "jekyll", "serve", \
    "--host", "0.0.0.0", \
    "--livereload", \
    "--force_polling"]
