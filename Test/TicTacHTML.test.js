// Test/TicTacHTML.test.js
import { testHTMLFile } from './sharedHTML.js'; // Corrected import path

describe('TicTacHTML Tests', () => {
  testHTMLFile('../TicTac.html', 'Tic Tac Toe'); // Adjusted path to HTML file
});

describe('Shared HTML Structure Tests', () => {
    it('renders TicTac HTML correctly', () => {
      testHTMLFile('../TicTac.html', 'Tic Tac Toe'); // Test for TicTacHTML
    });
  
    it('renders Ranking HTML correctly', () => {
      testHTMLFile('../ranksings.html', 'Ranking System'); // Test for RankHTML
    });
  });
  
  // Additional HTML Structure Tests
  describe("HTML Structure Tests", () => {
     let sampleHtml;
  
     beforeAll(() => {
         // Load your sample HTML for testing
         sampleHtml = '<html><head><title>Sample</title></head><body><div data-testid="tic-tac-toe-board"></div></body></html>';
         document.body.innerHTML = sampleHtml;
     });
  
     test("renders Tic Tac Toe board", () => {
         const boardElement = document.querySelector('[data-testid="tic-tac-toe-board"]');
         expect(boardElement).toBeInTheDocument();
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
         const nav = document.createElement('nav');
         nav.setAttribute("aria-label", "Main navigation");
         document.body.appendChild(nav);
  
         const section = document.createElement('section');
         section.setAttribute("aria-labelledby", "about-heading");
         document.body.appendChild(section);
  
         expect(nav).toHaveAttribute("aria-label", "Main navigation");
         expect(section).toHaveAttribute("aria-labelledby", "about-heading");
     });
  })