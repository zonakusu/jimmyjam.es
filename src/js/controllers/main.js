import BaseController from 'lib/base-controller';
import Header from 'components/header';

import MainTemplate from 'templates/main.html';


/**
 * MainController
 */
export default class MainController extends BaseController {

    /**
     * constructor
     */
    constructor (...args) {
        super(...args);

        this.template = MainTemplate;

        this.render();
        this.setFullMode();
    }

    /**
     * Set header to full view mode
     */
    setFullMode () {
        Header.setFullMode();
    }
}
