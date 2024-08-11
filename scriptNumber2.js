const countriesFrom2 = document.getElementById("countries-from-Select");
const countriesTo2 = document.getElementById("countries-to-Select");
const suggestions = document.getElementById("suggestions");

let elToqueFetchedData = [];
async function fetchElToque() {
  const url3 = "https://currency-backend.netlify.app/.netlify/functions/toque";

  try {
    const response = await fetch(url3);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      // const cupInputText = `<option value="CUP">
      //             Cuban Peso
      //             <span
      //               class="yellow-star"
      //               style="font-size: 24px; color: yellow"
      //               >&#9733;</span
      //             >
      //           </option>`;

      // const cupOptionText = `<option value="CUP">$</option>`;
      // countriesFrom2.prepend(cupInputText);
      // countriesTo2.prepend(cupInputText);
      // suggestions.prepend(cupOptionText);

      const data = await response.json();
      console.log("fetchedData", data.tasas);
      elToqueFetchedData = data.tasas;
      return data;
    }
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation: ",
      error
    );
  }
}
fetchElToque();
