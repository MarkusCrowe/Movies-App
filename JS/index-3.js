const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let shows = [];

// if(${other.show.image}) {}

async function fetchShow(search) {
    await fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
    .then((res) => res.json())
    .then((data) => shows = data)

    showsDislpay();
};



function showsDislpay() {    
    result.innerHTML = shows
    .map((other) => 
        `                
        <div class="show">
        <img src='${other.show?.image?.original || "../Assets/Images/images.png"}'>
        <div class="description">
           <h4>${other.show.name}</h4>
           <p>${other.show.summary}</p>
           <p>${other.show.status}</p>
           </div>
           </div>
           `
    ).join("");
};

input.addEventListener("input", (e) => {
    console.log((e.target.value));
    fetchShow(e.target.value);
});

window.addEventListener("load", () => {
    setTimeout(() => {
        cover.style.opacity = "0";
    }, 1000);
    setTimeout(() => {
        cover.remove();
    }, 1500);
    allShow();
});
