"use strict";
(function() {
  function LightsModel() {
    var data = {};
    var rooms = [];
    var _subscribers = {};
    this.save = function() {
      // Perform xhr to save data to server
      console.log("Saved data to server!");
    };
    this.loadData = function() {
      // Perform xhr to retrieve data from server
      // Room id values would be unique
      console.log("Loaded data from server!");
      var response = [
        {
          id: 0,
          name: "Living Room",
          status: 1
        },
        {
          id: 1,
          name: "Bed Room",
          status: 0
        },
        {
          id: 2,
          name: "Kitchen",
          status: 0
        }
      ];

      response.forEach(function(room) {
        data[room.id] = room;
        rooms.push(room);
      });
    };
    this.getAllRooms = function() {
      return rooms;
    };
    this.get = function(attrName){
      return data[attrName];
    };
    this.set = function(attrName, value){
      data[attrName] = value;
      triggerChange(attrName);
    };
    this.addSubscriber = function(attrName, subscriberFn){
      _subscribers[attrName] = _subscribers[attrName] || [];
      _subscribers[attrName].push(subscriberFn);
    };
    this.removeSubscriber = function(attrName,subscriberFn){
      //fill in the blanks
    };
    var triggerChange = (function(attrName){
      var subscriptions = _subscribers[attrName] || [];
      for(var i=0;i<subscriptions.length;i++){
        subscriptions[i].call(this);
      }
    }).bind(this);

    this.loadData();
  }

  window.LightsModel = LightsModel;
}) ();