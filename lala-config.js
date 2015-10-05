#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var program = require('commander');
var Lala = require('./lib/lala.js');

program
	.version('1.2.1')
	.alias('lala config')
	.usage('config [options]')
	.description('Lala configuration wizard.')
	.option('-u, --username', '(optional) GitHub username for authentication')
	.option('-p, --password', '(optional) GitHub password or API token for authentication')
	.parse(process.argv);

var lala = new Lala();
lala.config(program.username, program.password);
