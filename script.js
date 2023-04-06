// requête api : https://randomuser.me/api/?nat=fr&results=50

let sortedData = [];
const displayResults = document.querySelector(".data-results")

async function getUsers() {
    try {
        const response = await fetch("https://randomuser.me/api/?nat=fr&results=50");

        const data = await response.json();

        createCard();

        let newArr = [];
        // SEARCH
        const inputSearch = document.querySelector("input")
        inputSearch.addEventListener("input", handleSearch)

        function handleSearch() {
            displayResults.textContent = ""
            newArr = [];
            const searchedString = inputSearch.value.toLowerCase().replace(/\s/g, "")

            data.results.forEach(el => {
                if (el.name.first.toLowerCase().includes(searchedString) || el.name.last.toLowerCase().includes(searchedString)){
                    newArr.push(el)
                }
            })

            newArr.forEach(el => {
                addNewCard(el.picture.thumbnail, el.name.last, el.name.first, el.email, el.phone)
            })

            if (inputSearch.value === "") {
                displayResults.textContent="";
                createCard();
            }
        }

        function createCard() {
            sortAlphabetically(data.results)

            data.results.forEach(el => {
                addNewCard(el.picture.thumbnail, el.name.last, el.name.first, el.email, el.phone)
            })
        }
    } catch (error) {
        console.log(error);
    }
}
getUsers();

function addNewCard(picture, lastname, firstname, email, phone) {
    const card = `
    <div class="card">
      <p><img src="${picture}" alt=""><span>${lastname} ${firstname}</span></p>
      <p>${email}</p>
      <p>${phone}</p>
    </div>
  `;
    displayResults.insertAdjacentHTML('beforeend', card);
}

function sortAlphabetically(arr) {
    return arr.sort((a, b) => a.name.last.localeCompare(b.name.last));
}