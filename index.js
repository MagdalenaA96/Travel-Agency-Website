document.addEventListener("DOMContentLoaded", () => {
  showOffers();
});

const $introduceSection = document.getElementById("introduce-section");
const $searchInput = document.getElementById("search-input");
const $searchButton = document.getElementById("search-button");
const $offersList = document.getElementById("offers-list");
const offers = window.travelOffers;
const $choosenOffer = document.getElementById("choosen-offer");
const $myOfferDescription = document.getElementById("my-offer-description");
const $selectedBoard = document.getElementById("board");
const $selectedGuestsNumber = document.getElementById("guests");
const $bookingForm = document.getElementById("booking-form");
const $bookingInputs = document.getElementsByClassName("booking-input");
const bookingInputsArr = Array.from($bookingInputs);
const $bookingInputsErrors = document.getElementsByClassName("error");
const $paymentMethodContainer = document.getElementById("payment-methods");
const $paymentMethodError = document.getElementById("payment-method-error");
const $confirmationForm = document.getElementById("confirmation-form");
const $reservationForm = document.getElementById("reservation-form");
let saveOfferHandler = null;
const bookingDetails = {};
let selectedOffer = null;

function showOffers() {
  offers.map((offer) => {
    createOfferBox(offer);

    return { offer };
  });
}

function createOfferBox(offer) {
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

  offerDiv.addEventListener("mouseenter", function () {
    this.style.cursor = "pointer";
  });

  offerDiv.addEventListener("click", () => {
    selectedOffer = offer;
    console.log(selectedOffer);
    showOfferDetails(selectedOffer);
  });
}

$searchButton.addEventListener("click", () => {
  const searchTerm = $searchInput.value.toLowerCase();
  filterOffers(searchTerm);
});

function filterOffers(searchTerm) {
  $offersList.innerHTML = ``;

  let foundOffers = offers.filter(
    (offer) =>
      offer.country.toLowerCase().includes(searchTerm) ||
      offer.city.toLowerCase().includes(searchTerm)
  );
  if (foundOffers.length === 0) {
    $offersList.innerHTML = "<p>No offers found<p>";
  } else {
    foundOffers.forEach((offer) => {
      createOfferBox(offer);
    });
  }
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

  showTotalPrice(selectedOffer);

  const $bookingButton = document.getElementById("booking-button");

  if (saveOfferHandler) {
    $bookingButton.removeEventListener("click", saveOfferHandler);
  }

  saveOfferHandler = () => saveOfferDetails(offer);
  $bookingButton.addEventListener("click", saveOfferHandler);

  function saveOfferDetails(selectedOffer) {
    let choosenBoard =
      $selectedBoard.options[
        $selectedBoard.selectedIndex
      ].textContent.toLowerCase();
    let guestsNumber = $selectedGuestsNumber.value;
    let finalCost = parseFloat(
      document.getElementById("total-price").innerText
    );
    let choosenDate = selectDate.options[
      selectDate.selectedIndex
    ].textContent.replace(" - ", " to ");

    bookingDetails.date = choosenDate;
    bookingDetails.board = choosenBoard;
    bookingDetails.guests = guestsNumber;
    bookingDetails.price = finalCost;

    bookOffer(selectedOffer, bookingDetails);
  }
}

const $backToOffersButton = document.getElementById("back-button-offer");
$backToOffersButton.addEventListener("click", () => {
  $choosenOffer.classList.toggle("hidden");
  $offersList.classList.toggle("hidden");
  $introduceSection.classList.toggle("hidden");
});

function showTotalPrice(offer) {
  const $totalPrice = document.getElementById("total-price");
  $totalPrice.innerText = ``;

  $selectedBoard.addEventListener("change", calcTotalPrice);

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

  bookingInputsArr.forEach((input, i) => {
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
      let choosenPaymentMethod = event.target.value.replace("-", " ");
      bookingDetails.paymentMethod = choosenPaymentMethod;
    }

    return { bookingDetails };
  });
}

$reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendBookingForm(bookingDetails);
});

const $backToOfferDetailsBtn = document.getElementById("back-button-booking");
$backToOfferDetailsBtn.addEventListener("click", backToOfferDetails);

function backToOfferDetails() {
  $choosenOffer.classList.toggle("hidden");
  $bookingForm.classList.toggle("hidden");

  bookingInputsArr.forEach((input, i) => {
    $bookingInputsErrors[i].innerText = "";
  });
  $paymentMethodError.innerText = "";
}

function sendBookingForm(offer) {
  let allInputsValid = true;

  const $cashPayment = document.getElementById("cash");
  const $bankTransferPayment = document.getElementById("bank-transfer");

  if (!$cashPayment.checked && !$bankTransferPayment.checked) {
    $paymentMethodError.innerHTML = "Check the payment method";
    allInputsValid = false;
  }

  bookingInputsArr.forEach((input, i) => {
    if (input.value === "" || $bookingInputsErrors[i].innerHTML !== "") {
      allInputsValid = false;
      $bookingInputsErrors[i].innerHTML = "This field is required";
    }
  });

  if (allInputsValid) {
    showConfirmationForm(selectedOffer, bookingDetails);
    console.log(bookingDetails);
  }
}

function showConfirmationForm(offer, bookingDetails) {
  $bookingForm.classList.toggle("hidden");
  $confirmationForm.classList.toggle("hidden");
  let bookingCost = ((0.3 * 10 * bookingDetails.price) / 10).toFixed(0);

  const $offerSummary = document.getElementById("offer-summary");
  $offerSummary.innerHTML = `<p> You have booked a stay at the <strong>${selectedOffer.hotel} hotel in ${selectedOffer.city}, ${selectedOffer.country},</strong> for <strong>${bookingDetails.guests} person/s</strong> from <strong>${bookingDetails.date}</strong> with <strong>${bookingDetails.board}</strong>. The total amount due is <strong>${bookingDetails.price} PLN</strong>. You have selected <strong>${bookingDetails.paymentMethod}</strong> as your payment method. Please remember to pay 30% of this amount - <strong>${bookingCost} PLN</strong> within two weeks. The rest of the necessary information regarding your booking will be sent via email.<br><br>
  Thank you for choosing our services! We hope your vacation with us will be unforgettable!</p>`;
}

const $backToHomePageBtn = document.getElementById("back-to-homepage");
$backToHomePageBtn.addEventListener("click", () => {
  $confirmationForm.classList.toggle("hidden");
  $offersList.classList.toggle("hidden");
  $introduceSection.classList.toggle("hidden");

  $reservationForm.reset();
  selectedOffer = null;

  bookingInputsArr.forEach((input, i) => {
    $bookingInputsErrors[i].innerText = "";
  });
  $paymentMethodError.innerText = "";
});
