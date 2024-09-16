document.addEventListener("DOMContentLoaded", () => {
  showOffers();
});

const $offersList = document.getElementById("offers-list");

function showOffers() {
  let offers = window.travelOffers;
  offers.map((offer) => {
    let offerDiv = document.createElement("div");
    offerDiv.classList.add("offer-box");
    let imageDiv = document.createElement("div");
    let descriptionPlace = document.createElement("div");

    offerDiv.appendChild(imageDiv);
    offerDiv.appendChild(descriptionPlace);

    let offerImage = document.createElement("img");
    offerImage.src = "static/images/chor-tsang-07mSKrzKiRw-unsplash.jpg"
    offerImage.alt = "Offer's picture";
    imageDiv.appendChild(offerImage);

    let description = document.createElement("p");
    description.innerText = `${offer.hotel}
    ${offer.country}
    ${offer.city}
    ${offer.dates[0].departure} - ${offer.dates[0].return}
    ${offer.price} zł`;
    descriptionPlace.appendChild(description);

    $offersList.appendChild(offerDiv);
  });
}
