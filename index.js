document.addEventListener("DOMContentLoaded", () => {
  const initialHash = window.location.hash || "#home-page";
  showSection(initialHash);
  window.history.replaceState({}, "", initialHash);

  showOffers();
  showSummerOffers();
  showWinterOffers();
});

const $homePage = document.getElementById("home-page");
const $introduceSection = document.getElementById("introduce-section");
const $searchInput = document.getElementById("search-input");
const $searchButton = document.getElementById("search-button");
const $offersList = document.getElementById("offers-list");
const offers = travelOffers;
const sections = document.querySelectorAll("main > section");
const $foundOffersSection = document.getElementById("found-offers");
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

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetSection = link.getAttribute("href");

    showSection(targetSection);

    window.history.pushState({}, "", targetSection);
  });
});

function showSection(sectionId) {
  hideSection();

  const targetSection = document.querySelector(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  } else {
    showSection("#home-page");
  }
}

function hideSection() {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });
}

window.addEventListener("popstate", () => {
  const hash = window.location.hash;

  showSection(hash);
});

function showOffers() {
  offers.map((offer) => {
    const offerBox = createOfferBox(offer);
    $offersList.appendChild(offerBox);

    return { offer };
  });
}

function showSummerOffers() {
  let summerOffers = offers.filter((offer) =>
    offer.dates.some(
      (date) =>
        date.departure.includes("-06-") ||
        date.departure.includes("-07-") ||
        date.departure.includes("-08-") ||
        date.departure.includes("-09-")
    )
  );

  summerOffers.map((offer) => {
    const $summerOffersScreen = document.getElementById(
      "summer-offers-container"
    );
    const offerBox = createOfferBox(offer);
    $summerOffersScreen.appendChild(offerBox);

    return { offer };
  });
}

