#!/bin/sh
git config --global user.email "builds@circleci.com"
git config --global user.name "CircleCI"

echo "Deleting old publication"
rm -rf _site
mkdir _site
git worktree prune
rm -rf .git/worktrees/_site/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages _site origin/gh-pages

echo "Removing existing files"
rm -rf _site/*

echo "Generating site"
bundle exec jekyll build

echo "Updating gh-pages branch"
cd _site && touch .nojekyll && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

#echo "Pushing to github"
git push origin gh-pages
