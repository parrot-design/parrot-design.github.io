const commander = require('commander');
const pkg=require('../package.json');

const program=new commander.Command();

program.usage();
program.version(pkg.version);

program.option('-d, --debug','是否开启调试模式',false)
program.option('-c, --config','是否指定配置文件路径')

// program
//   .command('clone [source] [destination] [copy]')
//   .description('clone a repository into a newly created directory')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((source, destination, copy,options) => {
//     console.log('source', source)
//     console.log('destination', destination)
//     console.log('copy', copy)
//     console.log('options', options)
//   })
 

program.parse();
