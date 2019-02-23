'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbnlhbmNob3ciLCJhIjoiY2pzZ2J1MHd5MXE5ajQ0b2FwOThzdHR5MyJ9.k2PnYrBfOQrE_yYRnIzdMg'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',  
    center: [-73.96216,40.80779],
    zoom: 16,
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'imperial'
})

map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {


    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.96007,40.80871])
marker.addTo(map)

let popup = new mapboxgl.Popup()
popup.setHTML('This is the Center for Spatial Research<br /><img src="https://currystonefoundation.org/wp-content/uploads/2018/05/csf_pr_csr_image5.jpg" />')
marker.setPopup(popup)

let data = [
    {
        location: [-73.96321679035432,40.80636479787793],
        content: 'This is where I constantly do reading'
    },
    {
        location: [-73.9609530059457,40.808947192891935],
        content: 'This is where I usually have lunch'
    },
    {
        location: [-73.96106029430784,40.80820821590521],
        content: 'This is my studio'
    }, 
	{
        location: [-73.96166483709786,40.8094339213105],
        content: 'The gym - Dodge Fitness Center'
    },
    ]

	data.forEach(function(d) {

	    let marker = new mapboxgl.Marker()    
	    marker.setLngLat(d.location)
	    marker.addTo(map)  

	    let popup = new mapboxgl.Popup()
	    popup.setHTML(d.content)
	    marker.setPopup(popup)

	})
	