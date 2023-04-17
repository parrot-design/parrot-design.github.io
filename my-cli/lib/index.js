const { program } = require('commander'); 

program
.version(`my-cli@${require('../package.json').version}`);

program.parse(process.argv);
