'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _needle = require('needle');

var _needle2 = _interopRequireDefault(_needle);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var Lala = (function () {
	function Lala(username, password) {
		_classCallCheck(this, Lala);

		this.config = !!username && !!password ? { username: username, password: password } : null;
		this.rateLimitUrl = 'https://api.github.com/rate_limit';
		this.contentsUrl = 'https://api.github.com/repos/github/gitignore/contents/';
		this.get = _promise2['default'].denodeify(_needle2['default'].get);
	}

	_createClass(Lala, [{
		key: 'limit',
		value: function limit() {
			return this.get(this.rateLimitUrl, this.config).then(function (response) {
				console.log(response.body);
			});
		}
	}, {
		key: 'list',
		value: function list() {
			var self = this;
			return this.get(this.contentsUrl, this.config).then(function (response) {
				var data = response.body;
				var templates = '';
				data.map(function (template) {
					templates += (templates.length > 0 ? ', ' : '') + self.clean(template.name);
				});
				console.log(templates);
			});
		}
	}, {
		key: 'ignore',
		value: function ignore(template) {
			var self = this;
			return this.get(this.contentsUrl, this.config).then(function (response) {
				var data = response.body;
				for (var index in data) {
					var current = data[index];
					if (self.clean(current.name) === template) return current.url;
				}
			}).then(function (url) {
				return self.get(url);
			}).then(function (response) {
				return response.body["download_url"];
			}).then(function (url) {
				return self.get(url);
			}).then(function (response) {
				console.log('#\n# Lala - ' + template + ' (' + 'https://' + response.client._host + response.client._httpMessage.path + ')\n#\n\n' + response.body);
			});
		}
	}, {
		key: 'clean',
		value: function clean(name) {
			return name.replace(/.gitignore/g, '').toLowerCase();
		}
	}, {
		key: 'help',
		value: function help() {
			console.log('\nlala - Ignore things.\n\nUsage:\n\nlist           -  List available ignore templates.\n<template>...  -  Output one or more ignore templates to console.\nhelp           -  Get help.\nlimit           -  Check your rate limit.\n\nParameters:\n\n-u | --username  -  GitHub username\n-p | --password  -  GitHub password\n\nExamples:\n\nlala list\nlala node python > .gitignore\nlala java > .hgignore\nlala help\n\t\t');
		}
	}]);

	return Lala;
})();

exports['default'] = Lala;
module.exports = exports['default'];