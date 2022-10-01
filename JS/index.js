// // Variables
const results = document.querySelector("body-container");
let showsData = [];
let sortMethod = "";
let clickButtonSort = 0;
let clickButtonList = 0;

// Function to fetch the data of the API and display it in a random order
async function fetchMovie() {
    await fetch(`https://api.tvmaze.com/shows`)
    .then((res) => res.json())
    .then((data) => showsData = data)

    showsData.sort(() => Math.random() - 0.5);

    // console.log(showsData[7]);
    displayShows();
};



// // function to display the data, filter it and sort it
function displayShows() {
//     // showsData.length = 6;
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
        .map((show) => {
            return 
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
        }
    ).join("");
};

// // Function to display the list of the shows
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

// At the loading of the website we display a picture before granting access to the content
window.addEventListener("load", () => {
    setTimeout(() => {
        cover.style.opacity = "0";
    }, 1000);
    setTimeout(() => {
        cover.remove();
    }, 1500);
    fetchMovie();
});

// // When anything is written in the input it display the corresponding content
inputSearch.addEventListener("input", (e) => {
    fetchMovie();
    console.log(e.target.value);
});

form.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    displayShows();
})



// When clicking the button it sort the content in a-z or z-a
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

// // Upon clicking the button the content is scrambled
scramble.addEventListener("click", (e) => {
    sortMethod = "";
    showsData.sort(() => Math.random() - 0.5);
    displayShows();
});

// // Upon clicking the button display the list of shows
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
        location.reload();
    }
});

