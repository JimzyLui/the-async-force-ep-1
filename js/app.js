const d = document;

const request = (url, callback) => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function(data) {
    const resData = JSON.parse(data.target.responseText);
    callback(resData);
  });
  oReq.open("GET", url);
  oReq.send();
};

request("https://swapi.co/api/people/4", function(data) {
  console.log("data", data);
  // DOM MANIPULATING CODE HERE
  // Name
  d.getElementById("person4Name").innerHTML = data.name;

  // Homeworld
  request(data.homeworld, function(homeWorldData) {
    console.log("homeworlddata", homeWorldData);
    d.getElementById("person4HomeWorld").innerHTML = homeWorldData.name;
  });

  data.films.forEach(function(url) {
    request(url, function(data) {
      console.log("inner Data", data);
      // OTHER DOM MANIPULATING CODE
      const ulFilmList = d.getElementById("filmList");
      const liFilm = d.createElement("li");
      liFilm.classList.add("film");
      const h2FilmTitle = d.createElement("h2");
      h2FilmTitle.classList.add("filmTitle");

      const h3Planets = d.createElement("h3");
      h3Planets.classList.add("filmPlanets");

      const h4PlanetName = d.createElement("h4");
      h4PlanetName.classList.add("planetName");
    });
  });
});

request("https://swapi.co/api/people/14", function(data) {
  console.log("data", data);
  // DOM MANIPULATING CODE HERE
  // Name
  d.getElementById("person14Name").innerHTML = data.name;

  // Species
  request(data.species, function(dataSpecies) {
    console.log("dataSpecies", dataSpecies);
    d.getElementById("person14Species").innerHTML = dataSpecies.name;
  });

  const ulFilmList = d.getElementById("filmList");
  data.films.forEach(function(url) {
    request(url, function(dataFilm) {
      console.log("-->dataFilm", dataFilm);
      // OTHER DOM MANIPULATING CODE
      const liFilm = d.createElement("li");
      liFilm.classList.add("film");
      const h2FilmTitle = d.createElement("h2");
      h2FilmTitle.classList.add("filmTitle");
      h2FilmTitle.innerHTML = dataFilm.title;

      const h3Planets = d.createElement("h3");
      const ulPlanet = d.createElement("ul");
      ulPlanet.classList.add("filmPlanets");

      dataFilm.planets.forEach(function(url) {
        request(url, function(dataPlanet) {
          const h4PlanetName = d.createElement("h4");
          h4PlanetName.classList.add("planetName");
          h4PlanetName.innerHTML = dataPlanet.name;
          ulPlanet.appendChild(h4PlanetName);
        });
      });

      h2FilmTitle.appendChild(ulPlanet);
      liFilm.appendChild(h2FilmTitle);
      ulFilmList.appendChild(liFilm);
    });
  });
});

/*
const getXhrVal = (id, url) => {
  const objXHR = new XMLHttpRequest();
  objXHR.addEventListener("load", function() {
    console.log(this.responseText);

    const obj = JSON.parse(this.responseText);
    const element = d.getElementById(id);
    if (element) {
      console.log(obj.name);
      element.innerHTML = obj.name;
    }

    if (id.includes("Name") && obj.name) {
      const nameId = id + "Name";
      console.log("nameId", nameId);
      d.getElementById(nameId).innerHTML = obj.name;
    }
    if (id.includes("Name") && obj.homeworld) {
      const homeworldId = id + "HomeWorld";
      console.log("homeworldId", homeworldId);
      getXhrVal(homeworldId, obj.homeworld);
    }
    if (obj.species) {
      const speciesId = id.replace("Name", "Species");
      console.log("speciesId", speciesId);
      getXhrVal(speciesId, obj.species);
    }
  });

  objXHR.open("GET", url);
  objXHR.send();
};

getXhrVal("person4", "https://swapi.co/api/people/4");
getXhrVal("person14", "https://swapi.co/api/people/14");
*/
