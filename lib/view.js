"use strict";
(function($) {
  /**
   * Base View to construct new Views
   * Defines the root element which encapsulate the view contents
   * @class
   * @property {object} root The root element that contains the view contents
   * @constructor
   */
  function View() {
    this.root = $("<div></div>");
    this.initialize();
  }

  /**
   * All new views should extend this View definition
   * See @LightsComponentView, @ThermostatComponentView
   * @param newViewProto
   * @returns {NewView} A new View with base type `View`
   */
  View.extend = function(newViewProto) {
    function NewView(model) {
      this.model = model;
      View.call(this);
    }

    NewView.prototype = $.extend({}, View.prototype, newViewProto);
    return NewView;
  };

  /**
   * View provides the below APIs
   */
  $.extend(View.prototype, {
    /**
     * All view initialization code, event bindings go here
     */
    initialize: function() {},
    /**
     * All logic to render the current view goes here
     */
    render: function() {}
  });

  window.View = View;
}) (jQuery);