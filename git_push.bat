@echo off
echo Starting git operations... > git_output.log
echo Current directory: %CD% >> git_output.log

echo Checking out gh-pages branch... >> git_output.log
git checkout gh-pages >> git_output.log 2>&1

echo Adding all changes... >> git_output.log
git add . >> git_output.log 2>&1

echo Committing changes... >> git_output.log
git commit -m "Update gh-pages branch" >> git_output.log 2>&1

echo Pushing to GitHub... >> git_output.log
git push origin gh-pages >> git_output.log 2>&1

echo All operations completed! >> git_output.log
echo Check git_output.log for details.
