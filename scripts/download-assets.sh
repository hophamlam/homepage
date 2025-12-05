#!/bin/bash

# Script để download assets từ GitHub repo cũ
# Usage: ./scripts/download-assets.sh

REPO_URL="https://github.com/hophamlam/homepage/raw/master"
ASSETS_DIR="public/assets"
STATIC_DIR="public/static"

# Tạo thư mục nếu chưa có
mkdir -p "$ASSETS_DIR"
mkdir -p "$STATIC_DIR"

echo "Downloading assets from GitHub..."

# Download từ thư mục assets (nếu có files cụ thể)
# Bạn cần thay thế bằng tên files thực tế
# Ví dụ:
# curl -L "$REPO_URL/assets/icon.svg" -o "$ASSETS_DIR/icon.svg"

# Download từ thư mục static (nếu có files cụ thể)
# Ví dụ:
# curl -L "$REPO_URL/static/favicon.ico" -o "$STATIC_DIR/favicon.ico"

echo "Done! Check $ASSETS_DIR and $STATIC_DIR"

