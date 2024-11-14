import { testHTMLFile } from './sharedHTML.test.js'; // Import the shared logic for testing

describe('Shared HTML Structure Tests', () => {
  it('renders TicTac HTML correctly', () => {
    testHTMLFile('./TicTac.html', 'Tic Tac Toe'); // Test for TicTacHTML
  });

  it('renders Ranking HTML correctly', () => {
    testHTMLFile('./ranksings.html', 'Ranking System'); // Test for RankHTML
  });
});

describe('TicTacHTML Tests', () => {
  testHTMLFile('TicTac.html', 'Tic Tac Toe');
});



describe("HTML Structure Tests", () => {
   beforeAll(() => {
       document.body.innerHTML = sampleHtml;
   });

test("renders Tic Tac Toe board", () => {
    const boardElement = screen.getByTestId('tic-tac-toe-board');
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
    const nav = document.querySelector("nav");
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
    const section = document.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "about-heading");
});

});




  