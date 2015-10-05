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

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _promptly = require('promptly');

var _promptly2 = _interopRequireDefault(_promptly);

var needleGet = _promise2['default'].denodeify(_needle2['default'].get);
var promptlyPrompt = _promise2['default'].denodeify(_promptly2['default'].prompt);
var promptlyPassword = _promise2['default'].denodeify(_promptly2['default'].password);
var promptlyConfim = _promise2['default'].denodeify(_promptly2['default'].confirm);

_nodePersist2['default'].initSync({
	dir: '.lala'
});

var Lala = (function () {
	function Lala() {
		_classCallCheck(this, Lala);

		this.auth = {};
		this.authKey = 'auth';
		this.rateLimitUrl = 'https://api.github.com/rate_limit';
		this.contentsUrl = 'https://api.github.com/repos/github/gitignore/contents/';
		this.load();
	}

	_createClass(Lala, [{
		key: 'config',
		value: function config(username, password) {
			var savedMessage = 'Configuration saved.';

			if (!!username && !!password) {
				this.save(username, password);
				console.log(savedMessage);
				return;
			}

			var self = this;
			var temp = {};
			console.log('Configure GitHub authentication\n');
			return promptlyPrompt('GitHub username:').then(function (username) {
				return temp.username = username;
			}).then(function () {
				return promptlyPassword('GitHub password or API token:');
			}).then(function (password) {
				return temp.password = password;
			}).then(function () {
				self.save(temp.username, temp.password);
				console.log('\n' + savedMessage);
			});
		}
	}, {
		key: 'load',
		value: function load() {
			this.auth = _nodePersist2['default'].getItemSync(this.authKey);
		}
	}, {
		key: 'save',
		value: function save(username, password) {
			_nodePersist2['default'].setItemSync(this.authKey, {
				username: username,
				password: password
			});
		}
	}, {
		key: 'limit',
		value: function limit() {
			return needleGet(this.rateLimitUrl, this.auth).then(function (response) {
				console.log(response.body);
			});
		}
	}, {
		key: 'list',
		value: function list() {
			var self = this;
			return needleGet(this.contentsUrl, this.auth).then(function (response) {
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
			return needleGet(this.contentsUrl, this.auth).then(function (response) {
				var data = response.body;
				for (var index in data) {
					var current = data[index];
					if (self.clean(current.name) === template) return current.url;
				}
			}).then(function (url) {
				return needleGet(url, self.auth);
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
	}]);

	return Lala;
})();

exports['default'] = Lala;
module.exports = exports['default'];