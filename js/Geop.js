// initialize the map

var map = L.map('map').setView([9.11, 7.53], 6);


// Add OSM tile base map

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
//.addTo(map)

var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

//region layer style
var boundaryStyle = {
        color: "red",
        opacity: 0.4,
        weight: 1,
}

var marker = L.marker([9.11, 7.53], 6).addTo(map);

var statelayer = L.geoJson(boundary,{
        style:boundaryStyle,
        onEachFeature:function(feature, layer) {

                label = `Name: ${feature.properties.statename}<br>`
                label+= `Area: ${feature.properties.SHAPE_Area.toFixed(5)}<br>`
                layer.bindPopup(label)
        }



}).addTo(map)

// adding Police station layer
var policelayer = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
        layers: 'geospatial:Police_Stations',
        format: 'image/png',
        transparent: true,
        attribution: ""
}).addTo(map)

// ADDING MosqueWMS LAYER

var Mosquelayer = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Mosques',
    format: 'image/png',
    transparent: true,
    attribution: ""
}).addTo(map)

// adding Health facilities layer
var Healthlayer = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Nigeria_-_Schools',
    format: 'image/png',
    transparent: true,
    attribution: ""
}).addTo(map)

// basemaps

 baseLayers = {
    "OpenStreetMap": osm,
    "Google Street Map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};

//layers
var overlays = {
    "State Boundary": statelayer,
    "Health Facilities": Healthlayer,
    "Mosque": Mosquelayer,
    "Police Station": policelayer,
};
// Add layer control to the map
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);

// Add print control to the map

L.control.browserPrint({position: 'topleft'}).addTo(map);

// coordinates on mousemove

map.on('mousemove', function(e){
        $('#coordinate').html(`Lat: ${e.latlng.lat.toFixed(3)} , Lng: ${e.latlng.lng.toFixed(3)}`)
})


// Add scale to the base map

L.control.scale().addTo(map)