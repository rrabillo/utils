window.app = (() => {

    /**
     * Global utils functions
     * to move on from jQuery
     */
    class appUtils {

        /**
         * Launch a function when dom is ready
         * @param {function} fn - Function to run
         */
        static domReady(fn){
            if (document.readyState != 'loading'){
                fn();
            } else {
                document.addEventListener('DOMContentLoaded', fn);
            }
        }

        /**
         * Iterate over a NodeList
         * @param {NodeList} elements - NodeList
         * @param {function} fn - Function
         */
        static nodesEach(elements, fn){
            Array.prototype.forEach.call(elements, (el, i) => {
                fn(el,i);
            });
        }

        /**
         * Create element
         * @param {string} html - String containing html
         */
        static createElement(html){
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            return template.content.children;
        }

        /**
         * Add class to all element from a NodeList
         * @param {NodeList} elements - NodeList
         * @param {string} className - Class to add
         */
        static nodesAddClass(elements, className){
            Array.prototype.forEach.call(elements, (el, i) => {
                el.classList.add(className);
            });
        }

        /**
         * Remove class to all element from a NodeList
         * @param {NodeList} elements - NodeList
         * @param {string} className - Class to remove
         */
        static nodesRemoveClass(elements, className){
            Array.prototype.forEach.call(elements, (el, i) => {
                el.classList.remove(className);
            });
        }

        /**
         * Attach event to elems in NodeList
         * @param {string} event - Event name
         * @param {NodeList} elements - NodeList
         * @param {function} fn - function to execute
         */
        static nodesEventListener(event, elements, fn){
            Array.prototype.forEach.call(elements, (el,i) => {
                el.addEventListener(event, fn.bind(this, el, i));
            });
        }



        /**
         * Debounce a function
         * @param {function} fn - Function to execute
         * @param {number} delay - Timeout delay
         */
        static debounce(fn, delay = 250){
            let timer = false;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn();
                },delay);
            }
        }

        /**
         * Throttle a function
         * @param {function} fn - Function to execute
         * @param {number} delay - Timeout delay
         */
        static throttle(fn, delay = 250){
            let throttle = false;
            return () => {
                if(!throttle){
                    fn();
                    throttle = true;
                    setTimeout(() => {
                        throttle = false;
                    }, delay)
                }
            }
        }

        /**
         * Keep focus in an element when using tab
         * @param {Node} element - Dom Node
         */
        static keepFocus(element){
            let focusableEls = element.querySelectorAll('.focusable, a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
            let firstFocusableEl = focusableEls[0];
            let lastFocusableEl = focusableEls[focusableEls.length - 1];
            let KEYCODE_TAB = 9;

            setTimeout(function () {
                firstFocusableEl.focus();
            }, 250)

            element.addEventListener('keydown', function(e) {
                var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

                if (!isTabPressed) {
                    return;
                }

                if ( e.shiftKey ) /* shift + tab */ {
                    if (document.activeElement === firstFocusableEl) {
                        lastFocusableEl.focus();
                        e.preventDefault();
                    }
                } else /* tab */ {
                    if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }
            });
        }
    }

    const app = element =>  new appUtils(element);

    // Return static functions
    app.domReady = appUtils.domReady;
    app.nodesEach = appUtils.nodesEach;
    app.nodesAddClass = appUtils.nodesAddClass;
    app.nodesRemoveClass = appUtils.nodesRemoveClass;
    app.nodesEventListener = appUtils.nodesEventListener;
    app.throttle = appUtils.throttle;
    app.debounce = appUtils.debounce;
    app.createElement = appUtils.createElement;
    app.keepFocus = appUtils.keepFocus;

    return app;
})();
