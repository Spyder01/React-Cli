import fs from 'fs';
import path from 'path';
import type { Config } from './types';
import createPackageJson from './PackageJson';
import { createIndexHtml, createSrcAndPublic, createIndexReact, createLogo, createAppFile, createIndexCss, createAppCss, createRecoilStore, createRouterSetup } from './createBoilerPlate';




const createProject = async (answers: Config) => {
    try {
        const {name, buildTools, features, template} = answers;
        fs.mkdir(name, err => {
            if (err) throw err;
            createConfig(answers);
            createPackageJson(answers);
            createGitignore(name);
            createSrcAndPublic(name, buildTools);
            createIndexHtml(name, buildTools);
            createIndexReact(name, buildTools, answers.template);
            createLogo(name);
            createAppFile(answers);
            createIndexCss(name);
            createAppCss(name);
            if (features.includes('Recoil'))
                createRecoilStore(name, template);
            if (features.includes('Router'))
                createRouterSetup(name, template, buildTools);
        });
    } catch (err) {
        throw err;
    }
}

export default createProject;


// Create .react.config.json
const createConfig = async (answers: Config) => {
    try {
        const {name, description, version, packageManager, template, features} = answers;
        const config = {
            name: name,
            description: description,
            version: version,
            packageManager: packageManager,
            template: template,
            features: features
        }
        fs.writeFileSync(path.join(name, '.react.config.json'), JSON.stringify(config, null, 2));
    } catch (err) {
        throw err;
    }
}

// Create .gitignore
const createGitignore = async (name: string) => {
    try {
        fs.writeFileSync(path.join(name, '.gitignore'), `node_modules
build
.vscode
.DS_Store
`);
    } catch (err) {
        throw err;
    }
}
