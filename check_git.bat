@echo off
echo Checking Git installation...
git --version > git_version.txt
echo Git version saved to git_version.txt

echo Checking current directory...
cd > current_dir.txt
echo Current directory saved to current_dir.txt

echo Done!
pause
