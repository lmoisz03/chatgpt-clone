async function lookupTime(location: string): Promise<string> {
  try {
    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${location}`
    );
    const data = await response.json();

    const datetime = new Date(data.datetime); // Convert the datetime string to a Date object

    const hours = datetime.getUTCHours(); // Get the UTC hours
    const minutes = datetime.getUTCMinutes(); // Get the UTC minutes

    // Format the time
    const dateTime = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date().setUTCHours(hours, minutes));

    const timeResponse = `The current time in ${location} is ${dateTime}.`;
    return timeResponse;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while looking up the time.");
  }
}

// interface temp {
//   "cloud_pct": string,
//   "temp": 28,
//   "feels_like": 32,
//   "humidity": 87,
//   "min_temp": 27,
//   "max_temp": 30,
//   "wind_speed": 3.03,
//   "wind_degrees": 319,
//   "sunrise": 1689764918,
//   "sunset": 1689810212
// }
async function lookupWeather(location: string): Promise<string> {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${location}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": String(process.env.RAPID_API_KEY),
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const weather = await response.json();
    const weatherResponse = `The current weather in ${location} is ${weather.temp}°C
    with ${weather.cloud_pct}% cloud cover and ${weather.humidity}% humidity
    and a wind speed of ${weather.wind_speed} km/h`;
    return weatherResponse;
  } catch (error) {
    console.error("Request failed:", error);
    throw new Error("An error occurred while looking up the weather.");
  }
}
export { lookupTime, lookupWeather };
