var map;
var infowindow;
var service;
var markers = [];
var image ={
  cafe: "https://cdn2.iconfinder.com/data/icons/the-shine-of-small-things/128/shining_mix_barra-32.png",
  barra: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678063-beer-32.png",
  comida: "https://cdn2.iconfinder.com/data/icons/architecture-interior/24/architecture-interior-07-24.png",
  hospi: "https://cdn2.iconfinder.com/data/icons/architecture-interior/24/architecture-interior-07-24.png",
  gaso: "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/gas-32.png"
  }
// var GooglePlaces = require('../lib/google-places');
// var places = new GooglePlaces('AIzaSyAyp9_d_tD2zbKUPwA2qRhytXw2kQ4tiM8');

initMap = function() {
  var center = {lat: 18.466333, lng: -66.105721};
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 15,
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  });

  var lugares = {
    coffee: {
          location: center,
          radius: 5000,
          types: ['cafe']
    },
    bar: {
      location: center,
      radius: 5000,
      types: ['bar']
    },
    food: {
      location: center,
      radius: 5000,
      types: ['food']
    },
    gas: {
      location: center,
      radius: 5000,
      types: ['gas_station']
    },
    hosp: {
      location: center,
      radius: 5000,
      types: ['hospital']
    }
};



  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(lugares.bar, points);

  var infoWindow = new google.maps.InfoWindow({map: map});

  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    map.setCenter(pos);
  });

  map.addListener('center_changed', function() {
    lugares.bar.location = map.getCenter();
    service.nearbySearch(lugares.bar, points);
  });
}

points = function(results,status){
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(placesMarkers(results[i]));
    }
  }
}

// myPosMarker = function(position){
//     var marker = new google.maps.Marker({
//       map: map,
//       animation: google.maps.Animation.DROP,
//       icon: image,
//       position: position
//     });
//   };

  placesMarkers = function (place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
          map: map,
          position: placeLoc,
          animation: google.maps.Animation.DROP,
          icon: image.barra
          });
      infowindow = new google.maps.InfoWindow({map: map});
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
          });
      return marker;
  };
