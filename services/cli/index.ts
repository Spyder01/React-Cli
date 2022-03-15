import {list, add, init, help, remove} from './commands'

const cli = (args:string[]) =>{
    const [command, ...params] = args;
    const commandList = ['init', 'add', 'remove', 'list', 'help'];

    if (!commandList.includes(command)) 
        throw new Error(`Command ${command} not found`);

    switch (command) {
        case 'init':
            init(params);
            break;
        case 'add':
            add(params);
            break;
        case 'remove':
            remove(params);
            break;
        case 'list':
            list(params);
            break;
        case 'help':
            help(params);
            break;
    }

    
}


export default cli;
