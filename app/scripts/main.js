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


    var headerLetters = $('h2').html().replace(/(\w)/g, "<span class='header-letter'>$&</span>")
    var headerEls = $(headerLetters)
    $('header h2').html(headerEls);
    
    // shuffle header els for randomization
    var shuffle = _.shuffle(headerEls);

    var loadedIndex = 0;
    $('header h2').show();

    //loadContent(); //Initiate it once on page load...
    var loader = window.setInterval(loadContent, 400); 
   

    function loadContent(timer) {
       
        $(shuffle[loadedIndex]).fadeIn();
        
        loadedIndex++; //Increase the array counter.

        if (shuffle.length == loadedIndex) { //If reached the end of the array...
            
            loadedIndex = 0; //Reset the counter
            clearInterval(loader); // clear the interval
        }
    }

  
    // use app here
    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);
});