#!/usr/local/bin/python3
# Referencing https://help.zendesk.com/hc/en-us/articles/229136947-Zendesk-REST-API-tutorial-Backing-up-your-knowledge-base-with-Python
# Also Charles Nadeau added functionality for downloading images

# Important Requirements to be installed:
# Python 3 (https://www.python.org/downloads/)
# pip (python get-pip.py)
# 	BeautifulSoup (pip install bs4; pip3 install bs4)
# 	Requests (pip install requests; pip3 install requests)

import requests
import getpass
import os
import datetime
from bs4 import BeautifulSoup

os.system('clear')

un = input("Username: ")
pw = getpass.getpass()

credentials = un, pw
session = requests.Session()
session.auth = credentials

zendesk = 'https://emersonpostproduction.zendesk.com'
language = 'en-us'

date = datetime.date.today()
backup_path = os.path.join(str(date),language)
if not os.path.exists(backup_path):
	os.makedirs(backup_path)

endpoint = zendesk + '/api/v2/help_center/{locale}/articles.json?include=sections'.format(locale=language.lower())
while endpoint:
	response = session.get(endpoint)

	if response.status_code != 200:
		print('Failed to retrive articles with error {}'.format(response.status_code))
		exit()

	data = response.json()
	for article in data['articles']:
		# print(article['id'])
		

		title = '<h1>' + article['title'] + '</h1>'
		fileTitle=article['title']
		fileTitleReduced=''.join(e for e in fileTitle if e.isalnum())
		filename = '{id}_{title}.html'.format(id=article['id'],title=fileTitleReduced)
		thisDirPath = os.path.join(backup_path,fileTitleReduced)
		if not os.path.exists(thisDirPath):
			os.makedirs(thisDirPath)
		with open (os.path.join(thisDirPath, filename), mode='w', encoding='utf-8') as f:
			f.write(title + '\n' + article['body'])
		print('Downloaded:	{id}-{title}'.format(id=article['id'],title=fileTitleReduced)) 

		tree=BeautifulSoup(article['body'],"html.parser")
		images=tree.find_all('img')

		for image in images:
			src = image['src']
			if src[:4] != 'http':
				continue
			response = session.get(src, stream=True)

			file_name = src.split('/')[-1]
			image_dir = src.split('/')[-2]
			file_name = str(article['id']) + '_' + file_name
			with open(os.path.join(thisDirPath, file_name), mode='wb') as f:
				for chunk in response.iter_content():
					f.write(chunk)


	endpoint =  data['next_page']