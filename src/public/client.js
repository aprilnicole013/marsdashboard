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
               <h2 id="opportunityBtn" onclick=onClick('Opportunity') class="container">Opportunity</h2>
            </section>
            <section>
                <h2 id="spiritBtn" onclick=onClick('Spirit') class="container">Spirit</h2>
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
    // document.getElementById("curiosityBtn").innerHTML = store.roverData[0].roverDetails.rover.landing_date
    document.getElementById("curiosityBtn").innerHTML = store[roverName].rover.landing_date
    // let img = document.createElement("img");
    // img.src = store.roverName.roverDetails.img_src;
    // var src = document.getElementById("curiosityBtn");
    // src.appendChild(img);

    // console.log(store.roverData[0].roverDetails.rover.name
    // console.log(store.roverData[0].roverDetails.rover.landing_date)
    // console.log(store.roverData[0].roverDetails.rover.launch_date)
    // console.log(store.roverData[0].roverDetails.rover.status)
    // console.log(store.roverData[0].roverDetails.img_src)
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