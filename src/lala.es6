'use strict';

import needle from 'needle';
import Promise from 'promise';
import storage from 'node-persist';
import promptly from 'promptly';

let needleGet = Promise.denodeify(needle.get);
let promptlyPrompt = Promise.denodeify(promptly.prompt);
let promptlyPassword = Promise.denodeify(promptly.password);
let promptlyConfim = Promise.denodeify(promptly.confirm);

storage.initSync({
	dir: '.lala'
});

export default class Lala {
	constructor() {
		this.auth = {};
		this.authKey = 'auth';
		this.rateLimitUrl = 'https://api.github.com/rate_limit';
		this.contentsUrl = 'https://api.github.com/repos/github/gitignore/contents/';
		this.load();
	}
	config(username, password) {
		var savedMessage = 'Configuration saved.';

		if (!!username && !!password) {
			 this.save(username, password);
			 console.log(savedMessage);
			 return;
		}

		var self = this;
		var temp = {};
		console.log('Configure GitHub authentication\n');
		return promptlyPrompt('GitHub username:')
			.then(function(username) {
				return (temp.username = username);
			})
			.then(function() {
				return promptlyPassword('GitHub password or API token:')
			})
			.then(function(password) {
				return (temp.password = password);
			})
			.then(function() {
				self.save(temp.username, temp.password);
				console.log('\n' + savedMessage);
			});
	}
	load() {
		this.auth = storage.getItemSync(this.authKey)
	}
	save(username, password) {
		storage.setItemSync(this.authKey, {
			username: username,
			password: password
		});
	}
	limit() {
		return needleGet(this.rateLimitUrl, this.auth)
			.then(function(response) {
				console.log(response.body);
			});
	}
	list() {
		var self = this;
		return needleGet(this.contentsUrl, this.auth)
			.then(function(response) {
				var data = response.body;
				var templates = '';
				data.map(function(template) {
					templates += (templates.length > 0 ? ', ' : '') + self.clean(template.name);
				});
				console.log(templates);
			});
	}
	ignore(template) {
		var self = this;
		return needleGet(this.contentsUrl, this.auth)
			.then(function(response) {
				var data = response.body;
				for(var index in data) {
					var current = data[index];
					if (self.clean(current.name) === template)
						return current.url;
				}
			})
			.then(function(url) { return needleGet(url, self.auth); })
			.then(function(response) { return response.body["download_url"]; })
			.then(function(url) { return needleGet(url); })
			.then(function(response) { console.log('#\n# Lala - ' + template + ' (' + 'https://' + response.client._host + response.client._httpMessage.path + ')\n#\n\n' + response.body); });
	}
	clean(name) {
		return name.replace(/.gitignore/g, '').toLowerCase();
	}
}
