import Router from 'lib/router';

import routes from 'routes';


class App {
    constructor () {
        this.router = new Router(routes);

        document.body.addEventListener('click', () => {
            document.body.classList.toggle('vr');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { new App() });
