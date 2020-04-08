console.log("Hello logs");
var map;
window.onload = () => {
   // displayStoresData();
};

function initMap() {
    var montreal = {
        lat: 45.516136,
        lng: -73.656830
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: montreal,
        zoom: 11,
        mapTypeId: 'roadmap'
    });
    let mtlOlympicStadium = {
        lat: 45.558941,
        lng: -73.551468
    };
  //  console.log(stores);
    displayStoresData();
    infoWindow = new google.maps.InfoWindow();
    createMarker(mtlOlympicStadium, "Olympic Stadium", " 4141 Pierre-de Coubertin Ave, Montreal, QC,CA")
}

/*display stores-data.js*/
function displayStoresData() {
    stores.map(function (store, index) {
        console.log(store);
    })
}


/*markers*/
var markers = [];
var infoWindow;

function createMarker(latLng, name, address) {
    /*  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: { lat: parseFloat(lat), lng: parseFloat(lng) },
          mapTypeId: 'terrain',
          disableDefaultUI: true
      });*/
    let html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: latLng
    });
    infowindow = new google.maps.InfoWindow({
        content: html,
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    //markers.push(marker);
    marker.setMap(map);

}
