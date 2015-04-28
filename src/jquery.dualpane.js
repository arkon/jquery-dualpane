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

    $dragbar.mousedown(function (e) {
      e.preventDefault();

      $(document)
        .mousemove(function (e) {
          var newWidth = e.clientX - $leftCol.offset().left;

          if (newWidth >= opts.limit && newWidth <= $panes.width() - opts.limit) {
            $leftCol.css('width', (e.clientX - $leftCol.offset().left) + 'px');
            resizeRightCol();
          }
        })
        .mouseup(function (e) {
          $(document).unbind("mousemove");
        });
    });

    $(window).on('resize', function () {
      var widthPercentage = $leftCol.outerWidth() / $panes.outerWidth();
      $leftCol.css('width', (widthPercentage * 100) + '%');
      resizeRightCol();
    });

    function resizeRightCol() {
      $rightCol.css('width', ($panes.outerWidth() - $leftCol.outerWidth() - $dragbar.outerWidth()) + 'px');
    }

    return this;
  };

  $.fn.dualpane.defaults = {
    leftColWidth: 0.5,
    limit: 50
  };

}(jQuery));
