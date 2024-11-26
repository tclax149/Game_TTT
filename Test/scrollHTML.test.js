import path from 'path';
import fs from 'fs';
import { testHTMLFile } from "./sharedHTML";

describe('ApiFetch Tests', () => {
    // Updated file paths after moving InfiniteScrollAPI folder
    const htmlFilePath = path.join(__dirname, '..', 'InfinteScrollAPI', 'scroll.html');
    const jsFilePath = path.join(__dirname, '..', 'InfinteScrollAPI', 'scroll.js');

    testHTMLFile(htmlFilePath, 'API FETCH');

    test('HTML and JS load correctly', () => {
        // Access updated file paths
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        document.body.innerHTML = htmlContent;

        const scriptContent = fs.readFileSync(jsFilePath, 'utf8');
        eval(scriptContent);

        expect(document.title).toBe('API FETCH');
    });
});
