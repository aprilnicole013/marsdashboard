let store = {
    user: { name: "Student" },
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
}

const root = document.getElementById('root')

const updateStore = (roverName, roverData) => {
    newState = {};
    newState[roverName] = roverData;
    store = Object.assign(store, newState);
    render(root, store);
}

const render = async(root, state) => {
    root.innerHTML = App(state)
}

const App = (state) => {
    return `
    <div id="marsintro"></div>
    <h1>Mars Rover Dashboard</h1>

    <div>
        <p>Home to both the Solar System's highest mountain <i>(Olympus Mons)</i>, and deepest canyon <i>(Valles Marineris)</i>, Mars is the also the planet most likely to support life outside of Earth; seasonal methane plumes observed over several decades
            have yet to be explained.</p>
    </div>
    <div>
        <p>Click below to see the latest image collected from NASA Mars rovers.</p>
    </div>
        <header></header>
        <main id="rover-info">
            <section id="buttons">
                <button id="curiosityBtn" onclick="onClick('Curiosity')" class="container">
                    <h2>Curiosity</h2>
                </button>
                <button id="opportunityBtn" onclick="onClick('Opportunity')" class="container">
                    <h2>Opportunity</h2>
                </button>
                <button id="spiritBtn" onclick="onClick('Spirit')" class="container">
                    <h2>Spirit</h2>
                </button>
            </section>
        </main>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

//Click rover buttons
function onClick(roverName) {
    document.getElementById("rover-info").innerHTML = `
    <div class="card">
        <button onClick="window.location.reload();">Refresh Page</button>
        <h2>Rover: ${store[roverName].rover.name}</h2>
        <p>Landing Date: ${store[roverName].rover.landing_date}</p>
        <p>Launch Date: ${store[roverName].rover.launch_date}</p>
        <p>Rover Status: ${store[roverName].rover.status} </p>
        <p>${getRoverFact(roverName)}</p>
        <p>Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>
    `
}

//IF Statement to display a fact
const roverFact = {
    Spirit: "This rover has an instrument called ChemCam which will fire a laser at Martian rocks from up to 30 feet (9 meters) away and analyze the composition of the vaporized bits. This enables Curiosity to study rocks out of reach of its flexible robotic arm and helps the mission team determine whether or not they want to send the rover over to investigate a particular landform.",
    Curiosity: "This rover has an instrument called ChemCam which will fire a laser at Martian rocks from up to 30 feet (9 meters) away and analyze the composition of the vaporized bits. This enables Curiosity to study rocks out of reach of its flexible robotic arm and helps the mission team determine whether or not they want to send the rover over to investigate a particular landform.",
    Opportunity: "Opportunity also discovered small spheres of hematite nicknamed 'blueberries' that formed late from rising, acidic groundwater. Once Opportunity reached the rim of Endeavour crater, the rover found white veins of the mineral gypsum - a telltale sign of water that traveled through underground fractures."
}

const roverFactObj = {}

store.rovers.map((rover) => {
    roverFactObj[rover] = roverFact[rover]
})

const getRoverFact = (roverName) => {
    return roverFactObj[roverName]
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