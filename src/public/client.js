let store = {
    user: {
        name: "Student"
    },
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roverFactObj: {}
}

const roverNames = store.rovers

const roverFacts = {
    Spirit: "This little 6-wheeled rover far outlasted its planned 90-day mission before becoming stuck in soft sand. Despite extensive efforts to release the rover, the last communications with Spirit were received over 6 years after it landed!",
    Curiosity: "This rover has an instrument called ChemCam which will fire a laser at Martian rocks from up to 30 feet (9 meters) away and analyze the composition of the vaporized bits. This enables Curiosity to study rocks out of reach of its flexible robotic arm and helps the mission team determine whether or not they want to send the rover over to investigate a particular landform.",
    Opportunity: "Opportunity also discovered small spheres of hematite nicknamed 'blueberries' that formed late from rising, acidic groundwater. Once Opportunity reached the rim of Endeavour crater, the rover found white veins of the mineral gypsum - a telltale sign of water that traveled through underground fractures."
}

roverNames.map((rover) => {
    store.roverFactObj[rover] = roverFacts[rover]
})

const root = document.getElementById('root')

const updateStore = (roverName, roverData) => {
    newState = {};
    newState[roverName] = roverData;
    store = Object.assign(store, newState);
    render(root, store);
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

function displayButtons() {
    return `
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
    `
}

const App = (state) => {
    return `
    <div id="marsintro"></div>
    <h1>Mars Rover Dashboard</h1>
    <div>
        ${Greeting(store.user.name)}
        <p>Home to both the Solar System's highest mountain <i>(Olympus Mons)</i>, and deepest canyon <i>(Valles Marineris)</i>, Mars is the also the planet most likely to support life outside of Earth; seasonal methane plumes observed over several decades
            have yet to be explained.</p>
    </div>
    <div>
        <p>Click below to see the latest image collected from NASA Mars rovers.</p>
    </div>
        <main id="rover-info">
            ${displayButtons()}
        </main>
    `
}

window.addEventListener('load', () => {
    render(root, store)
})

function onClick(roverName) {
    document.getElementById("rover-info").innerHTML = `
    <div class="card">
        <button onClick="window.location.reload();">Refresh Page</button>
        <h2>Rover: ${store[roverName].rover.name}</h2>
        <p><b>Landing Date:</b> ${store[roverName].rover.landing_date}</p>
        <p><b>Launch Date:</b> ${store[roverName].rover.launch_date}</p>
        <p><b>Rover Status:</b> <span class="status">${store[roverName].rover.status}</span></p>
        <p><b>Fun Fact:</b> ${roverFact(roverName)}</p>
        <p><b>Latest Photo:</b> </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>
    `
}

const Greeting = (name) => {
    let hour = new Date().getHours()
    if (hour >= 12 || hour >= 17) {
        return `
        <h2>Good evening from Mars, ${name}!</h2>
        `
    } else if (hour >= 1 || hour <= 12) {
        return `
        <h2>Good morning from Mars, ${name}!</h2>
        `
    } else {
        return `
        <h2>Good night from Mars, ${name}!</h2>
        `
    }
}

const getRoverFact = (roverName) => {
    return store.roverFactObj[roverName]
}

const roverFact = (roverName) => {
    return getRoverFact(roverName)
}

roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data => {
            updateStore(
                roverName, data.roverPhotos.latest_photos[0]
            )
        })
})