document.addEventListener("DOMContentLoaded", () => {
  showOffers();
});

const $offersList = document.getElementById("offers-list");

function showOffers() {
  let offers = window.travelOffers;
  offers.map((offer) => {
    let offerDiv = document.createElement("div");
    let imageDiv = document.createElement("div");
    let descriptionPlace = document.createElement("div");

    offerDiv.appendChild(imageDiv);
    offerDiv.appendChild(descriptionPlace);

    let offerImage = document.createElement("img");
    offerImage.alt = "Offer's picture";
    imageDiv.appendChild(offerImage);

    let description = document.createElement("p");
    description.innerText = `Offer description`;
    descriptionPlace.appendChild(description);

    $offersList.appendChild(offerDiv);
  });
}
