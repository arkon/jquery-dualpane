(function ($) {

  $.fn.panes = function (options) {
    var opts = $.extend({}, $.fn.panes.defaults, options);

    // Inject styles
    addStyles();

    // Set up panes
    this.addClass('jquery-panes');

    var $panes = this;
    var $col1 = this.find('div:first-child');
    var $col2 = this.find('div:last-child');

    // Add the drag bar
    var $dragbar = $('<div class="jquery-pane-dragbar"></div>');
    $col1.after($dragbar);

    // Initial pane widths
    $col1.css('width', opts.colWidth1);
    $col2.css('width', ($panes.width() - $col1.width() - 10) + 'px');

    $dragbar
      .mousedown(function (e) {
        e.preventDefault();

        $(document)
          .mousemove(function (e) {
            var newWidth = e.clientX - $col1.offset().left;
            if (newWidth >= opts.limit && newWidth <= $panes.width() - opts.limit) {
              $col1.css('width', (e.clientX - $col1.offset().left) + 'px');
              $col2.css('width', ($panes.width() - $col1.width() - 42) + 'px');
            }
          })
          .mouseup(function (e) {
            $(document).unbind("mousemove");
          });
      })

    return this;
  };

  $.fn.panes.defaults = {
    colWidth1: '50%',
    limit: 50
  };

  var addStyles = function () {
    var bStylesheetExists = false;

    $('link').each(function() {
      if ($(this).attr('href') === 'jquery.panes.css') {
         bStylesheetExists = true;
      }
    });

    if (bStylesheetExists === false) {
      $('head').append('<link rel="stylesheet" href="jquery.panes.css" type="text/css" />');
    }
  };

}(jQuery));
