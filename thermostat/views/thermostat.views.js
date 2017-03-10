"use strict";
(function($) {
  window.ThermostatComponentView = View.extend({
    initialize: function() {
      var that = this;

      this.root.on("change", function(evtArg) {
        var target = evtArg.target;
        // console.log($(evtArg.srcElement).parent());
        var roomId = parseInt($(target).attr("id").replace("inpTemp", ""), 10);
        // console.log("arguments:", arguments);
        that.model.set(roomId, $(target).val());
        that.model.save();
      });
      var rooms = this.model.getAllRooms();
      rooms.forEach(function(room) {
        that.model.addSubscriber(room.id, function() {
          that.updateView(room);
        });
      });
    },

    updateView: function(room) {
      console.log("Updating temperature value...");
      this.root.find("#inpTemp"+room.id).val(this.model.get(room.id));
      this.root.find("#spnTemp"+room.id).html(this.model.get(room.id));
    },

    render: function() {
      this.root.html($("#thermostatComponentTemplate").html());
      var rooms = this.model.getAllRooms();
      // console.log("No of rooms: " + rooms.length);
      var that = this;
      rooms.forEach(function(room) {
        var roomTmpl = $("#thermostatComponentRoomsTemplate").html();
        var roomHtml = roomTmpl
        .replace("{divThermostatRoomId}",  "divThermostatRoomId"+room.id)
        .split("{inpTemp}").join("inpTemp"+room.id) // replaceAll
        .replace("{roomName}", room.name)
        .replace("{spnTemp}", "spnTemp"+room.id);
        // console.log("Room", room);
        that.root.append(roomHtml);
        that.updateView(room);
      });
      return this;
    }
  });

}) (jQuery);