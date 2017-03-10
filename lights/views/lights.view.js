"use strict";
(function($) {
  window.LightsComponentView = View.extend({
    initialize: function() {
      var that = this;
      this.root.on("change", function(evtArg) {
        var target = evtArg.target;
        // console.log($(evtArg.srcElement).parent());
        var roomId = parseInt($(target).attr("id").replace("inpLightStatus", ""), 10);
        that.model.set(roomId, $(target).prop("checked"));
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
      console.log("Updating checkbox value...");
      this.root.find("#inpLightStatus"+room.id).prop("checked", this.model.get(room.id));
    },

    render: function() {
      this.root.html($("#lightsComponentTemplate").html());
      var rooms = this.model.getAllRooms();
      // console.log("No of rooms: " + rooms.length);
      var that = this;
      rooms.forEach(function(room) {
        var roomTmpl = $("#lightsComponentRoomsTemplate").html();
        var roomHtml = roomTmpl
        .replace("{divLightRoomId}", "divLightRoomId"+room.id)
        .split("{inpLightStatus}").join("inpLightStatus"+room.id) // replaceAll
        .replace("{roomName}", room.name);
        that.root.append(roomHtml);
        that.updateView(room);
      });
      return this;
    }
  });

}) (jQuery);