function showWinterOffers() {
  let winterOffers = offers.filter((offer) =>
    offer.dates.some(
      (date) =>
        date.departure.includes("-12-") ||
        date.departure.includes("-01-") ||
        date.departure.includes("-02-") ||
        date.departure.includes("-03-")
    )
  );

  winterOffers.map((offer) => {
    const $winterOffersScreen = document.getElementById(
      "winter-offers-container"
    );
    const offerBox = createOfferBox(offer);
    $winterOffersScreen.appendChild(offerBox);

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

  offerDiv.addEventListener("mouseenter", function () {
    this.style.cursor = "pointer";
    offerDiv.classList.add("actual-offer");
  });

  offerDiv.addEventListener("mouseleave", function () {
    offerDiv.classList.remove("actual-offer");
  });

  offerDiv.addEventListener("click", () => {
    selectedOffer = offer;
    console.log(selectedOffer);
    showOfferDetails(selectedOffer);
  });

  return offerDiv;
}

$searchButton.addEventListener("mouseenter", function () {
  this.style.cursor = "pointer";
});

$searchButton.addEventListener("click", () => {
  const searchTerm = $searchInput.value.toLowerCase();
  filterOffers(searchTerm);
  window.location.hash = "found-offers";
});

function filterOffers(searchTerm) {
  hideSection();

  $foundOffersSection.classList.remove("hidden");
  const $foundOffersList = document.getElementById("found-offers-list");
  $foundOffersList.innerHTML = ``;

  let foundOffers = offers.filter(
    (offer) =>
      offer.country.toLowerCase().includes(searchTerm) ||
      offer.city.toLowerCase().includes(searchTerm)
  );
  if (foundOffers.length === 0) {
    $foundOffersList.innerHTML = "<p>No offers found</p>";
  } else {
    foundOffers.forEach((offer) => {
      const offerBox = createOfferBox(offer);
      $foundOffersList.appendChild(offerBox);
    });
  }
}

function showOfferDetails(offer) {
  getWeather();
  getCountryInfo();
  hideSection();
  $choosenOffer.classList.remove("hidden");

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

function showCountryInfo(data) {
  const $countryInfo = document.getElementById("country-info");

  const currencyKey = Object.keys(data[0].currencies)[0];

  const countryLanguages = [];
  Object.entries(data[0].languages).forEach(([languageCode, languageName]) => {
    countryLanguages.push(languageName);
  });
  const languagesString = countryLanguages.toString().replaceAll(",", ", ");

  const timezones = [];
  data[0].timezones.forEach((timezone) => {
    timezones.push(timezone);
  });
  const timezonesString = timezones.toString().replaceAll(",", ", ");
  console.log(timezonesString);

  $countryInfo.innerHTML = `<strong>Offical name of country:</strong> ${data[0].name.official} <br>
  <strong>Capital city:</strong> ${data[0].capital} <br>
  <strong>Population of this coutry:</strong> ${data[0].population} <br>
  <strong>Continents:</strong> ${data[0].continents} <br>
  <strong>Currency:</strong> ${currencyKey} - ${data[0].currencies[currencyKey].name}, symbol: ${data[0].currencies[currencyKey].symbol} <br>
  <strong>Languages:</strong> ${languagesString} <br>
  <strong>Time zones:</strong> ${timezonesString}`;

  const $flagContainer = document.getElementById("flag-container");

  let flagImg = document.getElementById("country-flag");

  if (flagImg) {
    flagImg.src = ``;
  } else {
    flagImg = document.createElement("img");
    flagImg.id = "country-flag";
  }

  flagImg.src = `${data[0].flags.png}`;

  $flagContainer.prepend(flagImg);
}

function getCountryInfo() {
  fetch(`https://restcountries.com/v3.1/name/${selectedOffer.country}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showCountryInfo(data);
    });
}

const weatherImages = {
  day: {
    0: "static/images/weather/clear.png",
    1: "static/images/weather/partly_cloudy.png",
    2: "static/images/weather/partly_cloudy.png",
    3: "static/images/weather/cloudy.png",
    45: "static/images/weather/light_rain.png",
    48: "static/images/weather/rain.png",
    51: "static/images/weather/heavy_rain.png",
    61: "static/images/weather/light_snow.png",
    63: "static/images/weather/snow.png",
    65: "static/images/weather/snow.png",
    80: "static/images/weather/light_thunder.png",
    81: "static/images/weather/heavy_thunder.png",
    82: "static/images/weather/heavy_thunder.png",
  },

  night: {
    0: "static/images/weather/clear_night.png",
    1: "static/images/weather/partly_cloudy_night.png",
    2: "static/images/weather/partly_cloudy_night.png",
    3: "static/images/weather/cloudy_night.png",
    45: "static/images/weather/light_rain.png",
    48: "static/images/weather/rain.png",
    51: "static/images/weather/heavy_rain.png",
    61: "static/images/weather/light_snow_night.png",
    63: "static/images/weather/snow.png",
    65: "static/images/weather/snow.png",
    80: "static/images/weather/light_thunder_night.png",
    81: "static/images/weather/heavy_thunder.png",
    82: "static/images/weather/heavy_thunder.png",
  },
};

function getWeather() {
  const $latitude = selectedOffer.coordinates.latitude;
  const $longitude = selectedOffer.coordinates.longitude;

  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${$latitude}&longitude=${$longitude}&current_weather=true`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      showWeather(data, null);
    })
    .catch((error) => {
      showWeather(null, error);
    });
}

function showWeather(data, error) {
  const $weatherContent = document.getElementById("weather-content");
  if (error) {
    $weatherContent.classList.remove("weather-box")
    $weatherContent.innerHTML = `
    <h1> 
    <p>Something went wrong.</p>
  `;
  } else {
    $weatherContent.classList.add("weather-box")
    
    const $weatherImgPlace = document.getElementById("weather-img-place");
    let weatherImg = document.getElementById("weather-img");

    if (!weatherImg) {
      weatherImg = document.createElement("img");
      weatherImg.id = "weather-img";
    }

    let weatherCode = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day;
    const timeOfDay = isDay ? "day" : "night";
    weatherImg.src = weatherImages[timeOfDay][weatherCode];

    $weatherImgPlace.appendChild(weatherImg);

    let date = new Date();
    let today = date.toISOString().split("T")[0];

    const $today = document.getElementById("today");
    $today.innerText = today;

    const $city = document.getElementById("city");
    $city.innerText = `${selectedOffer.city}`;
    const $weatherInfo = document.getElementById("weather-info");

    $weatherInfo.innerHTML = `<span class="bold">Temperature:</span>
  <p>${data.current_weather.temperature} ${data.current_weather_units.temperature} </p>
  <span class="bold">Wind speed:</span> 
  <p/>${data.current_weather.windspeed} ${data.current_weather_units.windspeed}</p>`;
    console.log(data);
  }
}

const $backToOffersButton = document.getElementById("back-button-offer");
$backToOffersButton.addEventListener("click", () => {
  $choosenOffer.classList.toggle("hidden");

  const hash = window.location.hash;
  showSection(hash);
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
  hideSection();
  showSection("#home-page");

  $reservationForm.reset();
  selectedOffer = null;

  bookingInputsArr.forEach((input, i) => {
    $bookingInputsErrors[i].innerText = "";
  });
  $paymentMethodError.innerText = "";
});
