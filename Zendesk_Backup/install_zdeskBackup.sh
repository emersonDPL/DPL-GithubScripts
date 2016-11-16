#!/bin/bash

curl -O https://www.python.org/ftp/python/3.5.2/python-3.5.2-macosx10.6.pkg;
wait;
sudo installer -pkg python-3.5.2-macosx10.6.pkg -target /;
curl -O https://bootstrap.pypa.io/get-pip.py;
wait;
sudo python get-pip.py;
wait;
sudo pip install bs4;
sudo pip install requests;
sudo pip3 install requests;
sudo pip3 install bs4;
echo “Everything Installed…”
echo “Now running backup script…”
sleep 4
curl -O https://raw.githubusercontent.com/pyrosousa/DPL-GithubScripts/master/Zendesk_Backup/Zendesk_Backup.py;
python3 Zendesk_Backup.py;
rm python-3.5.2-macosx10.6.pkg;
rm get-pip.py;
rm install.sh;
exit 1;