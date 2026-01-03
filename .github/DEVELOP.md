# Develop Branch

This is the develop branch for daily development work.

## Created
- Date: 2026-01-03
- Based on: main branch

## Purpose
This branch serves as the integration branch for daily development. All feature branches should be merged here first before going to production (main branch).

## Usage
```bash
# Switch to develop branch
git checkout develop

# Pull latest changes
git pull origin develop

# Create a feature branch
git checkout -b feature/your-feature-name

# After development, merge back to develop
git checkout develop
git merge feature/your-feature-name
```
