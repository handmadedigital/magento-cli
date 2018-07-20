const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const CURRENT_DIR = path.resolve(__dirname).substr(0, path.resolve(__dirname).lastIndexOf("/"));
const RELATIVE_DIR = process.cwd();


module.exports = {
  buildFile : (moduleInfo, file) => {
    const modulePath = `${RELATIVE_DIR}/app/code/${moduleInfo.ModuleNamespace}/${moduleInfo.ModuleName}`
    const fullPath = modulePath + file.path

    fs.readFile(CURRENT_DIR + "/" + file.template, 'utf8', function (err,data) {
      if (err) { return console.log(err) }

      let result = data.replace(/{{ModuleName}}/g, moduleInfo.ModuleName)
      result = result.replace(/{{modulename}}/g, moduleInfo.ModuleName.toLowerCase())
      result = result.replace(/{{Namespace}}/g, moduleInfo.ModuleNamespace)
      result = result.replace(/{{namespace}}/g, moduleInfo.ModuleNamespace.toLowerCase())

      file.name = file.name.replace(/modulename/g, moduleInfo.ModuleName.toLowerCase())
      file.name = file.name.replace(/ModuleName/g, moduleInfo.ModuleName)

      module.exports.buildPath(fullPath);

      fs.writeFile(`${fullPath}/${file.name}`, result, (err) => {
        if (err) throw err;
        console.log(`The file "${fullPath}/${file.name}" was succesfully saved!`);
      }); 
    });
  },

  buildPath : (fullPath) => {
    if (!fs.existsSync(fullPath)) {
      shell.mkdir('-p', fullPath);
      console.log(`The folder "${fullPath}" was succesfully saved!`);
    }
  }
};