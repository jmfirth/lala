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
	.usage('ignore <template...>')
	.description('Output the ignore patterns for one or more templates.  Pipe this output to the file of your choice.')
	.option('-u, --username', '(optional) GitHub username for authentication')
	.option('-p, --password', '(optional) GitHub password or API token for authentication')
	.parse(process.argv);

var templates = program.args;

var lala = new Lala(program.username, program.password);
templates.forEach(function (template) {
	lala.ignore(template);
});
