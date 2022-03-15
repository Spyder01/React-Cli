import fs from 'fs';
import path from 'path';


const readConfig = async (name?: string) => {
    if (!name) {
        name = __dirname;
    }
try {
        if (!fs.existsSync(path.join(name, '.react.config.json'))) 
            throw new Error('Config File not found, your project isn\'t initialized');
        const config = fs.readFileSync(path.join(name, '.react.config.json'), 'utf8');
        return JSON.parse(config);
 } catch (err) {
        throw err;
    }
}

export default readConfig;