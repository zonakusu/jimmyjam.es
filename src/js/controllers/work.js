import BaseController from 'lib/base-controller';
import Header from 'components/header';

import WorkTemplate from 'templates/work.html';


/**
 * MainController
 */
export default class WorkController extends BaseController {

    /**
     * constructor
     */
    constructor (...args) {
        super(...args);

        this.template = WorkTemplate;

        this.render();
        this.setWorkMode();
    }

    /**
     * setWorkMode
     */
    setWorkMode () {
        Header.setWorkMode();
    }
}
