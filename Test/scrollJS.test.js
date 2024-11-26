import fetchMock from 'jest-fetch-mock';

// Enable fetch mock
fetchMock.enableMocks();

// Define constants for your API
const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
const PAGE_SIZE = 10;
let afterID = null;
let canFetchTestimonials = true;

// Mock API responses for different scenarios
const mockSuccessResponse = {
    ok: true,
    json: async () => ({
        contents: JSON.stringify({
            testimonials: [
                { id: '1', message: 'Great product!' },
                { id: '2', message: 'Amazing service!' }
            ],
            hasNext: true
        })
    })
};

const mockErrorResponse = {
    ok: false,
    json: async () => ({ message: 'Error fetching data' })
};

const mockEmptyResponse = {
    ok: true,
    json: async () => ({
        contents: JSON.stringify({
            testimonials: [],
            hasNext: false
        })
    })
};

const mockMultipleFetchResponse = {
    ok: true,
    json: async () => ({
        contents: JSON.stringify({
            testimonials: [
                { id: '1', message: 'Great product!' },
                { id: '2', message: 'Amazing service!' }
            ],
            hasNext: true
        })
    })
};

// Mock the actual function we are testing (fetchAndAppendTestimonials)
function fetchAndAppendTestimonials() {
    console.log('Fetching testimonials...');
    canFetchTestimonials = false; // Disable fetching while processing
    const url = createTestimonialsUrl();

    const PROXY_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
    const proxiedUrl = `${PROXY_URL}${encodeURIComponent(url)}`;

    console.log(`Fetching testimonials from: ${proxiedUrl}`);  // Log the URL to verify it

    fetch(proxiedUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log('API Response Data:', data);  // Log the response to check its structure
            // Ensure the response has a valid format before processing
            if (data && data.contents) {
                const responseData = JSON.parse(data.contents);  // Parse the JSON string from the proxy
                const { testimonials, hasNext } = responseData;

                const testimonialContainer = document.getElementById('testimonialContainer');
                const fragment = document.createDocumentFragment();
                testimonials.forEach(({ message }) => {
                    fragment.appendChild(createTestimonialElement(message));
                });
                testimonialContainer.appendChild(fragment);

                if (hasNext) {
                    afterID = testimonials[testimonials.length - 1].id;
                } else {
                    testimonialContainer.removeEventListener('scroll', handleScroll);
                }
                canFetchTestimonials = true; // Re-enable fetching
            } else {
                console.error('Invalid response data format');
            }
        })
        .catch(error => {
            console.error('Error fetching testimonials:', error);
            canFetchTestimonials = true; // Prevent deadlock
        });
}

// Helper function to create testimonial elements
function createTestimonialElement(message) {
    const testimonialElement = document.createElement('p');
    testimonialElement.classList.add('testimonial');
    testimonialElement.textContent = message;
    return testimonialElement;
}

// Helper function to create the URL for fetching testimonials
function createTestimonialsUrl() {
    const url = new URL(API_BASE_URL);
    url.searchParams.set('limit', PAGE_SIZE);
    if (afterID !== null) {
        url.searchParams.set('after', afterID);
    }
    return url;
}

function handleScroll() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (!canFetchTestimonials) return;

    const bottomSpaceLeftToScroll = testimonialContainer.scrollHeight
        - testimonialContainer.scrollTop
        - testimonialContainer.clientHeight;
    if (bottomSpaceLeftToScroll > 0) return;

    fetchAndAppendTestimonials();
}

// Test Suite for Infinite Scroll Testimonials
describe('Infinite Scroll Testimonials', () => {
    beforeEach(() => {
        // Mock DOM structure before each test
        document.body.innerHTML = `
      <div id="testimonialContainer"></div>
    `;
        fetchMock.resetMocks(); // Reset mocks before each test
    });

    it('fetches and appends testimonials on load', async () => {
        // Ensure the URL is mocked correctly for the test
        const testUrl = 'https://api.frontendexpert.io/api/fe/testimonialshttps%3A%2F%2Fapi.frontendexpert.io%2Fapi%2Ffe%2Ftestimonials%3Flimit%3D10';

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                contents: JSON.stringify({
                    testimonials: [
                        { id: '1', message: 'Great product!' },
                        { id: '2', message: 'Amazing service!' }
                    ],
                    hasNext: true
                })
            })
        });

        console.log('Fetching testimonials...');

        // Call the function that fetches testimonials
        await fetchAndAppendTestimonials();

        // Wait for the DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));  // Allow DOM to update

        // Check the testimonials added to the DOM
        const testimonials = document.querySelectorAll('.testimonial');
        console.log('Testimonials in DOM:', testimonials);

        expect(testimonials.length).toBe(2);  // Ensure two testimonials were added
        expect(testimonials[0]).toHaveTextContent('Great product!');
        expect(testimonials[1]).toHaveTextContent('Amazing service!');
    });

    it('handles error while fetching testimonials', async () => {
        // Mocking error response for testing
        fetchMock.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Error fetching data' })
        });

        console.log('Fetching testimonials (error)...');

        await fetchAndAppendTestimonials();  // Attempt to fetch testimonials

        const testimonials = document.querySelectorAll('.testimonial');
        console.log('Testimonials after error:', testimonials);

        expect(testimonials.length).toBe(0);  // Ensure no testimonials were added
    });

    it('handles empty response correctly', async () => {
        // Mocking empty response for testing
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                contents: JSON.stringify({
                    testimonials: [],
                    hasNext: false
                })
            })
        });

        console.log('Fetching testimonials (empty response)...');

        await fetchAndAppendTestimonials();  // Attempt to fetch testimonials

        const testimonials = document.querySelectorAll('.testimonial');
        console.log('Testimonials after empty response:', testimonials);

        expect(testimonials.length).toBe(0);  // Ensure no testimonials were added
    });

    it('fetches multiple testimonials correctly', async () => {
        // Mock the first fetch to return two testimonials
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    contents: JSON.stringify({
                        testimonials: [
                            { id: '1', message: 'Great product!' },
                            { id: '2', message: 'Amazing service!' }
                        ],
                        hasNext: true
                    })
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    contents: JSON.stringify({
                        testimonials: [
                            { id: '3', message: 'Awesome quality!' },
                            { id: '4', message: 'Fast shipping!' }
                        ],
                        hasNext: false
                    })
                })
            });

        console.log('Fetching testimonials (multiple requests)...');

        // Call the function that fetches testimonials
        await fetchAndAppendTestimonials();  // First fetch

        // Wait for the DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));

        const testimonialsFirstFetch = document.querySelectorAll('.testimonial');
        console.log('Testimonials after first fetch:', testimonialsFirstFetch);

        // Ensure the first batch of testimonials were added
        expect(testimonialsFirstFetch.length).toBe(2);
        expect(testimonialsFirstFetch[0]).toHaveTextContent('Great product!');
        expect(testimonialsFirstFetch[1]).toHaveTextContent('Amazing service!');

        // Trigger the second fetch (simulate scrolling)
        await fetchAndAppendTestimonials();  // Second fetch

        // Wait for the DOM to update again
        await new Promise(resolve => setTimeout(resolve, 100));

        const testimonialsSecondFetch = document.querySelectorAll('.testimonial');
        console.log('Testimonials after second fetch:', testimonialsSecondFetch);

        // Ensure the second batch of testimonials were added
        expect(testimonialsSecondFetch.length).toBe(4);  // Ensure 4 testimonials total
        expect(testimonialsSecondFetch[2]).toHaveTextContent('Awesome quality!');
        expect(testimonialsSecondFetch[3]).toHaveTextContent('Fast shipping!');
    });
});
