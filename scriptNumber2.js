async function fetchElToque() {
  const url3 = "https://currency-backend.netlify.app/.netlify/functions/toque";

  try {
    const response = await fetch(url3);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parses the JSON response into native JavaScript objects
    console.log("fetchedData", data.tasas);

    // console.log("losers", data.top_losers);
    // console.log("most active", data.most_actively_traded);
    return data;
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
}
fetchElToque();
