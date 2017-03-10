"use strict";
(function($) {
  new Router({
    '/': Home,
    '/lights': LightComponent,
    '/thermostat': ThermostatComponent
  });

  var $container = $('#container');

  function Home() {
    $container.html(new HomeView().render().root);
  }

  function LightComponent() {
    $container.html(new LightsComponentView(new LightsModel()).render().root);
  }

  function ThermostatComponent() {
    $container.html(new ThermostatComponentView(new ThermostatModel()).render().root);
  }
}) (jQuery);