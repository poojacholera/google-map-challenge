console.log("Hello logs");
var map;
var markers = [];
let infoWindow;
window.onload = ()  =>{

};

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

    infoWindow = new google.maps.InfoWindow();
    searchStores();

}

searchStores = () => {
    console.log("searching");
    let foundStores = [];
    var zipCode = document.getElementById('zip-code-input').value;
    //console.log(zipCode);
    if(zipCode){
        stores.map((store) => {
            let postal = store['address']["postalCode"].substring(0, 5);
            let postal1 = store['address']["postalCode"].substring(0, 1);
            let postal2 = store['address']["postalCode"].substring(0, 2);
            let postal3 = store['address']["postalCode"].substring(0, 3);
            let postal4 = store['address']["postalCode"].substring(0, 4);
            if(postal == zipCode || zipCode == postal1 || postal2 == zipCode || postal3 == zipCode || postal4 == zipCode){
                foundStores.push(store);
            }
        });
    }else {
    foundStores = stores;

    }

    displayStoresData(foundStores);
    showStoreMarkers(foundStores);
    setOnClickListener();
    //console.log(foundStores);
}

/*display stores-data.js*/
function displayStoresData(stores) {
    let storesHTML = "";
    stores.map(function (store, index) {
        let address = store['addressLines'];
        let phoneNumber = store['phoneNumber'];
        storesHTML += `
            <div class="card  mb-1 store-container" >
            <div class="store-container-background">
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
            </div>
        `;
        document.querySelector('.store-list').innerHTML = storesHTML;
    })
}
showStoreMarkers = (stores) => {
    var bounds = new google.maps.LatLngBounds();
    stores.map(function (store,index){
     let name= store['name'];
     let address = store['addressLines'][0];
     var latlng = new google.maps.LatLng(
         store['coordinates']['latitude'],
         store['coordinates']['longitude']);
     var openStatusText = store['openStatusText'];
     var phoneNumber = store['phoneNumber'];
    bounds.extend(latlng);
      createMarker(latlng,name, address,openStatusText, phoneNumber, index)
    });
    map.fitBounds(bounds);

};
function createMarker(latlng, name, address, openStatus, phoneNumber,index) {
    let i = parseInt(index.toString());
    i= i+1
   // console.log("marker index "+ i + " typeof "+typeof(i));
    var html =`
        <div class="store-info-window">
            <div class="store-info-name">${name}</div>
            <div class="store-info-status">${openStatus}</div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                </div>
                ${address}
            </div>
            <div class="store-info-phone">
                 <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                ${phoneNumber}
            </div>
        </div>  
    `;

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: 'assets/images/stbMarker.ico',
        title:name,
        animation: google.maps.Animation.DROP,
       // label:i.toString() ,


    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}


setOnClickListener = () =>{
    var storeElements = document.querySelectorAll(".store-container");
    for(const[index, storeElement] of storeElements.entries()){
        //console.log(storeElement);
        storeElement.addEventListener('click',function() {
            google.maps.event.trigger(markers[index], 'click');
        })
    }
}

/*let clickedMarker ={};
openInfoWindow = (index) => {


    for (var i = 0; i < markers.length; ++i) {
        if(markers[index].label == i){
             clickedMarker=markers[i];
            infoWindow.open(map, markers[i]);
            console.log("clickIndex: "+ index + "matched with array no "+i +" map:"+ map+" maker:"+markers[i].map );

        }
    }


    //alert(markers[index].label +" type of "+typeof(clickedMarker));
    /!*markers[i].setMap(null);
    *!/
    clickedMarker.addListener('click', toggleBounce);
    //markers[index].toggleBounce();
    document.getElementById("store-number").click();

    //console.log("clickIndex: "+ clickIndex);
};*/

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