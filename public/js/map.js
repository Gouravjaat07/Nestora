const centerLocation = listing.location + ", " + listing.country;

let MAP_TOKEN= mapToken; // Map_Token
mapboxgl.accessToken = MAP_TOKEN;
const map = new mapboxgl.Map({ // Showing Map
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12", // street view
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 8 // starting zoom
});

// Adding Mapbox Marker
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${centerLocation}</h4><p>Exect location will be provided after booking</p>`)
        .setMaxWidth("300px")
    )
    .addTo(map);