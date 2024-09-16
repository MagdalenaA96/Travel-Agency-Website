document.addEventListener("DOMContentLoaded", () => {
  showOffers();
});

const $offersList = document.getElementById("offers-list");
const $choosenOffer = document.getElementById("choosen-offer");
const $introduceSection = document.getElementById("introduce-section");

function showOffers() {
  let offers = window.travelOffers;
  offers.map((offer) => {
    let offerDiv = document.createElement("div");
    offerDiv.classList.add("offer-box");
    let imageDiv = document.createElement("div");
    let descriptionPlace = document.createElement("div");
    descriptionPlace.classList.add("decription-style");

    offerDiv.appendChild(imageDiv);
    offerDiv.appendChild(descriptionPlace);

    let offerImage = document.createElement("img");
    offerImage.classList.add("offer-image");
    offerImage.src = "static/images/chor-tsang-07mSKrzKiRw-unsplash.jpg";
    offerImage.alt = "Offer's picture";
    imageDiv.appendChild(offerImage);

    let description = document.createElement("p");
    description.innerHTML = `<h3>${offer.hotel}</h3>
    <h4>${offer.country}, ${offer.city}</h4>
    <p>${offer.dates[0].departure} - ${offer.dates[0].return}</p>
    <p class="price-style">${offer.price} zł <span>/os</span></p>`;
    descriptionPlace.appendChild(description);

    $offersList.appendChild(offerDiv);

    offerDiv.addEventListener("click", () => {
      showOfferDetails(offer);
    });

    return { offer: offer, offerDiv: offerDiv };
  });
}

function showOfferDetails(offer) {
  $choosenOffer.classList.toggle("hidden");
  $offersList.classList.toggle("hidden");
  $introduceSection.classList.toggle("hidden");

  $hotelName = document.getElementById("hotel-name");
  $hotelName.innerText = `${offer.hotel}`;

  $myOfferDetails = document.getElementById("travel-details-container");
  $myOfferDetails.innerHTML = ``;
  $myOfferDetails.innerHTML = `<h3>${offer.hotel}</h3>
    <h4>${offer.country}, ${offer.city}</h4>
    <p>${offer.dates[0].departure} - ${offer.dates[0].return}</p>
    <p class="price-style">${offer.price} zł <span>/os</span></p>`;
}
