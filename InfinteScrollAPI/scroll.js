const API_BASE_URL = 'https://api.frontendexpert.io/api/fe/testimonials';
const PAGE_SIZE = 5;

let canFetchTestimonials = true;
let afterID = null;

document.addEventListener('DOMContentLoaded', () => {
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('scroll', handleScroll);
        fetchAndAppendTestimonials(); // Fetch initial testimonials
    } else {
        console.error('#testimonialContainer not found');
    }
});

function handleScroll() {
    const testimonialContainer = document.getElementById('testimonialContainer');
    if (!canFetchTestimonials) return;

    const bottomSpaceLeftToScroll = testimonialContainer.scrollHeight
        - testimonialContainer.scrollTop
        - testimonialContainer.clientHeight;
    if (bottomSpaceLeftToScroll > 0) return;

    fetchAndAppendTestimonials();
}

function fetchAndAppendTestimonials() {
    canFetchTestimonials = false; // Disable fetching while processing
    const url = createTestimonialsUrl();

    const PROXY_URL = 'https://api.allorigins.win/get?url=';
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

function createTestimonialElement(message) {
    const testimonialElement = document.createElement('p');
    testimonialElement.classList.add('testimonial');
    testimonialElement.textContent = message;
    return testimonialElement;
}

function createTestimonialsUrl() {
    const url = new URL(API_BASE_URL);
    url.searchParams.set('limit', PAGE_SIZE);
    if (afterID !== null) {
        url.searchParams.set('after', afterID);
    }
    return url;
}
