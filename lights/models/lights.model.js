"use strict";
(function() {
  window.LightsModel = Model.extend({
    initialize: function () {
      this.rooms = [];

      function loadData() {
        // Perform xhr to retrieve data from server
        // Room id values would be unique
        console.log("Loaded data from server!");
        var response = [{id: 0, name: "Living Room", status: 1},
          {id: 1, name: "Bed Room", status: 0},
          {id: 2, name: "Kitchen", status: 0}];
        var that = this;
        response.forEach(function (room) {
          that.data[room.id] = room.status;
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