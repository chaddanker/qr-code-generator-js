  async function fetchUser(u) {
  const fetchUserQuery = `
    query finduser {
      user(where: {username: {_eq: "${u}"}}) {
        cell
        id
        location
        name
      }
    }
  `;

  const options = {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: fetchUserQuery
    })
  };

  await fetch(`https://find-me-api.herokuapp.com/v1/graphql`, options)
  .then(res => res.json())
  .then(res => run(res.data.user[0]));
}

var user = window.location.search.replace('?', '');
  
fetchUser(user);

async function run(user) {
  console.log(user);
        const location = user.location.replace('(', '').replace(')', '').replace('LngLat', '').split(',');
        const address = await getLocationAddress(location);
  
            // Create the Mapbox
        mapboxgl.accessToken = keys.mbkey;
        let map = new mapboxgl.Map({
            container: "map-user", // container id
            style: "mapbox://styles/mapbox/satellite-streets-v10", // stylesheet location
            center: location, // starting position [lng, lat] 
            zoom: 17, // starting zoom
            });
        map.addControl(new mapboxgl.NavigationControl());


        var el = document.createElement('a');
        el.className = 'marker-user';

        new mapboxgl.Marker(el)
            .setLngLat(location)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popup
            .setHTML(`
              <h3>${user.name}</h3>
              <p>${user.cell}</p>
              <p> ${address} </p>
              <div><a class="ui button blue" href="http://maps.google.com/?q=${location[1]},${location[0]}">open in maps</a></div>
            `))
            .addTo(map);

      if(user.cell) {

        addWAButton();

        document.querySelector('#phone').href = `tel:${user.cell}`;
    }
};

async function getLocationAddress(loc) {
  let address = '';
   await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json?access_token=pk.eyJ1IjoiY2hhZGRhbmtlciIsImEiOiJjazcxc2E1bnIwMmE0M21ud2oxOTdhNTlvIn0.vPS-2MWv9PRKcuRmmJG13w`)
  .then(res => res.json())
  .then(res => {
    address = res.features[0].place_name;
  });

  console.log(address);
  return address;
}

function addWAButton() {
  $('#WAButton').floatingWhatsApp({
    phone: user.cell, //WhatsApp Business phone number International format-
    //Get it with Toky at https://toky.co/en/features/whatsapp.
    headerTitle: 'Chat with us on WhatsApp!', //Popup Title
    popupMessage: 'Hello, how can we help you?', //Popup Message
    showPopup: false, //Enables popup display
    buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
    //headerColor: 'crimson', //Custom header color
    //backgroundColor: 'crimson', //Custom background button color
    position: "left"    
  });
}

run();

