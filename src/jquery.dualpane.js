(function ($) {

  $.fn.dualpane = function (options) {
    var opts = $.extend({}, $.fn.dualpane.defaults, options);

    // Set up panes
    this.addClass('jquery-dualpane');

    var $panes = this;
    var $leftCol = this.find('div:first-child');
    var $rightCol = this.find('div:last-child');

    // Add the drag bar
    var $dragbar = $('<div class="jquery-dualpane-dragbar"></div>');
    $leftCol.after($dragbar);

    // Initial pane widths
    $leftCol.css('width', (opts.leftColWidth * 100) + '%');
    resizeRightCol();

    // Handle the drag bar
    $dragbar.on('mousedown touchstart', function (e) {
      e.preventDefault();

      $(document)
        .bind('mousemove touchmove', function (e) {
          if (event.type == 'touchmove') {
            var xPos = e.originalEvent.touches[0].clientX;
          } else {
            var xPos = e.clientX;
          }

          console.log(xPos);

          var newWidth = xPos - $leftCol.offset().left;

          if (newWidth >= opts.limit && newWidth <= $panes.width() - opts.limit) {
            $leftCol.css('width', (xPos - $leftCol.offset().left) + 'px');
            resizeRightCol();
          }
        })
        .bind('mouseup touchend',function (e) {
          $(document).unbind('mousemove touchmove');
        });
    });

    // Resize it proportionally
    $(window).on('resize', function () {
      var widthPercentage = $leftCol.outerWidth() / $panes.outerWidth();
      $leftCol.css('width', (widthPercentage * 100) + '%');
      resizeRightCol();
    });

    // Resize the right column to take up the remaining space
    function resizeRightCol() {
      $rightCol.css('width', ($panes.outerWidth() - $leftCol.outerWidth() - $dragbar.outerWidth()) + 'px');
    }

    return this;
  };

  $.fn.dualpane.defaults = {
    leftColWidth: 0.5,  // Percentage width of left column
    limit: 50           // Limit of drag (in px)
  };

}(jQuery));
