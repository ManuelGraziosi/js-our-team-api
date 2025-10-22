/**
 * recuperare i tag delle ricette e poi far comparire le card solo 
 * dei tag selezionati
 * 
 *  */

const mainElem = document.getElementById("main");
const selectElem = document.getElementById("tagsList");
const gridElem = document.getElementById("grid");
const formElem = document.getElementById("form");

axios.get("https://dummyjson.com/recipes/tags")
  .then((resp) => {
    //recupero dell'array dei tag dal srv
    const tagsArray = resp.data;
    let tagsRecipeHtmlSelectList = "";
    tagsArray.forEach(curTag => {
      return tagsRecipeHtmlSelectList += `<option value="${curTag}">${curTag}</option>`;
    });
    selectElem.innerHTML = tagsRecipeHtmlSelectList;
  })


/**
 * 
*/
function getRecipeByTagGrid(selectedTag) {
  axios.get(`https://dummyjson.com/recipes/tag/${selectedTag}`).then((resp) => {
    const recipes = resp.data.recipes;
    console.log("[DEBUG] recipes", recipes);
    let cards = "";
    recipes.forEach((curRecipe) => {
      cards += getSingleCard(curRecipe);
    });
    gridElem.innerHTML = cards;
  });
}

/**
 * descrizione: generazione della singola card in html formattata secondo le richieste
 * @param {*} param0 
 * @returns 
 */
function getSingleCard({ image, name, tags, instructions }) {
  let tagsHtml = "";

  tags.forEach((curTag) => {
    tagsHtml += `<span class="badge rounded-pill text-bg-warning">${curTag}</span>`;
  });

  return `
      <div class="col-3">
        <div class="card">
          <img
          max-height=200px
            src="${image}"
            class="card-img-top"
            alt="Immagine di ${name}"
          />
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <div class="mb-2">
              ${tagsHtml}
              <p>${instructions[0].slice(0, 30)} ...</p>
            </div>
          </div>
        </div> 
      </div>
    `;
}

/**
 * Aggiunta dell'evento submit al form per generare la griglia in base al tag scelto
 */
formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  const tagSelected = selectElem.value;

  getRecipeByTagGrid(tagSelected);

})