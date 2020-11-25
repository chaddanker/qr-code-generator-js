var userLocation = '';

function run() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=> {
            // Create the Mapbox
            mapboxgl.accessToken = keys.mbkey;
            let map = new mapboxgl.Map({
                container: "map", // container id
                center: [ position.coords.longitude, position.coords.latitude], // starting position [lng, lat] 
                zoom: 15, // starting zoom
                style: 'mapbox://styles/mapbox/satellite-streets-v10'
              });
            var geocoder = new MapboxGeocoder({
            accessToken: keys.mbkey,
            mapboxgl: mapboxgl
            });
            
            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

            map.addControl(new mapboxgl.NavigationControl());



        map.on('mousedown', function (e) {
        // e.lngLat is the longitude, latitude geographical position of the event;
            console.log(e.lngLat);
          // create a HTML element for each feature
          if(document.querySelector('.marker')) {
            document.querySelector('.marker').parentNode.removeChild(document.querySelector('.marker'));
          }
            var el = document.createElement('div');
            el.className = 'marker';
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
                .setLngLat(e.lngLat)
                .addTo(map);
            userLocation = e.lngLat;
            // newUser(e.lngLat);
        });
        });
      }
    }

    async function nextClick() {
      await newUser(userLocation);
      window.location.href = "done.html";
    }

   async function newUser(location) {
            const cell = sessionStorage.getItem("cell"); 
            const username = sessionStorage.getItem("username");
            const name = sessionStorage.getItem("name");
      const newUser = `
        mutation newuser {
          insert_user(objects: {
            cell: "${cell}", 
            location: "${location}", 
            username: "${username}",
            name: "${name}"
          }) {
            returning {
              id
            }
          }
        }
      `;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: newUser
      })
    };

    await fetch(`https://find-me-api.herokuapp.com/v1/graphql`, options)
    .then(res => console.log(res.json()));
  }


  run();

