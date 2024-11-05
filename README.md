# 🏝️ Travel Agency Application (Frontend)

Welcome to the **Travel Agency Application** project! This is an interactive web application that allows users to explore and book travel offers. It is built entirely with frontend technologies, making it easy to showcase and navigate through a variety of destinations and vacation packages.

## ✨ Features

- **Offer Search**: Users can search for travel offers by entering keywords related to the destination, city, or hotel.
- **Interactive Booking**: Users can select their desired trip, customize accommodation preferences, and submit a reservation through a dynamic booking form.
- **Offer Filtering**: Options to filter travel packages by different criteria such as destination, price, or dates.
- **Easy Navigation**: Clear navigation between the homepage, travel offers, and booking form with URL handling.
- **Dynamic Content**: All travel offers are generated dynamically from predefined data, ensuring flexibility and scalability.
- **Weather Information**: Users can view real-time weather updates for the selected city, providing essential information for their travel plans.
- **Country Information**: Detailed information about the country associated with each offer, including flags and relevant facts.

## 🛠️ Technologies Used

- **HTML5**: Provides the structure of the web application.
- **CSS3**: Used for styling the interface and ensuring responsive design.
- **JavaScript (ES6)**: Implements the interactivity and handles dynamic content generation.
- **Vanilla JavaScript**: The app is developed using plain JavaScript, without relying on frameworks or libraries like React or Angular.

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/travel-agency-frontend.git
```

### 2. Navigate to the project folder:

```bash
cd travel-agency-frontend
```

### 3. Open the index.html file in your browser:

You can either double-click on the index.html file, or run the following command in your terminal:

```bash
open index.html
```

Now you can explore the application in your browser!

## 📁 Project Structure

```plaintext
my-app/
│
├── index.html          # Main HTML file
├── index.js            # Main JS file that handles dynamic functionality
├── style.css           # Main stylesheet for the app
├── static/             # Folder for storing static files
│   └── images/         # Folder for travel offer images
│   └── offers.js       # File that contains list of offers
└── README.md           # Project documentation
```

## 🔧 Functionality Overview

### 1.Search Offers:

- Users can input text in the search bar to look for offers by country, city, or hotel name. The results are filtered dynamically as users type.

### 2.Book an Offer:

- After selecting a trip, users can choose accommodation options and submit their booking. The form captures the user's preferences and displays a confirmation message.

### 3.Offer Display:

- Each travel offer is displayed as a separate card, which includes the destination, price, and hotel details. These cards are rendered dynamically from the data in the JavaScript file.

## 💡 Possible Future Improvements

- Update the "Last Minute Offers" section to showcase limited-time deals and attract users looking for quick travel options.
- Extend the project by adding responsive web design to ensure a better user experience across various devices and screen sizes.
- Add user authentication and allow users to save and track their bookings.
- Integrate with a backend API to fetch offers dynamically from a database.
- Expand the search functionality to include more filters like price range, travel date, or user ratings.

## 📜 License

This project is not specifically licensed under a well-known open-source license, as it does not utilize any external frameworks or libraries.

## 📷 Image Credits

Images used in this project are sourced from [Unsplash](https://unsplash.com/) and are licensed under the Unsplash License, which allows for free use for both commercial and non-commercial purposes without the need for permission or attribution (though attribution is appreciated).

Photographers:

- Photo by Sean Oulashin - [Unsplash Profile](https://unsplash.com/@oulashin)
- Photo by Chor Tsang - [Unsplash Profile](https://unsplash.com/fr/@chortsang)

## 🎨 Graphic Credits

Graphics used in this project are sourced from [ICONFINDER](https://www.iconfinder.com/) and are free for commercial use and do not require attribution.

Graphic Designers:

- Graphics by Sihan Liu - [ICONFINDER Profile](https://www.iconfinder.com/Neolau1119)

## 🌐 API

This project utilizes the following APIs to enhance the data provided:

1. **Open-Meteo API** - Provides weather data used to display current weather conditions for selected locations.

   - **License**: The weather data provided by [Open-Meteo](https://open-meteo.com/) is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/), allowing for free usage with attribution.

2. **REST Countries API** - Supplies country data, including offical country name, capital city, population, languages, continents, time zones, and currencies, displayed in the offer details section.
   - **License**: The REST Countries API is available under the [Mozilla Public License 2.0](https://gitlab.com/restcountries/restcountries/-/blob/master/LICENSE?ref_type=heads) (MPL 2.0), which allows for free use, modification, and distribution, provided that modifications to the source code are shared under the same license.

Please note that while this project itself is not licensed under a formal open-source license, the data provided by these APIs is used in accordance with their respective licenses.

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create an issue or submit a pull request.
