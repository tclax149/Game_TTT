import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { checkWinner, makeMove } from '../TicTac.js';  // Update the path accordingly


const sampleHtml = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A sample webpage for testing clean HTML">
        <meta name="author" content="Tywan Claxton">
        <title>Tic Tac Toe</title>
        <link rel="stylesheet" href="TicTac.css"/>
        <script src="TicTac.js" defer ></script>
    </head>
    <body>
        <header>
            <h1>Welcome to Tic Tac Toe</h1>
        </header>
        <main>
            <div id="board" data-testid="tic-tac-toe-board">
                <h1>Tic Tac Toe</h1>
                <h2 id="game-heading" aria-live="polite">Player 1'S Turn</h2>
                <table role="grid">
                    <tbody>
                        <tr>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                        </tr>
                        <tr>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                        </tr>
                        <tr>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                            <td><button role="widget" class="game-square"></button></td>
                        </tr>
                    </tbody>
                </table>
                <button id="restart-button">Restart Game</button>
            </div>
        </main>
        <footer>
            <p>Created by Tywan Claxton</p>
        </footer>
        <nav aria-label="Main navigation"></nav>
        <section aria-labelledby="about-heading">
            <h2 id="about-heading">About this game</h2>
            <p>Learn how to play Tic Tac Toe!</p>
        </section>
    </body>
</html>
`;

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


