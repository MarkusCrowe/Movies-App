
const results = document.querySelector("body-container");
let showsData = [];
let sortMethod = "";
let clickButtonSort = 0;
let clickButtonList = 0;

async function fetchMovie() {
    await fetch(`https://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => showsData = data)

    showsData.sort(() => Math.random() - 0.5);

    console.log(showsData[7]);
    displayShows();
};

function displayShows() {
    // showsData.length = 6;
    allShows.innerHTML = showsData
        .filter((show) => 
            show.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .sort((a, b) => {
            if (sortMethod === "alpha") {
                return a.name.localeCompare(b.name);
            } else if (sortMethod === "invertAlpha") {
                return b.name.localeCompare(a.name)
            }
        })
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
};

function displayList() {
    showList.innerHTML = showsData
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        .map((show) =>
        `
            <li>${show.name}</li>
        `
    ).join("");
};

window.addEventListener("load", () => {
    setTimeout(() => {
        cover.style.opacity = "0";
    }, 1000);
    setTimeout(() => {
        cover.remove();
    }, 1500);
    fetchMovie();
});

inputSearch.addEventListener("input", displayShows);

alpha.addEventListener("click", (e) => {
    if (clickButtonSort === 0) {
        sortMethod = e.target.id;
        displayShows();
        alpha.innerHTML = "Invert Order";
        clickButtonSort++;
    } else {
        sortMethod = "invertAlpha";
        displayShows();
        alpha.innerHTML = "Alphabetical Order";
        clickButtonSort = 0;
    }
});

scramble.addEventListener("click", (e) => {
    sortMethod = "";
    showsData.sort(() => Math.random() - 0.5);
    displayShows();
});

list.addEventListener("click", (e) => {
    if (clickButtonList === 0) {
        allShows.remove();
        displayList();
        showList.classList.add("showList");
        list.innerHTML = "Home";
        alpha.style.opacity = 0;
        scramble.style.opacity = 0;
        clickButtonList++
    } else {
        // console.log(e);
        location.reload();
        // clickButtonList = 0;
    }
});

