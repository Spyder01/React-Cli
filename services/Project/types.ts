interface Config {
    name: string;
    description: string;
    version: string;
    buildTools: string;
    packageManager: string;
    template: string;
    features: string[];
}

interface packageJson {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: object;
    private?: boolean;
    dependencies: Object;
    devDependencies: Object;
    eslintConfig?: object;
    browserslist?: object;
}


export type {
    Config,
    packageJson
}