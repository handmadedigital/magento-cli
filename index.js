#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const fs          = require('fs');
const shell       = require('shelljs');
const path        = require('path');

const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const generator  = require('./lib/generator');
const CURR_DIR = process.cwd();
const templateFiles = [
  {
    'name': 'registration.php',
    'path': '',
    'template': 'module-template/registration.txt'
  },
  {
    'name': 'module.xml',
    'path': '/etc',
    'template': 'module-template/etc/module.txt'
  },
  {
    'name': 'routes.xml',
    'path': '/etc/frontend',
    'template': 'module-template/etc/frontend/routes.txt'
  },
  {
    'name': 'Display.php',
    'path': '/Controller/Index',
    'template': 'module-template/Controller/Index/Display.txt'
  }
]

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Mage CLI', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const moduleInfo = await inquirer.askModuleInfo();
  console.log(moduleInfo);
  templateFiles.map(file => {
    generator.buildFile(moduleInfo, file)
  })
}

run();