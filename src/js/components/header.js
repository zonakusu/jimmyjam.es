import { TweenLite, TimelineLite } from 'gsap';


class Header {
    constructor () {
        console.log('init header');

        this.el = document.querySelector('header');
        this.initialized = false;
    }

    setFullMode () {
        if (!this.initialized) {
            return this._initToFull();
        }

        this._workToFull();
    }

    _initToFull () {
        console.info('Header init to full');

        const timeline = new TimelineLite({
            onComplete: this._initialized.bind(this)
        });

        timeline
            .to(this.el, 0.300, {
                scaleY: 1
            })
            .to(this.el, 0.300, {
                scaleX: 1
            });
    }

    _workToFull () {
        console.info('Header work to full');
    }

    setWorkMode () {
        if (!this.initialized) {
            return this._initToWork();
        }

        this._fullToWork();
    }

    _initToWork() {
        console.info('Header init to work');

        this._initialized();
    }

    _fullToWork () {
        console.info('Header full to work');
    }

    _initialized () {
        this.el.classList.add('initialized');
    }
}

export default new Header();
