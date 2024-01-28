used Environment variable "Env" in my code,to keep my sensitive information
and the process of how to use env in React:
1. Create a file called .env in the root directory of your project.
2. Add your environment variables to the .env file, following the format of KEY=VALUE. For example: VITE_APP_ANDTHEVARIABLENAME=1234
3. Import the dotenv library at the beginning of your application.for example:
const yourVariableName = import.meta.env.VITE_APP_THE_VARIABLE_NAME_USED_IN_YOUR _.envFile;
4. Use the yourVariableName in your code as needed.
5. When you run your application, dotenv will load the variables from the .env file and make them available in the process.env object.
6.added of .env file to my .gitignore file to prevent sensitive information from being committed to version control.
