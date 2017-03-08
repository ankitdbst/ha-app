"use strict";
(function($) {
  function HomeView(model) {
    this.root = $("<div></div>");

    this.model = model;
    this.initialize = function() {

    };

    this.render = function() {
      this.root.html($("#homeTemplate").html());
      return this;
    };
  }

  window.HomeView = HomeView;
}) (jQuery);