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
                'react': '^17.0.2',
                'react-dom': '^17.0.2',
            },
            devDependencies: {
                'react-scripts': '^5.0.0'
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
            if (template === 'typescript') {
                packageJson.devDependencies = {
                    ...packageJson.devDependencies,
                    '@types/recoil': '^0.0.9',
                }
            }
        }

        fs.writeFileSync(path.join(name, 'package.json'), JSON.stringify(packageJson, null, 2));
        

            
} catch (err) {
    throw err;
}
}

export default createPackageJson;