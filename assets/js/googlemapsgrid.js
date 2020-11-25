// Create the Google Map
let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -26.204115, lng: 28.047299},
    zoom: 12
});

var gridData;
      
// Add the what3words grid to the Google Map data layer once the desired zoom level is meet
map.addListener('bounds_changed', function() {
  const zoom = map.getZoom();
  const loadFeatures = zoom > 17;

  if (loadFeatures) { // Zoom level is high enough
    var ne = map.getBounds().getNorthEast();
    var sw = map.getBounds().getSouthWest();

    // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
    what3words.api
      .gridSectionGeoJson({
        southwest: {
          lat: sw.lat(), lng: sw.lng()
        },
        northeast: {
          lat: ne.lat(), lng: ne.lng()
        }
      }).then(function(data) {
        if (gridData !== undefined) {
          for (var i = 0; i < gridData.length; i++) {
              map.data.remove(gridData[i]);
          }
        }
        gridData = map.data.addGeoJson(data);
      }).catch(console.error);
  }

  // Set the grid display style
  map.data.setStyle({
    visible: loadFeatures,
    strokeColor: '#777',
    strokeWeight: 0.5,
  });
});