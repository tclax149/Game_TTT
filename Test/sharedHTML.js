import fs from 'fs';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

// Helper function to test HTML file rendering
export const testHTMLFile = (filePath, title) => {
  test(`${title} renders correctly`, () => {
    const html = fs.readFileSync(filePath, 'utf8');
    document.body.innerHTML = html;
    expect(document.title).toBe(title);
  });
};

describe("HTML Structure Tests", () => {
  let sampleHtml;

  beforeAll(() => {
    sampleHtml = fs.readFileSync('./TicTac.html', 'utf8');
    document.body.innerHTML = sampleHtml;
  });


  test("contains necessary meta tags", () => {
    expect(document.querySelector('meta[charset="UTF-8"]')).toBeInTheDocument();
    expect(document.querySelector('meta[name="viewport"]')).toHaveAttribute("content", "width=device-width, initial-scale=1.0");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", "A sample webpage for testing clean HTML");
  });

  test("uses semantic elements", () => {
    expect(document.querySelector("header")).toBeInTheDocument();
    expect(document.querySelector("main")).toBeInTheDocument();
    expect(document.querySelector("footer")).toBeInTheDocument();
  });

  test("includes accessible ARIA roles and labels", () => {
    const nav = document.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
    const section = document.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "about-heading");
  });
});
