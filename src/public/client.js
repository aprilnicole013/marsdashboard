
let store = {
    user: { name: "Student" },
    rovers: ['Spirit', 'Opportunity', 'Curiosity'],
}

const root = document.getElementById('root')

const updateStore = (roverName, roverData) => {
    newState = {};
    newState[roverName] = roverData;
    store = Object.assign(store, newState);
    render(root, store);
}
console.log(store)

const render = async(root, state) => {
    root.innerHTML = App(state)
}

const App = (state) => {
    return `
        <header></header>
        <main>
        <div>
            <button>
            <h2 id="curiosityBtn" onclick="onClick('Curiosity')" class="container">Curiosity</h2>
            <img src="https://hips.hearstapps.com/pop.h-cdn.co/assets/15/32/980x490/landscape-1438787673-curiosity-web.jpg?resize=980:*" class="img-fluid"alt="curiosity rover"/>
            </button>
            <button>
               <h2 id="opportunityBtn" onclick="onClick('Opportunity')" class="container">Opportunity</h2>
               <img src="https://cdn.britannica.com/s:690x388,c:crop/93/93293-050-92D12F74/Artist-conception-Mars-Exploration-Rover.jpg" class="img-fluid"alt="opportunity rover"/>
               </button>
            <button>
                <h2 id="spiritBtn" onclick="onClick('Spirit')" class="container">Spirit</h2>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/NASA_Mars_Rover.jpg/1920px-NASA_Mars_Rover.jpg" class="img-fluid"alt="opportunity rover"/>
                </button>
        </div>
        </main>
        <footer></footer>
         `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

//Click rover buttons
function onClick(roverName) {
    document.getElementById("curiosityBtn").innerHTML = `
    <div class="card">
        <h2 class="card-title" style="color: black">Rover: ${store[roverName].rover.name}</h2>
        <p style="color: black">Landing Date: ${store[roverName].rover.landing_date}</p>
        <p style="color: black">Launch Date: ${store[roverName].rover.launch_date}</p>
        <p style="color: black">Rover Status: ${store[roverName].rover.status}</p>
        <p style="color: black">Fact: ${roverFact(roverName)}
        <p style="color: black">Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>
    `

    document.getElementById("opportunityBtn").innerHTML = `
    <div class="card">
        <h2 class="card-title" style="color: black">Rover: ${store[roverName].rover.name}</h2>
        <p style="color: black">Landing Date: ${store[roverName].rover.landing_date}</p>
        <p style="color: black">Launch Date: ${store[roverName].rover.launch_date}</p>
        <p style="color: black">Rover Status: ${store[roverName].rover.status}</p>
        <p style="color: black">Fact: ${roverFact(roverName)}
        <p style="color: black">Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>
    `

    document.getElementById("spiritBtn").innerHTML = `
    <div class="card">
        <h2 class="card-title" style="color: black">Rover: ${store[roverName].rover.name}</h2>
        <p style="color: black">Landing Date: ${store[roverName].rover.landing_date}</p>
        <p style="color: black">Launch Date: ${store[roverName].rover.launch_date}</p>
        <p style="color: black">Rover Status: ${store[roverName].rover.status}</p>
        <p style="color: black">${roverFact(roverName)}
        <p style="color: black"></p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>
    `
}

//IF Statement to display a fact
const roverFact = (roverName) => {
    if (store[roverName].rover.name == "Curiosity"){
       return `<p>Fact: Fun fact about Curiosity rover</p>`
    } else if (store[roverName].rover.name == "Opportunity"){
        return `<p>Fact: Fun fact about Opportunity rover</p>`
    } else if (store[roverName].rover.name == "Spirit"){
        return `<p>Fact: Fun fact about Spirit rover</p>`
    }
}

//pulls a full list of all 3 rovers
roverNames = store.rovers

//Rover API call
roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data => {
            updateStore(
                roverName, data.roverPhotos.latest_photos[0]
            )
        })
})