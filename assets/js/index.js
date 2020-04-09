console.log("Hello logs");
var map;
var markers = [];
let infoWindow;


function initMap() {
    var montreal = {
        lat: 34.063584,
        lng: -118.376354
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: montreal,
        zoom: 11,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });
    showStoreMarkers();
    let mtlOlympicStadium = {
        lat: 45.558941,
        lng: -73.551468
    };
    //  console.log(stores);
    displayStoresData();
    infoWindow = new google.maps.InfoWindow();
    let StoreNumberElement =document.getElementById("store-number");
    google.maps.event.addListener(StoreNumberElement, 'click', function() {
        infoWindow.open(map, clickedMarker);
        console.log("type of clickedMarker"+ clickedMarker );
    });
}

/*display stores-data.js*/
function displayStoresData() {
    let storesHTML = "";
    stores.map(function (store, index) {
        let address = store['addressLines'];
        let phoneNumber = store['phoneNumber'];
        storesHTML += `
            <div class="card  mb-1 store-container" onclick="openInfoWindow( ${index+1})">
                <div class="card-body" >
                    <blockquote class="blockquote mb-0 store-address">
                        <span>${address[0]}</span><br/>
                        <span>${address[1]}</span>
                        <footer class="text-muted store-phone-number">${phoneNumber}</footer>
                    </blockquote>
                    <div id="store-number-container" class="store-number-container d-flex flex-column align-items-center justify-content-end  ">
                        <div id="store-number">
                         ${index+1}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.querySelector('.store-list').innerHTML = storesHTML;
    })
}
showStoreMarkers = () => {
    var bounds = new google.maps.LatLngBounds();
    stores.map(function (store,index){
     let name= store['name'];
     let address = store['addressLines'][0];
     var latlng = new google.maps.LatLng(
         store['coordinates']['latitude'],
         store['coordinates']['longitude']);
    bounds.extend(latlng);
      createMarker(latlng,name, address, index)
    });
    map.fitBounds(bounds);
};
function createMarker(latlng, name, address,index) {
    let i = parseInt(index.toString());
    i= i+1
   // console.log("marker index "+ i + " typeof "+typeof(i));
    var html = "<strong>" + name + "</strong> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title:name,
        animation: google.maps.Animation.DROP,
        label:i.toString() ,
      //  selectedItem={this.state.selectedItem}
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}
const clickedMarker ={};
openInfoWindow = (index) => {


    for (var i = 0; i < markers.length; ++i) {
        if(markers[index].label == i){
            // clickedMarker=markers[i];
            infoWindow.open(map, markers[i]);
            console.log("clickIndex: "+ index + "matched with array no "+i +" map:"+ map+" maker:"+markers[i].map );

        }
    }


    //alert(markers[index].label +" type of "+typeof(clickedMarker));
    /*markers[i].setMap(null);
    */
   // clickedMarker.addListener('click', toggleBounce);
    //markers[index].toggleBounce();
    document.getElementById("store-number").click();

    //console.log("clickIndex: "+ clickIndex);
};

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


/*dark mode styles*/
/* styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
        */