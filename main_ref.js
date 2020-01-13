let somePlaces = [
    {
        name: 'Square Republique Montreuil',
        location: [48.853061, 2.424212],
        scale: 3,
    },
    {
        name: 'Joseph Home',
        location: [48.853178, 2.425162],
        scale: 3,
    },
    {
        name: 'Etienne Veranda',
        location: [48.860812, 2.373893],
        scale: 3,
    },
    {
        name: 'ENSAAMA DSACOM',
        location: [48.833733, 2.295264],
        scale: 3,
    },
    {
        name: 'ENSAAMA cour centrale',
        location: [48.833342, 2.295328],
        scale: 3,
    },
]



const renderPlaces = places => {

    let scene = document.querySelector('a-scene')

    for (let place of places) {

        let { name, location, scale } = place
        let [latitude, longitude] = location
        console.log(name)

        let model = document.createElement('a-entity')
        model.setAttribute('scale', `${scale} ${scale} ${scale}`)
        model.setAttribute('name', name)
        model.setAttribute('text', `value: ${name}`)
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`)
        model.setAttribute('gltf-model', './assets/BoxTextured.gltf')
        model.setAttribute('animation-mixer', '')
        scene.appendChild(model)

    }

}
