import colors from "colors";
import inquirer from "inquirer";
import createProject from "../../Project";

inquirer.registerPrompt('multi-choice', require('inquirer-multi-choice'));

const init = (args: string[]) => {
    console.log(colors.bgBlue.white.bold("Welcome to React-Cli"));
    if (args.length > 0) {
        const [name, ...params] = args;
        askQuestions(name);
    }   else askQuestions ();


}

export default init;

const askQuestions = async (name?: string) => {
    const questions = [
        {
            type: "input",
            name: "name",
            message: "What is the name of your React Project?",
            default() {
                return   name?name : "my-react-project";
            }
        },
        {
            type: "input",
            name: "description",
            message: "description",
            default() {
                return "A react project";
            },
        },
        {
            type: "input",
            name: "version",
            message: "version",
            default() {
                return "1.0.0";
            }
        },
        {
            type: "list",
            name: "packageManager",
            message: "What package manager do you use?",
            choices: ["npm", "yarn"],
            default() {
                return "npm";
            }
        },
        {
            type: "list",
            name: "buildTools",
            message: "What build tools do you use?",
            choices: ["webpack", "vite"],
        },
        {
            type: "list",
            name: "template",
            message: "What template do you want to use?",
            choices: ["default", "typescript"],
            default() {
                return "default";
            }
        },
        {
            type: "checkbox",
            name: "features",
            message: "What features do you want to include?",
            choices: [
                "Router",
                "Recoil",
                "SASS",
                "Axios"
            ]
        }
    ];

    const answers = await inquirer.prompt(questions);
    console.log(answers);
    await createProject(answers);
};