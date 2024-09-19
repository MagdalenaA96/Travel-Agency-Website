document.addEventListener("DOMContentLoaded", () => {
  showOffers();
});

const $offersList = document.getElementById("offers-list");
const $choosenOffer = document.getElementById("choosen-offer");
const $introduceSection = document.getElementById("introduce-section");
const $myOfferDescription = document.getElementById("my-offer-description");
const $bookingForm = document.getElementById("booking-form");
const $bookingInputs = document.getElementsByClassName("booking-input");
const $bookingInputsErrors = document.getElementsByClassName("error");
const $paymentMethodContainer = document.getElementById("payment-methods");
const $paymentMethodError = document.getElementById("payment-method-error");
const $confirmationForm = document.getElementById("confirmation-form");

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

  const $hotelName = document.getElementById("hotel-name");
  $hotelName.innerText = `${offer.hotel}`;

  const $myOfferDetails = document.getElementById("offer-details-container");
  $myOfferDetails.innerHTML = ``;

  let leftSideDetails = document.createElement("div");
  leftSideDetails.classList.add("left-side-details");
  $myOfferDetails.appendChild(leftSideDetails);
  leftSideDetails.innerHTML = `<h3>${offer.hotel}</h3>
    <h4>${offer.country}, ${offer.city}</h4>
    <p>Transport: ${offer.transport}</p>`;

  let labelForSelectDate = document.createElement("label");
  labelForSelectDate.for = "select-date";
  labelForSelectDate.innerText = "Date: ";
  let selectDate = document.createElement("select");
  selectDate.name = "select-date";
  offer.dates.forEach((date) => {
    let option = document.createElement("option");
    option.textContent = `${date.departure} - ${date.return}`;
    selectDate.appendChild(option);
  });

  leftSideDetails.appendChild(labelForSelectDate);
  leftSideDetails.appendChild(selectDate);

  let onePersonPrice = document.createElement("div");
  onePersonPrice.innerHTML = `<p class="price-style" id="person-price">${offer.price} zł <span>/os</span></p>`;
  $myOfferDetails.appendChild(onePersonPrice);

  $myOfferDescription.innerHTML = `
  <p><span>Hotel's advantages:</span> ${offer.fullOfferDescription.advantages}<br>
  <span>Location:</span> ${offer.fullOfferDescription.location}<br>
  <span>Beach Distance:</span> ${offer.fullOfferDescription.beachDistance}<br>
  <span>Amenities:</span> ${offer.fullOfferDescription.amenities}<br>
  <span>Nearby Attractions:</span> ${offer.fullOfferDescription.nearbyAttractions}<br>
  <span>City Description:</span> ${offer.fullOfferDescription.cityDescription}<br>
  </p`;

  showTotalPrice(offer);

  const $bookingButton = document.getElementById("booking-button");
  $bookingButton.addEventListener("click", () => {
    const finalCost = parseFloat(
      document.getElementById("total-price").innerText
    );
  // const choosenDate = offer.dates.forEach(date)
  
    const bookingDetails = {price: finalCost};
    bookOffer(offer, bookingDetails);
  });

  return { offer: offer };
}

function showTotalPrice(offer) {
  const $totalPrice = document.getElementById("total-price");
  $totalPrice.innerText = ``;

  const $selectedBoard = document.getElementById("board");
  $selectedBoard.addEventListener("change", calcTotalPrice);

  const $selectedGuestsNumber = document.getElementById("guests");
  $selectedGuestsNumber.addEventListener("change", calcTotalPrice);

  function calcTotalPrice() {
    const foodPrice = $selectedBoard.value;
    const guestsPrice = $selectedGuestsNumber.value;
    let result =
      (parseFloat(offer.price) - parseFloat(foodPrice)) *
      parseFloat(guestsPrice);
    $totalPrice.innerText = `${result} zł`;
    return result;
  }

  calcTotalPrice();
}

function bookOffer(offer, bookingDetails) {
  $choosenOffer.classList.toggle("hidden");
  $bookingForm.classList.toggle("hidden");

  Array.from($bookingInputs).forEach((input, i) => {
    input.addEventListener("focusin", () => {
      $bookingInputsErrors[i].innerText = "";
    });
    input.addEventListener("focusout", () => {
      if (input.value.trim() === "") {
        $bookingInputsErrors[i].innerHTML = "This field is required";
      } else if (
        (i === 0 || i === 1) &&
        (input.value.length < 2 || /[^a-zA-Z\s]/.test(input.value))
      ) {
        $bookingInputsErrors[i].innerText = "Type valid information";
      } else if (
        i === 2 &&
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value)
      ) {
        $bookingInputsErrors[i].innerHTML = "Invalid e-mail address.";
      } else if (i === 3 && !input.checkValidity()) {
        $bookingInputsErrors[i].innerHTML = "Invalid phone number";
      }
    });
  });

  $paymentMethodContainer.addEventListener("change", (event) => {
    if (event.target.name === "payment-method") {
      $paymentMethodError.innerText = "";
    }
  });

  $bookingForm.addEventListener("submit", (event) => {
    sendBookingForm(event, offer, bookingDetails);
  });
}

function sendBookingForm(event, offer, bookingDetails) {
  event.preventDefault();
  let allInputsValid = true;

  const $cashPayment = document.getElementById("cash");
  const $bankTransferPayment = document.getElementById("bank-transfer");

  if (!$cashPayment.checked && !$bankTransferPayment.checked) {
    $paymentMethodError.innerHTML = "Check the payment method";
    allInputsValid = false;
  }

  Array.from($bookingInputs).forEach((input, i) => {
    if (input.value === "" || $bookingInputsErrors[i].innerHTML !== "") {
      allInputsValid = false;
    }
  });

  if (allInputsValid) {
    showConfirmationForm(offer, bookingDetails);
  }
}

function showConfirmationForm(offer, bookingDetails) {
  $bookingForm.classList.toggle("hidden");
  $confirmationForm.classList.toggle("hidden");
  let bookingCost = ((0.3 * 10 * bookingDetails.price) / 10).toFixed(0);

  const $offerSummary = document.getElementById("offer-summary");
  $offerSummary.innerHTML = `<p> You have booked a stay at <strong>${offer.hotel} hotel in ${offer.city} in ${offer.country}</strong> for <strong>3 people</strong> from <strong>July 7th, 2025</strong> to <strong>July 14th, 2025</strong> with <strong>all-inclusive board</strong>. The total amount due is <strong>${bookingDetails.price} PLN</strong>. You have selected <strong>cash</strong> as your payment method. Please remember to pay 30% of this amount <strong>(${bookingCost} zł)</strong> within two weeks. The rest of the necessary information regarding your booking will be sent via email.<br><br>
  Thank you for choosing our services! We hope your vacation with us will be unforgettable!</p>`;
}
