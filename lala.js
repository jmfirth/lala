#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var jsonfile = require('jsonfile');
var program = require('commander');
var Lala = require('./lib/lala.js');

var packagejson = jsonfile.readFileSync('./package.json');

program
	.version(packagejson.version)
	.description(packagejson.description)
	.command('list', 'list available templates.')
	.command('ignore <template...>', 'output ignore patterns for one or more templates')
	.command('limit', 'check your GitHub API rate limit')
	.parse(process.argv);
