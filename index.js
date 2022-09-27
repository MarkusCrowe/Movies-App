
const results = document.querySelector("section");
let showsData = [];


async function fetchMovie() {
    await fetch(`https://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => showsData = data)

    showsData.sort(() => Math.random() - 0.5);

    console.log(showsData[7]);
    displayShows();
}

// fetchMovie();

function displayShows() {
    // showsData.length = 6;
    results.innerHTML = showsData
        .filter((show) => 
            show.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .map((show) =>
        `
            <div class="show">
                <img src="${show.image.original}">
                <h2>${show.name}</h2>
                <div class="summary">
                    <p>${show.summary}</p>
                    <p>${show.status}</p>
                </div>
            </div>
        `
    ).join("");
}

window.addEventListener("load", fetchMovie);

inputSearch.addEventListener("input", displayShows);