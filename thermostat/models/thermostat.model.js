"use strict";
(function() {
  window.ThermostatModel = Model.extend({
    initialize: function () {
      this.rooms = [];

      function loadData() {
        // Perform xhr to retrieve data from server
        // Room id values would be unique
        console.log("Loaded data from server!");
        var response = [{id: 0, name: "Living Room", temp: 22},
          {id: 1, name: "Bed Room", temp: 28},
          {id: 2, name: "Kitchen", temp: 30}];
        var that = this;
        response.forEach(function (room) {
          that.data[room.id] = room.temp;
          that.rooms.push(room);
        });
      }

      loadData.call(this);
    },

    getAllRooms: function () {
      return this.rooms;
    }
  });
}) ();