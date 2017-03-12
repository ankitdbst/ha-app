"use strict";
(function($) {
  /**
   * Base Model to construct new models via Model.extend({})
   * It has an internal data object and list of subscribers
   * that watch for changes in the internal data model
   * @class Represents a Data Model
   * @property {object} data The object holding the data model
   * @property {object} _subscribers The object holding the list of subscribers to the property
   * on the data model
   * @constructor
   */
  function Model() {
    this.data = {};
    this._subscribers = {};
    this.initialize();
  }

  /**
   * All new models should extend this Model definition
   * See @LightsModel, @ThermostatModel
   * @param newModelProto
   * @returns {NewModel} A new Model with base type `Model`
   */
  Model.extend = function(newModelProto) {
    function NewModel() {
      Model.call(this);
    }

    NewModel.prototype = $.extend({}, Model.prototype, newModelProto);
    return NewModel;
  };

  /**
   * Model class provides the below APIs
   */
  $.extend(Model.prototype, {
    /**
     * All the code related to Model initialization
     */
    initialize: function() {},
    /**
     * Retrieve a property from the data model
     * @param attrName
     * @returns {*}
     */
    get: function(attrName){
      return this.data[attrName];
    },

    /**
     * Set a property to the data model
     * This also calls the registered subscribers (in the view)
     * @param attrName
     * @param value
     */
    set: function(attrName, value){
      this.data[attrName] = value;
      this.triggerChange(attrName);
    },

    /**
     * Save the data model to the Server via AJAX
     */
    save: function() {
      // Perform xhr to save data to server
      console.log("Saved data to server!");
    },

    /**
     * Add subscribers to a property on the data model
     * @param attrName
     * @param subscriberFn
     */
    addSubscriber: function(attrName, subscriberFn){
      this._subscribers[attrName] = this._subscribers[attrName] || [];
      this._subscribers[attrName].push(subscriberFn);
    },

    /**
     * Remove a subscriber on the data property of the model
     * @param attrName
     * @param subscriberFn
     */
    removeSubscriber: function(attrName, subscriberFn){
      var subscriptions = this._subscribers[attrName] || [];
      for(var i=0;i<subscriptions.length;i++){
        if (subscriberFn == subscriptions[i]) {
          subscriptions.splice(i, 1);
        }
      }
    },

    /**
     * Triggers a call to all the registered subscribers to the
     * property on the data model
     * @param attrName
     */
    triggerChange: function(attrName){
      var subscriptions = this._subscribers[attrName] || [];
      for(var i=0;i<subscriptions.length;i++){
        subscriptions[i].call(this);
      }
    }
  });

  window.Model = Model;
}) (jQuery);