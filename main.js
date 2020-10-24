"use strict";
console.log("hello world");


document.addEventListener("DOMContentLoaded", loadLogo);
// Global
const navItems = document.querySelectorAll('.nav-item');

async function loadLogo(){
    let res = await fetch("media/logo-green-02.svg");
    let mySvg = await res.text();
    let logoContainer = document.querySelector(".logo");
    logoContainer.innerHTML =mySvg;
    setLogo()
    loadJsonProjects()
}
async function loadJsonProjects(){
    let res = await fetch("projects.json");
    let data = await res.json();
    console.log(data, 'in load');
 
    renderProjects(data)
}

function renderProjects(data){
    data.forEach(function (project) {
        let template = document.querySelector("template").content;
    
        let aCopy = template.cloneNode(true);
        console.log("project", project);
        aCopy.querySelector(".card-title").textContent = project.title;
        aCopy.querySelector(".description").textContent = project.description;

        // Setting a pesudo element with JS to apply background image
        // Code inspired by: https://stackoverflow.com/questions/21032481/change-the-style-of-before-and-after-pseudo-elements
        const moduleStyle =   aCopy.querySelector(".module").style;
        moduleStyle.setProperty('--background',  `url(media/${project.image})`);

        aCopy.querySelector("a").href = project.link;

     

        let parent = document.querySelector(".cards-wrapper");
        parent.appendChild(aCopy);
      });
      flipCard()
}


function setLogo(){

    const lines = document.querySelectorAll("path");
    lines.forEach(element => {
    element.addEventListener('mouseenter',enterShape);

    element.style.fill = "white";

    });

}


function enterShape(event){
    event.target.style.fill = "orange";
    event.target.classList.add('grow');

    setTimeout(() => {
        event.target.style.fill = "white";
        event.target.classList.remove('grow');

    }, 500);

}

  
  const el = document.querySelector('main');


el.addEventListener('wheel', showTitle);
el.addEventListener('click', showTitle);


function showTitle(){
      const title = document.querySelector('.title');
     title.classList.add('appear');

title.style.visibility = 'visible'
setTimeout(() => {
    const arrow = document.querySelector('.arrow >i');
    
    arrow.classList.add('appear');
    arrow.classList.add('bounce');

    arrow.addEventListener('click', changeScene)
    arrow.style.visibility = 'visible'
}, 500);

}

function changeScene(){
    console.log('change');
    // Dissapearing front
    const front = document.querySelector('.front');
    front.classList.add('shiftout');

    // Showing portfolio

setTimeout(() => {
    const header = document.querySelector('header');
    header.style.display = 'block';
    
    header.classList.add('shiftin')

    const portfolio = document.querySelector('.portfolio-page');
    portfolio.style.display = 'block';
     navItems.forEach(element => {
        if (element.dataset.page === "portfolio") {
            element.classList.add('active')
        }
    });
    portfolio.classList.add('shiftin')
    document.querySelector('.front').style.height = 'auto'
    document.querySelector('.title').style.marginTop = '0'


}, 200);


}

navItems.forEach(element => {
    
    element.addEventListener('click', changePage)
});

function changePage(event){
    navItems.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
    });

    console.log('change page');
    // Dissapearing front
    let currPage;
    const pages = document.querySelectorAll('.page');
    pages.forEach(element => {
    if (element.classList.contains('shiftin') || element.classList.contains('sidein')) {
        currPage = element;
    }
});
console.log(currPage.dataset.page, 'in changepage');
let nextPage = document.querySelector(`.${event.target.dataset.page}-page`);
if (currPage !== nextPage) {

    currPage.classList.remove('sidein')
}

currPage.classList.add('sideout');
// Making active color

event.target.classList.add('active')
    // Showing nextpage
    
    setTimeout(() => {
        nextPage.style.display = 'block';

        if (currPage !== nextPage) {
                    
            nextPage.classList.add('sidein')
        }
        
    }, 200);
    setTimeout(() => {

                if (currPage.classList.contains('shiftin') & currPage !== nextPage) {
                    currPage.classList.remove('shiftin')
                }
                if (currPage !== nextPage) {
                    
                    currPage.style.display = 'none';
                }
        currPage.classList.remove('sideout');
        flipBackCards()
}, 400);


}


// Card flip


function flipCard(){
    
    const cards = document.querySelectorAll('.card-to-flip');
    cards.forEach(card => {
        card.addEventListener( 'mouseover', function() {
          card.classList.add('is-flipped');
        });
        card.addEventListener( 'mouseleave', function() {
            setTimeout(() => {
                
                card.classList.remove('is-flipped');
            }, 3000);
          });
        
    });
}

function flipBackCards(){
    const cards = document.querySelectorAll('.card-to-flip');
    cards.forEach(card => {
          card.classList.remove('is-flipped');
        
    });
}
