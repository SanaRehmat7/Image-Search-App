const accessKey = "SbTPXikK6r1t0m6Lmj4a4XwQTqhpJWwmxE8f5IzS92k";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputElement.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ""; 
    }

    results.forEach((result) => { 
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement('img');
        image.src = result.urls.small; 
        image.alt = result.alt_description; 

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html; 
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description; 

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        // Fixed appending the imageWrapper to searchResults
        searchResults.appendChild(imageWrapper); 
    });

    // Show "Show more" button only if results are found
    if (results.length > 0) { 
        showMore.style.display = "block";
    } else {
        showMore.style.display = "none"; // Hide if no results are found
    }
    // Increment page after processing results
    page++; 
    
}

// Event listener for the form submission
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; 
    searchImages();
});

// Event listener for "Show more" button
showMore.addEventListener("click", () => {
    searchImages();
});
