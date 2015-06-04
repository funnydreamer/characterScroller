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

  var w, h, frame, frames, row, fps, animator, interval, $scroller;
  
  var methods = {
    
    init: function( config ){

      var defaults = {
        width:50, // width of 1frame
        height:50, // height of 1frame
        animate:true, // no used!
        easing:'fast', // easing
        img:'./images/matrix.jpg', // sprite image for animation
        frames:[
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5],
          [1,2,3,4,5]
        ], 
        fps:1, // frame per second
        row:0 // indicate initial image in frames 
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
      row = options.row;
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

    reset : function() { // function for reset frame to 0 and stop
      frame = 0;
      methods.update();
      methods.stop();
    },

    fps : function( value ) { // set fps value
      interval = 1000/value;
      methods.stop();
      methods.start();
    },

    change : function( index ){
      if( index >= frames.length || index < 0 ) {
        $.error( 'index: ' + index + ' is out of frames length. "frames" range is [0-' + (frames.length-1) + ']' );
        return ;
      }
      frame = 0;
      row = index;
      methods.update();
    },

    processing : function(){
      frame++;
      if( frame >= frames[row].length ) frame = 0;
      methods.update();
    },

    update : function(){
      $scroller.css({
        'background-position': ( (frames[row][frame]-1) * -w ) + 'px ' + ( row * -h ) + 'px'
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