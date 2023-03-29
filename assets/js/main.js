const form = document.querySelector("form");
const input = form.querySelector('#pokemon');
const pokemon = document.querySelector('.pokemon');
const container = document.querySelector(".container")
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(!input.value.trim()) return;
  Pokemon.init(input.value.toLowerCase());
})

class Pokemon {
  static init(name) {
    Pokemon.findPokemon(name);
  }
  static async findPokemon(name) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      if(response.status !== 200) throw new Error('Not Found Pokemon');
      return response.json();
    })
    .then(json => Pokemon.createElement(json))
    .catch(e => Pokemon.createError(e));
      
  } 

  static createError(error) {
    pokemon.innerHTML = "";
    const div = document.createElement('div');
    const p = document.createElement('p');
    div.setAttribute('class', 'error-text');
    p.innerText = error;
    div.appendChild(p);
    pokemon.appendChild(div);
  }

  static createElement(json) {
    pokemon.innerHTML = "";
    // Elements
    const descriptor = document.createElement('div');
    const imagePokemon = document.createElement('div');
    const img = document.createElement('img');
    const statsPokemon = document.createElement('div');
    const namePokemon = document.createElement('p');
    const typePokemon = document.createElement("div");
    const abilitiesPokemon = document.createElement('div');
    
    // Add Classs
    descriptor.setAttribute('class', 'descriptor');
    imagePokemon.setAttribute('class', 'image-pokemon');
    imagePokemon.innerHTML = `<p class="id">ID: ${json.id}</p>`
    img.setAttribute('src', json.sprites.front_default);

    imagePokemon.append(img);
    statsPokemon.setAttribute('class', 'stats')
    namePokemon.setAttribute("class", 'name-pokemon');
    typePokemon.setAttribute("class", 'types');
    abilitiesPokemon.setAttribute("class", 'abilities');
    descriptor.append(imagePokemon, statsPokemon);
    const elementArray = [descriptor, namePokemon, typePokemon, abilitiesPokemon];

    Pokemon.loadElements(elementArray, json);
  }

  static loadElements(elements, json) {
    const {forms, abilities, stats, types, id} = json;    
    
    elements[1].innerText = "Name: " + forms[0].name;
    elements[2].innerHTML = `<p>Type:</p>`;
    for(let ty of types) {
      const span = document.createElement('span');
      span.setAttribute('class', ty.type.name);
      span.innerText = ty.type.name;
      elements[2].append(span);
    }
    
    elements[0].querySelector('.stats').innerText = "Stats: \n"
    for(let stat of stats) {
      const span = document.createElement('span');
      span.innerText = `${stat.stat.name}: ${stat.base_stat}\n`
      elements[0].querySelector(".stats").append(span);
    }

    elements[3].innerHTML = `<p>Abilities: </p> `
    for(let skill of abilities) {
      const span = document.createElement('span');
      span.innerText = skill.ability.name + " " 
      elements[3].append(span);
    }

    for(let element of elements) {
      pokemon.append(element);
    }
  }
}