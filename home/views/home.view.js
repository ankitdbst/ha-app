"use strict";
(function($) {
  window.HomeView = View.extend({
    render: function() {
      this.root.html($("#homeTemplate").html());
      return this;
    }
  });
}) (jQuery);