const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let shows = [];

async function allShow() {
        await fetch(`https://api.tvmaze.com/shows`)
        .then((res) => res.json())
        .then((data) => shows = data)
        
        console.log(input.value);
        allShowsDislpay();
};

function allShowsDislpay() {      
        result.innerHTML = shows
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

async function fetchShow(search) {
        await fetch(`https://api.tvmaze.com/search/shows?q=:${search}`)
        .then((res) => res.json())
        .then((data) => shows = data)
        
        showsDislpay();
};

function showsDislpay() {    
        result.innerHTML = shows
        .map((other) => 
             `            
               <div class="show">
                   <img src="${other.show.image.original}" alt="nothing">
                   <div class="description">
                       <h4>${other.show.name}</h4>
                       <p>${other.show.summary}</p>
                       <p>${other.show.status}</p>
                   </div>
               </div>
               `
        ).join("");
};

// function debounce(callback, delay) {

//     let timer = null;
//     let context = this;
//     let args = arguments;

//     return function() {

//         clearTimeout(timer);
//         timer = setTimeout(function(){
//             callback.apply(context);
//         }, delay)
//     }
// }

// input.addEventListener("keydown", function(){
//     console.log("test");
// });

// input.addEventListener("keydown", debounce(() => {
//     input.addEventListener("click", (e) => {
//         console.log(e);
//         // fetchShow(e.target.value);
//     });
// }, 700));

input.addEventListener("input", (e) => {
    fetchShow(e.target.value);
    console.log(shows);
})


form.addEventListener("submit", (e) => {
    e.preventDefault();
    // showsDislpay();
});

// At the loading of the website we display a picture before granting access to the content
window.addEventListener("load", () => {
    setTimeout(() => {
        cover.style.opacity = "0";
    }, 1000);
    setTimeout(() => {
        cover.remove();
    }, 1500);
    allShow();
});

