# Weather API Cypress Tests

## Overview

This project contains Cypress tests for the [Open-Meteo Weather API](https://api.open-meteo.com/v1/forecast). This is just for practice and demonstrates how API tests can be set up for regression automation or similar purposes. These tests ensure that the API correctly handles various input scenarios, including differing latitude/longitude combinations, as well as HTTP method errors.

### Add a `cities.json` File

Place a `cities.json` file in the `/fixtures` folder with the following format:

```json
[
   { "latitude": 34.0522, "longitude": -118.2437 }, // Example city (Los Angeles)
   { "latitude": 40.7128, "longitude": -74.0060 }  // Example city (New York)
]
```

## Tests

### Fetching Weather Data for Cities

Tests getting weather data for multiple cities from the `cities.json` fixture. Verifies that:

- The API responds with status code `200`.
- Latitude and longitude match the input values.
- The `hourly` data structure and `temperature_2m` are present.

### Fetching Weather Data for Los Angeles

Tests getting weather data for downtown Los Angeles using valid latitude and longitude values. Verifies:

- Status code `200`.
- Correct latitude, longitude, and timezone.
- Presence of hourly temperature data.

### Invalid Input Scenarios

Includes tests for incorrect or incomplete input:

- **Missing longitude**: Ensures the API returns a `400` status and a descriptive error message.
- **Out-of-range latitude**: Verifies the API handles latitude >90 or < -90 correctly.
- **Out-of-range longitude**: Validates behavior for longitude >180 or < -180.

### Invalid HTTP Methods

Tests the API's response to unsupported HTTP methods:

- **POST**: Ensures status `415` and a relevant error message.
- **DELETE**: Confirms status `404` and a "Not Found" error message.

## Usage

### Running Tests

1. Open the Cypress Test Runner:
   
   ```bash
   npx cypress open
   ```

2. Select the `weatherApi.spec.js` file to run the tests interactively.

3. Alternatively, run the tests headlessly:
   
   ```bash
   npx cypress run
   ```

### Customize Tests

- Add a `cities.json` file in the `/fixtures` folder with the following format:

  ```json
  [
     { "latitude": 34.0522, "longitude": -118.2437 }, // Example city (Los Angeles)
     { "latitude": 40.7128, "longitude": -74.0060 }  // Example city (New York)
  ]
  ```

- Update test assertions based on changes to the `cities.json` file.

## Test Results

Test logs and API responses will be visible in the Cypress Test Runner or the terminal output.

