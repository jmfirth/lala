#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var jsonfile = require('jsonfile');
var program = require('commander');
var Lala = require('./lib/lala.js');

var packagejson = jsonfile.readFileSync('./package.json');

program
	.version(packagejson.version)
	.alias('lala')
	.usage('limit [options]')
	.description('Check your GitHub API rate limit and quota.')
	.option('-u, --username', '(optional) GitHub username for authentication')
	.option('-p, --password', '(optional) GitHub password or API token for authentication')
	.parse(process.argv);

var lala = new Lala(program.username, program.password);
lala.limit();
