#!/bin/bash

# Function to increment version
increment_version() {
  local version=$1
  local increment_type=$2

  # Split version into components
  IFS='.' read -r -a version_parts <<< "$version"
  local major="${version_parts[0]}"
  local minor="${version_parts[1]}"
  local patch="${version_parts[2]}"

  # Increment based on type
  case "$increment_type" in
    "patch")
      patch=$((patch + 1))
      ;;
    "minor")
      minor=$((minor + 1))
      patch=0
      ;;
    "major")
      major=$((major + 1))
      minor=0
      patch=0
      ;;
    *)
      echo "Invalid increment type. Use 'patch', 'minor', or 'major'."
      exit 1
      ;;
  esac

  echo "$major.$minor.$patch"
}

# Check if npm is logged in
npm whoami &> /dev/null
if [ $? -ne 0 ]; then
  echo "Error: You are not logged in to npm. Please run 'npm login' first."
  exit 1
fi

# Default increment type is patch
INCREMENT_TYPE=${1:-patch}

# Validate increment type
if [[ ! "$INCREMENT_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo "Error: Invalid increment type. Please use 'patch', 'minor', or 'major'."
  exit 1
fi

# Build TypeScript code
echo "Building TypeScript code..."
npm run build

if [ $? -ne 0 ]; then
  echo "Error: Build failed. Aborting publish."
  exit 1
fi

# Get current version from package.json
CURRENT_VERSION=$(node -e "console.log(require('./package.json').version)")
echo "Current version: $CURRENT_VERSION"

# Increment version
NEW_VERSION=$(increment_version "$CURRENT_VERSION" "$INCREMENT_TYPE")
echo "New version: $NEW_VERSION"

# Update version in package.json
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
packageJson.version = '$NEW_VERSION';
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n');
"

# Commit the version change
echo "Committing version change..."
git add package.json
git commit -m "Bump version to $NEW_VERSION"

# Create git tag
echo "Creating git tag v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "Version $NEW_VERSION"

# Publish to npm
echo "Publishing to npm..."
npm publish

if [ $? -eq 0 ]; then
  echo "Successfully published version $NEW_VERSION to npm!"
  
  # Push changes and tags to remote repository
  echo "Pushing changes and tags to remote repository..."
  git push && git push --tags
  
  echo "Done!"
else
  echo "Error: Failed to publish to npm."
  exit 1
fi
