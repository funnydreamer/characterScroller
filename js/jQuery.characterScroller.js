/* jQuery characterScroller plugin
|* by funnydreamer
|* version: 0.1
|* updated: Oct 4, 2013
|* since 2013
|* licensed under the MIT License
|* Enjoy.
|* 
|* Thanks,
|* funnydreamer */

(function($){

  var w, h, frame, frames, cat, fps, animator, interval, $scroller;
  
  var methods = {
    
    init: function( config ){

      var defaults = {
        width:50,
        height:50,
        animate:true,
        easing:'fast',
        img:'./images/matrix.jpg',
        frames:[
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5]
        ],
        fps:1,
        cat:0
      };

      var options=$.extend(defaults, config);

      var $body = $('body');
      var id_name = "character-scroller";
      var div = '<div id="' + id_name + '"></div>';

      $body.append(div);
      $scroller = $( '#' + id_name );
      $scroller.css({
        'width'     :options.width,
        'height'    :options.height,
        'background':'url(' + options.img + ') repeat 0 0'
      });

      w = options.width;
      h = options.height;
      frame = 0;
      frames = options.frames;
      cat = options.cat;
      fps = options.fps;
      interval = 1000/fps;

      $scroller.on('click', function(){
        $('html,body').animate( { scrollTop: 0 }, options.easing);
        return false;
      });

      return this;

    },

    start : function() {
      clearInterval( animator );
      animator = setInterval( methods.processing, interval );
    },

    stop : function() {
      clearInterval( animator );
    },

    change : function( index ){
      if( index >= frames.length || index < 0 ) {
        $.error( 'index: ' + index + ' is out of frames length. "frames" range is [0-' + (frames.length-1) + ']' );
        return ;
      }
      frame = 0;
      cat = index;
      methods.update();
    },

    processing : function(){
      frame++;
      if( frame >= frames[cat].length ) frame = 0;
      methods.update();
    },

    update : function(){
      $scroller.css({
        'background-position': ( (frames[cat][frame]-1) * -w ) + 'px ' + ( cat * -h ) + 'px'
      });
    }

  }

  $.fn.characterScroller = function( method ) {

    if( methods[ method ] )
    {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    else if ( typeof method == 'object' || !method )
    {
      return methods.init.apply( this, arguments );
    }
    else {
      $.error( 'Method ' + method + ' does not exist on jQuery.characterScroller' );
    }

  };

})(jQuery);