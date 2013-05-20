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

   $('header h2, header p, header a').hide();
   


    $('header h2').fadeTo('slow', 1, function() {
      $("header p").fadeTo('slow', .6);
      $("header a").fadeTo('slow', .8, function() {
        $("header p").fadeTo('slow', 1);
      });
    });

      
    
    


    
  
    // use app here
    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);
});