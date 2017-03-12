"use strict";
(function($) {
  /**
   * Router manages the routing of hash-urls to the appropriate views
   * @class
   * @property {object} routes Key-value pair of hash-urls to Controller fn
   * @param routes
   * @constructor
   */
  function Router(routes) {
    this.routes = routes || {};
    this.initialize();
  }

  /**
   * Router provides the below methods
   */
  $.extend(Router.prototype, {
    initialize: function() {
      // Listen on hash change:
      var bindRoute = this.route.bind(this);
      $(window).on('hashchange', bindRoute);
      // Listen on page load:
      $(window).on('load', bindRoute);
    },

    route: function () {
      var url = location.hash.slice(1) || '/';
      // Get route by url:
      var callback = this.routes[url];
      if (callback) {
        callback.apply(this);
      } else {
        // Default route
        this.routes['/'].apply(this);
      }
    }
  });

  window.Router = Router;
}) (jQuery);