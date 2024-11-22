import path from 'path';
import fs from 'fs';
import { testHTMLFile } from './sharedHTML';

describe('ApiFetch Tests', () => {
    // Create file paths
    const htmlFilePath = path.join(__dirname, 'InfiniteScrollAPI', 'scroll.html');
    const jsFilePath = path.join(__dirname, 'InfiniteScrollAPI', 'scroll.js');

    console.log('HTML Path:', htmlFilePath);
    console.log('JS Path:', jsFilePath);


    // Test if the HTML file renders correctly
    testHTMLFile(htmlFilePath, 'API FETCH');

    // Test HTML and JS load correctly
    test('HTML and JS load correctly', () => {
        // Access and load HTML file
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        document.body.innerHTML = htmlContent;

        // Access and load JS file
        const script = document.createElement('script');
        script.textContent = fs.readFileSync(jsFilePath, 'utf8');
        document.head.appendChild(script);

        // Validate document.title
        expect(document.title).toBe('API FETCH');


    });
});
