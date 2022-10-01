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

function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }
  
input.addEventListener('input', debounce(() => {
    console.log(input.value);
    fetchShow(input.value);
  }, 750))

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

