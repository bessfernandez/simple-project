require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        underscore: '../components/underscore/underscore'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['app', 'jquery', 'bootstrap', 'underscore'], function (app, $) {
    'use strict';

    $(".scroll").click(function(event){
         event.preventDefault();

         var dest = 0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest = $(document).height()-$(window).height();
         } else {
              dest = $(this.hash).offset().top;
         }

         //go to destination
         $('html,body').animate({scrollTop:dest + -50}, 500,'swing');
     });


    var headerLetters = $('header h2').html().replace(/(\w)/g, "<span class='header-letter'>$&</span>");
    var headerEls = $(headerLetters);
    // replace header letters with spans
    $('header h2').html(headerEls);


    // fade in para and then anchors
    var headerAnchors = $('header p a').hide();
    $('header p').fadeIn(1000, function() {
        $('header p a').fadeIn(1000);
    });


    // set header to block
    $('header h2').show();

    // shuffle header els for randomization
    var shuffle = _.shuffle(headerEls);
    // set first shuffle index
    var loadedIndex = 0;
    // loadContent(); //Initiate it once on page load...
    var loader = window.setInterval(loadContent, 200); 
   

    function loadContent() {
       
        $(shuffle[loadedIndex]).fadeIn('slow');
        
        loadedIndex++; //Increase the array counter.

        // end of array reached
        if (shuffle.length == loadedIndex) {
            
            loadedIndex = 0;
            // clear the interval
            clearInterval(loader);
        }
    }


  
    // use app here
    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);
});