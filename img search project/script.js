
// https://unsplash.com/   ka api use kiya hai


const accessKey = "ht0Nbk5Op2ZM4op1gdpx9xP3mDC2CCO6wiMtnNECYsU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
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
        imageLink.textContent = result.alt_description || "View Image";

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);

        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (results.length > 0) {
        showMore.style.display = "block";
    } else {
        showMore.style.display = "none";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", async () => {
    try {
        showMore.classList.add('loading');
        await searchImages();
    } catch (error) {
        console.error("Error fetching more images", error);
    } finally {
        showMore.classList.remove('loading');
    }
});




// wihout set animation code

// const accessKey = "ht0Nbk5Op2ZM4op1gdpx9xP3mDC2CCO6wiMtnNECYsU";

// const formEl = document.querySelector("form");
// const inputEl = document.getElementById("search-input");
// const searchResults = document.querySelector(".search-results");
// const showMore = document.getElementById("show-more-button");

// let inputData = "";
// let page = 1;

// async function searchImages() {
//     inputData = inputEl.value;
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     const results = data.results;

//     if (page === 1) {
//         searchResults.innerHTML = "";
//     }

//     results.forEach((result) => {
//         const imageWrapper = document.createElement('div');
//         imageWrapper.classList.add("search-result");

//         const image = document.createElement('img');
//         image.src = result.urls.small;
//         image.alt = result.alt_description;

//         const imageLink = document.createElement('a');
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";
//         imageLink.textContent = result.alt_description || "View Image";

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageLink);

//         searchResults.appendChild(imageWrapper);
//     });

//     page++;
//     if (results.length > 0) {
//         showMore.style.display = "block";
//     } else {
//         showMore.style.display = "none";
//     }
// }

// formEl.addEventListener("submit", (event) => {
//     event.preventDefault();
//     page = 1;
//     searchImages();
// });

// showMore.addEventListener("click", () => {
//     searchImages();
// });
