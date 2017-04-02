import MainController from 'controllers/main';
import WorkController from 'controllers/work';


/**
 * Routes
 *
 * Route can somewhat be regex, appart from using the [] brackets, since they are
 * used for extracting specific values from the url
 *
 * Controller is a controller which should extend from the base controller
 *
 */
export default [
    {
        route: 'index.html',
        controller: MainController
    },
    {
        route: '$',
        controller: MainController
    },
    {
        route: 'work/[project]',
        controller: WorkController
    }
]
