const params = new URLSearchParams(window.location.search);

const productIds = [
    "fc-1888",
    "fc-2050",
    "fs-1987",
    "ac-2000",
    "jj-1969"
];

const product = params.get("product");
const rating = params.get("rating");
const installationDate = params.get("installationDate");

const hasSubmittedReview =
    productIds.includes(product) &&
    ["1", "2", "3", "4", "5"].includes(rating) &&
    Boolean(installationDate);

const storedCount = Number(localStorage.getItem("reviewCount"));

let reviewCount =
    Number.isInteger(storedCount) && storedCount >= 0
        ? storedCount
        : 0;

if (hasSubmittedReview) {
    reviewCount += 1;
    localStorage.setItem("reviewCount", reviewCount);
} else {
    document.querySelector("#confirmation-title").textContent =
        "No Review Submitted";

    document.querySelector("#confirmation-message").textContent =
        "Please complete the product review form first.";
}

document.querySelector("#review-count").textContent = reviewCount;

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;