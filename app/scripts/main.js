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
              dest = $(this.hash).offset().top + -80;
         }

         $('.scroll').parent().removeClass('on');
         $(event.currentTarget).parent().addClass('on');

         //go to destination
         $('html,body').animate({scrollTop:dest}, 500,'swing');
     });


    var simple = {

        init: function() {

            this.headerTitle = $('header h2');
            this.headerContent = $('header p');

            this.headerTitleSpanClass = "header-letter";
            this.headerContentSpanClass = "header-fragment";

            this.wrapContent();

        },

        wrapContent: function() {
            var self = this;

            var headerLetters = this.headerTitle.html().replace(/(\w)/g, "<span class='" + this.headerTitleSpanClass + "'>$&</span>"),
                headerEls = $(headerLetters);

            // replace header letters with spans
            this.headerTitle.html($(headerEls));
            
            this.headerContent.contents().each(function(i, el) { 
                // wrap paragraph contents in spans
                $(el).wrap('<span class="' + self.headerContentSpanClass + '"></span>');
            });

            this.randomizeContent(headerLetters, headerEls);
        },

        randomizeContent: function(headerLetters, headerEls) {


            // shuffle header content randomization
            this.shuffleHeader = _.shuffle(headerEls);
            this.shuffleHeaderContent = _.shuffle($('span.' + this.headerContentSpanClass));

            this.loadContent();

        },

        loadContent: function() {
            var self = this;

            // set first shuffle index
            var loadedIndex = 0;
            
            // load content
            loadContent();

            var loader = window.setInterval(loadContent, 100); 

            function loadContent() {

                $(self.shuffleHeader[loadedIndex]).css('visibility', 'visible');
                $(self.shuffleHeaderContent[loadedIndex]).css('visibility', 'visible');
                
                loadedIndex++; //Increase the array counter.

                // end of array reached
                if (self.shuffleHeaderContent.length == loadedIndex) {
                    
                    loadedIndex = 0;
                    // clear the interval
                    clearInterval(loader);
                }
            }
        }
        

    }

    // initialize simple app
    simple.init();

  
    // use app here
    // console.log(app);
    // console.log('Running jQuery %s', $().jquery);
});