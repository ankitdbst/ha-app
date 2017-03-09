"use strict";
(function($) {
  function ThermostatComponentView(model) {
    this.root = $("<div></div>");

    function onTempChange() {
      var roomId = parseInt($(this).attr("id").replace("inpTemp", ""), 10);
      // console.log("arguments:", arguments);
      model.set(roomId, $(this).val());
      model.save();
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function updateView(view, room) {
      console.log("Updating temperature value...");
      view.root.find("#inpTemp"+room.id).val(model.get(room.id));
      view.root.find("#spnTemp"+room.id).html(model.get(room.id));
    }

    this.initialize = function() {
      this.root.on("change", function(evtArg) {
        // console.log($(evtArg.srcElement).parent());
        onTempChange.apply(evtArg.target, arguments);
      });

      var rooms = model.getAllRooms();
      var that = this;
      rooms.forEach(function(room) {
        model.addSubscriber(room.id, function() {
          updateView(that, room);
        });
      });
    };

    this.render = function() {
      this.root.html($("#thermostatComponentTemplate").html());
      var rooms = model.getAllRooms();
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
        updateView(that, room);
      });
      return this;
    };

    this.initialize();
  }

  window.ThermostatComponentView = ThermostatComponentView;
}) (jQuery);