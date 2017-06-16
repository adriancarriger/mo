#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const program = require('commander');
const figlet = require('figlet');

program
  .version('0.0.1')
  .command('init', 'init a new project in current directory')
  .command('clone <url>', 'git clones a project into mo format')
  .command('import', 'gets repo from mo-dist, applies mo plugins, and puts it inside mo-src');

if (!process.argv.slice(2).length) {
  clear();
  console.log(
    chalk.green(
      figlet.textSync('Mo', { horizontalLayout: 'full' })
    )
  );
  program.help();
}

program.parse(process.argv);
