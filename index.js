#!/usr/bin/env node
const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const fs          = require('fs')
const shell       = require('shelljs');

const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const github  = require('./lib/github');
const CURR_DIR = process.cwd();

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Mage CLI', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const moduleInfo = await inquirer.askModuleInfo();
  console.log(moduleInfo);
  fs.readFile('module-template/registration.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace(/{{ModuleName}}/g, moduleInfo.ModuleName);
    result = result.replace(/{{Namespace}}/g, moduleInfo.ModuleNamespace);

    const path = `${CURR_DIR}/app/code/local/${moduleInfo.ModuleName}/${moduleInfo.ModuleNamespace}`
    // console.log(result, files.getCurrentDirectoryBase())

    if (!fs.existsSync(path)){
      shell.mkdir('-p', path);
      console.log("The folder was succesfully saved!");
    }

    fs.writeFile(`${path}/registration.php`, result, (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    }); 
  });
}

run();