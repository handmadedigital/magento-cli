const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {

  askModuleInfo: () => {
    const questions = [
      {
        name: 'ModuleNamespace',
        type: 'input',
        message: 'Enter your module\'s namespace:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your module\'s namespace.';
          }
        }
      },
      {
        name: 'ModuleName',
        type: 'input',
        message: 'Enter your Module\'s Name:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your module\'s name.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
}