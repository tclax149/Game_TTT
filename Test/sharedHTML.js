import { testHTMLFile } from 'Test/sharedHTML.js'; // Import the shared logic for testing
// sharedHTML.test.js (Shared HTML Testing Logic)

export const testHTMLFile = (filePath, title) => {
  test(`${title} renders correctly`, () => {
    const html = fs.readFileSync(filePath, 'utf8');
    document.body.innerHTML = html;
    expect(document.title).toBe(title);
  });
};

