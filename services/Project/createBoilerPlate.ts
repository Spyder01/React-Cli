import fs from 'fs';
import path from 'path';
import { Config } from './types';


// Create src and public folders
const createSrcAndPublic = (name: string, buildTools: string = "webpack") => {
    try {
        fs.mkdirSync(path.join(name, 'src'));
        if (buildTools === "webpack")
            fs.mkdirSync(path.join(name, 'public'));
    } catch (err) {
        throw err;
    }
}

// Create index.html 
const createIndexHtml = async (name: string, buildTools: string = "webpack") => {
    try {
        const indexHtml = buildTools === "webpack" ? `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${name}</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`
            :
            `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
        fs.writeFileSync(path.join(name, buildTools === "webpack" ? 'public/index.html' : "index.html"), indexHtml);
    } catch (err) {
        throw err;
    }

}

const createIndexReact = async (name: string, buildTools: string, template: string = "default") => {
    const ext = buildTools === "webpack" ? "js" : "jsx";
    try {
        const indexReact = template === "default" ? `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`
            :
            `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`
        fs.writeFileSync(path.join(name, template === "typescript" ? 'src/index.tsx' : `src/${buildTools === "webpack" ? "index" : "main"}.${ext}`), indexReact);
    } catch (err) {
        throw err;
    }
}

// Create React App.js or App.tsx depending upon the template
const createAppFile = async (config: Config) => {
    const { name, template, buildTools, features } = config;
    const ext = buildTools === "webpack" ? "js" : "jsx";
    let AppFile = ``;
    try {
        if (template === "default") {
            if (features.includes("Recoil") && features.includes("Router"))
                AppFile = `
                import React from 'react';
                import {BrowserRouter as Router} from 'react-router-dom';
                import {RecoilRoot} from 'recoil';
                import Routes from './router';
                import './App.css';
                
                
                const App = () => {
                    return (
                        <div className="App">
                            <RecoilRoot>
                                <Router>
                                    <Routes/>
                                </Router>
                            </RecoilRoot>
                        </div>
                    )
                }
                
                export default App;
                `
            else if (features.includes("Recoil") && !features.includes("Router"))
                AppFile = `
                import React, {FC} from 'react';
                import {RecoilRoot} from 'recoil';
                import './App.css';
                
                
                const App = () => {
                    return (
                        <div className="App">
                            <RecoilRoot>
                            <div className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                              <h2>Welcome to React</h2>
                            </div>
                            <p className="App-intro">
                              To get started, edit <code>src/App.js</code> and save to reload.
                            </p>
                            </RecoilRoot>
                        </div>
                    )
                }
                
                export default App;
                `
            else if (features.includes("Router") && !features.includes("Recoil"))
                AppFile = `
                    import React from 'react';
                    import {BrowserRouter as Router} from 'react-router-dom';
                    import Routes from './router';
                    import './App.css';
                    
                    
                    const App = () => {
                        return (
                            <div className="App">
                                <Router>
                                    <Routes/>
                                </Router>
                            </div>
                        )
                    }
                    
                    export default App;
                    `
            else
                AppFile = `
                import React from 'react';
                import './App.css';
                
                
                const App = () => {
                    return (
                        <div className="App">
                            <div className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                              <h2>Welcome to React</h2>
                            </div>
                            <p className="App-intro">
                              To get started, edit <code>src/App.js</code> and save to reload.
                            </p>
                        </div>
                    )
                }
                
                export default App;
                `
        } else if (template === "typescript") {
            if (features.includes("Recoil") && features.includes("Router"))
                AppFile = `
                import React from 'react';
                import {BrowserRouter as Router} from 'react-router-dom';
                import {RecoilRoot} from 'recoil';
                import Routes from './router';
                import './App.css';
                
                
                const App: FC = () => {
                    return (
                        <div className="App">
                            <RecoilRoot>
                                <Router>
                                    <Routes/>
                                </Router>
                            </RecoilRoot>
                        </div>
                    )
                }
                
                export default App;
                `
            else if (features.includes("Recoil") && !features.includes("Router"))
                AppFile = `
                import React, {FC} from 'react';
                import {RecoilRoot} from 'recoil';
                import './App.css';
                
                
                const App: FC = () => {
                    return (
                        <div className="App">
                            <RecoilRoot>
                            <div className="App-header">
                              <img src={logo} className="App-logo" alt="logo" />
                              <h2>Welcome to React</h2>
                            </div>
                            <p className="App-intro">
                              To get started, edit <code>src/App.tsx</code> and save to reload.
                            </p>
                            </RecoilRoot>
                        </div>
                    )
                }
                
                export default App;
                `
            else if (features.includes("Router") && !features.includes("Recoil"))
                AppFile = `
                    import React from 'react';
                    import './App.css';
                    
                    
                    const App = () => {
                        return (
                            <div className="App">
                                <div className="App-header">
                                  <img src={logo} className="App-logo" alt="logo" />
                                  <h2>Welcome to React</h2>
                                </div>
                                <p className="App-intro">
                                  To get started, edit <code>src/App.js</code> and save to reload.
                                </p>
                            </div>
                        )
                    }
                    
                    export default App;
                    `
        }
        const fileName = template === "typescript" ? `App.tsx` : (buildTools === "webpack" ? `App.js` : `App.jsx`);
        fs.writeFileSync(path.join(name, `src/${fileName}`), AppFile);

    } catch (err) {
        throw err;
    }

}

// Create logo.svg file
const createLogo = async (name: string) => {
    const logo = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
    <g fill="#61DAFB">
        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
        <circle cx="420.9" cy="296.5" r="45.7"/>
        <path d="M520.5 78.1z"/>
    </g>
</svg>`;

    fs.writeFileSync(path.join(name, 'src/logo.svg'), logo);
}

const createIndexCss = async (name: string) => {
    const indexCss = `
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      `;

    fs.writeFileSync(path.join(name, 'src/index.css'), indexCss);
}

const createAppCss = async (name: string) => {
    const appCss = `
    .App {
        text-align: center;
      }
      
      .App-logo {
        height: 40vmin;
        pointer-events: none;
      }
      
      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear;
        }
      }
      
      .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }
      
      .App-link {
        color: #61dafb;
      }
      
      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      button {
        font-size: calc(10px + 2vmin);
      }
      `;

    fs.writeFileSync(path.join(name, 'src/App.css'), appCss);
}

const createRecoilStore = (name: string, template: string = "default") => {
    const recoilStore = `
    import { atom} from 'recoil';

    const Store = {
        hello: atom({
            key: 'hello',
            default: 'Happy Coding!!'
        })
    }
    export default Store;
    `
    fs.mkdirSync(path.join(name, 'src/store'));
    fs.writeFileSync(path.join(name, `src/store/index.${template === 'default' ? 'js' : 'ts'}`), recoilStore);

}

const createRouterSetup = async (name: string, template: string = "default", buildTools: string) => {
    const Routes = template === 'default' ? `
import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazily import pages
const Home = lazy(() => import ('../views'));

const routes = [
    {
        path: "/",
        exact: true,
        page: Home
    }
]

    
const Router = () => {
    const Element = (Component: any) => <Component />
    return (
        <Suspense fallback={()=>(<h1>Loading...</h1>)} >
            <Routes>
                {routes.map(route => {
                    return (
                        <Route {...route} element={Element(route.page)} key={route.path} />
                    )
                })}

            </Routes>
        </Suspense>
    )
}

export default Router;
    `: `
import type {FC} from 'react';
import { lazy, Suspense } from 'react'; 
import {Routes, Route} from 'react-router-dom';

// Lazily import pages
const Home = lazy(() => import ('../views'));

interface RoutesStructure {
    path: string,
    exact: boolean
    page: FC
}

const routes: RoutesStructure[] = [
    {
        path: "/",
        exact: true,
        page: Home
    }
]


const Router:FC = () => {
    const Element = (Component: any) => <Component />
    return (
        <Suspense fallback={()=>(<h1>Loading...</h1>)} >
            <Routes>
                {routes.map(route => {
                    return (
                        <Route {...route} element={Element(route.page)} key={route.path} />
                    )
                })}

            </Routes>
        </Suspense>
    )
}

export default Router;
`
    const fileName = template === "typescript" ? `index.tsx` : (buildTools === "webpack" ? `index.js` : `index.jsx`);
    fs.mkdirSync(path.join(name, 'src/router'));
    fs.writeFileSync(path.join(name, `src/router/${fileName}`), Routes);


    const Home = template === "default" ? `
import React from 'react';
import './Styles/index.css';

const Home = ()=>{
    return (
        <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>

    )
}

export deafult Home;
`: `
import React from 'react';
import type {FC} from 'react';
import './Styles/index.css';

const Home:FC = ()=>{
    return (
        <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>

    )
}

export deafult Home;

`
    fs.mkdirSync(path.join(name, `src/views`));
    fs.writeFileSync(path.join(name, `src/views/${fileName}`), Home);

    const HomeCss = `.App {
        text-align: center;
      }
      
      .App-logo {
        height: 40vmin;
        pointer-events: none;
      }
      
      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear;
        }
      }
      
      .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }
      
      .App-link {
        color: #61dafb;
      }
      
      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      button {
        font-size: calc(10px + 2vmin);
      }
      `;

      fs.mkdirSync (path.join(name, 'src/views/Styles'));
      fs.writeFileSync(path.join(name, `src/views/Styles/index.css`), HomeCss);

    


}




export {
    createIndexHtml,
    createSrcAndPublic,
    createIndexReact,
    createAppFile,
    createLogo,
    createIndexCss,
    createAppCss,
    createRecoilStore,
    createRouterSetup
};