export default function Router() {
	const routes = {},
				activeRoute = {},
				previousRoute = {};

	function updateRouteObj(routeToUpdate, routeToCopy) {
		for (const prop in routeToCopy) {
			routeToUpdate[prop] = routeToCopy[prop];
		}
	}

	return {
		add(route, controller) {
			routes[route] = { rule: route, controller };
			return this;
		},

		initHistory() {
			const pathname = location.pathname.substring(1);
			if (pathname == '') {
				updateRouteObj(activeRoute, routes['/']);
				history.replaceState('/', null, '');
			} else {
				history.replaceState(pathname, null, pathname);
				updateRouteObj(activeRoute, routes[pathname]);
				this.updateView();
			}
			return this;
		},

		bindPopstate() {
			const _this = this;
			window.addEventListener('popstate', function(e) {
				if (activeRoute.rule !== e.state) {
					updateRouteObj(previousRoute, activeRoute);
					updateRouteObj(activeRoute, routes[e.state]);
					_this.updateView();
				}
			});
			return this;
		},

		onRouteChange(routeName) {
			if (activeRoute.rule !== routeName) {
				updateRouteObj(previousRoute, activeRoute);
				updateRouteObj(activeRoute, routes[routeName]);
				history.pushState(routeName, null, routeName);
				this.updateView();
			}
			return this;
		},

		updateView() {
			activeRoute.controller.render(activeRoute);
			activeRoute.controller.activateTrigger(activeRoute);
			if (previousRoute.controller) {
				previousRoute.controller.deactivateTrigger(previousRoute);
			}
			return this;
		}
	}
}
