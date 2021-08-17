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
         * Remove class to all element from a NodeList
         * @param {NodeList} elements - NodeList
         * @param {string} className - Class to toggle
         */
        static nodesToggleClass(elements, className){
            Array.prototype.forEach.call(elements, (el, i) => {
                el.classList.toggle(className);
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
    }

    const app = element =>  new appUtils(element);

    // Return static functions
    app.domReady = appUtils.domReady;
    app.nodesEach = appUtils.nodesEach;
    app.nodesAddClass = appUtils.nodesAddClass;
    app.nodesRemoveClass = appUtils.nodesRemoveClass;
    app.nodesToggleClass = appUtils.nodesToggleClass();
    app.nodesEventListener = appUtils.nodesEventListener;
    app.throttle = appUtils.throttle;
    app.debounce = appUtils.debounce;

    return app;
})();
