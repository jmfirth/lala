'use strict';

import needle from 'needle';
import Promise from 'promise';

export default class Lala {
	constructor(username, password) {
		this.config = !!username && !!password ? { username: username, password: password } : null;
		this.rateLimitUrl = 'https://api.github.com/rate_limit';
		this.contentsUrl = 'https://api.github.com/repos/github/gitignore/contents/';
		this.get = Promise.denodeify(needle.get);
	}
	limit() {
		return this.get(this.rateLimitUrl, this.config)
			.then(function(response) {
				console.log(response.body);
			});
	}
	list() {
		var self = this;
		return this.get(this.contentsUrl, this.config)
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
		return this.get(this.contentsUrl, this.config)
			.then(function(response) {
				var data = response.body;
				for(var index in data) {
					var current = data[index];
					if (self.clean(current.name) === template)
						return current.url;
				}
			})
			.then(function(url) { return self.get(url); })
			.then(function(response) { return response.body["download_url"]; })
			.then(function(url) { return self.get(url); })
			.then(function(response) { console.log('#\n# lala - ' + template + '\n#\n\n' + response.body); });
	}
	clean(name) {
		return name.replace(/.gitignore/g, '').toLowerCase();
	}
	help() {
		console.log(`
lala - Ignore things.

Usage:

list           -  List available ignore templates.
<template>...  -  Output one or more ignore templates to console.
help           -  Get help.
limit           -  Check your rate limit.

Parameters:

-u | --username  -  GitHub username
-p | --password  -  GitHub password

Examples:

lala list
lala node python > .gitignore
lala java > .hgignore
lala help
		`);
	}
}
