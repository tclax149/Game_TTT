//file -file path - 

import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { handleScroll } from '../InfinteScrollAPI/scroll.js';
import { beforeEach } from 'node:test';
import { ok } from 'assert';
import { json } from 'stream/consumers';

// mocking global fetch to prevent actual api calls
global.fetch = jest.fn();

describe('Infinite Scroll Testimonials', () => {
    let htmlContent;

    beforeAll(() => {
        // load the html file into the test enviornment
        // ESTABLISH FILE PATH 
        const filePath = path.resolve(__dirname, '../InfiniteScrollAPI/scroll.html');
        // DECLARE & SET HTML CONTENT
        htmlContent = fs.readFileSync(filePath, 'utf8');
        document.body.innerHTML = htmlContent
    });

    beforeEach(() => {
        // rest the mock fetch before each test 
        fetch.mockClear();
    });


    test('Html Structure loads', () => {
        expect(document.title).toBe('API FETCH');
        const container = document.getElementById('testimonialContainer');
        expect(container).toBeInTheDocument();
        expect(container).toHaveStyle('overflow-y: scroll');
    });


    test('fetches and appends testimonials on load', async () => {
        // mock api response
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                testimonials: [
                    { id: '1', message: 'Great product!' },
                    { id: '1', message: 'Amazing Service!' },
                ],
                hasNext: true,
            }),
        });

        //dynamically load js and simulate the function call
        const scriptPath = path.resolve(__dirname, '../InfiniteScrollAPI/scroll.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        eval(scriptContent); // Simulate including the JS file

        // Allow async tasks to complete
        await new Promise(setImmediate);

        const testimonials = screen.getAllByClassName('testimonial');
        expect(testimonials.length).toBe(2);
        expect(testimonials[0]).toHaveTextContent('Great product!');
        expect(testimonials[1]).toHaveTextContent('Amazing service!');
    });

    test('fetch additional testimonials when scrolled to bottom', async () => {
        // Initial mock response for first fetch
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                testimonials: [
                    { id: '1', message: 'Great product!' },
                    { id: '2', message: 'Amazing service!' },
                ],
                hasNext: true
            }),
        });

        //second mock response for pagination
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                testimonials: [
                    { id: '3', message: 'Fantastic experience!' },
                ],
                hasNext: false
            }),
        });
        // Load the script and trigger the first fetch
        const scriptPath = path.resolve(__dirname, '../InfiniteScrollAPI/scroll.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        eval(scriptContent); // Simulate including the JS file

        // Simulate scrolling to the bottom
        const container = document.getElementById('testimonialContainer');
        container.scrollTop = container.scrollHeight; // Force scroll to bottom
        container.dispatchEvent(new Event('scroll'));

        // Allow async tasks to complete
        await new Promise(setImmediate);

        const testimonials = screen.getAllByClassName('testimonial');
        expect(testimonials.length).toBe(3);
        expect(testimonials[2]).toHaveTextContent('Fantastic experience!');
    });

    test('handles API errors gracefully', async () => {
        // Mock an error response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        // Dynamically load JS
        const scriptPath = path.resolve(__dirname, '../InfiniteScrollAPI/scroll.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');
        eval(scriptContent);

        // Allow async tasks to complete
        await new Promise(setImmediate);

        const errorLog = jest.spyOn(console, 'error');
        expect(errorLog).toHaveBeenCalledWith(
            expect.stringContaining('Error fetching testimonials:')
        );
    });
});
