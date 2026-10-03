const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
        menuButton.setAttribute("aria-expanded", "true");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
    }

});


const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


const temples = [
    {
        //  1
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        //  2
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        //  3
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        //  4
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-20490-thumb.jpg"
    },
    {
        //  5
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        //  6
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        //  7
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        //  8
        templeName: "Freiberg Germany",
        location: "Freiberg, Germany",
        dedicated: "1985, June, 29-30",
        area: 21500,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/7f19f5c444af3ddcbda946c6977a460baeaea1d2/full/!320,/0/default"
    },
    {
        //  9
        templeName: "San Salvador El Salvador",
        location: "San Salvador, El Salvador",
        dedicated: "2011, August, 21",
        area: 27986,
        imageUrl:
            "https://img1.advisor.travel/fs440x440px-San_Salvador_El_Salvador_Temple_19.jpg"
    },
    {
        //  10
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October 30 - November 2",
        area: 59246,
        imageUrl:
            "https://www.churchofjesuschrist.org/imgs/e2ed87c928912468fe3882ef21c7851b6b9bb0ac/full/!320,/0/default"
    },

];


function setActiveLink(activeLink) {
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");
    });

    activeLink.classList.add("active");
}

const homeLink = document.querySelector("#home");
const pageTitle = document.querySelector("#page-title");

homeLink.addEventListener("click", () => {
    setActiveLink(homeLink);
    pageTitle.textContent = "Home";
    createTempleCard(temples);
});

const oldLink = document.querySelector("#old");
oldLink.addEventListener("click", () => {
    setActiveLink(oldLink);
    pageTitle.textContent = "Temples built before 1900";
    const oldTemples = temples.filter(temple => parseInt(temple.dedicated) < 1900);
    createTempleCard(oldTemples);
});

const newLink = document.querySelector("#new");
newLink.addEventListener("click", () => {
    setActiveLink(newLink);
    pageTitle.textContent = "Temples built after 2000";
    const newTemples = temples.filter(temple => parseInt(temple.dedicated) > 2000);
    createTempleCard(newTemples);
});

const largeLink = document.querySelector("#large");
largeLink.addEventListener("click", () => {
    setActiveLink(largeLink);
    pageTitle.textContent = "Temples larger than 90,000 square feet";
    const largeTemples = temples.filter(temple => temple.area > 90000);
    createTempleCard(largeTemples);
});

const smallLink = document.querySelector("#small");
smallLink.addEventListener("click", () => {
    setActiveLink(smallLink);
    pageTitle.textContent = "Temples smaller than 10,000 square feet";
    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCard(smallTemples);
});



function createTempleCard(filteredTemples) {
    const container = document.querySelector(".res-grid");
    container.innerHTML = "";

    filteredTemples.forEach((temple, index) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("width", "400");
        img.setAttribute("height", "250");

        if (index === 0) {
            img.setAttribute("loading", "eager");
            img.setAttribute("fetchpriority", "high");
        } else {
            img.setAttribute("loading", "lazy");
        }

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);

        container.appendChild(card);

    });
}

createTempleCard(temples);