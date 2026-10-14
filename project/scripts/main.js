
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Open and close the mobile navigation.
function toggleMenu() {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", `${isOpen}`);
    menuButton.setAttribute(
        "aria-label",
        `${isOpen ? "Close navigation menu" : "Open navigation menu"}`
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
}

// Display the current year and last modified date.
function updateFooter() {
    const today = new Date();

    currentYear.textContent = `${today.getFullYear()}`;
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// Set up the navigation and footer.
function initializePage() {
    if (menuButton && navigation) {
        menuButton.addEventListener("click", toggleMenu);
    }

    if (currentYear && lastModified) {
        updateFooter();
    }
}

initializePage();
