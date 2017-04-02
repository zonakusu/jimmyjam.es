import Handlebars from 'handlebars';

/**
 * BaseController
 * Default controller, all controllers should extend, takes care of context,
 * rendering and removing stuff from the DOM
 */
export default class {


    /**
     * constructor
     */
    constructor () {
        console.log(this.constructor && this.constructor.name, 'controller initialized');
    }


    /**
     * Self made destructor
     * Doesnt necessary do garbage collection, but can be used to do something
     * similar if needed
     *
     * @param  {Function} done
     */
    destructor (done) {
        done();
    }

    /**
     * Render function
     * Depends on this.template property, and optional this.context. Will
     * call this.beforeRender and this.afterRender at appropriate times.
     */
    render () {
        if (!this.template) {
            log('Warning, no template found for', this.constructor && this.constructor.name);
        }

        const rendered = Handlebars.compile(this.template)(this.context);

        this.beforeRender(() => {
            document.querySelector('.main-content').innerHTML = rendered;

            this.afterRender();
        });
    }

    setRouter (router) {
        this.router = router;
    }

    /**
     * beforeRender is called technically after rendering with the context, but
     * before the rendered html is added to the DOM
     *
     * @param  {Function} cb Callback function
     */
    beforeRender (cb) {
        cb()
    }

    /**
     * After render is done, callback
     */
    afterRender () {
        this.bindRouteEvents();
    }

    bindRouteEvents () {
        Array.from(document.querySelectorAll('.main-content .js-link-internal')).forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                this.router.navigate(e.currentTarget.href);
            });
        });
    }
}
