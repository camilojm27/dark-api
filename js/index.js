const API = "https://api.tvmaze.com/shows/17861/cast";
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
  let currentDiv = document.getElementsByClassName("personas")[0]; //We seach the personas conainer in the DOM

  let newPerson = document.createElement("div"); //We create the container for each individual person
  newPerson.className = "persona"; //and asing the class

  let nombre_personaje = document.createElement("h3"); //this is the name of the character
  nombre_personaje.id = `personaje-${person_ID}`; //Put an ID
  nombre_personaje.textContent = personaje; //Insert the name

  newPerson.appendChild(nombre_personaje); //then append each name to the persona container

  let newImageContainer = document.createElement("div"); //Create an img container
  newImageContainer.className = "img_container"; //Add a class for css

  let newImage = document.createElement("img");
  newImage.alt = "";
  newImage.src = img_src; //create the image and asing his source

  newImage.addEventListener("mouseover", () => (newImage.src = alter_img)); //Adds the effect at hover
  newImageContainer.appendChild(newImage); //add the image to his container
  newPerson.appendChild(newImageContainer); //add the container to the person

  let newName = document.createElement("h4"); //this is the real name of the person
  newName.id = `nombre-${person_ID}`; //Asing and ID
  newName.textContent = nombre; //puts his name
  newPerson.appendChild(newName); //appends to his container

  //currentDiv.appendChild(newPerson);
  currentDiv.insertAdjacentElement("afterbegin", newPerson); //insert the object to the HTML Tree
};

getData(API);

//insertPersons(50);
