const API = "http://api.tvmaze.com/shows/17861/cast";
let SIZE_OF_PERSONA = 0;
const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error("Error ", url_api));
      }
    };
    xhttp.send();
  });
};

const getData = async (url_api) => {
  try {
    const name = await fetchData(url_api);
    SIZE_OF_PERSONA = name.length;

    for (let index = SIZE_OF_PERSONA - 1; index >= 0; index--) {
      try {
        createPerson(
          index,
          name[index].character.name,
          name[index].character.image.medium,
          name[index].person.name,
          name[index].person.image.medium
        );
      } catch (error) {
        createPerson(
          index,
          name[index].character.name,
          name[index].person.image.medium,
          name[index].person.name,
          name[index].person.image.medium
        );
      }
    }
  } catch (error) {
    console.error(error);
    alert(error);
  }
};

const createPerson = (person_ID, personaje, img_src, nombre, alter_img) => {
  done = false;
  let currentDiv = document.getElementsByClassName("personas")[0];

  let newPerson = document.createElement("div");
  newPerson.className = "persona";

  let nombre_personaje = document.createElement("h3");
  nombre_personaje.id = `personaje-${person_ID}`;
  nombre_personaje.textContent = personaje;

  newPerson.appendChild(nombre_personaje);

  let newImageContainer = document.createElement("div");
  newImageContainer.className = "img_container";

  let newImage = document.createElement("img");
  newImage.alt = "";
  newImage.src = img_src;

  newImage.addEventListener("mouseover", () => (newImage.src = alter_img));
  newImageContainer.appendChild(newImage);
  newPerson.appendChild(newImageContainer);

  let newName = document.createElement("h4");
  newName.id = `nombre-${person_ID}`;
  newName.textContent = nombre;
  newPerson.appendChild(newName);

  //currentDiv.appendChild(newPerson);
  currentDiv.insertAdjacentElement("afterbegin", newPerson);
};

getData(API);

//insertPersons(50);
