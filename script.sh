#!/bin/sh

# Required Node version: 16+

# Get machine: mac vs linux
machine=0
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
if [ $machine == "Linux" ]; then
	machine=$(lsb_release -is)
fi
# check if node installed?
echo "Checking if Node is installed ..."
if command --version node &>/dev/null; then
  echo "Installing Node v.16..."
  if [ $machine == "Mac" ]; then
  	curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/latest-v16.x/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
	fi
	if [ $machine == "Fedora" ] || [ $machine == "Red Hat" ]; then
		dnf module install nodejs:16/common
	fi
	if [ $machine == "Ubuntu" ] || [ $machine == "Debian" ]; then
		sudo apt-get install curl
		curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
	fi
  echo "Node successfully installed."
else
	# Node already installed
  nodeversion=$(node -v | grep -o  '[0-9]\+' | head -n 1)
  # if node version not compatible:
  if [ $nodeversion < 16 ]; then
		# install nvm if not currently installed
		if ! [ -d "${HOME}/.nvm/.git" ]; then
			curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
		fi
		# install node v16 via nvm
		nvm install 16.12.0
		nvm use 16.12.0
		echo "Node updated to compatible version"
	fi
  sleep 5
fi
# Install dependencies and run
npm install
npm install -g