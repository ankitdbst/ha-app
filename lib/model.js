"use strict";
(function($) {
  function Model() {
    this.data = {};
    this._subscribers = {};
    this.initialize();
  }

  Model.extend = function(newModelProto) {
    function NewModel() {
      Model.call(this);
    }

    NewModel.prototype = $.extend({}, Model.prototype, newModelProto);
    return NewModel;
  };

  $.extend(Model.prototype, {
    initialize: function() {},
    get: function(attrName){
      return this.data[attrName];
    },

    set: function(attrName, value){
      this.data[attrName] = value;
      this.triggerChange(attrName);
    },

    save: function() {
      // Perform xhr to save data to server
      console.log("Saved data to server!");
    },

    addSubscriber: function(attrName, subscriberFn){
      this._subscribers[attrName] = this._subscribers[attrName] || [];
      this._subscribers[attrName].push(subscriberFn);
    },

    removeSubscriber: function(attrName, subscriberFn){
      //fill in the blanks
    },

    triggerChange: function(attrName){
      var subscriptions = this._subscribers[attrName] || [];
      for(var i=0;i<subscriptions.length;i++){
        subscriptions[i].call(this);
      }
    }
  });

  window.Model = Model;
}) (jQuery);