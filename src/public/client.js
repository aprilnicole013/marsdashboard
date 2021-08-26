let store = {
    user: { name: "Student" },
    rovers: ['Spirit', 'Opportunity', 'Curiosity'],
}

const root = document.getElementById('root')

const updateStore = (data) => {
    let roversFromStore = data

    newState = {
        user: { name: "Student" },
        roverData: [roversFromStore],
        rovers: ['Spirit', 'Opportunity', 'Curiosity'],
    }

    store = Object.assign(store, newState)
    render(root, store)
}
const render = async(root, state) => {
    root.innerHTML = App(state)
}

const App = (state) => {
    let { roverDetails } = state

    return `
        <header></header>
        <main>
        <div>
            <section>
            <h2 id="curiosityBtn" onclick="seeCuriosity()" class="container">Curiosity</h2>
            </section>
            <section>
               <h2 id="opportunityBtn" onclick="seeOpportunity()" class="container">Opportunity</h2>
            </section>
            <section>
                <h2 id="spiritBtn" onclick="seeSpirit()" class="container">Spirit</h2>
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
function seeCuriosity() {
    // document.getElementById("curiosityBtn").innerHTML = store.roverData[0].roverDetails.rover.landing_date

    let img = document.createElement("img");
    img.src = store.roverData[0].roverDetails.img_src;
    var src = document.getElementById("curiosityBtn");
    src.appendChild(img);

    // console.log(store.roverData[0].roverDetails.rover.name
    // console.log(store.roverData[0].roverDetails.rover.landing_date)
    // console.log(store.roverData[0].roverDetails.rover.launch_date)
    // console.log(store.roverData[0].roverDetails.rover.status)
    // console.log(store.roverData[0].roverDetails.img_src)
}

function seeOpportunity() {
    console.log(store.roverData[0].roverDetails.rover.name)
    console.log(store.roverData[0].roverDetails.rover.landing_date)
    console.log(store.roverData[0].roverDetails.rover.launch_date)
    console.log(store.roverData[0].roverDetails.rover.status)
    console.log(store.roverData[0].roverDetails.img_src)
}

function seeSpirit() {
    console.log(store.roverData[0].roverDetails.rover.name)
    console.log(store.roverData[0].roverDetails.rover.landing_date)
    console.log(store.roverData[0].roverDetails.rover.launch_date)
    console.log(store.roverData[0].roverDetails.rover.status)
    console.log(store.roverData[0].roverDetails.img_src)
}

//pulls a full list of all 3 rovers
roverNames = store.rovers

//Rover API call
roverNames.forEach((roverName) => {
    fetch(`http://localhost:3000/rovers/${roverName}/photos`)
        .then(res => res.json())
        .then(data => {
            updateStore({
                roverDetails: data.roverPhotos.latest_photos[0]
            })
        })
})