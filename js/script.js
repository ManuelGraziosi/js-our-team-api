// Dato un array di oggetti rappresentante un team di un’azienda, creare una pagina dedicata  in cui mostrare una card per ciascun componente.

// Per recuperare i dati utilizza la seguente API:

// https://boolean-teachers.github.io/mock/api/members/

// recupero la maniglia dell'elemento che mi forma la griglia
const gridRowElem = document.getElementById("members-grid");

// recupero dei dati dalla API
axios.get("https://boolean-teachers.github.io/mock/api/members/")
    .then((resp) => {
        console.log(resp.data);
        const teamMembers = resp.data;
        let teamMembersHtmlGrid = "";
        for (let i = 0; i < teamMembers.length; i++) {
            const curMember = teamMembers[i];
            const { name, role, email, img } = curMember;
            teamMembersHtmlGrid += `
          <div class="col-12 col-md-6 col-lg-4">
              <div class="card mb-3">
                  <img src="${img}"
                        class="card-img-top"
                        alt="${name}">
                  <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${role}</p>
                      <a href="mailto:${email}"
                          class="card-text"><small class="text-muted">${email}</small></a>
                  </div>
              </div>
          </div>
          `;
        }
        gridRowElem.innerHTML = teamMembersHtmlGrid;
    })

