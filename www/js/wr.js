(function() {
    var supportedBrowser = (
        !!document.querySelectorAll &&
        !!document.getElementsByClassName
    );

    if (window.applicationCache) {
        applicationCache.addEventListener('updateready', function() {
            if (confirm('An update is available. Reload now?')) {
                window.location.reload();
            }
        });
    }

    /* Toggle off message for older browsers */
    var surprompenEl    = document.getElementById('surprompen'),
        pageEl         = document.getElementById('page');

    surprompenEl.onclick = function () {
        surprompenEl.style.display = 'none';
        pageEl.style.display = 'block';
    };

    if ( !supportedBrowser ) {
        surprompenEl.style.display = 'block';
        pageEl.style.display = 'none';
    }



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
        elImageboxes[ i ].addEventListener( 'click', toggle, false);
    }



    // Flip map / slideshow

    function mapSlideshowFlip ( ev ) {

        var url = ev.target.href,
            id = url.substr( url.indexOf('#') + 1 );

        if ( id === 'locationimages' ) {
            document.getElementById( 'locationimages' ).setAttribute('style', 'display: block;');
            document.getElementById( 'locationmap' ).setAttribute('style', 'display: none;');
        }

        if ( id === 'locationmap' ) {
            document.getElementById( 'locationimages' ).setAttribute('style', 'display: none;');
            document.getElementById( 'locationmap' ).setAttribute('style', 'display: block;');
        }

        ev.preventDefault();

    }

    var venueListEl = document.querySelectorAll('#location .left ul')[ 0 ];
    venueListEl.addEventListener('click', mapSlideshowFlip );



    // Do venue slideshow

    function slideshowFlip ( direction ) {

        var elFocus     = document.querySelectorAll('.slide.focus')[ 0 ],
            elNext      = elFocus.nextElementSibling,
            elPrevious  = elFocus.previousElementSibling;

        if ( direction === 'left' ) {
            if ( elPrevious.getAttribute('class') === 'slide pre' ) {
                elFocus.setAttribute('class', 'slide next');
                elPrevious.setAttribute('class', 'slide focus');
            }
        }

        if ( direction === 'right' ) {
            if ( elNext.getAttribute('class') === 'slide next' ) {
                elFocus.setAttribute('class', 'slide pre');
                elNext.setAttribute('class', 'slide focus');
            }
        }

    }

    var arrowRight  = document.querySelectorAll('.arrowRight')[ 0 ],
        arrowLeft   = document.querySelectorAll('.arrowLeft')[ 0 ];

    arrowRight.addEventListener('click', function () {
        slideshowFlip( 'right' );
    });

    arrowLeft.addEventListener('click', function () {
        slideshowFlip( 'left' );
    });





    // Flip schedule

    function scheduleFlip ( ev ) {

        var url = ev.target.href,
            id = url.substr( url.indexOf('#') + 1 );

        if ( id === 'dayI' ) {
            document.getElementById( 'dayI' ).setAttribute('style', 'display: table;');
            document.getElementById( 'dayII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIV' ).setAttribute('style', 'display: none;');
        }

        if ( id === 'dayII' ) {
            document.getElementById( 'dayI' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayII' ).setAttribute('style', 'display: table;');
            document.getElementById( 'dayIII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIV' ).setAttribute('style', 'display: none;');
        }

        if ( id === 'dayIII' ) {
            document.getElementById( 'dayI' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIII' ).setAttribute('style', 'display: table;');
            document.getElementById( 'dayIV' ).setAttribute('style', 'display: none;');
        }

        if ( id === 'dayIV' ) {
            document.getElementById( 'dayI' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIII' ).setAttribute('style', 'display: none;');
            document.getElementById( 'dayIV' ).setAttribute('style', 'display: table;');
        }

        ev.preventDefault();

    }

    var scheduleListEl = document.querySelectorAll('#schedule .left ul')[ 0 ];
    scheduleListEl.addEventListener('click', scheduleFlip );
})();