
const results = document.getElementById("allShows");
const showsList = document.getElementById("showList");
let showsData = [];

async function fetchMovie() {
    await fetch(`https://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => showsData = data)

    showsData.sort(() => Math.random() - 0.5);

    console.log(showsData[7]);
    displayShows();
}

function displayShows() {
    // showsData.length = 6;
    results.innerHTML = showsData
        .filter((show) => 
            show.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .map((show) =>
        `
            <div class="show">
                <img src="${show.image.original}">
                <div class="description">
                    <h4>${show.name}</h4>
                    <p>${show.summary}</p>
                    <p>${show.status}</p>
                </div>
            </div>
        `
    ).join("");
}

window.addEventListener("load", () => {
    setTimeout(() => {
        cover.style.opacity = "0";
        // cover.remove();
    }, 1000);
    setTimeout(() => {
        cover.remove();
    }, 1500);
    fetchMovie();
});

inputSearch.addEventListener("input", displayShows);



// lists.addEventListener("click", () => {
//     results.remove();

//     showsList.innerHTML = showsData
//         .filter((show) => 
//             show.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
//         .map((show) =>
//         `
//             <ul>
//                 <li>${show.name}</li>
//             </ul>
//         `
// ).join("");
// });

{/* <h2>${show.name}</h2>
                <div class="summary">
                    <p>${show.summary}</p>
                    <p>${show.status}</p>
                </div> */}