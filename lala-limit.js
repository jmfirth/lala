#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var program = require('commander');
var Lala = require('./lib/lala.js');

program
	.version('1.2.0')
	.alias('lala limit')
	.usage('[options]')
	.description('Check your GitHub API rate limit and quota.')
	.parse(process.argv);

var lala = new Lala();
lala.limit();
