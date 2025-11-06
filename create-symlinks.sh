#!/bin/bash

# Source and target directories
SOURCE_DIR="rpa-devops/docs/github-actions/reusable-workflows/uipath"
TARGET_DIR="docs/github-actions/reusable-workflows/uipath"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Find .md and .mdx files (excluding index.mdx) and create symlinks
find "$SOURCE_DIR" -type f \( -name "*.md" -o -name "*.mdx" \) ! -name "index.mdx" | while read -r file; do
    # Get the relative path from source directory
    relative_path="${file#$SOURCE_DIR/}"
    
    # Create directory structure in target if needed
    target_file_dir="$TARGET_DIR/$(dirname "$relative_path")"
    mkdir -p "$target_file_dir"
    
    # Create the symlink
    target_file="$TARGET_DIR/$relative_path"
    
    # Remove existing symlink/file if it exists
    if [ -e "$target_file" ] || [ -L "$target_file" ]; then
        rm "$target_file"
    fi
    
    # Create symlink with absolute path
    ln -s "$(realpath "$file")" "$target_file"
    
    echo "Created symlink: $target_file -> $file"
done

echo "Done creating symlinks!"