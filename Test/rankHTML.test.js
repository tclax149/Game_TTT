// Test/rankHTML.test.js
import { testHTMLFile } from './sharedHTML.js'; // Corrected import path

describe('RankHTML Tests', () => {
  testHTMLFile('../ranksings.html', 'Ranking System'); // Adjusted path to HTML file
});
