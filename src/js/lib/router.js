/**
 * Router class
 */
export default class Router {

    /**
     * constructor
     *
     * @param  {Object} routes
     */
    constructor (routes) {
        this.routes = routes;
        this.monkeyPatchPushState();
        this.initFirstRoute();
        this.initPopStateListener();
    }

    /**
     * monkeyPatchPushState
     *
     * Monkeypatches the window pushstate function and adds our own navigate
     * method to it.
     */
    monkeyPatchPushState () {
        if (window.history) {
            const originalPushState = window.history.pushState.bind(window.history);

            window.history.pushState = (state, name, url) => {
                originalPushState(state, name, url);

                this.navigateListener({
                    state,
                    name,
                    url
                })
            }
        }
    }

    /**
     * initPopStateListener
     */
    initPopStateListener () {
        window.addEventListener('popstate', this.onPopState.bind(this));
    }

    /**
     * onPopState
     *
     * @param  {Event} e
     */
    onPopState (e) {
        this.initRoute(window.location.pathname);
    }

    /**
     * initFirstRoute
     *
     * Initialize initial routing
     */
    initFirstRoute () {
        this.initRoute(this.cleanUrl(window.location.pathname));
    }

    /**
     * navigateListener
     *
     * On nav event
     *
     * @param  {Event} e
     */
    navigateListener (e) {
        console.info('Navigating:', e);

        this.initRoute(e.url);
    }

    /**
     * initRoute
     *
     * Take an url and see if we get a routing
     *
     * @param  {String} url
     */
    initRoute (url) {
        let RouteController = this.getRoute(url);

        if (!RouteController) {
            return console.warn('No route found for', url);
        }

        if (!this.controller) {
            return this.initController(RouteController);
        }

        this.controller.destructor(this.initController.bind(this, RouteController));
    }

    /**
     * Initialize controller
     *
     * @param  {Class} RouteController
     */
    initController (RouteController) {

        this.controller = new RouteController(this.canvas);
        this.controller.setRouter(this);
    }

    /**
     * getRoute
     *
     * Get a controller based on a url
     *
     * @param  {String} url
     */
    getRoute (url) {
        for (let route of this.routes) {
            if (route.route.indexOf('[') > -1) {
                route = this.getRouteProps(Object.assign({}, route));
            }

            let res = new RegExp('^\/?' + route.route).exec(url);

            if (res) {
                let props = res.slice(1, res.length);

                props.forEach((prop, index) => {
                    route.props[Object.keys(route.props)[index]] = prop;
                })

                return route.controller.bind(route.controller, route.props);
            }
        }

        return false;
    }

    /**
     * getRouteProps
     *
     * Extract props from a URL
     *
     * @param  {Object} route
     * @return {Object} Same route as route arg, but with added props
     */
    getRouteProps (route) {
        const propKeys = route.route.match(/\[(.+?)\]/g);

        route.route = route.route.replace(/\./g, "\\.")
            .replace(/\//g, '\\/');

        route.route = route.route.replace(/\[(.+?)\]/g, '(.+)');
        route.props = {};

        propKeys.forEach(key => {
            route.props[key.substring(1, key.length - 1)] = null;
        });

        return route;
    }

    /**
     * navigate
     *
     * Navigate to new url
     *
     * @param  {String} url
     * @param  {Object} state = {}
     * @param  {String} name = undefined
     */
    navigate (url, state = {}, name = undefined) {
        url = this.cleanUrl(url);

        window.history.pushState(state, name || url, url);

        if (window.ga) {
            window.ga('set', 'page', url);
            window.ga('send', 'pageview');
        }
    }


    /**
     * Cleans url from host (if set)
     *
     * @param  {String} url
     * @return {String}
     */
    cleanUrl (url) {
        if (url.indexOf('http') < 0) {
            return url;
        }

        let matches = url.match(/^https?\:\/\/.*?(\/.*)$/);

        return matches[1] ? matches[1] : url;
    }
}
