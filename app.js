#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var fs = require('fs');
var processArgv = require('minimist');
var Lala = require('./lib/lala.js');

var argv = processArgv(process.argv.slice(2));

var username = argv.username || argv.u || null;
var password = argv.password || argv.p || null;

// run lala
var lala = new Lala(username, password);
switch(argv._[0]) {
	case 'limit':
		lala.limit();
		break;
	case 'list':
	case 'ls':
		lala.list();
		break;
	case 'help':
		lala.help();
		break;
	default:
		for(var index in argv._) {
			var template = argv._[index];
			lala.ignore(template);
		}
}
