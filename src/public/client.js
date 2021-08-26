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
            <section>
            <h2 id="curiosityBtn" onclick="onClick('Curiosity')" class="container">Curiosity</h2>
            </section>
            <section>
               <h2 id="opportunityBtn" onclick="onClick('Opportunity')" class="container">Opportunity</h2>
            </section>
            <section>
                <h2 id="spiritBtn" onclick="onClick('Spirit')" class="container">Spirit</h2>
            </section>
        </div>
        </main>
        <footer></footer>
         `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

//Open Rover info on click event listener 

function onClick(roverName) {

    document.getElementById("curiosityBtn").innerHTML = `
    <div class="card">
        <h2>Rover Name: ${store[roverName].rover.name}</h2>
        <p>Landing Date: ${store[roverName].rover.landing_date}</p>
        <p>Launch Date: ${store[roverName].rover.launch_date}</p>
        <p>Rover Status: ${store[roverName].rover.status}</p>
        <p>Latest Photo: </p><img src="${store[roverName].img_src}" alt="Latest photo captured by ${roverName} rover"/>
        </p>
    </div>`
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