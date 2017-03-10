"use strict";
(function($) {
  function View() {
    this.root = $("<div></div>");
    this.initialize();
  }

  View.extend = function(newViewProto) {
    function NewView(model) {
      this.model = model;
      View.call(this);
    }

    NewView.prototype = $.extend({}, View.prototype, newViewProto);
    return NewView;
  };

  $.extend(View.prototype, {
    initialize: function() {},
    render: function() {}
  });

  window.View = View;
}) (jQuery);