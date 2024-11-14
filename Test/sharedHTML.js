import fs from 'fs'; // If not already imported

export const testHTMLFile = (filePath, title) => {
  test(`${title} renders correctly`, () => {
    const html = fs.readFileSync(filePath, 'utf8');
    document.body.innerHTML = html;
    expect(document.title).toBe(title);
  });
};