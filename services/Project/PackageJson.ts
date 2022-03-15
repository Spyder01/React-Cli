import type {Config, packageJson} from './types';
import fs from 'fs';
import path from 'path';

// Create package.json
const createPackageJson = async (answers: Config) => {
    try {
        const {name, template, features, buildTools} = answers;
        const packageJson:packageJson = buildTools === 'webpack'?{
            name: name,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            private: true,
            scripts: {
                "start": "react-scripts start",
                "build": "react-scripts build",
                "test": "react-scripts test",
                "eject": "react-scripts eject"
            },
            dependencies: {
                'react': '^16.9.0',
                'react-dom': '^16.9.0',
                'webpack': '^4.41.5',
                'webpack-cli': '^3.3.11',
                'webpack-dev-server': '^3.11.0',
                'yargs': '^15.0.7',
            },
            devDependencies: {
                'babel-core': '^6.26.3',
                'babel-loader': '^8.0.6',
                'babel-preset-env': '^1.7.0',
                'babel-preset-react': '^6.24.1',
                'css-loader': '^3.4.2',
                'file-loader': '^4.3.0',
                'html-webpack-plugin': '^3.2.0',
                'node-sass': '^4.13.1',
                'optimize-css-assets-webpack-plugin': '^5.0.3',
                'postcss-loader': '^3.0.0',
                'react-hot-loader': '^4.7.0',
                'react-router-dom': '^5.0.0',
                'react-scripts': '^3.0.0',
                'sass-loader': '^7.1.0',
                'style-loader': '^1.0.0',
                'url-loader': '^1.1.2',
            },
        }:{
            name: name,
            version: '1.0.0',
            description: '',
            main: 'index.js',
            private: true,
            scripts: {
                "dev": "vite",
                "build": template === 'typescript'? "tsc && vite build": "vite build",
                "preview": "vite preview"
            },
            dependencies: {
                "react": "^17.0.2",
                "react-dom": "^17.0.2"
            },
            devDependencies: {
                "@vitejs/plugin-react": "^1.0.7",
                "vite": "^2.8.0"
            }

        }

        if (template === 'typescript') {
            packageJson.devDependencies = buildTools === 'webpack'?{
                ...packageJson.devDependencies,
                '@types/node': '^12.0.0',
                '@types/react': '^16.9.4',
                '@types/react-dom': '^16.9.4',
                '@types/webpack': '^4.41.5',
                '@types/webpack-cli': '^3.3.11',
                '@types/webpack-dev-server': '^3.11.0',
                '@types/yargs': '^15.0.7',
            }:{
                ...packageJson.devDependencies,
                "@types/react": "^17.0.33",
                "@types/react-dom": "^17.0.10",
                "typescript": "^4.5.4",
            }
        }

        if (features.includes('Router')) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                'react-router-dom': '^5.1.1',
            }
            packageJson.dependencies = {
                ...packageJson.dependencies,
                'react-router-config': '^1.0.0',
            }
        }

        if (features.includes ('Sass')) {
            packageJson.devDependencies = {
                ...packageJson.devDependencies,
                'sass': '^1.26.7',
            }
        }

        if (features.includes('Axios')) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                'axios': '^0.21.1',
            }
        }

        if (features.includes ('Recoil')) {
            packageJson.dependencies = {
                ...packageJson.dependencies,
                'recoil': '^0.6.1',
            }
        }

        fs.writeFileSync(path.join(name, 'package.json'), JSON.stringify(packageJson, null, 2));
        

            
} catch (err) {
    throw err;
}
}

export default createPackageJson;