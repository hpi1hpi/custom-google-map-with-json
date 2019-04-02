// banner Slider
var bannerSlider = new Swiper('.bannerSlider', {
    init: false,
    speed: 0,
    spaceBetween: 0,
    lazy: {
        loadPrevNext: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: false
})



// set google map style
var mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#fafafa"
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
        }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#c3d6bf"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#4b6878"
        }]
    }, {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [{
            "weight": 4.5
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#bbd4ba"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#b2c8b1"
        }]
    }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#c3d6bf"
        }, {
            "visibility": "off"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
            "color": "#023e58"
        }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#bfd7bd"
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#283d6a"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#6f9ba5"
        }]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "labels.text",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "labels.text.fill",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.medical",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#c3d6bf"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#304a7d"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#98a5be"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#c3d6bf"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#2c6675"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#023e58"
        }]
    }, {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#98a5be"
        }]
    }, {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1d2c4d"
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#283d6a"
        }]
    }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
            "color": "#3a4762"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#0e1626"
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#2c639b"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#4e6d70"
        }]
    }
]




function initMap() {
    // init Map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lat: 21.7679,
            lng: 78.8718
        },
        styles: mapStyle
    });


    // ask current locations
    $(".giveAccess").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // set current locations
                map.setCenter(pos);
                map.setZoom(10);
            });
        }
        $(this).hide()
    });



    // InfoWindow
    var infowindow = new google.maps.InfoWindow();

    // marker
    var marker, count;
    var image = {
        url: 'logo.png',
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    };

    $.getJSON("locations.json", function(data) {
        var items = [];
        $.each(data, function(key, locations) {
            // set marker with infow window
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations.lat, locations.lng),
                map: map,
                icon: locations.icon,
                title: locations.title,
                id: locations.id
            });
            // open info window

            google.maps.event.addListener(marker, 'click', (function(marker, count) {
                return function() {
                    // get clicked id then init slider and slide to respective slider
                    var getImgNumber = locations.id
                    bannerSlider.init();
                    bannerSlider.slideTo(getImgNumber);
                    $("#popup").addClass("show");
                }
            })(marker, count));

            // click events
            document.getElementById("close").addEventListener("click", hidePopup);

            // hide pop up
            function hidePopup() {
                $("#popup").removeClass("show");
            }


            // generate slider
            var bannerSliderSwiper = $('.bannerSlider .swiper-wrapper');
            bannerSliderSwiper.append("<div class='swiper-slide'><img data-src='" + locations.img + "' class='swiper-lazy banner'><div class='swiper-lazy-preloader swiper-lazy-preloader-white'></div></div>");

        });
    });




}