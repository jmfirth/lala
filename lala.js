#!/usr/bin/env node
'use strict';

process.bin = process.title = 'lala';

var program = require('commander');

program
	.version('1.2.0')
	.description('A pattern-based ignore generator.')
	.command('list', 'list available templates.')
	.command('ignore <template...>', 'output ignore patterns for one or more templates')
	.command('limit', 'check your GitHub API rate limit')
	.command('config', 'set GitHub username and password')
	.parse(process.argv);
