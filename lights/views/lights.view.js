"use strict";
(function($) {
  function LightsComponentView(model) {
    this.root = $("<div></div>");

    function onStatusChange() {
      var roomId = parseInt($(this).parent().prop("id").replace("room", ""), 10);
      // console.log("arguments:", arguments);
      model.set(roomId, $(this).prop("checked"));
      model.save();
    }

    this.initialize = function() {
      this.root.on("change", function(evtArg) {
        // console.log($(evtArg.srcElement).parent());
        onStatusChange.apply(evtArg.target, arguments);
      });

      var rooms = model.getAllRooms();
      var that = this;
      rooms.forEach(function(room) {
          model.addSubscriber(room.id, function() {
            console.log("Updating checkbox value...");
            that.root.find("room"+room.id+">input").prop("checked", model.get(room.id));
          })
      });
    };

    this.render = function() {
      this.root.html($("#lightsComponentTemplate").html());
      var rooms = model.getAllRooms();
      // console.log("No of rooms: " + rooms.length);
      var that = this, i = 0;
      rooms.forEach(function(room) {
        var roomTmpl = $("#lightsComponentRoomsTemplate").html();
        that.root.append(roomTmpl
          .replace("{roomId}",  "room"+room.id)
          .replace("{roomName}", room.name)
        );
        // console.log("Room", room);
        that.root.find("#room"+room.id+">input").prop("checked", room.status);
        i++;
      });
      return this;
    };

    this.initialize();
  }

  window.LightsComponentView = LightsComponentView;
}) (jQuery);