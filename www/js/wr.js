(function() {

    /* Toggle off message for older browsers */
    var surprompenEl    = document.getElementById('surprompen'),
        pageEl         = document.getElementById('page');

    surprompenEl.onclick = function () {
        surprompenEl.style.display = 'none';
        pageEl.style.display = 'block';
    };



    /* Toggle speaker info */

    var youCanTouchThis = 'createTouch' in document,                        // Is it Hammer time?
        elImageboxes        = document.getElementsByClassName('imagebox'),
        i                   = elImageboxes.length;

    function toggle ( ev ) {
        var styles      = ['info','show'],
            element     = this.getElementsByClassName( styles[ 0 ] ),
            elVisible   = document.querySelectorAll('.' + styles.join('.')),
            l           = elVisible.length;

        if ( element[ 0 ].className !== styles.join(' ') ) {
            while ( l-- ) {
                elVisible[ l ].setAttribute('class',styles[ 0 ]);
            }
            element[ 0 ].setAttribute('class', styles.join(' '));

        } else {
            element[ 0 ].setAttribute('class', styles[ 0 ]);
        }
    }

    while( i-- ) {
        elImageboxes[ i ].addEventListener( youCanTouchThis ? 'touchend' : 'click', toggle);
    }



    // Do map

    var map,
        locations = {
            venue : { title : 'Conference Venue', lat : 59.93604, lng : 10.76576 }
        };

    function initialize() {
        var options = {
            zoom: 15,
            center: new google.maps.LatLng( locations.venue.lat, locations.venue.lng ),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById('map'), options );

        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: locations.venue.title
        });
    }
    google.maps.event.addDomListener( window, 'load', initialize );
    google.maps.event.addDomListener( window, 'resize', function() {
        map.setCenter( map.getCenter() );
    });

})()