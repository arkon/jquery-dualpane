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

    // Initial pane widths (prioritize right column)
    if (opts.rightColWidth) {
      var rightColWidth = convertWidth(opts.rightColWidth);

      $rightCol.css('width', rightColWidth);
      $leftCol.css('width', ($panes.outerWidth() - $rightCol.outerWidth() - $dragbar.outerWidth()) + 'px');
    } else {
      var leftColWidth = convertWidth(opts.leftColWidth);

      $leftCol.css('width', leftColWidth);
      resizeRightCol();
    }

    // Handle the drag bar
    $dragbar.on('mousedown touchstart', function (e) {
      e.preventDefault();

      $(document)
        .bind('mousemove touchmove', function (e) {
          var xPos;

          if (e.type == 'touchmove') {
            xPos = e.originalEvent.touches[0].clientX;
          } else {
            xPos = e.clientX;
          }

          var newWidth = xPos - $leftCol.offset().left;

          if (newWidth >= opts.limit && newWidth <= $panes.outerWidth() - opts.limit) {
            $leftCol.css('width', (xPos - $leftCol.offset().left) + 'px');
            resizeRightCol();
          }
        })
        .bind('mouseup touchend', function (e) {
          $(document).unbind('mousemove touchmove');
        });
    });

    // Resize proportionally
    $(window).on('resize', function () {
      var widthPercentage = $leftCol.outerWidth() / $panes.outerWidth();
      var newWidth = widthPercentage * $panes.outerWidth();

      // Gutter limit
      if (newWidth < opts.limit)
        newWidth = opts.limit + 'px';
      else if (newWidth > ($panes.outerWidth() - opts.limit))
        newWidth = ($panes.outerWidth() - opts.limit) + 'px';
      else
        newWidth = (widthPercentage * 100) + '%';

      $leftCol.css('width', newWidth);
      resizeRightCol();
    });

    // Resize the right column to take up the remaining space
    function resizeRightCol () {
      $rightCol.css('width', ($panes.outerWidth() - $leftCol.outerWidth() - $dragbar.outerWidth()) + 'px');
    }

    // Deal with percentage or pixel widths
    function convertWidth (val) {
      if (val % 1 !== 0) {
        val = (val * 100) + '%';
      } else {
        // Prevent width from being wider than the window
        if (val >= $panes.outerWidth() - opts.limit) {
          val = $panes.outerWidth() - opts.limit;
        }

        val = val + 'px';
      }

      return val;
    }

    return this;
  };

  $.fn.dualpane.defaults = {
    leftColWidth: 0.5,
    limit: 100
  };

}(jQuery));
