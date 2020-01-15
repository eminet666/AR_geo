// https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
let somePlaces = [
  {
    name: 'ENSAAMA DSACOM',
    location: [2.295264, 48.833733],
    scale: 3,
  },
  {
    name: 'ENSAAMA cour centrale',
    location: [2.295328, 48.833342],
    scale: 3,
  },
]

let etiennePlaces = [
  [2.295307, 48.833190],
  [2.295618, 48.833346],
  [2.295012, 48.833399],
  [2.295270, 48.833720],
  [2.295298, 48.833338],
]

function init() {

  // https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
  let url = [
    "https://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
    "https://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
    "https://c.tile.openstreetmap.org/${z}/${x}/${y}.png",
  ]

  map = new OpenLayers.Map("basicMap")
  let lonlat         = [2.295680, 48.833062]
  let mapnik         = new OpenLayers.Layer.OSM('lol', url)
  let fromProjection = new OpenLayers.Projection("EPSG:4326")   // Transform from WGS 1984
  let toProjection   = new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
  let position       = new OpenLayers.LonLat(...lonlat).transform( fromProjection, toProjection)
  let zoom           = 18

  map.addLayer(mapnik)
  map.setCenter(position, zoom )

  var markers = new OpenLayers.Layer.Markers( "Markers" )
  map.addLayer(markers)

  // for (let place of somePlaces) {
  //   let position = new OpenLayers.LonLat(...place.location).transform( fromProjection, toProjection)
  //   markers.addMarker(new OpenLayers.Marker(position))
  // }

  for (let place of etiennePlaces) {
    let position = new OpenLayers.LonLat(...place).transform( fromProjection, toProjection)
    markers.addMarker(new OpenLayers.Marker(position))
  }
follow();
}

function follow() {

  function success(pos) {
    let { longitude, latitude } = pos.coords

    // http://dev.openlayers.org/docs/files/OpenLayers/Marker-js.html
    let size = new OpenLayers.Size(21,25)
    let offset = new OpenLayers.Pixel(-(size.w/2), -size.h)
    let icon = new OpenLayers.Icon('img/marker-green.png', size, offset)

    let position = new OpenLayers.LonLat(longitude, latitude).transform( fromProjection, toProjection)
    markers.addMarker(new OpenLayers.Marker(position, icon))
  }

  function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message)
  }

  const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
  }

  const id = navigator.geolocation.watchPosition(success, error, options)

}

init()
