#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var program = require('commander');
var Lala = require('./lib/lala.js');

program
	.version('1.2.0')
	.alias('lala list')
	.usage('[options]')
	.description('List known templates (source: github/gitignore repository).')
	.parse(process.argv);

var lala = new Lala();
lala.list();
