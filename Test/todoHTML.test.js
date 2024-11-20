import { describe } from "yargs";
import { testHTMLFile } from "./sharedHTML";

describe('todoHTML Tests', () => {
    testHTMLFile('../todo.html', 'Todo List')
});