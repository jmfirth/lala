#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var program = require('commander');
var Lala = require('./lib/lala.js');

program
	.version('1.2.0')
	.alias('lala ignore')
	.usage('<template...>')
	.description('Output the ignore patterns for one or more templates.  Pipe this output to the file of your choice.')
	.parse(process.argv);

var templates = program.args;

var lala = new Lala();
templates.forEach(function (template) {
	lala.ignore(template);
});
