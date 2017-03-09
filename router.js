var routes = {
  '/': Home,
  '/lights': LightComponent,
  '/thermostat': ThermostatComponent
};
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

function route() {
  var url = location.hash.slice(1) || '/';
  // Get route by url:
  var callback = routes[url];
  if (callback) {
    callback.apply(this);
  } else {
    // Default route
    routes['home'].apply(this);
  }
}

// Listen on hash change:
$(window).on('hashchange', route);
// Listen on page load:
$(window).on('load', route);