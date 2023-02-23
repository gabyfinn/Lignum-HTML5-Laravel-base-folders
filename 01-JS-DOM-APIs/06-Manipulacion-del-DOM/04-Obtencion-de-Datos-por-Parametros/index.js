const API_JOKE_CHUCK = "https://api.chucknorris.io/jokes/random";
const API_JOKE = 'http://api.icndb.com/jokes/random'
const API_GITHUB = 'https://api.github.com/search/repositories';

var repos = [];
function fadeIn() {
  let element = document.getElementById('hide');
  element.style.transition = "opacity 5s linear 2s";
  element.style.opacity = 1;
  // element.style.transition = "opacity 5s linear 2s";

  // element.style.transitionDelay = '2s';
  // element.style.opacity = 1;
}

function click4(msg) {
  console.log(msg)
  console.log("Realice un click");
  alert("hiciste click en el boton");
}



// function reqListener(event) {
//   console.log("La transferencia se a completado.");
//   console.log(event);
//   console.log(this.responseText);
//   console.log(this.responseText.value);
// }

// function updateProgress(oEvent) {
//   if (oEvent.lengthComputable) {
//     var percentComplete = oEvent.loaded / oEvent.total * 100;
//     console.log(percentComplete)
//   }
// }

// function transferFailed() {

// }

// function transferCanceled() {

// }

async function chuckApiCall() {
  // let conf = { method: "GET", url: "https://api.chucknorris.io/jokes/random" }
  try {

    let conf = { method: "GET", url: "http://api.icndb.com/jokes/random" }
    const response = await ajaxCall(conf);
    let element = document.getElementById('hide');
    element.innerHTML = response.value;
  }
  catch (error) {
    let element = document.getElementById('hide');
    element.style.backgroundColor = 'red';
    alert('Error al obtener los datos')
    console.log(error)
  }

}

async function githubRepos() {
  try {
    let conf = { method: "GET", url: API_GITHUB + "?q=javascript" }
    const response = await ajaxCall(conf);
    console.log(response)
    repos = response.items
    reenderUl(repos)
  } catch (error) {
    alert('Error al obtener los datos')
    console.log(error)
  }
}

// fetch('https://api.chucknorris.io/jokes/random')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// console.log(oReq.responseText);


// Crear una función reutilizable para realizar llamadas AJAX. Esta función debe aceptar un objeto de configuración y devolver una promesa ES6.

async function ajaxCall(conf) {
  // oReq.addEventListener("progress", updateProgress);
  // oReq.addEventListener("load", reqListener);
  // oReq.addEventListener("error", transferFailed);
  // oReq.addEventListener("abort", transferCanceled);
  return new Promise(function (resolve, reject) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open(conf.method, conf.url);
    let response;
    httpRequest.onload = (e) => {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          console.log(httpRequest.responseText);
          response = JSON.parse(httpRequest.responseText);
          // console.log(`La respuesta es ${response.value}`);
          resolve(response);
        }
        else {
          console.log(httpRequest.statusText)
          console.log(httpRequest.responseText)
          reject({
            status: this.status,
            statusText: httpRequest.statusText
          })
        }
      }
    };
    httpRequest.onerror = (e) => {
      console.log(httpRequest.responseText)
      reject({
        status: this.status,
        statusText: httpRequest.statusText
      })
    }
    httpRequest.send(null);
  }
  )

}

function reenderUl(items) {
  let aside = document.getElementById('sidebar');
  let ul = document.getElementById('repos');
  if (ul) {
    ul.innerHTML = '';
  } else {
    ul = document.createElement('ul');
    ul.setAttribute('id', 'repos')
    aside.appendChild(ul);
  }
  // let ul = document.createElement('ul');
  items?.map((repo) => {
    let li = document.createElement('li');
    li.innerHTML = repo.full_name;
    ul.appendChild(li)
  })
}

const handleChange = (e) => {
  if (repos.length !== 0) {
    let exp = new RegExp(e.toLowerCase());
    let filterRepos = repos?.filter(e => exp.test(e.full_name.toLowerCase()))
    console.log("imprimiendo el repo filtrado")
    console.log(filterRepos)
    filterRepos.length !== 0 ? reenderUl(filterRepos) : alert("No existe el repo buscado");
  } else {
    alert("No hay repos para filtrar")
  }
}