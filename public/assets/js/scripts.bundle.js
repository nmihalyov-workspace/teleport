"use strict";

// Component Definition
var KTApp = function() {
    /** @type {object} colors State colors **/
    var settings = {};

    var initTooltip = function(el) {
        var theme = el.data('theme') ? 'tooltip-' + el.data('theme') : '';
        var width = el.data('width') == 'auto' ? 'tooltop-auto-width' : '';
        var trigger = el.data('trigger') ? el.data('trigger') : 'hover';

        $(el).tooltip({
            trigger: trigger,
            template: '<div class="tooltip ' + theme + ' ' + width + '" role="tooltip">\
                <div class="arrow"></div>\
                <div class="tooltip-inner"></div>\
            </div>'
        });
    }

    var initTooltips = function() {
        // init bootstrap tooltips
        $('[data-toggle="tooltip"]').each(function() {
            initTooltip($(this));
        });
    }

    var initPopover = function(el) {
        var skin = el.data('skin') ? 'popover-' + el.data('skin') : '';
        var triggerValue = el.data('trigger') ? el.data('trigger') : 'hover';

        el.popover({
            trigger: triggerValue,
            template: '\
            <div class="popover ' + skin + '" role="tooltip">\
                <div class="arrow"></div>\
                <h3 class="popover-header"></h3>\
                <div class="popover-body"></div>\
            </div>'
        });
    }

    var initPopovers = function() {
        // init bootstrap popover
        $('[data-toggle="popover"]').each(function() {
            initPopover($(this));
        });
    }

    var initFileInput = function() {
        // init bootstrap popover
        $('.custom-file-input').on('change', function() {
            var fileName = $(this).val();
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        });
    }

    var initScroll = function() {
        $('[data-scroll="true"]').each(function() {
            var el = $(this);

            KTUtil.scrollInit(this, {
                mobileNativeScroll: true,
                handleWindowResize: true,
                rememberPosition: (el.data('remember-position') == 'true' ? true : false)
            });
        });
    }

    var initAlerts = function() {
        // init bootstrap popover
        $('body').on('click', '[data-close=alert]', function() {
            $(this).closest('.alert').hide();
        });
    }

    var initCard = function(el, options) {
        // init card tools
        var el = $(el);
        var card = new KTCard(el[0], options);
    }

    var initCards = function() {
        // init card tools
        $('[data-card="true"]').each(function() {
            var el = $(this);
            var options = {};

            if (el.data('data-card-initialized') !== true) {
                initCard(el, options);
                el.data('data-card-initialized', true);
            }
        });
    }

    var initStickyCard = function() {
        if (typeof Sticky === 'undefined') {
            return;
        }

        var sticky = new Sticky('[data-sticky="true"]');
    }

    var initAbsoluteDropdown = function(context) {
        var dropdownMenu;

        if (!context) {
            return;
        }

        $('body').on('show.bs.dropdown', context, function(e) {
          dropdownMenu = $(e.target).find('.dropdown-menu');
          $('body').append(dropdownMenu.detach());
          dropdownMenu.css('display', 'block');
          dropdownMenu.position({
            'my': 'right top',
            'at': 'right bottom',
            'of': $(e.relatedTarget),
          });
        }).on('hide.bs.dropdown', context, function(e) {
          $(e.target).append(dropdownMenu.detach());
          dropdownMenu.hide();
        });
    }

    var initAbsoluteDropdowns = function() {
        $('body').on('show.bs.dropdown', function(e) {
            // e.target is always parent (contains toggler and menu)
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            var $dropdownMenu = $(e.target).find('.dropdown-menu');
            // save detached menu
            var $detachedDropdownMenu = $dropdownMenu.detach();
            // save reference to detached menu inside data of toggler
            $toggler.data('dropdown-menu', $detachedDropdownMenu);

            $('body').append($detachedDropdownMenu);
            $detachedDropdownMenu.css('display', 'block');
            $detachedDropdownMenu.position({
                my: 'right top',
                at: 'right bottom',
                of: $(e.relatedTarget),
            });
        });

        $('body').on('hide.bs.dropdown', function(e) {
            var $toggler = $(e.target).find("[data-attach='body']");
            if ($toggler.length === 0) {
                return;
            }
            // access to reference of detached menu from data of toggler
            var $detachedDropdownMenu = $toggler.data('dropdown-menu');
            // re-append detached menu inside parent
            $(e.target).append($detachedDropdownMenu.detach());
            // hide dropdown
            $detachedDropdownMenu.hide();
        });
    };

    return {
        init: function(settingsArray) {
            if (settingsArray) {
                settings = settingsArray;
            }

            KTApp.initComponents();
        },

        initComponents: function() {
            initScroll();
            initTooltips();
            initPopovers();
            initAlerts();
            initFileInput();
            initCards();
            initStickyCard();
            initAbsoluteDropdowns();
        },

        initTooltips: function() {
            initTooltips();
        },

        initTooltip: function(el) {
            initTooltip(el);
        },

        initPopovers: function() {
            initPopovers();
        },

        initPopover: function(el) {
            initPopover(el);
        },

        initCard: function(el, options) {
            initCard(el, options);
        },

        initCards: function() {
            initCards();
        },

        initSticky: function() {
            initSticky();
        },

        initAbsoluteDropdown: function(context) {
            initAbsoluteDropdown(context);
        },

        block: function(target, options) {
            var el = $(target);

            options = $.extend(true, {
                opacity: 0.05,
                overlayColor: '#000000',
                type: '',
                size: '',
                state: 'primary',
                centerX: true,
                centerY: true,
                message: '',
                shadow: true,
                width: 'auto'
            }, options);

            var html;
            var version = options.type ? 'spinner-' + options.type : '';
            var state = options.state ? 'spinner-' + options.state : '';
            var size = options.size ? 'spinner-' + options.size : '';
            var spinner = '<span class="spinner ' + version + ' ' + state + ' ' + size + '"></span';

            if (options.message && options.message.length > 0) {
                var classes = 'blockui ' + (options.shadow === false ? 'blockui' : '');

                html = '<div class="' + classes + '"><span>' + options.message + '</span>' + spinner + '</div>';

                var el = document.createElement('div');

                $('body').prepend(el);
                KTUtil.addClass(el, classes);
                el.innerHTML = html;
                options.width = KTUtil.actualWidth(el) + 10;
                KTUtil.remove(el);

                if (target == 'body') {
                    html = '<div class="' + classes + '" style="margin-left:-' + (options.width / 2) + 'px;"><span>' + options.message + '</span><span>' + spinner + '</span></div>';
                }
            } else {
                html = spinner;
            }

            var params = {
                message: html,
                centerY: options.centerY,
                centerX: options.centerX,
                css: {
                    top: '30%',
                    left: '50%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none',
                    width: options.width
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.opacity,
                    cursor: 'wait',
                    zIndex: (target == 'body' ? 1100 : 10)
                },
                onUnblock: function() {
                    if (el && el[0]) {
                        KTUtil.css(el[0], 'position', '');
                        KTUtil.css(el[0], 'zoom', '');
                    }
                }
            };

            if (target == 'body') {
                params.css.top = '50%';
                $.blockUI(params);
            } else {
                var el = $(target);
                el.block(params);
            }
        },

        unblock: function(target) {
            if (target && target != 'body') {
                $(target).unblock();
            } else {
                $.unblockUI();
            }
        },

        blockPage: function(options) {
            return KTApp.block('body', options);
        },

        unblockPage: function() {
            return KTApp.unblock('body');
        },

        getSettings: function() {
            return settings;
        }
    };
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTApp;
}

// Initialize KTApp class on document ready
$(document).ready(function() {
    KTApp.init(KTAppSettings);
});

"use strict";

// Component Definition
var KTCard = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        toggleSpeed: 400,
        sticky: {
            releseOnReverse: false,
            offset: 300,
            zIndex: 101
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (KTUtil.data(element).has('card')) {
                the = KTUtil.data(element).get('card');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('card', the);
            }

            return the;
        },

        /**
          * Init card
          */
        init: function(options) {
            the.element = element;
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
            the.header = KTUtil.child(element, '.card-header');
            the.footer = KTUtil.child(element, '.card-footer');

            if (KTUtil.child(element, '.card-body')) {
                the.body = KTUtil.child(element, '.card-body');
            } else if (KTUtil.child(element, '.form')) {
                the.body = KTUtil.child(element, '.form');
            }
        },

        /**
          * Build Form Wizard
          */
        build: function() {
            // Remove
            var remove = KTUtil.find(the.header, '[data-card-tool=remove]');
            if (remove) {
                KTUtil.addEvent(remove, 'click', function(e) {
                    e.preventDefault();
                    Plugin.remove();
                });
            }

            // Reload
            var reload = KTUtil.find(the.header, '[data-card-tool=reload]');
            if (reload) {
                KTUtil.addEvent(reload, 'click', function(e) {
                    e.preventDefault();
                    Plugin.reload();
                });
            }

            // Toggle
            var toggle = KTUtil.find(the.header, '[data-card-tool=toggle]');
            if (toggle) {
                KTUtil.addEvent(toggle, 'click', function(e) {
                    e.preventDefault();
                    Plugin.toggle();
                });
            }
        },

        /**
          * Enable stickt mode
          */
        initSticky: function() {
            var lastScrollTop = 0;
            var offset = the.options.sticky.offset;

            if (!the.header) {
                return;
            }

          window.addEventListener('scroll', Plugin.onScrollSticky);
        },

      /**
        * Window scroll handle event for sticky card
        */
      onScrollSticky: function(e) {
        var offset = the.options.sticky.offset;

        if(isNaN(offset)) return;

        var st = KTUtil.getScrollTop();

        if (st >= offset && KTUtil.hasClass(body, 'card-sticky-on') === false) {
          Plugin.eventTrigger('stickyOn');

          KTUtil.addClass(body, 'card-sticky-on');

          Plugin.updateSticky();

        } else if ((st*1.5) <= offset && KTUtil.hasClass(body, 'card-sticky-on')) {
          // Back scroll mode
          Plugin.eventTrigger('stickyOff');

          KTUtil.removeClass(body, 'card-sticky-on');

          Plugin.resetSticky();
        }
      },

        updateSticky: function() {
            if (!the.header) {
                return;
            }

            var top;

            if (KTUtil.hasClass(body, 'card-sticky-on')) {
                if (the.options.sticky.position.top instanceof Function) {
                    top = parseInt(the.options.sticky.position.top.call(this, the));
                } else {
                    top = parseInt(the.options.sticky.position.top);
                }

                var left;
                if (the.options.sticky.position.left instanceof Function) {
                    left = parseInt(the.options.sticky.position.left.call(this, the));
                } else {
                    left = parseInt(the.options.sticky.position.left);
                }

                var right;
                if (the.options.sticky.position.right instanceof Function) {
                    right = parseInt(the.options.sticky.position.right.call(this, the));
                } else {
                    right = parseInt(the.options.sticky.position.right);
                }

                KTUtil.css(the.header, 'z-index', the.options.sticky.zIndex);
                KTUtil.css(the.header, 'top', top + 'px');
                KTUtil.css(the.header, 'left', left + 'px');
                KTUtil.css(the.header, 'right', right + 'px');
            }
        },

        resetSticky: function() {
            if (!the.header) {
                return;
            }

            if (KTUtil.hasClass(body, 'card-sticky-on') === false) {
                KTUtil.css(the.header, 'z-index', '');
                KTUtil.css(the.header, 'top', '');
                KTUtil.css(the.header, 'left', '');
                KTUtil.css(the.header, 'right', '');
            }
        },

        /**
          * Remove card
          */
        remove: function() {
            if (Plugin.eventTrigger('beforeRemove') === false) {
                return;
            }

            KTUtil.remove(element);

            Plugin.eventTrigger('afterRemove');
        },

        /**
          * Set content
          */
        setContent: function(html) {
            if (html) {
                the.body.innerHTML = html;
            }
        },

        /**
          * Get body
          */
        getBody: function() {
            return the.body;
        },

        /**
          * Get self
          */
        getSelf: function() {
            return element;
        },

        /**
          * Reload
          */
        reload: function() {
            Plugin.eventTrigger('reload');
        },

        /**
          * Toggle
          */
        toggle: function() {
            if (KTUtil.hasClass(element, 'card-collapse') || KTUtil.hasClass(element, 'card-collapsed')) {
                Plugin.expand();
            } else {
                Plugin.collapse();
            }
        },

        /**
          * Collapse
          */
        collapse: function() {
            if (Plugin.eventTrigger('beforeCollapse') === false) {
                return;
            }

            KTUtil.slideUp(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterCollapse');
            });

            KTUtil.addClass(element, 'card-collapse');
        },

        /**
          * Expand
          */
        expand: function() {
            if (Plugin.eventTrigger('beforeExpand') === false) {
                return;
            }

            KTUtil.slideDown(the.body, the.options.toggleSpeed, function() {
                Plugin.eventTrigger('afterExpand');
            });

            KTUtil.removeClass(element, 'card-collapse');
            KTUtil.removeClass(element, 'card-collapsed');
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name) {
            //KTUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Remove card
      */
    the.remove = function() {
        return Plugin.remove(html);
    };

    /**
      * Init sticky card
      */
    the.initSticky = function() {
        return Plugin.initSticky();
    };

    /**
      * Rerender sticky layout
      */
    the.updateSticky = function() {
        return Plugin.updateSticky();
    };

    /**
      * Reset the sticky
      */
    the.resetSticky = function() {
        return Plugin.resetSticky();
    };

  /**
    * Destroy sticky card
    */
  the.destroySticky = function() {
    Plugin.resetSticky();
    window.removeEventListener('scroll', Plugin.onScrollSticky);
  };

    /**
      * Reload card
      */
    the.reload = function() {
        return Plugin.reload();
    };

    /**
      * Set card content
      */
    the.setContent = function(html) {
        return Plugin.setContent(html);
    };

    /**
      * Toggle card
      */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
      * Collapse card
      */
    the.collapse = function() {
        return Plugin.collapse();
    };

    /**
      * Expand card
      */
    the.expand = function() {
        return Plugin.expand();
    };

    /**
      * Get cardbody
      * @returns {jQuery}
      */
    the.getBody = function() {
        return Plugin.getBody();
    };

    /**
      * Get cardbody
      * @returns {jQuery}
      */
    the.getSelf = function() {
        return Plugin.getSelf();
    };

    /**
      * Attach event
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTCard;
}

"use strict";
// DOCS: https://javascript.info/cookie

// Component Definition
var KTCookie = function() {
  return {
    // returns the cookie with the given name,
    // or undefined if not found
    getCookie: function(name) {
      var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    // Please note that a cookie value is encoded,
    // so getCookie uses a built-in decodeURIComponent function to decode it.
    setCookie: function(name, value, options) {
      if (!options) {
          options = {};
      }

      options = Object.assign({}, {path: '/'}, options);

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (var optionKey in options) {
        if (!options.hasOwnProperty(optionKey)) {
          continue;
        }
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    },
    // To delete a cookie, we can call it with a negative expiration date:
    deleteCookie: function(name) {
      setCookie(name, "", {
        'max-age': -1
      })
    }
  }
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTCookie;
}

"use strict";

// Component Definition 
var KTDialog = function(options) {
    // Main object
    var the = this;

    // Get element object
    var element;
    var body = KTUtil.getBody();

    // Default options
    var defaultOptions = {
        'placement' : 'top center',
        'type'  : 'loader',
        'width' : 100,
        'state' : 'default',
        'message' : 'Loading...'
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Construct
          */

        construct: function(options) {
            Plugin.init(options);

            return the;
        },

        /**
          * Handles subtoggle click toggle
          */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            the.state = false;
        },

        /**
          * Show dialog
          */
        show: function() {
            Plugin.eventTrigger('show');

            element = document.createElement("DIV");
            KTUtil.setHTML(element, the.options.message);

            KTUtil.addClass(element, 'dialog dialog-shown');
            KTUtil.addClass(element, 'dialog-' + the.options.state);
            KTUtil.addClass(element, 'dialog-' + the.options.type);

            if (the.options.placement == 'top center') {
                KTUtil.addClass(element, 'dialog-top-center');
            }

            body.appendChild(element);

            the.state = 'shown';

            Plugin.eventTrigger('shown');

            return the;
        },

        /**
          * Hide dialog
          */
        hide: function() {
            if (element) {
                Plugin.eventTrigger('hide');

                element.remove();
                the.state = 'hidden';

                Plugin.eventTrigger('hidden');
            }

            return the;
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];

                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Check shown state
      */
    the.shown = function() {
        return the.state == 'shown';
    };

    /**
      * Check hidden state
      */
    the.hidden = function() {
        return the.state == 'hidden';
    };

    /**
      * Show dialog
      */
    the.show = function() {
        return Plugin.show();
    };

    /**
      * Hide dialog
      */
    the.hide = function() {
        return Plugin.hide();
    };

    /**
      * Attach event
      * @returns {KTToggle}
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      * @returns {KTToggle}
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTDialog;
}

"use strict";

// Component Definition
var KTHeader = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (element === undefined) {
        return;
    }

    // Default options
    var defaultOptions = {
        offset: {
            desktop: true,
            tabletAndMobile: true
        },
        releseOnReverse: {
            desktop: false,
            tabletAndMobile: false
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Run plugin
          * @returns {KTHeader}
          */
        construct: function(options) {
            if (KTUtil.data(element).has('header')) {
                the = KTUtil.data(element).get('header');
            } else {
                // reset header
                Plugin.init(options);

                // build header
                Plugin.build();

                KTUtil.data(element).set('header', the);
            }

            return the;
        },

        /**
          * Handles subheader click toggle
          * @returns {KTHeader}
          */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        /**
          * Reset header
          * @returns {KTHeader}
          */
        build: function() {
            var eventTriggerState = true;
            var lastScrollTop = 0;

            window.addEventListener('scroll', function() {
                var offset = 0, st, attrName;

                if (KTUtil.isBreakpointDown('lg') && the.options.offset.tabletAndMobile === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg') && the.options.offset.desktop === false) {
                    return;
                }

                if (KTUtil.isBreakpointUp('lg')) {
                    offset = the.options.offset.desktop;
                } else if (KTUtil.isBreakpointDown('lg')) {
                    offset = the.options.offset.tabletAndMobile;
                }

                st = KTUtil.getScrollTop();

                if (
                    (KTUtil.isBreakpointDown('lg') && the.options.releseOnReverse.tabletAndMobile) ||
                    (KTUtil.isBreakpointUp('lg') && the.options.releseOnReverse.desktop)
                ) {
                    if (st > offset && lastScrollTop < st) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }

                    lastScrollTop = st;
                } else {
                    if (st > offset) { // down scroll mode
                        if (body.hasAttribute('data-header-scroll') === false) {
                            body.setAttribute('data-header-scroll', 'on');
                        }

                        if (eventTriggerState) {
                            Plugin.eventTrigger('scrollOn', the);
                            eventTriggerState = false;
                        }
                    } else { // back scroll mode
                        if (body.hasAttribute('data-header-scroll') === true) {
                            body.removeAttribute('data-header-scroll');
                        }

                        if (eventTriggerState == false) {
                            Plugin.eventTrigger('scrollOff', the);
                            eventTriggerState = true;
                        }
                    }
                }
            });
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Register event
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTHeader;
}

"use strict";

// Component Definition 
var KTImageInput = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        editMode: false
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Construct
          */

        construct: function(options) {
            if (KTUtil.data(element).has('imageinput')) {
                the = KTUtil.data(element).get('imageinput');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('imageinput', the);
            }

            return the;
        },

        /**
          * Init avatar
          */
        init: function(options) {
            the.element = element;
            the.events = [];

            the.input = KTUtil.find(element, 'input[type="file"]');
            the.wrapper = KTUtil.find(element, '.image-input-wrapper');
            the.cancel = KTUtil.find(element, '[data-action="cancel"]');
            the.remove = KTUtil.find(element, '[data-action="remove"]');
            the.src = KTUtil.css(the.wrapper, 'backgroundImage');
            the.hidden = KTUtil.find(element, 'input[type="hidden"]');

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        /**
          * Build
          */
        build: function() {
            // Handle change
            KTUtil.addEvent(the.input, 'change', function(e) {
                e.preventDefault();

              if (the.input && the.input.files && the.input.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                      KTUtil.css(the.wrapper, 'background-image', 'url('+e.target.result +')');
                  }
                  reader.readAsDataURL(the.input.files[0]);

                  KTUtil.addClass(the.element, 'image-input-changed');
                    KTUtil.removeClass(the.element, 'image-input-empty');

                    // Fire change event
                    Plugin.eventTrigger('change');
              }
            });

            // Handle cancel
            KTUtil.addEvent(the.cancel, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('cancel');

              KTUtil.removeClass(the.element, 'image-input-changed');
                KTUtil.removeClass(the.element, 'image-input-empty');
              KTUtil.css(the.wrapper, 'background-image', the.src);
              the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "0";
                }
            });

            // Handle remove
            KTUtil.addEvent(the.remove, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('remove');

              KTUtil.removeClass(the.element, 'image-input-changed');
                KTUtil.addClass(the.element, 'image-input-empty');
              KTUtil.css(the.wrapper, 'background-image', "none");
              the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "1";
                }
            });
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name) {
            //KTUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Attach event
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTImageInput;
}

"use strict";

// Component Definition
var KTMenu = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        // scrollable area with Perfect Scroll
        scroll: {
            rememberPosition: false
        },

        // accordion submenu mode
        accordion: {
            slideSpeed: 200, // accordion toggle slide speed in milliseconds
            autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
            autoScrollSpeed: 1200,
            expandAll: true // allow having multiple expanded accordions in the menu
        },

        // dropdown submenu mode
        dropdown: {
            timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Run plugin
          * @returns {KTMenu}
          */
        construct: function(options) {
            if (KTUtil.data(element).has('menu')) {
                the = KTUtil.data(element).get('menu');
            } else {
                // reset menu
                Plugin.init(options);

                // reset menu
                Plugin.reset();

                // build menu
                Plugin.build();

                KTUtil.data(element).set('menu', the);
            }

            return the;
        },

        /**
          * Handles submenu click toggle
          * @returns {KTMenu}
          */
        init: function(options) {
            the.events = [];

            the.eventHandlers = {};

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

            the.uid = KTUtil.getUniqueID();
        },

        update: function(options) {
            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

              // reset menu
            Plugin.reset();

            the.eventHandlers = {};

            // build menu
            Plugin.build();

            KTUtil.data(element).set('menu', the);
        },

        reload: function() {
              // reset menu
            Plugin.reset();

            // build menu
            Plugin.build();

            // reset submenu props
            Plugin.resetSubmenuProps();
        },

        /**
          * Reset menu
          * @returns {KTMenu}
          */
        build: function() {
            // General accordion submenu toggle
            the.eventHandlers['event_1'] = KTUtil.on( element, '.menu-toggle', 'click', Plugin.handleSubmenuAccordion);

            // Dropdown mode(hoverable)
            if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
                // dropdown submenu - hover toggle
                the.eventHandlers['event_2'] = KTUtil.on( element, '[data-menu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
                the.eventHandlers['event_3'] = KTUtil.on( element, '[data-menu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit);

                // dropdown submenu - click toggle
                the.eventHandlers['event_4'] = KTUtil.on( element, '[data-menu-toggle="click"] > .menu-toggle, [data-menu-toggle="click"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownClick);
                the.eventHandlers['event_5'] = KTUtil.on( element, '[data-menu-toggle="tab"] > .menu-toggle, [data-menu-toggle="tab"] > .menu-link .menu-toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
            }

            // Handle general link click
            the.eventHandlers['event_6'] = KTUtil.on(element, '.menu-item > .menu-link:not(.menu-toggle):not(.menu-link-toggle-skip)', 'click', Plugin.handleLinkClick);

            // Init scrollable menu
            if (the.options.scroll && the.options.scroll.height) {
                Plugin.scrollInit();
            }
        },

        /**
          * Reset menu
          * @returns {KTMenu}
          */
        reset: function() {
            KTUtil.off( element, 'click', the.eventHandlers['event_1']);

            // dropdown submenu - hover toggle
            KTUtil.off( element, 'mouseover', the.eventHandlers['event_2']);
            KTUtil.off( element, 'mouseout', the.eventHandlers['event_3']);

            // dropdown submenu - click toggle
            KTUtil.off( element, 'click', the.eventHandlers['event_4']);
            KTUtil.off( element, 'click', the.eventHandlers['event_5']);

            // handle link click
            KTUtil.off(element, 'click', the.eventHandlers['event_6']);
        },

        /**
          * Init scroll menu
          *
        */
        scrollInit: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollDestroy(element, true);
                KTUtil.scrollInit(element, {mobileNativeScroll: true, windowScroll: false, resetHeightOnDestroy: true, handleWindowResize: true, height: the.options.scroll.height, rememberPosition: the.options.scroll.rememberPosition});
            } else {
                KTUtil.scrollDestroy(element, true);
            }
        },

        /**
          * Update scroll menu
        */
        scrollUpdate: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollUpdate(element);
            }
        },

        /**
          * Scroll top
        */
        scrollTop: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                KTUtil.scrollTop(element);
            }
        },

        /**
          * Get submenu mode for current breakpoint and menu state
          * @returns {KTMenu}
          */
        getSubmenuMode: function(el) {
            if ( KTUtil.isBreakpointUp('lg') ) {
                if (el && KTUtil.hasAttr(el, 'data-menu-toggle') && KTUtil.attr(el, 'data-menu-toggle') == 'hover') {
                    return 'dropdown';
                }

                if ( KTUtil.isset(the.options.submenu, 'desktop.state.body') ) {
                    if ( KTUtil.hasClasses(body, the.options.submenu.desktop.state.body) ) {
                        return the.options.submenu.desktop.state.mode;
                    } else {
                        return the.options.submenu.desktop.default;
                    }
                } else if ( KTUtil.isset(the.options.submenu, 'desktop') ) {
                    return the.options.submenu.desktop;
                }
            } else if ( KTUtil.isBreakpointUp('md') && KTUtil.isBreakpointDown('lg') && KTUtil.isset(the.options.submenu, 'tablet') ) {
                return the.options.submenu.tablet;
            } else if ( KTUtil.isBreakpointDown('md') && KTUtil.isset(the.options.submenu, 'mobile') ) {
                return the.options.submenu.mobile;
            } else {
                return false;
            }
        },

        /**
          * Get submenu mode for current breakpoint and menu state
          * @returns {KTMenu}
          */
        isConditionalSubmenuDropdown: function() {
            if ( KTUtil.isBreakpointUp('lg') && KTUtil.isset(the.options.submenu, 'desktop.state.body') ) {
                return true;
            } else {
                return false;
            }
        },


        /**
          * Reset submenu attributes
          * @returns {KTMenu}
          */
        resetSubmenuProps: function(e) {
            var submenus = KTUtil.findAll(element, '.menu-submenu');
            if ( submenus ) {
                for (var i = 0, len = submenus.length; i < len; i++) {
                    var submenu = submenus[0];

                    KTUtil.css(submenu, 'display', '');
                    KTUtil.css(submenu, 'overflow', '');

                    if (submenu.hasAttribute('data-hor-direction')) {
                        KTUtil.removeClass(submenu, 'menu-submenu-left');
                        KTUtil.removeClass(submenu, 'menu-submenu-right');
                        KTUtil.addClass(submenu, submenu.getAttribute('data-hor-direction'));
                    }
                }
            }
        },

        /**
          * Handles submenu hover toggle
          * @returns {KTMenu}
          */
        handleSubmenuDrodownHoverEnter: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            var item = this;

            if ( item.getAttribute('data-hover') == '1' ) {
                item.removeAttribute('data-hover');
                clearTimeout( item.getAttribute('data-timeout') );
                item.removeAttribute('data-timeout');
            }

            Plugin.showSubmenuDropdown(item);
        },

        /**
          * Handles submenu hover toggle
          * @returns {KTMenu}
          */
        handleSubmenuDrodownHoverExit: function(e) {
            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this;
            var time = the.options.dropdown.timeout;

            var timeout = setTimeout(function() {
                if ( item.getAttribute('data-hover') == '1' ) {
                    Plugin.hideSubmenuDropdown(item, true);
                }
            }, time);

            item.setAttribute('data-hover', '1');
            item.setAttribute('data-timeout', timeout);
        },

        /**
          * Handles submenu click toggle
          * @returns {KTMenu}
          */
        handleSubmenuDropdownClick: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this.closest('.menu-item');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if ( item.getAttribute('data-menu-submenu-mode') == 'accordion' ) {
                return;
            }

            if ( KTUtil.hasClass(item, 'menu-item-hover') === false ) {
                KTUtil.addClass(item, 'menu-item-open-dropdown');
                Plugin.showSubmenuDropdown(item);
            } else {
                KTUtil.removeClass(item, 'menu-item-open-dropdown' );
                Plugin.hideSubmenuDropdown(item, true);
            }

            e.preventDefault();
        },

        /**
          * Handles tab click toggle
          * @returns {KTMenu}
          */
        handleSubmenuDropdownTabClick: function(e) {
            if (Plugin.getSubmenuMode(this) === 'accordion') {
                return;
            }
            var item = this.closest('.menu-item');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if (item.getAttribute('data-menu-submenu-mode') == 'accordion') {
                return;
            }

            if (KTUtil.hasClass(item, 'menu-item-hover') == false) {
                KTUtil.addClass(item, 'menu-item-open-dropdown');
                Plugin.showSubmenuDropdown(item);
            }

            e.preventDefault();
        },

        /**
          * Handles link click
          * @returns {KTMenu}
          */
        handleLinkClick: function(e) {
            var submenu = this.closest('.menu-item.menu-item-submenu');

            // Trigger click event handlers
            var result = Plugin.eventTrigger('linkClick', this, e);
            if (result === false) {
                return;
            }

            if ( submenu && Plugin.getSubmenuMode(submenu) === 'dropdown' ) {
                Plugin.hideSubmenuDropdowns();
            }
        },

        /**
          * Handles submenu dropdown close on link click
          * @returns {KTMenu}
          */
        handleSubmenuDropdownClose: function(e, el) {
            // exit if its not submenu dropdown mode
            if (Plugin.getSubmenuMode(el) === 'accordion') {
                return;
            }

            var shown = element.querySelectorAll('.menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)');

            // check if currently clicked link's parent item ha
            if (shown.length > 0 && KTUtil.hasClass(el, 'menu-toggle') === false && el.querySelectorAll('.menu-toggle').length === 0) {
                // close opened dropdown menus
                for (var i = 0, len = shown.length; i < len; i++) {
                    Plugin.hideSubmenuDropdown(shown[0], true);
                }
            }
        },

        /**
          * helper functions
          * @returns {KTMenu}
          */
        handleSubmenuAccordion: function(e, el) {
            var query;
            var item = el ? el : this;

            // Trigger click event handlers
            var result = Plugin.eventTrigger('submenuToggle', this, e);
            if (result === false) {
                return;
            }

            if ( Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.menu-item') ) ) {
                if (query.getAttribute('data-menu-submenu-mode') != 'accordion' ) {
                    e.preventDefault();
                    return;
                }
            }

            var li = item.closest('.menu-item');
            var submenu = KTUtil.child(li, '.menu-submenu, .menu-inner');

            if (KTUtil.hasClass(item.closest('.menu-item'), 'menu-item-open-always')) {
                return;
            }

            if ( li && submenu ) {
                e.preventDefault();
                var speed = the.options.accordion.slideSpeed;
                var hasClosables = false;

                if ( KTUtil.hasClass(li, 'menu-item-open') === false ) {
                    // hide other accordions
                    if ( the.options.accordion.expandAll === false ) {
                        var subnav = item.closest('.menu-nav, .menu-subnav');
                        var closables = KTUtil.children(subnav, '.menu-item.menu-item-open.menu-item-submenu:not(.menu-item-here):not(.menu-item-open-always)');

                        if ( subnav && closables ) {
                            for (var i = 0, len = closables.length; i < len; i++) {
                                var el_ = closables[0];
                                var submenu_ = KTUtil.child(el_, '.menu-submenu');
                                if ( submenu_ ) {
                                    KTUtil.slideUp(submenu_, speed, function() {
                                        Plugin.scrollUpdate();
                                        KTUtil.removeClass(el_, 'menu-item-open');
                                    });
                                }
                            }
                        }
                    }

                    KTUtil.slideDown(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.scrollUpdate();

                        Plugin.eventTrigger('submenuToggle', submenu, e);
                    });

                    KTUtil.addClass(li, 'menu-item-open');

                } else {
                    KTUtil.slideUp(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.scrollUpdate();
                        Plugin.eventTrigger('submenuToggle', submenu, e);
                    });

                    KTUtil.removeClass(li, 'menu-item-open');
                }
            }
        },

        /**
          * scroll to item function
          * @returns {KTMenu}
          */
        scrollToItem: function(item) {
            // handle auto scroll for accordion submenus
            if ( KTUtil.isBreakpointUp('lg')  && the.options.accordion.autoScroll && element.getAttribute('data-menu-scroll') !== '1' ) {
                KTUtil.scrollTo(item, the.options.accordion.autoScrollSpeed);
            }
        },

        /**
          * Hide submenu dropdown
          * @returns {KTMenu}
          */
        hideSubmenuDropdown: function(item, classAlso) {
            // remove submenu activation class
            if ( classAlso ) {
                KTUtil.removeClass(item, 'menu-item-hover');
                KTUtil.removeClass(item, 'menu-item-active-tab');
            }

            // clear timeout
            item.removeAttribute('data-hover');

            if ( item.getAttribute('data-menu-toggle-class') ) {
                KTUtil.removeClass(body, item.getAttribute('data-menu-toggle-class'));
            }

            var timeout = item.getAttribute('data-timeout');
            item.removeAttribute('data-timeout');
            clearTimeout(timeout);
        },

        /**
          * Hide submenu dropdowns
          * @returns {KTMenu}
          */
        hideSubmenuDropdowns: function() {
            var items;
            if ( items = element.querySelectorAll('.menu-item-submenu.menu-item-hover:not(.menu-item-tabs):not([data-menu-toggle="tab"])') ) {
                for (var j = 0, cnt = items.length; j < cnt; j++) {
                    Plugin.hideSubmenuDropdown(items[j], true);
                }
            }
        },

        /**
          * helper functions
          * @returns {KTMenu}
          */
        showSubmenuDropdown: function(item) {
            // close active submenus
            var list = element.querySelectorAll('.menu-item-submenu.menu-item-hover, .menu-item-submenu.menu-item-active-tab');

            if ( list ) {
                for (var i = 0, len = list.length; i < len; i++) {
                    var el = list[i];
                    if ( item !== el && el.contains(item) === false && item.contains(el) === false ) {
                        Plugin.hideSubmenuDropdown(el, true);
                    }
                }
            }

            // add submenu activation class
            KTUtil.addClass(item, 'menu-item-hover');

            // Change the alignment of submenu is offscreen.
            var submenu = KTUtil.find(item, '.menu-submenu');

            if (submenu && submenu.hasAttribute('data-hor-direction') === false) {
                if (KTUtil.hasClass(submenu, 'menu-submenu-left')) {
                    submenu.setAttribute('data-hor-direction', 'menu-submenu-left');
                } else if (KTUtil.hasClass(submenu, 'menu-submenu-right')) {
                    submenu.setAttribute('data-hor-direction', 'menu-submenu-right');
                }
            }

            if ( submenu && KTUtil.isOffscreen(submenu, 'left', 15) === true ) {
                KTUtil.removeClass(submenu, 'menu-submenu-left');
                KTUtil.addClass(submenu, 'menu-submenu-right');
            } else if ( submenu && KTUtil.isOffscreen(submenu, 'right', 15) === true ) {
                KTUtil.removeClass(submenu, 'menu-submenu-right');
                KTUtil.addClass(submenu, 'menu-submenu-left');
            }

            if ( item.getAttribute('data-menu-toggle-class') ) {
                KTUtil.addClass(body, item.getAttribute('data-menu-toggle-class'));
            }
        },

        /**
          * Handles submenu slide toggle
          * @returns {KTMenu}
          */
        createSubmenuDropdownClickDropoff: function(el) {
            var query;
            var zIndex = (query = KTUtil.child(el, '.menu-submenu') ? KTUtil.css(query, 'z-index') : 0) - 1;

            var dropoff = document.createElement('<div class="menu-dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');

            body.appendChild(dropoff);

            KTUtil.addEvent(dropoff, 'click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                KTUtil.remove(this);
                Plugin.hideSubmenuDropdown(el, true);
            });
        },

        /**
          * Handles submenu hover toggle
          * @returns {KTMenu}
          */
        pauseDropdownHover: function(time) {
            var date = new Date();

            the.pauseDropdownHoverTime = date.getTime() + time;
        },

        /**
          * Handles submenu hover toggle
          * @returns {KTMenu}
          */
        resumeDropdownHover: function() {
            var date = new Date();

            return (date.getTime() > the.pauseDropdownHoverTime ? true : false);
        },

        /**
          * Reset menu's current active item
          * @returns {KTMenu}
          */
        resetActiveItem: function(item) {
            var list;
            var parents;

            list = element.querySelectorAll('.menu-item-active');

            for (var i = 0, len = list.length; i < len; i++) {
                var el = list[0];
                KTUtil.removeClass(el, 'menu-item-active');
                KTUtil.hide( KTUtil.child(el, '.menu-submenu') );
                parents = KTUtil.parents(el, '.menu-item-submenu') || [];

                for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
                    var el_ = parents[i];
                    KTUtil.removeClass(el_, 'menu-item-open');
                    KTUtil.hide( KTUtil.child(el_, '.menu-submenu') );
                }
            }

            // close open submenus
            if ( the.options.accordion.expandAll === false ) {
                if ( list = element.querySelectorAll('.menu-item-open') ) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        KTUtil.removeClass(parents[0], 'menu-item-open');
                    }
                }
            }
        },

        /**
          * Sets menu's active item
          * @returns {KTMenu}
          */
        setActiveItem: function(item) {
            // reset current active item
            Plugin.resetActiveItem();

            var parents = KTUtil.parents(item, '.menu-item-submenu') || [];
            for (var i = 0, len = parents.length; i < len; i++) {
                KTUtil.addClass(parents[i], 'menu-item-open');
            }

            KTUtil.addClass(item, 'menu-item-active');
        },

        /**
          * Returns page breadcrumbs for the menu's active item
          * @returns {KTMenu}
          */
        getBreadcrumbs: function(item) {
            var query;
            var breadcrumbs = [];
            var link = KTUtil.child(item, '.menu-link');

            breadcrumbs.push({
                text: (query = KTUtil.child(link, '.menu-text') ? query.innerHTML : ''),
                title: link.getAttribute('title'),
                href: link.getAttribute('href')
            });

            var parents = KTUtil.parents(item, '.menu-item-submenu');
            for (var i = 0, len = parents.length; i < len; i++) {
                var submenuLink = KTUtil.child(parents[i], '.menu-link');

                breadcrumbs.push({
                    text: (query = KTUtil.child(submenuLink, '.menu-text') ? query.innerHTML : ''),
                    title: submenuLink.getAttribute('title'),
                    href: submenuLink.getAttribute('href')
                });
            }

            return  breadcrumbs.reverse();
        },

        /**
          * Returns page title for the menu's active item
          * @returns {KTMenu}
          */
        getPageTitle: function(item) {
            var query;

            return (query = KTUtil.child(item, '.menu-text') ? query.innerHTML : '');
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name, target, e) {
            for (var i = 0; i < the.events.length; i++ ) {
                var event = the.events[i];
                if ( event.name == name ) {
                    if ( event.one == true ) {
                        if ( event.fired == false ) {
                            the.events[i].fired = true;
                            return event.handler.call(this, target, e);
                        }
                    } else {
                        return event.handler.call(this, target, e);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        },

        removeEvent: function(name) {
            if (the.events[name]) {
                delete the.events[name];
            }
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Update scroll
      */
    the.scrollUpdate = function() {
        return Plugin.scrollUpdate();
    };

    /**
      * Re-init scroll
      */
    the.scrollReInit = function() {
        return Plugin.scrollInit();
    };

    /**
      * Scroll top
      */
    the.scrollTop = function() {
        return Plugin.scrollTop();
    };

    /**
      * Set active menu item
      */
    the.setActiveItem = function(item) {
        return Plugin.setActiveItem(item);
    };

    the.reload = function() {
        return Plugin.reload();
    };

    the.update = function(options) {
        return Plugin.update(options);
    };

    /**
      * Set breadcrumb for menu item
      */
    the.getBreadcrumbs = function(item) {
        return Plugin.getBreadcrumbs(item);
    };

    /**
      * Set page title for menu item
      */
    the.getPageTitle = function(item) {
        return Plugin.getPageTitle(item);
    };

    /**
      * Get submenu mode
      */
    the.getSubmenuMode = function(el) {
        return Plugin.getSubmenuMode(el);
    };

    /**
      * Hide dropdown
      * @returns {Object}
      */
    the.hideDropdown = function(item) {
        Plugin.hideSubmenuDropdown(item, true);
    };

    /**
      * Hide dropdowns
      * @returns {Object}
      */
    the.hideDropdowns = function() {
        Plugin.hideSubmenuDropdowns();
    };

    /**
      * Disable menu for given time
      * @returns {Object}
      */
    the.pauseDropdownHover = function(time) {
        Plugin.pauseDropdownHover(time);
    };

    /**
      * Disable menu for given time
      * @returns {Object}
      */
    the.resumeDropdownHover = function() {
        return Plugin.resumeDropdownHover();
    };

    /**
      * Register event
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    the.off = function(name) {
        return Plugin.removeEvent(name);
    };

    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Handle plugin on window resize
    KTUtil.addResizeHandler(function() {
        if (init) {
            the.reload();
        }
    });

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTMenu;
}

// Plugin global lazy initialization
document.addEventListener("click", function (e) {
    var body = KTUtil.getByTagName('body')[0];
    var query;
    if ( query = body.querySelectorAll('.menu-nav .menu-item.menu-item-submenu.menu-item-hover:not(.menu-item-tabs)[data-menu-toggle="click"]') ) {
        for (var i = 0, len = query.length; i < len; i++) {
            var element = query[i].closest('.menu-nav').parentNode;

            if ( element ) {
                var the = KTUtil.data(element).get('menu');

                if ( !the ) {
                    break;
                }

                if ( !the || the.getSubmenuMode() !== 'dropdown' ) {
                    break;
                }

                if ( e.target !== element && element.contains(e.target) === false ) {
                    the.hideDropdowns();
                }
            }
        }
    }
});

"use strict";

// Component Definition
var KTOffcanvas = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        attrCustom: ''
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        construct: function(options) {
            if (KTUtil.data(element).has('offcanvas')) {
                the = KTUtil.data(element).get('offcanvas');
            } else {
                // Reset offcanvas
                Plugin.init(options);

                // Build offcanvas
                Plugin.build();

                KTUtil.data(element).set('offcanvas', the);
            }

            return the;
        },

        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            the.classBase = the.options.baseClass;
            the.attrCustom = the.options.attrCustom;
            the.classShown = the.classBase + '-on';
            the.classOverlay = the.classBase + '-overlay';
            the.target;

            the.state = KTUtil.hasClass(element, the.classShown) ? 'shown' : 'hidden';
        },

        build: function() {
            // offcanvas toggle
            if (the.options.toggleBy) {
                if (typeof the.options.toggleBy === 'string') {
                    KTUtil.addEvent(KTUtil.getById(the.options.toggleBy), 'click', function(e) {
                        e.preventDefault();
                        the.target = this;
                        Plugin.toggle();
                    });
                } else if (the.options.toggleBy && the.options.toggleBy[0]) {
                    if (the.options.toggleBy[0].target) {
                        for (var i in the.options.toggleBy) {
                            KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i].target), 'click', function(e) {
                                e.preventDefault();
                                the.target = this;
                                Plugin.toggle();
                            });
                        }
                    } else {
                        for (var i in the.options.toggleBy) {
                            KTUtil.addEvent(KTUtil.getById(the.options.toggleBy[i]), 'click', function(e) {
                                e.preventDefault();
                                the.target = this;
                                Plugin.toggle();
                            });
                        }
                    }

                } else if (the.options.toggleBy && the.options.toggleBy.target) {
                    KTUtil.addEvent( KTUtil.getById(the.options.toggleBy.target), 'click', function(e) {
                        e.preventDefault();
                        the.target = this;
                        Plugin.toggle();
                    });
                }
            }

            // offcanvas close
            var closeBy = KTUtil.getById(the.options.closeBy);
            if (closeBy) {
                KTUtil.addEvent(closeBy, 'click', function(e) {
                    e.preventDefault();
                    the.target = this;
                    Plugin.hide();
                });
            }
        },

        isShown: function() {
            return (the.state == 'shown' ? true : false);
        },

        toggle: function() {;
            Plugin.eventTrigger('toggle');

            if (the.state == 'shown') {
                Plugin.hide();
            } else {
                Plugin.show();
            }
        },

        show: function() {
            if (the.state == 'shown') {
                return;
            }

            Plugin.eventTrigger('beforeShow');

            Plugin.toggleClass('show');

            // Offcanvas panel
            KTUtil.attr(body, 'data-offcanvas-' + the.classBase, 'on');
            KTUtil.addClass(element, the.classShown);

            if (the.attrCustom.length > 0) {
                KTUtil.attr(body, 'data-offcanvas-' + the.classCustom, 'on');
                //KTUtil.addClass(body, the.classCustom);
            }

            the.state = 'shown';

            if (the.options.overlay) {
                the.overlay = KTUtil.insertAfter(document.createElement('DIV') , element );
                KTUtil.addClass(the.overlay, the.classOverlay);

                KTUtil.addEvent(the.overlay, 'click', function(e) {
                    //e.stopPropagation();
                    e.preventDefault();
                    Plugin.hide(the.target);
                });
            }

            Plugin.eventTrigger('afterShow');
        },

        hide: function() {
            if (the.state == 'hidden') {
                return;
            }

            Plugin.eventTrigger('beforeHide');

            Plugin.toggleClass('hide');

            KTUtil.removeAttr(body, 'data-offcanvas-' + the.classBase);
            KTUtil.removeClass(element, the.classShown);

            if (the.attrCustom.length > 0) {
                KTUtil.removeAttr(body, 'data-offcanvas-' + the.attrCustom);
            }

            the.state = 'hidden';

            if (the.options.overlay && the.overlay) {
                KTUtil.remove(the.overlay);
            }

            Plugin.eventTrigger('afterHide');
        },

        toggleClass: function(mode) {
            var id = KTUtil.attr(the.target, 'id');
            var toggleBy;

            if (the.options.toggleBy && the.options.toggleBy[0] && the.options.toggleBy[0].target) {
                for (var i in the.options.toggleBy) {
                    if (the.options.toggleBy[i].target === id) {
                        toggleBy = the.options.toggleBy[i];
                    }
                }
            } else if (the.options.toggleBy && the.options.toggleBy.target) {
                toggleBy = the.options.toggleBy;
            }

            if (toggleBy) {
                var el = KTUtil.getById(toggleBy.target);

                if (mode === 'show') {
                    KTUtil.addClass(el, toggleBy.state);
                }

                if (mode === 'hide') {
                    KTUtil.removeClass(el, toggleBy.state);
                }
            }
        },

        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      * @param options
      */
    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Check if canvas is shown
      * @returns {boolean}
      */
    the.isShown = function() {
        return Plugin.isShown();
    };

    /**
      * Set to hide the canvas
      */
    the.hide = function() {
        return Plugin.hide();
    };

    /**
      * Set to show the canvas
      */
    the.show = function() {
        return Plugin.show();
    };

    /**
      * Attach event
      * @param name
      * @param handler
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      * @param name
      * @param handler
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTOffcanvas;
}

"use strict";

// Component Definition
var KTScrolltop = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        offset: 300,
        speed: 6000
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Run plugin
          * @returns {mscrolltop}
          */
        construct: function(options) {
            if (KTUtil.data(element).has('scrolltop')) {
                the = KTUtil.data(element).get('scrolltop');
            } else {
                // reset scrolltop
                Plugin.init(options);

                // build scrolltop
                Plugin.build();

                KTUtil.data(element).set('scrolltop', the);
            }

            return the;
        },

        /**
          * Handles subscrolltop click toggle
          * @returns {mscrolltop}
          */
        init: function(options) {
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);
        },

        build: function() {
            var timer;

            window.addEventListener('scroll', function() {
                KTUtil.throttle(timer, function() {
                    Plugin.handle();
                }, 200);
            });

            // handle button click
            KTUtil.addEvent(element, 'click', Plugin.scroll);
        },

        /**
          * Handles scrolltop click scrollTop
          */
        handle: function() {
            var pos = KTUtil.getScrollTop(); // current vertical position

            if (pos > the.options.offset) {
                if (body.hasAttribute('data-scrolltop') === false) {
                    body.setAttribute('data-scrolltop', 'on');
                }
            } else {
                if (body.hasAttribute('data-scrolltop') === true) {
                    body.removeAttribute('data-scrolltop');
                }
            }
        },

        /**
          * Handles scrolltop click scrollTop
          */
        scroll: function(e) {
            e.preventDefault();

            KTUtil.scrollTop(0, the.options.speed);
        },


        /**
          * Trigger events
          */
        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the, args);
                        }
                    } else {
                        return event.handler.call(this, the, args);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Get subscrolltop mode
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Set scrolltop content
      * @returns {mscrolltop}
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTScrolltop;
}

"use strict";

// Component Definition
var KTToggle = function(toggleElement, targetElement, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = toggleElement;
    var target = targetElement;

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        targetToggleMode: 'class' // class|attribute
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Construct
          */

        construct: function(options) {
            if (KTUtil.data(element).has('toggle')) {
                the = KTUtil.data(element).get('toggle');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('toggle', the);
            }

            return the;
        },

        /**
          * Handles subtoggle click toggle
          */
        init: function(options) {
            the.element = element;
            the.events = [];

            // Merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            //alert(the.options.target.tagName);
            the.target = target;

            the.targetState = the.options.targetState;
            the.toggleState = the.options.toggleState;

            if (the.options.targetToggleMode == 'class') {
                the.state = KTUtil.hasClasses(the.target, the.targetState) ? 'on' : 'off';
            } else {
                the.state = KTUtil.hasAttr(the.target, 'data-' + the.targetState) ? KTUtil.attr(the.target, 'data-' + the.targetState) : 'off';
            }
        },

        /**
          * Setup toggle
          */
        build: function() {
            KTUtil.addEvent(element, 'mouseup', Plugin.toggle);
        },

        /**
          * Handles offcanvas click toggle
          */
        toggle: function(e) {
            Plugin.eventTrigger('beforeToggle');

            if (the.state == 'off') {
                Plugin.toggleOn();
            } else {
                Plugin.toggleOff();
            }

            Plugin.eventTrigger('afterToggle');

            e.preventDefault();

            return the;
        },

        /**
          * Handles toggle click toggle
          */
        toggleOn: function() {
            Plugin.eventTrigger('beforeOn');

            if (the.options.targetToggleMode == 'class') {
                KTUtil.addClass(the.target, the.targetState);
            } else {
                KTUtil.attr(the.target, 'data-' + the.targetState, 'on');
            }

            if (the.toggleState) {
                KTUtil.addClass(element, the.toggleState);
            }

            the.state = 'on';

            Plugin.eventTrigger('afterOn');

            Plugin.eventTrigger('toggle');

            return the;
        },

        /**
          * Handles toggle click toggle
          */
        toggleOff: function() {
            Plugin.eventTrigger('beforeOff');

            if (the.options.targetToggleMode == 'class') {
                KTUtil.removeClass(the.target, the.targetState);
            } else {
                KTUtil.removeAttr(the.target, 'data-' + the.targetState);
            }

            if (the.toggleState) {
                KTUtil.removeClass(element, the.toggleState);
            }

            the.state = 'off';

            Plugin.eventTrigger('afterOff');

            Plugin.eventTrigger('toggle');

            return the;
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name) {
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];

                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Get toggle state
      */
    the.getState = function() {
        return the.state;
    };

    /**
      * Toggle
      */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
      * Toggle on
      */
    the.toggleOn = function() {
        return Plugin.toggleOn();
    };

    /**
      * Toggle off
      */
    the.toggleOff = function() {
        return Plugin.toggleOff();
    };

    /**
      * Attach event
      * @returns {KTToggle}
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      * @returns {KTToggle}
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTToggle;
}

"use strict";

/**
  * @class KTUtil  base utilize class that privides helper functions
  */

// Polyfills
/**
  * Element.matches() polyfill (simple version)
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

/**
  * Element.closest() polyfill
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  */
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}

/**
  * ChildNode.remove() polyfill
  * https://gomakethings.com/removing-an-element-from-the-dom-the-es6-way/
  * @author Chris Ferdinandi
  * @license MIT
  */
(function (elem) {
  for (var i = 0; i < elem.length; i++) {
    if (!window[elem[i]] || 'remove' in window[elem[i]].prototype) continue;
    window[elem[i]].prototype.remove = function () {
      this.parentNode.removeChild(this);
    };
  }
})(['Element', 'CharacterData', 'DocumentType']);


//
// requestAnimationFrame polyfill by Erik Möller.
//  With fixes from Paul Irish and Tino Zijdel
//
//  http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//  http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//
//  MIT license
//
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function(arr) {
    arr.forEach(function(item) {
        if (item.hasOwnProperty('prepend')) {
            return;
        }
        Object.defineProperty(item, 'prepend', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function prepend() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.insertBefore(docFrag, this.firstChild);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// getAttributeNames
if (Element.prototype.getAttributeNames == undefined) {
  Element.prototype.getAttributeNames = function () {
    var attributes = this.attributes;
    var length = attributes.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      result[i] = attributes[i].name;
    }
    return result;
  };
}

// Global variables
window.KTUtilElementDataStore = {};
window.KTUtilElementDataStoreID = 0;
window.KTUtilDelegatedEventHandlers = {};

var KTUtil = function() {
    var resizeHandlers = [];

    /** @type {object} breakpoints The device width breakpoints **/
    var breakpoints = {
        sm: 544, // Small screen / phone
        md: 768, // Medium screen / tablet
        lg: 992, // Large screen / desktop
        xl: 1200 // Extra large screen / wide desktop
    };

    /**
      * Handle window resize event with some
      * delay to attach event handlers upon resize complete
      */
    var _windowResizeHandler = function() {
        var _runResizeHandlers = function() {
            // reinitialize other subscribed elements
            for (var i = 0; i < resizeHandlers.length; i++) {
                var each = resizeHandlers[i];
                each.call();
            }
        };

        var timer;

        window.addEventListener('resize', function() {
            KTUtil.throttle(timer, function() {
                _runResizeHandlers();
            }, 200);
        });
    };

    return {
        /**
          * Class main initializer.
          * @param {object} settings.
          * @returns null
          */
        //main function to initiate the theme
        init: function(settings) {
            if (settings && settings.breakpoints) {
                breakpoints = settings.breakpoints;
            }

            _windowResizeHandler();
        },

        /**
          * Adds window resize event handler.
          * @param {function} callback function.
          */
        addResizeHandler: function(callback) {
            resizeHandlers.push(callback);
        },

        /**
          * Removes window resize event handler.
          * @param {function} callback function.
          */
        removeResizeHandler: function(callback) {
            for (var i = 0; i < resizeHandlers.length; i++) {
                if (callback === resizeHandlers[i]) {
                    delete resizeHandlers[i];
                }
            }
        },

        /**
          * Trigger window resize handlers.
          */
        runResizeHandlers: function() {
            _runResizeHandlers();
        },

        resize: function() {
            if (typeof(Event) === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            } else {
                // for IE and other old browsers
                // causes deprecation warning on modern browsers
                var evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
        },

        /**
          * Get GET parameter value from URL.
          * @param {string} paramName Parameter name.
          * @returns {string}
          */
        getURLParam: function(paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }

            return null;
        },

        /**
          * Checks whether current device is mobile touch.
          * @returns {boolean}
          */
        isMobileDevice: function() {
            var test = (this.getViewPort().width < this.getBreakpoint('lg') ? true : false);

            if (test === false) {
                // For use within normal web clients
                test = navigator.userAgent.match(/iPad/i) != null;
            }

            return test;
        },

        /**
          * Checks whether current device is desktop.
          * @returns {boolean}
          */
        isDesktopDevice: function() {
            return KTUtil.isMobileDevice() ? false : true;
        },

        /**
          * Gets browser window viewport size. Ref:
          * http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
          * @returns {object}
          */
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        /**
          * Checks whether given device mode is currently activated.
          * @param {string} mode Responsive mode name(e.g: desktop,
          *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
          * @returns {boolean}
          */
        isInResponsiveRange: function(mode) {
            var breakpoint = this.getViewPort().width;

            if (mode == 'general') {
                return true;
            } else if (mode == 'desktop' && breakpoint >= (this.getBreakpoint('lg') + 1)) {
                return true;
            } else if (mode == 'tablet' && (breakpoint >= (this.getBreakpoint('md') + 1) && breakpoint < this.getBreakpoint('lg'))) {
                return true;
            } else if (mode == 'mobile' && breakpoint <= this.getBreakpoint('md')) {
                return true;
            } else if (mode == 'desktop-and-tablet' && breakpoint >= (this.getBreakpoint('md') + 1)) {
                return true;
            } else if (mode == 'tablet-and-mobile' && breakpoint <= this.getBreakpoint('lg')) {
                return true;
            } else if (mode == 'minimal-desktop-and-below' && breakpoint <= this.getBreakpoint('xl')) {
                return true;
            }

            return false;
        },

    /**
          * Checks whether given device mode is currently activated.
          * @param {string} mode Responsive mode name(e.g: desktop,
          *     desktop-and-tablet, tablet, tablet-and-mobile, mobile)
          * @returns {boolean}
          */
        isBreakpointUp: function(mode) {
            var width = this.getViewPort().width;
      var breakpoint = this.getBreakpoint(mode);

      return (width >= breakpoint);
        },

    isBreakpointDown: function(mode) {
            var width = this.getViewPort().width;
      var breakpoint = this.getBreakpoint(mode);

      return (width < breakpoint);
        },

        /**
          * Generates unique ID for give prefix.
          * @param {string} prefix Prefix for generated ID
          * @returns {boolean}
          */
        getUniqueID: function(prefix) {
            return prefix + Math.floor(Math.random() * (new Date()).getTime());
        },

        /**
          * Gets window width for give breakpoint mode.
          * @param {string} mode Responsive mode name(e.g: xl, lg, md, sm)
          * @returns {number}
          */
        getBreakpoint: function(mode) {
            return breakpoints[mode];
        },

        /**
          * Checks whether object has property matchs given key path.
          * @param {object} obj Object contains values paired with given key path
          * @param {string} keys Keys path seperated with dots
          * @returns {object}
          */
        isset: function(obj, keys) {
            var stone;

            keys = keys || '';

            if (keys.indexOf('[') !== -1) {
                throw new Error('Unsupported object path notation.');
            }

            keys = keys.split('.');

            do {
                if (obj === undefined) {
                    return false;
                }

                stone = keys.shift();

                if (!obj.hasOwnProperty(stone)) {
                    return false;
                }

                obj = obj[stone];

            } while (keys.length);

            return true;
        },

        /**
          * Gets highest z-index of the given element parents
          * @param {object} el jQuery element object
          * @returns {number}
          */
        getHighestZindex: function(el) {
            var position, value;

            while (el && el !== document) {
                // Ignore z-index if position is set to a value where z-index is ignored by the browser
                // This makes behavior of this function consistent across browsers
                // WebKit always returns auto if the element is positioned
                position = KTUtil.css(el, 'position');

                if (position === "absolute" || position === "relative" || position === "fixed") {
                    // IE returns 0 when zIndex is not specified
                    // other browsers return a string
                    // we ignore the case of nested elements with an explicit value of 0
                    // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                    value = parseInt(KTUtil.css(el, 'z-index'));

                    if (!isNaN(value) && value !== 0) {
                        return value;
                    }
                }

                el = el.parentNode;
            }

            return null;
        },

        /**
          * Checks whether the element has any parent with fixed positionfreg
          * @param {object} el jQuery element object
          * @returns {boolean}
          */
        hasFixedPositionedParent: function(el) {
            var position;

            while (el && el !== document) {
                position = KTUtil.css(el, 'position');

                if (position === "fixed") {
                    return true;
                }

                el = el.parentNode;
            }

            return false;
        },

        /**
          * Simulates delay
          */
        sleep: function(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        },

        /**
          * Gets randomly generated integer value within given min and max range
          * @param {number} min Range start value
          * @param {number} max Range end value
          * @returns {number}
          */
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        /**
          * Checks whether Angular library is included
          * @returns {boolean}
          */
        isAngularVersion: function() {
            return window.Zone !== undefined ? true : false;
        },

        // Deep extend:  $.extend(true, {}, objA, objB);
        deepExtend: function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];
                if (!obj) continue;

                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) {
                        continue;
                    }

                    // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
                    if ( Object.prototype.toString.call(obj[key]) === '[object Object]' ) {
                        out[key] = KTUtil.deepExtend(out[key], obj[key]);
                        continue;
                    }

                    out[key] = obj[key];
                }
            }

            return out;
        },

        // extend:  $.extend({}, objA, objB);
        extend: function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                }
            }

            return out;
        },

        getById: function(el) {
            if (typeof el === 'string') {
                return document.getElementById(el);
            } else {
                return el;
            }
        },

        getByTag: function(query) {
            return document.getElementsByTagName(query);
        },

        getByTagName: function(query) {
            return document.getElementsByTagName(query);
        },

        getByClass: function(query) {
            return document.getElementsByClassName(query);
        },

        getBody: function() {
            return document.getElementsByTagName('body')[0];
        },

        /**
          * Checks whether the element has given classes
          * @param {object} el jQuery element object
          * @param {string} Classes string
          * @returns {boolean}
          */
        hasClasses: function(el, classes) {
            if (!el) {
                return;
            }

            var classesArr = classes.split(" ");

            for (var i = 0; i < classesArr.length; i++) {
                if (KTUtil.hasClass(el, KTUtil.trim(classesArr[i])) == false) {
                    return false;
                }
            }

            return true;
        },

        hasClass: function(el, className) {
            if (!el) {
                return;
            }

            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        },

        addClass: function(el, className) {
            if (!el || typeof className === 'undefined') {
                return;
            }

            var classNames = className.split(' ');

            if (el.classList) {
                for (var i = 0; i < classNames.length; i++) {
                    if (classNames[i] && classNames[i].length > 0) {
                        el.classList.add(KTUtil.trim(classNames[i]));
                    }
                }
            } else if (!KTUtil.hasClass(el, className)) {
                for (var x = 0; x < classNames.length; x++) {
                    el.className += ' ' + KTUtil.trim(classNames[x]);
                }
            }
        },

        removeClass: function(el, className) {
          if (!el || typeof className === 'undefined') {
                return;
            }

            var classNames = className.split(' ');

            if (el.classList) {
                for (var i = 0; i < classNames.length; i++) {
                    el.classList.remove(KTUtil.trim(classNames[i]));
                }
            } else if (KTUtil.hasClass(el, className)) {
                for (var x = 0; x < classNames.length; x++) {
                    el.className = el.className.replace(new RegExp('\\b' + KTUtil.trim(classNames[x]) + '\\b', 'g'), '');
                }
            }
        },

        triggerCustomEvent: function(el, eventName, data) {
            var event;
            if (window.CustomEvent) {
                event = new CustomEvent(eventName, {
                    detail: data
                });
            } else {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent(eventName, true, true, data);
            }

            el.dispatchEvent(event);
        },

        triggerEvent: function(node, eventName) {
            // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
            var doc;
            if (node.ownerDocument) {
                doc = node.ownerDocument;
            } else if (node.nodeType == 9) {
                // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
                doc = node;
            } else {
                throw new Error("Invalid node passed to fireEvent: " + node.id);
            }

            if (node.dispatchEvent) {
                // Gecko-style approach (now the standard) takes more work
                var eventClass = "";

                // Different events have different event classes.
                // If this switch statement can't map an eventName to an eventClass,
                // the event firing is going to fail.
                switch (eventName) {
                case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
                case "mouseenter":
                case "mouseleave":
                case "mousedown":
                case "mouseup":
                    eventClass = "MouseEvents";
                    break;

                case "focus":
                case "change":
                case "blur":
                case "select":
                    eventClass = "HTMLEvents";
                    break;

                default:
                    throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                    break;
                }
                var event = doc.createEvent(eventClass);

                var bubbles = eventName == "change" ? false : true;
                event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.

                event.synthetic = true; // allow detection of synthetic events
                // The second parameter says go ahead with the default action
                node.dispatchEvent(event, true);
            } else if (node.fireEvent) {
                // IE-old school style
                var event = doc.createEventObject();
                event.synthetic = true; // allow detection of synthetic events
                node.fireEvent("on" + eventName, event);
            }
        },

        index: function( el ){
            var c = el.parentNode.children, i = 0;
            for(; i < c.length; i++ )
                if( c[i] == el ) return i;
        },

        trim: function(string) {
            return string.trim();
        },

        eventTriggered: function(e) {
            if (e.currentTarget.dataset.triggered) {
                return true;
            } else {
                e.currentTarget.dataset.triggered = true;

                return false;
            }
        },

        remove: function(el) {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        },

        find: function(parent, query) {
            parent = KTUtil.getById(parent);
            if (parent) {
                return parent.querySelector(query);
            }
        },

        findAll: function(parent, query) {
            parent = KTUtil.getById(parent);
            if (parent) {
                return parent.querySelectorAll(query);
            }
        },

        insertAfter: function(el, referenceNode) {
            return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        },

        parents: function(elem, selector) {
            // Element.matches() polyfill
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function(s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) {}
                        return i > -1;
                    };
            }

            // Set up a parent array
            var parents = [];

            // Push each parent element to the array
            for ( ; elem && elem !== document; elem = elem.parentNode ) {
                if (selector) {
                    if (elem.matches(selector)) {
                        parents.push(elem);
                    }
                    continue;
                }
                parents.push(elem);
            }

            // Return our parent array
            return parents;
        },

        children: function(el, selector, log) {
            if (!el || !el.childNodes) {
                return;
            }

            var result = [],
                i = 0,
                l = el.childNodes.length;

            for (var i; i < l; ++i) {
                if (el.childNodes[i].nodeType == 1 && KTUtil.matches(el.childNodes[i], selector, log)) {
                    result.push(el.childNodes[i]);
                }
            }

            return result;
        },

        child: function(el, selector, log) {
            var children = KTUtil.children(el, selector, log);

            return children ? children[0] : null;
        },

        matches: function(el, selector, log) {
            var p = Element.prototype;
            var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };

            if (el && el.tagName) {
                return f.call(el, selector);
            } else {
                return false;
            }
        },

        data: function(el) {
            return {
                set: function(name, data) {
                    if (!el) {
                        return;
                    }

                    if (el.customDataTag === undefined) {
                        window.KTUtilElementDataStoreID++;
                        el.customDataTag = window.KTUtilElementDataStoreID;
                    }

                    if (window.KTUtilElementDataStore[el.customDataTag] === undefined) {
                        window.KTUtilElementDataStore[el.customDataTag] = {};
                    }

                    window.KTUtilElementDataStore[el.customDataTag][name] = data;
                },

                get: function(name) {
                    if (!el) {
                        return;
                    }

                    if (el.customDataTag === undefined) {
                        return null;
                    }

                    return this.has(name) ? window.KTUtilElementDataStore[el.customDataTag][name] : null;
                },

                has: function(name) {
                    if (!el) {
                        return false;
                    }

                    if (el.customDataTag === undefined) {
                        return false;
                    }

                    return (window.KTUtilElementDataStore[el.customDataTag] && window.KTUtilElementDataStore[el.customDataTag][name]) ? true : false;
                },

                remove: function(name) {
                    if (el && this.has(name)) {
                        delete window.KTUtilElementDataStore[el.customDataTag][name];
                    }
                }
            };
        },

        outerWidth: function(el, margin) {
            var width;

            if (margin === true) {
                width = parseFloat(el.offsetWidth);
                width += parseFloat(KTUtil.css(el, 'margin-left')) + parseFloat(KTUtil.css(el, 'margin-right'));

                return parseFloat(width);
            } else {
                width = parseFloat(el.offsetWidth);

                return width;
            }
        },

        offset: function(el) {
            var rect, win;

            if ( !el ) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error

            if ( !el.getClientRects().length ) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = el.getBoundingClientRect();
            win = el.ownerDocument.defaultView;

            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },

        height: function(el) {
            return KTUtil.css(el, 'height');
        },

        outerHeight: function(el, withMargin) {
            var height = el.offsetHeight;
            var style;

            if (typeof withMargin !== 'undefined' && withMargin === true) {
                style = getComputedStyle(el);
                height += parseInt(style.marginTop) + parseInt(style.marginBottom);

                return height;
            } else {
                return height;
            }
        },

        visible: function(el) {
            return !(el.offsetWidth === 0 && el.offsetHeight === 0);
        },

        attr: function(el, name, value) {
            if (el == undefined) {
                return;
            }

            if (value !== undefined) {
                el.setAttribute(name, value);
            } else {
                return el.getAttribute(name);
            }
        },

        hasAttr: function(el, name) {
            if (el == undefined) {
                return;
            }

            return el.getAttribute(name) ? true : false;
        },

        removeAttr: function(el, name) {
            if (el == undefined) {
                return;
            }

            el.removeAttribute(name);
        },

        animate: function(from, to, duration, update, easing, done) {
            /**
              * TinyAnimate.easings
              *  Adapted from jQuery Easing
              */
            var easings = {};
            var easing;

            easings.linear = function(t, b, c, d) {
                return c * t / d + b;
            };

            easing = easings.linear;

            // Early bail out if called incorrectly
            if (typeof from !== 'number' ||
                typeof to !== 'number' ||
                typeof duration !== 'number' ||
                typeof update !== 'function') {
                return;
            }

            // Create mock done() function if necessary
            if (typeof done !== 'function') {
                done = function() {};
            }

            // Pick implementation (requestAnimationFrame | setTimeout)
            var rAF = window.requestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 50);
            };

            // Animation loop
            var canceled = false;
            var change = to - from;

            function loop(timestamp) {
                var time = (timestamp || +new Date()) - start;

                if (time >= 0) {
                    update(easing(time, from, change, duration));
                }
                if (time >= 0 && time >= duration) {
                    update(to);
                    done();
                } else {
                    rAF(loop);
                }
            }

            update(from);

            // Start animation loop
            var start = window.performance && window.performance.now ? window.performance.now() : +new Date();

            rAF(loop);
        },

        actualCss: function(el, prop, cache) {
            var css = '';

            if (el instanceof HTMLElement === false) {
                return;
            }

            if (!el.getAttribute('kt-hidden-' + prop) || cache === false) {
                var value;

                // the element is hidden so:
                // making the el block so we can meassure its height but still be hidden
                css = el.style.cssText;
                el.style.cssText = 'position: absolute; visibility: hidden; display: block;';

                if (prop == 'width') {
                    value = el.offsetWidth;
                } else if (prop == 'height') {
                    value = el.offsetHeight;
                }

                el.style.cssText = css;

                // store it in cache
                el.setAttribute('kt-hidden-' + prop, value);

                return parseFloat(value);
            } else {
                // store it in cache
                return parseFloat(el.getAttribute('kt-hidden-' + prop));
            }
        },

        actualHeight: function(el, cache) {
            return KTUtil.actualCss(el, 'height', cache);
        },

        actualWidth: function(el, cache) {
            return KTUtil.actualCss(el, 'width', cache);
        },

        getScroll: function(element, method) {
            // The passed in `method` value should be 'Top' or 'Left'
            method = 'scroll' + method;
            return (element == window || element == document) ? (
                self[(method == 'scrollTop') ? 'pageYOffset' : 'pageXOffset'] ||
                (browserSupportsBoxModel && document.documentElement[method]) ||
                document.body[method]
            ) : element[method];
        },

        css: function(el, styleProp, value) {
            if (!el) {
                return;
            }

            if (value !== undefined) {
                el.style[styleProp] = value;
            } else {
                var defaultView = (el.ownerDocument || document).defaultView;
                // W3C standard way:
                if (defaultView && defaultView.getComputedStyle) {
                    // sanitize property name to css notation
                    // (hyphen separated words eg. font-Size)
                    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                } else if (el.currentStyle) { // IE
                    // sanitize property name to camelCase
                    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                        return letter.toUpperCase();
                    });
                    value = el.currentStyle[styleProp];
                    // convert other units to pixels on IE
                    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        return (function(value) {
                            var oldLeft = el.style.left,
                                oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                        })(value);
                    }
                    return value;
                }
            }
        },

        slide: function(el, dir, speed, callback, recalcMaxHeight) {
            if (!el || (dir == 'up' && KTUtil.visible(el) === false) || (dir == 'down' && KTUtil.visible(el) === true)) {
                return;
            }

            speed = (speed ? speed : 600);
            var calcHeight = KTUtil.actualHeight(el);
            var calcPaddingTop = false;
            var calcPaddingBottom = false;

            if (KTUtil.css(el, 'padding-top') && KTUtil.data(el).has('slide-padding-top') !== true) {
                KTUtil.data(el).set('slide-padding-top', KTUtil.css(el, 'padding-top'));
            }

            if (KTUtil.css(el, 'padding-bottom') && KTUtil.data(el).has('slide-padding-bottom') !== true) {
                KTUtil.data(el).set('slide-padding-bottom', KTUtil.css(el, 'padding-bottom'));
            }

            if (KTUtil.data(el).has('slide-padding-top')) {
                calcPaddingTop = parseInt(KTUtil.data(el).get('slide-padding-top'));
            }

            if (KTUtil.data(el).has('slide-padding-bottom')) {
                calcPaddingBottom = parseInt(KTUtil.data(el).get('slide-padding-bottom'));
            }

            if (dir == 'up') { // up
                el.style.cssText = 'display: block; overflow: hidden;';

                if (calcPaddingTop) {
                    KTUtil.animate(0, calcPaddingTop, speed, function(value) {
                        el.style.paddingTop = (calcPaddingTop - value) + 'px';
                    }, 'linear');
                }

                if (calcPaddingBottom) {
                    KTUtil.animate(0, calcPaddingBottom, speed, function(value) {
                        el.style.paddingBottom = (calcPaddingBottom - value) + 'px';
                    }, 'linear');
                }

                KTUtil.animate(0, calcHeight, speed, function(value) {
                    el.style.height = (calcHeight - value) + 'px';
                }, 'linear', function() {
                    el.style.height = '';
                    el.style.display = 'none';

                    if (typeof callback === 'function') {
                        callback();
                    }
                });


            } else if (dir == 'down') { // down
                el.style.cssText = 'display: block; overflow: hidden;';

                if (calcPaddingTop) {
                    KTUtil.animate(0, calcPaddingTop, speed, function(value) {//
                        el.style.paddingTop = value + 'px';
                    }, 'linear', function() {
                        el.style.paddingTop = '';
                    });
                }

                if (calcPaddingBottom) {
                    KTUtil.animate(0, calcPaddingBottom, speed, function(value) {
                        el.style.paddingBottom = value + 'px';
                    }, 'linear', function() {
                        el.style.paddingBottom = '';
                    });
                }

                KTUtil.animate(0, calcHeight, speed, function(value) {
                    el.style.height = value + 'px';
                }, 'linear', function() {
                    el.style.height = '';
                    el.style.display = '';
                    el.style.overflow = '';

                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        },

        slideUp: function(el, speed, callback) {
            KTUtil.slide(el, 'up', speed, callback);
        },

        slideDown: function(el, speed, callback) {
            KTUtil.slide(el, 'down', speed, callback);
        },

        show: function(el, display) {
            if (typeof el !== 'undefined') {
                el.style.display = (display ? display : 'block');
            }
        },

        hide: function(el) {
            if (typeof el !== 'undefined') {
                el.style.display = 'none';
            }
        },

        addEvent: function(el, type, handler, one) {
            if (typeof el !== 'undefined' && el !== null) {
                el.addEventListener(type, handler);
            }
        },

        removeEvent: function(el, type, handler) {
            if (el !== null) {
                el.removeEventListener(type, handler);
            }
        },

        on: function(element, selector, event, handler) {
            if (!selector) {
                return;
            }

            var eventId = KTUtil.getUniqueID('event');

            window.KTUtilDelegatedEventHandlers[eventId] = function(e) {
                var targets = element.querySelectorAll(selector);
                var target = e.target;

                while (target && target !== element) {
                    for (var i = 0, j = targets.length; i < j; i++) {
                        if (target === targets[i]) {
                            handler.call(target, e);
                        }
                    }

                    target = target.parentNode;
                }
            }

            KTUtil.addEvent(element, event, window.KTUtilDelegatedEventHandlers[eventId]);

            return eventId;
        },

        off: function(element, event, eventId) {
            if (!element || !window.KTUtilDelegatedEventHandlers[eventId]) {
                return;
            }

            KTUtil.removeEvent(element, event, window.KTUtilDelegatedEventHandlers[eventId]);

            delete window.KTUtilDelegatedEventHandlers[eventId];
        },

        one: function onetime(el, type, callback) {
            el.addEventListener(type, function callee(e) {
                // remove event
                if (e.target && e.target.removeEventListener) {
                    e.target.removeEventListener(e.type, callee);
                }

                // need to verify from https://themeforest.net/author_dashboard#comment_23615588
                if (el && el.removeEventListener) {
            e.currentTarget.removeEventListener(e.type, callee);
          }

                // call handler
                return callback(e);
            });
        },

        hash: function(str) {
            var hash = 0,
                i, chr;

            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }

            return hash;
        },

        animateClass: function(el, animationName, callback) {
            var animation;
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
                msAnimation: 'msAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    animation = animations[t];
                }
            }

            KTUtil.addClass(el, 'animated ' + animationName);

            KTUtil.one(el, animation, function() {
                KTUtil.removeClass(el, 'animated ' + animationName);
            });

            if (callback) {
                KTUtil.one(el, animation, callback);
            }
        },

        transitionEnd: function(el, callback) {
            var transition;
            var transitions = {
                transition: 'transitionend',
                OTransition: 'oTransitionEnd',
                MozTransition: 'mozTransitionEnd',
                WebkitTransition: 'webkitTransitionEnd',
                msTransition: 'msTransitionEnd'
            };

            for (var t in transitions) {
                if (el.style[t] !== undefined) {
                    transition = transitions[t];
                }
            }

            KTUtil.one(el, transition, callback);
        },

        animationEnd: function(el, callback) {
            var animation;
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
                msAnimation: 'msAnimationEnd'
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    animation = animations[t];
                }
            }

            KTUtil.one(el, animation, callback);
        },

        animateDelay: function(el, value) {
            var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
            for (var i = 0; i < vendors.length; i++) {
                KTUtil.css(el, vendors[i] + 'animation-delay', value);
            }
        },

        animateDuration: function(el, value) {
            var vendors = ['webkit-', 'moz-', 'ms-', 'o-', ''];
            for (var i = 0; i < vendors.length; i++) {
                KTUtil.css(el, vendors[i] + 'animation-duration', value);
            }
        },

        scrollTo: function(target, offset, duration) {
            var duration = duration ? duration : 500;
            var targetPos = target ? KTUtil.offset(target).top : 0;
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var from, to;

            if (offset) {
                scrollPos += offset;
            }

            from = scrollPos;
            to = targetPos;

            KTUtil.animate(from, to, duration, function(value) {
                document.documentElement.scrollTop = value;
                document.body.parentNode.scrollTop = value;
                document.body.scrollTop = value;
            }); //, easing, done
        },

        scrollTop: function(offset, duration) {
            KTUtil.scrollTo(null, offset, duration);
        },

        isArray: function(obj) {
            return obj && Array.isArray(obj);
        },

        ready: function(callback) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        },

        isEmpty: function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        },

        numberString: function(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },

        detectIE: function() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        },

        isRTL: function() {
            var html = KTUtil.getByTagName('html')[0];

            if (html) {
                return (KTUtil.attr(html, 'direction') == 'rtl');
            }
        },

        // Scroller
        scrollInit: function(element, options) {
            if (!element) {
                return;
            }

            // Learn more: https://github.com/mdbootstrap/perfect-scrollbar#options
            var pluginDefOptions = {
                wheelSpeed: 0.5,
                swipeEasing: true,
                wheelPropagation: false,
                minScrollbarLength: 40,
                maxScrollbarLength: 300,
                suppressScrollX: true
            };

            options = KTUtil.deepExtend({}, pluginDefOptions, options);

            // Define init function
            function init() {
                var ps;
                var height;

                // Get extra options via data attributes
                var attrs = element.getAttributeNames();
                if (attrs.length > 0) {
                    attrs.forEach(function(attrName) {
                  // more options; https://github.com/ganlanyuan/tiny-slider#options
                  if ((/^data-.*/g).test(attrName)) {
                            if (['scroll', 'height', 'mobile-height'].includes(optionName) == false) {
                                var optionName = attrName.replace('data-', '').toLowerCase().replace(/(?:[\s-])\w/g, function(match) {
                          return match.replace('-', '').toUpperCase();
                        });

                                options[optionName] = KTUtil.filterBoolean(element.getAttribute(attrName));
                            }
                  }
                });
                }

                if (options.height instanceof Function) {
                    height = options.height.call();
                } else {
                    if (KTUtil.isMobileDevice() === true && options.mobileHeight) {
                        height = parseInt(options.mobileHeight);
                    } else if (options.height) {
                        height = parseInt(options.height);
                    } else {
                        height = parseInt(KTUtil.css(element, 'height'));
                    }
                }

                if (height === false) {
                    KTUtil.scrollDestroy(element, true);

                    return;
                }

                height = parseInt(height);

                // Destroy scroll on table and mobile modes
                if ((options.mobileNativeScroll || options.disableForMobile) && KTUtil.isMobileDevice() === true) {
                    ps = KTUtil.data(element).get('ps');
                    if (ps) {
                        if (options.resetHeightOnDestroy) {
                            KTUtil.css(element, 'height', 'auto');
                        } else {
                            KTUtil.css(element, 'overflow', 'auto');
                            if (height > 0) {
                                KTUtil.css(element, 'height', height + 'px');
                            }
                        }

                        ps.destroy();
                        ps = KTUtil.data(element).remove('ps');
                    } else if (height > 0){
                        KTUtil.css(element, 'overflow', 'auto');
                        KTUtil.css(element, 'height', height + 'px');
                    }

                    return;
                }

                if (height > 0) {
                    KTUtil.css(element, 'height', height + 'px');
                }

                if (options.desktopNativeScroll) {
                    KTUtil.css(element, 'overflow', 'auto');
                    return;
                }

                // Pass options via HTML Attributes
                if (KTUtil.attr(element, 'data-window-scroll') == 'true') {
                      options.windowScroll = true;
                }

                // Init scroll
                ps = KTUtil.data(element).get('ps');

                if (ps) {
                    ps.update();
                } else {
                    KTUtil.css(element, 'overflow', 'hidden');
                    KTUtil.addClass(element, 'scroll');

                    ps = new PerfectScrollbar(element, options);

                    KTUtil.data(element).set('ps', ps);
                }

                // Remember scroll position in cookie
                var uid = KTUtil.attr(element, 'id');

                // Todo:Consider using Localstorage
                if (options.rememberPosition === true && KTCookie && uid) {
                    if (KTCookie.getCookie(uid)) {
                        var pos = parseInt(KTCookie.getCookie(uid));

                        if (pos > 0) {
                            element.scrollTop = pos;
                        }
                    }

                    element.addEventListener('ps-scroll-y', function() {
                        KTCookie.setCookie(uid, element.scrollTop);
                    });
                }
            }

            // Init
            init();

            // Handle window resize
            if (options.handleWindowResize) {
                KTUtil.addResizeHandler(function() {
                    init();
                });
            }
        },

        scrollUpdate: function(element) {
            var ps = KTUtil.data(element).get('ps');
            if (ps) {
                ps.update();
            }
        },

        scrollUpdateAll: function(parent) {
            var scrollers = KTUtil.findAll(parent, '.ps');
            for (var i = 0, len = scrollers.length; i < len; i++) {
                KTUtil.scrollUpdate(scrollers[i]);
            }
        },

        scrollDestroy: function(element, resetAll) {
            var ps = KTUtil.data(element).get('ps');

            if (ps) {
                ps.destroy();
                ps = KTUtil.data(element).remove('ps');
            }

            if (element && resetAll) {
                element.style.setProperty('overflow', '');
                element.style.setProperty('height', '');
            }
        },

        filterBoolean: function(val) {
            // Convert string boolean
      if (val === true || val === 'true') {
        return true;
      }

      if (val === false || val === 'false') {
        return false;
      }

            return val;
        },

        setHTML: function(el, html) {
            el.innerHTML = html;
        },

        getHTML: function(el) {
            if (el) {
                return el.innerHTML;
            }
        },

        getDocumentHeight: function() {
            var body = document.body;
            var html = document.documentElement;

            return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        },

        getScrollTop: function() {
            return  (document.scrollingElement || document.documentElement).scrollTop;
        },

        changeColor: function(col, amt) {

            var usePound = false;

            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }

            var num = parseInt(col,16);

            var r = (num >> 16) + amt;

            if (r > 255) r = 255;
            else if  (r < 0) r = 0;

            var b = ((num >> 8) & 0x00FF) + amt;

            if (b > 255) b = 255;
            else if  (b < 0) b = 0;

            var g = (num & 0x0000FF) + amt;

            if (g > 255) g = 255;
            else if (g < 0) g = 0;

            return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

        },

        // Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
        throttle:  function (timer, func, delay) {
          // If setTimeout is already scheduled, no need to do anything
          if (timer) {
            return;
          }

          // Schedule a setTimeout after delay seconds
          timer  =  setTimeout(function () {
            func();

            // Once setTimeout function execution is finished, timerId = undefined so that in <br>
            // the next scroll event function execution can be scheduled by the setTimeout
            timer  =  undefined;
          }, delay);
        },

        // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
        debounce: function (timer, func, delay) {
          // Cancels the setTimeout method execution
          clearTimeout(timer)

          // Executes the func after delay time.
          timer  =  setTimeout(func, delay);
        },

        btnWait: function(el, cls, message, disable) {
            if (!el) {
                return;
            }

            if (typeof disable !== 'undefined' && disable === true) {
                KTUtil.attr(el, "disabled", true);
            }

            if (cls) {
                KTUtil.addClass(el, cls);
                KTUtil.attr(el, "wait-class", cls);
            }

            if (message) {
                var caption = KTUtil.find(el, '.btn-caption');

                if (caption) {
                    KTUtil.data(caption).set('caption', KTUtil.getHTML(caption));
                    KTUtil.setHTML(caption, message);
                } else {
                    KTUtil.data(el).set('caption', KTUtil.getHTML(el));
                    KTUtil.setHTML(el, message);
                }
            }
        },

        btnRelease: function(el) {
            if (!el) {
                return;
            }

            /// Show loading state on button
            KTUtil.removeAttr(el, "disabled");

            if (KTUtil.hasAttr(el, "wait-class")) {
                KTUtil.removeClass(el, KTUtil.attr(el, "wait-class"));
            }

            var caption = KTUtil.find(el, '.btn-caption');

            if (caption && KTUtil.data(caption).has('caption')) {
                KTUtil.setHTML(caption, KTUtil.data(caption).get('caption'));
            } else if (KTUtil.data(el).has('caption')) {
                KTUtil.setHTML(el, KTUtil.data(el).get('caption'));
            }
        },

        isOffscreen: function(el, direction, offset) {
            offset = offset || 0;

            var windowWidth = KTUtil.getViewPort().width;
            var windowHeight = KTUtil.getViewPort().height;

            var top = KTUtil.offset(el).top;
            var height = KTUtil.outerHeight(el) + offset;
            var left = KTUtil.offset(el).left;
            var width = KTUtil.outerWidth(el) + offset;

            if (direction == 'bottom') {
                if (windowHeight < top + height) {
                    return true;
                } else if (windowHeight > top + height * 1.5) {
                    return true;
                }
            }

            if (direction == 'top') {
                if (top < 0) {
                    return true;
                } else if (top > height) {
                    return true;
                }
            }

            if (direction == 'left') {
                if (left < 0) {
                    return true;
                } else if (left * 2 > width) {
                    //console.log('left 2');
                    //return true;
                }
            }

            if (direction == 'right') {
                if (windowWidth < left + width) {
                    return true;
                } else {
                    //console.log('right 2');
                    //return true;
                }
            }

            return false;
        }
    }
}();

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTUtil;
}

// Initialize KTUtil class on document ready
KTUtil.ready(function() {
  if (typeof KTAppSettings !== 'undefined') {
    KTUtil.init(KTAppSettings);
  } else {
    KTUtil.init();
  }
});

// CSS3 Transitions only after page load(.page-loading class added to body tag and remove with JS on page load)
window.onload = function() {
    var result = KTUtil.getByTagName('body');
    if (result && result[0]) {
        KTUtil.removeClass(result[0], 'page-loading');
    }
}

"use strict";

// Component Definition
var KTWizard = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = KTUtil.getById(elementId);
    var body = KTUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        startStep: 1,
        clickableSteps: false // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
          * Construct
          */

        construct: function(options) {
            if (KTUtil.data(element).has('wizard')) {
                the = KTUtil.data(element).get('wizard');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                KTUtil.data(element).set('wizard', the);
            }

            return the;
        },

        /**
          * Init wizard
          */
        init: function(options) {
            the.element = element;
            the.events = [];

            // merge default and user defined options
            the.options = KTUtil.deepExtend({}, defaultOptions, options);

            // Elements
            the.steps = KTUtil.findAll(element, '[data-wizard-type="step"]');

            the.btnNext = KTUtil.find(element, '[data-wizard-type="action-next"]');
            the.btnPrev = KTUtil.find(element, '[data-wizard-type="action-prev"]');
            the.btnSubmit = KTUtil.find(element, '[data-wizard-type="action-submit"]');

            // Variables
            the.events = [];
            the.lastStep = 0;
            the.currentStep = 1;
            the.newStep = 0;
            the.stopped = false;
            the.totalSteps = the.steps.length;

            // Init current step
            if (the.options.startStep > 1) {
                Plugin.goTo(the.options.startStep);
            }

            // Init UI
            Plugin.updateUI();
        },

        /**
          * Build Form Wizard
          */
        build: function() {
            // Next button event handler
            KTUtil.addEvent(the.btnNext, 'click', function(e) {
                e.preventDefault();

                // Set new step number
                Plugin.setNewStep(Plugin.getNextStep());

                // Trigger change event
                if (Plugin.eventTrigger('change') !== false) {
                    Plugin.goTo(Plugin.getNextStep());
                }
            });

            // Prev button event handler
            KTUtil.addEvent(the.btnPrev, 'click', function(e) {
                e.preventDefault();

                // Set new step number
                Plugin.setNewStep(Plugin.getPrevStep());

                // Trigger change event
                if (Plugin.eventTrigger('change') !== false) {
                    Plugin.goTo(Plugin.getPrevStep());
                }
            });

            if (the.options.clickableSteps === true) {
                KTUtil.on(element, '[data-wizard-type="step"]', 'click', function() {
                    var index = KTUtil.index(this) + 1;

                    if (index !== the.currentStep) {
                        Plugin.setNewStep(index);

                        // Trigger change event
                        if (Plugin.eventTrigger('change') !== false) {
                            Plugin.goTo(index);
                        }
                    }
                });
            }

            // Submit button event handler
            KTUtil.addEvent(the.btnSubmit, 'click', function(e) {
                e.preventDefault();

                Plugin.eventTrigger('submit');
            });
        },

        /**
          * Handles wizard click wizard
          */
        goTo: function(number) {
            // Skip if stopped
            if (the.stopped === true) {
                the.stopped = false;
                return;
            }

            // Skip if this step is already shown
            if (number === the.currentStep || number > the.totalSteps || number < 0) {
                return;
            }

            // Validate step number
            number = parseInt(number);

            // Set current step
            the.lastStep = the.currentStep;
            the.currentStep = number;
            the.newStep = 0;

            Plugin.updateUI();

            Plugin.eventTrigger('changed');

            return the;
        },

        /**
          * Stop wizard
          */
        stop: function() {
            the.stopped = true;
        },

        /**
          * Resume wizard
          */
        resume: function() {
            the.stopped = false;
        },

        /**
          * Check last step
          */
        isLastStep: function() {
            return the.currentStep === the.totalSteps;
        },

        /**
          * Check first step
          */
        isFirstStep: function() {
            return the.currentStep === 1;
        },

        /**
          * Check between step
          */
        isBetweenStep: function() {
            return Plugin.isLastStep() === false && Plugin.isFirstStep() === false;
        },

        /**
          * Update wizard UI after step change
          */
        updateUI: function() {
            var stepType = '';
            var index = the.currentStep - 1;

            if (Plugin.isLastStep()) {
                stepType = 'last';
            } else if (Plugin.isFirstStep()) {
                stepType = 'first';
            } else {
                stepType = 'between';
            }

            KTUtil.attr(the.element, 'data-wizard-state', stepType);

            // Steps
            var steps = KTUtil.findAll(the.element, '[data-wizard-type="step"]');

            if (steps && steps.length > 0) {
                for (var i = 0, len = steps.length; i < len; i++) {
                    if (i == index) {
                        KTUtil.attr(steps[i], 'data-wizard-state', 'current');
                    } else {
                        if (i < index) {
                            KTUtil.attr(steps[i], 'data-wizard-state', 'done');
                        } else {
                            KTUtil.attr(steps[i], 'data-wizard-state', 'pending');
                        }
                    }
                }
            }

            // Steps Info
            var stepsInfo = KTUtil.findAll(the.element, '[data-wizard-type="step-info"]');
            if (stepsInfo &&stepsInfo.length > 0) {
                for (var i = 0, len = stepsInfo.length; i < len; i++) {
                    if (i == index) {
                        KTUtil.attr(stepsInfo[i], 'data-wizard-state', 'current');
                    } else {
                        KTUtil.removeAttr(stepsInfo[i], 'data-wizard-state');
                    }
                }
            }

            // Steps Content
            var stepsContent = KTUtil.findAll(the.element, '[data-wizard-type="step-content"]');
            if (stepsContent&& stepsContent.length > 0) {
                for (var i = 0, len = stepsContent.length; i < len; i++) {
                    if (i == index) {
                        KTUtil.attr(stepsContent[i], 'data-wizard-state', 'current');
                    } else {
                        KTUtil.removeAttr(stepsContent[i], 'data-wizard-state');
                    }
                }
            }
        },

        /**
          * Get next step number
          */
        getNextStep: function() {
            if (the.totalSteps >= (the.currentStep + 1)) {
                return the.currentStep + 1;
            } else {
                return the.totalSteps;
            }
        },

        /**
          * Get prev step number
          */
        getPrevStep: function() {
            if ((the.currentStep - 1) >= 1) {
                return the.currentStep - 1;
            } else {
                return 1;
            }
        },

        /**
          * Get new step number
          */
        getNewStep: function() {
            return the.newStep;
        },

        /**
          * Set new step
          */
        setNewStep: function(step) {
            the.newStep = step;
        },

        /**
          * Trigger events
          */
        eventTrigger: function(name, nested) {
            //KTUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
      * Set default options
      */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
      * Go to the next step
      */
    the.goNext = function() {
        return Plugin.goTo(Plugin.getNextStep());
    };

    /**
      * Go to the prev step
      */
    the.goPrev = function() {
        return Plugin.goTo(Plugin.getPrevStep());
    };

    /**
      * Go to the last step
      */
    the.goLast = function() {
        return Plugin.goTo(Plugin.getLastStep());
    };

    /**
      * Go to the first step
      */
    the.goFirst = function() {
        return Plugin.goTo(Plugin.getFirstStep());
    };

    /**
      * Go to a step
      */
    the.goTo = function(number) {
        return Plugin.goTo(number);
    };

    /**
      * Stop wizard
      */
    the.stop = function() {
        return Plugin.stop();
    };

    /**
      * Resume wizard
      */
    the.resume = function() {
        return Plugin.resume();
    };

    /**
      * Get current step number
      */
    the.getStep = function() {
        return the.currentStep;
    };

    /**
      * Get new step number
      */
    the.getNewStep = function() {
        return Plugin.getNewStep();
    };

    /**
      * Set new step number
      */
    the.setNewStep = function(number) {
        Plugin.setNewStep(number);
    };

    /**
      * Check last step
      */
    the.isLastStep = function() {
        return Plugin.isLastStep();
    };

    /**
      * Check first step
      */
    the.isFirstStep = function() {
        return Plugin.isFirstStep();
    };

    /**
      * Attach event("change", "changed", "submit")
      */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
      * Attach event that will be fired once
      */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = KTWizard;
}

'use strict';
(function($) {

  var pluginName = 'KTDatatable';
  var pfx = '';
  var util = KTUtil;
  var app = KTApp;

  if (typeof util === 'undefined') throw new Error('Util class is required and must be included before ' + pluginName);

  // plugin setup
  $.fn[pluginName] = function(options) {
    if ($(this).length === 0) {
      console.warn('No ' + pluginName + ' element exist.');
      return;
    }

    // global variables
    var datatable = this;

    // debug enabled?
    // 1) state will be cleared on each refresh
    // 2) enable some logs
    // 3) etc.
    datatable.debug = false;

    datatable.API = {
      record: null,
      value: null,
      params: null,
    };

    var Plugin = {
      /********************
        ** PRIVATE METHODS
        ********************/
      isInit: false,
      cellOffset: 110,
      iconOffset: 15,
      stateId: 'meta',
      ajaxParams: {},
      pagingObject: {},

      init: function(options) {
        var isHtmlTable = false;
        // data source option empty is normal table
        if (options.data.source === null) {
          Plugin.extractTable();
          isHtmlTable = true;
        }

        Plugin.setupBaseDOM.call();
        Plugin.setupDOM(datatable.table);

        // on event after layout had done setup, show datatable
        $(datatable).on(pfx + 'datatable-on-layout-updated', Plugin.afterRender);

        if (datatable.debug) {
          Plugin.stateRemove(Plugin.stateId);
        }

        /*var es = Plugin.stateGet(Plugin.stateId);
        var eq = {};
        if (es && es.hasOwnProperty('query')) {
          eq = es.query;
        }
        Plugin.setDataSourceQuery(Object.assign({}, eq, Plugin.getOption('data.source.read.params.query')));*/

        // set custom query from options
        Plugin.setDataSourceQuery(Plugin.getOption('data.source.read.params.query'));

        // initialize extensions
        $.each(Plugin.getOption('extensions'), function(extName, extOptions) {
          if (typeof $.fn[pluginName][extName] === 'function') {
            if (typeof extOptions !== 'object') {
              extOptions = $.extend({}, extOptions);
            }
            new $.fn[pluginName][extName](datatable, extOptions);
          }
        });

        Plugin.spinnerCallback(true);
        // get data
        if (options.data.type === 'remote' || options.data.type === 'local') {
          if (options.data.saveState === false) {
            Plugin.stateRemove(Plugin.stateId);
          }
          // get data for local datatable and local table
          if (options.data.type === 'local' && typeof options.data.source === 'object') {
            datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(options.data.source);
          }
          Plugin.dataRender();
        }

        // if html table, remove and setup a new header
        if (isHtmlTable) {
          $(datatable.tableHead).find('tr').remove();
          $(datatable.tableFoot).find('tr').remove();
        }

        Plugin.setHeadTitle();
        if (Plugin.getOption('layout.footer')) {
          Plugin.setHeadTitle(datatable.tableFoot);
        }

        // hide header
        if (typeof options.layout.header !== 'undefined' &&
          options.layout.header === false) {
          $(datatable.table).find('thead').remove();
        }

        // hide footer
        if (typeof options.layout.footer !== 'undefined' &&
          options.layout.footer === false) {
          $(datatable.table).find('tfoot').remove();
        }

        // for normal and local data type, run layoutUpdate
        if (options.data.type === null ||
          options.data.type === 'local') {
          Plugin.setupCellField.call();
          Plugin.setupTemplateCell.call();

          // setup nested datatable, if option enabled
          Plugin.setupSubDatatable.call();

          // setup extra system column properties
          Plugin.setupSystemColumn.call();
          Plugin.redraw();
        }

        var width;
        var initialWidth = false;
        $(window).resize(function() {
          // issue: URL Bar Resizing on mobile, https://developers.google.com/web/updates/2016/12/url-bar-resizing
          // trigger datatable resize on width change only
          if ($(this).width() !== width) {
            width = $(this).width();
            Plugin.fullRender();
          }
          // get initial width
          if (!initialWidth) {
            width = $(this).width();
            initialWidth = true;
          }
        });

        $(datatable).height('');

        var prevKeyword = '';
        $(Plugin.getOption('search.input')).on('keyup', function(e) {
          if (Plugin.getOption('search.onEnter') && e.which !== 13) return;
          var keyword = $(this).val();
          // prevent multiple search request on every button keyup
          if (prevKeyword !== keyword) {
            Plugin.search(keyword);
            prevKeyword = keyword;
          }
        });

        return datatable;
      },

      /**
        * Extract static HTML table content into datasource
        */
      extractTable: function() {
        var columns = [];
        var headers = $(datatable).find('tr:first-child th').get().map(function(cell, i) {
          var field = $(cell).data('field');
          var title = $(cell).data('title');
          if (typeof field === 'undefined') {
            field = $(cell).text().trim();
          }
          if (typeof title === 'undefined') {
            title = $(cell).text().trim();
          }
          var column = {field: field, title: title};
          for (var ii in options.columns) {
            if (options.columns[ii].field === field) {
              column = $.extend(true, {}, options.columns[ii], column);
            }
          }
          columns.push(column);
          return field;
        });
        // auto create columns config
        options.columns = columns;

        var rowProp = [];
        var source = [];

        $(datatable).find('tr').each(function() {
          if ($(this).find('td').length) {
            rowProp.push($(this).prop('attributes'));
          }
          var td = {};
          $(this).find('td').each(function(i, cell) {
            td[headers[i]] = cell.innerHTML.trim();
          });
          if (!util.isEmpty(td)) {
            source.push(td);
          }
        });

        options.data.attr.rowProps = rowProp;
        options.data.source = source;
      },

      /**
        * One time layout update on init
        */
      layoutUpdate: function() {
        // setup nested datatable, if option enabled
        Plugin.setupSubDatatable.call();

        // setup extra system column properties
        Plugin.setupSystemColumn.call();

        // setup cell hover event
        Plugin.setupHover.call();

        if (typeof options.detail === 'undefined'
          // temporary disable lock column in subtable
          && Plugin.getDepth() === 1) {
          // lock columns handler
          Plugin.lockTable.call();
        }

        Plugin.resetScroll();

        // check if not is a locked column
        if (!Plugin.isLocked()) {
          Plugin.redraw.call();
          // check if its not a subtable and has autoHide option enabled
          if (!Plugin.isSubtable() && Plugin.getOption('rows.autoHide') === true) {
            Plugin.autoHide();
          }
          // reset row
          $(datatable.table).find('.' + pfx + 'datatable-row').css('height', '');
        }

        Plugin.columnHide.call();

        Plugin.rowEvenOdd.call();

        Plugin.sorting.call();

        Plugin.scrollbar.call();

        if (!Plugin.isInit) {
          // run once dropdown inside datatable
          Plugin.dropdownFix();
          $(datatable).trigger(pfx + 'datatable-on-init', {table: $(datatable.wrap).attr('id'), options: options});
          Plugin.isInit = true;
        }

        $(datatable).trigger(pfx + 'datatable-on-layout-updated', {table: $(datatable.wrap).attr('id')});
      },

      dropdownFix: function() {
        var dropdownMenu;
        $('body').on('show.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable-body', function(e) {
          dropdownMenu = $(e.target).find('.dropdown-menu');
          $('body').append(dropdownMenu.detach());
          dropdownMenu.css('display', 'block');
          dropdownMenu.position({
            'my': 'right top',
            'at': 'right bottom',
            'of': $(e.relatedTarget),
          });
          // if datatable is inside modal
          if (datatable.closest('.modal').length) {
            // increase dropdown z-index
            dropdownMenu.css('z-index', '2000');
          }
        }).on('hide.bs.dropdown', '.' + pfx + 'datatable .' + pfx + 'datatable-body', function(e) {
          $(e.target).append(dropdownMenu.detach());
          dropdownMenu.hide();
        });

        // remove dropdown if window resize
        $(window).on('resize', function(e) {
          if (typeof dropdownMenu !== 'undefined') {
            dropdownMenu.hide();
          }
        });
      },

      lockTable: function() {
        var lock = {
          lockEnabled: false,
          init: function() {
            // check if table should be locked columns
            lock.lockEnabled = Plugin.lockEnabledColumns();
            if (lock.lockEnabled.left.length === 0 &&
              lock.lockEnabled.right.length === 0) {
              return;
            }
            lock.enable();
          },
          enable: function() {
            var enableLock = function(tablePart) {
              // check if already has lock column
              if ($(tablePart).find('.' + pfx + 'datatable-lock').length > 0) {
                Plugin.log('Locked container already exist in: ', tablePart);
                return;
              }
              // check if no rows exists
              if ($(tablePart).find('.' + pfx + 'datatable-row').length === 0) {
                Plugin.log('No row exist in: ', tablePart);
                return;
              }

              // locked div container
              var lockLeft = $('<div/>').addClass(pfx + 'datatable-lock ' + pfx + 'datatable-lock-left');
              var lockScroll = $('<div/>').addClass(pfx + 'datatable-lock ' + pfx + 'datatable-lock-scroll');
              var lockRight = $('<div/>').addClass(pfx + 'datatable-lock ' + pfx + 'datatable-lock-right');

              $(tablePart).find('.' + pfx + 'datatable-row').each(function() {
                // create new row for lock columns and pass the data
                var rowLeft = $('<tr/>').addClass(pfx + 'datatable-row').data('obj', $(this).data('obj')).appendTo(lockLeft);
                var rowScroll = $('<tr/>').addClass(pfx + 'datatable-row').data('obj', $(this).data('obj')).appendTo(lockScroll);
                var rowRight = $('<tr/>').addClass(pfx + 'datatable-row').data('obj', $(this).data('obj')).appendTo(lockRight);
                $(this).find('.' + pfx + 'datatable-cell').each(function() {
                  var locked = $(this).data('locked');
                  if (typeof locked !== 'undefined') {
                    if (typeof locked.left !== 'undefined' || locked === true) {
                      // default locked to left
                      $(this).appendTo(rowLeft);
                    }
                    if (typeof locked.right !== 'undefined') {
                      $(this).appendTo(rowRight);
                    }
                  } else {
                    $(this).appendTo(rowScroll);
                  }
                });
                // remove old row
                $(this).remove();
              });

              if (lock.lockEnabled.left.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable-lock');
                $(lockLeft).appendTo(tablePart);
              }
              if (lock.lockEnabled.left.length > 0 || lock.lockEnabled.right.length > 0) {
                $(lockScroll).appendTo(tablePart);
              }
              if (lock.lockEnabled.right.length > 0) {
                $(datatable.wrap).addClass(pfx + 'datatable-lock');
                $(lockRight).appendTo(tablePart);
              }
            };

            $(datatable.table).find('thead,tbody,tfoot').each(function() {
              var tablePart = this;
              if ($(this).find('.' + pfx + 'datatable-lock').length === 0) {
                $(this).ready(function() {
                  enableLock(tablePart);
                });
              }
            });
          },
        };
        lock.init();
        return lock;
      },

      /**
        * Render everything for resize
        */
      fullRender: function() {
        $(datatable.tableHead).empty();
        Plugin.setHeadTitle();
        if (Plugin.getOption('layout.footer')) {
          $(datatable.tableFoot).empty();
          Plugin.setHeadTitle(datatable.tableFoot);
        }

        Plugin.spinnerCallback(true);
        $(datatable.wrap).removeClass(pfx + 'datatable-loaded');

        Plugin.insertData();
      },

      lockEnabledColumns: function() {
        var screen = $(window).width();
        var columns = options.columns;
        var enabled = {left: [], right: []};
        $.each(columns, function(i, column) {
          if (typeof column.locked !== 'undefined') {
            if (typeof column.locked.left !== 'undefined') {
              if (util.getBreakpoint(column.locked.left) <= screen) {
                enabled['left'].push(column.locked.left);
              }
            }
            if (typeof column.locked.right !== 'undefined') {
              if (util.getBreakpoint(column.locked.right) <= screen) {
                enabled['right'].push(column.locked.right);
              }
            }
          }
        });
        return enabled;
      },

      /**
        * After render event, called by "datatable-on-layout-updated"
        * @param e
        * @param args
        */
      afterRender: function(e, args) {
        $(datatable).ready(function() {
          // redraw locked columns table
          if (Plugin.isLocked()) {
            Plugin.redraw();
          }

          $(datatable.tableBody).css('visibility', '');
          $(datatable.wrap).addClass(pfx + 'datatable-loaded');

          Plugin.spinnerCallback(false);
        });
      },

      hoverTimer: 0,
      isScrolling: false,
      setupHover: function() {
        $(window).scroll(function(e) {
          // stop hover when scrolling
          clearTimeout(Plugin.hoverTimer);
          Plugin.isScrolling = true;
        });

        $(datatable.tableBody).find('.' + pfx + 'datatable-cell').off('mouseenter', 'mouseleave').on('mouseenter', function() {
          // reset scroll timer to hover class
          Plugin.hoverTimer = setTimeout(function() {
            Plugin.isScrolling = false;
          }, 200);
          if (Plugin.isScrolling) return;

          // normal table
          var row = $(this).closest('.' + pfx + 'datatable-row').addClass(pfx + 'datatable-row-hover');
          var index = $(row).index() + 1;

          // lock table
          $(row).closest('.' + pfx + 'datatable-lock').parent().find('.' + pfx + 'datatable-row:nth-child(' + index + ')').addClass(pfx + 'datatable-row-hover');
        }).on('mouseleave', function() {
          // normal table
          var row = $(this).closest('.' + pfx + 'datatable-row').removeClass(pfx + 'datatable-row-hover');
          var index = $(row).index() + 1;

          // look table
          $(row).closest('.' + pfx + 'datatable-lock').parent().find('.' + pfx + 'datatable-row:nth-child(' + index + ')').removeClass(pfx + 'datatable-row-hover');
        });
      },

      /**
        * Adjust width of locked table containers by resize handler
        * @returns {number}
        */
      adjustLockContainer: function() {
        if (!Plugin.isLocked()) return 0;

        // refer to head dimension
        var containerWidth = $(datatable.tableHead).width();
        var lockLeft = $(datatable.tableHead).find('.' + pfx + 'datatable-lock-left').width();
        var lockRight = $(datatable.tableHead).find('.' + pfx + 'datatable-lock-right').width();

        if (typeof lockLeft === 'undefined') lockLeft = 0;
        if (typeof lockRight === 'undefined') lockRight = 0;

        var lockScroll = Math.floor(containerWidth - lockLeft - lockRight);
        $(datatable.table).find('.' + pfx + 'datatable-lock-scroll').css('width', lockScroll);

        return lockScroll;
      },

      /**
        * todo; not in use
        */
      dragResize: function() {
        var pressed = false;
        var start = undefined;
        var startX, startWidth;
        $(datatable.tableHead).find('.' + pfx + 'datatable-cell').mousedown(function(e) {
          start = $(this);
          pressed = true;
          startX = e.pageX;
          startWidth = $(this).width();
          $(start).addClass(pfx + 'datatable-cell-resizing');

        }).mousemove(function(e) {
          if (pressed) {
            var i = $(start).index();
            var tableBody = $(datatable.tableBody);
            var ifLocked = $(start).closest('.' + pfx + 'datatable-lock');

            if (ifLocked) {
              var lockedIndex = $(ifLocked).index();
              tableBody = $(datatable.tableBody).find('.' + pfx + 'datatable-lock').eq(lockedIndex);
            }

            $(tableBody).find('.' + pfx + 'datatable-row').each(function(tri, tr) {
              $(tr).find('.' + pfx + 'datatable-cell').eq(i).width(startWidth + (e.pageX - startX)).children().width(startWidth + (e.pageX - startX));
            });

            $(start).children().css('width', startWidth + (e.pageX - startX));
          }

        }).mouseup(function() {
          $(start).removeClass(pfx + 'datatable-cell-resizing');
          pressed = false;
        });

        $(document).mouseup(function() {
          $(start).removeClass(pfx + 'datatable-cell-resizing');
          pressed = false;
        });
      },

      /**
        * To prepare placeholder for table before content is loading
        */
      initHeight: function() {
        if (options.layout.height && options.layout.scroll) {
          var theadHeight = $(datatable.tableHead).find('.' + pfx + 'datatable-row').outerHeight();
          var tfootHeight = $(datatable.tableFoot).find('.' + pfx + 'datatable-row').outerHeight();
          var bodyHeight = options.layout.height;
          if (theadHeight > 0) {
            bodyHeight -= theadHeight;
          }
          if (tfootHeight > 0) {
            bodyHeight -= tfootHeight;
          }

          // scrollbar offset
          bodyHeight -= 2;

          $(datatable.tableBody).css('max-height', Math.floor(parseFloat(bodyHeight)));

          // set scrollable area fixed height
          // $(datatable.tableBody).find('.' + pfx + 'datatable-lock-scroll').css('height', Math.floor(parseFloat(bodyHeight)));
        }
      },

      /**
        * Setup base DOM (table, thead, tbody, tfoot) and create if not
        * exist.
        */
      setupBaseDOM: function() {
        // keep original state before datatable initialize
        datatable.initialDatatable = $(datatable).clone();

        // main element
        if ($(datatable).prop('tagName') === 'TABLE') {
          // if main init element is <table>, wrap with div
          datatable.table = $(datatable).removeClass(pfx + 'datatable').addClass(pfx + 'datatable-table');
          if ($(datatable.table).parents('.' + pfx + 'datatable').length === 0) {
            datatable.table.wrap($('<div/>').addClass(pfx + 'datatable').addClass(pfx + 'datatable-' + options.layout.theme));
            datatable.wrap = $(datatable.table).parent();
          }
        } else {
          // create table
          datatable.wrap = $(datatable).addClass(pfx + 'datatable').addClass(pfx + 'datatable-' + options.layout.theme);
          datatable.table = $('<table/>').addClass(pfx + 'datatable-table').appendTo(datatable);
        }

        if (typeof options.layout.class !== 'undefined') {
          $(datatable.wrap).addClass(options.layout.class);
        }

        $(datatable.table).removeClass(pfx + 'datatable-destroyed').css('display', 'block');

        // force disable save state
        if (typeof $(datatable).attr('id') === 'undefined') {
          Plugin.setOption('data.saveState', false);
          $(datatable.table).attr('id', util.getUniqueID(pfx + 'datatable-'));
        }

        // predefine table height
        if (Plugin.getOption('layout.minHeight'))
          $(datatable.table).css('min-height', Plugin.getOption('layout.minHeight'));

        if (Plugin.getOption('layout.height'))
          $(datatable.table).css('max-height', Plugin.getOption('layout.height'));

        // for normal table load
        if (options.data.type === null) {
          $(datatable.table).css('width', '').css('display', '');
        }

        // create table head element
        datatable.tableHead = $(datatable.table).find('thead');
        if ($(datatable.tableHead).length === 0) {
          datatable.tableHead = $('<thead/>').prependTo(datatable.table);
        }

        // create table head element
        datatable.tableBody = $(datatable.table).find('tbody');
        if ($(datatable.tableBody).length === 0) {
          datatable.tableBody = $('<tbody/>').appendTo(datatable.table);
        }

        if (typeof options.layout.footer !== 'undefined' &&
          options.layout.footer) {
          // create table foot element
          datatable.tableFoot = $(datatable.table).find('tfoot');
          if ($(datatable.tableFoot).length === 0) {
            datatable.tableFoot = $('<tfoot/>').appendTo(datatable.table);
          }
        }
      },

      /**
        * Set column data before table manipulation.
        */
      setupCellField: function(tableParts) {
        if (typeof tableParts === 'undefined') tableParts = $(datatable.table).children();
        var columns = options.columns;
        $.each(tableParts, function(part, tablePart) {
          $(tablePart).find('.' + pfx + 'datatable-row').each(function(tri, tr) {
            // prepare data
            $(tr).find('.' + pfx + 'datatable-cell').each(function(tdi, td) {
              if (typeof columns[tdi] !== 'undefined') {
                $(td).data(columns[tdi]);
              }
            });
          });
        });
      },

      /**
        * Set column template callback
        * @param tablePart
        */
      setupTemplateCell: function(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        var columns = options.columns;
        $(tablePart).find('.' + pfx + 'datatable-row').each(function(tri, tr) {
          // row data object, if any
          var obj = $(tr).data('obj');
          if (typeof obj === 'undefined') {
            return;
          }

          // @deprecated in v5.0.6
          // obj['getIndex'] = function() {
          // 	return tri;
          // };
          // @deprecated in v5.0.6
          // obj['getDatatable'] = function() {
          // 	return datatable;
          // };

          // @deprecated in v5.0.6
          var rowCallback = Plugin.getOption('rows.callback');
          if (typeof rowCallback === 'function') {
            rowCallback($(tr), obj, tri);
          }
          // before template row callback
          var beforeTemplate = Plugin.getOption('rows.beforeTemplate');
          if (typeof beforeTemplate === 'function') {
            beforeTemplate($(tr), obj, tri);
          }
          // if data object is undefined, collect from table
          if (typeof obj === 'undefined') {
            obj = {};
            $(tr).find('.' + pfx + 'datatable-cell').each(function(tdi, td) {
              // get column settings by field
              var column = $.grep(columns, function(n, i) {
                return $(td).data('field') === n.field;
              })[0];
              if (typeof column !== 'undefined') {
                obj[column['field']] = $(td).text();
              }
            });
          }

          $(tr).find('.' + pfx + 'datatable-cell').each(function(tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function(n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              // column template
              if (typeof column.template !== 'undefined') {
                var finalValue = '';
                // template string
                if (typeof column.template === 'string') {
                  finalValue = Plugin.dataPlaceholder(column.template, obj);
                }
                // template callback function
                if (typeof column.template === 'function') {
                  finalValue = column.template(obj, tri, datatable);
                }

                // sanitize using DOMPurify if installed
                if (typeof DOMPurify !== 'undefined') {
                  finalValue = DOMPurify.sanitize(finalValue);
                }

                var span = document.createElement('span');
                span.innerHTML = finalValue;

                // insert to cell, wrap with span
                $(td).html(span);

                // set span overflow
                if (typeof column.overflow !== 'undefined') {
                  $(span).css('overflow', column.overflow);
                  $(span).css('position', 'relative');
                }
              }
            }
          });

          // after template row callback
          var afterTemplate = Plugin.getOption('rows.afterTemplate');
          if (typeof afterTemplate === 'function') {
            afterTemplate($(tr), obj, tri);
          }
        });
      },

      /**
        * Setup extra system column properties
        * Note: selector checkbox, subtable toggle
        */
      setupSystemColumn: function() {
        datatable.dataSet = datatable.dataSet || [];
        // no records available
        if (datatable.dataSet.length === 0) return;

        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable-row').each(function(tri, tr) {
          $(tr).find('.' + pfx + 'datatable-cell').each(function(tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function(n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              var value = $(td).text();

              // enable column selector
              if (typeof column.selector !== 'undefined' && column.selector !== false) {
                // check if checkbox exist
                if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;

                $(td).addClass(pfx + 'datatable-cell-check');

                // append checkbox
                var chk = $('<label/>').
                  addClass(pfx + 'checkbox ' + pfx + 'checkbox-single').
                  append($('<input/>').attr('type', 'checkbox').attr('value', value).on('click', function() {
                    if ($(this).is(':checked')) {
                      // add checkbox active row class
                      Plugin.setActive(this);
                    } else {
                      // add checkbox active row class
                      Plugin.setInactive(this);
                    }
                  })).
                  append('&nbsp;<span></span>');

                // checkbox selector has outline style
                if (typeof column.selector.class !== 'undefined') {
                  $(chk).addClass(column.selector.class);
                }

                $(td).children().html(chk);
              }

              // enable column subtable toggle
              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable-toggle-subtable').length > 0) return;
                // append subtable toggle
                $(td).
                  children().
                  html($('<a/>').
                    addClass(pfx + 'datatable-toggle-subtable').
                    attr('href', '#').
                    attr('data-value', value).
                    append($('<i/>').addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        });

        // init checkbox for header/footer
        var initCheckbox = function(tr) {
          // get column settings by field
          var column = $.grep(columns, function(n, i) {
            return typeof n.selector !== 'undefined' && n.selector !== false;
          })[0];

          if (typeof column !== 'undefined') {
            // enable column selector
            if (typeof column.selector !== 'undefined' && column.selector !== false) {
              var td = $(tr).find('[data-field="' + column.field + '"]');
              // check if checkbox exist
              if ($(td).find('.' + pfx + 'checkbox [type="checkbox"]').length > 0) return;

              $(td).addClass(pfx + 'datatable-cell-check');

              // append checkbox
              var chk = $('<label/>').
                addClass(pfx + 'checkbox ' + pfx + 'checkbox-single ' + pfx + 'checkbox-all').
                append($('<input/>').attr('type', 'checkbox').on('click', function() {
                  if ($(this).is(':checked')) {
                    Plugin.setActiveAll(true);
                  } else {
                    Plugin.setActiveAll(false);
                  }
                })).
                append('&nbsp;<span></span>');

              // checkbox selector has outline style
              if (typeof column.selector.class !== 'undefined') {
                $(chk).addClass(column.selector.class);
              }

              $(td).children().html(chk);
            }
          }
        };

        if (options.layout.header) {
          initCheckbox($(datatable.tableHead).find('.' + pfx + 'datatable-row').first());
        }
        if (options.layout.footer) {
          initCheckbox($(datatable.tableFoot).find('.' + pfx + 'datatable-row').first());
        }
      },

      maxWidthList: {},

      /**
        * Adjust width to match container size
        */
      adjustCellsWidth: function() {
        // get table width
        var containerWidth = $(datatable.tableBody).innerWidth() - Plugin.iconOffset;

        // get total number of columns
        var columns = $(datatable.tableHead).
          find('.' + pfx + 'datatable-row:first-child').
          find('.' + pfx + 'datatable-cell').
          // exclude expand icon
          not('.' + pfx + 'datatable-toggle-detail').
          not(':hidden').length;

        if (columns > 0) {
          //  remove reserved sort icon width
          containerWidth = containerWidth - (Plugin.iconOffset * columns);
          var minWidth = Math.floor(containerWidth / columns);

          // minimum width
          if (minWidth <= Plugin.cellOffset) {
            minWidth = Plugin.cellOffset;
          }

          $(datatable.table).find('.' + pfx + 'datatable-row').
              find('.' + pfx + 'datatable-cell').
              // exclude expand icon
              not('.' + pfx + 'datatable-toggle-detail').
              not(':hidden').each(function(tdi, td) {

            var width = minWidth;
            var dataWidth = $(td).data('width');

            if (typeof dataWidth !== 'undefined') {
              if (dataWidth === 'auto') {
                var field = $(td).data('field');
                if (Plugin.maxWidthList[field]) {
                  width = Plugin.maxWidthList[field];
                }
                else {
                  var cells = $(datatable.table).find('.' + pfx + 'datatable-cell[data-field="' + field + '"]');
                  width = Plugin.maxWidthList[field] = Math.max.apply(null,
                      $(cells).map(function() {
                        return $(this).outerWidth();
                      }).get());
                }
              }
              else {
                width = dataWidth;
              }
            }
            $(td).children().css('width', Math.ceil(width));
          });
        }

        return datatable;
      },

      /**
        * Adjust height to match container size
        */
      adjustCellsHeight: function() {
        $.each($(datatable.table).children(), function(part, tablePart) {
          var totalRows = $(tablePart).find('.' + pfx + 'datatable-row').first().parent().find('.' + pfx + 'datatable-row').length;
          for (var i = 1; i <= totalRows; i++) {
            var rows = $(tablePart).find('.' + pfx + 'datatable-row:nth-child(' + i + ')');
            if ($(rows).length > 0) {
              var maxHeight = Math.max.apply(null, $(rows).map(function() {
                return $(this).outerHeight();
              }).get());
              $(rows).css('height', Math.ceil(maxHeight));
            }
          }
        });
      },

      /**
        * Setup table DOM and classes
        */
      setupDOM: function(table) {
        // set table classes
        $(table).find('> thead').addClass(pfx + 'datatable-head');
        $(table).find('> tbody').addClass(pfx + 'datatable-body');
        $(table).find('> tfoot').addClass(pfx + 'datatable-foot');
        $(table).find('tr').addClass(pfx + 'datatable-row');
        $(table).find('tr > th, tr > td').addClass(pfx + 'datatable-cell');
        $(table).find('tr > th, tr > td').each(function(i, td) {
          if ($(td).find('span').length === 0) {
            $(td).wrapInner($('<span/>').css('width', Plugin.cellOffset));
          }
        });
      },

      /**
        * Default scrollbar
        * @returns {{tableLocked: null, init: init, onScrolling:
        *     onScrolling}}
        */
      scrollbar: function() {
        var scroll = {
          scrollable: null,
          tableLocked: null,
          initPosition: null,
          init: function() {
            var screen = util.getViewPort().width;
            // setup scrollable datatable
            if (options.layout.scroll) {
              // add scrollable datatable class
              $(datatable.wrap).addClass(pfx + 'datatable-scroll');

              var scrollable = $(datatable.tableBody).find('.' + pfx + 'datatable-lock-scroll');

              // check if scrollable area have rows
              if ($(scrollable).find('.' + pfx + 'datatable-row').length > 0 && $(scrollable).length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable-lock-scroll > .' + pfx + 'datatable-row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable-lock-scroll > .' + pfx + 'datatable-row');
                scroll.tableLocked = $(datatable.tableBody).find('.' + pfx + 'datatable-lock:not(.' + pfx + 'datatable-lock-scroll)');
                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(scrollable[0]);
                } else {
                  scroll.initDefaultScrollbar(scrollable);
                }
              } else if ($(datatable.tableBody).find('.' + pfx + 'datatable-row').length > 0) {
                scroll.scrollHead = $(datatable.tableHead).find('> .' + pfx + 'datatable-row');
                scroll.scrollFoot = $(datatable.tableFoot).find('> .' + pfx + 'datatable-row');
                if (Plugin.getOption('layout.customScrollbar') && util.detectIE() != 10 && screen > util.getBreakpoint('lg')) {
                  scroll.initCustomScrollbar(datatable.tableBody);
                } else {
                  scroll.initDefaultScrollbar(datatable.tableBody);
                }
              }
            }
          },
          initDefaultScrollbar: function(scrollable) {
            // get initial scroll position
            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).css('overflow-y', 'auto').off().on('scroll', scroll.onScrolling);
            $(scrollable).css('overflow-x', 'auto');
          },
          onScrolling: function(e) {
            var left = $(this).scrollLeft();
            var top = $(this).scrollTop();
            if (util.isRTL()) {
              // deduct initial position for RTL
              left = left - scroll.initPosition;
            }
            $(scroll.scrollHead).css('left', -left);
            $(scroll.scrollFoot).css('left', -left);
            $(scroll.tableLocked).each(function(i, table) {
              if (Plugin.isLocked()) {
                // scrollbar offset
                top -= 1;
              }
              $(table).css('top', -top);
            });
          },
          initCustomScrollbar: function(scrollable) {
            scroll.scrollable = scrollable;
            // create a new instance for table body with scrollbar
            Plugin.initScrollbar(scrollable);
            // get initial scroll position
            scroll.initPosition = $(scrollable).scrollLeft();
            $(scrollable).off().on('scroll', scroll.onScrolling);
          },
        };
        scroll.init();
        return scroll;
      },

      /**
        * Init custom scrollbar and reset position
        * @param element
        * @param options
        */
      initScrollbar: function(element, options) {
        if (!element || !element.nodeName) {
          return;
        }
        $(datatable.tableBody).css('overflow', '');
        var ps = $(element).data('ps');
        if (util.hasClass(element, 'ps') && typeof ps !== 'undefined') {
          ps.update();
        } else {
          ps = new PerfectScrollbar(element, Object.assign({}, {
            wheelSpeed: 0.5,
            swipeEasing: true,
            // wheelPropagation: false,
            minScrollbarLength: 40,
            maxScrollbarLength: 300,
            suppressScrollX: Plugin.getOption('rows.autoHide') && !Plugin.isLocked()
          }, options));
          $(element).data('ps', ps);
        }

        // reset perfect scrollbar on resize
        $(window).resize(function() {
          ps.update();
        });
      },

      /**
        * Set column title from options.columns settings
        */
      setHeadTitle: function(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableHead;
        tablePart = $(tablePart)[0];
        var columns = options.columns;
        var row = tablePart.getElementsByTagName('tr')[0];
        var ths = tablePart.getElementsByTagName('td');

        if (typeof row === 'undefined') {
          row = document.createElement('tr');
          tablePart.appendChild(row);
        }

        $.each(columns, function(i, column) {
          var th = ths[i];
          if (typeof th === 'undefined') {
            th = document.createElement('th');
            row.appendChild(th);
          }

          // set column title
          if (typeof column['title'] !== 'undefined') {
            th.innerHTML = column.title;
            th.setAttribute('data-field', column.field);
            util.addClass(th, column.class);
            // set disable autoHide or force enable
            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                th.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                th.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }
            $(th).data(column);
          }

          // set header attr option
          if (typeof column.attr !== 'undefined') {
            $.each(column.attr, function(key, val) {
              th.setAttribute(key, val);
            });
          }

          // apply text align to thead/tfoot
          if (typeof column.textAlign !== 'undefined') {
            var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
            util.addClass(th, align);
          }
        });
        Plugin.setupDOM(tablePart);
      },

      /**
        * Initiate to get remote or local data via ajax
        */
      dataRender: function(action) {
        $(datatable.table).siblings('.' + pfx + 'datatable-pager').removeClass(pfx + 'datatable-paging-loaded');

        var buildMeta = function() {
          datatable.dataSet = datatable.dataSet || [];
          Plugin.localDataUpdate();
          // local pagination meta
          var meta = Plugin.getDataSourceParam('pagination');
          if (meta.perpage === 0) {
            meta.perpage = options.data.pageSize || 10;
          }
          meta.total = datatable.dataSet.length;
          var start = Math.max(meta.perpage * (meta.page - 1), 0);
          var end = Math.min(start + meta.perpage, meta.total);
          datatable.dataSet = $(datatable.dataSet).slice(start, end);
          return meta;
        };

        var afterGetData = function(result) {
          var localPagingCallback = function(ctx, meta) {
            if (!$(ctx.pager).hasClass(pfx + 'datatable-paging-loaded')) {
              $(ctx.pager).remove();
              ctx.init(meta);
            }
            $(ctx.pager).off().on(pfx + 'datatable-on-goto-page', function(e) {
              $(ctx.pager).remove();
              ctx.init(meta);
            });

            var start = Math.max(meta.perpage * (meta.page - 1), 0);
            var end = Math.min(start + meta.perpage, meta.total);

            Plugin.localDataUpdate();
            datatable.dataSet = $(datatable.dataSet).slice(start, end);

            // insert data into table content
            Plugin.insertData();
          };

          $(datatable.wrap).removeClass(pfx + 'datatable-error');
          // pagination enabled
          if (options.pagination) {
            if (options.data.serverPaging && options.data.type !== 'local') {
              // server pagination
              var serverMeta = Plugin.getObject('meta', result || null);
              if (serverMeta !== null) {
                Plugin.pagingObject = Plugin.paging(serverMeta);
              } else {
                // no meta object from server response, fallback to local pagination
                Plugin.pagingObject = Plugin.paging(buildMeta(), localPagingCallback);
              }
            } else {
              // local pagination can be used by remote data also
              Plugin.pagingObject = Plugin.paging(buildMeta(), localPagingCallback);
            }
          } else {
            // pagination is disabled
            Plugin.localDataUpdate();
          }
          // insert data into table content
          Plugin.insertData();
        };

        // get local datasource
        if (options.data.type === 'local'
          // for remote json datasource
          // || typeof options.data.source.read === 'undefined' && datatable.dataSet !== null
          // for remote datasource, server sorting is disabled and data already received from remote
          || options.data.serverSorting === false && action === 'sort'
          || options.data.serverFiltering === false && action === 'search'
        ) {
          setTimeout(function() {
            Plugin.setAutoColumns();
            afterGetData();
          });
          return;
        }

        // getting data from remote only
        Plugin.getData().done(afterGetData);
      },

      /**
        * Process ajax data
        */
      insertData: function() {
        datatable.dataSet = datatable.dataSet || [];
        var params = Plugin.getDataSourceParam();

        // get row attributes
        var pagination = params.pagination;
        var start = (Math.max(pagination.page, 1) - 1) * pagination.perpage;
        var end = Math.min(pagination.page, pagination.pages) * pagination.perpage;
        var rowProps = {};
        if (typeof options.data.attr.rowProps !== 'undefined' && options.data.attr.rowProps.length) {
          rowProps = options.data.attr.rowProps.slice(start, end);
        }

        var tableBody = document.createElement('tbody');
        tableBody.style.visibility = 'hidden';
        var colLength = options.columns.length;

        $.each(datatable.dataSet, function(rowIndex, row) {
          var tr = document.createElement('tr');
          tr.setAttribute('data-row', rowIndex);
          // keep data object to row
          $(tr).data('obj', row);

          if (typeof rowProps[rowIndex] !== 'undefined') {
            $.each(rowProps[rowIndex], function() {
              tr.setAttribute(this.name, this.value);
            });
          }

          var cellIndex = 0;
          var tds = [];
          for (var a = 0; a < colLength; a += 1) {
            var column = options.columns[a];
            var classes = [];
            // add sorted class to cells
            if (Plugin.getObject('sort.field', params) === column.field) {
              classes.push(pfx + 'datatable-cell-sorted');
            }

            // apply text align
            if (typeof column.textAlign !== 'undefined') {
              var align = typeof datatable.textAlign[column.textAlign] !== 'undefined' ? datatable.textAlign[column.textAlign] : '';
              classes.push(align);
            }

            // var classAttr = '';
            if (typeof column.class !== 'undefined') {
              classes.push(column.class);
            }

            var td = document.createElement('td');
            util.addClass(td, classes.join(' '));
            td.setAttribute('data-field', column.field);
            // set disable autoHide or force enable
            if (typeof column.autoHide !== 'undefined') {
              if (column.autoHide !== true) {
                td.setAttribute('data-autohide-disabled', column.autoHide);
              } else {
                td.setAttribute('data-autohide-enabled', column.autoHide);
              }
            }
            td.innerHTML = Plugin.getObject(column.field, row);
            td.setAttribute('aria-label', Plugin.getObject(column.field, row));
            tr.appendChild(td);
          }

          tableBody.appendChild(tr);
        });

        // display no records message
        if (datatable.dataSet.length === 0) {
          var errorSpan = document.createElement('span');
          util.addClass(errorSpan, pfx + 'datatable-error');
          errorSpan.innerHTML = Plugin.getOption('translate.records.noRecords');
          tableBody.appendChild(errorSpan);
          $(datatable.wrap).addClass(pfx + 'datatable-error ' + pfx + 'datatable-loaded');
          Plugin.spinnerCallback(false);
        }

        // replace existing table body
        $(datatable.tableBody).replaceWith(tableBody);
        datatable.tableBody = tableBody;

        // layout update
        Plugin.setupDOM(datatable.table);
        Plugin.setupCellField([datatable.tableBody]);
        Plugin.setupTemplateCell(datatable.tableBody);
        Plugin.layoutUpdate();
      },

      updateTableComponents: function() {
        datatable.tableHead = $(datatable.table).children('thead').get(0);
        datatable.tableBody = $(datatable.table).children('tbody').get(0);
        datatable.tableFoot = $(datatable.table).children('tfoot').get(0);
      },

      /**
        * Call ajax for raw JSON data
        */
      getData: function() {
        // Plugin.spinnerCallback(true);

        var ajaxParams = {
          dataType: 'json',
          method: 'POST',
          data: {},
          timeout: Plugin.getOption('data.source.read.timeout') || 30000,
        };

        if (options.data.type === 'local') {
          ajaxParams.url = options.data.source;
        }

        if (options.data.type === 'remote') {
          var data = Plugin.getDataSourceParam();
          // remove if server params is not enabled
          if (!Plugin.getOption('data.serverPaging')) {
            delete data['pagination'];
          }
          if (!Plugin.getOption('data.serverSorting')) {
            delete data['sort'];
          }
          ajaxParams.data = $.extend({}, ajaxParams.data, Plugin.getOption('data.source.read.params'), data);
          ajaxParams = $.extend({}, ajaxParams, Plugin.getOption('data.source.read'));

          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source.read');
          if (typeof ajaxParams.url !== 'string') ajaxParams.url = Plugin.getOption('data.source');
          // ajaxParams.data = $.extend(ajaxParams.data, data.pagination);
        }

        return $.ajax(ajaxParams).done(function(response, textStatus, jqXHR) {
          datatable.lastResponse = response;
          // extendible data map callback for custom datasource
          datatable.dataSet = datatable.originalDataSet = Plugin.dataMapCallback(response);
          Plugin.setAutoColumns();
          $(datatable).trigger(pfx + 'datatable-on-ajax-done', [datatable.dataSet]);
        }).fail(function(jqXHR, textStatus, errorThrown) {
          $(datatable).trigger(pfx + 'datatable-on-ajax-fail', [jqXHR]);
          $(datatable.tableBody).html($('<span/>').addClass(pfx + 'datatable-error').html(Plugin.getOption('translate.records.noRecords')));
          $(datatable.wrap).addClass(pfx + 'datatable-error ' + pfx + 'datatable-loaded');
          Plugin.spinnerCallback(false);
        }).always(function() {
        });
      },

      /**
        * Pagination object
        * @param meta if null, local pagination, otherwise remote
        *     pagination
        * @param callback for update data when navigating page
        */
      paging: function(meta, callback) {
        var pg = {
          meta: null,
          pager: null,
          paginateEvent: null,
          pagerLayout: {pagination: null, info: null},
          callback: null,
          init: function(meta) {
            pg.meta = meta;

            // parse pagination meta to integer
            pg.meta.page = parseInt(pg.meta.page);
            pg.meta.pages = parseInt(pg.meta.pages);
            pg.meta.perpage = parseInt(pg.meta.perpage);
            pg.meta.total = parseInt(pg.meta.total);

            // always recount total pages
            pg.meta.pages = Math.max(Math.ceil(pg.meta.total / pg.meta.perpage), 1);

            // current page must be not over than total pages
            if (pg.meta.page > pg.meta.pages) pg.meta.page = pg.meta.pages;

            // set unique event name between tables
            pg.paginateEvent = Plugin.getTablePrefix('paging');

            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable-pager');
            if ($(pg.pager).hasClass(pfx + 'datatable-paging-loaded')) return;

            // if class .'+pfx+'datatable-paging-loaded not exist, recreate pagination
            $(pg.pager).remove();

            // if no pages available
            if (pg.meta.pages === 0) return;

            // update datasource params
            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total,
            });

            // default callback function, contains remote pagination handler
            pg.callback = pg.serverCallback;
            // custom callback function
            if (typeof callback === 'function') pg.callback = callback;

            pg.addPaginateEvent();
            pg.populate();

            pg.meta.page = Math.max(pg.meta.page || 1, pg.meta.page);

            $(datatable).trigger(pg.paginateEvent, pg.meta);

            pg.pagingBreakpoint.call();
            $(window).resize(pg.pagingBreakpoint);
          },
          serverCallback: function(ctx, meta) {
            Plugin.dataRender();
          },
          populate: function() {
            datatable.dataSet = datatable.dataSet || [];
            // no records available
            if (datatable.dataSet.length === 0) return;

            var icons = Plugin.getOption('layout.icons.pagination');
            var title = Plugin.getOption('translate.toolbar.pagination.items.default');
            // pager root element
            pg.pager = $('<div/>').addClass(pfx + 'datatable-pager ' + pfx + 'datatable-paging-loaded');
            // numbering links
            var pagerNumber = $('<ul/>').addClass(pfx + 'datatable-pager-nav my-2 mb-sm-0');
            pg.pagerLayout['pagination'] = pagerNumber;

            // pager first/previous button
            $('<li/>').
              append($('<a/>').
                attr('title', title.first).
                addClass(pfx + 'datatable-pager-link ' + pfx + 'datatable-pager-link-first').
                append($('<i/>').addClass(icons.first)).
                on('click', pg.gotoMorePage).
                attr('data-page', 1)).
              appendTo(pagerNumber);
            $('<li/>').
              append($('<a/>').
                attr('title', title.prev).
                addClass(pfx + 'datatable-pager-link ' + pfx + 'datatable-pager-link-prev').
                append($('<i/>').addClass(icons.prev)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);

            $('<li/>').append($('<input/>').attr('type', 'text').addClass(pfx + 'datatable-pager-input form-control').attr('title', title.input).on('keyup', function() {
              // on keyup update [data-page]
              $(this).attr('data-page', Math.abs($(this).val()));
            }).on('keypress', function(e) {
              // on keypressed enter button
              if (e.which === 13) pg.gotoMorePage(e);
            })).appendTo(pagerNumber);

            var pagesNumber = Plugin.getOption('toolbar.items.pagination.pages.desktop.pagesNumber');
            var end = Math.ceil(pg.meta.page / pagesNumber) * pagesNumber;
            var start = end - pagesNumber;
            if (end > pg.meta.pages) {
              end = pg.meta.pages;
            }

            // keep pagination 1 if there is no records
            if (start < 0) {
              start = 0;
            }

            for (var x = start; x < (end || 1); x++) {
              var pageNumber = x + 1;
              $('<li/>').
                append($('<a/>').
                  addClass(pfx + 'datatable-pager-link ' + pfx + 'datatable-pager-link-number').
                  text(pageNumber).
                  attr('data-page', pageNumber).
                  attr('title', pageNumber).
                  on('click', pg.gotoPage)).
                appendTo(pagerNumber);
            }

            // pager next/last button
            $('<li/>').
              append($('<a/>').
                attr('title', title.next).
                addClass(pfx + 'datatable-pager-link ' + pfx + 'datatable-pager-link-next').
                append($('<i/>').addClass(icons.next)).
                on('click', pg.gotoMorePage)).
              appendTo(pagerNumber);
            $('<li/>').
              append($('<a/>').
                attr('title', title.last).
                addClass(pfx + 'datatable-pager-link ' + pfx + 'datatable-pager-link-last').
                append($('<i/>').addClass(icons.last)).
                on('click', pg.gotoMorePage).
                attr('data-page', pg.meta.pages)).
              appendTo(pagerNumber);

            // page info
            if (Plugin.getOption('toolbar.items.info')) {
              pg.pagerLayout['info'] = $('<div/>').addClass(pfx + 'datatable-pager-info my-2 mb-sm-0').append($('<span/>').addClass(pfx + 'datatable-pager-detail'));
            }

            $.each(Plugin.getOption('toolbar.layout'), function(i, layout) {
              $(pg.pagerLayout[layout]).appendTo(pg.pager);
            });

            // page size select
            var pageSizeSelect = $('<select/>').
              addClass('selectpicker ' + pfx + 'datatable-pager-size').
              attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select')).
              attr('data-width', '60px').
              attr('data-container', 'body').
              val(pg.meta.perpage).
              on('change', pg.updatePerpage).
              prependTo(pg.pagerLayout['info']);

            var pageSizes = Plugin.getOption('toolbar.items.pagination.pageSizeSelect');
            // default value here, to fix override option by user
            if (pageSizes.length == 0) pageSizes = [5, 10, 20, 30, 50, 100];
            $.each(pageSizes, function(i, size) {
              var display = size;
              if (size === -1) display = Plugin.getOption('translate.toolbar.pagination.items.default.all');
              $('<option/>').attr('value', size).html(display).appendTo(pageSizeSelect);
            });

            // init selectpicker to dropdown
            $(datatable).ready(function() {
              $('.selectpicker').
                selectpicker().
                on('hide.bs.select', function() {
                  // fix dropup arrow icon on hide
                  $(this).closest('.bootstrap-select').removeClass('dropup');
                }).
                siblings('.dropdown-toggle').
                attr('title', Plugin.getOption('translate.toolbar.pagination.items.default.select'));
            });

            pg.paste();
          },
          paste: function() {
            // insert pagination based on placement position, top|bottom
            $.each($.unique(Plugin.getOption('toolbar.placement')),
              function(i, position) {
                if (position === 'bottom') {
                  $(pg.pager).clone(true).insertAfter(datatable.table);
                }
                if (position === 'top') {
                  // pager top need some extra space
                  $(pg.pager).clone(true).addClass(pfx + 'datatable-pager-top').insertBefore(datatable.table);
                }
              });
          },
          gotoMorePage: function(e) {
            e.preventDefault();
            // $(this) is a link of .'+pfx+'datatable-pager-link

            if ($(this).attr('disabled') === 'disabled') return false;

            var page = $(this).attr('data-page');

            // event from text input
            if (typeof page === 'undefined') {
              page = $(e.target).attr('data-page');
            }

            pg.openPage(parseInt(page));
            return false;
          },
          gotoPage: function(e) {
            e.preventDefault();
            // prevent from click same page number
            if ($(this).hasClass(pfx + 'datatable-pager-link-active')) return;

            pg.openPage(parseInt($(this).data('page')));
          },
          openPage: function(page) {
            // currentPage is 1-based index
            pg.meta.page = parseInt(page);

            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update page callback function
            $(pg.pager).trigger(pfx + 'datatable-on-goto-page', pg.meta);
          },
          updatePerpage: function(e) {
            e.preventDefault();
            // if (Plugin.getOption('layout.height') === null) {
            // fix white space, when perpage is set from many records to less records
            // $('html, body').animate({scrollTop: $(datatable).position().top});
            // }

            // hide dropdown after select
            $(this).selectpicker('toggle');

            pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable-pager').removeClass(pfx + 'datatable-paging-loaded');

            // on change select page size
            if (e.originalEvent) {
              pg.meta.perpage = parseInt($(this).val());
            }

            $(pg.pager).find('select.' + pfx + 'datatable-pager-size').val(pg.meta.perpage).attr('data-selected', pg.meta.perpage);

            // update datasource params
            Plugin.setDataSourceParam('pagination', {
              page: pg.meta.page,
              pages: pg.meta.pages,
              perpage: pg.meta.perpage,
              total: pg.meta.total,
            });

            // update page callback function
            $(pg.pager).trigger(pfx + 'datatable-on-update-perpage', pg.meta);
            $(datatable).trigger(pg.paginateEvent, pg.meta);
            pg.callback(pg, pg.meta);

            // update pagination info
            pg.updateInfo.call();
          },
          addPaginateEvent: function(e) {
            // pagination event
            $(datatable).off(pg.paginateEvent).on(pg.paginateEvent, function(e, meta) {
              Plugin.spinnerCallback(true);

              pg.pager = $(datatable.table).siblings('.' + pfx + 'datatable-pager');
              var pagerNumber = $(pg.pager).find('.' + pfx + 'datatable-pager-nav');

              // set sync active page class
              $(pagerNumber).find('.' + pfx + 'datatable-pager-link-active').removeClass(pfx + 'datatable-pager-link-active');
              $(pagerNumber).find('.' + pfx + 'datatable-pager-link-number[data-page="' + meta.page + '"]').addClass(pfx + 'datatable-pager-link-active');

              // set next and previous link page number
              $(pagerNumber).find('.' + pfx + 'datatable-pager-link-prev').attr('data-page', Math.max(meta.page - 1, 1));
              $(pagerNumber).find('.' + pfx + 'datatable-pager-link-next').attr('data-page', Math.min(meta.page + 1, meta.pages));

              // current page input value sync
              $(pg.pager).each(function() {
                $(this).find('.' + pfx + 'datatable-pager-input[type="text"]').prop('value', meta.page);
              });

              // if only 1 page, should hide page?
              // $(pg.pager).find('.' + pfx + 'datatable-pager-nav').show();
              // if (meta.pages <= 1) {
              // 	// hide pager if has 1 page
              // 	$(pg.pager).find('.' + pfx + 'datatable-pager-nav').hide();
              // }

              // update datasource params
              Plugin.setDataSourceParam('pagination', {
                page: pg.meta.page,
                pages: pg.meta.pages,
                perpage: pg.meta.perpage,
                total: pg.meta.total,
              });

              $(pg.pager).find('select.' + pfx + 'datatable-pager-size').val(meta.perpage).attr('data-selected', meta.perpage);

              // clear active rows
              $(datatable.table).find('.' + pfx + 'checkbox > [type="checkbox"]').prop('checked', false);
              $(datatable.table).find('.' + pfx + 'datatable-row-active').removeClass(pfx + 'datatable-row-active');

              pg.updateInfo.call();
              pg.pagingBreakpoint.call();
              // Plugin.resetScroll();
            });
          },
          updateInfo: function() {
            var start = Math.max(pg.meta.perpage * (pg.meta.page - 1) + 1, 1);
            var end = Math.min(start + pg.meta.perpage - 1, pg.meta.total);
            // page info update
            $(pg.pager).find('.' + pfx + 'datatable-pager-info').find('.' + pfx + 'datatable-pager-detail').html(Plugin.dataPlaceholder(
              Plugin.getOption('translate.toolbar.pagination.items.info'), {
                // set start page 0 if the is no records. eg. Showing 0 - 0 of 0
                start: pg.meta.total === 0 ? 0 : start,
                end: pg.meta.perpage === -1 ? pg.meta.total : end,
                pageSize: pg.meta.perpage === -1 ||
                pg.meta.perpage >= pg.meta.total
                  ? pg.meta.total
                  : pg.meta.perpage,
                total: pg.meta.total,
              }));
          },

          /**
            * Update pagination layout breakpoint
            */
          pagingBreakpoint: function() {
            // keep page links reference
            var pagerNumber = $(datatable.table).siblings('.' + pfx + 'datatable-pager').find('.' + pfx + 'datatable-pager-nav');
            if ($(pagerNumber).length === 0) return;

            var currentPage = Plugin.getCurrentPage();
            var pagerInput = $(pagerNumber).find('.' + pfx + 'datatable-pager-input').closest('li');

            // reset
            $(pagerNumber).find('li').show();

            // pagination update
            $.each(Plugin.getOption('toolbar.items.pagination.pages'),
              function(mode, option) {
                if (util.isInResponsiveRange(mode)) {
                  switch (mode) {
                    case 'desktop':
                    case 'tablet':
                      var end = Math.ceil(currentPage / option.pagesNumber) * option.pagesNumber;
                      var start = end - option.pagesNumber;
                      $(pagerInput).hide();
                      pg.meta = Plugin.getDataSourceParam('pagination');
                      pg.paginationUpdate();
                      break;

                    case 'mobile':
                      $(pagerInput).show();
                      $(pagerNumber).find('.' + pfx + 'datatable-pager-link-more-prev').closest('li').hide();
                      $(pagerNumber).find('.' + pfx + 'datatable-pager-link-more-next').closest('li').hide();
                      $(pagerNumber).find('.' + pfx + 'datatable-pager-link-number').closest('li').hide();
                      break;
                  }

                  return false;
                }
              });
          },

          /**
            * Update pagination number and button display
            */
          paginationUpdate: function() {
            var pager = $(datatable.table).siblings('.' + pfx + 'datatable-pager').find('.' + pfx + 'datatable-pager-nav'),
              pagerMorePrev = $(pager).find('.' + pfx + 'datatable-pager-link-more-prev'),
              pagerMoreNext = $(pager).find('.' + pfx + 'datatable-pager-link-more-next'),
              pagerFirst = $(pager).find('.' + pfx + 'datatable-pager-link-first'),
              pagerPrev = $(pager).find('.' + pfx + 'datatable-pager-link-prev'),
              pagerNext = $(pager).find('.' + pfx + 'datatable-pager-link-next'),
              pagerLast = $(pager).find('.' + pfx + 'datatable-pager-link-last');

            // get visible page
            var pagerNumber = $(pager).find('.' + pfx + 'datatable-pager-link-number');
            // get page before of first visible
            var morePrevPage = Math.max($(pagerNumber).first().data('page') - 1, 1);
            $(pagerMorePrev).each(function(i, prev) {
              $(prev).attr('data-page', morePrevPage);
            });
            // show/hide <li>
            if (morePrevPage === 1) {
              $(pagerMorePrev).parent().hide();
            } else {
              $(pagerMorePrev).parent().show();
            }

            // get page after of last visible
            var moreNextPage = Math.min($(pagerNumber).last().data('page') + 1,
              pg.meta.pages);
            $(pagerMoreNext).each(function(i, prev) {
              $(pagerMoreNext).attr('data-page', moreNextPage).show();
            });

            // show/hide <li>
            if (moreNextPage === pg.meta.pages
              // missing dot fix when last hidden page is one left
              && moreNextPage === $(pagerNumber).last().data('page')) {
              $(pagerMoreNext).parent().hide();
            } else {
              $(pagerMoreNext).parent().show();
            }

            // begin/end of pages
            if (pg.meta.page === 1) {
              $(pagerFirst).attr('disabled', true).addClass(pfx + 'datatable-pager-link-disabled');
              $(pagerPrev).attr('disabled', true).addClass(pfx + 'datatable-pager-link-disabled');
            } else {
              $(pagerFirst).removeAttr('disabled').removeClass(pfx + 'datatable-pager-link-disabled');
              $(pagerPrev).removeAttr('disabled').removeClass(pfx + 'datatable-pager-link-disabled');
            }
            if (pg.meta.page === pg.meta.pages) {
              $(pagerNext).attr('disabled', true).addClass(pfx + 'datatable-pager-link-disabled');
              $(pagerLast).attr('disabled', true).addClass(pfx + 'datatable-pager-link-disabled');
            } else {
              $(pagerNext).removeAttr('disabled').removeClass(pfx + 'datatable-pager-link-disabled');
              $(pagerLast).removeAttr('disabled').removeClass(pfx + 'datatable-pager-link-disabled');
            }

            // display more buttons
            var nav = Plugin.getOption('toolbar.items.pagination.navigation');
            if (!nav.first) $(pagerFirst).remove();
            if (!nav.prev) $(pagerPrev).remove();
            if (!nav.next) $(pagerNext).remove();
            if (!nav.last) $(pagerLast).remove();
            if (!nav.more) {
              $(pagerMorePrev).remove();
              $(pagerMoreNext).remove();
            }
          },
        };
        pg.init(meta);
        return pg;
      },

      /**
        * Hide/show table cell defined by
        * options[columns][i][responsive][visible/hidden]
        */
      columnHide: function() {
        var screen = util.getViewPort().width;
        // foreach columns setting
        $.each(options.columns, function(i, column) {
          if (typeof column.responsive !== 'undefined' || typeof column.visible !== 'undefined') {
            var field = column.field;
            var tds = $.grep($(datatable.table).find('.' + pfx + 'datatable-cell'), function(n, i) {
              return field === $(n).data('field');
            });

            setTimeout(function () {
              // hide by force
              if (Plugin.getObject('visible', column) === false) {
                $(tds).hide();
              } else {
                // show/hide by responsive breakpoint
                if (util.getBreakpoint(Plugin.getObject('responsive.hidden', column)) >= screen) {
                  $(tds).hide();
                } else {
                  $(tds).show();
                }
                if (util.getBreakpoint(Plugin.getObject('responsive.visible', column)) <= screen) {
                  $(tds).show();
                } else {
                  $(tds).hide();
                }
              }
            });
          }
        });
      },

      /**
        * Setup sub datatable
        */
      setupSubDatatable: function() {
        var subTableCallback = Plugin.getOption('detail.content');
        if (typeof subTableCallback !== 'function') return;

        // subtable already exist
        if ($(datatable.table).find('.' + pfx + 'datatable-subtable').length > 0) return;

        $(datatable.wrap).addClass(pfx + 'datatable-subtable');

        options.columns[0]['subtable'] = true;

        // toggle on open sub table
        var toggleSubTable = function(e) {
          e.preventDefault();
          // get parent row of this subtable
          var parentRow = $(this).closest('.' + pfx + 'datatable-row');

          // get subtable row for sub table
          var subTableRow = $(parentRow).next('.' + pfx + 'datatable-row-subtable');
          if ($(subTableRow).length === 0) {
            // prepare DOM for sub table, each <tr> as parent and add <tr> as child table
            subTableRow = $('<tr/>').
              addClass(pfx + 'datatable-row-subtable ' + pfx + 'datatable-row-loading').
              hide().
              append($('<td/>').addClass(pfx + 'datatable-subtable').attr('colspan', Plugin.getTotalColumns()));
            $(parentRow).after(subTableRow);
            // add class to even row
            if ($(parentRow).hasClass(pfx + 'datatable-row-even')) {
              $(subTableRow).addClass(pfx + 'datatable-row-subtable-even');
            }
          }

          $(subTableRow).toggle();

          var subTable = $(subTableRow).find('.' + pfx + 'datatable-subtable');

          // get id from first column of parent row
          var primaryKey = $(this).closest('[data-field]:first-child').find('.' + pfx + 'datatable-toggle-subtable').data('value');

          var icon = $(this).find('i').removeAttr('class');

          // prevent duplicate datatable init
          if ($(parentRow).hasClass(pfx + 'datatable-row-subtable-expanded')) {
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
            // remove expand class from parent row
            $(parentRow).removeClass(pfx + 'datatable-row-subtable-expanded');
            // trigger event on collapse
            $(datatable).trigger(pfx + 'datatable-on-collapse-subtable', [parentRow]);
          } else {
            // expand and run callback function
            $(icon).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));
            // add expand class to parent row
            $(parentRow).addClass(pfx + 'datatable-row-subtable-expanded');
            // trigger event on expand
            $(datatable).trigger(pfx + 'datatable-on-expand-subtable', [parentRow]);
          }

          // prevent duplicate datatable init
          if ($(subTable).find('.' + pfx + 'datatable').length === 0) {
            // get data by primary id
            $.map(datatable.dataSet, function(n, i) {
              // primary id must be at the first column, otherwise e.data will be undefined
              if (primaryKey === n[options.columns[0].field]) {
                e.data = n;
                return true;
              }
              return false;
            });

            // deprecated in v5.0.6
            e.detailCell = subTable;

            e.parentRow = parentRow;
            e.subTable = subTable;

            // run callback with event
            subTableCallback(e);

            $(subTable).children('.' + pfx + 'datatable').on(pfx + 'datatable-on-init', function(e) {
              $(subTableRow).removeClass(pfx + 'datatable-row-loading');
            });
            if (Plugin.getOption('data.type') === 'local') {
              $(subTableRow).removeClass(pfx + 'datatable-row-loading');
            }
          }
        };

        var columns = options.columns;
        $(datatable.tableBody).find('.' + pfx + 'datatable-row').each(function(tri, tr) {
          $(tr).find('.' + pfx + 'datatable-cell').each(function(tdi, td) {
            // get column settings by field
            var column = $.grep(columns, function(n, i) {
              return $(td).data('field') === n.field;
            })[0];
            if (typeof column !== 'undefined') {
              var value = $(td).text();
              // enable column subtable toggle
              if (typeof column.subtable !== 'undefined' && column.subtable) {
                // check if subtable toggle exist
                if ($(td).find('.' + pfx + 'datatable-toggle-subtable').length > 0) return;
                // append subtable toggle
                $(td).
                  html($('<a/>').
                    addClass(pfx + 'datatable-toggle-subtable').
                    attr('href', '#').
                    attr('data-value', value).
                    attr('title', Plugin.getOption('detail.title')).
                    on('click', toggleSubTable).
                    append($('<i/>').css('width', $(td).data('width')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'))));
              }
            }
          });
        });

        // $(datatable.tableHead).find('.'+pfx+'-datatable-row').first()
      },

      /**
        * Datasource mapping callback
        */
      dataMapCallback: function(raw) {
        // static dataset array
        var dataSet = raw;
        // dataset mapping callback
        if (typeof Plugin.getOption('data.source.read.map') === 'function') {
          return Plugin.getOption('data.source.read.map')(raw);
        } else {
          // default data mapping fallback
          if (typeof raw !== 'undefined' && typeof raw.data !== 'undefined') {
            dataSet = raw.data;
          }
        }
        return dataSet;
      },

      isSpinning: false,
      /**
        * BlockUI spinner callback
        * @param block
        * @param target
        */
      spinnerCallback: function(block, target) {
        if (typeof target === 'undefined') target = datatable;
        // get spinner options
        var spinnerOptions = Plugin.getOption('layout.spinner');
        // spinner is disabled
        if (typeof spinnerOptions === 'undefined' || !spinnerOptions) {
          return;
        }
        if (block) {
          if (!Plugin.isSpinning) {
            if (typeof spinnerOptions.message !== 'undefined' && spinnerOptions.message === true) {
              // use default spinner message from translation
              spinnerOptions.message = Plugin.getOption('translate.records.processing');
            }
            Plugin.isSpinning = true;
            if (typeof app !== 'undefined') {
              app.block(target, spinnerOptions);
            }
          }
        } else {
          Plugin.isSpinning = false;
          if (typeof app !== 'undefined') {
            app.unblock(target);
          }
        }
      },

      /**
        * Default sort callback function
        * @param data
        * @param sort
        * @param column
        * @returns {*|Array.<T>|{sort, field}|{asc, desc}}
        */
      sortCallback: function(data, sort, column) {
        var type = column['type'] || 'string';
        var format = column['format'] || '';
        var field = column['field'];

        return $(data).sort(function(a, b) {
          var aField = a[field];
          var bField = b[field];

          switch (type) {
            case 'date':
              if (typeof moment === 'undefined') {
                throw new Error('Moment.js is required.');
              }
              var diff = moment(aField, format).diff(moment(bField, format));
              if (sort === 'asc') {
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
              } else {
                return diff < 0 ? 1 : diff > 0 ? -1 : 0;
              }
              break;

            case 'number':
              if (isNaN(parseFloat(aField)) && aField != null) {
                aField = Number(aField.replace(/[^0-9\.-]+/g, ''));
              }
              if (isNaN(parseFloat(bField)) && bField != null) {
                bField = Number(bField.replace(/[^0-9\.-]+/g, ''));
              }
              aField = parseFloat(aField);
              bField = parseFloat(bField);
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;

            case 'html':
              return $(data).sort(function(a, b) {
                // get the text only from html
                aField = $(a[field]).text();
                bField = $(b[field]).text();
                // sort
                if (sort === 'asc') {
                  return aField > bField ? 1 : aField < bField ? -1 : 0;
                } else {
                  return aField < bField ? 1 : aField > bField ? -1 : 0;
                }
              });
              break;

            case 'string':
            default:
              if (sort === 'asc') {
                return aField > bField ? 1 : aField < bField ? -1 : 0;
              } else {
                return aField < bField ? 1 : aField > bField ? -1 : 0;
              }
              break;
          }
        });
      },

      /**
        * Custom debug log
        * @param text
        * @param obj
        */
      log: function(text, obj) {
        if (typeof obj === 'undefined') obj = '';
        if (datatable.debug) {
          console.log(text, obj);
        }
      },

      /**
        * Auto hide columnds overflow in row
        */
      autoHide: function() {
        var hiddenExist = false;
        // force hide enabled
        var hidDefault = $(datatable.table).find('[data-autohide-enabled]');
        if (hidDefault.length) {
          hiddenExist = true;
          hidDefault.hide();
        }

        var toggleHiddenColumns = function(e) {
          e.preventDefault();

          var row = $(this).closest('.' + pfx + 'datatable-row');
          var detailRow = $(row).next();

          if (!$(detailRow).hasClass(pfx + 'datatable-row-detail')) {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.collapse')).addClass(Plugin.getOption('layout.icons.rowDetail.expand'));

            var hiddenCells = $(row).find('.' + pfx + 'datatable-cell:hidden');
            var clonedCells = hiddenCells.clone().show();

            detailRow = $('<tr/>').addClass(pfx + 'datatable-row-detail').insertAfter(row);
            var detailRowTd = $('<td/>').addClass(pfx + 'datatable-detail').attr('colspan', Plugin.getTotalColumns()).appendTo(detailRow);

            var detailSubTable = $('<table/>');
            $(clonedCells).each(function() {
              var field = $(this).data('field');
              var column = $.grep(options.columns, function(n, i) {
                return field === n.field;
              })[0];
              if (typeof column === 'undefined' || column.visible !== false) {
                $(detailSubTable).
                    append($('<tr class="' + pfx + 'datatable-row"></tr>').
                        append($('<td class="' + pfx + 'datatable-cell"></td>').append($('<span/>').append(column.title))).
                        append(this));
              }
            });
            $(detailRowTd).append(detailSubTable);

          } else {
            $(this).find('i').removeClass(Plugin.getOption('layout.icons.rowDetail.expand')).addClass(Plugin.getOption('layout.icons.rowDetail.collapse'));
            $(detailRow).remove();
          }
        };

        setTimeout(function () {
          $(datatable.table).find('.' + pfx + 'datatable-cell').show();
          $(datatable.tableBody).each(function() {
            var recursive = 0;
            while ($(this)[0].offsetWidth < $(this)[0].scrollWidth && recursive < options.columns.length) {
              $(datatable.table).find('.' + pfx + 'datatable-row').each(function(i) {
                var cell = $(this).find('.' + pfx + 'datatable-cell:not(:hidden):not([data-autohide-disabled])').last();
                  if (cell.length) {
                    $(cell).hide();
                    hiddenExist = true;
                  }
              });
              recursive++;
            }
          });

          if (hiddenExist) {
            // toggle show hidden columns
            $(datatable.tableBody).find('.' + pfx + 'datatable-row').each(function() {
              // if no toggle yet
              if($(this).find('.' + pfx + 'datatable-toggle-detail').length === 0) {
                // add toggle
                $(this).prepend($('<td/>').
                    addClass(pfx + 'datatable-cell ' + pfx + 'datatable-toggle-detail').
                    append($('<a/>').
                      addClass(pfx + 'datatable-toggle-detail').
                      attr('href', '').
                      on('click', toggleHiddenColumns).
                      append('<i class="' + Plugin.getOption('layout.icons.rowDetail.collapse') + '"></i>')));
              }

              // check if subtable toggle exist
              if ($(datatable.tableHead).find('.' + pfx + 'datatable-toggle-detail').length === 0) {
                // add empty column to the header and footer
                $(datatable.tableHead).
                  find('.' + pfx + 'datatable-row').
                  first().
                  prepend('<th class="' + pfx + 'datatable-cell ' + pfx + 'datatable-toggle-detail"><span></span></th>');
                $(datatable.tableFoot).
                  find('.' + pfx + 'datatable-row').
                  first().
                  prepend('<th class="' + pfx + 'datatable-cell ' + pfx + 'datatable-toggle-detail"><span></span></th>');
              } else {
                $(datatable.tableHead).find('.' + pfx + 'datatable-toggle-detail').find('span');
              }
            });
          }
        });

        Plugin.adjustCellsWidth.call();
      },

      /**
        * To enable auto columns features for remote data source
        */
      setAutoColumns: function() {
        if (Plugin.getOption('data.autoColumns')) {
          $.each(datatable.dataSet[0], function(k, v) {
            var found = $.grep(options.columns, function(n, i) {
              return k === n.field;
            });
            if (found.length === 0) {
              options.columns.push({field: k, title: k});
            }
          });
          $(datatable.tableHead).find('.' + pfx + 'datatable-row').remove();
          Plugin.setHeadTitle();
          if (Plugin.getOption('layout.footer')) {
            $(datatable.tableFoot).find('.' + pfx + 'datatable-row').remove();
            Plugin.setHeadTitle(datatable.tableFoot);
          }
        }
      },

      /********************
        ** HELPERS
        ********************/

      /**
        * Check if table is a locked colums table
        */
      isLocked: function() {
        var isLocked = Plugin.lockEnabledColumns();
        return isLocked.left.length > 0 || isLocked.right.length > 0;
      },

      isSubtable: function() {
        return util.hasClass(datatable.wrap[0], pfx + 'datatable-subtable') || false;
      },

      /**
        * Get total extra space of an element for width calculation,
        * including padding, margin, border
        * @param element
        * @returns {number}
        */
      getExtraSpace: function(element) {
        var padding = parseInt($(element).css('paddingRight')) +
          parseInt($(element).css('paddingLeft'));
        var margin = parseInt($(element).css('marginRight')) +
          parseInt($(element).css('marginLeft'));
        var border = Math.ceil(
          $(element).css('border-right-width').replace('px', ''));
        return padding + margin + border;
      },

      /**
        * Insert data of array into {{ }} template placeholder
        * @param template
        * @param data
        * @returns {*}
        */
      dataPlaceholder: function(template, data) {
        var result = template;
        $.each(data, function(key, val) {
          result = result.replace('{{' + key + '}}', val);
        });
        return result;
      },

      /**
        * Get table unique ID
        * Note: table unique change each time refreshed
        * @param suffix
        * @returns {*}
        */
      getTableId: function(suffix) {
        if (typeof suffix === 'undefined') suffix = '';
        var id = $(datatable).attr('id');
        if (typeof id === 'undefined') {
          id = $(datatable).attr('class').split(' ')[0];
        }
        return id + suffix;
      },

      /**
        * Get table prefix with depth number
        */
      getTablePrefix: function(suffix) {
        if (typeof suffix !== 'undefined') suffix = '-' + suffix;
        return Plugin.getTableId() + '-' + Plugin.getDepth() + suffix;
      },

      /**
        * Get current table depth of sub table
        * @returns {number}
        */
      getDepth: function() {
        var depth = 0;
        var table = datatable.table;
        do {
          table = $(table).parents('.' + pfx + 'datatable-table');
          depth++;
        } while ($(table).length > 0);
        return depth;
      },

      /**
        * Keep state item
        * @param key
        * @param value
        */
      stateKeep: function(key, value) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;
        if (localStorage) {
          localStorage.setItem(key, JSON.stringify(value));
        }
      },

      /**
        * Get state item
        * @param key
        * @param defValue
        */
      stateGet: function(key, defValue) {
        key = Plugin.getTablePrefix(key);
        if (Plugin.getOption('data.saveState') === false) return;
        var value = null;
        if (localStorage) {
          value = localStorage.getItem(key);
        }
        if (typeof value !== 'undefined' && value !== null) {
          return JSON.parse(value);
        }
      },

      /**
        * Update data in state without clear existing
        * @param key
        * @param value
        */
      stateUpdate: function(key, value) {
        var ori = Plugin.stateGet(key);
        if (typeof ori === 'undefined' || ori === null) ori = {};
        Plugin.stateKeep(key, $.extend({}, ori, value));
      },

      /**
        * Remove state item
        * @param key
        */
      stateRemove: function(key) {
        key = Plugin.getTablePrefix(key);
        if (localStorage) {
          localStorage.removeItem(key);
        }
      },

      /**
        * Get total columns.
        */
      getTotalColumns: function(tablePart) {
        if (typeof tablePart === 'undefined') tablePart = datatable.tableBody;
        return $(tablePart).find('.' + pfx + 'datatable-row').first().find('.' + pfx + 'datatable-cell').length;
      },

      /**
        * Get table row. Useful to get row when current table is in lock
        * mode. Can be used for both lock and normal table mode. By
        * default, returning result will be in a list of <td>.
        * @param tablePart
        * @param row 1-based index
        * @param tdOnly Optional. Default true
        * @returns {*}
        */
      getOneRow: function(tablePart, row, tdOnly) {
        if (typeof tdOnly === 'undefined') tdOnly = true;
        // get list of <tr>
        var result = $(tablePart).find('.' + pfx + 'datatable-row:not(.' + pfx + 'datatable-row-detail):nth-child(' + row + ')');
        if (tdOnly) {
          // get list of <td> or <th>
          result = result.find('.' + pfx + 'datatable-cell');
        }
        return result;
      },

      /**
        * Sort table row at HTML level by column index.
        * todo; Not in use.
        * @param header Header sort clicked
        * @param sort asc|desc. Optional. Default asc
        * @param int Boolean. Optional. Comparison value parse to integer.
        *     Default false
        */
      sortColumn: function(header, sort, int) {
        if (typeof sort === 'undefined') sort = 'asc'; // desc
        if (typeof int === 'undefined') int = false;

        var column = $(header).index();
        var rows = $(datatable.tableBody).find('.' + pfx + 'datatable-row');
        var hIndex = $(header).closest('.' + pfx + 'datatable-lock').index();
        if (hIndex !== -1) {
          rows = $(datatable.tableBody).find('.' + pfx + 'datatable-lock:nth-child(' + (hIndex + 1) + ')').find('.' + pfx + 'datatable-row');
        }

        var container = $(rows).parent();
        $(rows).sort(function(a, b) {
          var tda = $(a).find('td:nth-child(' + column + ')').text();
          var tdb = $(b).find('td:nth-child(' + column + ')').text();

          if (int) {
            // useful for integer type sorting
            tda = parseInt(tda);
            tdb = parseInt(tdb);
          }

          if (sort === 'asc') {
            return tda > tdb ? 1 : tda < tdb ? -1 : 0;
          } else {
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
          }
        }).appendTo(container);
      },

      /**
        * Perform sort remote and local
        */
      sorting: function() {
        var sortObj = {
          init: function() {
            if (options.sortable) {
              $(datatable.tableHead).
                find('.' + pfx + 'datatable-cell:not(.' + pfx + 'datatable-cell-check)').
                addClass(pfx + 'datatable-cell-sort').
                off('click').
                on('click', sortObj.sortClick);
              // first init
              sortObj.setIcon();
            }
          },
          setIcon: function() {
            var meta = Plugin.getDataSourceParam('sort');
            if ($.isEmptyObject(meta)) return;

            var column = Plugin.getColumnByField(meta.field);
            // sort is disabled for this column
            if (typeof column === 'undefined') return;
            if (typeof column.sortable !== 'undefined' && column.sortable === false) return;
            if (typeof column.selector !== 'undefined' && column.selector === true) return;

            // sort icon beside column header
            var td = $(datatable.tableHead).find('.' + pfx + 'datatable-cell[data-field="' + meta.field + '"]').attr('data-sort', meta.sort);
            var sorting = $(td).find('span');
            var icon = $(sorting).find('i');

            var icons = Plugin.getOption('layout.icons.sort');
            // update sort icon; desc & asc
            if ($(icon).length > 0) {
              $(icon).removeAttr('class').addClass(icons[meta.sort]);
            } else {
              $(sorting).append($('<i/>').addClass(icons[meta.sort]));
            }

            // set sorted class to header on init
            $(td).addClass(pfx + 'datatable-cell-sorted');
          },
          sortClick: function(e) {
            var meta = Plugin.getDataSourceParam('sort');
            var field = $(this).data('field');
            var column = Plugin.getColumnByField(field);
            // sort is disabled for this column
            if (typeof column === 'undefined') return;
            if (typeof column.sortable !== 'undefined' && column.sortable === false) return;
            if (typeof column.selector !== 'undefined' && column.selector === true) return;

            // set sorted class to header
            $(datatable.tableHead).find('th').removeClass(pfx + 'datatable-cell-sorted');
            util.addClass(this, pfx + 'datatable-cell-sorted');

            $(datatable.tableHead).find('.' + pfx + 'datatable-cell > span > i').remove();

            if (options.sortable) {
              Plugin.spinnerCallback(true);

              var sort = 'desc';
              if (Plugin.getObject('field', meta) === field) {
                sort = Plugin.getObject('sort', meta);
              }

              // toggle sort
              sort = typeof sort === 'undefined' || sort === 'desc'
                ? 'asc'
                : 'desc';

              // update field and sort params
              meta = {field: field, sort: sort};
              Plugin.setDataSourceParam('sort', meta);

              sortObj.setIcon();

              setTimeout(function() {
                Plugin.dataRender('sort');
                $(datatable).trigger(pfx + 'datatable-on-sort', meta);
              }, 300);
            }
          },
        };
        sortObj.init();
      },

      /**
        * Update JSON data list linked with sort, filter and pagination.
        * Call this method, before using dataSet variable.
        * @returns {*|null}
        */
      localDataUpdate: function() {
        var params = Plugin.getDataSourceParam();
        if (typeof datatable.originalDataSet === 'undefined') {
          datatable.originalDataSet = datatable.dataSet;
        }

        var field = Plugin.getObject('sort.field', params);
        var sort = Plugin.getObject('sort.sort', params);
        var column = Plugin.getColumnByField(field);
        if (typeof column !== 'undefined' && Plugin.getOption('data.serverSorting') !== true) {
          if (typeof column.sortCallback === 'function') {
            datatable.dataSet = column.sortCallback(datatable.originalDataSet, sort, column);
          } else {
            datatable.dataSet = Plugin.sortCallback(datatable.originalDataSet, sort, column);
          }
        } else {
          datatable.dataSet = datatable.originalDataSet;
        }

        // if server filter enable, don't pass local filter
        if (typeof params.query === 'object' && !Plugin.getOption('data.serverFiltering')) {
          params.query = params.query || {};

          var nestedSearch = function(obj) {
            for (var field in obj) {
              if (!obj.hasOwnProperty(field)) continue;
              if (typeof obj[field] === 'string') {
                if (obj[field].toLowerCase() == search || obj[field].toLowerCase().indexOf(search) !== -1) {
                  return true;
                }
              } else if (typeof obj[field] === 'number') {
                if (obj[field] === search) {
                  return true;
                }
              } else if (typeof obj[field] === 'object') {
                if (nestedSearch(obj[field])) {
                  return true;
                }
              }
            }
            return false;
          };

          var search = $(Plugin.getOption('search.input')).val();
          if (typeof search !== 'undefined' && search !== '') {
            search = search.toLowerCase();
            datatable.dataSet = $.grep(datatable.dataSet, nestedSearch);
            // remove generalSearch as we don't need this for next columns filter
            delete params.query[Plugin.getGeneralSearchKey()];
          }

          // remove empty element from array
          $.each(params.query, function(k, v) {
            if (v === '') {
              delete params.query[k];
            }
          });

          // filter array by query
          datatable.dataSet = Plugin.filterArray(datatable.dataSet, params.query);

          // reset array index
          datatable.dataSet = datatable.dataSet.filter(function() {
            return true;
          });
        }

        return datatable.dataSet;
      },

      /**
        * Utility helper to filter array by object pair of {key:value}
        * @param list
        * @param args
        * @param operator
        * @returns {*}
        */
      filterArray: function(list, args, operator) {
        if (typeof list !== 'object') {
          return [];
        }

        if (typeof operator === 'undefined') operator = 'AND';

        if (typeof args !== 'object') {
          return list;
        }

        operator = operator.toUpperCase();

        if ($.inArray(operator, ['AND', 'OR', 'NOT']) === -1) {
          return [];
        }

        var count = Object.keys(args).length;
        var filtered = [];

        $.each(list, function(key, obj) {
          var to_match = obj;

          var matched = 0;
          $.each(args, function(m_key, m_value) {
            m_value = m_value instanceof Array ? m_value : [m_value];
            var match_property = Plugin.getObject(m_key, to_match);
            if (typeof match_property !== 'undefined' && match_property) {
              var lhs = match_property.toString().toLowerCase();
              m_value.forEach(function(item, index) {
                if (item.toString().toLowerCase() == lhs || lhs.indexOf(item.toString().toLowerCase()) !== -1) {
                  matched++;
                }
              });
            }
          });

          if (('AND' == operator && matched == count) ||
            ('OR' == operator && matched > 0) ||
            ('NOT' == operator && 0 == matched)) {
            filtered[key] = obj;
          }
        });

        list = filtered;

        return list;
      },

      /**
        * Reset lock column scroll to 0 when resize
        */
      resetScroll: function() {
        if (typeof options.detail === 'undefined' && Plugin.getDepth() === 1) {
          $(datatable.table).find('.' + pfx + 'datatable-row').css('left', 0);
          $(datatable.table).find('.' + pfx + 'datatable-lock').css('top', 0);
          $(datatable.tableBody).scrollTop(0);
        }
      },

      /**
        * Get column options by field
        * @param field
        * @returns {boolean}
        */
      getColumnByField: function(field) {
        if (typeof field === 'undefined') return;
        var result;
        $.each(options.columns, function(i, column) {
          if (field === column.field) {
            result = column;
            return false;
          }
        });
        return result;
      },

      /**
        * Get default sort column
        */
      getDefaultSortColumn: function() {
        var result;
        $.each(options.columns, function(i, column) {
          if (typeof column.sortable !== 'undefined'
            && $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
            result = {sort: column.sortable, field: column.field};
            return false;
          }
        });
        return result;
      },

      /**
        * Helper to get element dimensions, when the element is hidden
        * @param element
        * @param includeMargin
        * @returns {{width: number, height: number, innerWidth: number,
        *     innerHeight: number, outerWidth: number, outerHeight:
        *     number}}
        */
      getHiddenDimensions: function(element, includeMargin) {
        var props = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block',
          },
          dim = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          hiddenParents = $(element).parents().addBack().not(':visible');
        includeMargin = (typeof includeMargin === 'boolean')
          ? includeMargin
          : false;

        var oldProps = [];
        hiddenParents.each(function() {
          var old = {};

          for (var name in props) {
            old[name] = this.style[name];
            this.style[name] = props[name];
          }

          oldProps.push(old);
        });

        dim.width = $(element).width();
        dim.outerWidth = $(element).outerWidth(includeMargin);
        dim.innerWidth = $(element).innerWidth();
        dim.height = $(element).height();
        dim.innerHeight = $(element).innerHeight();
        dim.outerHeight = $(element).outerHeight(includeMargin);

        hiddenParents.each(function(i) {
          var old = oldProps[i];
          for (var name in props) {
            this.style[name] = old[name];
          }
        });

        return dim;
      },

      getGeneralSearchKey: function() {
        var searchInput = $(Plugin.getOption('search.input'));
        return Plugin.getOption('search.key') || $(searchInput).prop('name');
      },

      /**
        * Get value by dot notation path string and to prevent undefined
        * errors
        * @param path String Dot notation path in string
        * @param object Object to iterate
        * @returns {*}
        */
      getObject: function(path, object) {
        return path.split('.').reduce(function(obj, i) {
          return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
        }, object);
      },

      /**
        * Extend object
        * @param obj
        * @param path
        * @param value
        * @returns {*}
        */
      extendObj: function(obj, path, value) {
        var levels = path.split('.'),
          i = 0;

        function createLevel(child) {
          var name = levels[i++];
          if (typeof child[name] !== 'undefined' && child[name] !== null) {
            if (typeof child[name] !== 'object' &&
              typeof child[name] !== 'function') {
              child[name] = {};
            }
          } else {
            child[name] = {};
          }
          if (i === levels.length) {
            child[name] = value;
          } else {
            createLevel(child[name]);
          }
        }

        createLevel(obj);
        return obj;
      },

      rowEvenOdd: function() {
        // row even class
        $(datatable.tableBody).find('.' + pfx + 'datatable-row').removeClass(pfx + 'datatable-row-even');
        if ($(datatable.wrap).hasClass(pfx + 'datatable-subtable')) {
          $(datatable.tableBody).find('.' + pfx + 'datatable-row:not(.' + pfx + 'datatable-row-detail):even').addClass(pfx + 'datatable-row-even');
        } else {
          $(datatable.tableBody).find('.' + pfx + 'datatable-row:nth-child(even)').addClass(pfx + 'datatable-row-even');
        }
      },

      /********************
        ** PUBLIC API METHODS
        ********************/

      // delay timer
      timer: 0,

      /**
        * Redraw datatable by recalculating its DOM elements, etc.
        * @returns {jQuery}
        */
      redraw: function() {
        Plugin.adjustCellsWidth.call();
        if (Plugin.isLocked()) {
          // fix hiding cell width issue
          Plugin.scrollbar();
          Plugin.resetScroll();
          Plugin.adjustCellsHeight.call();
        }
        Plugin.adjustLockContainer.call();
        Plugin.initHeight.call();
        return datatable;
      },

      /**
        * Shortcode to reload
        * @returns {jQuery}
        */
      load: function() {
        Plugin.reload();
        return datatable;
      },

      /**
        * Datasource reload
        * @returns {jQuery}
        */
      reload: function() {
        var delay = (function() {
          return function(callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        })();
        delay(function() {
          // local only. remote pagination will skip this block
          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }
          Plugin.dataRender();
          $(datatable).trigger(pfx + 'datatable-on-reloaded');
        }, Plugin.getOption('search.delay'));
        return datatable;
      },

      /**
        * Get record by record ID
        * @param id
        * @returns {jQuery}
        */
      getRecord: function(id) {
        if (typeof datatable.tableBody === 'undefined') datatable.tableBody = $(datatable.table).children('tbody');
        $(datatable.tableBody).find('.' + pfx + 'datatable-cell:first-child').each(function(i, cell) {
          if (id == $(cell).text()) {
            var rowNumber = $(cell).closest('.' + pfx + 'datatable-row').index() + 1;
            datatable.API.record = datatable.API.value = Plugin.getOneRow(datatable.tableBody, rowNumber);
            return datatable;
          }
        });
        return datatable;
      },

      /**
        * @deprecated in v5.0.6
        * Get column of current record ID
        * @param columnName
        * @returns {jQuery}
        */
      getColumn: function(columnName) {
        Plugin.setSelectedRecords();
        datatable.API.value = $(datatable.API.record).find('[data-field="' + columnName + '"]');
        return datatable;
      },

      /**
        * Destroy datatable to original DOM state before datatable was
        * initialized
        * @returns {jQuery}
        */
      destroy: function() {
        $(datatable).parent().find('.' + pfx + 'datatable-pager').remove();
        var initialDatatable = $(datatable.initialDatatable).addClass(pfx + 'datatable-destroyed').show();
        $(datatable).replaceWith(initialDatatable);
        datatable = initialDatatable;
        $(datatable).trigger(pfx + 'datatable-on-destroy');
        Plugin.isInit = false;

        // clean up variables
        initialDatatable = null;
        datatable.dataSet = null;
        datatable.originalDataSet = null;
        datatable.tableHead = null;
        datatable.tableBody = null;
        datatable.table = null;
        datatable.wrap = null;
        datatable.API = {
          record: null,
          value: null,
          params: null,
        };

        Plugin.ajaxParams = {};
        Plugin.pagingObject = {};
        Plugin.nodeTr = [];
        Plugin.nodeTd = [];
        Plugin.nodeCols = [];
        Plugin.recentNode = [];

        return initialDatatable;
      },

      /**
        * Sort by column field
        * @param field
        * @param sort
        */
      sort: function(field, sort) {
        // toggle sort
        sort = typeof sort === 'undefined' ? 'asc' : sort;

        Plugin.spinnerCallback(true);

        // update field and sort params
        var meta = {field: field, sort: sort};
        Plugin.setDataSourceParam('sort', meta);

        setTimeout(function() {
          Plugin.dataRender('sort');
          $(datatable).trigger(pfx + 'datatable-on-sort', meta);
          $(datatable.tableHead).find('.' + pfx + 'datatable-cell > span > i').remove();
        }, 300);

        return datatable;
      },

      /**
        * @deprecated in v5.0.6
        * Get current selected column value
        * @returns {jQuery}
        */
      getValue: function() {
        return $(datatable.API.value).text();
      },

      /**
        * Set checkbox active
        * @param cell JQuery selector or checkbox ID
        */
      setActive: function(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox-single > [type="checkbox"][value="' + cell + '"]');
        }

        $(cell).prop('checked', true);

        var ids = [];
        $(cell).each(function(i, td) {
          // normal table
          var row = $(td).closest('tr').addClass(pfx + 'datatable-row-active');

          var id = $(td).attr('value');
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });

        $(datatable).trigger(pfx + 'datatable-on-check', [ids]);
      },

      /**
        * Set checkbox inactive
        * @param cell JQuery selector or checkbox ID
        */
      setInactive: function(cell) {
        if (typeof cell === 'string') {
          // set by checkbox id
          cell = $(datatable.tableBody).find('.' + pfx + 'checkbox-single > [type="checkbox"][value="' + cell + '"]');
        }

        $(cell).prop('checked', false);

        var ids = [];
        $(cell).each(function(i, td) {
          // normal table
          var row = $(td).closest('tr').removeClass(pfx + 'datatable-row-active');

          var id = $(td).attr('value');
          if (typeof id !== 'undefined') {
            ids.push(id);
          }
        });

        $(datatable).trigger(pfx + 'datatable-on-uncheck', [ids]);
      },

      /**
        * Set all checkboxes active or inactive
        * @param active
        */
      setActiveAll: function(active) {
        var checkboxes = $(datatable.table).
          find('> tbody, > thead').
          find('tr').not('.' + pfx + 'datatable-row-subtable').
          find('.' + pfx + 'datatable-cell-check [type="checkbox"]');
        if (active) {
          Plugin.setActive(checkboxes);
        } else {
          Plugin.setInactive(checkboxes);
        }
      },

      /**
        * @deprecated in v5.0.6
        * Get selected rows which are active
        * @returns {jQuery}
        */
      setSelectedRecords: function() {
        datatable.API.record = $(datatable.tableBody).find('.' + pfx + 'datatable-row-active');
        return datatable;
      },

      /**
        * Get selected records
        * @returns {null}
        */
      getSelectedRecords: function() {
        // support old method
        Plugin.setSelectedRecords();
        datatable.API.record = datatable.rows('.' + pfx + 'datatable-row-active').nodes();
        return datatable.API.record;
      },

      /**
        * Get options by dots notation path
        * @param path String Dot notation path in string
        * @returns {*}
        */
      getOption: function(path) {
        return Plugin.getObject(path, options);
      },

      /**
        * Set global options nodes by dots notation path
        * @param path
        * @param object
        */
      setOption: function(path, object) {
        options = Plugin.extendObj(options, path, object);
      },

      /**
        * Search filter for local & remote
        * @param value
        * @param columns. Optional list of columns to be filtered.
        */
      search: function(value, columns) {
        if (typeof columns !== 'undefined') columns = $.makeArray(columns);
        var delay = (function() {
          return function(callback, ms) {
            clearTimeout(Plugin.timer);
            Plugin.timer = setTimeout(callback, ms);
          };
        })();

        delay(function() {
          // get query parameters
          var query = Plugin.getDataSourceQuery();

          // search not by columns
          if (typeof columns === 'undefined' && typeof value !== 'undefined') {
            var key = Plugin.getGeneralSearchKey();
            query[key] = value;
          }

          // search by columns, support multiple columns
          if (typeof columns === 'object') {
            $.each(columns, function(k, column) {
              query[column] = value;
            });
            // remove empty element from arrays
            $.each(query, function(k, v) {
              if (v === '' || $.isEmptyObject(v)) {
                delete query[k];
              }
            });
          }

          Plugin.setDataSourceQuery(query);

          // reset pagination to 1 when doing seearching
          datatable.setDataSourceParam('pagination', Object.assign({}, datatable.getDataSourceParam('pagination'), {page: 1}));

          // local filter only. remote pagination will skip this block
          if (!options.data.serverFiltering) {
            Plugin.localDataUpdate();
          }
          Plugin.dataRender('search');
        }, Plugin.getOption('search.delay'));
      },

      /**
        * Set datasource params extract
        * @param param
        * @param value
        */
      setDataSourceParam: function(param, value) {
        datatable.API.params = $.extend({}, {
          pagination: {page: 1, perpage: Plugin.getOption('data.pageSize')},
          sort: Plugin.getDefaultSortColumn(),
          query: {},
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));

        datatable.API.params = Plugin.extendObj(datatable.API.params, param, value);

        Plugin.stateKeep(Plugin.stateId, datatable.API.params);
      },

      /**
        * Get datasource params
        * @param param
        */
      getDataSourceParam: function(param) {
        datatable.API.params = $.extend({}, {
          pagination: {page: 1, perpage: Plugin.getOption('data.pageSize')},
          sort: Plugin.getDefaultSortColumn(),
          query: {},
        }, datatable.API.params, Plugin.stateGet(Plugin.stateId));

        if (typeof param === 'string') {
          return Plugin.getObject(param, datatable.API.params);
        }

        return datatable.API.params;
      },

      /**
        * Shortcode to datatable.getDataSourceParam('query');
        * @returns {*}
        */
      getDataSourceQuery: function() {
        return Plugin.getDataSourceParam('query') || {};
      },

      /**
        * Shortcode to datatable.setDataSourceParam('query', query);
        * @param query
        */
      setDataSourceQuery: function(query) {
        Plugin.setDataSourceParam('query', query);
      },

      /**
        * Get current page number
        * @returns {number}
        */
      getCurrentPage: function() {
        return $(datatable.table).
          siblings('.' + pfx + 'datatable-pager').
          last().
          find('.' + pfx + 'datatable-pager-nav').
          find('.' + pfx + 'datatable-pager-link.' + pfx + 'datatable-pager-link-active').
          data('page') || 1;
      },

      /**
        * Get selected dropdown page size
        * @returns {*|number}
        */
      getPageSize: function() {
        return $(datatable.table).siblings('.' + pfx + 'datatable-pager').last().find('select.' + pfx + 'datatable-pager-size').val() || 10;
      },

      /**
        * Get total rows
        */
      getTotalRows: function() {
        return datatable.API.params.pagination.total;
      },

      /**
        * Get full dataset in grid
        * @returns {*|null|Array}
        */
      getDataSet: function() {
        return datatable.originalDataSet;
      },

      nodeTr: [],
      nodeTd: [],
      nodeCols: [],
      recentNode: [],

      table: function() {
        if (typeof datatable.table !== 'undefined') {
          return datatable.table;
        }
      },

      /**
        * Select a single row from the table
        * @param selector
        * @returns {jQuery}
        */
      row: function(selector) {
        Plugin.rows(selector);
        Plugin.nodeTr = Plugin.recentNode = $(Plugin.nodeTr).first();
        return datatable;
      },

      /**
        * Select multiple rows from the table
        * @param selector
        * @returns {jQuery}
        */
      rows: function(selector) {
        if (Plugin.isLocked()) {
          Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.' + pfx + 'datatable-lock-scroll > .' + pfx + 'datatable-row');
        } else {
          Plugin.nodeTr = Plugin.recentNode = $(datatable.tableBody).find(selector).filter('.' + pfx + 'datatable-row');
        }
        return datatable;
      },

      /**
        * Select a single column from the table
        * @param index zero-based index
        * @returns {jQuery}
        */
      column: function(index) {
        Plugin.nodeCols = Plugin.recentNode = $(datatable.tableBody).find('.' + pfx + 'datatable-cell:nth-child(' + (index + 1) + ')');
        return datatable;
      },

      /**
        * Select multiple columns from the table
        * @param selector
        * @returns {jQuery}
        */
      columns: function(selector) {
        var context = datatable.table;
        if (Plugin.nodeTr === Plugin.recentNode) {
          context = Plugin.nodeTr;
        }
        var columns = $(context).find('.' + pfx + 'datatable-cell[data-field="' + selector + '"]');
        if (columns.length > 0) {
          Plugin.nodeCols = Plugin.recentNode = columns;
        } else {
          Plugin.nodeCols = Plugin.recentNode = $(context).find(selector).filter('.' + pfx + 'datatable-cell');
        }
        return datatable;
      },

      cell: function(selector) {
        Plugin.cells(selector);
        Plugin.nodeTd = Plugin.recentNode = $(Plugin.nodeTd).first();
        return datatable;
      },

      cells: function(selector) {
        var cells = $(datatable.tableBody).find('.' + pfx + 'datatable-cell');
        if (typeof selector !== 'undefined') {
          cells = $(cells).filter(selector);
        }
        Plugin.nodeTd = Plugin.recentNode = cells;
        return datatable;
      },

      /**
        * Delete the selected row from the table
        * @returns {jQuery}
        */
      remove: function() {
        if ($(Plugin.nodeTr.length) && Plugin.nodeTr === Plugin.recentNode) {
          $(Plugin.nodeTr).remove();
        }
        Plugin.layoutUpdate();
        return datatable;
      },

      /**
        * Show or hide the columns or rows
        */
      visible: function(bool) {
        if ($(Plugin.recentNode.length)) {
          var locked = Plugin.lockEnabledColumns();
          if (Plugin.recentNode === Plugin.nodeCols) {
            var index = Plugin.recentNode.index();

            if (Plugin.isLocked()) {
              var scrollColumns = $(Plugin.recentNode).closest('.' + pfx + 'datatable-lock-scroll').length;
              if (scrollColumns) {
                // is at center of scrollable area
                index += locked.left.length + 1;
              } else if ($(Plugin.recentNode).closest('.' + pfx + 'datatable-lock-right').length) {
                // is at the right locked table
                index += locked.left.length + scrollColumns + 1;
              }
            }
          }

          if (bool) {
            if (Plugin.recentNode === Plugin.nodeCols) {
              delete options.columns[index].visible;
            }
            $(Plugin.recentNode).show();
          } else {
            if (Plugin.recentNode === Plugin.nodeCols) {
              Plugin.setOption('columns.' + (index) + '.visible', false);
            }
            $(Plugin.recentNode).hide();
          }
          Plugin.columnHide();
          Plugin.redraw();
        }
      },

      /**
        * Get the the DOM element for the selected rows or columns
        * @returns {Array}
        */
      nodes: function() {
        return Plugin.recentNode;
      },

      /**
        * will be implemented soon
        * @returns {jQuery}
        */
      dataset: function() {
        return datatable;
      },

      /**
        * Open page by number
        * @param page number
        */
      gotoPage: function (page) {
        if (typeof Plugin.pagingObject !== 'undefined') {
          Plugin.isInit = true;
          Plugin.pagingObject.openPage(page);
        }
      },

    };

    /**
      * Public API methods can be used directly by datatable
      */
    $.each(Plugin, function(funcName, func) {
      datatable[funcName] = func;
    });

    // initialize main datatable plugin
    if (typeof options !== 'undefined') {
      if (typeof options === 'string') {
        var method = options;
        datatable = $(this).data(pluginName);
        if (typeof datatable !== 'undefined') {
          options = datatable.options;
          Plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      } else {
        if (!datatable.data(pluginName) && !$(this).hasClass(pfx + 'datatable-loaded')) {
          datatable.dataSet = null;
          datatable.textAlign = {
            left: pfx + 'datatable-cell-left',
            center: pfx + 'datatable-cell-center',
            right: pfx + 'datatable-cell-right',
          };

          // merge default and user defined options
          options = $.extend(true, {}, $.fn[pluginName].defaults, options);

          datatable.options = options;

          // init plugin process
          Plugin.init.apply(this, [options]);

          $(datatable.wrap).data(pluginName, datatable);
        }
      }
    } else {
      // get existing instance datatable
      datatable = $(this).data(pluginName);
      if (typeof datatable === 'undefined') {
        $.error(pluginName + ' not initialized');
      }
      options = datatable.options;
    }

    return datatable;
  };

  // default options
  $.fn[pluginName].defaults = {
    // datasource definition
    data: {
      type: 'local',
      source: null,
      pageSize: 10, // display records per page
      saveState: true,

      serverPaging: false,
      serverFiltering: false,
      serverSorting: false,

      autoColumns: false,
      attr: {
        rowProps: [],
      },
    },

    // layout definition
    layout: {
      theme: 'default', // datatable will support multiple themes and designs
      class: pfx + 'datatable-primary', // custom wrapper class
      scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
      height: null, // datatable's body's fixed height
      minHeight: null,
      footer: false, // display/hide footer
      header: true, // display/hide header
      customScrollbar: true, // set false to disable custom scrollbar

      // datatable spinner
      spinner: {
        overlayColor: '#000000',
        opacity: 0,
        type: 'loader',
        state: 'primary',
        message: true,
      },

      // datatable UI icons
      icons: {
        sort: {asc: 'flaticon2-arrow-up', desc: 'flaticon2-arrow-down'},
        pagination: {
          next: 'flaticon2-next',
          prev: 'flaticon2-back',
          first: 'flaticon2-fast-back',
          last: 'flaticon2-fast-next',
          more: 'flaticon-more-1',
        },
        rowDetail: {expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right'},
      },
    },

    // column sorting
    sortable: true,

    // resize column size with mouse drag coming soon)
    resizable: false,

    // column based filtering (coming soon)
    filterable: false,

    pagination: true,

    // inline and bactch editing (cooming soon)
    editable: false,

    // columns definition
    columns: [],

    search: {
      // enable trigger search by keyup enter
      onEnter: false,
      // input text for search
      input: null,
      // search delay in milliseconds
      delay: 400,
      //	remote server search key value
      key: null
    },

    rows: {
      // deprecated
      callback: function() {
      },
      // call before row template
      beforeTemplate: function() {
      },
      // call after row template
      afterTemplate: function() {
      },
      autoHide: true,
    },

    // toolbar
    toolbar: {
      // place pagination and displayInfo blocks according to the array order
      layout: ['pagination', 'info'],

      // toolbar placement can be at top or bottom or both top and bottom repeated
      placement: ['bottom'],  //'top', 'bottom'

      // toolbar items
      items: {
        // pagination
        pagination: {
          // pagination type(default or scroll)
          type: 'default',

          // number of pages to display by breakpoints
          pages: {
            desktop: {
              layout: 'default',
              pagesNumber: 5,
            },
            tablet: {
              layout: 'default',
              pagesNumber: 3,
            },
            mobile: {
              layout: 'compact',
            },
          },

          // navigation buttons
          navigation: {
            prev: true, // display prev button
            next: true, // display next button
            first: true, // display first button
            last: true, // display last button
            more: false // display more button
          },

          // page size select
          pageSizeSelect: [], // display dropdown to select pagination size. -1 is used for "ALl" option
        },

        // records info
        info: true,
      },
    },

    // here we will keep all strings and message used by datatable UI so developer can easiliy translate to any language.
    // By default the stirngs will be in the plugin source and here can override it
    translate: {
      records: {
        processing: 'Пожалуйста подождите...',
        noRecords: 'Не найдено',
      },
      toolbar: {
        pagination: {
          items: {
            default: {
              first: 'Первая страница',
              prev: 'Предыдущая страница',
              next: 'Следующая страница',
              last: 'Последняя страница',
              more: 'Больше страниц',
              input: 'Номер страницы',
              select: 'Количество строк',
              all: 'all',
            },
            info: 'Показано {{start}} - {{end}} из {{total}}',
          },
        },
      },
    },

    extensions: {},
  };

}(jQuery));

"use strict";
(function($) {

  var pluginName = 'KTDatatable';
  var pfx = '';

  $.fn[pluginName] = $.fn[pluginName] || {};

  /**
    * @param datatable Main datatable plugin instance
    * @param options Extension options
    * @returns {*}
    */
  $.fn[pluginName].checkbox = function(datatable, options) {
    var Extension = {
      selectedAllRows: false,
      selectedRows: [],
      unselectedRows: [],

      init: function() {
        if (Extension.selectorEnabled()) {
          // reset
          datatable.setDataSourceParam(options.vars.selectedAllRows, false);
          datatable.stateRemove('checkbox');

          // requestIds is not null
          if (options.vars.requestIds) {
            // request ids in response
            datatable.setDataSourceParam(options.vars.requestIds, true);
          }

          // remove selected checkbox on datatable reload
          $(datatable).on(pfx + 'datatable-on-reloaded', function() {
            datatable.stateRemove('checkbox');
            datatable.setDataSourceParam(options.vars.selectedAllRows, false);
            Extension.selectedAllRows = false;
            Extension.selectedRows = [];
            Extension.unselectedRows = [];
          });

          // select all on extension init
          Extension.selectedAllRows = datatable.getDataSourceParam(options.vars.selectedAllRows);

          $(datatable).on(pfx + 'datatable-on-layout-updated', function(e, args) {
            if (args.table != $(datatable.wrap).attr('id')) {
              return;
            }
            datatable.ready(function() {
              Extension.initVars();
              Extension.initEvent();
              Extension.initSelect();
            });
          });

          $(datatable).on(pfx + 'datatable-on-check', function(e, ids) {
            ids.forEach(function(id) {
              Extension.selectedRows.push(id);
              // // remove from unselected rows
              Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = Extension.selectedRows.filter(Extension.unique);
            storage['unselectedRows'] = Extension.unselectedRows.filter(Extension.unique);
            datatable.stateKeep('checkbox', storage);
          });
          $(datatable).on(pfx + 'datatable-on-uncheck', function(e, ids) {
            ids.forEach(function(id) {
              Extension.unselectedRows.push(id);
              // // remove from selected rows
              Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
            });
            var storage = {};
            storage['selectedRows'] = Extension.selectedRows.filter(Extension.unique);
            storage['unselectedRows'] = Extension.unselectedRows.filter(Extension.unique);
            storage['unselectedRows'] = Extension.unselectedRows.filter(Extension.unique);
            datatable.stateKeep('checkbox', storage);
          });
        }
      },

      /**
        * Init checkbox clicks event
        */
      initEvent: function() {
        // select all checkbox click
        $(datatable.tableHead).find('.' + pfx + 'checkbox-all > [type="checkbox"]').click(function(e) {
          // clear selected and unselected rows
          Extension.selectedRows = Extension.unselectedRows = [];
          datatable.stateRemove('checkbox');

          // select all rows
          Extension.selectedAllRows = !!$(this).is(':checked');

          // local select all current page rows
          if (!options.vars.requestIds) {
            if ($(this).is(':checked')) {
              Extension.selectedRows = $.makeArray($(datatable.tableBody).find('.' + pfx + 'checkbox-single > [type="checkbox"]').map(function(i, chk) {
                return $(chk).val();
              }));
            }
            var storage = {};
            storage['selectedRows'] = Extension.selectedRows.filter(Extension.unique);
            datatable.stateKeep('checkbox', storage);
          }

          // keep selectedAllRows in datasource params
          datatable.setDataSourceParam(options.vars.selectedAllRows, Extension.selectedAllRows);

          $(datatable).trigger(pfx + 'datatable-on-click-checkbox', [$(this)]);
        });

        // single row checkbox click
        $(datatable.tableBody).find('.' + pfx + 'checkbox-single > [type="checkbox"]').click(function(e) {
          var id = $(this).val();
          if ($(this).is(':checked')) {
            Extension.selectedRows.push(id);
            // remove from unselected rows
            Extension.unselectedRows = Extension.remove(Extension.unselectedRows, id);
          }
          else {
            Extension.unselectedRows.push(id);
            // remove from selected rows
            Extension.selectedRows = Extension.remove(Extension.selectedRows, id);
          }

          // local checkbox header check
          if (!options.vars.requestIds && Extension.selectedRows.length < 1) {
            // remove select all checkbox, if there is no checked checkbox left
            $(datatable.tableHead).find('.' + pfx + 'checkbox-all > [type="checkbox"]').prop('checked', false);
          }

          var storage = {};
          storage['selectedRows'] = Extension.selectedRows.filter(Extension.unique);
          storage['unselectedRows'] = Extension.unselectedRows.filter(Extension.unique);
          datatable.stateKeep('checkbox', storage);

          $(datatable).trigger(pfx + 'datatable-on-click-checkbox', [$(this)]);
        });
      },

      unique: function(value, index, self) {
        return self.indexOf(value) === index;
      },

      initSelect: function() {
        // selected all rows from server
        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (!datatable.hasClass(pfx + 'datatable-error')) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox-all > [type="checkbox"]').prop('checked', true);
          }

          // set all checkbox in table body
          datatable.setActiveAll(true);

          // remove unselected rows
          Extension.unselectedRows.forEach(function(id) {
            datatable.setInactive(id);
          });

        }
        else {
          // single check for server and local
          Extension.selectedRows.forEach(function(id) {
            datatable.setActive(id);
          });

          // local checkbox; check if all checkboxes of currect page are checked
          if (!datatable.hasClass(pfx + 'datatable-error') && $(datatable.tableBody).find('.' + pfx + 'checkbox-single > [type="checkbox"]').not(':checked').length < 1) {
            // set header select all checkbox checked
            $(datatable.tableHead).find('.' + pfx + 'checkbox-all > [type="checkbox"]').prop('checked', true);
          }
        }
      },

      /**
        * Check if selector is enabled from options
        */
      selectorEnabled: function() {
        return $.grep(datatable.options.columns, function(n, i) {
          return n.selector || false;
        })[0];
      },

      initVars: function() {
        // get single select/unselect from localstorage
        var storage = datatable.stateGet('checkbox');
        if (typeof storage !== 'undefined') {
          Extension.selectedRows = storage['selectedRows'] || [];
          Extension.unselectedRows = storage['unselectedRows'] || [];
        }
      },

      getSelectedId: function(path) {
        Extension.initVars();

        // server selected all rows
        if (Extension.selectedAllRows && options.vars.requestIds) {
          if (typeof path === 'undefined') {
            path = options.vars.rowIds;
          }

          // if selected all rows, return id from response meta
          var selectedAllRows = datatable.getObject(path, datatable.lastResponse) || [];

          if (selectedAllRows.length > 0) {
            // remove single unselected rows from selectedAllRows ids from server response emta
            Extension.unselectedRows.forEach(function(id) {
              selectedAllRows = Extension.remove(selectedAllRows, parseInt(id));
            });
          }
          return selectedAllRows.filter(Extension.unique);
        }

        // else return single checked selected rows
        return Extension.selectedRows.filter(Extension.unique);
      },

      remove: function(array, element) {
        return array.filter(function(e) {
          return e !== element;
        });
      },
    };

    // make the extension accessible from datatable init
    datatable.checkbox = function() {
      return Extension;
    };

    if (typeof options === 'object') {
      options = $.extend(true, {}, $.fn[pluginName].checkbox.default, options);
      Extension.init.apply(this, [options]);
    }

    return datatable;
  };

  $.fn[pluginName].checkbox.default = {
    vars: {
      // select all rows flag to be sent to the server
      selectedAllRows: 'selectedAllRows',
      // request id parameter's name
      requestIds: 'requestIds',
      // response path to all rows id
      rowIds: 'meta.rowIds',
    },
  };

}(jQuery));

var defaults = {
  layout: {
    icons: {
      pagination: {
        next: 'flaticon2-next',
        prev: 'flaticon2-back',
        first: 'flaticon2-fast-back',
        last: 'flaticon2-fast-next',
        more: 'flaticon-more-1',
      },
      rowDetail: {expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right'},
    }
  }
};

if (KTUtil.isRTL()) {
  defaults = {
    layout: {
      icons: {
        pagination: {
          next: 'flaticon2-back',
          prev: 'flaticon2-next',
          first: 'flaticon2-fast-next',
          last: 'flaticon2-fast-back',
        },
        rowDetail: {collapse: 'fa fa-caret-down', expand: 'fa fa-caret-right'},
      }
    }
  }
}

$.extend(true, $.fn.KTDatatable.defaults, defaults);

"use strict";

// Initialization
KTUtil.ready(function() {
    ////////////////////////////////////////////////////
    // Layout Base Partials(mandatory for core layout)//
    ////////////////////////////////////////////////////

    // Init Desktop & Mobile Headers
    if (typeof KTLayoutHeader !== 'undefined') {
        KTLayoutHeader.init('kt_header', 'kt_header_mobile');
    }

    // Init Header Menu
    if (typeof KTLayoutHeaderMenu !== 'undefined') {
        KTLayoutHeaderMenu.init('kt_header_menu', 'kt_header_menu_wrapper');
    }

    // Init Header Topbar For Mobile Mode
    if (typeof KTLayoutHeaderTopbar !== 'undefined') {
        KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    }

    // Init Subheader
    if (typeof KTLayoutSubheader !== 'undefined') {
        KTLayoutSubheader.init('kt_subheader');
    }

    // Init Brand Panel For Logo
    if (typeof KTLayoutBrand !== 'undefined') {
        KTLayoutBrand.init('kt_brand');
    }

    // Init Aside
    if (typeof KTLayoutAside !== 'undefined') {
        KTLayoutAside.init('kt_aside');
    }

    // Init Aside Menu Toggle
    if (typeof KTLayoutAsideToggle !== 'undefined') {
        KTLayoutAsideToggle.init('kt_aside_toggle');
    }

    // Init Aside Menu
    if (typeof KTLayoutAsideMenu !== 'undefined') {
        KTLayoutAsideMenu.init('kt_aside_menu');
    }

    // Init Content
    if (typeof KTLayoutContent !== 'undefined') {
        KTLayoutContent.init('kt_content');
    }

    // Init Footer
    if (typeof KTLayoutFooter !== 'undefined') {
        KTLayoutFooter.init('kt_footer');
    }

    // Init Sidebar
    if (typeof KTLayoutSidebar !== 'undefined') {
        KTLayoutSidebar.init('kt_sidebar');
    }
});

"use strict";

var KTLayoutAsideMenu = function() {
    // Private properties
    var _body;
    var _element;
    var _menuObject;

  // Initialize
  var _init = function() {
    var menuDesktopMode = (KTUtil.attr(_element, 'data-menu-dropdown') === '1' ? 'dropdown' : 'accordion');
        var scroll;

    if (KTUtil.attr(_element, 'data-menu-scroll') === '1') {
      scroll = {
        rememberPosition: true, // Remember position on page reload
        height: function() { // Calculate available scrollable area height
                    if (KTUtil.isBreakpointDown('lg')) {
                        return;
                    }

          var height = parseInt(KTUtil.getViewPort().height);
          height = height - KTLayoutBrand.getHeight();

          height = height - (parseInt(KTUtil.css(_element, 'marginBottom')) + parseInt(KTUtil.css(_element, 'marginTop')));

          return height;
        }
      };
    }

    _menuObject = new KTMenu(_element, {
      // Vertical scroll
      scroll: scroll,

      // Submenu setup
      submenu: {
        desktop: menuDesktopMode,
        tablet: 'accordion', // menu set to accordion in tablet mode
        mobile: 'accordion' // menu set to accordion in mobile mode
      },

      // Accordion setup
      accordion: {
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });
  }

    var _initHover = function() {
        // Handle Minimized Aside Hover
    if (KTUtil.hasClass(_body, 'aside-fixed') && KTUtil.hasClass(_body, 'aside-minimize-hoverable')) {
      var insideTm;
      var outsideTm;

            // Handle Aside Hover Mode
      KTUtil.addEvent(_element, 'mouseenter', function(e) {
        e.preventDefault();

        if (KTUtil.isBreakpointUp('lg') === false) {
          return;
        }

        if (outsideTm) {
          clearTimeout(outsideTm);
          outsideTm = null;
        }

                if (insideTm) {
          clearTimeout(insideTm);
          insideTm = null;
        }

        insideTm = setTimeout(function() {
          if (KTUtil.hasClass(_body, 'aside-minimize') && KTUtil.isBreakpointUp('lg')) {
            // Hover class
            KTUtil.addClass(_body, 'aside-minimize-hover');

            KTLayoutAsideMenu.getMenu().scrollUpdate();
            KTLayoutAsideMenu.getMenu().scrollTop();
          }
        }, 50);
      });

      KTUtil.addEvent(KTLayoutAside.getElement(), 'mouseleave', function(e) {
        e.preventDefault();

        if (KTUtil.isBreakpointUp('lg') === false) {
          return;
        }

        if (insideTm) {
          clearTimeout(insideTm);
          insideTm = null;
        }

                if (outsideTm) {
          clearTimeout(outsideTm);
          outsideTm = null;
        }

        outsideTm = setTimeout(function() {
            if (KTUtil.hasClass(_body, 'aside-minimize-hover') && KTUtil.isBreakpointUp('lg')) {
              KTUtil.removeClass(_body, 'aside-minimize-hover');

            // Hover class
                        KTLayoutAsideMenu.getMenu().scrollUpdate();
            KTLayoutAsideMenu.getMenu().scrollTop();
          }
        }, 100);
      });
    }
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize menu
            _init();
            _initHover();
    },

    getElement: function() {
      return _element;
    },

        getMenu: function() {
      return _menuObject;
    },

        pauseDropdownHover: function(time) {
      if (_menuObject) {
        _menuObject.pauseDropdownHover(time);
      }
    },

    closeMobileOffcanvas: function() {
      if (_menuObject && KTUtil.isMobileDevice()) {
        _menuObject.hide();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutAsideMenu;
}

"use strict";

var KTLayoutAsideToggle = function() {
    // Private properties
    var _body;
    var _element;
    var _toggleObject;

  // Initialize
  var _init = function() {
    _toggleObject = new KTToggle(_element, _body, {
      targetState: 'aside-minimize',
      toggleState: 'active'
    });

    _toggleObject.on('toggle', function(toggle) {
      KTUtil.addClass(_body, 'aside-minimizing');
            KTUtil.transitionEnd(_body, function() {
                KTUtil.removeClass(_body, 'aside-minimizing');
      });

            // Update sticky card
            KTLayoutStickyCard.update();

            // Pause header menu dropdowns
            KTLayoutHeaderMenu.pauseDropdownHover(800);

            // Pause aside menu dropdowns
      KTLayoutAsideMenu.pauseDropdownHover(800);

            // Reload datatable
      var datatables = $('.kt-datatable');
      if (datatables) {
        datatables.each(function() {
          $(this).KTDatatable('redraw');
        });
      }

      // Remember state in cookie
      KTCookie.setCookie('kt_aside_toggle_state', toggle.getState());
      // to set default minimized left aside use this cookie value in your
      // server side code and add "kt-primary--minimize aside-minimize" classes to
      // the body tag in order to initialize the minimized left aside mode during page loading.
    });

    _toggleObject.on('beforeToggle', function(toggle) {
      if (KTUtil.hasClass(_body, 'aside-minimize') === false && KTUtil.hasClass(_body, 'aside-minimize-hover')) {
        KTUtil.removeClass(_body, 'aside-minimize-hover');
      }
    });
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
    },

        getElement: function() {
            return _element;
        },

        getToggle: function() {
      return _toggleObject;
    },

    onToggle: function(handler) {
      if (typeof _toggleObject.element !== 'undefined') {
        _toggleObject.on('toggle', handler);
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutAsideToggle;
}

"use strict";

var KTLayoutAside = function() {
    // Private properties
    var _body;
    var _element;
    var _offcanvasObject;

    // Private functions
  // Initialize
  var _init = function() {
    var offcanvasClass = KTUtil.hasClass(_element, 'aside-offcanvas-default') ? 'aside-offcanvas-default' : 'aside';

        // Initialize mobile aside offcanvas
    _offcanvasObject = new KTOffcanvas(_element, {
      baseClass: offcanvasClass,
      overlay: true,
      closeBy: 'kt_aside_close_btn',
      toggleBy: {
        target: 'kt_aside_mobile_toggle',
        state: 'mobile-toggle-active'
      }
    });
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
        },

        getElement: function() {
            return _element;
        },

        getOffcanvas: function() {
            return _offcanvasObject;
        },

        isFixed: function() {
            return KTUtil.hasClass(_body, 'aside-fixed');
        },

        isMinimized: function() {
            return (KTUtil.hasClass(_body, 'aside-fixed') && KTUtil.hasClass(_body, 'aside-minimize'));
        },

        isHoverable: function() {
            return (KTUtil.hasClass(_body, 'aside-fixed') && KTUtil.hasClass(_body, 'aside-minimize-hoverable'));
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutAside;
}

"use strict";

var KTLayoutBrand = function() {
    // Private properties
    var _element;

    // Private functions
    var _getHeight = function() {
        var height = 0;

        if (_element) {
            height = KTUtil.actualHeight(_element);
        }

        return height;
    }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }
    },

        getElement: function() {
            return _element;
        },

        getHeight: function() {
            return _getHeight();
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutBrand;
}

"use strict";

var KTLayoutContent = function() {
    // Private properties
    var _element;

  // Private functions
  var _getHeight = function() {
    var height;

    height = KTUtil.getViewPort().height;

        if (_element) {
            height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));
        }        

        height = height - KTLayoutHeader.getHeight();
        height = height - KTLayoutSubheader.getHeight();
        height = height - KTLayoutFooter.getHeight();

    return height;
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
    },

    getHeight: function() {
      return _getHeight();
    },

        getElement: function() {
            return _element;
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutContent;
}

"use strict";

var KTLayoutFooter = function() {
    // Private properties
    var _element;

  // Private functions
  var _getHeight = function() {
    var height = 0;

        if (_element) {
            height = KTUtil.actualHeight(_element);
        }

    return height;
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
    },

    getHeight: function() {
      return _getHeight();
    },

        getElement: function() {
            return _element;
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutFooter;
}

"use strict";

var KTLayoutHeaderMenu = function() {
    // Private properties
  var _menuElement;
    var _menuObject;
    var _offcanvasElement;
    var _offcanvasObject;

    // Private functions
  var _init = function() {
    _offcanvasObject = new KTOffcanvas(_offcanvasElement, {
      overlay: true,
      baseClass: 'header-menu-wrapper',
      closeBy: 'kt_header_menu_mobile_close_btn',
      toggleBy: {
        target: 'kt_header_mobile_toggle',
        state: 'mobile-toggle-active'
      }
    });

    _menuObject = new KTMenu(_menuElement, {
      submenu: {
        desktop: 'dropdown',
        tablet: 'accordion',
        mobile: 'accordion'
      },
      accordion: {
        slideSpeed: 200, // accordion toggle slide speed in milliseconds
        expandAll: false // allow having multiple expanded accordions in the menu
      }
    });
  }

    // Public methods
  return {
        init: function(menuId, offcanvasId) {
            _menuElement = KTUtil.getById(menuId);
            _offcanvasElement = KTUtil.getById(offcanvasId);

            if (!_menuElement) {
                return;
            }

            // Initialize menu
            _init();
    },

    getMenuElement: function() {
      return _menuElement;
    },

        getOffcanvasElement: function() {
      return _offcanvasElement;
    },

        getMenu: function() {
      return _menuObject;
    },

    pauseDropdownHover: function(time) {
      if (_menuObject) {
        _menuObject.pauseDropdownHover(time);
      }
    },

        getOffcanvas: function() {
      return _offcanvasObject;
    },

    closeMobileOffcanvas: function() {
      if (_menuObject && KTUtil.isMobileDevice()) {
        _offcanvasObject.hide();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeaderMenu;
}

"use strict";

var KTLayoutHeaderTopbar = function() {
    // Private properties
  var _toggleElement;
    var _toggleObject;

    // Private functions
    var _init = function() {
    _toggleObject = new KTToggle(_toggleElement, KTUtil.getBody(), {
      targetState: 'topbar-mobile-on',
      toggleState: 'active'
    });
    }

    // Public methods
  return {
    init: function(id) {
            _toggleElement = KTUtil.getById(id);

      if (!_toggleElement) {
                return;
            }

            // Initialize
            _init();
    },

        getToggleElement: function() {
            return _toggleElement;
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeaderTopbar;
}

"use strict";

var KTLayoutHeader = function() {
    // Private properties
    var _element;
    var _elementForMobile;
    var _object;

  // Private functions
    // Get Height
    var _getHeight = function() {
        var height = 0;

        if (_element) {
            height = KTUtil.actualHeight(_element) + 1;
        }

        return height;
    }

    // Get Height
    var _getHeightForMobile = function() {
        var height;

        height = KTUtil.actualHeight(_elementForMobile);

        return height;
    }

    // Public Methods
  return {
    init: function(id, idForMobile) {
            _element = KTUtil.getById(id);
            _elementForMobile = KTUtil.getById(idForMobile);

            if (!_element) {
                return;
            }
    },

        isFixed: function() {
            return KTUtil.hasClass(KTUtil.getBody(), 'header-fixed')
        },

        isFixedForMobile: function() {
            return KTUtil.hasClass(KTUtil.getBody(), 'header-mobile-fixed')
        },

        getElement: function() {
            return _element;
        },

        getElementForMobile: function() {
            return _elementForMobile;
        },

        getHeader: function() {
            return _object;
        },

        getHeight: function() {
            return _getHeight();
        },

        getHeightForMobile: function() {
            return _getHeightForMobile();
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutHeader;
}

"use strict";

var KTLayoutSidebar = function() {
    // Private properties
    var _body;
    var _element;
    var _offcanvasObject;
    var _lastOpenedTab;

    // Private functions
  // Initialize
  var _init = function() {
        // Initialize mobile sidebar offcanvas
    _offcanvasObject = new KTOffcanvas(_element, {
      baseClass: 'sidebar',
      overlay: true,
      closeBy: 'kt_sidebar_close',
      toggleBy: {
        target: 'kt_sidebar_mobile_toggle',
        state: 'active'
      }
    });
  }

    var _initNav = function() {
        var sidebarNav = KTUtil.find(_element, '.sidebar-nav');

        if (!sidebarNav) {
            return;
        }

        KTUtil.scrollInit(sidebarNav, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);
                var sidebarNav = KTUtil.find(_element, '.sidebar-nav');
                var sidebarFooter = KTUtil.find(_element, '.sidebar-footer');

                height = height - (parseInt(KTUtil.css(sidebarNav, 'height')));
                height = height - (parseInt(KTUtil.css(sidebarNav, 'marginBottom')) + parseInt(KTUtil.css(sidebarNav, 'marginTop')));

                height = height - (parseInt(KTUtil.css(sidebarFooter, 'height')));
                height = height - (parseInt(KTUtil.css(sidebarFooter, 'marginBottom')) + parseInt(KTUtil.css(sidebarFooter, 'marginTop')));

                return height;
            }
        });

        $(sidebarNav).on('click', 'a[data-toggle="tab"]', function (e) {
            if ((_lastOpenedTab && _lastOpenedTab.is($(this))) && $('body').hasClass('sidebar-expanded')) {
                KTLayoutSidebar.minimize();
            } else {
                _lastOpenedTab =  $(this);
                KTLayoutSidebar.expand();
            }
        });
    }

    var _initContent = function(parent) {
        var parent = KTUtil.getById(parent);
        var wrapper = KTUtil.find(_element, '.sidebar-wrapper');
        var header = KTUtil.find(parent, '.sidebar-header');
        var content = KTUtil.find(parent, '.sidebar-content');

        // Close Content
        $(header).on('click', '.sidebar-toggle', function (e) {
            KTLayoutSidebar.minimize();
        });

        if (!content) {
            return;
        }

        // Init Content Scroll
        KTUtil.scrollInit(content, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                if (KTUtil.isBreakpointUp('lg')) {
                    height = height - KTLayoutHeader.getHeight();
                } 

                if (header) {
                    height = height - parseInt(KTUtil.css(header, 'height'));
                    height = height - parseInt(KTUtil.css(header, 'marginTop'));
                    height = height - parseInt(KTUtil.css(header, 'marginBottom'));
                }

                if (content) {
                    height = height - parseInt(KTUtil.css(content, 'marginTop'));
                    height = height - parseInt(KTUtil.css(content, 'marginBottom'));
                }

                height = height - parseInt(KTUtil.css(wrapper, 'paddingTop'));
                height = height - parseInt(KTUtil.css(wrapper, 'paddingBottom'));

                height = height - parseInt(KTUtil.css(_element, 'paddingTop'));
                height = height - parseInt(KTUtil.css(_element, 'paddingBottom'));

                height = height - 2;

                return height;
            }
        });
    }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);
            _body = KTUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
            _initNav();
            _initContent('kt_sidebar_tab_1');
            _initContent('kt_sidebar_tab_2');
            _initContent('kt_sidebar_tab_3');
        },

        getElement: function() {
            return _element;
        },

        getOffcanvas: function() {
            return _offcanvasObject;
        },

        expand: function() {
            KTUtil.addClass(_body, 'sidebar-expanded');
        },

        minimize: function() {
            KTUtil.removeClass(_body, 'sidebar-expanded');
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutSidebar;
}

"use strict";

var KTLayoutStickyCard = function() {
    // Private properties
  var _element;
    var _object;

  // Private functions
  var _init = function() {

        _object = new KTCard(_element, {
      sticky: {
        offset: KTLayoutHeader.getHeight(),
        zIndex: 90,
        position: {
          top: function() {
            var pos = 0;
                        var body = KTUtil.getBody();

            if (KTUtil.isBreakpointUp('lg')) {
              if (KTLayoutHeader.isFixed()) {
                pos = pos + KTLayoutHeader.getHeight();
              }

              if (KTLayoutSubheader.isFixed()) {
                pos = pos + KTLayoutSubheader.getHeight();
              }
            } else {
              if (KTLayoutHeader.isFixedForMobile()) {
                pos = pos + KTLayoutHeader.getHeightForMobile();
              }
            }

            return pos;
          },
          left: function(card) {
            return KTUtil.offset(_element).left;
          },
          right: function(card) {
            var body = KTUtil.getBody();

            var cardWidth = parseInt(KTUtil.css(_element, 'width'));
            var bodyWidth = parseInt(KTUtil.css(body, 'width'));
            var cardOffsetLeft = KTUtil.offset(_element).left;

            return bodyWidth - cardWidth - cardOffsetLeft;
          }
        }
      }
    });

    _object.initSticky();

    KTUtil.addResizeHandler(function() {
      _object.updateSticky();
    });
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
      _init();
    },

    update: function() {
      if (_object) {
        _object.updateSticky();
      }
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutStickyCard;
}

"use strict";

var KTLayoutStretchedCard = function() {
    // Private properties
  var _element;

  // Private functions
  var _init = function() {
    var scroll = KTUtil.find(_element, '.card-scroll');
    var cardBody = KTUtil.find(_element, '.card-body');
    var cardHeader = KTUtil.find(_element, '.card-header');

    var height = KTLayoutContent.getHeight();

    height = height - parseInt(KTUtil.actualHeight(cardHeader));

    height = height - parseInt(KTUtil.css(_element, 'marginTop')) - parseInt(KTUtil.css(_element, 'marginBottom'));
    height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));

    height = height - parseInt(KTUtil.css(cardBody, 'paddingTop')) - parseInt(KTUtil.css(cardBody, 'paddingBottom'));
    height = height - parseInt(KTUtil.css(cardBody, 'marginTop')) - parseInt(KTUtil.css(cardBody, 'marginBottom'));

    height = height - 3;

    KTUtil.css(scroll, 'height', height + 'px');
  }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
      _init();

            // Re-calculate on window resize
            KTUtil.addResizeHandler(function() {
        _init();
      });
    },

    update: function() {
      _init();
    }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutStretchedCard;
}

"use strict";

var KTLayoutSubheader = function() {
    // Private properties
    var _element;

    // Private functions
    var _getHeight = function() {
        var height = 0;

        if (_element) {
            height = KTUtil.actualHeight(_element);
        }

        return height;
    }

    // Public methods
  return {
    init: function(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }
    },

        isFixed: function() {
            return KTUtil.hasClass(KTUtil.getBody(), 'subheader-fixed');
        },

        getElement: function() {
            return _element;
        },

        getHeight: function() {
            return _getHeight();
        }
  };
}();

// Webpack support
if (typeof module !== 'undefined') {
  module.exports = KTLayoutSubheader;
}

//# sourceMappingURL=scripts.bundle.js.map
/*!
  * jQuery JavaScript Library v3.6.0
  * https://jquery.com/
  *
  * Includes Sizzle.js
  * https://sizzlejs.com/
  *
  * Copyright OpenJS Foundation and other contributors
  * Released under the MIT license
  * https://jquery.org/license
  *
  * Date: 2021-03-02T17:08Z
  */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,(function(e,t){"use strict";var i=[],n=Object.getPrototypeOf,s=i.slice,a=i.flat?function(e){return i.flat.call(e)}:function(e){return i.concat.apply([],e)},r=i.push,o=i.indexOf,l={},u=l.toString,d=l.hasOwnProperty,c=d.toString,h=c.call(Object),p={},f=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},m=function(e){return null!=e&&e===e.window},v=e.document,g={type:!0,src:!0,nonce:!0,noModule:!0};function y(e,t,i){var n,s,a=(i=i||v).createElement("script");if(a.text=e,t)for(n in g)(s=t[n]||t.getAttribute&&t.getAttribute(n))&&a.setAttribute(n,s);i.head.appendChild(a).parentNode.removeChild(a)}function b(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[u.call(e)]||"object":typeof e}var w=function(e,t){return new w.fn.init(e,t)};function x(e){var t=!!e&&"length"in e&&e.length,i=b(e);return!f(e)&&!m(e)&&("array"===i||0===t||"number"==typeof t&&t>0&&t-1 in e)}w.fn=w.prototype={jquery:"3.6.0",constructor:w,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,(function(t,i){return e.call(t,i,t)})))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(w.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(w.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,i=+e+(e<0?t:0);return this.pushStack(i>=0&&i<t?[this[i]]:[])},end:function(){return this.prevObject||this.constructor()},push:r,sort:i.sort,splice:i.splice},w.extend=w.fn.extend=function(){var e,t,i,n,s,a,r=arguments[0]||{},o=1,l=arguments.length,u=!1;for("boolean"==typeof r&&(u=r,r=arguments[o]||{},o++),"object"==typeof r||f(r)||(r={}),o===l&&(r=this,o--);o<l;o++)if(null!=(e=arguments[o]))for(t in e)n=e[t],"__proto__"!==t&&r!==n&&(u&&n&&(w.isPlainObject(n)||(s=Array.isArray(n)))?(i=r[t],a=s&&!Array.isArray(i)?[]:s||w.isPlainObject(i)?i:{},s=!1,r[t]=w.extend(u,a,n)):void 0!==n&&(r[t]=n));return r},w.extend({expando:"jQuery"+("3.6.0"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,i;return!(!e||"[object Object]"!==u.call(e))&&(!(t=n(e))||"function"==typeof(i=d.call(t,"constructor")&&t.constructor)&&c.call(i)===h)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,i){y(e,{nonce:t&&t.nonce},i)},each:function(e,t){var i,n=0;if(x(e))for(i=e.length;n<i&&!1!==t.call(e[n],n,e[n]);n++);else for(n in e)if(!1===t.call(e[n],n,e[n]))break;return e},makeArray:function(e,t){var i=t||[];return null!=e&&(x(Object(e))?w.merge(i,"string"==typeof e?[e]:e):r.call(i,e)),i},inArray:function(e,t,i){return null==t?-1:o.call(t,e,i)},merge:function(e,t){for(var i=+t.length,n=0,s=e.length;n<i;n++)e[s++]=t[n];return e.length=s,e},grep:function(e,t,i){for(var n=[],s=0,a=e.length,r=!i;s<a;s++)!t(e[s],s)!==r&&n.push(e[s]);return n},map:function(e,t,i){var n,s,r=0,o=[];if(x(e))for(n=e.length;r<n;r++)null!=(s=t(e[r],r,i))&&o.push(s);else for(r in e)null!=(s=t(e[r],r,i))&&o.push(s);return a(o)},guid:1,support:p}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=i[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){l["[object "+t+"]"]=t.toLowerCase()}));var C=
/*!
  * Sizzle CSS Selector Engine v2.3.6
  * https://sizzlejs.com/
  *
  * Copyright JS Foundation and other contributors
  * Released under the MIT license
  * https://js.foundation/
  *
  * Date: 2021-02-16
  */
function(e){var t,i,n,s,a,r,o,l,u,d,c,h,p,f,m,v,g,y,b,w="sizzle"+1*new Date,x=e.document,C=0,T=0,S=le(),E=le(),k=le(),D=le(),M=function(e,t){return e===t&&(c=!0),0},_={}.hasOwnProperty,$=[],P=$.pop,L=$.push,A=$.push,O=$.slice,I=function(e,t){for(var i=0,n=e.length;i<n;i++)if(e[i]===t)return i;return-1},z="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",N="[\\x20\\t\\r\\n\\f]",j="(?:\\\\[\\da-fA-F]{1,6}"+N+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",F="\\["+N+"*("+j+")(?:"+N+"*([*^$|!~]?=)"+N+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+j+"))|)"+N+"*\\]",H=":("+j+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+F+")*)|.*)\\)|)",R=new RegExp(N+"+","g"),B=new RegExp("^"+N+"+|((?:^|[^\\\\])(?:\\\\.)*)"+N+"+$","g"),q=new RegExp("^"+N+"*,"+N+"*"),V=new RegExp("^"+N+"*([>+~]|"+N+")"+N+"*"),W=new RegExp(N+"|>"),G=new RegExp(H),Y=new RegExp("^"+j+"$"),X={ID:new RegExp("^#("+j+")"),CLASS:new RegExp("^\\.("+j+")"),TAG:new RegExp("^("+j+"|[*])"),ATTR:new RegExp("^"+F),PSEUDO:new RegExp("^"+H),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+N+"*(even|odd|(([+-]|)(\\d*)n|)"+N+"*(?:([+-]|)"+N+"*(\\d+)|))"+N+"*\\)|)","i"),bool:new RegExp("^(?:"+z+")$","i"),needsContext:new RegExp("^"+N+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+N+"*((?:-\\d)?\\d*)"+N+"*\\)|)(?=[^-]|$)","i")},U=/HTML$/i,K=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+N+"?|\\\\([^\\r\\n\\f])","g"),ie=function(e,t){var i="0x"+e.slice(1)-65536;return t||(i<0?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320))},ne=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,se=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},ae=function(){h()},re=we((function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()}),{dir:"parentNode",next:"legend"});try{A.apply($=O.call(x.childNodes),x.childNodes),$[x.childNodes.length].nodeType}catch(e){A={apply:$.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){for(var i=e.length,n=0;e[i++]=t[n++];);e.length=i-1}}}function oe(e,t,n,s){var a,o,u,d,c,f,g,y=t&&t.ownerDocument,x=t?t.nodeType:9;if(n=n||[],"string"!=typeof e||!e||1!==x&&9!==x&&11!==x)return n;if(!s&&(h(t),t=t||p,m)){if(11!==x&&(c=J.exec(e)))if(a=c[1]){if(9===x){if(!(u=t.getElementById(a)))return n;if(u.id===a)return n.push(u),n}else if(y&&(u=y.getElementById(a))&&b(t,u)&&u.id===a)return n.push(u),n}else{if(c[2])return A.apply(n,t.getElementsByTagName(e)),n;if((a=c[3])&&i.getElementsByClassName&&t.getElementsByClassName)return A.apply(n,t.getElementsByClassName(a)),n}if(i.qsa&&!D[e+" "]&&(!v||!v.test(e))&&(1!==x||"object"!==t.nodeName.toLowerCase())){if(g=e,y=t,1===x&&(W.test(e)||V.test(e))){for((y=ee.test(e)&&ge(t.parentNode)||t)===t&&i.scope||((d=t.getAttribute("id"))?d=d.replace(ne,se):t.setAttribute("id",d=w)),o=(f=r(e)).length;o--;)f[o]=(d?"#"+d:":scope")+" "+be(f[o]);g=f.join(",")}try{return A.apply(n,y.querySelectorAll(g)),n}catch(t){D(e,!0)}finally{d===w&&t.removeAttribute("id")}}}return l(e.replace(B,"$1"),t,n,s)}function le(){var e=[];return function t(i,s){return e.push(i+" ")>n.cacheLength&&delete t[e.shift()],t[i+" "]=s}}function ue(e){return e[w]=!0,e}function de(e){var t=p.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ce(e,t){for(var i=e.split("|"),s=i.length;s--;)n.attrHandle[i[s]]=t}function he(e,t){var i=t&&e,n=i&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(n)return n;if(i)for(;i=i.nextSibling;)if(i===t)return-1;return e?1:-1}function pe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function fe(e){return function(t){var i=t.nodeName.toLowerCase();return("input"===i||"button"===i)&&t.type===e}}function me(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&re(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function ve(e){return ue((function(t){return t=+t,ue((function(i,n){for(var s,a=e([],i.length,t),r=a.length;r--;)i[s=a[r]]&&(i[s]=!(n[s]=i[s]))}))}))}function ge(e){return e&&void 0!==e.getElementsByTagName&&e}for(t in i=oe.support={},a=oe.isXML=function(e){var t=e&&e.namespaceURI,i=e&&(e.ownerDocument||e).documentElement;return!U.test(t||i&&i.nodeName||"HTML")},h=oe.setDocument=function(e){var t,s,r=e?e.ownerDocument||e:x;return r!=p&&9===r.nodeType&&r.documentElement?(f=(p=r).documentElement,m=!a(p),x!=p&&(s=p.defaultView)&&s.top!==s&&(s.addEventListener?s.addEventListener("unload",ae,!1):s.attachEvent&&s.attachEvent("onunload",ae)),i.scope=de((function(e){return f.appendChild(e).appendChild(p.createElement("div")),void 0!==e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length})),i.attributes=de((function(e){return e.className="i",!e.getAttribute("className")})),i.getElementsByTagName=de((function(e){return e.appendChild(p.createComment("")),!e.getElementsByTagName("*").length})),i.getElementsByClassName=Q.test(p.getElementsByClassName),i.getById=de((function(e){return f.appendChild(e).id=w,!p.getElementsByName||!p.getElementsByName(w).length})),i.getById?(n.filter.ID=function(e){var t=e.replace(te,ie);return function(e){return e.getAttribute("id")===t}},n.find.ID=function(e,t){if(void 0!==t.getElementById&&m){var i=t.getElementById(e);return i?[i]:[]}}):(n.filter.ID=function(e){var t=e.replace(te,ie);return function(e){var i=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return i&&i.value===t}},n.find.ID=function(e,t){if(void 0!==t.getElementById&&m){var i,n,s,a=t.getElementById(e);if(a){if((i=a.getAttributeNode("id"))&&i.value===e)return[a];for(s=t.getElementsByName(e),n=0;a=s[n++];)if((i=a.getAttributeNode("id"))&&i.value===e)return[a]}return[]}}),n.find.TAG=i.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):i.qsa?t.querySelectorAll(e):void 0}:function(e,t){var i,n=[],s=0,a=t.getElementsByTagName(e);if("*"===e){for(;i=a[s++];)1===i.nodeType&&n.push(i);return n}return a},n.find.CLASS=i.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&m)return t.getElementsByClassName(e)},g=[],v=[],(i.qsa=Q.test(p.querySelectorAll))&&(de((function(e){var t;f.appendChild(e).innerHTML="<a id='"+w+"'></a><select id='"+w+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+N+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+N+"*(?:value|"+z+")"),e.querySelectorAll("[id~="+w+"-]").length||v.push("~="),(t=p.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+N+"*name"+N+"*="+N+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+w+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")})),de((function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=p.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+N+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),f.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")}))),(i.matchesSelector=Q.test(y=f.matches||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&de((function(e){i.disconnectedMatch=y.call(e,"*"),y.call(e,"[s!='']:x"),g.push("!=",H)})),v=v.length&&new RegExp(v.join("|")),g=g.length&&new RegExp(g.join("|")),t=Q.test(f.compareDocumentPosition),b=t||Q.test(f.contains)?function(e,t){var i=9===e.nodeType?e.documentElement:e,n=t&&t.parentNode;return e===n||!(!n||1!==n.nodeType||!(i.contains?i.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},M=t?function(e,t){if(e===t)return c=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!i.sortDetached&&t.compareDocumentPosition(e)===n?e==p||e.ownerDocument==x&&b(x,e)?-1:t==p||t.ownerDocument==x&&b(x,t)?1:d?I(d,e)-I(d,t):0:4&n?-1:1)}:function(e,t){if(e===t)return c=!0,0;var i,n=0,s=e.parentNode,a=t.parentNode,r=[e],o=[t];if(!s||!a)return e==p?-1:t==p?1:s?-1:a?1:d?I(d,e)-I(d,t):0;if(s===a)return he(e,t);for(i=e;i=i.parentNode;)r.unshift(i);for(i=t;i=i.parentNode;)o.unshift(i);for(;r[n]===o[n];)n++;return n?he(r[n],o[n]):r[n]==x?-1:o[n]==x?1:0},p):p},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if(h(e),i.matchesSelector&&m&&!D[t+" "]&&(!g||!g.test(t))&&(!v||!v.test(t)))try{var n=y.call(e,t);if(n||i.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){D(t,!0)}return oe(t,p,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!=p&&h(e),b(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!=p&&h(e);var s=n.attrHandle[t.toLowerCase()],a=s&&_.call(n.attrHandle,t.toLowerCase())?s(e,t,!m):void 0;return void 0!==a?a:i.attributes||!m?e.getAttribute(t):(a=e.getAttributeNode(t))&&a.specified?a.value:null},oe.escape=function(e){return(e+"").replace(ne,se)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,n=[],s=0,a=0;if(c=!i.detectDuplicates,d=!i.sortStable&&e.slice(0),e.sort(M),c){for(;t=e[a++];)t===e[a]&&(s=n.push(a));for(;s--;)e.splice(n[s],1)}return d=null,e},s=oe.getText=function(e){var t,i="",n=0,a=e.nodeType;if(a){if(1===a||9===a||11===a){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)i+=s(e)}else if(3===a||4===a)return e.nodeValue}else for(;t=e[n++];)i+=s(t);return i},(n=oe.selectors={cacheLength:50,createPseudo:ue,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ie),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ie),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,i=!e[6]&&e[2];return X.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":i&&G.test(i)&&(t=r(i,!0))&&(t=i.indexOf(")",i.length-t)-i.length)&&(e[0]=e[0].slice(0,t),e[2]=i.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ie).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=S[e+" "];return t||(t=new RegExp("(^|"+N+")"+e+"("+N+"|$)"))&&S(e,(function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,i){return function(n){var s=oe.attr(n,e);return null==s?"!="===t:!t||(s+="","="===t?s===i:"!="===t?s!==i:"^="===t?i&&0===s.indexOf(i):"*="===t?i&&s.indexOf(i)>-1:"$="===t?i&&s.slice(-i.length)===i:"~="===t?(" "+s.replace(R," ")+" ").indexOf(i)>-1:"|="===t&&(s===i||s.slice(0,i.length+1)===i+"-"))}},CHILD:function(e,t,i,n,s){var a="nth"!==e.slice(0,3),r="last"!==e.slice(-4),o="of-type"===t;return 1===n&&0===s?function(e){return!!e.parentNode}:function(t,i,l){var u,d,c,h,p,f,m=a!==r?"nextSibling":"previousSibling",v=t.parentNode,g=o&&t.nodeName.toLowerCase(),y=!l&&!o,b=!1;if(v){if(a){for(;m;){for(h=t;h=h[m];)if(o?h.nodeName.toLowerCase()===g:1===h.nodeType)return!1;f=m="only"===e&&!f&&"nextSibling"}return!0}if(f=[r?v.firstChild:v.lastChild],r&&y){for(b=(p=(u=(d=(c=(h=v)[w]||(h[w]={}))[h.uniqueID]||(c[h.uniqueID]={}))[e]||[])[0]===C&&u[1])&&u[2],h=p&&v.childNodes[p];h=++p&&h&&h[m]||(b=p=0)||f.pop();)if(1===h.nodeType&&++b&&h===t){d[e]=[C,p,b];break}}else if(y&&(b=p=(u=(d=(c=(h=t)[w]||(h[w]={}))[h.uniqueID]||(c[h.uniqueID]={}))[e]||[])[0]===C&&u[1]),!1===b)for(;(h=++p&&h&&h[m]||(b=p=0)||f.pop())&&((o?h.nodeName.toLowerCase()!==g:1!==h.nodeType)||!++b||(y&&((d=(c=h[w]||(h[w]={}))[h.uniqueID]||(c[h.uniqueID]={}))[e]=[C,b]),h!==t)););return(b-=s)===n||b%n==0&&b/n>=0}}},PSEUDO:function(e,t){var i,s=n.pseudos[e]||n.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return s[w]?s(t):s.length>1?(i=[e,e,"",t],n.setFilters.hasOwnProperty(e.toLowerCase())?ue((function(e,i){for(var n,a=s(e,t),r=a.length;r--;)e[n=I(e,a[r])]=!(i[n]=a[r])})):function(e){return s(e,0,i)}):s}},pseudos:{not:ue((function(e){var t=[],i=[],n=o(e.replace(B,"$1"));return n[w]?ue((function(e,t,i,s){for(var a,r=n(e,null,s,[]),o=e.length;o--;)(a=r[o])&&(e[o]=!(t[o]=a))})):function(e,s,a){return t[0]=e,n(t,null,a,i),t[0]=null,!i.pop()}})),has:ue((function(e){return function(t){return oe(e,t).length>0}})),contains:ue((function(e){return e=e.replace(te,ie),function(t){return(t.textContent||s(t)).indexOf(e)>-1}})),lang:ue((function(e){return Y.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(te,ie).toLowerCase(),function(t){var i;do{if(i=m?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(i=i.toLowerCase())===e||0===i.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){var i=e.location&&e.location.hash;return i&&i.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:me(!1),disabled:me(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!n.pseudos.empty(e)},header:function(e){return Z.test(e.nodeName)},input:function(e){return K.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve((function(){return[0]})),last:ve((function(e,t){return[t-1]})),eq:ve((function(e,t,i){return[i<0?i+t:i]})),even:ve((function(e,t){for(var i=0;i<t;i+=2)e.push(i);return e})),odd:ve((function(e,t){for(var i=1;i<t;i+=2)e.push(i);return e})),lt:ve((function(e,t,i){for(var n=i<0?i+t:i>t?t:i;--n>=0;)e.push(n);return e})),gt:ve((function(e,t,i){for(var n=i<0?i+t:i;++n<t;)e.push(n);return e}))}}).pseudos.nth=n.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})n.pseudos[t]=pe(t);for(t in{submit:!0,reset:!0})n.pseudos[t]=fe(t);function ye(){}function be(e){for(var t=0,i=e.length,n="";t<i;t++)n+=e[t].value;return n}function we(e,t,i){var n=t.dir,s=t.next,a=s||n,r=i&&"parentNode"===a,o=T++;return t.first?function(t,i,s){for(;t=t[n];)if(1===t.nodeType||r)return e(t,i,s);return!1}:function(t,i,l){var u,d,c,h=[C,o];if(l){for(;t=t[n];)if((1===t.nodeType||r)&&e(t,i,l))return!0}else for(;t=t[n];)if(1===t.nodeType||r)if(d=(c=t[w]||(t[w]={}))[t.uniqueID]||(c[t.uniqueID]={}),s&&s===t.nodeName.toLowerCase())t=t[n]||t;else{if((u=d[a])&&u[0]===C&&u[1]===o)return h[2]=u[2];if(d[a]=h,h[2]=e(t,i,l))return!0}return!1}}function xe(e){return e.length>1?function(t,i,n){for(var s=e.length;s--;)if(!e[s](t,i,n))return!1;return!0}:e[0]}function Ce(e,t,i,n,s){for(var a,r=[],o=0,l=e.length,u=null!=t;o<l;o++)(a=e[o])&&(i&&!i(a,n,s)||(r.push(a),u&&t.push(o)));return r}function Te(e,t,i,n,s,a){return n&&!n[w]&&(n=Te(n)),s&&!s[w]&&(s=Te(s,a)),ue((function(a,r,o,l){var u,d,c,h=[],p=[],f=r.length,m=a||function(e,t,i){for(var n=0,s=t.length;n<s;n++)oe(e,t[n],i);return i}(t||"*",o.nodeType?[o]:o,[]),v=!e||!a&&t?m:Ce(m,h,e,o,l),g=i?s||(a?e:f||n)?[]:r:v;if(i&&i(v,g,o,l),n)for(u=Ce(g,p),n(u,[],o,l),d=u.length;d--;)(c=u[d])&&(g[p[d]]=!(v[p[d]]=c));if(a){if(s||e){if(s){for(u=[],d=g.length;d--;)(c=g[d])&&u.push(v[d]=c);s(null,g=[],u,l)}for(d=g.length;d--;)(c=g[d])&&(u=s?I(a,c):h[d])>-1&&(a[u]=!(r[u]=c))}}else g=Ce(g===r?g.splice(f,g.length):g),s?s(null,r,g,l):A.apply(r,g)}))}function Se(e){for(var t,i,s,a=e.length,r=n.relative[e[0].type],o=r||n.relative[" "],l=r?1:0,d=we((function(e){return e===t}),o,!0),c=we((function(e){return I(t,e)>-1}),o,!0),h=[function(e,i,n){var s=!r&&(n||i!==u)||((t=i).nodeType?d(e,i,n):c(e,i,n));return t=null,s}];l<a;l++)if(i=n.relative[e[l].type])h=[we(xe(h),i)];else{if((i=n.filter[e[l].type].apply(null,e[l].matches))[w]){for(s=++l;s<a&&!n.relative[e[s].type];s++);return Te(l>1&&xe(h),l>1&&be(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(B,"$1"),i,l<s&&Se(e.slice(l,s)),s<a&&Se(e=e.slice(s)),s<a&&be(e))}h.push(i)}return xe(h)}return ye.prototype=n.filters=n.pseudos,n.setFilters=new ye,r=oe.tokenize=function(e,t){var i,s,a,r,o,l,u,d=E[e+" "];if(d)return t?0:d.slice(0);for(o=e,l=[],u=n.preFilter;o;){for(r in i&&!(s=q.exec(o))||(s&&(o=o.slice(s[0].length)||o),l.push(a=[])),i=!1,(s=V.exec(o))&&(i=s.shift(),a.push({value:i,type:s[0].replace(B," ")}),o=o.slice(i.length)),n.filter)!(s=X[r].exec(o))||u[r]&&!(s=u[r](s))||(i=s.shift(),a.push({value:i,type:r,matches:s}),o=o.slice(i.length));if(!i)break}return t?o.length:o?oe.error(e):E(e,l).slice(0)},o=oe.compile=function(e,t){var i,s=[],a=[],o=k[e+" "];if(!o){for(t||(t=r(e)),i=t.length;i--;)(o=Se(t[i]))[w]?s.push(o):a.push(o);(o=k(e,function(e,t){var i=t.length>0,s=e.length>0,a=function(a,r,o,l,d){var c,f,v,g=0,y="0",b=a&&[],w=[],x=u,T=a||s&&n.find.TAG("*",d),S=C+=null==x?1:Math.random()||.1,E=T.length;for(d&&(u=r==p||r||d);y!==E&&null!=(c=T[y]);y++){if(s&&c){for(f=0,r||c.ownerDocument==p||(h(c),o=!m);v=e[f++];)if(v(c,r||p,o)){l.push(c);break}d&&(C=S)}i&&((c=!v&&c)&&g--,a&&b.push(c))}if(g+=y,i&&y!==g){for(f=0;v=t[f++];)v(b,w,r,o);if(a){if(g>0)for(;y--;)b[y]||w[y]||(w[y]=P.call(l));w=Ce(w)}A.apply(l,w),d&&!a&&w.length>0&&g+t.length>1&&oe.uniqueSort(l)}return d&&(C=S,u=x),b};return i?ue(a):a}(a,s))).selector=e}return o},l=oe.select=function(e,t,i,s){var a,l,u,d,c,h="function"==typeof e&&e,p=!s&&r(e=h.selector||e);if(i=i||[],1===p.length){if((l=p[0]=p[0].slice(0)).length>2&&"ID"===(u=l[0]).type&&9===t.nodeType&&m&&n.relative[l[1].type]){if(!(t=(n.find.ID(u.matches[0].replace(te,ie),t)||[])[0]))return i;h&&(t=t.parentNode),e=e.slice(l.shift().value.length)}for(a=X.needsContext.test(e)?0:l.length;a--&&(u=l[a],!n.relative[d=u.type]);)if((c=n.find[d])&&(s=c(u.matches[0].replace(te,ie),ee.test(l[0].type)&&ge(t.parentNode)||t))){if(l.splice(a,1),!(e=s.length&&be(l)))return A.apply(i,s),i;break}}return(h||o(e,p))(s,t,!m,i,!t||ee.test(e)&&ge(t.parentNode)||t),i},i.sortStable=w.split("").sort(M).join("")===w,i.detectDuplicates=!!c,h(),i.sortDetached=de((function(e){return 1&e.compareDocumentPosition(p.createElement("fieldset"))})),de((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||ce("type|href|height|width",(function(e,t,i){if(!i)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),i.attributes&&de((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||ce("value",(function(e,t,i){if(!i&&"input"===e.nodeName.toLowerCase())return e.defaultValue})),de((function(e){return null==e.getAttribute("disabled")}))||ce(z,(function(e,t,i){var n;if(!i)return!0===e[t]?t.toLowerCase():(n=e.getAttributeNode(t))&&n.specified?n.value:null})),oe}(e);w.find=C,w.expr=C.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=C.uniqueSort,w.text=C.getText,w.isXMLDoc=C.isXML,w.contains=C.contains,w.escapeSelector=C.escape;var T=function(e,t,i){for(var n=[],s=void 0!==i;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(s&&w(e).is(i))break;n.push(e)}return n},S=function(e,t){for(var i=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&i.push(e);return i},E=w.expr.match.needsContext;function k(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function M(e,t,i){return f(t)?w.grep(e,(function(e,n){return!!t.call(e,n,e)!==i})):t.nodeType?w.grep(e,(function(e){return e===t!==i})):"string"!=typeof t?w.grep(e,(function(e){return o.call(t,e)>-1!==i})):w.filter(t,e,i)}w.filter=function(e,t,i){var n=t[0];return i&&(e=":not("+e+")"),1===t.length&&1===n.nodeType?w.find.matchesSelector(n,e)?[n]:[]:w.find.matches(e,w.grep(t,(function(e){return 1===e.nodeType})))},w.fn.extend({find:function(e){var t,i,n=this.length,s=this;if("string"!=typeof e)return this.pushStack(w(e).filter((function(){for(t=0;t<n;t++)if(w.contains(s[t],this))return!0})));for(i=this.pushStack([]),t=0;t<n;t++)w.find(e,s[t],i);return n>1?w.uniqueSort(i):i},filter:function(e){return this.pushStack(M(this,e||[],!1))},not:function(e){return this.pushStack(M(this,e||[],!0))},is:function(e){return!!M(this,"string"==typeof e&&E.test(e)?w(e):e||[],!1).length}});var _,$=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,i){var n,s;if(!e)return this;if(i=i||_,"string"==typeof e){if(!(n="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:$.exec(e))||!n[1]&&t)return!t||t.jquery?(t||i).find(e):this.constructor(t).find(e);if(n[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(n[1],t&&t.nodeType?t.ownerDocument||t:v,!0)),D.test(n[1])&&w.isPlainObject(t))for(n in t)f(this[n])?this[n](t[n]):this.attr(n,t[n]);return this}return(s=v.getElementById(n[2]))&&(this[0]=s,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):f(e)?void 0!==i.ready?i.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,_=w(v);var P=/^(?:parents|prev(?:Until|All))/,L={children:!0,contents:!0,next:!0,prev:!0};function A(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}w.fn.extend({has:function(e){var t=w(e,this),i=t.length;return this.filter((function(){for(var e=0;e<i;e++)if(w.contains(this,t[e]))return!0}))},closest:function(e,t){var i,n=0,s=this.length,a=[],r="string"!=typeof e&&w(e);if(!E.test(e))for(;n<s;n++)for(i=this[n];i&&i!==t;i=i.parentNode)if(i.nodeType<11&&(r?r.index(i)>-1:1===i.nodeType&&w.find.matchesSelector(i,e))){a.push(i);break}return this.pushStack(a.length>1?w.uniqueSort(a):a)},index:function(e){return e?"string"==typeof e?o.call(w(e),this[0]):o.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,i){return T(e,"parentNode",i)},next:function(e){return A(e,"nextSibling")},prev:function(e){return A(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,i){return T(e,"nextSibling",i)},prevUntil:function(e,t,i){return T(e,"previousSibling",i)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return null!=e.contentDocument&&n(e.contentDocument)?e.contentDocument:(k(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},(function(e,t){w.fn[e]=function(i,n){var s=w.map(this,t,i);return"Until"!==e.slice(-5)&&(n=i),n&&"string"==typeof n&&(s=w.filter(n,s)),this.length>1&&(L[e]||w.uniqueSort(s),P.test(e)&&s.reverse()),this.pushStack(s)}}));var O=/[^\x20\t\r\n\f]+/g;function I(e){return e}function z(e){throw e}function N(e,t,i,n){var s;try{e&&f(s=e.promise)?s.call(e).done(t).fail(i):e&&f(s=e.then)?s.call(e,t,i):t.apply(void 0,[e].slice(n))}catch(e){i.apply(void 0,[e])}}w.Callbacks=function(e){e="string"==typeof e?function(e){var t={};return w.each(e.match(O)||[],(function(e,i){t[i]=!0})),t}(e):w.extend({},e);var t,i,n,s,a=[],r=[],o=-1,l=function(){for(s=s||e.once,n=t=!0;r.length;o=-1)for(i=r.shift();++o<a.length;)!1===a[o].apply(i[0],i[1])&&e.stopOnFalse&&(o=a.length,i=!1);e.memory||(i=!1),t=!1,s&&(a=i?[]:"")},u={add:function(){return a&&(i&&!t&&(o=a.length-1,r.push(i)),function t(i){w.each(i,(function(i,n){f(n)?e.unique&&u.has(n)||a.push(n):n&&n.length&&"string"!==b(n)&&t(n)}))}(arguments),i&&!t&&l()),this},remove:function(){return w.each(arguments,(function(e,t){for(var i;(i=w.inArray(t,a,i))>-1;)a.splice(i,1),i<=o&&o--})),this},has:function(e){return e?w.inArray(e,a)>-1:a.length>0},empty:function(){return a&&(a=[]),this},disable:function(){return s=r=[],a=i="",this},disabled:function(){return!a},lock:function(){return s=r=[],i||t||(a=i=""),this},locked:function(){return!!s},fireWith:function(e,i){return s||(i=[e,(i=i||[]).slice?i.slice():i],r.push(i),t||l()),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!n}};return u},w.extend({Deferred:function(t){var i=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],n="pending",s={state:function(){return n},always:function(){return a.done(arguments).fail(arguments),this},catch:function(e){return s.then(null,e)},pipe:function(){var e=arguments;return w.Deferred((function(t){w.each(i,(function(i,n){var s=f(e[n[4]])&&e[n[4]];a[n[1]]((function(){var e=s&&s.apply(this,arguments);e&&f(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[n[0]+"With"](this,s?[e]:arguments)}))})),e=null})).promise()},then:function(t,n,s){var a=0;function r(t,i,n,s){return function(){var o=this,l=arguments,u=function(){var e,u;if(!(t<a)){if((e=n.apply(o,l))===i.promise())throw new TypeError("Thenable self-resolution");u=e&&("object"==typeof e||"function"==typeof e)&&e.then,f(u)?s?u.call(e,r(a,i,I,s),r(a,i,z,s)):(a++,u.call(e,r(a,i,I,s),r(a,i,z,s),r(a,i,I,i.notifyWith))):(n!==I&&(o=void 0,l=[e]),(s||i.resolveWith)(o,l))}},d=s?u:function(){try{u()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,d.stackTrace),t+1>=a&&(n!==z&&(o=void 0,l=[e]),i.rejectWith(o,l))}};t?d():(w.Deferred.getStackHook&&(d.stackTrace=w.Deferred.getStackHook()),e.setTimeout(d))}}return w.Deferred((function(e){i[0][3].add(r(0,e,f(s)?s:I,e.notifyWith)),i[1][3].add(r(0,e,f(t)?t:I)),i[2][3].add(r(0,e,f(n)?n:z))})).promise()},promise:function(e){return null!=e?w.extend(e,s):s}},a={};return w.each(i,(function(e,t){var r=t[2],o=t[5];s[t[1]]=r.add,o&&r.add((function(){n=o}),i[3-e][2].disable,i[3-e][3].disable,i[0][2].lock,i[0][3].lock),r.add(t[3].fire),a[t[0]]=function(){return a[t[0]+"With"](this===a?void 0:this,arguments),this},a[t[0]+"With"]=r.fireWith})),s.promise(a),t&&t.call(a,a),a},when:function(e){var t=arguments.length,i=t,n=Array(i),a=s.call(arguments),r=w.Deferred(),o=function(e){return function(i){n[e]=this,a[e]=arguments.length>1?s.call(arguments):i,--t||r.resolveWith(n,a)}};if(t<=1&&(N(e,r.done(o(i)).resolve,r.reject,!t),"pending"===r.state()||f(a[i]&&a[i].then)))return r.then();for(;i--;)N(a[i],o(i),r.reject);return r.promise()}});var j=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,i){e.console&&e.console.warn&&t&&j.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,i)},w.readyException=function(t){e.setTimeout((function(){throw t}))};var F=w.Deferred();function H(){v.removeEventListener("DOMContentLoaded",H),e.removeEventListener("load",H),w.ready()}w.fn.ready=function(e){return F.then(e).catch((function(e){w.readyException(e)})),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(v,[w]))}}),w.ready.then=F.then,"complete"===v.readyState||"loading"!==v.readyState&&!v.documentElement.doScroll?e.setTimeout(w.ready):(v.addEventListener("DOMContentLoaded",H),e.addEventListener("load",H));var R=function(e,t,i,n,s,a,r){var o=0,l=e.length,u=null==i;if("object"===b(i))for(o in s=!0,i)R(e,t,o,i[o],!0,a,r);else if(void 0!==n&&(s=!0,f(n)||(r=!0),u&&(r?(t.call(e,n),t=null):(u=t,t=function(e,t,i){return u.call(w(e),i)})),t))for(;o<l;o++)t(e[o],i,r?n:n.call(e[o],o,t(e[o],i)));return s?e:u?t.call(e):l?t(e[0],i):a},B=/^-ms-/,q=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function W(e){return e.replace(B,"ms-").replace(q,V)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=w.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,i){var n,s=this.cache(e);if("string"==typeof t)s[W(t)]=i;else for(n in t)s[W(n)]=t[n];return s},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][W(t)]},access:function(e,t,i){return void 0===t||t&&"string"==typeof t&&void 0===i?this.get(e,t):(this.set(e,t,i),void 0!==i?i:t)},remove:function(e,t){var i,n=e[this.expando];if(void 0!==n){if(void 0!==t){i=(t=Array.isArray(t)?t.map(W):(t=W(t))in n?[t]:t.match(O)||[]).length;for(;i--;)delete n[t[i]]}(void 0===t||w.isEmptyObject(n))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var X=new Y,U=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function Q(e,t,i){var n;if(void 0===i&&1===e.nodeType)if(n="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(i=e.getAttribute(n))){try{i=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:K.test(e)?JSON.parse(e):e)}(i)}catch(e){}U.set(e,t,i)}else i=void 0;return i}w.extend({hasData:function(e){return U.hasData(e)||X.hasData(e)},data:function(e,t,i){return U.access(e,t,i)},removeData:function(e,t){U.remove(e,t)},_data:function(e,t,i){return X.access(e,t,i)},_removeData:function(e,t){X.remove(e,t)}}),w.fn.extend({data:function(e,t){var i,n,s,a=this[0],r=a&&a.attributes;if(void 0===e){if(this.length&&(s=U.get(a),1===a.nodeType&&!X.get(a,"hasDataAttrs"))){for(i=r.length;i--;)r[i]&&0===(n=r[i].name).indexOf("data-")&&(n=W(n.slice(5)),Q(a,n,s[n]));X.set(a,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each((function(){U.set(this,e)})):R(this,(function(t){var i;if(a&&void 0===t)return void 0!==(i=U.get(a,e))||void 0!==(i=Q(a,e))?i:void 0;this.each((function(){U.set(this,e,t)}))}),null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each((function(){U.remove(this,e)}))}}),w.extend({queue:function(e,t,i){var n;if(e)return t=(t||"fx")+"queue",n=X.get(e,t),i&&(!n||Array.isArray(i)?n=X.access(e,t,w.makeArray(i)):n.push(i)),n||[]},dequeue:function(e,t){t=t||"fx";var i=w.queue(e,t),n=i.length,s=i.shift(),a=w._queueHooks(e,t);"inprogress"===s&&(s=i.shift(),n--),s&&("fx"===t&&i.unshift("inprogress"),delete a.stop,s.call(e,(function(){w.dequeue(e,t)}),a)),!n&&a&&a.empty.fire()},_queueHooks:function(e,t){var i=t+"queueHooks";return X.get(e,i)||X.access(e,i,{empty:w.Callbacks("once memory").add((function(){X.remove(e,[t+"queue",i])}))})}}),w.fn.extend({queue:function(e,t){var i=2;return"string"!=typeof e&&(t=e,e="fx",i--),arguments.length<i?w.queue(this[0],e):void 0===t?this:this.each((function(){var i=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==i[0]&&w.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){w.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var i,n=1,s=w.Deferred(),a=this,r=this.length,o=function(){--n||s.resolveWith(a,[a])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";r--;)(i=X.get(a[r],e+"queueHooks"))&&i.empty&&(n++,i.empty.add(o));return o(),s.promise(t)}});var J=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ee=new RegExp("^(?:([+-])=|)("+J+")([a-z%]*)$","i"),te=["Top","Right","Bottom","Left"],ie=v.documentElement,ne=function(e){return w.contains(e.ownerDocument,e)},se={composed:!0};ie.getRootNode&&(ne=function(e){return w.contains(e.ownerDocument,e)||e.getRootNode(se)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ne(e)&&"none"===w.css(e,"display")};function re(e,t,i,n){var s,a,r=20,o=n?function(){return n.cur()}:function(){return w.css(e,t,"")},l=o(),u=i&&i[3]||(w.cssNumber[t]?"":"px"),d=e.nodeType&&(w.cssNumber[t]||"px"!==u&&+l)&&ee.exec(w.css(e,t));if(d&&d[3]!==u){for(l/=2,u=u||d[3],d=+l||1;r--;)w.style(e,t,d+u),(1-a)*(1-(a=o()/l||.5))<=0&&(r=0),d/=a;d*=2,w.style(e,t,d+u),i=i||[]}return i&&(d=+d||+l||0,s=i[1]?d+(i[1]+1)*i[2]:+i[2],n&&(n.unit=u,n.start=d,n.end=s)),s}var oe={};function le(e){var t,i=e.ownerDocument,n=e.nodeName,s=oe[n];return s||(t=i.body.appendChild(i.createElement(n)),s=w.css(t,"display"),t.parentNode.removeChild(t),"none"===s&&(s="block"),oe[n]=s,s)}function ue(e,t){for(var i,n,s=[],a=0,r=e.length;a<r;a++)(n=e[a]).style&&(i=n.style.display,t?("none"===i&&(s[a]=X.get(n,"display")||null,s[a]||(n.style.display="")),""===n.style.display&&ae(n)&&(s[a]=le(n))):"none"!==i&&(s[a]="none",X.set(n,"display",i)));for(a=0;a<r;a++)null!=s[a]&&(e[a].style.display=s[a]);return e}w.fn.extend({show:function(){return ue(this,!0)},hide:function(){return ue(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){ae(this)?w(this).show():w(this).hide()}))}});var de,ce,he=/^(?:checkbox|radio)$/i,pe=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,fe=/^$|^module$|\/(?:java|ecma)script/i;de=v.createDocumentFragment().appendChild(v.createElement("div")),(ce=v.createElement("input")).setAttribute("type","radio"),ce.setAttribute("checked","checked"),ce.setAttribute("name","t"),de.appendChild(ce),p.checkClone=de.cloneNode(!0).cloneNode(!0).lastChild.checked,de.innerHTML="<textarea>x</textarea>",p.noCloneChecked=!!de.cloneNode(!0).lastChild.defaultValue,de.innerHTML="<option></option>",p.option=!!de.lastChild;var me={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var i;return i=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&k(e,t)?w.merge([e],i):i}function ge(e,t){for(var i=0,n=e.length;i<n;i++)X.set(e[i],"globalEval",!t||X.get(t[i],"globalEval"))}me.tbody=me.tfoot=me.colgroup=me.caption=me.thead,me.th=me.td,p.option||(me.optgroup=me.option=[1,"<select multiple='multiple'>","</select>"]);var ye=/<|&#?\w+;/;function be(e,t,i,n,s){for(var a,r,o,l,u,d,c=t.createDocumentFragment(),h=[],p=0,f=e.length;p<f;p++)if((a=e[p])||0===a)if("object"===b(a))w.merge(h,a.nodeType?[a]:a);else if(ye.test(a)){for(r=r||c.appendChild(t.createElement("div")),o=(pe.exec(a)||["",""])[1].toLowerCase(),l=me[o]||me._default,r.innerHTML=l[1]+w.htmlPrefilter(a)+l[2],d=l[0];d--;)r=r.lastChild;w.merge(h,r.childNodes),(r=c.firstChild).textContent=""}else h.push(t.createTextNode(a));for(c.textContent="",p=0;a=h[p++];)if(n&&w.inArray(a,n)>-1)s&&s.push(a);else if(u=ne(a),r=ve(c.appendChild(a),"script"),u&&ge(r),i)for(d=0;a=r[d++];)fe.test(a.type||"")&&i.push(a);return c}var we=/^([^.]*)(?:\.(.+)|)/;function xe(){return!0}function Ce(){return!1}function Te(e,t){return e===function(){try{return v.activeElement}catch(e){}}()==("focus"===t)}function Se(e,t,i,n,s,a){var r,o;if("object"==typeof t){for(o in"string"!=typeof i&&(n=n||i,i=void 0),t)Se(e,o,i,n,t[o],a);return e}if(null==n&&null==s?(s=i,n=i=void 0):null==s&&("string"==typeof i?(s=n,n=void 0):(s=n,n=i,i=void 0)),!1===s)s=Ce;else if(!s)return e;return 1===a&&(r=s,(s=function(e){return w().off(e),r.apply(this,arguments)}).guid=r.guid||(r.guid=w.guid++)),e.each((function(){w.event.add(this,t,s,n,i)}))}function Ee(e,t,i){i?(X.set(e,t,!1),w.event.add(e,t,{namespace:!1,handler:function(e){var n,a,r=X.get(this,t);if(1&e.isTrigger&&this[t]){if(r.length)(w.event.special[t]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),X.set(this,t,r),n=i(this,t),this[t](),r!==(a=X.get(this,t))||n?X.set(this,t,!1):a={},r!==a)return e.stopImmediatePropagation(),e.preventDefault(),a&&a.value}else r.length&&(X.set(this,t,{value:w.event.trigger(w.extend(r[0],w.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===X.get(e,t)&&w.event.add(e,t,xe)}w.event={global:{},add:function(e,t,i,n,s){var a,r,o,l,u,d,c,h,p,f,m,v=X.get(e);if(G(e))for(i.handler&&(i=(a=i).handler,s=a.selector),s&&w.find.matchesSelector(ie,s),i.guid||(i.guid=w.guid++),(l=v.events)||(l=v.events=Object.create(null)),(r=v.handle)||(r=v.handle=function(t){return void 0!==w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),u=(t=(t||"").match(O)||[""]).length;u--;)p=m=(o=we.exec(t[u])||[])[1],f=(o[2]||"").split(".").sort(),p&&(c=w.event.special[p]||{},p=(s?c.delegateType:c.bindType)||p,c=w.event.special[p]||{},d=w.extend({type:p,origType:m,data:n,handler:i,guid:i.guid,selector:s,needsContext:s&&w.expr.match.needsContext.test(s),namespace:f.join(".")},a),(h=l[p])||((h=l[p]=[]).delegateCount=0,c.setup&&!1!==c.setup.call(e,n,f,r)||e.addEventListener&&e.addEventListener(p,r)),c.add&&(c.add.call(e,d),d.handler.guid||(d.handler.guid=i.guid)),s?h.splice(h.delegateCount++,0,d):h.push(d),w.event.global[p]=!0)},remove:function(e,t,i,n,s){var a,r,o,l,u,d,c,h,p,f,m,v=X.hasData(e)&&X.get(e);if(v&&(l=v.events)){for(u=(t=(t||"").match(O)||[""]).length;u--;)if(p=m=(o=we.exec(t[u])||[])[1],f=(o[2]||"").split(".").sort(),p){for(c=w.event.special[p]||{},h=l[p=(n?c.delegateType:c.bindType)||p]||[],o=o[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),r=a=h.length;a--;)d=h[a],!s&&m!==d.origType||i&&i.guid!==d.guid||o&&!o.test(d.namespace)||n&&n!==d.selector&&("**"!==n||!d.selector)||(h.splice(a,1),d.selector&&h.delegateCount--,c.remove&&c.remove.call(e,d));r&&!h.length&&(c.teardown&&!1!==c.teardown.call(e,f,v.handle)||w.removeEvent(e,p,v.handle),delete l[p])}else for(p in l)w.event.remove(e,p+t[u],i,n,!0);w.isEmptyObject(l)&&X.remove(e,"handle events")}},dispatch:function(e){var t,i,n,s,a,r,o=new Array(arguments.length),l=w.event.fix(e),u=(X.get(this,"events")||Object.create(null))[l.type]||[],d=w.event.special[l.type]||{};for(o[0]=l,t=1;t<arguments.length;t++)o[t]=arguments[t];if(l.delegateTarget=this,!d.preDispatch||!1!==d.preDispatch.call(this,l)){for(r=w.event.handlers.call(this,l,u),t=0;(s=r[t++])&&!l.isPropagationStopped();)for(l.currentTarget=s.elem,i=0;(a=s.handlers[i++])&&!l.isImmediatePropagationStopped();)l.rnamespace&&!1!==a.namespace&&!l.rnamespace.test(a.namespace)||(l.handleObj=a,l.data=a.data,void 0!==(n=((w.event.special[a.origType]||{}).handle||a.handler).apply(s.elem,o))&&!1===(l.result=n)&&(l.preventDefault(),l.stopPropagation()));return d.postDispatch&&d.postDispatch.call(this,l),l.result}},handlers:function(e,t){var i,n,s,a,r,o=[],l=t.delegateCount,u=e.target;if(l&&u.nodeType&&!("click"===e.type&&e.button>=1))for(;u!==this;u=u.parentNode||this)if(1===u.nodeType&&("click"!==e.type||!0!==u.disabled)){for(a=[],r={},i=0;i<l;i++)void 0===r[s=(n=t[i]).selector+" "]&&(r[s]=n.needsContext?w(s,this).index(u)>-1:w.find(s,this,null,[u]).length),r[s]&&a.push(n);a.length&&o.push({elem:u,handlers:a})}return u=this,l<t.length&&o.push({elem:u,handlers:t.slice(l)}),o},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:f(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return he.test(t.type)&&t.click&&k(t,"input")&&Ee(t,"click",xe),!1},trigger:function(e){var t=this||e;return he.test(t.type)&&t.click&&k(t,"input")&&Ee(t,"click"),!0},_default:function(e){var t=e.target;return he.test(t.type)&&t.click&&k(t,"input")&&X.get(t,"click")||k(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,i){e.removeEventListener&&e.removeEventListener(t,i)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?xe:Ce,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:Ce,isPropagationStopped:Ce,isImmediatePropagationStopped:Ce,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=xe,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=xe,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=xe,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},w.event.addProp),w.each({focus:"focusin",blur:"focusout"},(function(e,t){w.event.special[e]={setup:function(){return Ee(this,e,Te),!1},trigger:function(){return Ee(this,e),!0},_default:function(){return!0},delegateType:t}})),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var i,n=this,s=e.relatedTarget,a=e.handleObj;return s&&(s===n||w.contains(n,s))||(e.type=a.origType,i=a.handler.apply(this,arguments),e.type=t),i}}})),w.fn.extend({on:function(e,t,i,n){return Se(this,e,t,i,n)},one:function(e,t,i,n){return Se(this,e,t,i,n,1)},off:function(e,t,i){var n,s;if(e&&e.preventDefault&&e.handleObj)return n=e.handleObj,w(e.delegateTarget).off(n.namespace?n.origType+"."+n.namespace:n.origType,n.selector,n.handler),this;if("object"==typeof e){for(s in e)this.off(s,t,e[s]);return this}return!1!==t&&"function"!=typeof t||(i=t,t=void 0),!1===i&&(i=Ce),this.each((function(){w.event.remove(this,e,i,t)}))}});var ke=/<script|<style|<link/i,De=/checked\s*(?:[^=]|=\s*.checked.)/i,Me=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function _e(e,t){return k(e,"table")&&k(11!==t.nodeType?t:t.firstChild,"tr")&&w(e).children("tbody")[0]||e}function $e(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Pe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Le(e,t){var i,n,s,a,r,o;if(1===t.nodeType){if(X.hasData(e)&&(o=X.get(e).events))for(s in X.remove(t,"handle events"),o)for(i=0,n=o[s].length;i<n;i++)w.event.add(t,s,o[s][i]);U.hasData(e)&&(a=U.access(e),r=w.extend({},a),U.set(t,r))}}function Ae(e,t){var i=t.nodeName.toLowerCase();"input"===i&&he.test(e.type)?t.checked=e.checked:"input"!==i&&"textarea"!==i||(t.defaultValue=e.defaultValue)}function Oe(e,t,i,n){t=a(t);var s,r,o,l,u,d,c=0,h=e.length,m=h-1,v=t[0],g=f(v);if(g||h>1&&"string"==typeof v&&!p.checkClone&&De.test(v))return e.each((function(s){var a=e.eq(s);g&&(t[0]=v.call(this,s,a.html())),Oe(a,t,i,n)}));if(h&&(r=(s=be(t,e[0].ownerDocument,!1,e,n)).firstChild,1===s.childNodes.length&&(s=r),r||n)){for(l=(o=w.map(ve(s,"script"),$e)).length;c<h;c++)u=s,c!==m&&(u=w.clone(u,!0,!0),l&&w.merge(o,ve(u,"script"))),i.call(e[c],u,c);if(l)for(d=o[o.length-1].ownerDocument,w.map(o,Pe),c=0;c<l;c++)u=o[c],fe.test(u.type||"")&&!X.access(u,"globalEval")&&w.contains(d,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?w._evalUrl&&!u.noModule&&w._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},d):y(u.textContent.replace(Me,""),u,d))}return e}function Ie(e,t,i){for(var n,s=t?w.filter(t,e):e,a=0;null!=(n=s[a]);a++)i||1!==n.nodeType||w.cleanData(ve(n)),n.parentNode&&(i&&ne(n)&&ge(ve(n,"script")),n.parentNode.removeChild(n));return e}w.extend({htmlPrefilter:function(e){return e},clone:function(e,t,i){var n,s,a,r,o=e.cloneNode(!0),l=ne(e);if(!(p.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(r=ve(o),n=0,s=(a=ve(e)).length;n<s;n++)Ae(a[n],r[n]);if(t)if(i)for(a=a||ve(e),r=r||ve(o),n=0,s=a.length;n<s;n++)Le(a[n],r[n]);else Le(e,o);return(r=ve(o,"script")).length>0&&ge(r,!l&&ve(e,"script")),o},cleanData:function(e){for(var t,i,n,s=w.event.special,a=0;void 0!==(i=e[a]);a++)if(G(i)){if(t=i[X.expando]){if(t.events)for(n in t.events)s[n]?w.event.remove(i,n):w.removeEvent(i,n,t.handle);i[X.expando]=void 0}i[U.expando]&&(i[U.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return R(this,(function(e){return void 0===e?w.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return Oe(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||_e(this,e).appendChild(e)}))},prepend:function(){return Oe(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=_e(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return Oe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return Oe(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return w.clone(this,e,t)}))},html:function(e){return R(this,(function(e){var t=this[0]||{},i=0,n=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!ke.test(e)&&!me[(pe.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;i<n;i++)1===(t=this[i]||{}).nodeType&&(w.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[];return Oe(this,arguments,(function(t){var i=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ve(this)),i&&i.replaceChild(t,this))}),e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){w.fn[e]=function(e){for(var i,n=[],s=w(e),a=s.length-1,o=0;o<=a;o++)i=o===a?this:this.clone(!0),w(s[o])[t](i),r.apply(n,i.get());return this.pushStack(n)}}));var ze=new RegExp("^("+J+")(?!px)[a-z%]+$","i"),Ne=function(t){var i=t.ownerDocument.defaultView;return i&&i.opener||(i=e),i.getComputedStyle(t)},je=function(e,t,i){var n,s,a={};for(s in t)a[s]=e.style[s],e.style[s]=t[s];for(s in n=i.call(e),t)e.style[s]=a[s];return n},Fe=new RegExp(te.join("|"),"i");function He(e,t,i){var n,s,a,r,o=e.style;return(i=i||Ne(e))&&(""!==(r=i.getPropertyValue(t)||i[t])||ne(e)||(r=w.style(e,t)),!p.pixelBoxStyles()&&ze.test(r)&&Fe.test(t)&&(n=o.width,s=o.minWidth,a=o.maxWidth,o.minWidth=o.maxWidth=o.width=r,r=i.width,o.width=n,o.minWidth=s,o.maxWidth=a)),void 0!==r?r+"":r}function Re(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function t(){if(d){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",d.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(u).appendChild(d);var t=e.getComputedStyle(d);n="1%"!==t.top,l=12===i(t.marginLeft),d.style.right="60%",r=36===i(t.right),s=36===i(t.width),d.style.position="absolute",a=12===i(d.offsetWidth/3),ie.removeChild(u),d=null}}function i(e){return Math.round(parseFloat(e))}var n,s,a,r,o,l,u=v.createElement("div"),d=v.createElement("div");d.style&&(d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",p.clearCloneStyle="content-box"===d.style.backgroundClip,w.extend(p,{boxSizingReliable:function(){return t(),s},pixelBoxStyles:function(){return t(),r},pixelPosition:function(){return t(),n},reliableMarginLeft:function(){return t(),l},scrollboxSize:function(){return t(),a},reliableTrDimensions:function(){var t,i,n,s;return null==o&&(t=v.createElement("table"),i=v.createElement("tr"),n=v.createElement("div"),t.style.cssText="position:absolute;left:-11111px;border-collapse:separate",i.style.cssText="border:1px solid",i.style.height="1px",n.style.height="9px",n.style.display="block",ie.appendChild(t).appendChild(i).appendChild(n),s=e.getComputedStyle(i),o=parseInt(s.height,10)+parseInt(s.borderTopWidth,10)+parseInt(s.borderBottomWidth,10)===i.offsetHeight,ie.removeChild(t)),o}}))}();var Be=["Webkit","Moz","ms"],qe=v.createElement("div").style,Ve={};function We(e){var t=w.cssProps[e]||Ve[e];return t||(e in qe?e:Ve[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),i=Be.length;i--;)if((e=Be[i]+t)in qe)return e}(e)||e)}var Ge=/^(none|table(?!-c[ea]).+)/,Ye=/^--/,Xe={position:"absolute",visibility:"hidden",display:"block"},Ue={letterSpacing:"0",fontWeight:"400"};function Ke(e,t,i){var n=ee.exec(t);return n?Math.max(0,n[2]-(i||0))+(n[3]||"px"):t}function Ze(e,t,i,n,s,a){var r="width"===t?1:0,o=0,l=0;if(i===(n?"border":"content"))return 0;for(;r<4;r+=2)"margin"===i&&(l+=w.css(e,i+te[r],!0,s)),n?("content"===i&&(l-=w.css(e,"padding"+te[r],!0,s)),"margin"!==i&&(l-=w.css(e,"border"+te[r]+"Width",!0,s))):(l+=w.css(e,"padding"+te[r],!0,s),"padding"!==i?l+=w.css(e,"border"+te[r]+"Width",!0,s):o+=w.css(e,"border"+te[r]+"Width",!0,s));return!n&&a>=0&&(l+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-a-l-o-.5))||0),l}function Qe(e,t,i){var n=Ne(e),s=(!p.boxSizingReliable()||i)&&"border-box"===w.css(e,"boxSizing",!1,n),a=s,r=He(e,t,n),o="offset"+t[0].toUpperCase()+t.slice(1);if(ze.test(r)){if(!i)return r;r="auto"}return(!p.boxSizingReliable()&&s||!p.reliableTrDimensions()&&k(e,"tr")||"auto"===r||!parseFloat(r)&&"inline"===w.css(e,"display",!1,n))&&e.getClientRects().length&&(s="border-box"===w.css(e,"boxSizing",!1,n),(a=o in e)&&(r=e[o])),(r=parseFloat(r)||0)+Ze(e,t,i||(s?"border":"content"),a,n,r)+"px"}function Je(e,t,i,n,s){return new Je.prototype.init(e,t,i,n,s)}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var i=He(e,"opacity");return""===i?"1":i}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,i,n){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var s,a,r,o=W(t),l=Ye.test(t),u=e.style;if(l||(t=We(o)),r=w.cssHooks[t]||w.cssHooks[o],void 0===i)return r&&"get"in r&&void 0!==(s=r.get(e,!1,n))?s:u[t];"string"===(a=typeof i)&&(s=ee.exec(i))&&s[1]&&(i=re(e,t,s),a="number"),null!=i&&i==i&&("number"!==a||l||(i+=s&&s[3]||(w.cssNumber[o]?"":"px")),p.clearCloneStyle||""!==i||0!==t.indexOf("background")||(u[t]="inherit"),r&&"set"in r&&void 0===(i=r.set(e,i,n))||(l?u.setProperty(t,i):u[t]=i))}},css:function(e,t,i,n){var s,a,r,o=W(t);return Ye.test(t)||(t=We(o)),(r=w.cssHooks[t]||w.cssHooks[o])&&"get"in r&&(s=r.get(e,!0,i)),void 0===s&&(s=He(e,t,n)),"normal"===s&&t in Ue&&(s=Ue[t]),""===i||i?(a=parseFloat(s),!0===i||isFinite(a)?a||0:s):s}}),w.each(["height","width"],(function(e,t){w.cssHooks[t]={get:function(e,i,n){if(i)return!Ge.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Qe(e,t,n):je(e,Xe,(function(){return Qe(e,t,n)}))},set:function(e,i,n){var s,a=Ne(e),r=!p.scrollboxSize()&&"absolute"===a.position,o=(r||n)&&"border-box"===w.css(e,"boxSizing",!1,a),l=n?Ze(e,t,n,o,a):0;return o&&r&&(l-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(a[t])-Ze(e,t,"border",!1,a)-.5)),l&&(s=ee.exec(i))&&"px"!==(s[3]||"px")&&(e.style[t]=i,i=w.css(e,t)),Ke(0,i,l)}}})),w.cssHooks.marginLeft=Re(p.reliableMarginLeft,(function(e,t){if(t)return(parseFloat(He(e,"marginLeft"))||e.getBoundingClientRect().left-je(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),w.each({margin:"",padding:"",border:"Width"},(function(e,t){w.cssHooks[e+t]={expand:function(i){for(var n=0,s={},a="string"==typeof i?i.split(" "):[i];n<4;n++)s[e+te[n]+t]=a[n]||a[n-2]||a[0];return s}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)})),w.fn.extend({css:function(e,t){return R(this,(function(e,t,i){var n,s,a={},r=0;if(Array.isArray(t)){for(n=Ne(e),s=t.length;r<s;r++)a[t[r]]=w.css(e,t[r],!1,n);return a}return void 0!==i?w.style(e,t,i):w.css(e,t)}),e,t,arguments.length>1)}}),w.Tween=Je,Je.prototype={constructor:Je,init:function(e,t,i,n,s,a){this.elem=e,this.prop=i,this.easing=s||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=n,this.unit=a||(w.cssNumber[i]?"":"px")},cur:function(){var e=Je.propHooks[this.prop];return e&&e.get?e.get(this):Je.propHooks._default.get(this)},run:function(e){var t,i=Je.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),i&&i.set?i.set(this):Je.propHooks._default.set(this),this}},Je.prototype.init.prototype=Je.prototype,Je.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||!w.cssHooks[e.prop]&&null==e.elem.style[We(e.prop)]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},Je.propHooks.scrollTop=Je.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=Je.prototype.init,w.fx.step={};var et,tt,it=/^(?:toggle|show|hide)$/,nt=/queueHooks$/;function st(){tt&&(!1===v.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(st):e.setTimeout(st,w.fx.interval),w.fx.tick())}function at(){return e.setTimeout((function(){et=void 0})),et=Date.now()}function rt(e,t){var i,n=0,s={height:e};for(t=t?1:0;n<4;n+=2-t)s["margin"+(i=te[n])]=s["padding"+i]=e;return t&&(s.opacity=s.width=e),s}function ot(e,t,i){for(var n,s=(lt.tweeners[t]||[]).concat(lt.tweeners["*"]),a=0,r=s.length;a<r;a++)if(n=s[a].call(i,t,e))return n}function lt(e,t,i){var n,s,a=0,r=lt.prefilters.length,o=w.Deferred().always((function(){delete l.elem})),l=function(){if(s)return!1;for(var t=et||at(),i=Math.max(0,u.startTime+u.duration-t),n=1-(i/u.duration||0),a=0,r=u.tweens.length;a<r;a++)u.tweens[a].run(n);return o.notifyWith(e,[u,n,i]),n<1&&r?i:(r||o.notifyWith(e,[u,1,0]),o.resolveWith(e,[u]),!1)},u=o.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},i),originalProperties:t,originalOptions:i,startTime:et||at(),duration:i.duration,tweens:[],createTween:function(t,i){var n=w.Tween(e,u.opts,t,i,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(n),n},stop:function(t){var i=0,n=t?u.tweens.length:0;if(s)return this;for(s=!0;i<n;i++)u.tweens[i].run(1);return t?(o.notifyWith(e,[u,1,0]),o.resolveWith(e,[u,t])):o.rejectWith(e,[u,t]),this}}),d=u.props;for(!function(e,t){var i,n,s,a,r;for(i in e)if(s=t[n=W(i)],a=e[i],Array.isArray(a)&&(s=a[1],a=e[i]=a[0]),i!==n&&(e[n]=a,delete e[i]),(r=w.cssHooks[n])&&"expand"in r)for(i in a=r.expand(a),delete e[n],a)i in e||(e[i]=a[i],t[i]=s);else t[n]=s}(d,u.opts.specialEasing);a<r;a++)if(n=lt.prefilters[a].call(u,e,d,u.opts))return f(n.stop)&&(w._queueHooks(u.elem,u.opts.queue).stop=n.stop.bind(n)),n;return w.map(d,ot,u),f(u.opts.start)&&u.opts.start.call(e,u),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always),w.fx.timer(w.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u}w.Animation=w.extend(lt,{tweeners:{"*":[function(e,t){var i=this.createTween(e,t);return re(i.elem,e,ee.exec(t),i),i}]},tweener:function(e,t){f(e)?(t=e,e=["*"]):e=e.match(O);for(var i,n=0,s=e.length;n<s;n++)i=e[n],lt.tweeners[i]=lt.tweeners[i]||[],lt.tweeners[i].unshift(t)},prefilters:[function(e,t,i){var n,s,a,r,o,l,u,d,c="width"in t||"height"in t,h=this,p={},f=e.style,m=e.nodeType&&ae(e),v=X.get(e,"fxshow");for(n in i.queue||(null==(r=w._queueHooks(e,"fx")).unqueued&&(r.unqueued=0,o=r.empty.fire,r.empty.fire=function(){r.unqueued||o()}),r.unqueued++,h.always((function(){h.always((function(){r.unqueued--,w.queue(e,"fx").length||r.empty.fire()}))}))),t)if(s=t[n],it.test(s)){if(delete t[n],a=a||"toggle"===s,s===(m?"hide":"show")){if("show"!==s||!v||void 0===v[n])continue;m=!0}p[n]=v&&v[n]||w.style(e,n)}if((l=!w.isEmptyObject(t))||!w.isEmptyObject(p))for(n in c&&1===e.nodeType&&(i.overflow=[f.overflow,f.overflowX,f.overflowY],null==(u=v&&v.display)&&(u=X.get(e,"display")),"none"===(d=w.css(e,"display"))&&(u?d=u:(ue([e],!0),u=e.style.display||u,d=w.css(e,"display"),ue([e]))),("inline"===d||"inline-block"===d&&null!=u)&&"none"===w.css(e,"float")&&(l||(h.done((function(){f.display=u})),null==u&&(d=f.display,u="none"===d?"":d)),f.display="inline-block")),i.overflow&&(f.overflow="hidden",h.always((function(){f.overflow=i.overflow[0],f.overflowX=i.overflow[1],f.overflowY=i.overflow[2]}))),l=!1,p)l||(v?"hidden"in v&&(m=v.hidden):v=X.access(e,"fxshow",{display:u}),a&&(v.hidden=!m),m&&ue([e],!0),h.done((function(){for(n in m||ue([e]),X.remove(e,"fxshow"),p)w.style(e,n,p[n])}))),l=ot(m?v[n]:0,n,h),n in v||(v[n]=l.start,m&&(l.end=l.start,l.start=0))}],prefilter:function(e,t){t?lt.prefilters.unshift(e):lt.prefilters.push(e)}}),w.speed=function(e,t,i){var n=e&&"object"==typeof e?w.extend({},e):{complete:i||!i&&t||f(e)&&e,duration:e,easing:i&&t||t&&!f(t)&&t};return w.fx.off?n.duration=0:"number"!=typeof n.duration&&(n.duration in w.fx.speeds?n.duration=w.fx.speeds[n.duration]:n.duration=w.fx.speeds._default),null!=n.queue&&!0!==n.queue||(n.queue="fx"),n.old=n.complete,n.complete=function(){f(n.old)&&n.old.call(this),n.queue&&w.dequeue(this,n.queue)},n},w.fn.extend({fadeTo:function(e,t,i,n){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,i,n)},animate:function(e,t,i,n){var s=w.isEmptyObject(e),a=w.speed(t,i,n),r=function(){var t=lt(this,w.extend({},e),a);(s||X.get(this,"finish"))&&t.stop(!0)};return r.finish=r,s||!1===a.queue?this.each(r):this.queue(a.queue,r)},stop:function(e,t,i){var n=function(e){var t=e.stop;delete e.stop,t(i)};return"string"!=typeof e&&(i=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each((function(){var t=!0,s=null!=e&&e+"queueHooks",a=w.timers,r=X.get(this);if(s)r[s]&&r[s].stop&&n(r[s]);else for(s in r)r[s]&&r[s].stop&&nt.test(s)&&n(r[s]);for(s=a.length;s--;)a[s].elem!==this||null!=e&&a[s].queue!==e||(a[s].anim.stop(i),t=!1,a.splice(s,1));!t&&i||w.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,i=X.get(this),n=i[e+"queue"],s=i[e+"queueHooks"],a=w.timers,r=n?n.length:0;for(i.finish=!0,w.queue(this,e,[]),s&&s.stop&&s.stop.call(this,!0),t=a.length;t--;)a[t].elem===this&&a[t].queue===e&&(a[t].anim.stop(!0),a.splice(t,1));for(t=0;t<r;t++)n[t]&&n[t].finish&&n[t].finish.call(this);delete i.finish}))}}),w.each(["toggle","show","hide"],(function(e,t){var i=w.fn[t];w.fn[t]=function(e,n,s){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(rt(t,!0),e,n,s)}})),w.each({slideDown:rt("show"),slideUp:rt("hide"),slideToggle:rt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){w.fn[e]=function(e,i,n){return this.animate(t,e,i,n)}})),w.timers=[],w.fx.tick=function(){var e,t=0,i=w.timers;for(et=Date.now();t<i.length;t++)(e=i[t])()||i[t]!==e||i.splice(t--,1);i.length||w.fx.stop(),et=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){tt||(tt=!0,st())},w.fx.stop=function(){tt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,i){return t=w.fx&&w.fx.speeds[t]||t,i=i||"fx",this.queue(i,(function(i,n){var s=e.setTimeout(i,t);n.stop=function(){e.clearTimeout(s)}}))},function(){var e=v.createElement("input"),t=v.createElement("select").appendChild(v.createElement("option"));e.type="checkbox",p.checkOn=""!==e.value,p.optSelected=t.selected,(e=v.createElement("input")).value="t",e.type="radio",p.radioValue="t"===e.value}();var ut,dt=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return R(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each((function(){w.removeAttr(this,e)}))}}),w.extend({attr:function(e,t,i){var n,s,a=e.nodeType;if(3!==a&&8!==a&&2!==a)return void 0===e.getAttribute?w.prop(e,t,i):(1===a&&w.isXMLDoc(e)||(s=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?ut:void 0)),void 0!==i?null===i?void w.removeAttr(e,t):s&&"set"in s&&void 0!==(n=s.set(e,i,t))?n:(e.setAttribute(t,i+""),i):s&&"get"in s&&null!==(n=s.get(e,t))?n:null==(n=w.find.attr(e,t))?void 0:n)},attrHooks:{type:{set:function(e,t){if(!p.radioValue&&"radio"===t&&k(e,"input")){var i=e.value;return e.setAttribute("type",t),i&&(e.value=i),t}}}},removeAttr:function(e,t){var i,n=0,s=t&&t.match(O);if(s&&1===e.nodeType)for(;i=s[n++];)e.removeAttribute(i)}}),ut={set:function(e,t,i){return!1===t?w.removeAttr(e,i):e.setAttribute(i,i),i}},w.each(w.expr.match.bool.source.match(/\w+/g),(function(e,t){var i=dt[t]||w.find.attr;dt[t]=function(e,t,n){var s,a,r=t.toLowerCase();return n||(a=dt[r],dt[r]=s,s=null!=i(e,t,n)?r:null,dt[r]=a),s}}));var ct=/^(?:input|select|textarea|button)$/i,ht=/^(?:a|area)$/i;function pt(e){return(e.match(O)||[]).join(" ")}function ft(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(O)||[]}w.fn.extend({prop:function(e,t){return R(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each((function(){delete this[w.propFix[e]||e]}))}}),w.extend({prop:function(e,t,i){var n,s,a=e.nodeType;if(3!==a&&8!==a&&2!==a)return 1===a&&w.isXMLDoc(e)||(t=w.propFix[t]||t,s=w.propHooks[t]),void 0!==i?s&&"set"in s&&void 0!==(n=s.set(e,i,t))?n:e[t]=i:s&&"get"in s&&null!==(n=s.get(e,t))?n:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):ct.test(e.nodeName)||ht.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),p.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){w.propFix[this.toLowerCase()]=this})),w.fn.extend({addClass:function(e){var t,i,n,s,a,r,o,l=0;if(f(e))return this.each((function(t){w(this).addClass(e.call(this,t,ft(this)))}));if((t=mt(e)).length)for(;i=this[l++];)if(s=ft(i),n=1===i.nodeType&&" "+pt(s)+" "){for(r=0;a=t[r++];)n.indexOf(" "+a+" ")<0&&(n+=a+" ");s!==(o=pt(n))&&i.setAttribute("class",o)}return this},removeClass:function(e){var t,i,n,s,a,r,o,l=0;if(f(e))return this.each((function(t){w(this).removeClass(e.call(this,t,ft(this)))}));if(!arguments.length)return this.attr("class","");if((t=mt(e)).length)for(;i=this[l++];)if(s=ft(i),n=1===i.nodeType&&" "+pt(s)+" "){for(r=0;a=t[r++];)for(;n.indexOf(" "+a+" ")>-1;)n=n.replace(" "+a+" "," ");s!==(o=pt(n))&&i.setAttribute("class",o)}return this},toggleClass:function(e,t){var i=typeof e,n="string"===i||Array.isArray(e);return"boolean"==typeof t&&n?t?this.addClass(e):this.removeClass(e):f(e)?this.each((function(i){w(this).toggleClass(e.call(this,i,ft(this),t),t)})):this.each((function(){var t,s,a,r;if(n)for(s=0,a=w(this),r=mt(e);t=r[s++];)a.hasClass(t)?a.removeClass(t):a.addClass(t);else void 0!==e&&"boolean"!==i||((t=ft(this))&&X.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":X.get(this,"__className__")||""))}))},hasClass:function(e){var t,i,n=0;for(t=" "+e+" ";i=this[n++];)if(1===i.nodeType&&(" "+pt(ft(i))+" ").indexOf(t)>-1)return!0;return!1}});var vt=/\r/g;w.fn.extend({val:function(e){var t,i,n,s=this[0];return arguments.length?(n=f(e),this.each((function(i){var s;1===this.nodeType&&(null==(s=n?e.call(this,i,w(this).val()):e)?s="":"number"==typeof s?s+="":Array.isArray(s)&&(s=w.map(s,(function(e){return null==e?"":e+""}))),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,s,"value")||(this.value=s))}))):s?(t=w.valHooks[s.type]||w.valHooks[s.nodeName.toLowerCase()])&&"get"in t&&void 0!==(i=t.get(s,"value"))?i:"string"==typeof(i=s.value)?i.replace(vt,""):null==i?"":i:void 0}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:pt(w.text(e))}},select:{get:function(e){var t,i,n,s=e.options,a=e.selectedIndex,r="select-one"===e.type,o=r?null:[],l=r?a+1:s.length;for(n=a<0?l:r?a:0;n<l;n++)if(((i=s[n]).selected||n===a)&&!i.disabled&&(!i.parentNode.disabled||!k(i.parentNode,"optgroup"))){if(t=w(i).val(),r)return t;o.push(t)}return o},set:function(e,t){for(var i,n,s=e.options,a=w.makeArray(t),r=s.length;r--;)((n=s[r]).selected=w.inArray(w.valHooks.option.get(n),a)>-1)&&(i=!0);return i||(e.selectedIndex=-1),a}}}}),w.each(["radio","checkbox"],(function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},p.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),p.focusin="onfocusin"in e;var gt=/^(?:focusinfocus|focusoutblur)$/,yt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,i,n,s){var a,r,o,l,u,c,h,p,g=[n||v],y=d.call(t,"type")?t.type:t,b=d.call(t,"namespace")?t.namespace.split("."):[];if(r=p=o=n=n||v,3!==n.nodeType&&8!==n.nodeType&&!gt.test(y+w.event.triggered)&&(y.indexOf(".")>-1&&(b=y.split("."),y=b.shift(),b.sort()),u=y.indexOf(":")<0&&"on"+y,(t=t[w.expando]?t:new w.Event(y,"object"==typeof t&&t)).isTrigger=s?2:3,t.namespace=b.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=n),i=null==i?[t]:w.makeArray(i,[t]),h=w.event.special[y]||{},s||!h.trigger||!1!==h.trigger.apply(n,i))){if(!s&&!h.noBubble&&!m(n)){for(l=h.delegateType||y,gt.test(l+y)||(r=r.parentNode);r;r=r.parentNode)g.push(r),o=r;o===(n.ownerDocument||v)&&g.push(o.defaultView||o.parentWindow||e)}for(a=0;(r=g[a++])&&!t.isPropagationStopped();)p=r,t.type=a>1?l:h.bindType||y,(c=(X.get(r,"events")||Object.create(null))[t.type]&&X.get(r,"handle"))&&c.apply(r,i),(c=u&&r[u])&&c.apply&&G(r)&&(t.result=c.apply(r,i),!1===t.result&&t.preventDefault());return t.type=y,s||t.isDefaultPrevented()||h._default&&!1!==h._default.apply(g.pop(),i)||!G(n)||u&&f(n[y])&&!m(n)&&((o=n[u])&&(n[u]=null),w.event.triggered=y,t.isPropagationStopped()&&p.addEventListener(y,yt),n[y](),t.isPropagationStopped()&&p.removeEventListener(y,yt),w.event.triggered=void 0,o&&(n[u]=o)),t.result}},simulate:function(e,t,i){var n=w.extend(new w.Event,i,{type:e,isSimulated:!0});w.event.trigger(n,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each((function(){w.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var i=this[0];if(i)return w.event.trigger(e,t,i,!0)}}),p.focusin||w.each({focus:"focusin",blur:"focusout"},(function(e,t){var i=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var n=this.ownerDocument||this.document||this,s=X.access(n,t);s||n.addEventListener(e,i,!0),X.access(n,t,(s||0)+1)},teardown:function(){var n=this.ownerDocument||this.document||this,s=X.access(n,t)-1;s?X.access(n,t,s):(n.removeEventListener(e,i,!0),X.remove(n,t))}}}));var bt=e.location,wt={guid:Date.now()},xt=/\?/;w.parseXML=function(t){var i,n;if(!t||"string"!=typeof t)return null;try{i=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){}return n=i&&i.getElementsByTagName("parsererror")[0],i&&!n||w.error("Invalid XML: "+(n?w.map(n.childNodes,(function(e){return e.textContent})).join("\n"):t)),i};var Ct=/\[\]$/,Tt=/\r?\n/g,St=/^(?:submit|button|image|reset|file)$/i,Et=/^(?:input|select|textarea|keygen)/i;function kt(e,t,i,n){var s;if(Array.isArray(t))w.each(t,(function(t,s){i||Ct.test(e)?n(e,s):kt(e+"["+("object"==typeof s&&null!=s?t:"")+"]",s,i,n)}));else if(i||"object"!==b(t))n(e,t);else for(s in t)kt(e+"["+s+"]",t[s],i,n)}w.param=function(e,t){var i,n=[],s=function(e,t){var i=f(t)?t():t;n[n.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==i?"":i)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,(function(){s(this.name,this.value)}));else for(i in e)kt(i,e[i],t,s);return n.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this})).filter((function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&Et.test(this.nodeName)&&!St.test(e)&&(this.checked||!he.test(e))})).map((function(e,t){var i=w(this).val();return null==i?null:Array.isArray(i)?w.map(i,(function(e){return{name:t.name,value:e.replace(Tt,"\r\n")}})):{name:t.name,value:i.replace(Tt,"\r\n")}})).get()}});var Dt=/%20/g,Mt=/#.*$/,_t=/([?&])_=[^&]*/,$t=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:GET|HEAD)$/,Lt=/^\/\//,At={},Ot={},It="*/".concat("*"),zt=v.createElement("a");function Nt(e){return function(t,i){"string"!=typeof t&&(i=t,t="*");var n,s=0,a=t.toLowerCase().match(O)||[];if(f(i))for(;n=a[s++];)"+"===n[0]?(n=n.slice(1)||"*",(e[n]=e[n]||[]).unshift(i)):(e[n]=e[n]||[]).push(i)}}function jt(e,t,i,n){var s={},a=e===Ot;function r(o){var l;return s[o]=!0,w.each(e[o]||[],(function(e,o){var u=o(t,i,n);return"string"!=typeof u||a||s[u]?a?!(l=u):void 0:(t.dataTypes.unshift(u),r(u),!1)})),l}return r(t.dataTypes[0])||!s["*"]&&r("*")}function Ft(e,t){var i,n,s=w.ajaxSettings.flatOptions||{};for(i in t)void 0!==t[i]&&((s[i]?e:n||(n={}))[i]=t[i]);return n&&w.extend(!0,e,n),e}zt.href=bt.href,w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:bt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(bt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Ft(Ft(e,w.ajaxSettings),t):Ft(w.ajaxSettings,e)},ajaxPrefilter:Nt(At),ajaxTransport:Nt(Ot),ajax:function(t,i){"object"==typeof t&&(i=t,t=void 0),i=i||{};var n,s,a,r,o,l,u,d,c,h,p=w.ajaxSetup({},i),f=p.context||p,m=p.context&&(f.nodeType||f.jquery)?w(f):w.event,g=w.Deferred(),y=w.Callbacks("once memory"),b=p.statusCode||{},x={},C={},T="canceled",S={readyState:0,getResponseHeader:function(e){var t;if(u){if(!r)for(r={};t=$t.exec(a);)r[t[1].toLowerCase()+" "]=(r[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=r[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return u?a:null},setRequestHeader:function(e,t){return null==u&&(e=C[e.toLowerCase()]=C[e.toLowerCase()]||e,x[e]=t),this},overrideMimeType:function(e){return null==u&&(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(u)S.always(e[S.status]);else for(t in e)b[t]=[b[t],e[t]];return this},abort:function(e){var t=e||T;return n&&n.abort(t),E(0,t),this}};if(g.promise(S),p.url=((t||p.url||bt.href)+"").replace(Lt,bt.protocol+"//"),p.type=i.method||i.type||p.method||p.type,p.dataTypes=(p.dataType||"*").toLowerCase().match(O)||[""],null==p.crossDomain){l=v.createElement("a");try{l.href=p.url,l.href=l.href,p.crossDomain=zt.protocol+"//"+zt.host!=l.protocol+"//"+l.host}catch(e){p.crossDomain=!0}}if(p.data&&p.processData&&"string"!=typeof p.data&&(p.data=w.param(p.data,p.traditional)),jt(At,p,i,S),u)return S;for(c in(d=w.event&&p.global)&&0==w.active++&&w.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Pt.test(p.type),s=p.url.replace(Mt,""),p.hasContent?p.data&&p.processData&&0===(p.contentType||"").indexOf("application/x-www-form-urlencoded")&&(p.data=p.data.replace(Dt,"+")):(h=p.url.slice(s.length),p.data&&(p.processData||"string"==typeof p.data)&&(s+=(xt.test(s)?"&":"?")+p.data,delete p.data),!1===p.cache&&(s=s.replace(_t,"$1"),h=(xt.test(s)?"&":"?")+"_="+wt.guid+++h),p.url=s+h),p.ifModified&&(w.lastModified[s]&&S.setRequestHeader("If-Modified-Since",w.lastModified[s]),w.etag[s]&&S.setRequestHeader("If-None-Match",w.etag[s])),(p.data&&p.hasContent&&!1!==p.contentType||i.contentType)&&S.setRequestHeader("Content-Type",p.contentType),S.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+It+"; q=0.01":""):p.accepts["*"]),p.headers)S.setRequestHeader(c,p.headers[c]);if(p.beforeSend&&(!1===p.beforeSend.call(f,S,p)||u))return S.abort();if(T="abort",y.add(p.complete),S.done(p.success),S.fail(p.error),n=jt(Ot,p,i,S)){if(S.readyState=1,d&&m.trigger("ajaxSend",[S,p]),u)return S;p.async&&p.timeout>0&&(o=e.setTimeout((function(){S.abort("timeout")}),p.timeout));try{u=!1,n.send(x,E)}catch(e){if(u)throw e;E(-1,e)}}else E(-1,"No Transport");function E(t,i,r,l){var c,h,v,x,C,T=i;u||(u=!0,o&&e.clearTimeout(o),n=void 0,a=l||"",S.readyState=t>0?4:0,c=t>=200&&t<300||304===t,r&&(x=function(e,t,i){for(var n,s,a,r,o=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===n&&(n=e.mimeType||t.getResponseHeader("Content-Type"));if(n)for(s in o)if(o[s]&&o[s].test(n)){l.unshift(s);break}if(l[0]in i)a=l[0];else{for(s in i){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}r||(r=s)}a=a||r}if(a)return a!==l[0]&&l.unshift(a),i[a]}(p,S,r)),!c&&w.inArray("script",p.dataTypes)>-1&&w.inArray("json",p.dataTypes)<0&&(p.converters["text script"]=function(){}),x=function(e,t,i,n){var s,a,r,o,l,u={},d=e.dataTypes.slice();if(d[1])for(r in e.converters)u[r.toLowerCase()]=e.converters[r];for(a=d.shift();a;)if(e.responseFields[a]&&(i[e.responseFields[a]]=t),!l&&n&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=a,a=d.shift())if("*"===a)a=l;else if("*"!==l&&l!==a){if(!(r=u[l+" "+a]||u["* "+a]))for(s in u)if((o=s.split(" "))[1]===a&&(r=u[l+" "+o[0]]||u["* "+o[0]])){!0===r?r=u[s]:!0!==u[s]&&(a=o[0],d.unshift(o[1]));break}if(!0!==r)if(r&&e.throws)t=r(t);else try{t=r(t)}catch(e){return{state:"parsererror",error:r?e:"No conversion from "+l+" to "+a}}}return{state:"success",data:t}}(p,x,S,c),c?(p.ifModified&&((C=S.getResponseHeader("Last-Modified"))&&(w.lastModified[s]=C),(C=S.getResponseHeader("etag"))&&(w.etag[s]=C)),204===t||"HEAD"===p.type?T="nocontent":304===t?T="notmodified":(T=x.state,h=x.data,c=!(v=x.error))):(v=T,!t&&T||(T="error",t<0&&(t=0))),S.status=t,S.statusText=(i||T)+"",c?g.resolveWith(f,[h,T,S]):g.rejectWith(f,[S,T,v]),S.statusCode(b),b=void 0,d&&m.trigger(c?"ajaxSuccess":"ajaxError",[S,p,c?h:v]),y.fireWith(f,[S,T]),d&&(m.trigger("ajaxComplete",[S,p]),--w.active||w.event.trigger("ajaxStop")))}return S},getJSON:function(e,t,i){return w.get(e,t,i,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],(function(e,t){w[t]=function(e,i,n,s){return f(i)&&(s=s||n,n=i,i=void 0),w.ajax(w.extend({url:e,type:t,dataType:s,data:i,success:n},w.isPlainObject(e)&&e))}})),w.ajaxPrefilter((function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),w._evalUrl=function(e,t,i){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){w.globalEval(e,t,i)}})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(f(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e})).append(this)),this},wrapInner:function(e){return f(e)?this.each((function(t){w(this).wrapInner(e.call(this,t))})):this.each((function(){var t=w(this),i=t.contents();i.length?i.wrapAll(e):t.append(e)}))},wrap:function(e){var t=f(e);return this.each((function(i){w(this).wrapAll(t?e.call(this,i):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){w(this).replaceWith(this.childNodes)})),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Ht={0:200,1223:204},Rt=w.ajaxSettings.xhr();p.cors=!!Rt&&"withCredentials"in Rt,p.ajax=Rt=!!Rt,w.ajaxTransport((function(t){var i,n;if(p.cors||Rt&&!t.crossDomain)return{send:function(s,a){var r,o=t.xhr();if(o.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(r in t.xhrFields)o[r]=t.xhrFields[r];for(r in t.mimeType&&o.overrideMimeType&&o.overrideMimeType(t.mimeType),t.crossDomain||s["X-Requested-With"]||(s["X-Requested-With"]="XMLHttpRequest"),s)o.setRequestHeader(r,s[r]);i=function(e){return function(){i&&(i=n=o.onload=o.onerror=o.onabort=o.ontimeout=o.onreadystatechange=null,"abort"===e?o.abort():"error"===e?"number"!=typeof o.status?a(0,"error"):a(o.status,o.statusText):a(Ht[o.status]||o.status,o.statusText,"text"!==(o.responseType||"text")||"string"!=typeof o.responseText?{binary:o.response}:{text:o.responseText},o.getAllResponseHeaders()))}},o.onload=i(),n=o.onerror=o.ontimeout=i("error"),void 0!==o.onabort?o.onabort=n:o.onreadystatechange=function(){4===o.readyState&&e.setTimeout((function(){i&&n()}))},i=i("abort");try{o.send(t.hasContent&&t.data||null)}catch(e){if(i)throw e}},abort:function(){i&&i()}}})),w.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),w.ajaxTransport("script",(function(e){var t,i;if(e.crossDomain||e.scriptAttrs)return{send:function(n,s){t=w("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",i=function(e){t.remove(),i=null,e&&s("error"===e.type?404:200,e.type)}),v.head.appendChild(t[0])},abort:function(){i&&i()}}}));var Bt,qt=[],Vt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=qt.pop()||w.expando+"_"+wt.guid++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",(function(t,i,n){var s,a,r,o=!1!==t.jsonp&&(Vt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(t.data)&&"data");if(o||"jsonp"===t.dataTypes[0])return s=t.jsonpCallback=f(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,o?t[o]=t[o].replace(Vt,"$1"+s):!1!==t.jsonp&&(t.url+=(xt.test(t.url)?"&":"?")+t.jsonp+"="+s),t.converters["script json"]=function(){return r||w.error(s+" was not called"),r[0]},t.dataTypes[0]="json",a=e[s],e[s]=function(){r=arguments},n.always((function(){void 0===a?w(e).removeProp(s):e[s]=a,t[s]&&(t.jsonpCallback=i.jsonpCallback,qt.push(s)),r&&f(a)&&a(r[0]),r=a=void 0})),"script"})),p.createHTMLDocument=((Bt=v.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Bt.childNodes.length),w.parseHTML=function(e,t,i){return"string"!=typeof e?[]:("boolean"==typeof t&&(i=t,t=!1),t||(p.createHTMLDocument?((n=(t=v.implementation.createHTMLDocument("")).createElement("base")).href=v.location.href,t.head.appendChild(n)):t=v),a=!i&&[],(s=D.exec(e))?[t.createElement(s[1])]:(s=be([e],t,a),a&&a.length&&w(a).remove(),w.merge([],s.childNodes)));var n,s,a},w.fn.load=function(e,t,i){var n,s,a,r=this,o=e.indexOf(" ");return o>-1&&(n=pt(e.slice(o)),e=e.slice(0,o)),f(t)?(i=t,t=void 0):t&&"object"==typeof t&&(s="POST"),r.length>0&&w.ajax({url:e,type:s||"GET",dataType:"html",data:t}).done((function(e){a=arguments,r.html(n?w("<div>").append(w.parseHTML(e)).find(n):e)})).always(i&&function(e,t){r.each((function(){i.apply(this,a||[e.responseText,t,e])}))}),this},w.expr.pseudos.animated=function(e){return w.grep(w.timers,(function(t){return e===t.elem})).length},w.offset={setOffset:function(e,t,i){var n,s,a,r,o,l,u=w.css(e,"position"),d=w(e),c={};"static"===u&&(e.style.position="relative"),o=d.offset(),a=w.css(e,"top"),l=w.css(e,"left"),("absolute"===u||"fixed"===u)&&(a+l).indexOf("auto")>-1?(r=(n=d.position()).top,s=n.left):(r=parseFloat(a)||0,s=parseFloat(l)||0),f(t)&&(t=t.call(e,i,w.extend({},o))),null!=t.top&&(c.top=t.top-o.top+r),null!=t.left&&(c.left=t.left-o.left+s),"using"in t?t.using.call(e,c):d.css(c)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){w.offset.setOffset(this,e,t)}));var t,i,n=this[0];return n?n.getClientRects().length?(t=n.getBoundingClientRect(),i=n.ownerDocument.defaultView,{top:t.top+i.pageYOffset,left:t.left+i.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,i,n=this[0],s={top:0,left:0};if("fixed"===w.css(n,"position"))t=n.getBoundingClientRect();else{for(t=this.offset(),i=n.ownerDocument,e=n.offsetParent||i.documentElement;e&&(e===i.body||e===i.documentElement)&&"static"===w.css(e,"position");)e=e.parentNode;e&&e!==n&&1===e.nodeType&&((s=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),s.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-s.top-w.css(n,"marginTop",!0),left:t.left-s.left-w.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent;e&&"static"===w.css(e,"position");)e=e.offsetParent;return e||ie}))}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var i="pageYOffset"===t;w.fn[e]=function(n){return R(this,(function(e,n,s){var a;if(m(e)?a=e:9===e.nodeType&&(a=e.defaultView),void 0===s)return a?a[t]:e[n];a?a.scrollTo(i?a.pageXOffset:s,i?s:a.pageYOffset):e[n]=s}),e,n,arguments.length)}})),w.each(["top","left"],(function(e,t){w.cssHooks[t]=Re(p.pixelPosition,(function(e,i){if(i)return i=He(e,t),ze.test(i)?w(e).position()[t]+"px":i}))})),w.each({Height:"height",Width:"width"},(function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},(function(i,n){w.fn[n]=function(s,a){var r=arguments.length&&(i||"boolean"!=typeof s),o=i||(!0===s||!0===a?"margin":"border");return R(this,(function(t,i,s){var a;return m(t)?0===n.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(a=t.documentElement,Math.max(t.body["scroll"+e],a["scroll"+e],t.body["offset"+e],a["offset"+e],a["client"+e])):void 0===s?w.css(t,i,o):w.style(t,i,s,o)}),t,r?s:void 0,r)}}))})),w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){w.fn[t]=function(e){return this.on(t,e)}})),w.fn.extend({bind:function(e,t,i){return this.on(e,null,t,i)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,i,n){return this.on(t,e,i,n)},undelegate:function(e,t,i){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){w.fn[t]=function(e,i){return arguments.length>0?this.on(t,null,e,i):this.trigger(t)}}));var Wt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.proxy=function(e,t){var i,n,a;if("string"==typeof t&&(i=e[t],t=e,e=i),f(e))return n=s.call(arguments,2),(a=function(){return e.apply(t||this,n.concat(s.call(arguments)))}).guid=e.guid=e.guid||w.guid++,a},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=k,w.isFunction=f,w.isWindow=m,w.camelCase=W,w.type=b,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},w.trim=function(e){return null==e?"":(e+"").replace(Wt,"")},"function"==typeof define&&define.amd&&define("jquery",[],(function(){return w}));var Gt=e.jQuery,Yt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Yt),t&&e.jQuery===w&&(e.jQuery=Gt),w},void 0===t&&(e.jQuery=e.$=w),w})),function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cleave=t():e.Cleave=t()}(this,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}return i.m=e,i.c=t,i.p="",i(0)}([function(e,t,i){(function(t){"use strict";var n=function(e,t){var i=!1;if("string"==typeof e?(this.element=document.querySelector(e),i=document.querySelectorAll(e).length>1):void 0!==e.length&&e.length>0?(this.element=e[0],i=e.length>1):this.element=e,!this.element)throw new Error("[cleave.js] Please check the element");if(i)try{console.warn("[cleave.js] Multiple input fields matched, cleave.js will only take the first one.")}catch(e){}t.initValue=this.element.value,this.properties=n.DefaultProperties.assign({},t),this.init()};n.prototype={init:function(){var e=this.properties;e.numeral||e.phone||e.creditCard||e.time||e.date||0!==e.blocksLength||e.prefix?(e.maxLength=n.Util.getMaxLength(e.blocks),this.isAndroid=n.Util.isAndroid(),this.lastInputValue="",this.isBackward="",this.onChangeListener=this.onChange.bind(this),this.onKeyDownListener=this.onKeyDown.bind(this),this.onFocusListener=this.onFocus.bind(this),this.onCutListener=this.onCut.bind(this),this.onCopyListener=this.onCopy.bind(this),this.initSwapHiddenInput(),this.element.addEventListener("input",this.onChangeListener),this.element.addEventListener("keydown",this.onKeyDownListener),this.element.addEventListener("focus",this.onFocusListener),this.element.addEventListener("cut",this.onCutListener),this.element.addEventListener("copy",this.onCopyListener),this.initPhoneFormatter(),this.initDateFormatter(),this.initTimeFormatter(),this.initNumeralFormatter(),(e.initValue||e.prefix&&!e.noImmediatePrefix)&&this.onInput(e.initValue)):this.onInput(e.initValue)},initSwapHiddenInput:function(){if(this.properties.swapHiddenInput){var e=this.element.cloneNode(!0);this.element.parentNode.insertBefore(e,this.element),this.elementSwapHidden=this.element,this.elementSwapHidden.type="hidden",this.element=e,this.element.id=""}},initNumeralFormatter:function(){var e=this.properties;e.numeral&&(e.numeralFormatter=new n.NumeralFormatter(e.numeralDecimalMark,e.numeralIntegerScale,e.numeralDecimalScale,e.numeralThousandsGroupStyle,e.numeralPositiveOnly,e.stripLeadingZeroes,e.prefix,e.signBeforePrefix,e.tailPrefix,e.delimiter))},initTimeFormatter:function(){var e=this.properties;e.time&&(e.timeFormatter=new n.TimeFormatter(e.timePattern,e.timeFormat),e.blocks=e.timeFormatter.getBlocks(),e.blocksLength=e.blocks.length,e.maxLength=n.Util.getMaxLength(e.blocks))},initDateFormatter:function(){var e=this.properties;e.date&&(e.dateFormatter=new n.DateFormatter(e.datePattern,e.dateMin,e.dateMax),e.blocks=e.dateFormatter.getBlocks(),e.blocksLength=e.blocks.length,e.maxLength=n.Util.getMaxLength(e.blocks))},initPhoneFormatter:function(){var e=this.properties;if(e.phone)try{e.phoneFormatter=new n.PhoneFormatter(new e.root.Cleave.AsYouTypeFormatter(e.phoneRegionCode),e.delimiter)}catch(e){throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")}},onKeyDown:function(e){var t=e.which||e.keyCode;this.lastInputValue=this.element.value,this.isBackward=8===t},onChange:function(e){var t=this.properties,i=n.Util;this.isBackward=this.isBackward||"deleteContentBackward"===e.inputType;var s=i.getPostDelimiter(this.lastInputValue,t.delimiter,t.delimiters);this.isBackward&&s?t.postDelimiterBackspace=s:t.postDelimiterBackspace=!1,this.onInput(this.element.value)},onFocus:function(){var e=this.properties;this.lastInputValue=this.element.value,e.prefix&&e.noImmediatePrefix&&!this.element.value&&this.onInput(e.prefix),n.Util.fixPrefixCursor(this.element,e.prefix,e.delimiter,e.delimiters)},onCut:function(e){n.Util.checkFullSelection(this.element.value)&&(this.copyClipboardData(e),this.onInput(""))},onCopy:function(e){n.Util.checkFullSelection(this.element.value)&&this.copyClipboardData(e)},copyClipboardData:function(e){var t=this.properties,i=n.Util,s=this.element.value,a="";a=t.copyDelimiter?s:i.stripDelimiters(s,t.delimiter,t.delimiters);try{e.clipboardData?e.clipboardData.setData("Text",a):window.clipboardData.setData("Text",a),e.preventDefault()}catch(e){}},onInput:function(e){var t=this.properties,i=n.Util,s=i.getPostDelimiter(e,t.delimiter,t.delimiters);return t.numeral||!t.postDelimiterBackspace||s||(e=i.headStr(e,e.length-t.postDelimiterBackspace.length)),t.phone?(!t.prefix||t.noImmediatePrefix&&!e.length?t.result=t.phoneFormatter.format(e):t.result=t.prefix+t.phoneFormatter.format(e).slice(t.prefix.length),void this.updateValueState()):t.numeral?(t.prefix&&t.noImmediatePrefix&&0===e.length?t.result="":t.result=t.numeralFormatter.format(e),void this.updateValueState()):(t.date&&(e=t.dateFormatter.getValidatedDate(e)),t.time&&(e=t.timeFormatter.getValidatedTime(e)),e=i.stripDelimiters(e,t.delimiter,t.delimiters),e=i.getPrefixStrippedValue(e,t.prefix,t.prefixLength,t.result,t.delimiter,t.delimiters,t.noImmediatePrefix,t.tailPrefix,t.signBeforePrefix),e=t.numericOnly?i.strip(e,/[^\d]/g):e,e=t.uppercase?e.toUpperCase():e,e=t.lowercase?e.toLowerCase():e,t.prefix&&(t.tailPrefix?e+=t.prefix:e=t.prefix+e,0===t.blocksLength)?(t.result=e,void this.updateValueState()):(t.creditCard&&this.updateCreditCardPropsByValue(e),e=i.headStr(e,t.maxLength),t.result=i.getFormattedValue(e,t.blocks,t.blocksLength,t.delimiter,t.delimiters,t.delimiterLazyShow),void this.updateValueState()))},updateCreditCardPropsByValue:function(e){var t,i=this.properties,s=n.Util;s.headStr(i.result,4)!==s.headStr(e,4)&&(t=n.CreditCardDetector.getInfo(e,i.creditCardStrictMode),i.blocks=t.blocks,i.blocksLength=i.blocks.length,i.maxLength=s.getMaxLength(i.blocks),i.creditCardType!==t.type&&(i.creditCardType=t.type,i.onCreditCardTypeChanged.call(this,i.creditCardType)))},updateValueState:function(){var e=this,t=n.Util,i=e.properties;if(e.element){var s=e.element.selectionEnd,a=e.element.value,r=i.result;s=t.getNextCursorPosition(s,a,r,i.delimiter,i.delimiters),e.isAndroid?window.setTimeout((function(){e.element.value=r,t.setSelection(e.element,s,i.document,!1),e.callOnValueChanged()}),1):(e.element.value=r,i.swapHiddenInput&&(e.elementSwapHidden.value=e.getRawValue()),t.setSelection(e.element,s,i.document,!1),e.callOnValueChanged())}},callOnValueChanged:function(){var e=this.properties;e.onValueChanged.call(this,{target:{name:this.element.name,value:e.result,rawValue:this.getRawValue()}})},setPhoneRegionCode:function(e){this.properties.phoneRegionCode=e,this.initPhoneFormatter(),this.onChange()},setRawValue:function(e){var t=this.properties;e=null!=e?e.toString():"",t.numeral&&(e=e.replace(".",t.numeralDecimalMark)),t.postDelimiterBackspace=!1,this.element.value=e,this.onInput(e)},getRawValue:function(){var e=this.properties,t=n.Util,i=this.element.value;return e.rawValueTrimPrefix&&(i=t.getPrefixStrippedValue(i,e.prefix,e.prefixLength,e.result,e.delimiter,e.delimiters,e.noImmediatePrefix,e.tailPrefix,e.signBeforePrefix)),i=e.numeral?e.numeralFormatter.getRawValue(i):t.stripDelimiters(i,e.delimiter,e.delimiters)},getISOFormatDate:function(){var e=this.properties;return e.date?e.dateFormatter.getISOFormatDate():""},getISOFormatTime:function(){var e=this.properties;return e.time?e.timeFormatter.getISOFormatTime():""},getFormattedValue:function(){return this.element.value},destroy:function(){this.element.removeEventListener("input",this.onChangeListener),this.element.removeEventListener("keydown",this.onKeyDownListener),this.element.removeEventListener("focus",this.onFocusListener),this.element.removeEventListener("cut",this.onCutListener),this.element.removeEventListener("copy",this.onCopyListener)},toString:function(){return"[Cleave Object]"}},n.NumeralFormatter=i(1),n.DateFormatter=i(2),n.TimeFormatter=i(3),n.PhoneFormatter=i(4),n.CreditCardDetector=i(5),n.Util=i(6),n.DefaultProperties=i(7),("object"==typeof t&&t?t:window).Cleave=n,e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";var i=function(e,t,n,s,a,r,o,l,u,d){this.numeralDecimalMark=e||".",this.numeralIntegerScale=t>0?t:0,this.numeralDecimalScale=n>=0?n:2,this.numeralThousandsGroupStyle=s||i.groupStyle.thousand,this.numeralPositiveOnly=!!a,this.stripLeadingZeroes=!1!==r,this.prefix=o||""===o?o:"",this.signBeforePrefix=!!l,this.tailPrefix=!!u,this.delimiter=d||""===d?d:",",this.delimiterRE=d?new RegExp("\\"+d,"g"):""};i.groupStyle={thousand:"thousand",lakh:"lakh",wan:"wan",none:"none"},i.prototype={getRawValue:function(e){return e.replace(this.delimiterRE,"").replace(this.numeralDecimalMark,".")},format:function(e){var t,n,s,a,r="";switch(e=e.replace(/[A-Za-z]/g,"").replace(this.numeralDecimalMark,"M").replace(/[^\dM-]/g,"").replace(/^\-/,"N").replace(/\-/g,"").replace("N",this.numeralPositiveOnly?"":"-").replace("M",this.numeralDecimalMark),this.stripLeadingZeroes&&(e=e.replace(/^(-)?0+(?=\d)/,"$1")),n="-"===e.slice(0,1)?"-":"",s=void 0!==this.prefix?this.signBeforePrefix?n+this.prefix:this.prefix+n:n,a=e,e.indexOf(this.numeralDecimalMark)>=0&&(a=(t=e.split(this.numeralDecimalMark))[0],r=this.numeralDecimalMark+t[1].slice(0,this.numeralDecimalScale)),"-"===n&&(a=a.slice(1)),this.numeralIntegerScale>0&&(a=a.slice(0,this.numeralIntegerScale)),this.numeralThousandsGroupStyle){case i.groupStyle.lakh:a=a.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+this.delimiter);break;case i.groupStyle.wan:a=a.replace(/(\d)(?=(\d{4})+$)/g,"$1"+this.delimiter);break;case i.groupStyle.thousand:a=a.replace(/(\d)(?=(\d{3})+$)/g,"$1"+this.delimiter)}return this.tailPrefix?n+a.toString()+(this.numeralDecimalScale>0?r.toString():"")+this.prefix:s+a.toString()+(this.numeralDecimalScale>0?r.toString():"")}},e.exports=i},function(e,t){"use strict";var i=function(e,t,i){this.date=[],this.blocks=[],this.datePattern=e,this.dateMin=t.split("-").reverse().map((function(e){return parseInt(e,10)})),2===this.dateMin.length&&this.dateMin.unshift(0),this.dateMax=i.split("-").reverse().map((function(e){return parseInt(e,10)})),2===this.dateMax.length&&this.dateMax.unshift(0),this.initBlocks()};i.prototype={initBlocks:function(){var e=this;e.datePattern.forEach((function(t){"Y"===t?e.blocks.push(4):e.blocks.push(2)}))},getISOFormatDate:function(){var e=this.date;return e[2]?e[2]+"-"+this.addLeadingZero(e[1])+"-"+this.addLeadingZero(e[0]):""},getBlocks:function(){return this.blocks},getValidatedDate:function(e){var t=this,i="";return e=e.replace(/[^\d]/g,""),t.blocks.forEach((function(n,s){if(e.length>0){var a=e.slice(0,n),r=a.slice(0,1),o=e.slice(n);switch(t.datePattern[s]){case"d":"00"===a?a="01":parseInt(r,10)>3?a="0"+r:parseInt(a,10)>31&&(a="31");break;case"m":"00"===a?a="01":parseInt(r,10)>1?a="0"+r:parseInt(a,10)>12&&(a="12")}i+=a,e=o}})),this.getFixedDateString(i)},getFixedDateString:function(e){var t,i,n,s=this,a=s.datePattern,r=[],o=0,l=0,u=0,d=0,c=0,h=0,p=!1;return 4===e.length&&"y"!==a[0].toLowerCase()&&"y"!==a[1].toLowerCase()&&(c=2-(d="d"===a[0]?0:2),t=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(c,c+2),10),r=this.getFixedDate(t,i,0)),8===e.length&&(a.forEach((function(e,t){switch(e){case"d":o=t;break;case"m":l=t;break;default:u=t}})),h=2*u,d=o<=u?2*o:2*o+2,c=l<=u?2*l:2*l+2,t=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(c,c+2),10),n=parseInt(e.slice(h,h+4),10),p=4===e.slice(h,h+4).length,r=this.getFixedDate(t,i,n)),4!==e.length||"y"!==a[0]&&"y"!==a[1]||(h=2-(c="m"===a[0]?0:2),i=parseInt(e.slice(c,c+2),10),n=parseInt(e.slice(h,h+2),10),p=2===e.slice(h,h+2).length,r=[0,i,n]),6!==e.length||"Y"!==a[0]&&"Y"!==a[1]||(h=2-.5*(c="m"===a[0]?0:4),i=parseInt(e.slice(c,c+2),10),n=parseInt(e.slice(h,h+4),10),p=4===e.slice(h,h+4).length,r=[0,i,n]),r=s.getRangeFixedDate(r),s.date=r,0===r.length?e:a.reduce((function(e,t){switch(t){case"d":return e+(0===r[0]?"":s.addLeadingZero(r[0]));case"m":return e+(0===r[1]?"":s.addLeadingZero(r[1]));case"y":return e+(p?s.addLeadingZeroForYear(r[2],!1):"");case"Y":return e+(p?s.addLeadingZeroForYear(r[2],!0):"")}}),"")},getRangeFixedDate:function(e){var t=this.datePattern,i=this.dateMin||[],n=this.dateMax||[];return!e.length||i.length<3&&n.length<3||t.find((function(e){return"y"===e.toLowerCase()}))&&0===e[2]?e:n.length&&(n[2]<e[2]||n[2]===e[2]&&(n[1]<e[1]||n[1]===e[1]&&n[0]<e[0]))?n:i.length&&(i[2]>e[2]||i[2]===e[2]&&(i[1]>e[1]||i[1]===e[1]&&i[0]>e[0]))?i:e},getFixedDate:function(e,t,i){return e=Math.min(e,31),t=Math.min(t,12),i=parseInt(i||0,10),(t<7&&t%2==0||t>8&&t%2==1)&&(e=Math.min(e,2===t?this.isLeapYear(i)?29:28:30)),[e,t,i]},isLeapYear:function(e){return e%4==0&&e%100!=0||e%400==0},addLeadingZero:function(e){return(e<10?"0":"")+e},addLeadingZeroForYear:function(e,t){return t?(e<10?"000":e<100?"00":e<1e3?"0":"")+e:(e<10?"0":"")+e}},e.exports=i},function(e,t){"use strict";var i=function(e,t){this.time=[],this.blocks=[],this.timePattern=e,this.timeFormat=t,this.initBlocks()};i.prototype={initBlocks:function(){var e=this;e.timePattern.forEach((function(){e.blocks.push(2)}))},getISOFormatTime:function(){var e=this.time;return e[2]?this.addLeadingZero(e[0])+":"+this.addLeadingZero(e[1])+":"+this.addLeadingZero(e[2]):""},getBlocks:function(){return this.blocks},getTimeFormatOptions:function(){return"12"===String(this.timeFormat)?{maxHourFirstDigit:1,maxHours:12,maxMinutesFirstDigit:5,maxMinutes:60}:{maxHourFirstDigit:2,maxHours:23,maxMinutesFirstDigit:5,maxMinutes:60}},getValidatedTime:function(e){var t=this,i="";e=e.replace(/[^\d]/g,"");var n=t.getTimeFormatOptions();return t.blocks.forEach((function(s,a){if(e.length>0){var r=e.slice(0,s),o=r.slice(0,1),l=e.slice(s);switch(t.timePattern[a]){case"h":parseInt(o,10)>n.maxHourFirstDigit?r="0"+o:parseInt(r,10)>n.maxHours&&(r=n.maxHours+"");break;case"m":case"s":parseInt(o,10)>n.maxMinutesFirstDigit?r="0"+o:parseInt(r,10)>n.maxMinutes&&(r=n.maxMinutes+"")}i+=r,e=l}})),this.getFixedTimeString(i)},getFixedTimeString:function(e){var t,i,n,s=this,a=s.timePattern,r=[],o=0,l=0,u=0,d=0,c=0,h=0;return 6===e.length&&(a.forEach((function(e,t){switch(e){case"s":o=2*t;break;case"m":l=2*t;break;case"h":u=2*t}})),h=u,c=l,d=o,t=parseInt(e.slice(d,d+2),10),i=parseInt(e.slice(c,c+2),10),n=parseInt(e.slice(h,h+2),10),r=this.getFixedTime(n,i,t)),4===e.length&&s.timePattern.indexOf("s")<0&&(a.forEach((function(e,t){switch(e){case"m":l=2*t;break;case"h":u=2*t}})),h=u,c=l,t=0,i=parseInt(e.slice(c,c+2),10),n=parseInt(e.slice(h,h+2),10),r=this.getFixedTime(n,i,t)),s.time=r,0===r.length?e:a.reduce((function(e,t){switch(t){case"s":return e+s.addLeadingZero(r[2]);case"m":return e+s.addLeadingZero(r[1]);case"h":return e+s.addLeadingZero(r[0])}}),"")},getFixedTime:function(e,t,i){return i=Math.min(parseInt(i||0,10),60),t=Math.min(t,60),[e=Math.min(e,60),t,i]},addLeadingZero:function(e){return(e<10?"0":"")+e}},e.exports=i},function(e,t){"use strict";var i=function(e,t){this.delimiter=t||""===t?t:" ",this.delimiterRE=t?new RegExp("\\"+t,"g"):"",this.formatter=e};i.prototype={setFormatter:function(e){this.formatter=e},format:function(e){this.formatter.clear();for(var t,i="",n=!1,s=0,a=(e=(e=(e=e.replace(/[^\d+]/g,"")).replace(/^\+/,"B").replace(/\+/g,"").replace("B","+")).replace(this.delimiterRE,"")).length;s<a;s++)t=this.formatter.inputDigit(e.charAt(s)),/[\s()-]/g.test(t)?(i=t,n=!0):n||(i=t);return i=(i=i.replace(/[()]/g,"")).replace(/[\s-]/g,this.delimiter)}},e.exports=i},function(e,t){"use strict";var i={blocks:{uatp:[4,5,6],amex:[4,6,5],diners:[4,6,4],discover:[4,4,4,4],mastercard:[4,4,4,4],dankort:[4,4,4,4],instapayment:[4,4,4,4],jcb15:[4,6,5],jcb:[4,4,4,4],maestro:[4,4,4,4],visa:[4,4,4,4],mir:[4,4,4,4],unionPay:[4,4,4,4],general:[4,4,4,4]},re:{uatp:/^(?!1800)1\d{0,14}/,amex:/^3[47]\d{0,13}/,discover:/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,diners:/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,mastercard:/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,dankort:/^(5019|4175|4571)\d{0,12}/,instapayment:/^63[7-9]\d{0,13}/,jcb15:/^(?:2131|1800)\d{0,11}/,jcb:/^(?:35\d{0,2})\d{0,12}/,maestro:/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,mir:/^220[0-4]\d{0,12}/,visa:/^4\d{0,15}/,unionPay:/^(62|81)\d{0,14}/},getStrictBlocks:function(e){var t=e.reduce((function(e,t){return e+t}),0);return e.concat(19-t)},getInfo:function(e,t){var n=i.blocks,s=i.re;for(var a in t=!!t,s)if(s[a].test(e)){var r=n[a];return{type:a,blocks:t?this.getStrictBlocks(r):r}}return{type:"unknown",blocks:t?this.getStrictBlocks(n.general):n.general}}};e.exports=i},function(e,t){"use strict";var i={noop:function(){},strip:function(e,t){return e.replace(t,"")},getPostDelimiter:function(e,t,i){if(0===i.length)return e.slice(-t.length)===t?t:"";var n="";return i.forEach((function(t){e.slice(-t.length)===t&&(n=t)})),n},getDelimiterREByDelimiter:function(e){return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),"g")},getNextCursorPosition:function(e,t,i,n,s){return t.length===e?i.length:e+this.getPositionOffset(e,t,i,n,s)},getPositionOffset:function(e,t,i,n,s){var a,r,o;return a=this.stripDelimiters(t.slice(0,e),n,s),r=this.stripDelimiters(i.slice(0,e),n,s),0!==(o=a.length-r.length)?o/Math.abs(o):0},stripDelimiters:function(e,t,i){var n=this;if(0===i.length){var s=t?n.getDelimiterREByDelimiter(t):"";return e.replace(s,"")}return i.forEach((function(t){t.split("").forEach((function(t){e=e.replace(n.getDelimiterREByDelimiter(t),"")}))})),e},headStr:function(e,t){return e.slice(0,t)},getMaxLength:function(e){return e.reduce((function(e,t){return e+t}),0)},getPrefixStrippedValue:function(e,t,i,n,s,a,r,o,l){if(0===i)return e;if(e===t&&""!==e)return"";if(l&&"-"==e.slice(0,1)){var u="-"==n.slice(0,1)?n.slice(1):n;return"-"+this.getPrefixStrippedValue(e.slice(1),t,i,u,s,a,r,o,l)}if(n.slice(0,i)!==t&&!o)return r&&!n&&e?e:"";if(n.slice(-i)!==t&&o)return r&&!n&&e?e:"";var d=this.stripDelimiters(n,s,a);return e.slice(0,i)===t||o?e.slice(-i)!==t&&o?d.slice(0,-i-1):o?e.slice(0,-i):e.slice(i):d.slice(i)},getFirstDiffIndex:function(e,t){for(var i=0;e.charAt(i)===t.charAt(i);)if(""===e.charAt(i++))return-1;return i},getFormattedValue:function(e,t,i,n,s,a){var r="",o=s.length>0,l="";return 0===i?e:(t.forEach((function(t,u){if(e.length>0){var d=e.slice(0,t),c=e.slice(t);l=o?s[a?u-1:u]||l:n,a?(u>0&&(r+=l),r+=d):(r+=d,d.length===t&&u<i-1&&(r+=l)),e=c}})),r)},fixPrefixCursor:function(e,t,i,n){if(e){var s=e.value,a=i||n[0]||" ";if(e.setSelectionRange&&t&&!(t.length+a.length<=s.length)){var r=2*s.length;setTimeout((function(){e.setSelectionRange(r,r)}),1)}}},checkFullSelection:function(e){try{return(window.getSelection()||document.getSelection()||{}).toString().length===e.length}catch(e){}return!1},setSelection:function(e,t,i){if(e===this.getActiveElement(i)&&!(e&&e.value.length<=t))if(e.createTextRange){var n=e.createTextRange();n.move("character",t),n.select()}else try{e.setSelectionRange(t,t)}catch(e){console.warn("The input element type does not support selection")}},getActiveElement:function(e){var t=e.activeElement;return t&&t.shadowRoot?this.getActiveElement(t.shadowRoot):t},isAndroid:function(){return navigator&&/android/i.test(navigator.userAgent)},isAndroidBackspaceKeydown:function(e,t){return!!(this.isAndroid()&&e&&t)&&t===e.slice(0,-1)}};e.exports=i},function(e,t){(function(t){"use strict";var i={assign:function(e,i){return i=i||{},(e=e||{}).creditCard=!!i.creditCard,e.creditCardStrictMode=!!i.creditCardStrictMode,e.creditCardType="",e.onCreditCardTypeChanged=i.onCreditCardTypeChanged||function(){},e.phone=!!i.phone,e.phoneRegionCode=i.phoneRegionCode||"AU",e.phoneFormatter={},e.time=!!i.time,e.timePattern=i.timePattern||["h","m","s"],e.timeFormat=i.timeFormat||"24",e.timeFormatter={},e.date=!!i.date,e.datePattern=i.datePattern||["d","m","Y"],e.dateMin=i.dateMin||"",e.dateMax=i.dateMax||"",e.dateFormatter={},e.numeral=!!i.numeral,e.numeralIntegerScale=i.numeralIntegerScale>0?i.numeralIntegerScale:0,e.numeralDecimalScale=i.numeralDecimalScale>=0?i.numeralDecimalScale:2,e.numeralDecimalMark=i.numeralDecimalMark||".",e.numeralThousandsGroupStyle=i.numeralThousandsGroupStyle||"thousand",e.numeralPositiveOnly=!!i.numeralPositiveOnly,e.stripLeadingZeroes=!1!==i.stripLeadingZeroes,e.signBeforePrefix=!!i.signBeforePrefix,e.tailPrefix=!!i.tailPrefix,e.swapHiddenInput=!!i.swapHiddenInput,e.numericOnly=e.creditCard||e.date||!!i.numericOnly,e.uppercase=!!i.uppercase,e.lowercase=!!i.lowercase,e.prefix=e.creditCard||e.date?"":i.prefix||"",e.noImmediatePrefix=!!i.noImmediatePrefix,e.prefixLength=e.prefix.length,e.rawValueTrimPrefix=!!i.rawValueTrimPrefix,e.copyDelimiter=!!i.copyDelimiter,e.initValue=void 0!==i.initValue&&null!==i.initValue?i.initValue.toString():"",e.delimiter=i.delimiter||""===i.delimiter?i.delimiter:i.date?"/":i.time?":":i.numeral?",":(i.phone," "),e.delimiterLength=e.delimiter.length,e.delimiterLazyShow=!!i.delimiterLazyShow,e.delimiters=i.delimiters||[],e.blocks=i.blocks||[],e.blocksLength=e.blocks.length,e.root="object"==typeof t&&t?t:window,e.document=i.document||e.root.document,e.maxLength=0,e.backspace=!1,e.result="",e.onValueChanged=i.onValueChanged||function(){},e}};e.exports=i}).call(t,function(){return this}())}])})),function(){function e(e,t){var i,n=e.split("."),s=j;n[0]in s||!s.execScript||s.execScript("var "+n[0]);for(;n.length&&(i=n.shift());)n.length||void 0===t?s=s[i]?s[i]:s[i]={}:s[i]=t}function t(e,t){function i(){}i.prototype=t.prototype,e.M=t.prototype,e.prototype=new i,e.prototype.constructor=e,e.N=function(e,i,n){for(var s=Array(arguments.length-2),a=2;a<arguments.length;a++)s[a-2]=arguments[a];return t.prototype[i].apply(e,s)}}function i(e,t){null!=e&&this.a.apply(this,arguments)}function n(e){e.b=""}function s(e,t){return e>t?1:e<t?-1:0}function a(e,t){this.b=e,this.a={};for(var i=0;i<t.length;i++){var n=t[i];this.a[n.b]=n}}function r(e){return function(e,t){e.sort(t||s)}(e=function(e){var t,i=[],n=0;for(t in e)i[n++]=e[t];return i}(e.a),(function(e,t){return e.b-t.b})),e}function o(e,t){switch(this.b=e,this.g=!!t.v,this.a=t.c,this.i=t.type,this.h=!1,this.a){case R:case B:case q:case V:case W:case H:case F:this.h=!0}this.f=t.defaultValue}function l(){this.a={},this.f=this.j().a,this.b=this.g=null}function u(e,t){var i=e.a[t];if(null==i)return null;if(e.g){if(!(t in e.b)){var n=e.g,s=e.f[t];if(null!=i)if(s.g){for(var a=[],r=0;r<i.length;r++)a[r]=n.b(s,i[r]);i=a}else i=n.b(s,i);return e.b[t]=i}return e.b[t]}return i}function d(e,t,i){var n=u(e,t);return e.f[t].g?n[i||0]:n}function c(e,t){var i;if(null!=e.a[t])i=d(e,t,void 0);else e:{if(void 0===(i=e.f[t]).f){var n=i.i;if(n===Boolean)i.f=!1;else if(n===Number)i.f=0;else{if(n!==String){i=new n;break e}i.f=i.h?"0":""}}i=i.f}return i}function h(e,t){return e.f[t].g?null!=e.a[t]?e.a[t].length:0:null!=e.a[t]?1:0}function p(e,t,i){e.a[t]=i,e.b&&(e.b[t]=i)}function f(e,t){var i,n=[];for(i in t)0!=i&&n.push(new o(i,t[i]));return new a(e,n)}function m(){l.call(this)}function v(){l.call(this)}function g(){l.call(this)}function y(){}function b(){}function w(){}function x(){this.a={}}function C(e){return 0==e.length||te.test(e)}function T(e,t){if(null==t)return null;t=t.toUpperCase();var i=e.a[t];if(null==i){if(null==(i=Z[t]))return null;i=(new w).a(g.j(),i),e.a[t]=i}return i}function S(e){return null==(e=K[e])?"ZZ":e[0]}function E(e){this.H=RegExp(" "),this.C="",this.m=new i,this.w="",this.i=new i,this.u=new i,this.l=!0,this.A=this.o=this.F=!1,this.G=x.b(),this.s=0,this.b=new i,this.B=!1,this.h="",this.a=new i,this.f=[],this.D=e,this.J=this.g=k(this,this.D)}function k(e,t){var i;if(null!=t&&isNaN(t)&&t.toUpperCase()in Z){if(null==(i=T(e.G,t)))throw Error("Invalid region code: "+t);i=c(i,10)}else i=0;return null!=(i=T(e.G,S(i)))?i:ie}function D(e){for(var t=e.f.length,i=0;i<t;++i){var s,a=e.f[i],r=c(a,1);if(e.w==r)return!1;s=e;var o=c(u=a,1);if(-1!=o.indexOf("|"))s=!1;else{var l;o=(o=o.replace(ne,"\\d")).replace(se,"\\d"),n(s.m),l=s;var u=c(u,2),h="999999999999999".match(o)[0];h.length<l.a.b.length?l="":l=(l=h.replace(new RegExp(o,"g"),u)).replace(RegExp("9","g")," "),0<l.length?(s.m.a(l),s=!0):s=!1}if(s)return e.w=r,e.B=re.test(d(a,4)),e.s=0,!0}return e.l=!1}function M(e,t){for(var i=[],n=t.length-3,s=e.f.length,a=0;a<s;++a){var r=e.f[a];0==h(r,3)?i.push(e.f[a]):(r=d(r,3,Math.min(n,h(r,3)-1)),0==t.search(r)&&i.push(e.f[a]))}e.f=i}function _(e){return e.l=!0,e.A=!1,e.f=[],e.s=0,n(e.m),e.w="",L(e)}function $(e){for(var t=e.a.toString(),i=e.f.length,n=0;n<i;++n){var s=e.f[n],a=c(s,1);if(new RegExp("^(?:"+a+")$").test(t))return e.B=re.test(d(s,4)),P(e,t=t.replace(new RegExp(a,"g"),d(s,2)))}return""}function P(e,t){var i=e.b.b.length;return e.B&&0<i&&" "!=e.b.toString().charAt(i-1)?e.b+" "+t:e.b+t}function L(e){var t=e.a.toString();if(3<=t.length){for(var i=e.o&&0==e.h.length&&0<h(e.g,20)?u(e.g,20)||[]:u(e.g,19)||[],n=i.length,s=0;s<n;++s){var a=i[s];0<e.h.length&&C(c(a,4))&&!d(a,6)&&null==a.a[5]||(0!=e.h.length||e.o||C(c(a,4))||d(a,6))&&ae.test(c(a,2))&&e.f.push(a)}return M(e,t),0<(t=$(e)).length?t:D(e)?A(e):e.i.toString()}return P(e,t)}function A(e){var t=e.a.toString(),i=t.length;if(0<i){for(var n="",s=0;s<i;s++)n=N(e,t.charAt(s));return e.l?P(e,n):e.i.toString()}return e.b.toString()}function O(e){var t,i=e.a.toString(),s=0;return 1!=d(e.g,10)?t=!1:t="1"==(t=e.a.toString()).charAt(0)&&"0"!=t.charAt(1)&&"1"!=t.charAt(1),t?(s=1,e.b.a("1").a(" "),e.o=!0):null!=e.g.a[15]&&(t=new RegExp("^(?:"+d(e.g,15)+")"),null!=(t=i.match(t))&&null!=t[0]&&0<t[0].length&&(e.o=!0,s=t[0].length,e.b.a(i.substring(0,s)))),n(e.a),e.a.a(i.substring(s)),i.substring(0,s)}function I(e){var t=e.u.toString(),i=new RegExp("^(?:\\+|"+d(e.g,11)+")");return null!=(i=t.match(i))&&null!=i[0]&&0<i[0].length&&(e.o=!0,i=i[0].length,n(e.a),e.a.a(t.substring(i)),n(e.b),e.b.a(t.substring(0,i)),"+"!=t.charAt(0)&&e.b.a(" "),!0)}function z(e){if(0==e.a.b.length)return!1;var t,s=new i;e:{if(0!=(t=e.a.toString()).length&&"0"!=t.charAt(0))for(var a,r=t.length,o=1;3>=o&&o<=r;++o)if((a=parseInt(t.substring(0,o),10))in K){s.a(t.substring(o)),t=a;break e}t=0}return 0!=t&&(n(e.a),e.a.a(s.toString()),"001"==(s=S(t))?e.g=T(e.G,""+t):s!=e.D&&(e.g=k(e,s)),e.b.a(""+t).a(" "),e.h="",!0)}function N(e,t){if(0<=(s=e.m.toString()).substring(e.s).search(e.H)){var i=s.search(e.H),s=s.replace(e.H,t);return n(e.m),e.m.a(s),e.s=i,s.substring(0,e.s+1)}return 1==e.f.length&&(e.l=!1),e.w="",e.i.toString()}var j=this;i.prototype.b="",i.prototype.set=function(e){this.b=""+e},i.prototype.a=function(e,t,i){if(this.b+=String(e),null!=t)for(var n=1;n<arguments.length;n++)this.b+=arguments[n];return this},i.prototype.toString=function(){return this.b};var F=1,H=2,R=3,B=4,q=6,V=16,W=18;l.prototype.set=function(e,t){p(this,e.b,t)},l.prototype.clone=function(){var e=new this.constructor;return e!=this&&(e.a={},e.b&&(e.b={}),function e(t,i){for(var n=r(t.j()),s=0;s<n.length;s++){var a=(l=n[s]).b;if(null!=i.a[a]){t.b&&delete t.b[l.b];var o=11==l.a||10==l.a;if(l.g)for(var l=u(i,a)||[],d=0;d<l.length;d++){var c=t,h=a,f=o?l[d].clone():l[d];c.a[h]||(c.a[h]=[]),c.a[h].push(f),c.b&&delete c.b[h]}else l=u(i,a),o?(o=u(t,a))?e(o,l):p(t,a,l.clone()):p(t,a,l)}}}(e,this)),e},t(m,l);var G=null;t(v,l);var Y=null;t(g,l);var X=null;m.prototype.j=function(){var e=G;return e||(G=e=f(m,{0:{name:"NumberFormat",I:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",v:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}})),e},m.j=m.prototype.j,v.prototype.j=function(){var e=Y;return e||(Y=e=f(v,{0:{name:"PhoneNumberDesc",I:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},9:{name:"possible_length",v:!0,c:5,type:Number},10:{name:"possible_length_local_only",v:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String}})),e},v.j=v.prototype.j,g.prototype.j=function(){var e=X;return e||(X=e=f(g,{0:{name:"PhoneMetadata",I:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:v},2:{name:"fixed_line",c:11,type:v},3:{name:"mobile",c:11,type:v},4:{name:"toll_free",c:11,type:v},5:{name:"premium_rate",c:11,type:v},6:{name:"shared_cost",c:11,type:v},7:{name:"personal_number",c:11,type:v},8:{name:"voip",c:11,type:v},21:{name:"pager",c:11,type:v},25:{name:"uan",c:11,type:v},27:{name:"emergency",c:11,type:v},28:{name:"voicemail",c:11,type:v},29:{name:"short_code",c:11,type:v},30:{name:"standard_rate",c:11,type:v},31:{name:"carrier_specific",c:11,type:v},33:{name:"sms_services",c:11,type:v},24:{name:"no_international_dialling",c:11,type:v},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,type:Boolean},19:{name:"number_format",v:!0,c:11,type:m},20:{name:"intl_number_format",v:!0,c:11,type:m},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}})),e},g.j=g.prototype.j,y.prototype.a=function(e){throw new e.b,Error("Unimplemented")},y.prototype.b=function(e,t){if(11==e.a||10==e.a)return t instanceof l?t:this.a(e.i.prototype.j(),t);if(14==e.a){if("string"==typeof t&&U.test(t)){var i=Number(t);if(0<i)return i}return t}if(!e.h)return t;if((i=e.i)===String){if("number"==typeof t)return String(t)}else if(i===Number&&"string"==typeof t&&("Infinity"===t||"-Infinity"===t||"NaN"===t||U.test(t)))return Number(t);return t};var U=/^-?[0-9]+$/;t(b,y),b.prototype.a=function(e,t){var i=new e.b;return i.g=this,i.a=t,i.b={},i},t(w,b),w.prototype.b=function(e,t){return 8==e.a?!!t:y.prototype.b.apply(this,arguments)},w.prototype.a=function(e,t){return w.M.a.call(this,e,t)};var K={7:["RU","KZ"]},Z={KZ:[null,[null,null,"(?:33622|(?:7\\d|80)\\d{3})\\d{5}",null,null,null,null,null,null,[10]],[null,null,"(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}",null,null,null,"7123456789"],[null,null,"7(?:0[0-2578]|47|6[02-4]|7[15-8]|85)\\d{7}",null,null,null,"7710009998"],[null,null,"800\\d{7}",null,null,null,"8001234567"],[null,null,"809\\d{7}",null,null,null,"8091234567"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"808\\d{7}",null,null,null,"8081234567"],[null,null,"751\\d{7}",null,null,null,"7511234567"],"KZ",7,"810","8",null,null,"8",null,"8~10",null,null,null,[null,null,null,null,null,null,null,null,null,[-1]],null,"33|7",[null,null,"751\\d{7}"],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]],RU:[null,[null,null,"[347-9]\\d{9}",null,null,null,null,null,null,[10],[7]],[null,null,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",null,null,null,"3011234567",null,null,null,[7]],[null,null,"9\\d{9}",null,null,null,"9123456789"],[null,null,"80[04]\\d{7}",null,null,null,"8001234567"],[null,null,"80[39]\\d{7}",null,null,null,"8091234567"],[null,null,null,null,null,null,null,null,null,[-1]],[null,null,"808\\d{7}",null,null,null,"8081234567"],[null,null,null,null,null,null,null,null,null,[-1]],"RU",7,"810","8",null,null,"8",null,"8~10",null,[[null,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3"],[null,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",null,1],[null,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",null,1]],[[null,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",null,1],[null,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",null,1]],[null,null,null,null,null,null,null,null,null,[-1]],1,"3[04-689]|[489]",[null,null,null,null,null,null,null,null,null,[-1]],[null,null,null,null,null,null,null,null,null,[-1]],null,null,[null,null,null,null,null,null,null,null,null,[-1]]]};x.b=function(){return x.a?x.a:x.a=new x};var Q={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"},J=RegExp("[+＋]+"),ee=RegExp("([0-9０-９٠-٩۰-۹])"),te=/^\(?\$1\)?$/,ie=new g;p(ie,11,"NA");var ne=/\[([^\[\]])*\]/g,se=/\d(?=[^,}][^,}])/g,ae=RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*(\\$\\d[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]*)+$"),re=/[- ]/;E.prototype.K=function(){this.C="",n(this.i),n(this.u),n(this.m),this.s=0,this.w="",n(this.b),this.h="",n(this.a),this.l=!0,this.A=this.o=this.F=!1,this.f=[],this.B=!1,this.g!=this.J&&(this.g=k(this,this.D))},E.prototype.L=function(e){return this.C=function(e,t){e.i.a(t);var i,s=t;if(ee.test(s)||1==e.i.b.length&&J.test(s)?("+"==(s=t)?(i=s,e.u.a(s)):(i=Q[s],e.u.a(i),e.a.a(i)),t=i):(e.l=!1,e.F=!0),!e.l){if(!e.F)if(I(e)){if(z(e))return _(e)}else if(0<e.h.length&&(s=e.a.toString(),n(e.a),e.a.a(e.h),e.a.a(s),i=(s=e.b.toString()).lastIndexOf(e.h),n(e.b),e.b.a(s.substring(0,i))),e.h!=O(e))return e.b.a(" "),_(e);return e.i.toString()}switch(e.u.b.length){case 0:case 1:case 2:return e.i.toString();case 3:if(!I(e))return e.h=O(e),L(e);e.A=!0;default:return e.A?(z(e)&&(e.A=!1),e.b.toString()+e.a.toString()):0<e.f.length?(s=N(e,t),0<(i=$(e)).length?i:(M(e,e.a.toString()),D(e)?A(e):e.l?P(e,s):e.i.toString())):L(e)}}(this,e)},e("Cleave.AsYouTypeFormatter",E),e("Cleave.AsYouTypeFormatter.prototype.inputDigit",E.prototype.L),e("Cleave.AsYouTypeFormatter.prototype.clear",E.prototype.K)}.call("object"==typeof global&&global?global:window),function(e,t,i){var n,s,a,r,o,l,u;r=!1,o={classes:"",inline:!1,language:"ru",startDate:new Date,firstDay:"",weekends:[6,0],dateFormat:"",altField:"",altFieldDateFormat:"@",toggleSelected:!0,keyboardNav:!0,position:"bottom left",offset:12,view:"days",minView:"days",showOtherMonths:!0,selectOtherMonths:!0,moveToOtherMonthsOnSelect:!0,showOtherYears:!0,selectOtherYears:!0,moveToOtherYearsOnSelect:!0,minDate:"",maxDate:"",disableNavWhenOutOfRange:!0,multipleDates:!1,multipleDatesSeparator:",",range:!1,todayButton:!1,clearButton:!1,showEvent:"focus",autoClose:!1,monthsField:"monthsShort",prevHtml:'<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',nextHtml:'<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',navTitles:{days:"MM, <i>yyyy</i>",months:"yyyy",years:"yyyy1 - yyyy2"},timepicker:!1,onlyTimepicker:!1,dateTimeSeparator:" ",timeFormat:"",minHours:0,maxHours:24,minMinutes:0,maxMinutes:59,hoursStep:1,minutesStep:1,onSelect:"",onShow:"",onHide:"",onChangeMonth:"",onChangeYear:"",onChangeDecade:"",onChangeView:"",onRenderCell:""},l={ctrlRight:[17,39],ctrlUp:[17,38],ctrlLeft:[17,37],ctrlDown:[17,40],shiftRight:[16,39],shiftUp:[16,38],shiftLeft:[16,37],shiftDown:[16,40],altUp:[18,38],altRight:[18,39],altLeft:[18,37],altDown:[18,40],ctrlShiftUp:[16,17,38]},(a=u=function(e,i){this.el=e,this.$el=t(e),this.opts=t.extend(!0,{},o,i,this.$el.data()),null==n&&(n=t("body")),this.opts.startDate||(this.opts.startDate=new Date),"INPUT"==this.el.nodeName&&(this.elIsInput=!0),this.opts.altField&&(this.$altField="string"==typeof this.opts.altField?t(this.opts.altField):this.opts.altField),this.inited=!1,this.visible=!1,this.silent=!1,this.currentDate=this.opts.startDate,this.currentView=this.opts.view,this._createShortCuts(),this.selectedDates=[],this.views={},this.keys=[],this.minRange="",this.maxRange="",this._prevOnSelectValue="",this.init()}).prototype={VERSION:"2.2.3",viewIndexes:["days","months","years"],init:function(){r||this.opts.inline||!this.elIsInput||this._buildDatepickersContainer(),this._buildBaseHtml(),this._defineLocale(this.opts.language),this._syncWithMinMaxDates(),this.elIsInput&&(this.opts.inline||(this._setPositionClasses(this.opts.position),this._bindEvents()),this.opts.keyboardNav&&!this.opts.onlyTimepicker&&this._bindKeyboardEvents(),this.$datepicker.on("mousedown",this._onMouseDownDatepicker.bind(this)),this.$datepicker.on("mouseup",this._onMouseUpDatepicker.bind(this))),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.timepicker&&(this.timepicker=new t.fn.datepicker.Timepicker(this,this.opts),this._bindTimepickerEvents()),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.views[this.currentView]=new t.fn.datepicker.Body(this,this.currentView,this.opts),this.views[this.currentView].show(),this.nav=new t.fn.datepicker.Navigation(this,this.opts),this.view=this.currentView,this.$el.on("clickCell.adp",this._onClickCell.bind(this)),this.$datepicker.on("mouseenter",".datepicker--cell",this._onMouseEnterCell.bind(this)),this.$datepicker.on("mouseleave",".datepicker--cell",this._onMouseLeaveCell.bind(this)),this.inited=!0},_createShortCuts:function(){this.minDate=this.opts.minDate?this.opts.minDate:new Date(-86399999136e5),this.maxDate=this.opts.maxDate?this.opts.maxDate:new Date(86399999136e5)},_bindEvents:function(){this.$el.on(this.opts.showEvent+".adp",this._onShowEvent.bind(this)),this.$el.on("mouseup.adp",this._onMouseUpEl.bind(this)),this.$el.on("blur.adp",this._onBlur.bind(this)),this.$el.on("keyup.adp",this._onKeyUpGeneral.bind(this)),t(e).on("resize.adp",this._onResize.bind(this)),t("body").on("mouseup.adp",this._onMouseUpBody.bind(this))},_bindKeyboardEvents:function(){this.$el.on("keydown.adp",this._onKeyDown.bind(this)),this.$el.on("keyup.adp",this._onKeyUp.bind(this)),this.$el.on("hotKey.adp",this._onHotKey.bind(this))},_bindTimepickerEvents:function(){this.$el.on("timeChange.adp",this._onTimeChange.bind(this))},isWeekend:function(e){return-1!==this.opts.weekends.indexOf(e)},_defineLocale:function(e){"string"==typeof e?(this.loc=t.fn.datepicker.language[e],this.loc||(console.warn("Can't find language \""+e+'" in Datepicker.language, will use "ru" instead'),this.loc=t.extend(!0,{},t.fn.datepicker.language.ru)),this.loc=t.extend(!0,{},t.fn.datepicker.language.ru,t.fn.datepicker.language[e])):this.loc=t.extend(!0,{},t.fn.datepicker.language.ru,e),this.opts.dateFormat&&(this.loc.dateFormat=this.opts.dateFormat),this.opts.timeFormat&&(this.loc.timeFormat=this.opts.timeFormat),""!==this.opts.firstDay&&(this.loc.firstDay=this.opts.firstDay),this.opts.timepicker&&(this.loc.dateFormat=[this.loc.dateFormat,this.loc.timeFormat].join(this.opts.dateTimeSeparator)),this.opts.onlyTimepicker&&(this.loc.dateFormat=this.loc.timeFormat);var i=this._getWordBoundaryRegExp;(this.loc.timeFormat.match(i("aa"))||this.loc.timeFormat.match(i("AA")))&&(this.ampm=!0)},_buildDatepickersContainer:function(){r=!0,n.append('<div class="datepickers-container" id="datepickers-container"></div>'),s=t("#datepickers-container")},_buildBaseHtml:function(){var e,i=t('<div class="datepicker-inline">');e="INPUT"==this.el.nodeName?this.opts.inline?i.insertAfter(this.$el):s:i.appendTo(this.$el),this.$datepicker=t('<div class="datepicker"><i class="datepicker--pointer"></i><nav class="datepicker--nav"></nav><div class="datepicker--content"></div></div>').appendTo(e),this.$content=t(".datepicker--content",this.$datepicker),this.$nav=t(".datepicker--nav",this.$datepicker)},_triggerOnChange:function(){if(!this.selectedDates.length){if(""===this._prevOnSelectValue)return;return this._prevOnSelectValue="",this.opts.onSelect("","",this)}var e,t=this.selectedDates,i=a.getParsedDate(t[0]),n=this,s=new Date(i.year,i.month,i.date,i.hours,i.minutes);e=t.map((function(e){return n.formatDate(n.loc.dateFormat,e)})).join(this.opts.multipleDatesSeparator),(this.opts.multipleDates||this.opts.range)&&(s=t.map((function(e){var t=a.getParsedDate(e);return new Date(t.year,t.month,t.date,t.hours,t.minutes)}))),this._prevOnSelectValue=e,this.opts.onSelect(e,s,this)},next:function(){var e=this.parsedDate,t=this.opts;switch(this.view){case"days":this.date=new Date(e.year,e.month+1,1),t.onChangeMonth&&t.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(e.year+1,e.month,1),t.onChangeYear&&t.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(e.year+10,0,1),t.onChangeDecade&&t.onChangeDecade(this.curDecade)}},prev:function(){var e=this.parsedDate,t=this.opts;switch(this.view){case"days":this.date=new Date(e.year,e.month-1,1),t.onChangeMonth&&t.onChangeMonth(this.parsedDate.month,this.parsedDate.year);break;case"months":this.date=new Date(e.year-1,e.month,1),t.onChangeYear&&t.onChangeYear(this.parsedDate.year);break;case"years":this.date=new Date(e.year-10,0,1),t.onChangeDecade&&t.onChangeDecade(this.curDecade)}},formatDate:function(e,t){t=t||this.date;var i,n=e,s=this._getWordBoundaryRegExp,r=this.loc,o=a.getLeadingZeroNum,l=a.getDecade(t),u=a.getParsedDate(t),d=u.fullHours,c=u.hours,h=e.match(s("aa"))||e.match(s("AA")),p="am",f=this._replacer;switch(this.opts.timepicker&&this.timepicker&&h&&(d=o((i=this.timepicker._getValidHoursFromDate(t,h)).hours),c=i.hours,p=i.dayPeriod),!0){case/@/.test(n):n=n.replace(/@/,t.getTime());case/aa/.test(n):n=f(n,s("aa"),p);case/AA/.test(n):n=f(n,s("AA"),p.toUpperCase());case/dd/.test(n):n=f(n,s("dd"),u.fullDate);case/d/.test(n):n=f(n,s("d"),u.date);case/DD/.test(n):n=f(n,s("DD"),r.days[u.day]);case/D/.test(n):n=f(n,s("D"),r.daysShort[u.day]);case/mm/.test(n):n=f(n,s("mm"),u.fullMonth);case/m/.test(n):n=f(n,s("m"),u.month+1);case/MM/.test(n):n=f(n,s("MM"),this.loc.months[u.month]);case/M/.test(n):n=f(n,s("M"),r.monthsShort[u.month]);case/ii/.test(n):n=f(n,s("ii"),u.fullMinutes);case/i/.test(n):n=f(n,s("i"),u.minutes);case/hh/.test(n):n=f(n,s("hh"),d);case/h/.test(n):n=f(n,s("h"),c);case/yyyy/.test(n):n=f(n,s("yyyy"),u.year);case/yyyy1/.test(n):n=f(n,s("yyyy1"),l[0]);case/yyyy2/.test(n):n=f(n,s("yyyy2"),l[1]);case/yy/.test(n):n=f(n,s("yy"),u.year.toString().slice(-2))}return n},_replacer:function(e,t,i){return e.replace(t,(function(e,t,n,s){return t+i+s}))},_getWordBoundaryRegExp:function(e){var t="\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;";return new RegExp("(^|>|"+t+")("+e+")($|<|"+t+")","g")},selectDate:function(e){var t=this,i=t.opts,n=t.parsedDate,s=t.selectedDates.length,r="";if(Array.isArray(e))e.forEach((function(e){t.selectDate(e)}));else if(e instanceof Date){if(this.lastSelectedDate=e,this.timepicker&&this.timepicker._setTime(e),t._trigger("selectDate",e),this.timepicker&&(e.setHours(this.timepicker.hours),e.setMinutes(this.timepicker.minutes)),"days"==t.view&&e.getMonth()!=n.month&&i.moveToOtherMonthsOnSelect&&(r=new Date(e.getFullYear(),e.getMonth(),1)),"years"==t.view&&e.getFullYear()!=n.year&&i.moveToOtherYearsOnSelect&&(r=new Date(e.getFullYear(),0,1)),r&&(t.silent=!0,t.date=r,t.silent=!1,t.nav._render()),i.multipleDates&&!i.range){if(s===i.multipleDates)return;t._isSelected(e)||t.selectedDates.push(e)}else i.range?2==s?(t.selectedDates=[e],t.minRange=e,t.maxRange=""):1==s?(t.selectedDates.push(e),t.maxRange?t.minRange=e:t.maxRange=e,a.bigger(t.maxRange,t.minRange)&&(t.maxRange=t.minRange,t.minRange=e),t.selectedDates=[t.minRange,t.maxRange]):(t.selectedDates=[e],t.minRange=e):t.selectedDates=[e];t._setInputValue(),i.onSelect&&t._triggerOnChange(),i.autoClose&&!this.timepickerIsActive&&(i.multipleDates||i.range?i.range&&2==t.selectedDates.length&&t.hide():t.hide()),t.views[this.currentView]._render()}},removeDate:function(e){var t=this.selectedDates,i=this;if(e instanceof Date)return t.some((function(n,s){if(a.isSame(n,e))return t.splice(s,1),i.selectedDates.length?i.lastSelectedDate=i.selectedDates[i.selectedDates.length-1]:(i.minRange="",i.maxRange="",i.lastSelectedDate=""),i.views[i.currentView]._render(),i._setInputValue(),i.opts.onSelect&&i._triggerOnChange(),!0}))},today:function(){this.silent=!0,this.view=this.opts.minView,this.silent=!1,this.date=new Date,this.opts.todayButton instanceof Date&&this.selectDate(this.opts.todayButton)},clear:function(){this.selectedDates=[],this.minRange="",this.maxRange="",this.views[this.currentView]._render(),this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()},update:function(e,i){var n=arguments.length,s=this.lastSelectedDate;return 2==n?this.opts[e]=i:1==n&&"object"==typeof e&&(this.opts=t.extend(!0,this.opts,e)),this._createShortCuts(),this._syncWithMinMaxDates(),this._defineLocale(this.opts.language),this.nav._addButtonsIfNeed(),this.opts.onlyTimepicker||this.nav._render(),this.views[this.currentView]._render(),this.elIsInput&&!this.opts.inline&&(this._setPositionClasses(this.opts.position),this.visible&&this.setPosition(this.opts.position)),this.opts.classes&&this.$datepicker.addClass(this.opts.classes),this.opts.onlyTimepicker&&this.$datepicker.addClass("-only-timepicker-"),this.opts.timepicker&&(s&&this.timepicker._handleDate(s),this.timepicker._updateRanges(),this.timepicker._updateCurrentTime(),s&&(s.setHours(this.timepicker.hours),s.setMinutes(this.timepicker.minutes))),this._setInputValue(),this},_syncWithMinMaxDates:function(){var e=this.date.getTime();this.silent=!0,this.minTime>e&&(this.date=this.minDate),this.maxTime<e&&(this.date=this.maxDate),this.silent=!1},_isSelected:function(e,t){var i=!1;return this.selectedDates.some((function(n){if(a.isSame(n,e,t))return i=n,!0})),i},_setInputValue:function(){var e,t=this,i=t.opts,n=t.loc.dateFormat,s=i.altFieldDateFormat,a=t.selectedDates.map((function(e){return t.formatDate(n,e)}));i.altField&&t.$altField.length&&(e=(e=this.selectedDates.map((function(e){return t.formatDate(s,e)}))).join(this.opts.multipleDatesSeparator),this.$altField.val(e)),a=a.join(this.opts.multipleDatesSeparator),this.$el.val(a)},_isInRange:function(e,t){var i=e.getTime(),n=a.getParsedDate(e),s=a.getParsedDate(this.minDate),r=a.getParsedDate(this.maxDate),o=new Date(n.year,n.month,s.date).getTime(),l=new Date(n.year,n.month,r.date).getTime(),u={day:i>=this.minTime&&i<=this.maxTime,month:o>=this.minTime&&l<=this.maxTime,year:n.year>=s.year&&n.year<=r.year};return t?u[t]:u.day},_getDimensions:function(e){var t=e.offset();return{width:e.outerWidth(),height:e.outerHeight(),left:t.left,top:t.top}},_getDateFromCell:function(e){var t=this.parsedDate,i=e.data("year")||t.year,n=null==e.data("month")?t.month:e.data("month"),s=e.data("date")||1;return new Date(i,n,s)},_setPositionClasses:function(e){var t=(e=e.split(" "))[0],i="datepicker -"+t+"-"+e[1]+"- -from-"+t+"-";this.visible&&(i+=" active"),this.$datepicker.removeAttr("class").addClass(i)},setPosition:function(e){e=e||this.opts.position;var t,i,n=this._getDimensions(this.$el),s=this._getDimensions(this.$datepicker),a=e.split(" "),r=this.opts.offset,o=a[0],l=a[1];switch(o){case"top":t=n.top-s.height-r;break;case"right":i=n.left+n.width+r;break;case"bottom":t=n.top+n.height+r;break;case"left":i=n.left-s.width-r}switch(l){case"top":t=n.top;break;case"right":i=n.left+n.width-s.width;break;case"bottom":t=n.top+n.height-s.height;break;case"left":i=n.left;break;case"center":/left|right/.test(o)?t=n.top+n.height/2-s.height/2:i=n.left+n.width/2-s.width/2}this.$datepicker.css({left:i,top:t})},show:function(){var e=this.opts.onShow;this.setPosition(this.opts.position),this.$datepicker.addClass("active"),this.visible=!0,e&&this._bindVisionEvents(e)},hide:function(){var e=this.opts.onHide;this.$datepicker.removeClass("active").css({left:"-100000px"}),this.focused="",this.keys=[],this.inFocus=!1,this.visible=!1,this.$el.blur(),e&&this._bindVisionEvents(e)},down:function(e){this._changeView(e,"down")},up:function(e){this._changeView(e,"up")},_bindVisionEvents:function(e){this.$datepicker.off("transitionend.dp"),e(this,!1),this.$datepicker.one("transitionend.dp",e.bind(this,this,!0))},_changeView:function(e,t){e=e||this.focused||this.date;var i="up"==t?this.viewIndex+1:this.viewIndex-1;i>2&&(i=2),i<0&&(i=0),this.silent=!0,this.date=new Date(e.getFullYear(),e.getMonth(),1),this.silent=!1,this.view=this.viewIndexes[i]},_handleHotKey:function(e){var t,i,n,s=a.getParsedDate(this._getFocusedDate()),r=this.opts,o=!1,l=!1,u=!1,d=s.year,c=s.month,h=s.date;switch(e){case"ctrlRight":case"ctrlUp":c+=1,o=!0;break;case"ctrlLeft":case"ctrlDown":c-=1,o=!0;break;case"shiftRight":case"shiftUp":l=!0,d+=1;break;case"shiftLeft":case"shiftDown":l=!0,d-=1;break;case"altRight":case"altUp":u=!0,d+=10;break;case"altLeft":case"altDown":u=!0,d-=10;break;case"ctrlShiftUp":this.up()}n=a.getDaysCount(new Date(d,c)),i=new Date(d,c,h),n<h&&(h=n),i.getTime()<this.minTime?i=this.minDate:i.getTime()>this.maxTime&&(i=this.maxDate),this.focused=i,t=a.getParsedDate(i),o&&r.onChangeMonth&&r.onChangeMonth(t.month,t.year),l&&r.onChangeYear&&r.onChangeYear(t.year),u&&r.onChangeDecade&&r.onChangeDecade(this.curDecade)},_registerKey:function(e){this.keys.some((function(t){return t==e}))||this.keys.push(e)},_unRegisterKey:function(e){var t=this.keys.indexOf(e);this.keys.splice(t,1)},_isHotKeyPressed:function(){var e,t=!1,i=this.keys.sort();for(var n in l)e=l[n],i.length==e.length&&e.every((function(e,t){return e==i[t]}))&&(this._trigger("hotKey",n),t=!0);return t},_trigger:function(e,t){this.$el.trigger(e,t)},_focusNextCell:function(e,t){t=t||this.cellType;var i=a.getParsedDate(this._getFocusedDate()),n=i.year,s=i.month,r=i.date;if(!this._isHotKeyPressed()){switch(e){case 37:"day"==t&&(r-=1),"month"==t&&(s-=1),"year"==t&&(n-=1);break;case 38:"day"==t&&(r-=7),"month"==t&&(s-=3),"year"==t&&(n-=4);break;case 39:"day"==t&&(r+=1),"month"==t&&(s+=1),"year"==t&&(n+=1);break;case 40:"day"==t&&(r+=7),"month"==t&&(s+=3),"year"==t&&(n+=4)}var o=new Date(n,s,r);o.getTime()<this.minTime?o=this.minDate:o.getTime()>this.maxTime&&(o=this.maxDate),this.focused=o}},_getFocusedDate:function(){var e=this.focused||this.selectedDates[this.selectedDates.length-1],t=this.parsedDate;if(!e)switch(this.view){case"days":e=new Date(t.year,t.month,(new Date).getDate());break;case"months":e=new Date(t.year,t.month,1);break;case"years":e=new Date(t.year,0,1)}return e},_getCell:function(e,i){i=i||this.cellType;var n,s=a.getParsedDate(e),r='.datepicker--cell[data-year="'+s.year+'"]';switch(i){case"month":r='[data-month="'+s.month+'"]';break;case"day":r+='[data-month="'+s.month+'"][data-date="'+s.date+'"]'}return(n=this.views[this.currentView].$el.find(r)).length?n:t("")},destroy:function(){this.$el.off(".adp").data("datepicker",""),this.selectedDates=[],this.focused="",this.views={},this.keys=[],this.minRange="",this.maxRange="",this.opts.inline||!this.elIsInput?this.$datepicker.closest(".datepicker-inline").remove():this.$datepicker.remove()},_handleAlreadySelectedDates:function(e,t){this.opts.range?this.opts.toggleSelected?this.removeDate(t):2!=this.selectedDates.length&&this._trigger("clickCell",t):this.opts.toggleSelected&&this.removeDate(t),this.opts.toggleSelected||(this.lastSelectedDate=e,this.opts.timepicker&&(this.timepicker._setTime(e),this.timepicker.update()))},_onShowEvent:function(e){this.visible||this.show()},_onBlur:function(){!this.inFocus&&this.visible&&this.hide()},_onMouseDownDatepicker:function(e){this.inFocus=!0},_onMouseUpDatepicker:function(e){this.inFocus=!1,e.originalEvent.inFocus=!0,e.originalEvent.timepickerFocus||this.$el.focus()},_onKeyUpGeneral:function(e){this.$el.val()||this.clear()},_onResize:function(){this.visible&&this.setPosition()},_onMouseUpBody:function(e){e.originalEvent.inFocus||this.visible&&!this.inFocus&&this.hide()},_onMouseUpEl:function(e){e.originalEvent.inFocus=!0,setTimeout(this._onKeyUpGeneral.bind(this),4)},_onKeyDown:function(e){var t=e.which;if(this._registerKey(t),t>=37&&t<=40&&(e.preventDefault(),this._focusNextCell(t)),13==t&&this.focused){if(this._getCell(this.focused).hasClass("-disabled-"))return;if(this.view!=this.opts.minView)this.down();else{var i=this._isSelected(this.focused,this.cellType);if(!i)return this.timepicker&&(this.focused.setHours(this.timepicker.hours),this.focused.setMinutes(this.timepicker.minutes)),void this.selectDate(this.focused);this._handleAlreadySelectedDates(i,this.focused)}}27==t&&this.hide()},_onKeyUp:function(e){var t=e.which;this._unRegisterKey(t)},_onHotKey:function(e,t){this._handleHotKey(t)},_onMouseEnterCell:function(e){var i=t(e.target).closest(".datepicker--cell"),n=this._getDateFromCell(i);this.silent=!0,this.focused&&(this.focused=""),i.addClass("-focus-"),this.focused=n,this.silent=!1,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",a.less(this.minRange,this.focused)&&(this.maxRange=this.minRange,this.minRange=""),this.views[this.currentView]._update())},_onMouseLeaveCell:function(e){t(e.target).closest(".datepicker--cell").removeClass("-focus-"),this.silent=!0,this.focused="",this.silent=!1},_onTimeChange:function(e,t,i){var n=new Date,s=!1;this.selectedDates.length&&(s=!0,n=this.lastSelectedDate),n.setHours(t),n.setMinutes(i),s||this._getCell(n).hasClass("-disabled-")?(this._setInputValue(),this.opts.onSelect&&this._triggerOnChange()):this.selectDate(n)},_onClickCell:function(e,t){this.timepicker&&(t.setHours(this.timepicker.hours),t.setMinutes(this.timepicker.minutes)),this.selectDate(t)},set focused(e){if(!e&&this.focused){var t=this._getCell(this.focused);t.length&&t.removeClass("-focus-")}this._focused=e,this.opts.range&&1==this.selectedDates.length&&(this.minRange=this.selectedDates[0],this.maxRange="",a.less(this.minRange,this._focused)&&(this.maxRange=this.minRange,this.minRange="")),this.silent||(this.date=e)},get focused(){return this._focused},get parsedDate(){return a.getParsedDate(this.date)},set date(e){if(e instanceof Date)return this.currentDate=e,this.inited&&!this.silent&&(this.views[this.view]._render(),this.nav._render(),this.visible&&this.elIsInput&&this.setPosition()),e},get date(){return this.currentDate},set view(e){if(this.viewIndex=this.viewIndexes.indexOf(e),!(this.viewIndex<0))return this.prevView=this.currentView,this.currentView=e,this.inited&&(this.views[e]?this.views[e]._render():this.views[e]=new t.fn.datepicker.Body(this,e,this.opts),this.views[this.prevView].hide(),this.views[e].show(),this.nav._render(),this.opts.onChangeView&&this.opts.onChangeView(e),this.elIsInput&&this.visible&&this.setPosition()),e},get view(){return this.currentView},get cellType(){return this.view.substring(0,this.view.length-1)},get minTime(){var e=a.getParsedDate(this.minDate);return new Date(e.year,e.month,e.date).getTime()},get maxTime(){var e=a.getParsedDate(this.maxDate);return new Date(e.year,e.month,e.date).getTime()},get curDecade(){return a.getDecade(this.date)}},a.getDaysCount=function(e){return new Date(e.getFullYear(),e.getMonth()+1,0).getDate()},a.getParsedDate=function(e){return{year:e.getFullYear(),month:e.getMonth(),fullMonth:e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1,date:e.getDate(),fullDate:e.getDate()<10?"0"+e.getDate():e.getDate(),day:e.getDay(),hours:e.getHours(),fullHours:e.getHours()<10?"0"+e.getHours():e.getHours(),minutes:e.getMinutes(),fullMinutes:e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes()}},a.getDecade=function(e){var t=10*Math.floor(e.getFullYear()/10);return[t,t+9]},a.template=function(e,t){return e.replace(/#\{([\w]+)\}/g,(function(e,i){if(t[i]||0===t[i])return t[i]}))},a.isSame=function(e,t,i){if(!e||!t)return!1;var n=a.getParsedDate(e),s=a.getParsedDate(t),r=i||"day";return{day:n.date==s.date&&n.month==s.month&&n.year==s.year,month:n.month==s.month&&n.year==s.year,year:n.year==s.year}[r]},a.less=function(e,t,i){return!(!e||!t)&&t.getTime()<e.getTime()},a.bigger=function(e,t,i){return!(!e||!t)&&t.getTime()>e.getTime()},a.getLeadingZeroNum=function(e){return parseInt(e)<10?"0"+e:e},a.resetTime=function(e){if("object"==typeof e)return e=a.getParsedDate(e),new Date(e.year,e.month,e.date)},t.fn.datepicker=function(e){return this.each((function(){if(t.data(this,"datepicker")){var i=t.data(this,"datepicker");i.opts=t.extend(!0,i.opts,e),i.update()}else t.data(this,"datepicker",new u(this,e))}))},t.fn.datepicker.Constructor=u,t.fn.datepicker.language={ru:{days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.mm.yyyy",timeFormat:"hh:ii",firstDay:1}},t((function(){t(".datepicker-here").datepicker()})),function(){var e={days:'<div class="datepicker--days datepicker--body"><div class="datepicker--days-names"></div><div class="datepicker--cells datepicker--cells-days"></div></div>',months:'<div class="datepicker--months datepicker--body"><div class="datepicker--cells datepicker--cells-months"></div></div>',years:'<div class="datepicker--years datepicker--body"><div class="datepicker--cells datepicker--cells-years"></div></div>'},i=t.fn.datepicker,n=i.Constructor;i.Body=function(e,i,n){this.d=e,this.type=i,this.opts=n,this.$el=t(""),this.opts.onlyTimepicker||this.init()},i.Body.prototype={init:function(){this._buildBaseHtml(),this._render(),this._bindEvents()},_bindEvents:function(){this.$el.on("click",".datepicker--cell",t.proxy(this._onClickCell,this))},_buildBaseHtml:function(){this.$el=t(e[this.type]).appendTo(this.d.$content),this.$names=t(".datepicker--days-names",this.$el),this.$cells=t(".datepicker--cells",this.$el)},_getDayNamesHtml:function(e,t,i,n){return i=i||"",(n=null!=n?n:0)>7?i:7==(t=null!=t?t:e)?this._getDayNamesHtml(e,0,i,++n):(i+='<div class="datepicker--day-name'+(this.d.isWeekend(t)?" -weekend-":"")+'">'+this.d.loc.daysMin[t]+"</div>",this._getDayNamesHtml(e,++t,i,++n))},_getCellContents:function(e,t){var i="datepicker--cell datepicker--cell-"+t,s=new Date,a=this.d,r=n.resetTime(a.minRange),o=n.resetTime(a.maxRange),l=a.opts,u=n.getParsedDate(e),d={},c=u.date;switch(t){case"day":a.isWeekend(u.day)&&(i+=" -weekend-"),u.month!=this.d.parsedDate.month&&(i+=" -other-month-",l.selectOtherMonths||(i+=" -disabled-"),l.showOtherMonths||(c=""));break;case"month":c=a.loc[a.opts.monthsField][u.month];break;case"year":var h=a.curDecade;c=u.year,(u.year<h[0]||u.year>h[1])&&(i+=" -other-decade-",l.selectOtherYears||(i+=" -disabled-"),l.showOtherYears||(c=""))}return l.onRenderCell&&(c=(d=l.onRenderCell(e,t)||{}).html?d.html:c,i+=d.classes?" "+d.classes:""),l.range&&(n.isSame(r,e,t)&&(i+=" -range-from-"),n.isSame(o,e,t)&&(i+=" -range-to-"),1==a.selectedDates.length&&a.focused?((n.bigger(r,e)&&n.less(a.focused,e)||n.less(o,e)&&n.bigger(a.focused,e))&&(i+=" -in-range-"),n.less(o,e)&&n.isSame(a.focused,e)&&(i+=" -range-from-"),n.bigger(r,e)&&n.isSame(a.focused,e)&&(i+=" -range-to-")):2==a.selectedDates.length&&n.bigger(r,e)&&n.less(o,e)&&(i+=" -in-range-")),n.isSame(s,e,t)&&(i+=" -current-"),a.focused&&n.isSame(e,a.focused,t)&&(i+=" -focus-"),a._isSelected(e,t)&&(i+=" -selected-"),a._isInRange(e,t)&&!d.disabled||(i+=" -disabled-"),{html:c,classes:i}},_getDaysHtml:function(e){for(var t,i,s=n.getDaysCount(e),a=new Date(e.getFullYear(),e.getMonth(),1).getDay(),r=new Date(e.getFullYear(),e.getMonth(),s).getDay(),o=a-this.d.loc.firstDay,l=6-r+this.d.loc.firstDay,u="",d=1-(o=o<0?o+7:o),c=s+(l=l>6?l-7:l);d<=c;d++)i=e.getFullYear(),t=e.getMonth(),u+=this._getDayHtml(new Date(i,t,d));return u},_getDayHtml:function(e){var t=this._getCellContents(e,"day");return'<div class="'+t.classes+'" data-date="'+e.getDate()+'" data-month="'+e.getMonth()+'" data-year="'+e.getFullYear()+'">'+t.html+"</div>"},_getMonthsHtml:function(e){for(var t="",i=n.getParsedDate(e),s=0;s<12;)t+=this._getMonthHtml(new Date(i.year,s)),s++;return t},_getMonthHtml:function(e){var t=this._getCellContents(e,"month");return'<div class="'+t.classes+'" data-month="'+e.getMonth()+'">'+t.html+"</div>"},_getYearsHtml:function(e){n.getParsedDate(e);for(var t=n.getDecade(e),i="",s=t[0]-1;s<=t[1]+1;s++)i+=this._getYearHtml(new Date(s,0));return i},_getYearHtml:function(e){var t=this._getCellContents(e,"year");return'<div class="'+t.classes+'" data-year="'+e.getFullYear()+'">'+t.html+"</div>"},_renderTypes:{days:function(){var e=this._getDayNamesHtml(this.d.loc.firstDay),t=this._getDaysHtml(this.d.currentDate);this.$cells.html(t),this.$names.html(e)},months:function(){var e=this._getMonthsHtml(this.d.currentDate);this.$cells.html(e)},years:function(){var e=this._getYearsHtml(this.d.currentDate);this.$cells.html(e)}},_render:function(){this.opts.onlyTimepicker||this._renderTypes[this.type].bind(this)()},_update:function(){var e,i,n,s=t(".datepicker--cell",this.$cells),a=this;s.each((function(s,r){i=t(this),n=a.d._getDateFromCell(t(this)),e=a._getCellContents(n,a.d.cellType),i.attr("class",e.classes)}))},show:function(){this.opts.onlyTimepicker||(this.$el.addClass("active"),this.acitve=!0)},hide:function(){this.$el.removeClass("active"),this.active=!1},_handleClick:function(e){var t=e.data("date")||1,i=e.data("month")||0,n=e.data("year")||this.d.parsedDate.year,s=this.d;if(s.view==this.opts.minView){var a=new Date(n,i,t),r=this.d._isSelected(a,this.d.cellType);r?s._handleAlreadySelectedDates.bind(s,r,a)():s._trigger("clickCell",a)}else s.down(new Date(n,i,t))},_onClickCell:function(e){var i=t(e.target).closest(".datepicker--cell");i.hasClass("-disabled-")||this._handleClick.bind(this)(i)}}}(),function(){var e=t.fn.datepicker,i=e.Constructor;e.Navigation=function(e,t){this.d=e,this.opts=t,this.$buttonsContainer="",this.init()},e.Navigation.prototype={init:function(){this._buildBaseHtml(),this._bindEvents()},_bindEvents:function(){this.d.$nav.on("click",".datepicker--nav-action",t.proxy(this._onClickNavButton,this)),this.d.$nav.on("click",".datepicker--nav-title",t.proxy(this._onClickNavTitle,this)),this.d.$datepicker.on("click",".datepicker--button",t.proxy(this._onClickNavButton,this))},_buildBaseHtml:function(){this.opts.onlyTimepicker||this._render(),this._addButtonsIfNeed()},_addButtonsIfNeed:function(){this.opts.todayButton&&this._addButton("today"),this.opts.clearButton&&this._addButton("clear")},_render:function(){var e=this._getTitle(this.d.currentDate),n=i.template('<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div><div class="datepicker--nav-title">#{title}</div><div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',t.extend({title:e},this.opts));this.d.$nav.html(n),"years"==this.d.view&&t(".datepicker--nav-title",this.d.$nav).addClass("-disabled-"),this.setNavStatus()},_getTitle:function(e){return this.d.formatDate(this.opts.navTitles[this.d.view],e)},_addButton:function(e){this.$buttonsContainer.length||this._addButtonsContainer();var n={action:e,label:this.d.loc[e]},s=i.template('<span class="datepicker--button" data-action="#{action}">#{label}</span>',n);t("[data-action="+e+"]",this.$buttonsContainer).length||this.$buttonsContainer.append(s)},_addButtonsContainer:function(){this.d.$datepicker.append('<div class="datepicker--buttons"></div>'),this.$buttonsContainer=t(".datepicker--buttons",this.d.$datepicker)},setNavStatus:function(){if((this.opts.minDate||this.opts.maxDate)&&this.opts.disableNavWhenOutOfRange){var e=this.d.parsedDate,t=e.month,n=e.year,s=e.date;switch(this.d.view){case"days":this.d._isInRange(new Date(n,t-1,1),"month")||this._disableNav("prev"),this.d._isInRange(new Date(n,t+1,1),"month")||this._disableNav("next");break;case"months":this.d._isInRange(new Date(n-1,t,s),"year")||this._disableNav("prev"),this.d._isInRange(new Date(n+1,t,s),"year")||this._disableNav("next");break;case"years":var a=i.getDecade(this.d.date);this.d._isInRange(new Date(a[0]-1,0,1),"year")||this._disableNav("prev"),this.d._isInRange(new Date(a[1]+1,0,1),"year")||this._disableNav("next")}}},_disableNav:function(e){t('[data-action="'+e+'"]',this.d.$nav).addClass("-disabled-")},_activateNav:function(e){t('[data-action="'+e+'"]',this.d.$nav).removeClass("-disabled-")},_onClickNavButton:function(e){var i=t(e.target).closest("[data-action]").data("action");this.d[i]()},_onClickNavTitle:function(e){if(!t(e.target).hasClass("-disabled-"))return"days"==this.d.view?this.d.view="months":void(this.d.view="years")}}}(),function(){var e=t.fn.datepicker,i=e.Constructor;e.Timepicker=function(e,t){this.d=e,this.opts=t,this.init()},e.Timepicker.prototype={init:function(){var e="input";this._setTime(this.d.date),this._buildHTML(),navigator.userAgent.match(/trident/gi)&&(e="change"),this.d.$el.on("selectDate",this._onSelectDate.bind(this)),this.$ranges.on(e,this._onChangeRange.bind(this)),this.$ranges.on("mouseup",this._onMouseUpRange.bind(this)),this.$ranges.on("mousemove focus ",this._onMouseEnterRange.bind(this)),this.$ranges.on("mouseout blur",this._onMouseOutRange.bind(this))},_setTime:function(e){var t=i.getParsedDate(e);this._handleDate(e),this.hours=t.hours<this.minHours?this.minHours:t.hours,this.minutes=t.minutes<this.minMinutes?this.minMinutes:t.minutes},_setMinTimeFromDate:function(e){this.minHours=e.getHours(),this.minMinutes=e.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()>e.getHours()&&(this.minMinutes=this.opts.minMinutes)},_setMaxTimeFromDate:function(e){this.maxHours=e.getHours(),this.maxMinutes=e.getMinutes(),this.d.lastSelectedDate&&this.d.lastSelectedDate.getHours()<e.getHours()&&(this.maxMinutes=this.opts.maxMinutes)},_setDefaultMinMaxTime:function(){var e=this.opts;this.minHours=e.minHours<0||e.minHours>23?0:e.minHours,this.minMinutes=e.minMinutes<0||e.minMinutes>59?0:e.minMinutes,this.maxHours=e.maxHours<0||e.maxHours>23?23:e.maxHours,this.maxMinutes=e.maxMinutes<0||e.maxMinutes>59?59:e.maxMinutes},_validateHoursMinutes:function(e){this.hours<this.minHours?this.hours=this.minHours:this.hours>this.maxHours&&(this.hours=this.maxHours),this.minutes<this.minMinutes?this.minutes=this.minMinutes:this.minutes>this.maxMinutes&&(this.minutes=this.maxMinutes)},_buildHTML:function(){var e=i.getLeadingZeroNum,n={hourMin:this.minHours,hourMax:e(this.maxHours),hourStep:this.opts.hoursStep,hourValue:this.hours,hourVisible:e(this.displayHours),minMin:this.minMinutes,minMax:e(this.maxMinutes),minStep:this.opts.minutesStep,minValue:e(this.minutes)},s=i.template('<div class="datepicker--time"><div class="datepicker--time-current">   <span class="datepicker--time-current-hours">#{hourVisible}</span>   <span class="datepicker--time-current-colon">:</span>   <span class="datepicker--time-current-minutes">#{minValue}</span></div><div class="datepicker--time-sliders">   <div class="datepicker--time-row">      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>   </div>   <div class="datepicker--time-row">      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>   </div></div></div>',n);this.$timepicker=t(s).appendTo(this.d.$datepicker),this.$ranges=t('[type="range"]',this.$timepicker),this.$hours=t('[name="hours"]',this.$timepicker),this.$minutes=t('[name="minutes"]',this.$timepicker),this.$hoursText=t(".datepicker--time-current-hours",this.$timepicker),this.$minutesText=t(".datepicker--time-current-minutes",this.$timepicker),this.d.ampm&&(this.$ampm=t('<span class="datepicker--time-current-ampm">').appendTo(t(".datepicker--time-current",this.$timepicker)).html(this.dayPeriod),this.$timepicker.addClass("-am-pm-"))},_updateCurrentTime:function(){var e=i.getLeadingZeroNum(this.displayHours),t=i.getLeadingZeroNum(this.minutes);this.$hoursText.html(e),this.$minutesText.html(t),this.d.ampm&&this.$ampm.html(this.dayPeriod)},_updateRanges:function(){this.$hours.attr({min:this.minHours,max:this.maxHours}).val(this.hours),this.$minutes.attr({min:this.minMinutes,max:this.maxMinutes}).val(this.minutes)},_handleDate:function(e){this._setDefaultMinMaxTime(),e&&(i.isSame(e,this.d.opts.minDate)?this._setMinTimeFromDate(this.d.opts.minDate):i.isSame(e,this.d.opts.maxDate)&&this._setMaxTimeFromDate(this.d.opts.maxDate)),this._validateHoursMinutes(e)},update:function(){this._updateRanges(),this._updateCurrentTime()},_getValidHoursFromDate:function(e,t){var n=e;e instanceof Date&&(n=i.getParsedDate(e).hours);var s="am";if(t||this.d.ampm)switch(!0){case 0==n:n=12;break;case 12==n:s="pm";break;case n>11:n-=12,s="pm"}return{hours:n,dayPeriod:s}},set hours(e){this._hours=e;var t=this._getValidHoursFromDate(e);this.displayHours=t.hours,this.dayPeriod=t.dayPeriod},get hours(){return this._hours},_onChangeRange:function(e){var i=t(e.target),n=i.attr("name");this.d.timepickerIsActive=!0,this[n]=i.val(),this._updateCurrentTime(),this.d._trigger("timeChange",[this.hours,this.minutes]),this._handleDate(this.d.lastSelectedDate),this.update()},_onSelectDate:function(e,t){this._handleDate(t),this.update()},_onMouseEnterRange:function(e){var i=t(e.target).attr("name");t(".datepicker--time-current-"+i,this.$timepicker).addClass("-focus-")},_onMouseOutRange:function(e){var i=t(e.target).attr("name");this.d.inFocus||t(".datepicker--time-current-"+i,this.$timepicker).removeClass("-focus-")},_onMouseUpRange:function(e){this.d.timepickerIsActive=!1}}}()}(window,jQuery),function(e){e.fn.stupidtable=function(t){return this.each((function(){var i=e(this);t=t||{},t=e.extend({},e.fn.stupidtable.default_sort_fns,t),i.data("sortFns",t),i.stupidtable_build(),i.on("click.stupidtable","thead th",(function(){e(this).stupidsort()})),i.find("th[data-sort-onload=yes]").eq(0).stupidsort()}))},e.fn.stupidtable.default_settings={should_redraw:function(e){return!0},will_manually_build_table:!1},e.fn.stupidtable.dir={ASC:"asc",DESC:"desc"},e.fn.stupidtable.default_sort_fns={int:function(e,t){return parseInt(e,10)-parseInt(t,10)},float:function(e,t){return parseFloat(e)-parseFloat(t)},string:function(e,t){return e.toString().localeCompare(t.toString())},"string-ins":function(e,t){return e=e.toString().toLocaleLowerCase(),t=t.toString().toLocaleLowerCase(),e.localeCompare(t)}},e.fn.stupidtable_settings=function(t){return this.each((function(){var i=e(this),n=e.extend({},e.fn.stupidtable.default_settings,t);i.stupidtable.settings=n}))},e.fn.stupidsort=function(i){var o=e(this),l=o.data("sort")||null;if(null!==l){e.fn.stupidtable.dir;var u=o.closest("table"),d={$th:o,$table:u,datatype:l};return u.stupidtable.settings||(u.stupidtable.settings=e.extend({},e.fn.stupidtable.default_settings)),d.compare_fn=u.data("sortFns")[l],d.th_index=r(d),d.sort_dir=a(i,d),o.data("sort-dir",d.sort_dir),u.trigger("beforetablesort",{column:d.th_index,direction:d.sort_dir,$th:o}),u.css("display"),setTimeout((function(){u.stupidtable.settings.will_manually_build_table||u.stupidtable_build();var e=t(d),i=n(e,d);u.stupidtable.settings.should_redraw(d)&&(u.children("tbody").append(i),s(d),u.trigger("aftertablesort",{column:d.th_index,direction:d.sort_dir,$th:o}),u.css("display"))}),10),o}},e.fn.updateSortVal=function(t){var i=e(this);return i.is("[data-sort-value]")&&i.attr("data-sort-value",t),i.data("sort-value",t),i},e.fn.stupidtable_build=function(){return this.each((function(){var t=e(this),i=[];t.children("tbody").children("tr").each((function(t,n){var s={$tr:e(n),columns:[],index:t};e(n).children("td").each((function(t,i){var n=e(i).data("sort-value");if(void 0===n){var a=e(i).text();e(i).data("sort-value",a),n=a}s.columns.push(n)})),i.push(s)})),t.data("stupidsort_internaltable",i)}))};var t=function(t){var n,s=t.$table.data("stupidsort_internaltable"),a=t.th_index,r=t.$th.data("sort-multicolumn");n=r?r.split(","):[];var o=e.map(n,(function(e,n){return i(t.$table,e)}));return s.sort((function(e,i){for(var n=o.slice(0),s=t.compare_fn(e.columns[a],i.columns[a]);0===s&&n.length;){var r=n[0],l=r.$e.data("sort");s=(0,t.$table.data("sortFns")[l])(e.columns[r.index],i.columns[r.index]),n.shift()}return 0===s?e.index-i.index:s})),t.sort_dir!=e.fn.stupidtable.dir.ASC&&s.reverse(),s},i=function(e,t){var i,n=e.find("th"),s=parseInt(t,10);return s||0===s?i=n.eq(s):(i=n.siblings("#"+t),s=n.index(i)),{index:s,$e:i}},n=function(t,i){var n=e.map(t,(function(e,t){return[[e.columns[i.th_index],e.$tr,t]]}));return i.column=n,e.map(t,(function(e){return e.$tr}))},s=function(e){var t=e.$table,i=e.$th,n=i.data("sort-dir");e.th_index;t.find("th").data("sort-dir",null).removeClass("sorting-desc sorting-asc"),i.data("sort-dir",n).addClass("sorting-"+n)},a=function(t,i){var n,s=i.$th,a=e.fn.stupidtable.dir;return t?n=t:(n=t||s.data("sort-default")||a.ASC,s.data("sort-dir")&&(n=s.data("sort-dir")===a.ASC?a.DESC:a.ASC)),n},r=function(t){var i=0,n=t.$th.index();return t.$th.parents("tr").find("th").slice(0,n).each((function(){var t=e(this).attr("colspan")||1;i+=parseInt(t,10)})),i}}(jQuery),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(){return(t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(this,arguments)}function i(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function n(e,t){void 0===e&&(e={}),void 0===t&&(t={}),Object.keys(t).forEach((function(s){void 0===e[s]?e[s]=t[s]:i(t[s])&&i(e[s])&&Object.keys(t[s]).length>0&&n(e[s],t[s])}))}var s={body:{},addEventListener:function(){},removeEventListener:function(){},activeElement:{blur:function(){},nodeName:""},querySelector:function(){return null},querySelectorAll:function(){return[]},getElementById:function(){return null},createEvent:function(){return{initEvent:function(){}}},createElement:function(){return{children:[],childNodes:[],style:{},setAttribute:function(){},getElementsByTagName:function(){return[]}}},createElementNS:function(){return{}},importNode:function(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){var e="undefined"!=typeof document?document:{};return n(e,s),e}var r={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState:function(){},pushState:function(){},go:function(){},back:function(){}},CustomEvent:function(){return this},addEventListener:function(){},removeEventListener:function(){},getComputedStyle:function(){return{getPropertyValue:function(){return""}}},Image:function(){},Date:function(){},screen:{},setTimeout:function(){},clearTimeout:function(){},matchMedia:function(){return{}},requestAnimationFrame:function(e){return"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0)},cancelAnimationFrame:function(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function o(){var e="undefined"!=typeof window?window:{};return n(e,r),e}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function c(e,t,i){return(c=d()?Reflect.construct:function(e,t,i){var n=[null];n.push.apply(n,t);var s=new(Function.bind.apply(e,n));return i&&u(s,i.prototype),s}).apply(null,arguments)}function h(e){var t="function"==typeof Map?new Map:void 0;return(h=function(e){if(null===e||(i=e,-1===Function.toString.call(i).indexOf("[native code]")))return e;var i;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return c(e,arguments,l(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),u(n,e)})(e)}var p=function(e){var t,i;function n(t){var i,n,s;return i=e.call.apply(e,[this].concat(t))||this,n=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(i),s=n.__proto__,Object.defineProperty(n,"__proto__",{get:function(){return s},set:function(e){s.__proto__=e}}),i}return i=e,(t=n).prototype=Object.create(i.prototype),t.prototype.constructor=t,t.__proto__=i,n}(h(Array));function f(e){void 0===e&&(e=[]);var t=[];return e.forEach((function(e){Array.isArray(e)?t.push.apply(t,f(e)):t.push(e)})),t}function m(e,t){return Array.prototype.filter.call(e,t)}function v(e,t){var i=o(),n=a(),s=[];if(!t&&e instanceof p)return e;if(!e)return new p(s);if("string"==typeof e){var r=e.trim();if(r.indexOf("<")>=0&&r.indexOf(">")>=0){var l="div";0===r.indexOf("<li")&&(l="ul"),0===r.indexOf("<tr")&&(l="tbody"),0!==r.indexOf("<td")&&0!==r.indexOf("<th")||(l="tr"),0===r.indexOf("<tbody")&&(l="table"),0===r.indexOf("<option")&&(l="select");var u=n.createElement(l);u.innerHTML=r;for(var d=0;d<u.childNodes.length;d+=1)s.push(u.childNodes[d])}else s=function(e,t){if("string"!=typeof e)return[e];for(var i=[],n=t.querySelectorAll(e),s=0;s<n.length;s+=1)i.push(n[s]);return i}(e.trim(),t||n)}else if(e.nodeType||e===i||e===n)s.push(e);else if(Array.isArray(e)){if(e instanceof p)return e;s=e}return new p(function(e){for(var t=[],i=0;i<e.length;i+=1)-1===t.indexOf(e[i])&&t.push(e[i]);return t}(s))}v.fn=p.prototype;var g,y,b,w={addClass:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=f(t.map((function(e){return e.split(" ")})));return this.forEach((function(e){var t;(t=e.classList).add.apply(t,n)})),this},removeClass:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=f(t.map((function(e){return e.split(" ")})));return this.forEach((function(e){var t;(t=e.classList).remove.apply(t,n)})),this},hasClass:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=f(t.map((function(e){return e.split(" ")})));return m(this,(function(e){return n.filter((function(t){return e.classList.contains(t)})).length>0})).length>0},toggleClass:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=f(t.map((function(e){return e.split(" ")})));this.forEach((function(e){n.forEach((function(t){e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var i=0;i<this.length;i+=1)if(2===arguments.length)this[i].setAttribute(e,t);else for(var n in e)this[i][n]=e[n],this[i].setAttribute(n,e[n]);return this},removeAttr:function(e){for(var t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(var t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(var t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!=typeof e?e+"ms":e;return this},on:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=t[0],s=t[1],a=t[2],r=t[3];function o(e){var t=e.target;if(t){var i=e.target.dom7EventData||[];if(i.indexOf(e)<0&&i.unshift(e),v(t).is(s))a.apply(t,i);else for(var n=v(t).parents(),r=0;r<n.length;r+=1)v(n[r]).is(s)&&a.apply(n[r],i)}}function l(e){var t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),a.apply(this,t)}"function"==typeof t[1]&&(n=t[0],a=t[1],r=t[2],s=void 0),r||(r=!1);for(var u,d=n.split(" "),c=0;c<this.length;c+=1){var h=this[c];if(s)for(u=0;u<d.length;u+=1){var p=d[u];h.dom7LiveListeners||(h.dom7LiveListeners={}),h.dom7LiveListeners[p]||(h.dom7LiveListeners[p]=[]),h.dom7LiveListeners[p].push({listener:a,proxyListener:o}),h.addEventListener(p,o,r)}else for(u=0;u<d.length;u+=1){var f=d[u];h.dom7Listeners||(h.dom7Listeners={}),h.dom7Listeners[f]||(h.dom7Listeners[f]=[]),h.dom7Listeners[f].push({listener:a,proxyListener:l}),h.addEventListener(f,l,r)}}return this},off:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=t[0],s=t[1],a=t[2],r=t[3];"function"==typeof t[1]&&(n=t[0],a=t[1],r=t[2],s=void 0),r||(r=!1);for(var o=n.split(" "),l=0;l<o.length;l+=1)for(var u=o[l],d=0;d<this.length;d+=1){var c=this[d],h=void 0;if(!s&&c.dom7Listeners?h=c.dom7Listeners[u]:s&&c.dom7LiveListeners&&(h=c.dom7LiveListeners[u]),h&&h.length)for(var p=h.length-1;p>=0;p-=1){var f=h[p];a&&f.listener===a||a&&f.listener&&f.listener.dom7proxy&&f.listener.dom7proxy===a?(c.removeEventListener(u,f.proxyListener,r),h.splice(p,1)):a||(c.removeEventListener(u,f.proxyListener,r),h.splice(p,1))}}return this},trigger:function(){for(var e=o(),t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];for(var s=i[0].split(" "),a=i[1],r=0;r<s.length;r+=1)for(var l=s[r],u=0;u<this.length;u+=1){var d=this[u];if(e.CustomEvent){var c=new e.CustomEvent(l,{detail:a,bubbles:!0,cancelable:!0});d.dom7EventData=i.filter((function(e,t){return t>0})),d.dispatchEvent(c),d.dom7EventData=[],delete d.dom7EventData}}return this},transitionEnd:function(e){var t=this;return e&&t.on("transitionend",(function i(n){n.target===this&&(e.call(this,n),t.off("transitionend",i))})),this},outerWidth:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetWidth+parseFloat(t.getPropertyValue("margin-right"))+parseFloat(t.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){var t=this.styles();return this[0].offsetHeight+parseFloat(t.getPropertyValue("margin-top"))+parseFloat(t.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){var e=o();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){var e=o(),t=a(),i=this[0],n=i.getBoundingClientRect(),s=t.body,r=i.clientTop||s.clientTop||0,l=i.clientLeft||s.clientLeft||0,u=i===e?e.scrollY:i.scrollTop,d=i===e?e.scrollX:i.scrollLeft;return{top:n.top+u-r,left:n.left+d-l}}return null},css:function(e,t){var i,n=o();if(1===arguments.length){if("string"!=typeof e){for(i=0;i<this.length;i+=1)for(var s in e)this[i].style[s]=e[s];return this}if(this[0])return n.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(i=0;i<this.length;i+=1)this[i].style[e]=t;return this}return this},each:function(e){return e?(this.forEach((function(t,i){e.apply(t,[t,i])})),this):this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:null;for(var t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(var t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){var t,i,n=o(),s=a(),r=this[0];if(!r||void 0===e)return!1;if("string"==typeof e){if(r.matches)return r.matches(e);if(r.webkitMatchesSelector)return r.webkitMatchesSelector(e);if(r.msMatchesSelector)return r.msMatchesSelector(e);for(t=v(e),i=0;i<t.length;i+=1)if(t[i]===r)return!0;return!1}if(e===s)return r===s;if(e===n)return r===n;if(e.nodeType||e instanceof p){for(t=e.nodeType?[e]:e,i=0;i<t.length;i+=1)if(t[i]===r)return!0;return!1}return!1},index:function(){var e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if(void 0===e)return this;var t=this.length;if(e>t-1)return v([]);if(e<0){var i=t+e;return v(i<0?[]:[this[i]])}return v([this[e]])},append:function(){for(var e,t=a(),i=0;i<arguments.length;i+=1){e=i<0||arguments.length<=i?void 0:arguments[i];for(var n=0;n<this.length;n+=1)if("string"==typeof e){var s=t.createElement("div");for(s.innerHTML=e;s.firstChild;)this[n].appendChild(s.firstChild)}else if(e instanceof p)for(var r=0;r<e.length;r+=1)this[n].appendChild(e[r]);else this[n].appendChild(e)}return this},prepend:function(e){var t,i,n=a();for(t=0;t<this.length;t+=1)if("string"==typeof e){var s=n.createElement("div");for(s.innerHTML=e,i=s.childNodes.length-1;i>=0;i-=1)this[t].insertBefore(s.childNodes[i],this[t].childNodes[0])}else if(e instanceof p)for(i=0;i<e.length;i+=1)this[t].insertBefore(e[i],this[t].childNodes[0]);else this[t].insertBefore(e,this[t].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&v(this[0].nextElementSibling).is(e)?v([this[0].nextElementSibling]):v([]):this[0].nextElementSibling?v([this[0].nextElementSibling]):v([]):v([])},nextAll:function(e){var t=[],i=this[0];if(!i)return v([]);for(;i.nextElementSibling;){var n=i.nextElementSibling;e?v(n).is(e)&&t.push(n):t.push(n),i=n}return v(t)},prev:function(e){if(this.length>0){var t=this[0];return e?t.previousElementSibling&&v(t.previousElementSibling).is(e)?v([t.previousElementSibling]):v([]):t.previousElementSibling?v([t.previousElementSibling]):v([])}return v([])},prevAll:function(e){var t=[],i=this[0];if(!i)return v([]);for(;i.previousElementSibling;){var n=i.previousElementSibling;e?v(n).is(e)&&t.push(n):t.push(n),i=n}return v(t)},parent:function(e){for(var t=[],i=0;i<this.length;i+=1)null!==this[i].parentNode&&(e?v(this[i].parentNode).is(e)&&t.push(this[i].parentNode):t.push(this[i].parentNode));return v(t)},parents:function(e){for(var t=[],i=0;i<this.length;i+=1)for(var n=this[i].parentNode;n;)e?v(n).is(e)&&t.push(n):t.push(n),n=n.parentNode;return v(t)},closest:function(e){var t=this;return void 0===e?v([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){for(var t=[],i=0;i<this.length;i+=1){try{var n=this[i].querySelectorAll(e)}catch(t){console.log(e)}for(var s=0;s<n.length;s+=1)t.push(n[s])}return v(t)},children:function(e){for(var t=[],i=0;i<this.length;i+=1)for(var n=this[i].children,s=0;s<n.length;s+=1)e&&!v(n[s]).is(e)||t.push(n[s]);return v(t)},filter:function(e){return v(m(this,e))},remove:function(){for(var e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};function x(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function C(){return Date.now()}function T(e,t){void 0===t&&(t="x");var i,n,s,a=o(),r=function(e){var t,i=o();return i.getComputedStyle&&(t=i.getComputedStyle(e,null)),!t&&e.currentStyle&&(t=e.currentStyle),t||(t=e.style),t}(e);return a.WebKitCSSMatrix?((n=r.transform||r.webkitTransform).split(",").length>6&&(n=n.split(", ").map((function(e){return e.replace(",",".")})).join(", ")),s=new a.WebKitCSSMatrix("none"===n?"":n)):i=(s=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,")).toString().split(","),"x"===t&&(n=a.WebKitCSSMatrix?s.m41:16===i.length?parseFloat(i[12]):parseFloat(i[4])),"y"===t&&(n=a.WebKitCSSMatrix?s.m42:16===i.length?parseFloat(i[13]):parseFloat(i[5])),n||0}function S(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function E(){for(var e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"],i=1;i<arguments.length;i+=1){var n=i<0||arguments.length<=i?void 0:arguments[i];if(null!=n)for(var s=Object.keys(Object(n)).filter((function(e){return t.indexOf(e)<0})),a=0,r=s.length;a<r;a+=1){var o=s[a],l=Object.getOwnPropertyDescriptor(n,o);void 0!==l&&l.enumerable&&(S(e[o])&&S(n[o])?n[o].__swiper__?e[o]=n[o]:E(e[o],n[o]):!S(e[o])&&S(n[o])?(e[o]={},n[o].__swiper__?e[o]=n[o]:E(e[o],n[o])):e[o]=n[o])}}return e}function k(e,t){Object.keys(t).forEach((function(i){S(t[i])&&Object.keys(t[i]).forEach((function(n){"function"==typeof t[i][n]&&(t[i][n]=t[i][n].bind(e))})),e[i]=t[i]}))}function D(e){return void 0===e&&(e=""),"."+e.trim().replace(/([\.:\/])/g,"\\$1").replace(/ /g,".")}function M(){return g||(g=function(){var e=o(),t=a();return{touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),pointerEvents:!!e.PointerEvent&&"maxTouchPoints"in e.navigator&&e.navigator.maxTouchPoints>=0,observer:"MutationObserver"in e||"WebkitMutationObserver"in e,passiveListener:function(){var t=!1;try{var i=Object.defineProperty({},"passive",{get:function(){t=!0}});e.addEventListener("testPassiveListener",null,i)}catch(e){}return t}(),gestures:"ongesturestart"in e}}()),g}function _(e){return void 0===e&&(e={}),y||(y=function(e){var t=(void 0===e?{}:e).userAgent,i=M(),n=o(),s=n.navigator.platform,a=t||n.navigator.userAgent,r={ios:!1,android:!1},l=n.screen.width,u=n.screen.height,d=a.match(/(Android);?[\s\/]+([\d.]+)?/),c=a.match(/(iPad).*OS\s([\d_]+)/),h=a.match(/(iPod)(.*OS\s([\d_]+))?/),p=!c&&a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),f="Win32"===s,m="MacIntel"===s;return!c&&m&&i.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(l+"x"+u)>=0&&((c=a.match(/(Version)\/([\d.]+)/))||(c=[0,1,"13_0_0"]),m=!1),d&&!f&&(r.os="android",r.android=!0),(c||p||h)&&(r.os="ios",r.ios=!0),r}(e)),y}function $(){return b||(b=function(){var e,t=o();return{isEdge:!!t.navigator.userAgent.match(/Edge/g),isSafari:(e=t.navigator.userAgent.toLowerCase(),e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)}}()),b}Object.keys(w).forEach((function(e){Object.defineProperty(v.fn,e,{value:w[e],writable:!0})}));var P={name:"resize",create:function(){var e=this;E(e,{resize:{observer:null,createObserver:function(){e&&!e.destroyed&&e.initialized&&(e.resize.observer=new ResizeObserver((function(t){var i=e.width,n=e.height,s=i,a=n;t.forEach((function(t){var i=t.contentBoxSize,n=t.contentRect,r=t.target;r&&r!==e.el||(s=n?n.width:(i[0]||i).inlineSize,a=n?n.height:(i[0]||i).blockSize)})),s===i&&a===n||e.resize.resizeHandler()})),e.resize.observer.observe(e.el))},removeObserver:function(){e.resize.observer&&e.resize.observer.unobserve&&e.el&&(e.resize.observer.unobserve(e.el),e.resize.observer=null)},resizeHandler:function(){e&&!e.destroyed&&e.initialized&&(e.emit("beforeResize"),e.emit("resize"))},orientationChangeHandler:function(){e&&!e.destroyed&&e.initialized&&e.emit("orientationchange")}}})},on:{init:function(e){var t=o();e.params.resizeObserver&&void 0!==o().ResizeObserver?e.resize.createObserver():(t.addEventListener("resize",e.resize.resizeHandler),t.addEventListener("orientationchange",e.resize.orientationChangeHandler))},destroy:function(e){var t=o();e.resize.removeObserver(),t.removeEventListener("resize",e.resize.resizeHandler),t.removeEventListener("orientationchange",e.resize.orientationChangeHandler)}}},L={attach:function(e,t){void 0===t&&(t={});var i=o(),n=this,s=new(i.MutationObserver||i.WebkitMutationObserver)((function(e){if(1!==e.length){var t=function(){n.emit("observerUpdate",e[0])};i.requestAnimationFrame?i.requestAnimationFrame(t):i.setTimeout(t,0)}else n.emit("observerUpdate",e[0])}));s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),n.observer.observers.push(s)},init:function(){if(this.support.observer&&this.params.observer){if(this.params.observeParents)for(var e=this.$el.parents(),t=0;t<e.length;t+=1)this.observer.attach(e[t]);this.observer.attach(this.$el[0],{childList:this.params.observeSlideChildren}),this.observer.attach(this.$wrapperEl[0],{attributes:!1})}},destroy:function(){this.observer.observers.forEach((function(e){e.disconnect()})),this.observer.observers=[]}},A={name:"observer",params:{observer:!1,observeParents:!1,observeSlideChildren:!1},create:function(){k(this,{observer:t({},L,{observers:[]})})},on:{init:function(e){e.observer.init()},destroy:function(e){e.observer.destroy()}}};function O(e){var t=a(),i=o(),n=this.touchEventsData,s=this.params,r=this.touches;if(this.enabled&&(!this.animating||!s.preventInteractionOnTransition)){var l=e;l.originalEvent&&(l=l.originalEvent);var u=v(l.target);if("wrapper"!==s.touchEventsTarget||u.closest(this.wrapperEl).length)if(n.isTouchEvent="touchstart"===l.type,n.isTouchEvent||!("which"in l)||3!==l.which)if(!(!n.isTouchEvent&&"button"in l&&l.button>0))if(!n.isTouched||!n.isMoved)if(!!s.noSwipingClass&&""!==s.noSwipingClass&&l.target&&l.target.shadowRoot&&e.path&&e.path[0]&&(u=v(e.path[0])),s.noSwiping&&u.closest(s.noSwipingSelector?s.noSwipingSelector:"."+s.noSwipingClass)[0])this.allowClick=!0;else if(!s.swipeHandler||u.closest(s.swipeHandler)[0]){r.currentX="touchstart"===l.type?l.targetTouches[0].pageX:l.pageX,r.currentY="touchstart"===l.type?l.targetTouches[0].pageY:l.pageY;var d=r.currentX,c=r.currentY,h=s.edgeSwipeDetection||s.iOSEdgeSwipeDetection,p=s.edgeSwipeThreshold||s.iOSEdgeSwipeThreshold;if(h&&(d<=p||d>=i.innerWidth-p)){if("prevent"!==h)return;e.preventDefault()}if(E(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),r.startX=d,r.startY=c,n.touchStartTime=C(),this.allowClick=!0,this.updateSize(),this.swipeDirection=void 0,s.threshold>0&&(n.allowThresholdMove=!1),"touchstart"!==l.type){var f=!0;u.is(n.formElements)&&(f=!1),t.activeElement&&v(t.activeElement).is(n.formElements)&&t.activeElement!==u[0]&&t.activeElement.blur();var m=f&&this.allowTouchMove&&s.touchStartPreventDefault;!s.touchStartForcePreventDefault&&!m||u[0].isContentEditable||l.preventDefault()}this.emit("touchStart",l)}}}function I(e){var t=a(),i=this.touchEventsData,n=this.params,s=this.touches,r=this.rtlTranslate;if(this.enabled){var o=e;if(o.originalEvent&&(o=o.originalEvent),i.isTouched){if(!i.isTouchEvent||"touchmove"===o.type){var l="touchmove"===o.type&&o.targetTouches&&(o.targetTouches[0]||o.changedTouches[0]),u="touchmove"===o.type?l.pageX:o.pageX,d="touchmove"===o.type?l.pageY:o.pageY;if(o.preventedByNestedSwiper)return s.startX=u,void(s.startY=d);if(!this.allowTouchMove)return this.allowClick=!1,void(i.isTouched&&(E(s,{startX:u,startY:d,currentX:u,currentY:d}),i.touchStartTime=C()));if(i.isTouchEvent&&n.touchReleaseOnEdges&&!n.loop)if(this.isVertical()){if(d<s.startY&&this.translate<=this.maxTranslate()||d>s.startY&&this.translate>=this.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(u<s.startX&&this.translate<=this.maxTranslate()||u>s.startX&&this.translate>=this.minTranslate())return;if(i.isTouchEvent&&t.activeElement&&o.target===t.activeElement&&v(o.target).is(i.formElements))return i.isMoved=!0,void(this.allowClick=!1);if(i.allowTouchCallbacks&&this.emit("touchMove",o),!(o.targetTouches&&o.targetTouches.length>1)){s.currentX=u,s.currentY=d;var c=s.currentX-s.startX,h=s.currentY-s.startY;if(!(this.params.threshold&&Math.sqrt(Math.pow(c,2)+Math.pow(h,2))<this.params.threshold)){var p;if(void 0===i.isScrolling)this.isHorizontal()&&s.currentY===s.startY||this.isVertical()&&s.currentX===s.startX?i.isScrolling=!1:c*c+h*h>=25&&(p=180*Math.atan2(Math.abs(h),Math.abs(c))/Math.PI,i.isScrolling=this.isHorizontal()?p>n.touchAngle:90-p>n.touchAngle);if(i.isScrolling&&this.emit("touchMoveOpposite",o),void 0===i.startMoving&&(s.currentX===s.startX&&s.currentY===s.startY||(i.startMoving=!0)),i.isScrolling)i.isTouched=!1;else if(i.startMoving){this.allowClick=!1,!n.cssMode&&o.cancelable&&o.preventDefault(),n.touchMoveStopPropagation&&!n.nested&&o.stopPropagation(),i.isMoved||(n.loop&&this.loopFix(),i.startTranslate=this.getTranslate(),this.setTransition(0),this.animating&&this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),i.allowMomentumBounce=!1,!n.grabCursor||!0!==this.allowSlideNext&&!0!==this.allowSlidePrev||this.setGrabCursor(!0),this.emit("sliderFirstMove",o)),this.emit("sliderMove",o),i.isMoved=!0;var f=this.isHorizontal()?c:h;s.diff=f,f*=n.touchRatio,r&&(f=-f),this.swipeDirection=f>0?"prev":"next",i.currentTranslate=f+i.startTranslate;var m=!0,g=n.resistanceRatio;if(n.touchReleaseOnEdges&&(g=0),f>0&&i.currentTranslate>this.minTranslate()?(m=!1,n.resistance&&(i.currentTranslate=this.minTranslate()-1+Math.pow(-this.minTranslate()+i.startTranslate+f,g))):f<0&&i.currentTranslate<this.maxTranslate()&&(m=!1,n.resistance&&(i.currentTranslate=this.maxTranslate()+1-Math.pow(this.maxTranslate()-i.startTranslate-f,g))),m&&(o.preventedByNestedSwiper=!0),!this.allowSlideNext&&"next"===this.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!this.allowSlidePrev&&"prev"===this.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),this.allowSlidePrev||this.allowSlideNext||(i.currentTranslate=i.startTranslate),n.threshold>0){if(!(Math.abs(f)>n.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,s.startX=s.currentX,s.startY=s.currentY,i.currentTranslate=i.startTranslate,void(s.diff=this.isHorizontal()?s.currentX-s.startX:s.currentY-s.startY)}n.followFinger&&!n.cssMode&&((n.freeMode||n.watchSlidesProgress||n.watchSlidesVisibility)&&(this.updateActiveIndex(),this.updateSlidesClasses()),n.freeMode&&(0===i.velocities.length&&i.velocities.push({position:s[this.isHorizontal()?"startX":"startY"],time:i.touchStartTime}),i.velocities.push({position:s[this.isHorizontal()?"currentX":"currentY"],time:C()})),this.updateProgress(i.currentTranslate),this.setTranslate(i.currentTranslate))}}}}}else i.startMoving&&i.isScrolling&&this.emit("touchMoveOpposite",o)}}function z(e){var t=this,i=t.touchEventsData,n=t.params,s=t.touches,a=t.rtlTranslate,r=t.$wrapperEl,o=t.slidesGrid,l=t.snapGrid;if(t.enabled){var u=e;if(u.originalEvent&&(u=u.originalEvent),i.allowTouchCallbacks&&t.emit("touchEnd",u),i.allowTouchCallbacks=!1,!i.isTouched)return i.isMoved&&n.grabCursor&&t.setGrabCursor(!1),i.isMoved=!1,void(i.startMoving=!1);n.grabCursor&&i.isMoved&&i.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);var d,c=C(),h=c-i.touchStartTime;if(t.allowClick&&(t.updateClickedSlide(u),t.emit("tap click",u),h<300&&c-i.lastClickTime<300&&t.emit("doubleTap doubleClick",u)),i.lastClickTime=C(),x((function(){t.destroyed||(t.allowClick=!0)})),!i.isTouched||!i.isMoved||!t.swipeDirection||0===s.diff||i.currentTranslate===i.startTranslate)return i.isTouched=!1,i.isMoved=!1,void(i.startMoving=!1);if(i.isTouched=!1,i.isMoved=!1,i.startMoving=!1,d=n.followFinger?a?t.translate:-t.translate:-i.currentTranslate,!n.cssMode)if(n.freeMode){if(d<-t.minTranslate())return void t.slideTo(t.activeIndex);if(d>-t.maxTranslate())return void(t.slides.length<l.length?t.slideTo(l.length-1):t.slideTo(t.slides.length-1));if(n.freeModeMomentum){if(i.velocities.length>1){var p=i.velocities.pop(),f=i.velocities.pop(),m=p.position-f.position,v=p.time-f.time;t.velocity=m/v,t.velocity/=2,Math.abs(t.velocity)<n.freeModeMinimumVelocity&&(t.velocity=0),(v>150||C()-p.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=n.freeModeMomentumVelocityRatio,i.velocities.length=0;var g=1e3*n.freeModeMomentumRatio,y=t.velocity*g,b=t.translate+y;a&&(b=-b);var w,T,S=!1,E=20*Math.abs(t.velocity)*n.freeModeMomentumBounceRatio;if(b<t.maxTranslate())n.freeModeMomentumBounce?(b+t.maxTranslate()<-E&&(b=t.maxTranslate()-E),w=t.maxTranslate(),S=!0,i.allowMomentumBounce=!0):b=t.maxTranslate(),n.loop&&n.centeredSlides&&(T=!0);else if(b>t.minTranslate())n.freeModeMomentumBounce?(b-t.minTranslate()>E&&(b=t.minTranslate()+E),w=t.minTranslate(),S=!0,i.allowMomentumBounce=!0):b=t.minTranslate(),n.loop&&n.centeredSlides&&(T=!0);else if(n.freeModeSticky){for(var k,D=0;D<l.length;D+=1)if(l[D]>-b){k=D;break}b=-(b=Math.abs(l[k]-b)<Math.abs(l[k-1]-b)||"next"===t.swipeDirection?l[k]:l[k-1])}if(T&&t.once("transitionEnd",(function(){t.loopFix()})),0!==t.velocity){if(g=a?Math.abs((-b-t.translate)/t.velocity):Math.abs((b-t.translate)/t.velocity),n.freeModeSticky){var M=Math.abs((a?-b:b)-t.translate),_=t.slidesSizesGrid[t.activeIndex];g=M<_?n.speed:M<2*_?1.5*n.speed:2.5*n.speed}}else if(n.freeModeSticky)return void t.slideToClosest();n.freeModeMomentumBounce&&S?(t.updateProgress(w),t.setTransition(g),t.setTranslate(b),t.transitionStart(!0,t.swipeDirection),t.animating=!0,r.transitionEnd((function(){t&&!t.destroyed&&i.allowMomentumBounce&&(t.emit("momentumBounce"),t.setTransition(n.speed),setTimeout((function(){t.setTranslate(w),r.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(t.updateProgress(b),t.setTransition(g),t.setTranslate(b),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,r.transitionEnd((function(){t&&!t.destroyed&&t.transitionEnd()})))):(t.emit("_freeModeNoMomentumRelease"),t.updateProgress(b)),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(n.freeModeSticky)return void t.slideToClosest();n.freeMode&&t.emit("_freeModeNoMomentumRelease")}(!n.freeModeMomentum||h>=n.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}else{for(var $=0,P=t.slidesSizesGrid[0],L=0;L<o.length;L+=L<n.slidesPerGroupSkip?1:n.slidesPerGroup){var A=L<n.slidesPerGroupSkip-1?1:n.slidesPerGroup;void 0!==o[L+A]?d>=o[L]&&d<o[L+A]&&($=L,P=o[L+A]-o[L]):d>=o[L]&&($=L,P=o[o.length-1]-o[o.length-2])}var O=(d-o[$])/P,I=$<n.slidesPerGroupSkip-1?1:n.slidesPerGroup;if(h>n.longSwipesMs){if(!n.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(O>=n.longSwipesRatio?t.slideTo($+I):t.slideTo($)),"prev"===t.swipeDirection&&(O>1-n.longSwipesRatio?t.slideTo($+I):t.slideTo($))}else{if(!n.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(u.target===t.navigation.nextEl||u.target===t.navigation.prevEl)?u.target===t.navigation.nextEl?t.slideTo($+I):t.slideTo($):("next"===t.swipeDirection&&t.slideTo($+I),"prev"===t.swipeDirection&&t.slideTo($))}}}}function N(){var e=this.params,t=this.el;if(!t||0!==t.offsetWidth){e.breakpoints&&this.setBreakpoint();var i=this.allowSlideNext,n=this.allowSlidePrev,s=this.snapGrid;this.allowSlideNext=!0,this.allowSlidePrev=!0,this.updateSize(),this.updateSlides(),this.updateSlidesClasses(),("auto"===e.slidesPerView||e.slidesPerView>1)&&this.isEnd&&!this.isBeginning&&!this.params.centeredSlides?this.slideTo(this.slides.length-1,0,!1,!0):this.slideTo(this.activeIndex,0,!1,!0),this.autoplay&&this.autoplay.running&&this.autoplay.paused&&this.autoplay.run(),this.allowSlidePrev=n,this.allowSlideNext=i,this.params.watchOverflow&&s!==this.snapGrid&&this.checkOverflow()}}function j(e){this.enabled&&(this.allowClick||(this.params.preventClicks&&e.preventDefault(),this.params.preventClicksPropagation&&this.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function F(){var e=this.wrapperEl,t=this.rtlTranslate;if(this.enabled){this.previousTranslate=this.translate,this.isHorizontal()?this.translate=t?e.scrollWidth-e.offsetWidth-e.scrollLeft:-e.scrollLeft:this.translate=-e.scrollTop,-0===this.translate&&(this.translate=0),this.updateActiveIndex(),this.updateSlidesClasses();var i=this.maxTranslate()-this.minTranslate();(0===i?0:(this.translate-this.minTranslate())/i)!==this.progress&&this.updateProgress(t?-this.translate:this.translate),this.emit("setTranslate",this.translate,!1)}}var H=!1;function R(){}var B={init:!0,direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!1,nested:!1,enabled:!0,width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,slidesPerGroupSkip:0,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!1,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1},q={modular:{useParams:function(e){var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var n=t.modules[i];n.params&&E(e,n.params)}))},useModules:function(e){void 0===e&&(e={});var t=this;t.modules&&Object.keys(t.modules).forEach((function(i){var n=t.modules[i],s=e[i]||{};n.on&&t.on&&Object.keys(n.on).forEach((function(e){t.on(e,n.on[e])})),n.create&&n.create.bind(t)(s)}))}},eventsEmitter:{on:function(e,t,i){var n=this;if("function"!=typeof t)return n;var s=i?"unshift":"push";return e.split(" ").forEach((function(e){n.eventsListeners[e]||(n.eventsListeners[e]=[]),n.eventsListeners[e][s](t)})),n},once:function(e,t,i){var n=this;if("function"!=typeof t)return n;function s(){n.off(e,s),s.__emitterProxy&&delete s.__emitterProxy;for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];t.apply(n,a)}return s.__emitterProxy=t,n.on(e,s,i)},onAny:function(e,t){if("function"!=typeof e)return this;var i=t?"unshift":"push";return this.eventsAnyListeners.indexOf(e)<0&&this.eventsAnyListeners[i](e),this},offAny:function(e){if(!this.eventsAnyListeners)return this;var t=this.eventsAnyListeners.indexOf(e);return t>=0&&this.eventsAnyListeners.splice(t,1),this},off:function(e,t){var i=this;return i.eventsListeners?(e.split(" ").forEach((function(e){void 0===t?i.eventsListeners[e]=[]:i.eventsListeners[e]&&i.eventsListeners[e].forEach((function(n,s){(n===t||n.__emitterProxy&&n.__emitterProxy===t)&&i.eventsListeners[e].splice(s,1)}))})),i):i},emit:function(){var e,t,i,n=this;if(!n.eventsListeners)return n;for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];"string"==typeof a[0]||Array.isArray(a[0])?(e=a[0],t=a.slice(1,a.length),i=n):(e=a[0].events,t=a[0].data,i=a[0].context||n),t.unshift(i);var o=Array.isArray(e)?e:e.split(" ");return o.forEach((function(e){n.eventsAnyListeners&&n.eventsAnyListeners.length&&n.eventsAnyListeners.forEach((function(n){n.apply(i,[e].concat(t))})),n.eventsListeners&&n.eventsListeners[e]&&n.eventsListeners[e].forEach((function(e){e.apply(i,t)}))})),n}},update:{updateSize:function(){var e,t,i=this.$el;e=void 0!==this.params.width&&null!==this.params.width?this.params.width:i[0].clientWidth,t=void 0!==this.params.height&&null!==this.params.height?this.params.height:i[0].clientHeight,0===e&&this.isHorizontal()||0===t&&this.isVertical()||(e=e-parseInt(i.css("padding-left")||0,10)-parseInt(i.css("padding-right")||0,10),t=t-parseInt(i.css("padding-top")||0,10)-parseInt(i.css("padding-bottom")||0,10),Number.isNaN(e)&&(e=0),Number.isNaN(t)&&(t=0),E(this,{width:e,height:t,size:this.isHorizontal()?e:t}))},updateSlides:function(){var e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function i(e,i){return parseFloat(e.getPropertyValue(t(i))||0)}var n=e.params,s=e.$wrapperEl,a=e.size,r=e.rtlTranslate,o=e.wrongRTL,l=e.virtual&&n.virtual.enabled,u=l?e.virtual.slides.length:e.slides.length,d=s.children("."+e.params.slideClass),c=l?e.virtual.slides.length:d.length,h=[],p=[],f=[],m=n.slidesOffsetBefore;"function"==typeof m&&(m=n.slidesOffsetBefore.call(e));var v=n.slidesOffsetAfter;"function"==typeof v&&(v=n.slidesOffsetAfter.call(e));var g=e.snapGrid.length,y=e.slidesGrid.length,b=n.spaceBetween,w=-m,x=0,C=0;if(void 0!==a){var T,S;"string"==typeof b&&b.indexOf("%")>=0&&(b=parseFloat(b.replace("%",""))/100*a),e.virtualSize=-b,r?d.css({marginLeft:"",marginTop:""}):d.css({marginRight:"",marginBottom:""}),n.slidesPerColumn>1&&(T=Math.floor(c/n.slidesPerColumn)===c/e.params.slidesPerColumn?c:Math.ceil(c/n.slidesPerColumn)*n.slidesPerColumn,"auto"!==n.slidesPerView&&"row"===n.slidesPerColumnFill&&(T=Math.max(T,n.slidesPerView*n.slidesPerColumn)));for(var k,D,M,_=n.slidesPerColumn,$=T/_,P=Math.floor(c/n.slidesPerColumn),L=0;L<c;L+=1){S=0;var A=d.eq(L);if(n.slidesPerColumn>1){var O=void 0,I=void 0,z=void 0;if("row"===n.slidesPerColumnFill&&n.slidesPerGroup>1){var N=Math.floor(L/(n.slidesPerGroup*n.slidesPerColumn)),j=L-n.slidesPerColumn*n.slidesPerGroup*N,F=0===N?n.slidesPerGroup:Math.min(Math.ceil((c-N*_*n.slidesPerGroup)/_),n.slidesPerGroup);O=(I=j-(z=Math.floor(j/F))*F+N*n.slidesPerGroup)+z*T/_,A.css({"-webkit-box-ordinal-group":O,"-moz-box-ordinal-group":O,"-ms-flex-order":O,"-webkit-order":O,order:O})}else"column"===n.slidesPerColumnFill?(z=L-(I=Math.floor(L/_))*_,(I>P||I===P&&z===_-1)&&(z+=1)>=_&&(z=0,I+=1)):I=L-(z=Math.floor(L/$))*$;A.css(t("margin-top"),0!==z&&n.spaceBetween&&n.spaceBetween+"px")}if("none"!==A.css("display")){if("auto"===n.slidesPerView){var H=getComputedStyle(A[0]),R=A[0].style.transform,B=A[0].style.webkitTransform;if(R&&(A[0].style.transform="none"),B&&(A[0].style.webkitTransform="none"),n.roundLengths)S=e.isHorizontal()?A.outerWidth(!0):A.outerHeight(!0);else{var q=i(H,"width"),V=i(H,"padding-left"),W=i(H,"padding-right"),G=i(H,"margin-left"),Y=i(H,"margin-right"),X=H.getPropertyValue("box-sizing");if(X&&"border-box"===X)S=q+G+Y;else{var U=A[0],K=U.clientWidth;S=q+V+W+G+Y+(U.offsetWidth-K)}}R&&(A[0].style.transform=R),B&&(A[0].style.webkitTransform=B),n.roundLengths&&(S=Math.floor(S))}else S=(a-(n.slidesPerView-1)*b)/n.slidesPerView,n.roundLengths&&(S=Math.floor(S)),d[L]&&(d[L].style[t("width")]=S+"px");d[L]&&(d[L].swiperSlideSize=S),f.push(S),n.centeredSlides?(w=w+S/2+x/2+b,0===x&&0!==L&&(w=w-a/2-b),0===L&&(w=w-a/2-b),Math.abs(w)<.001&&(w=0),n.roundLengths&&(w=Math.floor(w)),C%n.slidesPerGroup==0&&h.push(w),p.push(w)):(n.roundLengths&&(w=Math.floor(w)),(C-Math.min(e.params.slidesPerGroupSkip,C))%e.params.slidesPerGroup==0&&h.push(w),p.push(w),w=w+S+b),e.virtualSize+=S+b,x=S,C+=1}}if(e.virtualSize=Math.max(e.virtualSize,a)+v,r&&o&&("slide"===n.effect||"coverflow"===n.effect)&&s.css({width:e.virtualSize+n.spaceBetween+"px"}),n.setWrapperSize)s.css(((D={})[t("width")]=e.virtualSize+n.spaceBetween+"px",D));if(n.slidesPerColumn>1)if(e.virtualSize=(S+n.spaceBetween)*T,e.virtualSize=Math.ceil(e.virtualSize/n.slidesPerColumn)-n.spaceBetween,s.css(((M={})[t("width")]=e.virtualSize+n.spaceBetween+"px",M)),n.centeredSlides){k=[];for(var Z=0;Z<h.length;Z+=1){var Q=h[Z];n.roundLengths&&(Q=Math.floor(Q)),h[Z]<e.virtualSize+h[0]&&k.push(Q)}h=k}if(!n.centeredSlides){k=[];for(var J=0;J<h.length;J+=1){var ee=h[J];n.roundLengths&&(ee=Math.floor(ee)),h[J]<=e.virtualSize-a&&k.push(ee)}h=k,Math.floor(e.virtualSize-a)-Math.floor(h[h.length-1])>1&&h.push(e.virtualSize-a)}if(0===h.length&&(h=[0]),0!==n.spaceBetween){var te,ie=e.isHorizontal()&&r?"marginLeft":t("marginRight");d.filter((function(e,t){return!n.cssMode||t!==d.length-1})).css(((te={})[ie]=b+"px",te))}if(n.centeredSlides&&n.centeredSlidesBounds){var ne=0;f.forEach((function(e){ne+=e+(n.spaceBetween?n.spaceBetween:0)}));var se=(ne-=n.spaceBetween)-a;h=h.map((function(e){return e<0?-m:e>se?se+v:e}))}if(n.centerInsufficientSlides){var ae=0;if(f.forEach((function(e){ae+=e+(n.spaceBetween?n.spaceBetween:0)})),(ae-=n.spaceBetween)<a){var re=(a-ae)/2;h.forEach((function(e,t){h[t]=e-re})),p.forEach((function(e,t){p[t]=e+re}))}}E(e,{slides:d,snapGrid:h,slidesGrid:p,slidesSizesGrid:f}),c!==u&&e.emit("slidesLengthChange"),h.length!==g&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),p.length!==y&&e.emit("slidesGridLengthChange"),(n.watchSlidesProgress||n.watchSlidesVisibility)&&e.updateSlidesOffset()}},updateAutoHeight:function(e){var t,i=this,n=[],s=i.virtual&&i.params.virtual.enabled,a=0;"number"==typeof e?i.setTransition(e):!0===e&&i.setTransition(i.params.speed);var r=function(e){return s?i.slides.filter((function(t){return parseInt(t.getAttribute("data-swiper-slide-index"),10)===e}))[0]:i.slides.eq(e)[0]};if("auto"!==i.params.slidesPerView&&i.params.slidesPerView>1)if(i.params.centeredSlides)i.visibleSlides.each((function(e){n.push(e)}));else for(t=0;t<Math.ceil(i.params.slidesPerView);t+=1){var o=i.activeIndex+t;if(o>i.slides.length&&!s)break;n.push(r(o))}else n.push(r(i.activeIndex));for(t=0;t<n.length;t+=1)if(void 0!==n[t]){var l=n[t].offsetHeight;a=l>a?l:a}a&&i.$wrapperEl.css("height",a+"px")},updateSlidesOffset:function(){for(var e=this.slides,t=0;t<e.length;t+=1)e[t].swiperSlideOffset=this.isHorizontal()?e[t].offsetLeft:e[t].offsetTop},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);var t=this.params,i=this.slides,n=this.rtlTranslate;if(0!==i.length){void 0===i[0].swiperSlideOffset&&this.updateSlidesOffset();var s=-e;n&&(s=e),i.removeClass(t.slideVisibleClass),this.visibleSlidesIndexes=[],this.visibleSlides=[];for(var a=0;a<i.length;a+=1){var r=i[a],o=(s+(t.centeredSlides?this.minTranslate():0)-r.swiperSlideOffset)/(r.swiperSlideSize+t.spaceBetween);if(t.watchSlidesVisibility||t.centeredSlides&&t.autoHeight){var l=-(s-r.swiperSlideOffset),u=l+this.slidesSizesGrid[a];(l>=0&&l<this.size-1||u>1&&u<=this.size||l<=0&&u>=this.size)&&(this.visibleSlides.push(r),this.visibleSlidesIndexes.push(a),i.eq(a).addClass(t.slideVisibleClass))}r.progress=n?-o:o}this.visibleSlides=v(this.visibleSlides)}},updateProgress:function(e){if(void 0===e){var t=this.rtlTranslate?-1:1;e=this&&this.translate&&this.translate*t||0}var i=this.params,n=this.maxTranslate()-this.minTranslate(),s=this.progress,a=this.isBeginning,r=this.isEnd,o=a,l=r;0===n?(s=0,a=!0,r=!0):(a=(s=(e-this.minTranslate())/n)<=0,r=s>=1),E(this,{progress:s,isBeginning:a,isEnd:r}),(i.watchSlidesProgress||i.watchSlidesVisibility||i.centeredSlides&&i.autoHeight)&&this.updateSlidesProgress(e),a&&!o&&this.emit("reachBeginning toEdge"),r&&!l&&this.emit("reachEnd toEdge"),(o&&!a||l&&!r)&&this.emit("fromEdge"),this.emit("progress",s)},updateSlidesClasses:function(){var e,t=this.slides,i=this.params,n=this.$wrapperEl,s=this.activeIndex,a=this.realIndex,r=this.virtual&&i.virtual.enabled;t.removeClass(i.slideActiveClass+" "+i.slideNextClass+" "+i.slidePrevClass+" "+i.slideDuplicateActiveClass+" "+i.slideDuplicateNextClass+" "+i.slideDuplicatePrevClass),(e=r?this.$wrapperEl.find("."+i.slideClass+'[data-swiper-slide-index="'+s+'"]'):t.eq(s)).addClass(i.slideActiveClass),i.loop&&(e.hasClass(i.slideDuplicateClass)?n.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+a+'"]').addClass(i.slideDuplicateActiveClass):n.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]').addClass(i.slideDuplicateActiveClass));var o=e.nextAll("."+i.slideClass).eq(0).addClass(i.slideNextClass);i.loop&&0===o.length&&(o=t.eq(0)).addClass(i.slideNextClass);var l=e.prevAll("."+i.slideClass).eq(0).addClass(i.slidePrevClass);i.loop&&0===l.length&&(l=t.eq(-1)).addClass(i.slidePrevClass),i.loop&&(o.hasClass(i.slideDuplicateClass)?n.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass):n.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+o.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicateNextClass),l.hasClass(i.slideDuplicateClass)?n.children("."+i.slideClass+":not(."+i.slideDuplicateClass+')[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass):n.children("."+i.slideClass+"."+i.slideDuplicateClass+'[data-swiper-slide-index="'+l.attr("data-swiper-slide-index")+'"]').addClass(i.slideDuplicatePrevClass)),this.emitSlidesClasses()},updateActiveIndex:function(e){var t,i=this.rtlTranslate?this.translate:-this.translate,n=this.slidesGrid,s=this.snapGrid,a=this.params,r=this.activeIndex,o=this.realIndex,l=this.snapIndex,u=e;if(void 0===u){for(var d=0;d<n.length;d+=1)void 0!==n[d+1]?i>=n[d]&&i<n[d+1]-(n[d+1]-n[d])/2?u=d:i>=n[d]&&i<n[d+1]&&(u=d+1):i>=n[d]&&(u=d);a.normalizeSlideIndex&&(u<0||void 0===u)&&(u=0)}if(s.indexOf(i)>=0)t=s.indexOf(i);else{var c=Math.min(a.slidesPerGroupSkip,u);t=c+Math.floor((u-c)/a.slidesPerGroup)}if(t>=s.length&&(t=s.length-1),u!==r){var h=parseInt(this.slides.eq(u).attr("data-swiper-slide-index")||u,10);E(this,{snapIndex:t,realIndex:h,previousIndex:r,activeIndex:u}),this.emit("activeIndexChange"),this.emit("snapIndexChange"),o!==h&&this.emit("realIndexChange"),(this.initialized||this.params.runCallbacksOnInit)&&this.emit("slideChange")}else t!==l&&(this.snapIndex=t,this.emit("snapIndexChange"))},updateClickedSlide:function(e){var t,i=this.params,n=v(e.target).closest("."+i.slideClass)[0],s=!1;if(n)for(var a=0;a<this.slides.length;a+=1)if(this.slides[a]===n){s=!0,t=a;break}if(!n||!s)return this.clickedSlide=void 0,void(this.clickedIndex=void 0);this.clickedSlide=n,this.virtual&&this.params.virtual.enabled?this.clickedIndex=parseInt(v(n).attr("data-swiper-slide-index"),10):this.clickedIndex=t,i.slideToClickedSlide&&void 0!==this.clickedIndex&&this.clickedIndex!==this.activeIndex&&this.slideToClickedSlide()}},translate:{getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");var t=this.params,i=this.rtlTranslate,n=this.translate,s=this.$wrapperEl;if(t.virtualTranslate)return i?-n:n;if(t.cssMode)return n;var a=T(s[0],e);return i&&(a=-a),a||0},setTranslate:function(e,t){var i=this.rtlTranslate,n=this.params,s=this.$wrapperEl,a=this.wrapperEl,r=this.progress,o=0,l=0;this.isHorizontal()?o=i?-e:e:l=e,n.roundLengths&&(o=Math.floor(o),l=Math.floor(l)),n.cssMode?a[this.isHorizontal()?"scrollLeft":"scrollTop"]=this.isHorizontal()?-o:-l:n.virtualTranslate||s.transform("translate3d("+o+"px, "+l+"px, 0px)"),this.previousTranslate=this.translate,this.translate=this.isHorizontal()?o:l;var u=this.maxTranslate()-this.minTranslate();(0===u?0:(e-this.minTranslate())/u)!==r&&this.updateProgress(e),this.emit("setTranslate",this.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,i,n,s){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0),void 0===n&&(n=!0);var a=this,r=a.params,o=a.wrapperEl;if(a.animating&&r.preventInteractionOnTransition)return!1;var l,u=a.minTranslate(),d=a.maxTranslate();if(l=n&&e>u?u:n&&e<d?d:e,a.updateProgress(l),r.cssMode){var c,h=a.isHorizontal();if(0===t)o[h?"scrollLeft":"scrollTop"]=-l;else if(o.scrollTo)o.scrollTo(((c={})[h?"left":"top"]=-l,c.behavior="smooth",c));else o[h?"scrollLeft":"scrollTop"]=-l;return!0}return 0===t?(a.setTransition(0),a.setTranslate(l),i&&(a.emit("beforeTransitionStart",t,s),a.emit("transitionEnd"))):(a.setTransition(t),a.setTranslate(l),i&&(a.emit("beforeTransitionStart",t,s),a.emit("transitionStart")),a.animating||(a.animating=!0,a.onTranslateToWrapperTransitionEnd||(a.onTranslateToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.$wrapperEl[0].removeEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.$wrapperEl[0].removeEventListener("webkitTransitionEnd",a.onTranslateToWrapperTransitionEnd),a.onTranslateToWrapperTransitionEnd=null,delete a.onTranslateToWrapperTransitionEnd,i&&a.emit("transitionEnd"))}),a.$wrapperEl[0].addEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.$wrapperEl[0].addEventListener("webkitTransitionEnd",a.onTranslateToWrapperTransitionEnd))),!0}},transition:{setTransition:function(e,t){this.params.cssMode||this.$wrapperEl.transition(e),this.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,n=this.params,s=this.previousIndex;if(!n.cssMode){n.autoHeight&&this.updateAutoHeight();var a=t;if(a||(a=i>s?"next":i<s?"prev":"reset"),this.emit("transitionStart"),e&&i!==s){if("reset"===a)return void this.emit("slideResetTransitionStart");this.emit("slideChangeTransitionStart"),"next"===a?this.emit("slideNextTransitionStart"):this.emit("slidePrevTransitionStart")}}},transitionEnd:function(e,t){void 0===e&&(e=!0);var i=this.activeIndex,n=this.previousIndex,s=this.params;if(this.animating=!1,!s.cssMode){this.setTransition(0);var a=t;if(a||(a=i>n?"next":i<n?"prev":"reset"),this.emit("transitionEnd"),e&&i!==n){if("reset"===a)return void this.emit("slideResetTransitionEnd");this.emit("slideChangeTransitionEnd"),"next"===a?this.emit("slideNextTransitionEnd"):this.emit("slidePrevTransitionEnd")}}}},slide:{slideTo:function(e,t,i,n,s){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0),"number"!=typeof e&&"string"!=typeof e)throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. ["+typeof e+"] given.");if("string"==typeof e){var a=parseInt(e,10);if(!isFinite(a))throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. ["+e+"] given.");e=a}var r=this,o=e;o<0&&(o=0);var l=r.params,u=r.snapGrid,d=r.slidesGrid,c=r.previousIndex,h=r.activeIndex,p=r.rtlTranslate,f=r.wrapperEl,m=r.enabled;if(r.animating&&l.preventInteractionOnTransition||!m&&!n&&!s)return!1;var v=Math.min(r.params.slidesPerGroupSkip,o),g=v+Math.floor((o-v)/r.params.slidesPerGroup);g>=u.length&&(g=u.length-1),(h||l.initialSlide||0)===(c||0)&&i&&r.emit("beforeSlideChangeStart");var y,b=-u[g];if(r.updateProgress(b),l.normalizeSlideIndex)for(var w=0;w<d.length;w+=1){var x=-Math.floor(100*b),C=Math.floor(100*d[w]),T=Math.floor(100*d[w+1]);void 0!==d[w+1]?x>=C&&x<T-(T-C)/2?o=w:x>=C&&x<T&&(o=w+1):x>=C&&(o=w)}if(r.initialized&&o!==h){if(!r.allowSlideNext&&b<r.translate&&b<r.minTranslate())return!1;if(!r.allowSlidePrev&&b>r.translate&&b>r.maxTranslate()&&(h||0)!==o)return!1}if(y=o>h?"next":o<h?"prev":"reset",p&&-b===r.translate||!p&&b===r.translate)return r.updateActiveIndex(o),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(b),"reset"!==y&&(r.transitionStart(i,y),r.transitionEnd(i,y)),!1;if(l.cssMode){var S,E=r.isHorizontal(),k=-b;if(p&&(k=f.scrollWidth-f.offsetWidth-k),0===t)f[E?"scrollLeft":"scrollTop"]=k;else if(f.scrollTo)f.scrollTo(((S={})[E?"left":"top"]=k,S.behavior="smooth",S));else f[E?"scrollLeft":"scrollTop"]=k;return!0}return 0===t?(r.setTransition(0),r.setTranslate(b),r.updateActiveIndex(o),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,n),r.transitionStart(i,y),r.transitionEnd(i,y)):(r.setTransition(t),r.setTranslate(b),r.updateActiveIndex(o),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,n),r.transitionStart(i,y),r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.$wrapperEl[0].removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].removeEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(i,y))}),r.$wrapperEl[0].addEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.$wrapperEl[0].addEventListener("webkitTransitionEnd",r.onSlideToWrapperTransitionEnd))),!0},slideToLoop:function(e,t,i,n){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===i&&(i=!0);var s=e;return this.params.loop&&(s+=this.loopedSlides),this.slideTo(s,t,i,n)},slideNext:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var n=this.params,s=this.animating;if(!this.enabled)return this;var a=this.activeIndex<n.slidesPerGroupSkip?1:n.slidesPerGroup;if(n.loop){if(s&&n.loopPreventsSlide)return!1;this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft}return this.slideTo(this.activeIndex+a,e,t,i)},slidePrev:function(e,t,i){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);var n=this.params,s=this.animating,a=this.snapGrid,r=this.slidesGrid,o=this.rtlTranslate;if(!this.enabled)return this;if(n.loop){if(s&&n.loopPreventsSlide)return!1;this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft}function l(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}var u=l(o?this.translate:-this.translate),d=a.map((function(e){return l(e)}));a[d.indexOf(u)];var c,h=a[d.indexOf(u)-1];return void 0===h&&n.cssMode&&a.forEach((function(e){!h&&u>=e&&(h=e)})),void 0!==h&&(c=r.indexOf(h))<0&&(c=this.activeIndex-1),this.slideTo(c,e,t,i)},slideReset:function(e,t,i){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,i)},slideToClosest:function(e,t,i,n){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===n&&(n=.5);var s=this.activeIndex,a=Math.min(this.params.slidesPerGroupSkip,s),r=a+Math.floor((s-a)/this.params.slidesPerGroup),o=this.rtlTranslate?this.translate:-this.translate;if(o>=this.snapGrid[r]){var l=this.snapGrid[r];o-l>(this.snapGrid[r+1]-l)*n&&(s+=this.params.slidesPerGroup)}else{var u=this.snapGrid[r-1];o-u<=(this.snapGrid[r]-u)*n&&(s-=this.params.slidesPerGroup)}return s=Math.max(s,0),s=Math.min(s,this.slidesGrid.length-1),this.slideTo(s,e,t,i)},slideToClickedSlide:function(){var e,t=this,i=t.params,n=t.$wrapperEl,s="auto"===i.slidesPerView?t.slidesPerViewDynamic():i.slidesPerView,a=t.clickedIndex;if(i.loop){if(t.animating)return;e=parseInt(v(t.clickedSlide).attr("data-swiper-slide-index"),10),i.centeredSlides?a<t.loopedSlides-s/2||a>t.slides.length-t.loopedSlides+s/2?(t.loopFix(),a=n.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),x((function(){t.slideTo(a)}))):t.slideTo(a):a>t.slides.length-s?(t.loopFix(),a=n.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]:not(.'+i.slideDuplicateClass+")").eq(0).index(),x((function(){t.slideTo(a)}))):t.slideTo(a)}else t.slideTo(a)}},loop:{loopCreate:function(){var e=this,t=a(),i=e.params,n=e.$wrapperEl;n.children("."+i.slideClass+"."+i.slideDuplicateClass).remove();var s=n.children("."+i.slideClass);if(i.loopFillGroupWithBlank){var r=i.slidesPerGroup-s.length%i.slidesPerGroup;if(r!==i.slidesPerGroup){for(var o=0;o<r;o+=1){var l=v(t.createElement("div")).addClass(i.slideClass+" "+i.slideBlankClass);n.append(l)}s=n.children("."+i.slideClass)}}"auto"!==i.slidesPerView||i.loopedSlides||(i.loopedSlides=s.length),e.loopedSlides=Math.ceil(parseFloat(i.loopedSlides||i.slidesPerView,10)),e.loopedSlides+=i.loopAdditionalSlides,e.loopedSlides>s.length&&(e.loopedSlides=s.length);var u=[],d=[];s.each((function(t,i){var n=v(t);i<e.loopedSlides&&d.push(t),i<s.length&&i>=s.length-e.loopedSlides&&u.push(t),n.attr("data-swiper-slide-index",i)}));for(var c=0;c<d.length;c+=1)n.append(v(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));for(var h=u.length-1;h>=0;h-=1)n.prepend(v(u[h].cloneNode(!0)).addClass(i.slideDuplicateClass))},loopFix:function(){this.emit("beforeLoopFix");var e,t=this.activeIndex,i=this.slides,n=this.loopedSlides,s=this.allowSlidePrev,a=this.allowSlideNext,r=this.snapGrid,o=this.rtlTranslate;this.allowSlidePrev=!0,this.allowSlideNext=!0;var l=-r[t]-this.getTranslate();if(t<n)e=i.length-3*n+t,e+=n,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l);else if(t>=i.length-n){e=-i.length+t+n,e+=n,this.slideTo(e,0,!1,!0)&&0!==l&&this.setTranslate((o?-this.translate:this.translate)-l)}this.allowSlidePrev=s,this.allowSlideNext=a,this.emit("loopFix")},loopDestroy:function(){var e=this.$wrapperEl,t=this.params,i=this.slides;e.children("."+t.slideClass+"."+t.slideDuplicateClass+",."+t.slideClass+"."+t.slideBlankClass).remove(),i.removeAttr("data-swiper-slide-index")}},grabCursor:{setGrabCursor:function(e){if(!(this.support.touch||!this.params.simulateTouch||this.params.watchOverflow&&this.isLocked||this.params.cssMode)){var t=this.el;t.style.cursor="move",t.style.cursor=e?"-webkit-grabbing":"-webkit-grab",t.style.cursor=e?"-moz-grabbin":"-moz-grab",t.style.cursor=e?"grabbing":"grab"}},unsetGrabCursor:function(){this.support.touch||this.params.watchOverflow&&this.isLocked||this.params.cssMode||(this.el.style.cursor="")}},manipulation:{appendSlide:function(e){var t=this.$wrapperEl,i=this.params;if(i.loop&&this.loopDestroy(),"object"==typeof e&&"length"in e)for(var n=0;n<e.length;n+=1)e[n]&&t.append(e[n]);else t.append(e);i.loop&&this.loopCreate(),i.observer&&this.support.observer||this.update()},prependSlide:function(e){var t=this.params,i=this.$wrapperEl,n=this.activeIndex;t.loop&&this.loopDestroy();var s=n+1;if("object"==typeof e&&"length"in e){for(var a=0;a<e.length;a+=1)e[a]&&i.prepend(e[a]);s=n+e.length}else i.prepend(e);t.loop&&this.loopCreate(),t.observer&&this.support.observer||this.update(),this.slideTo(s,0,!1)},addSlide:function(e,t){var i=this.$wrapperEl,n=this.params,s=this.activeIndex;n.loop&&(s-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+n.slideClass));var a=this.slides.length;if(e<=0)this.prependSlide(t);else if(e>=a)this.appendSlide(t);else{for(var r=s>e?s+1:s,o=[],l=a-1;l>=e;l-=1){var u=this.slides.eq(l);u.remove(),o.unshift(u)}if("object"==typeof t&&"length"in t){for(var d=0;d<t.length;d+=1)t[d]&&i.append(t[d]);r=s>e?s+t.length:s}else i.append(t);for(var c=0;c<o.length;c+=1)i.append(o[c]);n.loop&&this.loopCreate(),n.observer&&this.support.observer||this.update(),n.loop?this.slideTo(r+this.loopedSlides,0,!1):this.slideTo(r,0,!1)}},removeSlide:function(e){var t=this.params,i=this.$wrapperEl,n=this.activeIndex;t.loop&&(n-=this.loopedSlides,this.loopDestroy(),this.slides=i.children("."+t.slideClass));var s,a=n;if("object"==typeof e&&"length"in e){for(var r=0;r<e.length;r+=1)s=e[r],this.slides[s]&&this.slides.eq(s).remove(),s<a&&(a-=1);a=Math.max(a,0)}else s=e,this.slides[s]&&this.slides.eq(s).remove(),s<a&&(a-=1),a=Math.max(a,0);t.loop&&this.loopCreate(),t.observer&&this.support.observer||this.update(),t.loop?this.slideTo(a+this.loopedSlides,0,!1):this.slideTo(a,0,!1)},removeAllSlides:function(){for(var e=[],t=0;t<this.slides.length;t+=1)e.push(t);this.removeSlide(e)}},events:{attachEvents:function(){var e=a(),t=this.params,i=this.touchEvents,n=this.el,s=this.wrapperEl,r=this.device,o=this.support;this.onTouchStart=O.bind(this),this.onTouchMove=I.bind(this),this.onTouchEnd=z.bind(this),t.cssMode&&(this.onScroll=F.bind(this)),this.onClick=j.bind(this);var l=!!t.nested;if(!o.touch&&o.pointerEvents)n.addEventListener(i.start,this.onTouchStart,!1),e.addEventListener(i.move,this.onTouchMove,l),e.addEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var u=!("touchstart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};n.addEventListener(i.start,this.onTouchStart,u),n.addEventListener(i.move,this.onTouchMove,o.passiveListener?{passive:!1,capture:l}:l),n.addEventListener(i.end,this.onTouchEnd,u),i.cancel&&n.addEventListener(i.cancel,this.onTouchEnd,u),H||(e.addEventListener("touchstart",R),H=!0)}(t.simulateTouch&&!r.ios&&!r.android||t.simulateTouch&&!o.touch&&r.ios)&&(n.addEventListener("mousedown",this.onTouchStart,!1),e.addEventListener("mousemove",this.onTouchMove,l),e.addEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&n.addEventListener("click",this.onClick,!0),t.cssMode&&s.addEventListener("scroll",this.onScroll),t.updateOnWindowResize?this.on(r.ios||r.android?"resize orientationchange observerUpdate":"resize observerUpdate",N,!0):this.on("observerUpdate",N,!0)},detachEvents:function(){var e=a(),t=this.params,i=this.touchEvents,n=this.el,s=this.wrapperEl,r=this.device,o=this.support,l=!!t.nested;if(!o.touch&&o.pointerEvents)n.removeEventListener(i.start,this.onTouchStart,!1),e.removeEventListener(i.move,this.onTouchMove,l),e.removeEventListener(i.end,this.onTouchEnd,!1);else{if(o.touch){var u=!("onTouchStart"!==i.start||!o.passiveListener||!t.passiveListeners)&&{passive:!0,capture:!1};n.removeEventListener(i.start,this.onTouchStart,u),n.removeEventListener(i.move,this.onTouchMove,l),n.removeEventListener(i.end,this.onTouchEnd,u),i.cancel&&n.removeEventListener(i.cancel,this.onTouchEnd,u)}(t.simulateTouch&&!r.ios&&!r.android||t.simulateTouch&&!o.touch&&r.ios)&&(n.removeEventListener("mousedown",this.onTouchStart,!1),e.removeEventListener("mousemove",this.onTouchMove,l),e.removeEventListener("mouseup",this.onTouchEnd,!1))}(t.preventClicks||t.preventClicksPropagation)&&n.removeEventListener("click",this.onClick,!0),t.cssMode&&s.removeEventListener("scroll",this.onScroll),this.off(r.ios||r.android?"resize orientationchange observerUpdate":"resize observerUpdate",N)}},breakpoints:{setBreakpoint:function(){var e=this.activeIndex,t=this.initialized,i=this.loopedSlides,n=void 0===i?0:i,s=this.params,a=this.$el,r=s.breakpoints;if(r&&(!r||0!==Object.keys(r).length)){var o=this.getBreakpoint(r,this.params.breakpointsBase,this.el);if(o&&this.currentBreakpoint!==o){var l=o in r?r[o]:void 0;l&&["slidesPerView","spaceBetween","slidesPerGroup","slidesPerGroupSkip","slidesPerColumn"].forEach((function(e){var t=l[e];void 0!==t&&(l[e]="slidesPerView"!==e||"AUTO"!==t&&"auto"!==t?"slidesPerView"===e?parseFloat(t):parseInt(t,10):"auto")}));var u=l||this.originalParams,d=s.slidesPerColumn>1,c=u.slidesPerColumn>1,h=s.enabled;d&&!c?(a.removeClass(s.containerModifierClass+"multirow "+s.containerModifierClass+"multirow-column"),this.emitContainerClasses()):!d&&c&&(a.addClass(s.containerModifierClass+"multirow"),"column"===u.slidesPerColumnFill&&a.addClass(s.containerModifierClass+"multirow-column"),this.emitContainerClasses());var p=u.direction&&u.direction!==s.direction,f=s.loop&&(u.slidesPerView!==s.slidesPerView||p);p&&t&&this.changeDirection(),E(this.params,u);var m=this.params.enabled;E(this,{allowTouchMove:this.params.allowTouchMove,allowSlideNext:this.params.allowSlideNext,allowSlidePrev:this.params.allowSlidePrev}),h&&!m?this.disable():!h&&m&&this.enable(),this.currentBreakpoint=o,this.emit("_beforeBreakpoint",u),f&&t&&(this.loopDestroy(),this.loopCreate(),this.updateSlides(),this.slideTo(e-n+this.loopedSlides,0,!1)),this.emit("breakpoint",u)}}},getBreakpoint:function(e,t,i){if(void 0===t&&(t="window"),e&&("container"!==t||i)){var n=!1,s=o(),a="window"===t?s.innerWidth:i.clientWidth,r="window"===t?s.innerHeight:i.clientHeight,l=Object.keys(e).map((function(e){if("string"==typeof e&&0===e.indexOf("@")){var t=parseFloat(e.substr(1));return{value:r*t,point:e}}return{value:e,point:e}}));l.sort((function(e,t){return parseInt(e.value,10)-parseInt(t.value,10)}));for(var u=0;u<l.length;u+=1){var d=l[u],c=d.point;d.value<=a&&(n=c)}return n||"max"}}},checkOverflow:{checkOverflow:function(){var e=this.params,t=this.isLocked,i=this.slides.length>0&&e.slidesOffsetBefore+e.spaceBetween*(this.slides.length-1)+this.slides[0].offsetWidth*this.slides.length;e.slidesOffsetBefore&&e.slidesOffsetAfter&&i?this.isLocked=i<=this.size:this.isLocked=1===this.snapGrid.length,this.allowSlideNext=!this.isLocked,this.allowSlidePrev=!this.isLocked,t!==this.isLocked&&this.emit(this.isLocked?"lock":"unlock"),t&&t!==this.isLocked&&(this.isEnd=!1,this.navigation&&this.navigation.update())}},classes:{addClasses:function(){var e,t,i,n=this.classNames,s=this.params,a=this.rtl,r=this.$el,o=this.device,l=this.support,u=(e=["initialized",s.direction,{"pointer-events":l.pointerEvents&&!l.touch},{"free-mode":s.freeMode},{autoheight:s.autoHeight},{rtl:a},{multirow:s.slidesPerColumn>1},{"multirow-column":s.slidesPerColumn>1&&"column"===s.slidesPerColumnFill},{android:o.android},{ios:o.ios},{"css-mode":s.cssMode}],t=s.containerModifierClass,i=[],e.forEach((function(e){"object"==typeof e?Object.keys(e).forEach((function(n){e[n]&&i.push(t+n)})):"string"==typeof e&&i.push(t+e)})),i);n.push.apply(n,u),r.addClass([].concat(n).join(" ")),this.emitContainerClasses()},removeClasses:function(){var e=this.$el,t=this.classNames;e.removeClass(t.join(" ")),this.emitContainerClasses()}},images:{loadImage:function(e,t,i,n,s,a){var r,l=o();function u(){a&&a()}v(e).parent("picture")[0]||e.complete&&s?u():t?((r=new l.Image).onload=u,r.onerror=u,n&&(r.sizes=n),i&&(r.srcset=i),t&&(r.src=t)):u()},preloadImages:function(){var e=this;function t(){null!=e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(var i=0;i<e.imagesToLoad.length;i+=1){var n=e.imagesToLoad[i];e.loadImage(n,n.currentSrc||n.getAttribute("src"),n.srcset||n.getAttribute("srcset"),n.sizes||n.getAttribute("sizes"),!0,t)}}}},V={},W=function(){function t(){for(var e,i,n=arguments.length,s=new Array(n),a=0;a<n;a++)s[a]=arguments[a];if(1===s.length&&s[0].constructor&&"Object"===Object.prototype.toString.call(s[0]).slice(8,-1)?i=s[0]:(e=s[0],i=s[1]),i||(i={}),i=E({},i),e&&!i.el&&(i.el=e),i.el&&v(i.el).length>1){var r=[];return v(i.el).each((function(e){var n=E({},i,{el:e});r.push(new t(n))})),r}var o=this;o.__swiper__=!0,o.support=M(),o.device=_({userAgent:i.userAgent}),o.browser=$(),o.eventsListeners={},o.eventsAnyListeners=[],void 0===o.modules&&(o.modules={}),Object.keys(o.modules).forEach((function(e){var t=o.modules[e];if(t.params){var n=Object.keys(t.params)[0],s=t.params[n];if("object"!=typeof s||null===s)return;if(!(n in i)||!("enabled"in s))return;!0===i[n]&&(i[n]={enabled:!0}),"object"!=typeof i[n]||"enabled"in i[n]||(i[n].enabled=!0),i[n]||(i[n]={enabled:!1})}}));var l,u,d=E({},B);return o.useParams(d),o.params=E({},d,V,i),o.originalParams=E({},o.params),o.passedParams=E({},i),o.params&&o.params.on&&Object.keys(o.params.on).forEach((function(e){o.on(e,o.params.on[e])})),o.params&&o.params.onAny&&o.onAny(o.params.onAny),o.$=v,E(o,{enabled:o.params.enabled,el:e,classNames:[],slides:v(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:function(){return"horizontal"===o.params.direction},isVertical:function(){return"vertical"===o.params.direction},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:o.params.allowSlideNext,allowSlidePrev:o.params.allowSlidePrev,touchEvents:(l=["touchstart","touchmove","touchend","touchcancel"],u=["mousedown","mousemove","mouseup"],o.support.pointerEvents&&(u=["pointerdown","pointermove","pointerup"]),o.touchEventsTouch={start:l[0],move:l[1],end:l[2],cancel:l[3]},o.touchEventsDesktop={start:u[0],move:u[1],end:u[2]},o.support.touch||!o.params.simulateTouch?o.touchEventsTouch:o.touchEventsDesktop),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,formElements:"input, select, option, textarea, button, video, label",lastClickTime:C(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:o.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),o.useModules(),o.emit("_swiper"),o.params.init&&o.init(),o}var i,n,s,a=t.prototype;return a.enable=function(){this.enabled||(this.enabled=!0,this.params.grabCursor&&this.setGrabCursor(),this.emit("enable"))},a.disable=function(){this.enabled&&(this.enabled=!1,this.params.grabCursor&&this.unsetGrabCursor(),this.emit("disable"))},a.setProgress=function(e,t){e=Math.min(Math.max(e,0),1);var i=this.minTranslate(),n=(this.maxTranslate()-i)*e+i;this.translateTo(n,void 0===t?0:t),this.updateActiveIndex(),this.updateSlidesClasses()},a.emitContainerClasses=function(){var e=this;if(e.params._emitClasses&&e.el){var t=e.el.className.split(" ").filter((function(t){return 0===t.indexOf("swiper-container")||0===t.indexOf(e.params.containerModifierClass)}));e.emit("_containerClasses",t.join(" "))}},a.getSlideClasses=function(e){var t=this;return e.className.split(" ").filter((function(e){return 0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass)})).join(" ")},a.emitSlidesClasses=function(){var e=this;if(e.params._emitClasses&&e.el){var t=[];e.slides.each((function(i){var n=e.getSlideClasses(i);t.push({slideEl:i,classNames:n}),e.emit("_slideClass",i,n)})),e.emit("_slideClasses",t)}},a.slidesPerViewDynamic=function(){var e=this.params,t=this.slides,i=this.slidesGrid,n=this.size,s=this.activeIndex,a=1;if(e.centeredSlides){for(var r,o=t[s].swiperSlideSize,l=s+1;l<t.length;l+=1)t[l]&&!r&&(a+=1,(o+=t[l].swiperSlideSize)>n&&(r=!0));for(var u=s-1;u>=0;u-=1)t[u]&&!r&&(a+=1,(o+=t[u].swiperSlideSize)>n&&(r=!0))}else for(var d=s+1;d<t.length;d+=1)i[d]-i[s]<n&&(a+=1);return a},a.update=function(){var e=this;if(e&&!e.destroyed){var t=e.snapGrid,i=e.params;i.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode?(n(),e.params.autoHeight&&e.updateAutoHeight()):(("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0))||n(),i.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}function n(){var t=e.rtlTranslate?-1*e.translate:e.translate,i=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(i),e.updateActiveIndex(),e.updateSlidesClasses()}},a.changeDirection=function(e,t){void 0===t&&(t=!0);var i=this.params.direction;return e||(e="horizontal"===i?"vertical":"horizontal"),e===i||"horizontal"!==e&&"vertical"!==e||(this.$el.removeClass(""+this.params.containerModifierClass+i).addClass(""+this.params.containerModifierClass+e),this.emitContainerClasses(),this.params.direction=e,this.slides.each((function(t){"vertical"===e?t.style.width="":t.style.height=""})),this.emit("changeDirection"),t&&this.update()),this},a.mount=function(e){if(this.mounted)return!0;var t,i=v(e||this.params.el);return!!(e=i[0])&&(e.swiper=this,e&&e.shadowRoot&&e.shadowRoot.querySelector?(t=v(e.shadowRoot.querySelector("."+this.params.wrapperClass))).children=function(e){return i.children(e)}:t=i.children("."+this.params.wrapperClass),E(this,{$el:i,el:e,$wrapperEl:t,wrapperEl:t[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===i.css("direction"),rtlTranslate:"horizontal"===this.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===i.css("direction")),wrongRTL:"-webkit-box"===t.css("display")}),!0)},a.init=function(e){return this.initialized||!1===this.mount(e)||(this.emit("beforeInit"),this.params.breakpoints&&this.setBreakpoint(),this.addClasses(),this.params.loop&&this.loopCreate(),this.updateSize(),this.updateSlides(),this.params.watchOverflow&&this.checkOverflow(),this.params.grabCursor&&this.enabled&&this.setGrabCursor(),this.params.preloadImages&&this.preloadImages(),this.params.loop?this.slideTo(this.params.initialSlide+this.loopedSlides,0,this.params.runCallbacksOnInit,!1,!0):this.slideTo(this.params.initialSlide,0,this.params.runCallbacksOnInit,!1,!0),this.attachEvents(),this.initialized=!0,this.emit("init"),this.emit("afterInit")),this},a.destroy=function(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);var i,n=this,s=n.params,a=n.$el,r=n.$wrapperEl,o=n.slides;return void 0===n.params||n.destroyed||(n.emit("beforeDestroy"),n.initialized=!1,n.detachEvents(),s.loop&&n.loopDestroy(),t&&(n.removeClasses(),a.removeAttr("style"),r.removeAttr("style"),o&&o.length&&o.removeClass([s.slideVisibleClass,s.slideActiveClass,s.slideNextClass,s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),n.emit("destroy"),Object.keys(n.eventsListeners).forEach((function(e){n.off(e)})),!1!==e&&(n.$el[0].swiper=null,i=n,Object.keys(i).forEach((function(e){try{i[e]=null}catch(e){}try{delete i[e]}catch(e){}}))),n.destroyed=!0),null},t.extendDefaults=function(e){E(V,e)},t.installModule=function(e){t.prototype.modules||(t.prototype.modules={});var i=e.name||Object.keys(t.prototype.modules).length+"_"+C();t.prototype.modules[i]=e},t.use=function(e){return Array.isArray(e)?(e.forEach((function(e){return t.installModule(e)})),t):(t.installModule(e),t)},i=t,s=[{key:"extendedDefaults",get:function(){return V}},{key:"defaults",get:function(){return B}}],(n=null)&&e(i.prototype,n),s&&e(i,s),t}();Object.keys(q).forEach((function(e){Object.keys(q[e]).forEach((function(t){W.prototype[t]=q[e][t]}))})),W.use([P,A]);var G={update:function(e){var t=this,i=t.params,n=i.slidesPerView,s=i.slidesPerGroup,a=i.centeredSlides,r=t.params.virtual,o=r.addSlidesBefore,l=r.addSlidesAfter,u=t.virtual,d=u.from,c=u.to,h=u.slides,p=u.slidesGrid,f=u.renderSlide,m=u.offset;t.updateActiveIndex();var v,g,y,b=t.activeIndex||0;v=t.rtlTranslate?"right":t.isHorizontal()?"left":"top",a?(g=Math.floor(n/2)+s+l,y=Math.floor(n/2)+s+o):(g=n+(s-1)+l,y=s+o);var w=Math.max((b||0)-y,0),x=Math.min((b||0)+g,h.length-1),C=(t.slidesGrid[w]||0)-(t.slidesGrid[0]||0);function T(){t.updateSlides(),t.updateProgress(),t.updateSlidesClasses(),t.lazy&&t.params.lazy.enabled&&t.lazy.load()}if(E(t.virtual,{from:w,to:x,offset:C,slidesGrid:t.slidesGrid}),d===w&&c===x&&!e)return t.slidesGrid!==p&&C!==m&&t.slides.css(v,C+"px"),void t.updateProgress();if(t.params.virtual.renderExternal)return t.params.virtual.renderExternal.call(t,{offset:C,from:w,to:x,slides:function(){for(var e=[],t=w;t<=x;t+=1)e.push(h[t]);return e}()}),void(t.params.virtual.renderExternalUpdate&&T());var S=[],k=[];if(e)t.$wrapperEl.find("."+t.params.slideClass).remove();else for(var D=d;D<=c;D+=1)(D<w||D>x)&&t.$wrapperEl.find("."+t.params.slideClass+'[data-swiper-slide-index="'+D+'"]').remove();for(var M=0;M<h.length;M+=1)M>=w&&M<=x&&(void 0===c||e?k.push(M):(M>c&&k.push(M),M<d&&S.push(M)));k.forEach((function(e){t.$wrapperEl.append(f(h[e],e))})),S.sort((function(e,t){return t-e})).forEach((function(e){t.$wrapperEl.prepend(f(h[e],e))})),t.$wrapperEl.children(".swiper-slide").css(v,C+"px"),T()},renderSlide:function(e,t){var i=this.params.virtual;if(i.cache&&this.virtual.cache[t])return this.virtual.cache[t];var n=i.renderSlide?v(i.renderSlide.call(this,e,t)):v('<div class="'+this.params.slideClass+'" data-swiper-slide-index="'+t+'">'+e+"</div>");return n.attr("data-swiper-slide-index")||n.attr("data-swiper-slide-index",t),i.cache&&(this.virtual.cache[t]=n),n},appendSlide:function(e){if("object"==typeof e&&"length"in e)for(var t=0;t<e.length;t+=1)e[t]&&this.virtual.slides.push(e[t]);else this.virtual.slides.push(e);this.virtual.update(!0)},prependSlide:function(e){var t=this.activeIndex,i=t+1,n=1;if(Array.isArray(e)){for(var s=0;s<e.length;s+=1)e[s]&&this.virtual.slides.unshift(e[s]);i=t+e.length,n=e.length}else this.virtual.slides.unshift(e);if(this.params.virtual.cache){var a=this.virtual.cache,r={};Object.keys(a).forEach((function(e){var t=a[e],i=t.attr("data-swiper-slide-index");i&&t.attr("data-swiper-slide-index",parseInt(i,10)+1),r[parseInt(e,10)+n]=t})),this.virtual.cache=r}this.virtual.update(!0),this.slideTo(i,0)},removeSlide:function(e){if(null!=e){var t=this.activeIndex;if(Array.isArray(e))for(var i=e.length-1;i>=0;i-=1)this.virtual.slides.splice(e[i],1),this.params.virtual.cache&&delete this.virtual.cache[e[i]],e[i]<t&&(t-=1),t=Math.max(t,0);else this.virtual.slides.splice(e,1),this.params.virtual.cache&&delete this.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);this.virtual.update(!0),this.slideTo(t,0)}},removeAllSlides:function(){this.virtual.slides=[],this.params.virtual.cache&&(this.virtual.cache={}),this.virtual.update(!0),this.slideTo(0,0)}},Y={name:"virtual",params:{virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}},create:function(){k(this,{virtual:t({},G,{slides:this.params.virtual.slides,cache:{}})})},on:{beforeInit:function(e){if(e.params.virtual.enabled){e.classNames.push(e.params.containerModifierClass+"virtual");var t={watchSlidesProgress:!0};E(e.params,t),E(e.originalParams,t),e.params.initialSlide||e.virtual.update()}},setTranslate:function(e){e.params.virtual.enabled&&e.virtual.update()}}},X={handle:function(e){if(this.enabled){var t=o(),i=a(),n=this.rtlTranslate,s=e;s.originalEvent&&(s=s.originalEvent);var r=s.keyCode||s.charCode,l=this.params.keyboard.pageUpDown,u=l&&33===r,d=l&&34===r,c=37===r,h=39===r,p=38===r,f=40===r;if(!this.allowSlideNext&&(this.isHorizontal()&&h||this.isVertical()&&f||d))return!1;if(!this.allowSlidePrev&&(this.isHorizontal()&&c||this.isVertical()&&p||u))return!1;if(!(s.shiftKey||s.altKey||s.ctrlKey||s.metaKey||i.activeElement&&i.activeElement.nodeName&&("input"===i.activeElement.nodeName.toLowerCase()||"textarea"===i.activeElement.nodeName.toLowerCase()))){if(this.params.keyboard.onlyInViewport&&(u||d||c||h||p||f)){var m=!1;if(this.$el.parents("."+this.params.slideClass).length>0&&0===this.$el.parents("."+this.params.slideActiveClass).length)return;var v=this.$el,g=v[0].clientWidth,y=v[0].clientHeight,b=t.innerWidth,w=t.innerHeight,x=this.$el.offset();n&&(x.left-=this.$el[0].scrollLeft);for(var C=[[x.left,x.top],[x.left+g,x.top],[x.left,x.top+y],[x.left+g,x.top+y]],T=0;T<C.length;T+=1){var S=C[T];if(S[0]>=0&&S[0]<=b&&S[1]>=0&&S[1]<=w){if(0===S[0]&&0===S[1])continue;m=!0}}if(!m)return}this.isHorizontal()?((u||d||c||h)&&(s.preventDefault?s.preventDefault():s.returnValue=!1),((d||h)&&!n||(u||c)&&n)&&this.slideNext(),((u||c)&&!n||(d||h)&&n)&&this.slidePrev()):((u||d||p||f)&&(s.preventDefault?s.preventDefault():s.returnValue=!1),(d||f)&&this.slideNext(),(u||p)&&this.slidePrev()),this.emit("keyPress",r)}}},enable:function(){var e=a();this.keyboard.enabled||(v(e).on("keydown",this.keyboard.handle),this.keyboard.enabled=!0)},disable:function(){var e=a();this.keyboard.enabled&&(v(e).off("keydown",this.keyboard.handle),this.keyboard.enabled=!1)}},U={name:"keyboard",params:{keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}},create:function(){k(this,{keyboard:t({enabled:!1},X)})},on:{init:function(e){e.params.keyboard.enabled&&e.keyboard.enable()},destroy:function(e){e.keyboard.enabled&&e.keyboard.disable()}}};var K={lastScrollTime:C(),lastEventBeforeSnap:void 0,recentWheelEvents:[],event:function(){return o().navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var e=a(),t="onwheel"in e;if(!t){var i=e.createElement("div");i.setAttribute("onwheel","return;"),t="function"==typeof i.onwheel}return!t&&e.implementation&&e.implementation.hasFeature&&!0!==e.implementation.hasFeature("","")&&(t=e.implementation.hasFeature("Events.wheel","3.0")),t}()?"wheel":"mousewheel"},normalize:function(e){var t=0,i=0,n=0,s=0;return"detail"in e&&(i=e.detail),"wheelDelta"in e&&(i=-e.wheelDelta/120),"wheelDeltaY"in e&&(i=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=i,i=0),n=10*t,s=10*i,"deltaY"in e&&(s=e.deltaY),"deltaX"in e&&(n=e.deltaX),e.shiftKey&&!n&&(n=s,s=0),(n||s)&&e.deltaMode&&(1===e.deltaMode?(n*=40,s*=40):(n*=800,s*=800)),n&&!t&&(t=n<1?-1:1),s&&!i&&(i=s<1?-1:1),{spinX:t,spinY:i,pixelX:n,pixelY:s}},handleMouseEnter:function(){this.enabled&&(this.mouseEntered=!0)},handleMouseLeave:function(){this.enabled&&(this.mouseEntered=!1)},handle:function(e){var t=e,i=this;if(i.enabled){var n=i.params.mousewheel;i.params.cssMode&&t.preventDefault();var s=i.$el;if("container"!==i.params.mousewheel.eventsTarget&&(s=v(i.params.mousewheel.eventsTarget)),!i.mouseEntered&&!s[0].contains(t.target)&&!n.releaseOnEdges)return!0;t.originalEvent&&(t=t.originalEvent);var a=0,r=i.rtlTranslate?-1:1,o=K.normalize(t);if(n.forceToAxis)if(i.isHorizontal()){if(!(Math.abs(o.pixelX)>Math.abs(o.pixelY)))return!0;a=-o.pixelX*r}else{if(!(Math.abs(o.pixelY)>Math.abs(o.pixelX)))return!0;a=-o.pixelY}else a=Math.abs(o.pixelX)>Math.abs(o.pixelY)?-o.pixelX*r:-o.pixelY;if(0===a)return!0;n.invert&&(a=-a);var l=i.getTranslate()+a*n.sensitivity;if(l>=i.minTranslate()&&(l=i.minTranslate()),l<=i.maxTranslate()&&(l=i.maxTranslate()),(!!i.params.loop||!(l===i.minTranslate()||l===i.maxTranslate()))&&i.params.nested&&t.stopPropagation(),i.params.freeMode){var u={time:C(),delta:Math.abs(a),direction:Math.sign(a)},d=i.mousewheel.lastEventBeforeSnap,c=d&&u.time<d.time+500&&u.delta<=d.delta&&u.direction===d.direction;if(!c){i.mousewheel.lastEventBeforeSnap=void 0,i.params.loop&&i.loopFix();var h=i.getTranslate()+a*n.sensitivity,p=i.isBeginning,f=i.isEnd;if(h>=i.minTranslate()&&(h=i.minTranslate()),h<=i.maxTranslate()&&(h=i.maxTranslate()),i.setTransition(0),i.setTranslate(h),i.updateProgress(),i.updateActiveIndex(),i.updateSlidesClasses(),(!p&&i.isBeginning||!f&&i.isEnd)&&i.updateSlidesClasses(),i.params.freeModeSticky){clearTimeout(i.mousewheel.timeout),i.mousewheel.timeout=void 0;var m=i.mousewheel.recentWheelEvents;m.length>=15&&m.shift();var g=m.length?m[m.length-1]:void 0,y=m[0];if(m.push(u),g&&(u.delta>g.delta||u.direction!==g.direction))m.splice(0);else if(m.length>=15&&u.time-y.time<500&&y.delta-u.delta>=1&&u.delta<=6){var b=a>0?.8:.2;i.mousewheel.lastEventBeforeSnap=u,m.splice(0),i.mousewheel.timeout=x((function(){i.slideToClosest(i.params.speed,!0,void 0,b)}),0)}i.mousewheel.timeout||(i.mousewheel.timeout=x((function(){i.mousewheel.lastEventBeforeSnap=u,m.splice(0),i.slideToClosest(i.params.speed,!0,void 0,.5)}),500))}if(c||i.emit("scroll",t),i.params.autoplay&&i.params.autoplayDisableOnInteraction&&i.autoplay.stop(),h===i.minTranslate()||h===i.maxTranslate())return!0}}else{var w={time:C(),delta:Math.abs(a),direction:Math.sign(a),raw:e},T=i.mousewheel.recentWheelEvents;T.length>=2&&T.shift();var S=T.length?T[T.length-1]:void 0;if(T.push(w),S?(w.direction!==S.direction||w.delta>S.delta||w.time>S.time+150)&&i.mousewheel.animateSlider(w):i.mousewheel.animateSlider(w),i.mousewheel.releaseScroll(w))return!0}return t.preventDefault?t.preventDefault():t.returnValue=!1,!1}},animateSlider:function(e){var t=o();return!(this.params.mousewheel.thresholdDelta&&e.delta<this.params.mousewheel.thresholdDelta)&&(!(this.params.mousewheel.thresholdTime&&C()-this.mousewheel.lastScrollTime<this.params.mousewheel.thresholdTime)&&(e.delta>=6&&C()-this.mousewheel.lastScrollTime<60||(e.direction<0?this.isEnd&&!this.params.loop||this.animating||(this.slideNext(),this.emit("scroll",e.raw)):this.isBeginning&&!this.params.loop||this.animating||(this.slidePrev(),this.emit("scroll",e.raw)),this.mousewheel.lastScrollTime=(new t.Date).getTime(),!1)))},releaseScroll:function(e){var t=this.params.mousewheel;if(e.direction<0){if(this.isEnd&&!this.params.loop&&t.releaseOnEdges)return!0}else if(this.isBeginning&&!this.params.loop&&t.releaseOnEdges)return!0;return!1},enable:function(){var e=K.event();if(this.params.cssMode)return this.wrapperEl.removeEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarget&&(t=v(this.params.mousewheel.eventsTarget)),t.on("mouseenter",this.mousewheel.handleMouseEnter),t.on("mouseleave",this.mousewheel.handleMouseLeave),t.on(e,this.mousewheel.handle),this.mousewheel.enabled=!0,!0},disable:function(){var e=K.event();if(this.params.cssMode)return this.wrapperEl.addEventListener(e,this.mousewheel.handle),!0;if(!e)return!1;if(!this.mousewheel.enabled)return!1;var t=this.$el;return"container"!==this.params.mousewheel.eventsTarget&&(t=v(this.params.mousewheel.eventsTarget)),t.off(e,this.mousewheel.handle),this.mousewheel.enabled=!1,!0}},Z={toggleEl:function(e,t){e[t?"addClass":"removeClass"](this.params.navigation.disabledClass),e[0]&&"BUTTON"===e[0].tagName&&(e[0].disabled=t)},update:function(){var e=this.params.navigation,t=this.navigation.toggleEl;if(!this.params.loop){var i=this.navigation,n=i.$nextEl,s=i.$prevEl;s&&s.length>0&&(this.isBeginning?t(s,!0):t(s,!1),this.params.watchOverflow&&this.enabled&&s[this.isLocked?"addClass":"removeClass"](e.lockClass)),n&&n.length>0&&(this.isEnd?t(n,!0):t(n,!1),this.params.watchOverflow&&this.enabled&&n[this.isLocked?"addClass":"removeClass"](e.lockClass))}},onPrevClick:function(e){e.preventDefault(),this.isBeginning&&!this.params.loop||this.slidePrev()},onNextClick:function(e){e.preventDefault(),this.isEnd&&!this.params.loop||this.slideNext()},init:function(){var e,t,i=this.params.navigation;(i.nextEl||i.prevEl)&&(i.nextEl&&(e=v(i.nextEl),this.params.uniqueNavElements&&"string"==typeof i.nextEl&&e.length>1&&1===this.$el.find(i.nextEl).length&&(e=this.$el.find(i.nextEl))),i.prevEl&&(t=v(i.prevEl),this.params.uniqueNavElements&&"string"==typeof i.prevEl&&t.length>1&&1===this.$el.find(i.prevEl).length&&(t=this.$el.find(i.prevEl))),e&&e.length>0&&e.on("click",this.navigation.onNextClick),t&&t.length>0&&t.on("click",this.navigation.onPrevClick),E(this.navigation,{$nextEl:e,nextEl:e&&e[0],$prevEl:t,prevEl:t&&t[0]}),this.enabled||(e&&e.addClass(i.lockClass),t&&t.addClass(i.lockClass)))},destroy:function(){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;t&&t.length&&(t.off("click",this.navigation.onNextClick),t.removeClass(this.params.navigation.disabledClass)),i&&i.length&&(i.off("click",this.navigation.onPrevClick),i.removeClass(this.params.navigation.disabledClass))}},Q={update:function(){var e=this.rtl,t=this.params.pagination;if(t.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var i,n=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,s=this.pagination.$el,a=this.params.loop?Math.ceil((n-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length;if(this.params.loop?((i=Math.ceil((this.activeIndex-this.loopedSlides)/this.params.slidesPerGroup))>n-1-2*this.loopedSlides&&(i-=n-2*this.loopedSlides),i>a-1&&(i-=a),i<0&&"bullets"!==this.params.paginationType&&(i=a+i)):i=void 0!==this.snapIndex?this.snapIndex:this.activeIndex||0,"bullets"===t.type&&this.pagination.bullets&&this.pagination.bullets.length>0){var r,o,l,u=this.pagination.bullets;if(t.dynamicBullets&&(this.pagination.bulletSize=u.eq(0)[this.isHorizontal()?"outerWidth":"outerHeight"](!0),s.css(this.isHorizontal()?"width":"height",this.pagination.bulletSize*(t.dynamicMainBullets+4)+"px"),t.dynamicMainBullets>1&&void 0!==this.previousIndex&&(this.pagination.dynamicBulletIndex+=i-this.previousIndex,this.pagination.dynamicBulletIndex>t.dynamicMainBullets-1?this.pagination.dynamicBulletIndex=t.dynamicMainBullets-1:this.pagination.dynamicBulletIndex<0&&(this.pagination.dynamicBulletIndex=0)),r=i-this.pagination.dynamicBulletIndex,l=((o=r+(Math.min(u.length,t.dynamicMainBullets)-1))+r)/2),u.removeClass(t.bulletActiveClass+" "+t.bulletActiveClass+"-next "+t.bulletActiveClass+"-next-next "+t.bulletActiveClass+"-prev "+t.bulletActiveClass+"-prev-prev "+t.bulletActiveClass+"-main"),s.length>1)u.each((function(e){var n=v(e),s=n.index();s===i&&n.addClass(t.bulletActiveClass),t.dynamicBullets&&(s>=r&&s<=o&&n.addClass(t.bulletActiveClass+"-main"),s===r&&n.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),s===o&&n.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next"))}));else{var d=u.eq(i),c=d.index();if(d.addClass(t.bulletActiveClass),t.dynamicBullets){for(var h=u.eq(r),p=u.eq(o),f=r;f<=o;f+=1)u.eq(f).addClass(t.bulletActiveClass+"-main");if(this.params.loop)if(c>=u.length-t.dynamicMainBullets){for(var m=t.dynamicMainBullets;m>=0;m-=1)u.eq(u.length-m).addClass(t.bulletActiveClass+"-main");u.eq(u.length-t.dynamicMainBullets-1).addClass(t.bulletActiveClass+"-prev")}else h.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),p.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next");else h.prev().addClass(t.bulletActiveClass+"-prev").prev().addClass(t.bulletActiveClass+"-prev-prev"),p.next().addClass(t.bulletActiveClass+"-next").next().addClass(t.bulletActiveClass+"-next-next")}}if(t.dynamicBullets){var g=Math.min(u.length,t.dynamicMainBullets+4),y=(this.pagination.bulletSize*g-this.pagination.bulletSize)/2-l*this.pagination.bulletSize,b=e?"right":"left";u.css(this.isHorizontal()?b:"top",y+"px")}}if("fraction"===t.type&&(s.find(D(t.currentClass)).text(t.formatFractionCurrent(i+1)),s.find(D(t.totalClass)).text(t.formatFractionTotal(a))),"progressbar"===t.type){var w;w=t.progressbarOpposite?this.isHorizontal()?"vertical":"horizontal":this.isHorizontal()?"horizontal":"vertical";var x=(i+1)/a,C=1,T=1;"horizontal"===w?C=x:T=x,s.find(D(t.progressbarFillClass)).transform("translate3d(0,0,0) scaleX("+C+") scaleY("+T+")").transition(this.params.speed)}"custom"===t.type&&t.renderCustom?(s.html(t.renderCustom(this,i+1,a)),this.emit("paginationRender",s[0])):this.emit("paginationUpdate",s[0]),this.params.watchOverflow&&this.enabled&&s[this.isLocked?"addClass":"removeClass"](t.lockClass)}},render:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.virtual&&this.params.virtual.enabled?this.virtual.slides.length:this.slides.length,i=this.pagination.$el,n="";if("bullets"===e.type){var s=this.params.loop?Math.ceil((t-2*this.loopedSlides)/this.params.slidesPerGroup):this.snapGrid.length;this.params.freeMode&&!this.params.loop&&s>t&&(s=t);for(var a=0;a<s;a+=1)e.renderBullet?n+=e.renderBullet.call(this,a,e.bulletClass):n+="<"+e.bulletElement+' class="'+e.bulletClass+'"></'+e.bulletElement+">";i.html(n),this.pagination.bullets=i.find(D(e.bulletClass))}"fraction"===e.type&&(n=e.renderFraction?e.renderFraction.call(this,e.currentClass,e.totalClass):'<span class="'+e.currentClass+'"></span> / <span class="'+e.totalClass+'"></span>',i.html(n)),"progressbar"===e.type&&(n=e.renderProgressbar?e.renderProgressbar.call(this,e.progressbarFillClass):'<span class="'+e.progressbarFillClass+'"></span>',i.html(n)),"custom"!==e.type&&this.emit("paginationRender",this.pagination.$el[0])}},init:function(){var e=this,t=e.params.pagination;if(t.el){var i=v(t.el);0!==i.length&&(e.params.uniqueNavElements&&"string"==typeof t.el&&i.length>1&&(i=e.$el.find(t.el)),"bullets"===t.type&&t.clickable&&i.addClass(t.clickableClass),i.addClass(t.modifierClass+t.type),"bullets"===t.type&&t.dynamicBullets&&(i.addClass(""+t.modifierClass+t.type+"-dynamic"),e.pagination.dynamicBulletIndex=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&i.addClass(t.progressbarOppositeClass),t.clickable&&i.on("click",D(t.bulletClass),(function(t){t.preventDefault();var i=v(this).index()*e.params.slidesPerGroup;e.params.loop&&(i+=e.loopedSlides),e.slideTo(i)})),E(e.pagination,{$el:i,el:i[0]}),e.enabled||i.addClass(t.lockClass))}},destroy:function(){var e=this.params.pagination;if(e.el&&this.pagination.el&&this.pagination.$el&&0!==this.pagination.$el.length){var t=this.pagination.$el;t.removeClass(e.hiddenClass),t.removeClass(e.modifierClass+e.type),this.pagination.bullets&&this.pagination.bullets.removeClass(e.bulletActiveClass),e.clickable&&t.off("click",D(e.bulletClass))}}},J={setTranslate:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=this.rtlTranslate,i=this.progress,n=e.dragSize,s=e.trackSize,a=e.$dragEl,r=e.$el,o=this.params.scrollbar,l=n,u=(s-n)*i;t?(u=-u)>0?(l=n-u,u=0):-u+n>s&&(l=s+u):u<0?(l=n+u,u=0):u+n>s&&(l=s-u),this.isHorizontal()?(a.transform("translate3d("+u+"px, 0, 0)"),a[0].style.width=l+"px"):(a.transform("translate3d(0px, "+u+"px, 0)"),a[0].style.height=l+"px"),o.hide&&(clearTimeout(this.scrollbar.timeout),r[0].style.opacity=1,this.scrollbar.timeout=setTimeout((function(){r[0].style.opacity=0,r.transition(400)}),1e3))}},setTransition:function(e){this.params.scrollbar.el&&this.scrollbar.el&&this.scrollbar.$dragEl.transition(e)},updateSize:function(){if(this.params.scrollbar.el&&this.scrollbar.el){var e=this.scrollbar,t=e.$dragEl,i=e.$el;t[0].style.width="",t[0].style.height="";var n,s=this.isHorizontal()?i[0].offsetWidth:i[0].offsetHeight,a=this.size/this.virtualSize,r=a*(s/this.size);n="auto"===this.params.scrollbar.dragSize?s*a:parseInt(this.params.scrollbar.dragSize,10),this.isHorizontal()?t[0].style.width=n+"px":t[0].style.height=n+"px",i[0].style.display=a>=1?"none":"",this.params.scrollbar.hide&&(i[0].style.opacity=0),E(e,{trackSize:s,divider:a,moveDivider:r,dragSize:n}),this.params.watchOverflow&&this.enabled&&e.$el[this.isLocked?"addClass":"removeClass"](this.params.scrollbar.lockClass)}},getPointerPosition:function(e){return this.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientX:e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].clientY:e.clientY},setDragPosition:function(e){var t,i=this.scrollbar,n=this.rtlTranslate,s=i.$el,a=i.dragSize,r=i.trackSize,o=i.dragStartPos;t=(i.getPointerPosition(e)-s.offset()[this.isHorizontal()?"left":"top"]-(null!==o?o:a/2))/(r-a),t=Math.max(Math.min(t,1),0),n&&(t=1-t);var l=this.minTranslate()+(this.maxTranslate()-this.minTranslate())*t;this.updateProgress(l),this.setTranslate(l),this.updateActiveIndex(),this.updateSlidesClasses()},onDragStart:function(e){var t=this.params.scrollbar,i=this.scrollbar,n=this.$wrapperEl,s=i.$el,a=i.$dragEl;this.scrollbar.isTouched=!0,this.scrollbar.dragStartPos=e.target===a[0]||e.target===a?i.getPointerPosition(e)-e.target.getBoundingClientRect()[this.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),n.transition(100),a.transition(100),i.setDragPosition(e),clearTimeout(this.scrollbar.dragTimeout),s.transition(0),t.hide&&s.css("opacity",1),this.params.cssMode&&this.$wrapperEl.css("scroll-snap-type","none"),this.emit("scrollbarDragStart",e)},onDragMove:function(e){var t=this.scrollbar,i=this.$wrapperEl,n=t.$el,s=t.$dragEl;this.scrollbar.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,t.setDragPosition(e),i.transition(0),n.transition(0),s.transition(0),this.emit("scrollbarDragMove",e))},onDragEnd:function(e){var t=this.params.scrollbar,i=this.scrollbar,n=this.$wrapperEl,s=i.$el;this.scrollbar.isTouched&&(this.scrollbar.isTouched=!1,this.params.cssMode&&(this.$wrapperEl.css("scroll-snap-type",""),n.transition("")),t.hide&&(clearTimeout(this.scrollbar.dragTimeout),this.scrollbar.dragTimeout=x((function(){s.css("opacity",0),s.transition(400)}),1e3)),this.emit("scrollbarDragEnd",e),t.snapOnRelease&&this.slideToClosest())},enableDraggable:function(){if(this.params.scrollbar.el){var e=a(),t=this.scrollbar,i=this.touchEventsTouch,n=this.touchEventsDesktop,s=this.params,r=this.support,o=t.$el[0],l=!(!r.passiveListener||!s.passiveListeners)&&{passive:!1,capture:!1},u=!(!r.passiveListener||!s.passiveListeners)&&{passive:!0,capture:!1};o&&(r.touch?(o.addEventListener(i.start,this.scrollbar.onDragStart,l),o.addEventListener(i.move,this.scrollbar.onDragMove,l),o.addEventListener(i.end,this.scrollbar.onDragEnd,u)):(o.addEventListener(n.start,this.scrollbar.onDragStart,l),e.addEventListener(n.move,this.scrollbar.onDragMove,l),e.addEventListener(n.end,this.scrollbar.onDragEnd,u)))}},disableDraggable:function(){if(this.params.scrollbar.el){var e=a(),t=this.scrollbar,i=this.touchEventsTouch,n=this.touchEventsDesktop,s=this.params,r=this.support,o=t.$el[0],l=!(!r.passiveListener||!s.passiveListeners)&&{passive:!1,capture:!1},u=!(!r.passiveListener||!s.passiveListeners)&&{passive:!0,capture:!1};o&&(r.touch?(o.removeEventListener(i.start,this.scrollbar.onDragStart,l),o.removeEventListener(i.move,this.scrollbar.onDragMove,l),o.removeEventListener(i.end,this.scrollbar.onDragEnd,u)):(o.removeEventListener(n.start,this.scrollbar.onDragStart,l),e.removeEventListener(n.move,this.scrollbar.onDragMove,l),e.removeEventListener(n.end,this.scrollbar.onDragEnd,u)))}},init:function(){if(this.params.scrollbar.el){var e=this.scrollbar,t=this.$el,i=this.params.scrollbar,n=v(i.el);this.params.uniqueNavElements&&"string"==typeof i.el&&n.length>1&&1===t.find(i.el).length&&(n=t.find(i.el));var s=n.find("."+this.params.scrollbar.dragClass);0===s.length&&(s=v('<div class="'+this.params.scrollbar.dragClass+'"></div>'),n.append(s)),E(e,{$el:n,el:n[0],$dragEl:s,dragEl:s[0]}),i.draggable&&e.enableDraggable(),n&&n[this.enabled?"removeClass":"addClass"](this.params.scrollbar.lockClass)}},destroy:function(){this.scrollbar.disableDraggable()}},ee={setTransform:function(e,t){var i=this.rtl,n=v(e),s=i?-1:1,a=n.attr("data-swiper-parallax")||"0",r=n.attr("data-swiper-parallax-x"),o=n.attr("data-swiper-parallax-y"),l=n.attr("data-swiper-parallax-scale"),u=n.attr("data-swiper-parallax-opacity");if(r||o?(r=r||"0",o=o||"0"):this.isHorizontal()?(r=a,o="0"):(o=a,r="0"),r=r.indexOf("%")>=0?parseInt(r,10)*t*s+"%":r*t*s+"px",o=o.indexOf("%")>=0?parseInt(o,10)*t+"%":o*t+"px",null!=u){var d=u-(u-1)*(1-Math.abs(t));n[0].style.opacity=d}if(null==l)n.transform("translate3d("+r+", "+o+", 0px)");else{var c=l-(l-1)*(1-Math.abs(t));n.transform("translate3d("+r+", "+o+", 0px) scale("+c+")")}},setTranslate:function(){var e=this,t=e.$el,i=e.slides,n=e.progress,s=e.snapGrid;t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t){e.parallax.setTransform(t,n)})),i.each((function(t,i){var a=t.progress;e.params.slidesPerGroup>1&&"auto"!==e.params.slidesPerView&&(a+=Math.ceil(i/2)-n*(s.length-1)),a=Math.min(Math.max(a,-1),1),v(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t){e.parallax.setTransform(t,a)}))}))},setTransition:function(e){void 0===e&&(e=this.params.speed);this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t){var i=v(t),n=parseInt(i.attr("data-swiper-parallax-duration"),10)||e;0===e&&(n=0),i.transition(n)}))}},te={getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var t=e.targetTouches[0].pageX,i=e.targetTouches[0].pageY,n=e.targetTouches[1].pageX,s=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(n-t,2)+Math.pow(s-i,2))},onGestureStart:function(e){var t=this.support,i=this.params.zoom,n=this.zoom,s=n.gesture;if(n.fakeGestureTouched=!1,n.fakeGestureMoved=!1,!t.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;n.fakeGestureTouched=!0,s.scaleStart=te.getDistanceBetweenTouches(e)}s.$slideEl&&s.$slideEl.length||(s.$slideEl=v(e.target).closest("."+this.params.slideClass),0===s.$slideEl.length&&(s.$slideEl=this.slides.eq(this.activeIndex)),s.$imageEl=s.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),s.$imageWrapEl=s.$imageEl.parent("."+i.containerClass),s.maxRatio=s.$imageWrapEl.attr("data-swiper-zoom")||i.maxRatio,0!==s.$imageWrapEl.length)?(s.$imageEl&&s.$imageEl.transition(0),this.zoom.isScaling=!0):s.$imageEl=void 0},onGestureChange:function(e){var t=this.support,i=this.params.zoom,n=this.zoom,s=n.gesture;if(!t.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;n.fakeGestureMoved=!0,s.scaleMove=te.getDistanceBetweenTouches(e)}s.$imageEl&&0!==s.$imageEl.length?(t.gestures?n.scale=e.scale*n.currentScale:n.scale=s.scaleMove/s.scaleStart*n.currentScale,n.scale>s.maxRatio&&(n.scale=s.maxRatio-1+Math.pow(n.scale-s.maxRatio+1,.5)),n.scale<i.minRatio&&(n.scale=i.minRatio+1-Math.pow(i.minRatio-n.scale+1,.5)),s.$imageEl.transform("translate3d(0,0,0) scale("+n.scale+")")):"gesturechange"===e.type&&n.onGestureStart(e)},onGestureEnd:function(e){var t=this.device,i=this.support,n=this.params.zoom,s=this.zoom,a=s.gesture;if(!i.gestures){if(!s.fakeGestureTouched||!s.fakeGestureMoved)return;if("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2&&!t.android)return;s.fakeGestureTouched=!1,s.fakeGestureMoved=!1}a.$imageEl&&0!==a.$imageEl.length&&(s.scale=Math.max(Math.min(s.scale,a.maxRatio),n.minRatio),a.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale("+s.scale+")"),s.currentScale=s.scale,s.isScaling=!1,1===s.scale&&(a.$slideEl=void 0))},onTouchStart:function(e){var t=this.device,i=this.zoom,n=i.gesture,s=i.image;n.$imageEl&&0!==n.$imageEl.length&&(s.isTouched||(t.android&&e.cancelable&&e.preventDefault(),s.isTouched=!0,s.touchesStart.x="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s.touchesStart.y="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY))},onTouchMove:function(e){var t=this.zoom,i=t.gesture,n=t.image,s=t.velocity;if(i.$imageEl&&0!==i.$imageEl.length&&(this.allowClick=!1,n.isTouched&&i.$slideEl)){n.isMoved||(n.width=i.$imageEl[0].offsetWidth,n.height=i.$imageEl[0].offsetHeight,n.startX=T(i.$imageWrapEl[0],"x")||0,n.startY=T(i.$imageWrapEl[0],"y")||0,i.slideWidth=i.$slideEl[0].offsetWidth,i.slideHeight=i.$slideEl[0].offsetHeight,i.$imageWrapEl.transition(0),this.rtl&&(n.startX=-n.startX,n.startY=-n.startY));var a=n.width*t.scale,r=n.height*t.scale;if(!(a<i.slideWidth&&r<i.slideHeight)){if(n.minX=Math.min(i.slideWidth/2-a/2,0),n.maxX=-n.minX,n.minY=Math.min(i.slideHeight/2-r/2,0),n.maxY=-n.minY,n.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,n.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!n.isMoved&&!t.isScaling){if(this.isHorizontal()&&(Math.floor(n.minX)===Math.floor(n.startX)&&n.touchesCurrent.x<n.touchesStart.x||Math.floor(n.maxX)===Math.floor(n.startX)&&n.touchesCurrent.x>n.touchesStart.x))return void(n.isTouched=!1);if(!this.isHorizontal()&&(Math.floor(n.minY)===Math.floor(n.startY)&&n.touchesCurrent.y<n.touchesStart.y||Math.floor(n.maxY)===Math.floor(n.startY)&&n.touchesCurrent.y>n.touchesStart.y))return void(n.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),n.isMoved=!0,n.currentX=n.touchesCurrent.x-n.touchesStart.x+n.startX,n.currentY=n.touchesCurrent.y-n.touchesStart.y+n.startY,n.currentX<n.minX&&(n.currentX=n.minX+1-Math.pow(n.minX-n.currentX+1,.8)),n.currentX>n.maxX&&(n.currentX=n.maxX-1+Math.pow(n.currentX-n.maxX+1,.8)),n.currentY<n.minY&&(n.currentY=n.minY+1-Math.pow(n.minY-n.currentY+1,.8)),n.currentY>n.maxY&&(n.currentY=n.maxY-1+Math.pow(n.currentY-n.maxY+1,.8)),s.prevPositionX||(s.prevPositionX=n.touchesCurrent.x),s.prevPositionY||(s.prevPositionY=n.touchesCurrent.y),s.prevTime||(s.prevTime=Date.now()),s.x=(n.touchesCurrent.x-s.prevPositionX)/(Date.now()-s.prevTime)/2,s.y=(n.touchesCurrent.y-s.prevPositionY)/(Date.now()-s.prevTime)/2,Math.abs(n.touchesCurrent.x-s.prevPositionX)<2&&(s.x=0),Math.abs(n.touchesCurrent.y-s.prevPositionY)<2&&(s.y=0),s.prevPositionX=n.touchesCurrent.x,s.prevPositionY=n.touchesCurrent.y,s.prevTime=Date.now(),i.$imageWrapEl.transform("translate3d("+n.currentX+"px, "+n.currentY+"px,0)")}}},onTouchEnd:function(){var e=this.zoom,t=e.gesture,i=e.image,n=e.velocity;if(t.$imageEl&&0!==t.$imageEl.length){if(!i.isTouched||!i.isMoved)return i.isTouched=!1,void(i.isMoved=!1);i.isTouched=!1,i.isMoved=!1;var s=300,a=300,r=n.x*s,o=i.currentX+r,l=n.y*a,u=i.currentY+l;0!==n.x&&(s=Math.abs((o-i.currentX)/n.x)),0!==n.y&&(a=Math.abs((u-i.currentY)/n.y));var d=Math.max(s,a);i.currentX=o,i.currentY=u;var c=i.width*e.scale,h=i.height*e.scale;i.minX=Math.min(t.slideWidth/2-c/2,0),i.maxX=-i.minX,i.minY=Math.min(t.slideHeight/2-h/2,0),i.maxY=-i.minY,i.currentX=Math.max(Math.min(i.currentX,i.maxX),i.minX),i.currentY=Math.max(Math.min(i.currentY,i.maxY),i.minY),t.$imageWrapEl.transition(d).transform("translate3d("+i.currentX+"px, "+i.currentY+"px,0)")}},onTransitionEnd:function(){var e=this.zoom,t=e.gesture;t.$slideEl&&this.previousIndex!==this.activeIndex&&(t.$imageEl&&t.$imageEl.transform("translate3d(0,0,0) scale(1)"),t.$imageWrapEl&&t.$imageWrapEl.transform("translate3d(0,0,0)"),e.scale=1,e.currentScale=1,t.$slideEl=void 0,t.$imageEl=void 0,t.$imageWrapEl=void 0)},toggle:function(e){var t=this.zoom;t.scale&&1!==t.scale?t.out():t.in(e)},in:function(e){var t,i,n,s,a,r,l,u,d,c,h,p,f,m,v,g,y=o(),b=this.zoom,w=this.params.zoom,x=b.gesture,C=b.image;(x.$slideEl||(this.params.virtual&&this.params.virtual.enabled&&this.virtual?x.$slideEl=this.$wrapperEl.children("."+this.params.slideActiveClass):x.$slideEl=this.slides.eq(this.activeIndex),x.$imageEl=x.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),x.$imageWrapEl=x.$imageEl.parent("."+w.containerClass)),x.$imageEl&&0!==x.$imageEl.length&&x.$imageWrapEl&&0!==x.$imageWrapEl.length)&&(x.$slideEl.addClass(""+w.zoomedSlideClass),void 0===C.touchesStart.x&&e?(t="touchend"===e.type?e.changedTouches[0].pageX:e.pageX,i="touchend"===e.type?e.changedTouches[0].pageY:e.pageY):(t=C.touchesStart.x,i=C.touchesStart.y),b.scale=x.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,b.currentScale=x.$imageWrapEl.attr("data-swiper-zoom")||w.maxRatio,e?(v=x.$slideEl[0].offsetWidth,g=x.$slideEl[0].offsetHeight,n=x.$slideEl.offset().left+y.scrollX+v/2-t,s=x.$slideEl.offset().top+y.scrollY+g/2-i,l=x.$imageEl[0].offsetWidth,u=x.$imageEl[0].offsetHeight,d=l*b.scale,c=u*b.scale,f=-(h=Math.min(v/2-d/2,0)),m=-(p=Math.min(g/2-c/2,0)),(a=n*b.scale)<h&&(a=h),a>f&&(a=f),(r=s*b.scale)<p&&(r=p),r>m&&(r=m)):(a=0,r=0),x.$imageWrapEl.transition(300).transform("translate3d("+a+"px, "+r+"px,0)"),x.$imageEl.transition(300).transform("translate3d(0,0,0) scale("+b.scale+")"))},out:function(){var e=this.zoom,t=this.params.zoom,i=e.gesture;i.$slideEl||(this.params.virtual&&this.params.virtual.enabled&&this.virtual?i.$slideEl=this.$wrapperEl.children("."+this.params.slideActiveClass):i.$slideEl=this.slides.eq(this.activeIndex),i.$imageEl=i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),i.$imageWrapEl=i.$imageEl.parent("."+t.containerClass)),i.$imageEl&&0!==i.$imageEl.length&&i.$imageWrapEl&&0!==i.$imageWrapEl.length&&(e.scale=1,e.currentScale=1,i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),i.$slideEl.removeClass(""+t.zoomedSlideClass),i.$slideEl=void 0)},toggleGestures:function(e){var t=this.zoom,i=t.slideSelector,n=t.passiveListener;this.$wrapperEl[e]("gesturestart",i,t.onGestureStart,n),this.$wrapperEl[e]("gesturechange",i,t.onGestureChange,n),this.$wrapperEl[e]("gestureend",i,t.onGestureEnd,n)},enableGestures:function(){this.zoom.gesturesEnabled||(this.zoom.gesturesEnabled=!0,this.zoom.toggleGestures("on"))},disableGestures:function(){this.zoom.gesturesEnabled&&(this.zoom.gesturesEnabled=!1,this.zoom.toggleGestures("off"))},enable:function(){var e=this.support,t=this.zoom;if(!t.enabled){t.enabled=!0;var i=!("touchstart"!==this.touchEvents.start||!e.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},n=!e.passiveListener||{passive:!1,capture:!0},s="."+this.params.slideClass;this.zoom.passiveListener=i,this.zoom.slideSelector=s,e.gestures?(this.$wrapperEl.on(this.touchEvents.start,this.zoom.enableGestures,i),this.$wrapperEl.on(this.touchEvents.end,this.zoom.disableGestures,i)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.on(this.touchEvents.start,s,t.onGestureStart,i),this.$wrapperEl.on(this.touchEvents.move,s,t.onGestureChange,n),this.$wrapperEl.on(this.touchEvents.end,s,t.onGestureEnd,i),this.touchEvents.cancel&&this.$wrapperEl.on(this.touchEvents.cancel,s,t.onGestureEnd,i)),this.$wrapperEl.on(this.touchEvents.move,"."+this.params.zoom.containerClass,t.onTouchMove,n)}},disable:function(){var e=this.zoom;if(e.enabled){var t=this.support;this.zoom.enabled=!1;var i=!("touchstart"!==this.touchEvents.start||!t.passiveListener||!this.params.passiveListeners)&&{passive:!0,capture:!1},n=!t.passiveListener||{passive:!1,capture:!0},s="."+this.params.slideClass;t.gestures?(this.$wrapperEl.off(this.touchEvents.start,this.zoom.enableGestures,i),this.$wrapperEl.off(this.touchEvents.end,this.zoom.disableGestures,i)):"touchstart"===this.touchEvents.start&&(this.$wrapperEl.off(this.touchEvents.start,s,e.onGestureStart,i),this.$wrapperEl.off(this.touchEvents.move,s,e.onGestureChange,n),this.$wrapperEl.off(this.touchEvents.end,s,e.onGestureEnd,i),this.touchEvents.cancel&&this.$wrapperEl.off(this.touchEvents.cancel,s,e.onGestureEnd,i)),this.$wrapperEl.off(this.touchEvents.move,"."+this.params.zoom.containerClass,e.onTouchMove,n)}}},ie={loadInSlide:function(e,t){void 0===t&&(t=!0);var i=this,n=i.params.lazy;if(void 0!==e&&0!==i.slides.length){var s=i.virtual&&i.params.virtual.enabled?i.$wrapperEl.children("."+i.params.slideClass+'[data-swiper-slide-index="'+e+'"]'):i.slides.eq(e),a=s.find("."+n.elementClass+":not(."+n.loadedClass+"):not(."+n.loadingClass+")");!s.hasClass(n.elementClass)||s.hasClass(n.loadedClass)||s.hasClass(n.loadingClass)||a.push(s[0]),0!==a.length&&a.each((function(e){var a=v(e);a.addClass(n.loadingClass);var r=a.attr("data-background"),o=a.attr("data-src"),l=a.attr("data-srcset"),u=a.attr("data-sizes"),d=a.parent("picture");i.loadImage(a[0],o||r,l,u,!1,(function(){if(null!=i&&i&&(!i||i.params)&&!i.destroyed){if(r?(a.css("background-image",'url("'+r+'")'),a.removeAttr("data-background")):(l&&(a.attr("srcset",l),a.removeAttr("data-srcset")),u&&(a.attr("sizes",u),a.removeAttr("data-sizes")),d.length&&d.children("source").each((function(e){var t=v(e);t.attr("data-srcset")&&(t.attr("srcset",t.attr("data-srcset")),t.removeAttr("data-srcset"))})),o&&(a.attr("src",o),a.removeAttr("data-src"))),a.addClass(n.loadedClass).removeClass(n.loadingClass),s.find("."+n.preloaderClass).remove(),i.params.loop&&t){var e=s.attr("data-swiper-slide-index");if(s.hasClass(i.params.slideDuplicateClass)){var c=i.$wrapperEl.children('[data-swiper-slide-index="'+e+'"]:not(.'+i.params.slideDuplicateClass+")");i.lazy.loadInSlide(c.index(),!1)}else{var h=i.$wrapperEl.children("."+i.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');i.lazy.loadInSlide(h.index(),!1)}}i.emit("lazyImageReady",s[0],a[0]),i.params.autoHeight&&i.updateAutoHeight()}})),i.emit("lazyImageLoad",s[0],a[0])}))}},load:function(){var e=this,t=e.$wrapperEl,i=e.params,n=e.slides,s=e.activeIndex,a=e.virtual&&i.virtual.enabled,r=i.lazy,o=i.slidesPerView;function l(e){if(a){if(t.children("."+i.slideClass+'[data-swiper-slide-index="'+e+'"]').length)return!0}else if(n[e])return!0;return!1}function u(e){return a?v(e).attr("data-swiper-slide-index"):v(e).index()}if("auto"===o&&(o=0),e.lazy.initialImageLoaded||(e.lazy.initialImageLoaded=!0),e.params.watchSlidesVisibility)t.children("."+i.slideVisibleClass).each((function(t){var i=a?v(t).attr("data-swiper-slide-index"):v(t).index();e.lazy.loadInSlide(i)}));else if(o>1)for(var d=s;d<s+o;d+=1)l(d)&&e.lazy.loadInSlide(d);else e.lazy.loadInSlide(s);if(r.loadPrevNext)if(o>1||r.loadPrevNextAmount&&r.loadPrevNextAmount>1){for(var c=r.loadPrevNextAmount,h=o,p=Math.min(s+h+Math.max(c,h),n.length),f=Math.max(s-Math.max(h,c),0),m=s+o;m<p;m+=1)l(m)&&e.lazy.loadInSlide(m);for(var g=f;g<s;g+=1)l(g)&&e.lazy.loadInSlide(g)}else{var y=t.children("."+i.slideNextClass);y.length>0&&e.lazy.loadInSlide(u(y));var b=t.children("."+i.slidePrevClass);b.length>0&&e.lazy.loadInSlide(u(b))}},checkInViewOnLoad:function(){var e=o();if(this&&!this.destroyed){var t=this.params.lazy.scrollingElement?v(this.params.lazy.scrollingElement):v(e),i=t[0]===e,n=i?e.innerWidth:t[0].offsetWidth,s=i?e.innerHeight:t[0].offsetHeight,a=this.$el.offset(),r=!1;this.rtlTranslate&&(a.left-=this.$el[0].scrollLeft);for(var l=[[a.left,a.top],[a.left+this.width,a.top],[a.left,a.top+this.height],[a.left+this.width,a.top+this.height]],u=0;u<l.length;u+=1){var d=l[u];if(d[0]>=0&&d[0]<=n&&d[1]>=0&&d[1]<=s){if(0===d[0]&&0===d[1])continue;r=!0}}r?(this.lazy.load(),t.off("scroll",this.lazy.checkInViewOnLoad)):this.lazy.scrollHandlerAttached||(this.lazy.scrollHandlerAttached=!0,t.on("scroll",this.lazy.checkInViewOnLoad))}}},ne={LinearSpline:function(e,t){var i,n,s,a,r,o=function(e,t){for(n=-1,i=e.length;i-n>1;)e[s=i+n>>1]<=t?n=s:i=s;return i};return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(r=o(this.x,e),a=r-1,(e-this.x[a])*(this.y[r]-this.y[a])/(this.x[r]-this.x[a])+this.y[a]):0},this},getInterpolateFunction:function(e){this.controller.spline||(this.controller.spline=this.params.loop?new ne.LinearSpline(this.slidesGrid,e.slidesGrid):new ne.LinearSpline(this.snapGrid,e.snapGrid))},setTranslate:function(e,t){var i,n,s=this,a=s.controller.control,r=s.constructor;function o(e){var t=s.rtlTranslate?-s.translate:s.translate;"slide"===s.params.controller.by&&(s.controller.getInterpolateFunction(e),n=-s.controller.spline.interpolate(-t)),n&&"container"!==s.params.controller.by||(i=(e.maxTranslate()-e.minTranslate())/(s.maxTranslate()-s.minTranslate()),n=(t-s.minTranslate())*i+e.minTranslate()),s.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,s),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(var l=0;l<a.length;l+=1)a[l]!==t&&a[l]instanceof r&&o(a[l]);else a instanceof r&&t!==a&&o(a)},setTransition:function(e,t){var i,n=this,s=n.constructor,a=n.controller.control;function r(t){t.setTransition(e,n),0!==e&&(t.transitionStart(),t.params.autoHeight&&x((function(){t.updateAutoHeight()})),t.$wrapperEl.transitionEnd((function(){a&&(t.params.loop&&"slide"===n.params.controller.by&&t.loopFix(),t.transitionEnd())})))}if(Array.isArray(a))for(i=0;i<a.length;i+=1)a[i]!==t&&a[i]instanceof s&&r(a[i]);else a instanceof s&&t!==a&&r(a)}},se={getRandomNumber:function(e){void 0===e&&(e=16);return"x".repeat(e).replace(/x/g,(function(){return Math.round(16*Math.random()).toString(16)}))},makeElFocusable:function(e){return e.attr("tabIndex","0"),e},makeElNotFocusable:function(e){return e.attr("tabIndex","-1"),e},addElRole:function(e,t){return e.attr("role",t),e},addElRoleDescription:function(e,t){return e.attr("aria-roledescription",t),e},addElControls:function(e,t){return e.attr("aria-controls",t),e},addElLabel:function(e,t){return e.attr("aria-label",t),e},addElId:function(e,t){return e.attr("id",t),e},addElLive:function(e,t){return e.attr("aria-live",t),e},disableEl:function(e){return e.attr("aria-disabled",!0),e},enableEl:function(e){return e.attr("aria-disabled",!1),e},onEnterOrSpaceKey:function(e){if(13===e.keyCode||32===e.keyCode){var t=this.params.a11y,i=v(e.target);this.navigation&&this.navigation.$nextEl&&i.is(this.navigation.$nextEl)&&(this.isEnd&&!this.params.loop||this.slideNext(),this.isEnd?this.a11y.notify(t.lastSlideMessage):this.a11y.notify(t.nextSlideMessage)),this.navigation&&this.navigation.$prevEl&&i.is(this.navigation.$prevEl)&&(this.isBeginning&&!this.params.loop||this.slidePrev(),this.isBeginning?this.a11y.notify(t.firstSlideMessage):this.a11y.notify(t.prevSlideMessage)),this.pagination&&i.is(D(this.params.pagination.bulletClass))&&i[0].click()}},notify:function(e){var t=this.a11y.liveRegion;0!==t.length&&(t.html(""),t.html(e))},updateNavigation:function(){if(!this.params.loop&&this.navigation){var e=this.navigation,t=e.$nextEl,i=e.$prevEl;i&&i.length>0&&(this.isBeginning?(this.a11y.disableEl(i),this.a11y.makeElNotFocusable(i)):(this.a11y.enableEl(i),this.a11y.makeElFocusable(i))),t&&t.length>0&&(this.isEnd?(this.a11y.disableEl(t),this.a11y.makeElNotFocusable(t)):(this.a11y.enableEl(t),this.a11y.makeElFocusable(t)))}},updatePagination:function(){var e=this,t=e.params.a11y;e.pagination&&e.params.pagination.clickable&&e.pagination.bullets&&e.pagination.bullets.length&&e.pagination.bullets.each((function(i){var n=v(i);e.a11y.makeElFocusable(n),e.params.pagination.renderBullet||(e.a11y.addElRole(n,"button"),e.a11y.addElLabel(n,t.paginationBulletMessage.replace(/\{\{index\}\}/,n.index()+1)))}))},init:function(){var e=this,t=e.params.a11y;e.$el.append(e.a11y.liveRegion);var i=e.$el;t.containerRoleDescriptionMessage&&e.a11y.addElRoleDescription(i,t.containerRoleDescriptionMessage),t.containerMessage&&e.a11y.addElLabel(i,t.containerMessage);var n,s,a=e.$wrapperEl,r=a.attr("id")||"swiper-wrapper-"+e.a11y.getRandomNumber(16),o=e.params.autoplay&&e.params.autoplay.enabled?"off":"polite";e.a11y.addElId(a,r),e.a11y.addElLive(a,o),t.itemRoleDescriptionMessage&&e.a11y.addElRoleDescription(v(e.slides),t.itemRoleDescriptionMessage),e.a11y.addElRole(v(e.slides),t.slideRole),e.slides.each((function(i){var n=v(i),s=t.slideLabelMessage.replace(/\{\{index\}\}/,n.index()+1).replace(/\{\{slidesLength\}\}/,e.slides.length);e.a11y.addElLabel(n,s)})),e.navigation&&e.navigation.$nextEl&&(n=e.navigation.$nextEl),e.navigation&&e.navigation.$prevEl&&(s=e.navigation.$prevEl),n&&n.length&&(e.a11y.makeElFocusable(n),"BUTTON"!==n[0].tagName&&(e.a11y.addElRole(n,"button"),n.on("keydown",e.a11y.onEnterOrSpaceKey)),e.a11y.addElLabel(n,t.nextSlideMessage),e.a11y.addElControls(n,r)),s&&s.length&&(e.a11y.makeElFocusable(s),"BUTTON"!==s[0].tagName&&(e.a11y.addElRole(s,"button"),s.on("keydown",e.a11y.onEnterOrSpaceKey)),e.a11y.addElLabel(s,t.prevSlideMessage),e.a11y.addElControls(s,r)),e.pagination&&e.params.pagination.clickable&&e.pagination.bullets&&e.pagination.bullets.length&&e.pagination.$el.on("keydown",D(e.params.pagination.bulletClass),e.a11y.onEnterOrSpaceKey)},destroy:function(){var e,t;this.a11y.liveRegion&&this.a11y.liveRegion.length>0&&this.a11y.liveRegion.remove(),this.navigation&&this.navigation.$nextEl&&(e=this.navigation.$nextEl),this.navigation&&this.navigation.$prevEl&&(t=this.navigation.$prevEl),e&&e.off("keydown",this.a11y.onEnterOrSpaceKey),t&&t.off("keydown",this.a11y.onEnterOrSpaceKey),this.pagination&&this.params.pagination.clickable&&this.pagination.bullets&&this.pagination.bullets.length&&this.pagination.$el.off("keydown",D(this.params.pagination.bulletClass),this.a11y.onEnterOrSpaceKey)}},ae={init:function(){var e=o();if(this.params.history){if(!e.history||!e.history.pushState)return this.params.history.enabled=!1,void(this.params.hashNavigation.enabled=!0);var t=this.history;t.initialized=!0,t.paths=ae.getPathValues(this.params.url),(t.paths.key||t.paths.value)&&(t.scrollToSlide(0,t.paths.value,this.params.runCallbacksOnInit),this.params.history.replaceState||e.addEventListener("popstate",this.history.setHistoryPopState))}},destroy:function(){var e=o();this.params.history.replaceState||e.removeEventListener("popstate",this.history.setHistoryPopState)},setHistoryPopState:function(){this.history.paths=ae.getPathValues(this.params.url),this.history.scrollToSlide(this.params.speed,this.history.paths.value,!1)},getPathValues:function(e){var t=o(),i=(e?new URL(e):t.location).pathname.slice(1).split("/").filter((function(e){return""!==e})),n=i.length;return{key:i[n-2],value:i[n-1]}},setHistory:function(e,t){var i=o();if(this.history.initialized&&this.params.history.enabled){var n;n=this.params.url?new URL(this.params.url):i.location;var s=this.slides.eq(t),a=ae.slugify(s.attr("data-history"));if(this.params.history.root.length>0){var r=this.params.history.root;"/"===r[r.length-1]&&(r=r.slice(0,r.length-1)),a=r+"/"+e+"/"+a}else n.pathname.includes(e)||(a=e+"/"+a);var l=i.history.state;l&&l.value===a||(this.params.history.replaceState?i.history.replaceState({value:a},null,a):i.history.pushState({value:a},null,a))}},slugify:function(e){return e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,t,i){if(t)for(var n=0,s=this.slides.length;n<s;n+=1){var a=this.slides.eq(n);if(ae.slugify(a.attr("data-history"))===t&&!a.hasClass(this.params.slideDuplicateClass)){var r=a.index();this.slideTo(r,e,i)}}else this.slideTo(0,e,i)}},re={onHashCange:function(){var e=a();this.emit("hashChange");var t=e.location.hash.replace("#","");if(t!==this.slides.eq(this.activeIndex).attr("data-hash")){var i=this.$wrapperEl.children("."+this.params.slideClass+'[data-hash="'+t+'"]').index();if(void 0===i)return;this.slideTo(i)}},setHash:function(){var e=o(),t=a();if(this.hashNavigation.initialized&&this.params.hashNavigation.enabled)if(this.params.hashNavigation.replaceState&&e.history&&e.history.replaceState)e.history.replaceState(null,null,"#"+this.slides.eq(this.activeIndex).attr("data-hash")||""),this.emit("hashSet");else{var i=this.slides.eq(this.activeIndex),n=i.attr("data-hash")||i.attr("data-history");t.location.hash=n||"",this.emit("hashSet")}},init:function(){var e=a(),t=o();if(!(!this.params.hashNavigation.enabled||this.params.history&&this.params.history.enabled)){this.hashNavigation.initialized=!0;var i=e.location.hash.replace("#","");if(i)for(var n=0,s=this.slides.length;n<s;n+=1){var r=this.slides.eq(n);if((r.attr("data-hash")||r.attr("data-history"))===i&&!r.hasClass(this.params.slideDuplicateClass)){var l=r.index();this.slideTo(l,0,this.params.runCallbacksOnInit,!0)}}this.params.hashNavigation.watchState&&v(t).on("hashchange",this.hashNavigation.onHashCange)}},destroy:function(){var e=o();this.params.hashNavigation.watchState&&v(e).off("hashchange",this.hashNavigation.onHashCange)}},oe={run:function(){var e=this,t=e.slides.eq(e.activeIndex),i=e.params.autoplay.delay;t.attr("data-swiper-autoplay")&&(i=t.attr("data-swiper-autoplay")||e.params.autoplay.delay),clearTimeout(e.autoplay.timeout),e.autoplay.timeout=x((function(){var t;e.params.autoplay.reverseDirection?e.params.loop?(e.loopFix(),t=e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.isBeginning?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(t=e.slideTo(e.slides.length-1,e.params.speed,!0,!0),e.emit("autoplay")):(t=e.slidePrev(e.params.speed,!0,!0),e.emit("autoplay")):e.params.loop?(e.loopFix(),t=e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")):e.isEnd?e.params.autoplay.stopOnLastSlide?e.autoplay.stop():(t=e.slideTo(0,e.params.speed,!0,!0),e.emit("autoplay")):(t=e.slideNext(e.params.speed,!0,!0),e.emit("autoplay")),(e.params.cssMode&&e.autoplay.running||!1===t)&&e.autoplay.run()}),i)},start:function(){return void 0===this.autoplay.timeout&&(!this.autoplay.running&&(this.autoplay.running=!0,this.emit("autoplayStart"),this.autoplay.run(),!0))},stop:function(){return!!this.autoplay.running&&(void 0!==this.autoplay.timeout&&(this.autoplay.timeout&&(clearTimeout(this.autoplay.timeout),this.autoplay.timeout=void 0),this.autoplay.running=!1,this.emit("autoplayStop"),!0))},pause:function(e){var t=this;t.autoplay.running&&(t.autoplay.paused||(t.autoplay.timeout&&clearTimeout(t.autoplay.timeout),t.autoplay.paused=!0,0!==e&&t.params.autoplay.waitForTransition?["transitionend","webkitTransitionEnd"].forEach((function(e){t.$wrapperEl[0].addEventListener(e,t.autoplay.onTransitionEnd)})):(t.autoplay.paused=!1,t.autoplay.run())))},onVisibilityChange:function(){var e=a();"hidden"===e.visibilityState&&this.autoplay.running&&this.autoplay.pause(),"visible"===e.visibilityState&&this.autoplay.paused&&(this.autoplay.run(),this.autoplay.paused=!1)},onTransitionEnd:function(e){var t=this;t&&!t.destroyed&&t.$wrapperEl&&e.target===t.$wrapperEl[0]&&(["transitionend","webkitTransitionEnd"].forEach((function(e){t.$wrapperEl[0].removeEventListener(e,t.autoplay.onTransitionEnd)})),t.autoplay.paused=!1,t.autoplay.running?t.autoplay.run():t.autoplay.stop())},onMouseEnter:function(){var e=this;e.autoplay.pause(),["transitionend","webkitTransitionEnd"].forEach((function(t){e.$wrapperEl[0].removeEventListener(t,e.autoplay.onTransitionEnd)}))},onMouseLeave:function(){this.autoplay.run()},attachMouseEvents:function(){this.params.autoplay.pauseOnMouseEnter&&(this.$el.on("mouseenter",this.autoplay.onMouseEnter),this.$el.on("mouseleave",this.autoplay.onMouseLeave))},detachMouseEvents:function(){this.$el.off("mouseenter",this.autoplay.onMouseEnter),this.$el.off("mouseleave",this.autoplay.onMouseLeave)}},le={setTranslate:function(){for(var e=this.slides,t=0;t<e.length;t+=1){var i=this.slides.eq(t),n=-i[0].swiperSlideOffset;this.params.virtualTranslate||(n-=this.translate);var s=0;this.isHorizontal()||(s=n,n=0);var a=this.params.fadeEffect.crossFade?Math.max(1-Math.abs(i[0].progress),0):1+Math.min(Math.max(i[0].progress,-1),0);i.css({opacity:a}).transform("translate3d("+n+"px, "+s+"px, 0px)")}},setTransition:function(e){var t=this,i=t.slides,n=t.$wrapperEl;if(i.transition(e),t.params.virtualTranslate&&0!==e){var s=!1;i.transitionEnd((function(){if(!s&&t&&!t.destroyed){s=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)n.trigger(e[i])}}))}}},ue={setTranslate:function(){var e,t=this.$el,i=this.$wrapperEl,n=this.slides,s=this.width,a=this.height,r=this.rtlTranslate,o=this.size,l=this.browser,u=this.params.cubeEffect,d=this.isHorizontal(),c=this.virtual&&this.params.virtual.enabled,h=0;u.shadow&&(d?(0===(e=i.find(".swiper-cube-shadow")).length&&(e=v('<div class="swiper-cube-shadow"></div>'),i.append(e)),e.css({height:s+"px"})):0===(e=t.find(".swiper-cube-shadow")).length&&(e=v('<div class="swiper-cube-shadow"></div>'),t.append(e)));for(var p=0;p<n.length;p+=1){var f=n.eq(p),m=p;c&&(m=parseInt(f.attr("data-swiper-slide-index"),10));var g=90*m,y=Math.floor(g/360);r&&(g=-g,y=Math.floor(-g/360));var b=Math.max(Math.min(f[0].progress,1),-1),w=0,x=0,C=0;m%4==0?(w=4*-y*o,C=0):(m-1)%4==0?(w=0,C=4*-y*o):(m-2)%4==0?(w=o+4*y*o,C=o):(m-3)%4==0&&(w=-o,C=3*o+4*o*y),r&&(w=-w),d||(x=w,w=0);var T="rotateX("+(d?0:-g)+"deg) rotateY("+(d?g:0)+"deg) translate3d("+w+"px, "+x+"px, "+C+"px)";if(b<=1&&b>-1&&(h=90*m+90*b,r&&(h=90*-m-90*b)),f.transform(T),u.slideShadows){var S=d?f.find(".swiper-slide-shadow-left"):f.find(".swiper-slide-shadow-top"),E=d?f.find(".swiper-slide-shadow-right"):f.find(".swiper-slide-shadow-bottom");0===S.length&&(S=v('<div class="swiper-slide-shadow-'+(d?"left":"top")+'"></div>'),f.append(S)),0===E.length&&(E=v('<div class="swiper-slide-shadow-'+(d?"right":"bottom")+'"></div>'),f.append(E)),S.length&&(S[0].style.opacity=Math.max(-b,0)),E.length&&(E[0].style.opacity=Math.max(b,0))}}if(i.css({"-webkit-transform-origin":"50% 50% -"+o/2+"px","-moz-transform-origin":"50% 50% -"+o/2+"px","-ms-transform-origin":"50% 50% -"+o/2+"px","transform-origin":"50% 50% -"+o/2+"px"}),u.shadow)if(d)e.transform("translate3d(0px, "+(s/2+u.shadowOffset)+"px, "+-s/2+"px) rotateX(90deg) rotateZ(0deg) scale("+u.shadowScale+")");else{var k=Math.abs(h)-90*Math.floor(Math.abs(h)/90),D=1.5-(Math.sin(2*k*Math.PI/360)/2+Math.cos(2*k*Math.PI/360)/2),M=u.shadowScale,_=u.shadowScale/D,$=u.shadowOffset;e.transform("scale3d("+M+", 1, "+_+") translate3d(0px, "+(a/2+$)+"px, "+-a/2/_+"px) rotateX(-90deg)")}var P=l.isSafari||l.isWebView?-o/2:0;i.transform("translate3d(0px,0,"+P+"px) rotateX("+(this.isHorizontal()?0:h)+"deg) rotateY("+(this.isHorizontal()?-h:0)+"deg)")},setTransition:function(e){var t=this.$el;this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),this.params.cubeEffect.shadow&&!this.isHorizontal()&&t.find(".swiper-cube-shadow").transition(e)}},de={setTranslate:function(){for(var e=this.slides,t=this.rtlTranslate,i=0;i<e.length;i+=1){var n=e.eq(i),s=n[0].progress;this.params.flipEffect.limitRotation&&(s=Math.max(Math.min(n[0].progress,1),-1));var a=-180*s,r=0,o=-n[0].swiperSlideOffset,l=0;if(this.isHorizontal()?t&&(a=-a):(l=o,o=0,r=-a,a=0),n[0].style.zIndex=-Math.abs(Math.round(s))+e.length,this.params.flipEffect.slideShadows){var u=this.isHorizontal()?n.find(".swiper-slide-shadow-left"):n.find(".swiper-slide-shadow-top"),d=this.isHorizontal()?n.find(".swiper-slide-shadow-right"):n.find(".swiper-slide-shadow-bottom");0===u.length&&(u=v('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"left":"top")+'"></div>'),n.append(u)),0===d.length&&(d=v('<div class="swiper-slide-shadow-'+(this.isHorizontal()?"right":"bottom")+'"></div>'),n.append(d)),u.length&&(u[0].style.opacity=Math.max(-s,0)),d.length&&(d[0].style.opacity=Math.max(s,0))}n.transform("translate3d("+o+"px, "+l+"px, 0px) rotateX("+r+"deg) rotateY("+a+"deg)")}},setTransition:function(e){var t=this,i=t.slides,n=t.activeIndex,s=t.$wrapperEl;if(i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),t.params.virtualTranslate&&0!==e){var a=!1;i.eq(n).transitionEnd((function(){if(!a&&t&&!t.destroyed){a=!0,t.animating=!1;for(var e=["webkitTransitionEnd","transitionend"],i=0;i<e.length;i+=1)s.trigger(e[i])}}))}}},ce={setTranslate:function(){for(var e=this.width,t=this.height,i=this.slides,n=this.slidesSizesGrid,s=this.params.coverflowEffect,a=this.isHorizontal(),r=this.translate,o=a?e/2-r:t/2-r,l=a?s.rotate:-s.rotate,u=s.depth,d=0,c=i.length;d<c;d+=1){var h=i.eq(d),p=n[d],f=(o-h[0].swiperSlideOffset-p/2)/p*s.modifier,m=a?l*f:0,g=a?0:l*f,y=-u*Math.abs(f),b=s.stretch;"string"==typeof b&&-1!==b.indexOf("%")&&(b=parseFloat(s.stretch)/100*p);var w=a?0:b*f,x=a?b*f:0,C=1-(1-s.scale)*Math.abs(f);Math.abs(x)<.001&&(x=0),Math.abs(w)<.001&&(w=0),Math.abs(y)<.001&&(y=0),Math.abs(m)<.001&&(m=0),Math.abs(g)<.001&&(g=0),Math.abs(C)<.001&&(C=0);var T="translate3d("+x+"px,"+w+"px,"+y+"px)  rotateX("+g+"deg) rotateY("+m+"deg) scale("+C+")";if(h.transform(T),h[0].style.zIndex=1-Math.abs(Math.round(f)),s.slideShadows){var S=a?h.find(".swiper-slide-shadow-left"):h.find(".swiper-slide-shadow-top"),E=a?h.find(".swiper-slide-shadow-right"):h.find(".swiper-slide-shadow-bottom");0===S.length&&(S=v('<div class="swiper-slide-shadow-'+(a?"left":"top")+'"></div>'),h.append(S)),0===E.length&&(E=v('<div class="swiper-slide-shadow-'+(a?"right":"bottom")+'"></div>'),h.append(E)),S.length&&(S[0].style.opacity=f>0?f:0),E.length&&(E[0].style.opacity=-f>0?-f:0)}}},setTransition:function(e){this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}},he={init:function(){var e=this.params.thumbs;if(this.thumbs.initialized)return!1;this.thumbs.initialized=!0;var t=this.constructor;return e.swiper instanceof t?(this.thumbs.swiper=e.swiper,E(this.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),E(this.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1})):S(e.swiper)&&(this.thumbs.swiper=new t(E({},e.swiper,{watchSlidesVisibility:!0,watchSlidesProgress:!0,slideToClickedSlide:!1})),this.thumbs.swiperCreated=!0),this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),this.thumbs.swiper.on("tap",this.thumbs.onThumbClick),!0},onThumbClick:function(){var e=this.thumbs.swiper;if(e){var t=e.clickedIndex,i=e.clickedSlide;if(!(i&&v(i).hasClass(this.params.thumbs.slideThumbActiveClass)||null==t)){var n;if(n=e.params.loop?parseInt(v(e.clickedSlide).attr("data-swiper-slide-index"),10):t,this.params.loop){var s=this.activeIndex;this.slides.eq(s).hasClass(this.params.slideDuplicateClass)&&(this.loopFix(),this._clientLeft=this.$wrapperEl[0].clientLeft,s=this.activeIndex);var a=this.slides.eq(s).prevAll('[data-swiper-slide-index="'+n+'"]').eq(0).index(),r=this.slides.eq(s).nextAll('[data-swiper-slide-index="'+n+'"]').eq(0).index();n=void 0===a?r:void 0===r?a:r-s<s-a?r:a}this.slideTo(n)}}},update:function(e){var t=this.thumbs.swiper;if(t){var i="auto"===t.params.slidesPerView?t.slidesPerViewDynamic():t.params.slidesPerView,n=this.params.thumbs.autoScrollOffset,s=n&&!t.params.loop;if(this.realIndex!==t.realIndex||s){var a,r,o=t.activeIndex;if(t.params.loop){t.slides.eq(o).hasClass(t.params.slideDuplicateClass)&&(t.loopFix(),t._clientLeft=t.$wrapperEl[0].clientLeft,o=t.activeIndex);var l=t.slides.eq(o).prevAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index(),u=t.slides.eq(o).nextAll('[data-swiper-slide-index="'+this.realIndex+'"]').eq(0).index();a=void 0===l?u:void 0===u?l:u-o==o-l?o:u-o<o-l?u:l,r=this.activeIndex>this.previousIndex?"next":"prev"}else r=(a=this.realIndex)>this.previousIndex?"next":"prev";s&&(a+="next"===r?n:-1*n),t.visibleSlidesIndexes&&t.visibleSlidesIndexes.indexOf(a)<0&&(t.params.centeredSlides?a=a>o?a-Math.floor(i/2)+1:a+Math.floor(i/2)-1:a>o&&(a=a-i+1),t.slideTo(a,e?0:void 0))}var d=1,c=this.params.thumbs.slideThumbActiveClass;if(this.params.slidesPerView>1&&!this.params.centeredSlides&&(d=this.params.slidesPerView),this.params.thumbs.multipleActiveThumbs||(d=1),d=Math.floor(d),t.slides.removeClass(c),t.params.loop||t.params.virtual&&t.params.virtual.enabled)for(var h=0;h<d;h+=1)t.$wrapperEl.children('[data-swiper-slide-index="'+(this.realIndex+h)+'"]').addClass(c);else for(var p=0;p<d;p+=1)t.slides.eq(this.realIndex+p).addClass(c)}}},pe=[Y,U,{name:"mousewheel",params:{mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}},create:function(){k(this,{mousewheel:{enabled:!1,lastScrollTime:C(),lastEventBeforeSnap:void 0,recentWheelEvents:[],enable:K.enable,disable:K.disable,handle:K.handle,handleMouseEnter:K.handleMouseEnter,handleMouseLeave:K.handleMouseLeave,animateSlider:K.animateSlider,releaseScroll:K.releaseScroll}})},on:{init:function(e){!e.params.mousewheel.enabled&&e.params.cssMode&&e.mousewheel.disable(),e.params.mousewheel.enabled&&e.mousewheel.enable()},destroy:function(e){e.params.cssMode&&e.mousewheel.enable(),e.mousewheel.enabled&&e.mousewheel.disable()}}},{name:"navigation",params:{navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock"}},create:function(){k(this,{navigation:t({},Z)})},on:{init:function(e){e.navigation.init(),e.navigation.update()},toEdge:function(e){e.navigation.update()},fromEdge:function(e){e.navigation.update()},destroy:function(e){e.navigation.destroy()},"enable disable":function(e){var t=e.navigation,i=t.$nextEl,n=t.$prevEl;i&&i[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass),n&&n[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass)},click:function(e,t){var i=e.navigation,n=i.$nextEl,s=i.$prevEl,a=t.target;if(e.params.navigation.hideOnClick&&!v(a).is(s)&&!v(a).is(n)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===a||e.pagination.el.contains(a)))return;var r;n?r=n.hasClass(e.params.navigation.hiddenClass):s&&(r=s.hasClass(e.params.navigation.hiddenClass)),!0===r?e.emit("navigationShow"):e.emit("navigationHide"),n&&n.toggleClass(e.params.navigation.hiddenClass),s&&s.toggleClass(e.params.navigation.hiddenClass)}}}},{name:"pagination",params:{pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:function(e){return e},formatFractionTotal:function(e){return e},bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",modifierClass:"swiper-pagination-",currentClass:"swiper-pagination-current",totalClass:"swiper-pagination-total",hiddenClass:"swiper-pagination-hidden",progressbarFillClass:"swiper-pagination-progressbar-fill",progressbarOppositeClass:"swiper-pagination-progressbar-opposite",clickableClass:"swiper-pagination-clickable",lockClass:"swiper-pagination-lock"}},create:function(){k(this,{pagination:t({dynamicBulletIndex:0},Q)})},on:{init:function(e){e.pagination.init(),e.pagination.render(),e.pagination.update()},activeIndexChange:function(e){(e.params.loop||void 0===e.snapIndex)&&e.pagination.update()},snapIndexChange:function(e){e.params.loop||e.pagination.update()},slidesLengthChange:function(e){e.params.loop&&(e.pagination.render(),e.pagination.update())},snapGridLengthChange:function(e){e.params.loop||(e.pagination.render(),e.pagination.update())},destroy:function(e){e.pagination.destroy()},"enable disable":function(e){var t=e.pagination.$el;t&&t[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)},click:function(e,t){var i=t.target;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&e.pagination.$el.length>0&&!v(i).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&i===e.navigation.nextEl||e.navigation.prevEl&&i===e.navigation.prevEl))return;!0===e.pagination.$el.hasClass(e.params.pagination.hiddenClass)?e.emit("paginationShow"):e.emit("paginationHide"),e.pagination.$el.toggleClass(e.params.pagination.hiddenClass)}}}},{name:"scrollbar",params:{scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag"}},create:function(){k(this,{scrollbar:t({isTouched:!1,timeout:null,dragTimeout:null},J)})},on:{init:function(e){e.scrollbar.init(),e.scrollbar.updateSize(),e.scrollbar.setTranslate()},update:function(e){e.scrollbar.updateSize()},resize:function(e){e.scrollbar.updateSize()},observerUpdate:function(e){e.scrollbar.updateSize()},setTranslate:function(e){e.scrollbar.setTranslate()},setTransition:function(e,t){e.scrollbar.setTransition(t)},"enable disable":function(e){var t=e.scrollbar.$el;t&&t[e.enabled?"removeClass":"addClass"](e.params.scrollbar.lockClass)},destroy:function(e){e.scrollbar.destroy()}}},{name:"parallax",params:{parallax:{enabled:!1}},create:function(){k(this,{parallax:t({},ee)})},on:{beforeInit:function(e){e.params.parallax.enabled&&(e.params.watchSlidesProgress=!0,e.originalParams.watchSlidesProgress=!0)},init:function(e){e.params.parallax.enabled&&e.parallax.setTranslate()},setTranslate:function(e){e.params.parallax.enabled&&e.parallax.setTranslate()},setTransition:function(e,t){e.params.parallax.enabled&&e.parallax.setTransition(t)}}},{name:"zoom",params:{zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}},create:function(){var e=this;k(e,{zoom:t({enabled:!1,scale:1,currentScale:1,isScaling:!1,gesture:{$slideEl:void 0,slideWidth:void 0,slideHeight:void 0,$imageEl:void 0,$imageWrapEl:void 0,maxRatio:3},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0}},te)});var i=1;Object.defineProperty(e.zoom,"scale",{get:function(){return i},set:function(t){if(i!==t){var n=e.zoom.gesture.$imageEl?e.zoom.gesture.$imageEl[0]:void 0,s=e.zoom.gesture.$slideEl?e.zoom.gesture.$slideEl[0]:void 0;e.emit("zoomChange",t,n,s)}i=t}})},on:{init:function(e){e.params.zoom.enabled&&e.zoom.enable()},destroy:function(e){e.zoom.disable()},touchStart:function(e,t){e.zoom.enabled&&e.zoom.onTouchStart(t)},touchEnd:function(e,t){e.zoom.enabled&&e.zoom.onTouchEnd(t)},doubleTap:function(e,t){!e.animating&&e.params.zoom.enabled&&e.zoom.enabled&&e.params.zoom.toggle&&e.zoom.toggle(t)},transitionEnd:function(e){e.zoom.enabled&&e.params.zoom.enabled&&e.zoom.onTransitionEnd()},slideChange:function(e){e.zoom.enabled&&e.params.zoom.enabled&&e.params.cssMode&&e.zoom.onTransitionEnd()}}},{name:"lazy",params:{lazy:{checkInView:!1,enabled:!1,loadPrevNext:!1,loadPrevNextAmount:1,loadOnTransitionStart:!1,scrollingElement:"",elementClass:"swiper-lazy",loadingClass:"swiper-lazy-loading",loadedClass:"swiper-lazy-loaded",preloaderClass:"swiper-lazy-preloader"}},create:function(){k(this,{lazy:t({initialImageLoaded:!1},ie)})},on:{beforeInit:function(e){e.params.lazy.enabled&&e.params.preloadImages&&(e.params.preloadImages=!1)},init:function(e){e.params.lazy.enabled&&!e.params.loop&&0===e.params.initialSlide&&(e.params.lazy.checkInView?e.lazy.checkInViewOnLoad():e.lazy.load())},scroll:function(e){e.params.freeMode&&!e.params.freeModeSticky&&e.lazy.load()},"scrollbarDragMove resize _freeModeNoMomentumRelease":function(e){e.params.lazy.enabled&&e.lazy.load()},transitionStart:function(e){e.params.lazy.enabled&&(e.params.lazy.loadOnTransitionStart||!e.params.lazy.loadOnTransitionStart&&!e.lazy.initialImageLoaded)&&e.lazy.load()},transitionEnd:function(e){e.params.lazy.enabled&&!e.params.lazy.loadOnTransitionStart&&e.lazy.load()},slideChange:function(e){e.params.lazy.enabled&&e.params.cssMode&&e.lazy.load()}}},{name:"controller",params:{controller:{control:void 0,inverse:!1,by:"slide"}},create:function(){k(this,{controller:t({control:this.params.controller.control},ne)})},on:{update:function(e){e.controller.control&&e.controller.spline&&(e.controller.spline=void 0,delete e.controller.spline)},resize:function(e){e.controller.control&&e.controller.spline&&(e.controller.spline=void 0,delete e.controller.spline)},observerUpdate:function(e){e.controller.control&&e.controller.spline&&(e.controller.spline=void 0,delete e.controller.spline)},setTranslate:function(e,t,i){e.controller.control&&e.controller.setTranslate(t,i)},setTransition:function(e,t,i){e.controller.control&&e.controller.setTransition(t,i)}}},{name:"a11y",params:{a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group"}},create:function(){k(this,{a11y:t({},se,{liveRegion:v('<span class="'+this.params.a11y.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>')})})},on:{afterInit:function(e){e.params.a11y.enabled&&(e.a11y.init(),e.a11y.updateNavigation())},toEdge:function(e){e.params.a11y.enabled&&e.a11y.updateNavigation()},fromEdge:function(e){e.params.a11y.enabled&&e.a11y.updateNavigation()},paginationUpdate:function(e){e.params.a11y.enabled&&e.a11y.updatePagination()},destroy:function(e){e.params.a11y.enabled&&e.a11y.destroy()}}},{name:"history",params:{history:{enabled:!1,root:"",replaceState:!1,key:"slides"}},create:function(){k(this,{history:t({},ae)})},on:{init:function(e){e.params.history.enabled&&e.history.init()},destroy:function(e){e.params.history.enabled&&e.history.destroy()},"transitionEnd _freeModeNoMomentumRelease":function(e){e.history.initialized&&e.history.setHistory(e.params.history.key,e.activeIndex)},slideChange:function(e){e.history.initialized&&e.params.cssMode&&e.history.setHistory(e.params.history.key,e.activeIndex)}}},{name:"hash-navigation",params:{hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}},create:function(){k(this,{hashNavigation:t({initialized:!1},re)})},on:{init:function(e){e.params.hashNavigation.enabled&&e.hashNavigation.init()},destroy:function(e){e.params.hashNavigation.enabled&&e.hashNavigation.destroy()},"transitionEnd _freeModeNoMomentumRelease":function(e){e.hashNavigation.initialized&&e.hashNavigation.setHash()},slideChange:function(e){e.hashNavigation.initialized&&e.params.cssMode&&e.hashNavigation.setHash()}}},{name:"autoplay",params:{autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}},create:function(){k(this,{autoplay:t({},oe,{running:!1,paused:!1})})},on:{init:function(e){e.params.autoplay.enabled&&(e.autoplay.start(),a().addEventListener("visibilitychange",e.autoplay.onVisibilityChange),e.autoplay.attachMouseEvents())},beforeTransitionStart:function(e,t,i){e.autoplay.running&&(i||!e.params.autoplay.disableOnInteraction?e.autoplay.pause(t):e.autoplay.stop())},sliderFirstMove:function(e){e.autoplay.running&&(e.params.autoplay.disableOnInteraction?e.autoplay.stop():e.autoplay.pause())},touchEnd:function(e){e.params.cssMode&&e.autoplay.paused&&!e.params.autoplay.disableOnInteraction&&e.autoplay.run()},destroy:function(e){e.autoplay.detachMouseEvents(),e.autoplay.running&&e.autoplay.stop(),a().removeEventListener("visibilitychange",e.autoplay.onVisibilityChange)}}},{name:"effect-fade",params:{fadeEffect:{crossFade:!1}},create:function(){k(this,{fadeEffect:t({},le)})},on:{beforeInit:function(e){if("fade"===e.params.effect){e.classNames.push(e.params.containerModifierClass+"fade");var t={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};E(e.params,t),E(e.originalParams,t)}},setTranslate:function(e){"fade"===e.params.effect&&e.fadeEffect.setTranslate()},setTransition:function(e,t){"fade"===e.params.effect&&e.fadeEffect.setTransition(t)}}},{name:"effect-cube",params:{cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}},create:function(){k(this,{cubeEffect:t({},ue)})},on:{beforeInit:function(e){if("cube"===e.params.effect){e.classNames.push(e.params.containerModifierClass+"cube"),e.classNames.push(e.params.containerModifierClass+"3d");var t={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0};E(e.params,t),E(e.originalParams,t)}},setTranslate:function(e){"cube"===e.params.effect&&e.cubeEffect.setTranslate()},setTransition:function(e,t){"cube"===e.params.effect&&e.cubeEffect.setTransition(t)}}},{name:"effect-flip",params:{flipEffect:{slideShadows:!0,limitRotation:!0}},create:function(){k(this,{flipEffect:t({},de)})},on:{beforeInit:function(e){if("flip"===e.params.effect){e.classNames.push(e.params.containerModifierClass+"flip"),e.classNames.push(e.params.containerModifierClass+"3d");var t={slidesPerView:1,slidesPerColumn:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!0};E(e.params,t),E(e.originalParams,t)}},setTranslate:function(e){"flip"===e.params.effect&&e.flipEffect.setTranslate()},setTransition:function(e,t){"flip"===e.params.effect&&e.flipEffect.setTransition(t)}}},{name:"effect-coverflow",params:{coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}},create:function(){k(this,{coverflowEffect:t({},ce)})},on:{beforeInit:function(e){"coverflow"===e.params.effect&&(e.classNames.push(e.params.containerModifierClass+"coverflow"),e.classNames.push(e.params.containerModifierClass+"3d"),e.params.watchSlidesProgress=!0,e.originalParams.watchSlidesProgress=!0)},setTranslate:function(e){"coverflow"===e.params.effect&&e.coverflowEffect.setTranslate()},setTransition:function(e,t){"coverflow"===e.params.effect&&e.coverflowEffect.setTransition(t)}}},{name:"thumbs",params:{thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-container-thumbs"}},create:function(){k(this,{thumbs:t({swiper:null,initialized:!1},he)})},on:{beforeInit:function(e){var t=e.params.thumbs;t&&t.swiper&&(e.thumbs.init(),e.thumbs.update(!0))},slideChange:function(e){e.thumbs.swiper&&e.thumbs.update()},update:function(e){e.thumbs.swiper&&e.thumbs.update()},resize:function(e){e.thumbs.swiper&&e.thumbs.update()},observerUpdate:function(e){e.thumbs.swiper&&e.thumbs.update()},setTransition:function(e,t){var i=e.thumbs.swiper;i&&i.setTransition(t)},beforeDestroy:function(e){var t=e.thumbs.swiper;t&&e.thumbs.swiperCreated&&t&&t.destroy()}}}];return W.use(pe),W})),function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,(function(){return function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var i={};return t.m=e,t.c=i,t.p="dist/",t(0)}([function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e},a=(n(i(1)),i(6)),r=n(a),o=n(i(7)),l=n(i(8)),u=n(i(9)),d=n(i(10)),c=n(i(11)),h=n(i(14)),p=[],f=!1,m={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},v=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(f=!0),f)return p=(0,c.default)(p,m),(0,d.default)(p,m.once),p},g=function(){p=(0,h.default)(),v()};e.exports={init:function(e){m=s(m,e),p=(0,h.default)();var t=document.all&&!window.atob;return function(e){return!0===e||"mobile"===e&&u.default.mobile()||"phone"===e&&u.default.phone()||"tablet"===e&&u.default.tablet()||"function"==typeof e&&!0===e()}(m.disable)||t?void p.forEach((function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})):(m.disableMutationObserver||l.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),m.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",m.easing),document.querySelector("body").setAttribute("data-aos-duration",m.duration),document.querySelector("body").setAttribute("data-aos-delay",m.delay),"DOMContentLoaded"===m.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?v(!0):"load"===m.startEvent?window.addEventListener(m.startEvent,(function(){v(!0)})):document.addEventListener(m.startEvent,(function(){v(!0)})),window.addEventListener("resize",(0,o.default)(v,m.debounceDelay,!0)),window.addEventListener("orientationchange",(0,o.default)(v,m.debounceDelay,!0)),window.addEventListener("scroll",(0,r.default)((function(){(0,d.default)(p,m.once)}),m.throttleDelay)),m.disableMutationObserver||l.default.ready("[data-aos]",g),p)},refresh:v,refreshHard:g}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function i(e,t,i){function s(t){var i=h,n=p;return h=p=void 0,y=t,m=e.apply(n,i)}function r(e){return y=e,v=setTimeout(u,t),C?s(e):m}function l(e){var i=e-g;return void 0===g||i>=t||i<0||T&&e-y>=f}function u(){var e=x();return l(e)?d(e):void(v=setTimeout(u,function(e){var i=t-(e-g);return T?w(i,f-(e-y)):i}(e)))}function d(e){return v=void 0,S&&h?s(e):(h=p=void 0,m)}function c(){var e=x(),i=l(e);if(h=arguments,p=this,g=e,i){if(void 0===v)return r(g);if(T)return v=setTimeout(u,t),s(g)}return void 0===v&&(v=setTimeout(u,t)),m}var h,p,f,m,v,g,y=0,C=!1,T=!1,S=!0;if("function"!=typeof e)throw new TypeError(o);return t=a(t)||0,n(i)&&(C=!!i.leading,f=(T="maxWait"in i)?b(a(i.maxWait)||0,t):f,S="trailing"in i?!!i.trailing:S),c.cancel=function(){void 0!==v&&clearTimeout(v),y=0,h=g=p=v=void 0},c.flush=function(){return void 0===v?m:d(x())},c}function n(e){var t=void 0===e?"undefined":r(e);return!!e&&("object"==t||"function"==t)}function s(e){return"symbol"==(void 0===e?"undefined":r(e))||function(e){return!!e&&"object"==(void 0===e?"undefined":r(e))}(e)&&y.call(e)==u}function a(e){if("number"==typeof e)return e;if(s(e))return l;if(n(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=n(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var i=h.test(e);return i||p.test(e)?f(e.slice(2),i?2:8):c.test(e)?l:+e}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="Expected a function",l=NaN,u="[object Symbol]",d=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,p=/^0o[0-7]+$/i,f=parseInt,m="object"==(void 0===t?"undefined":r(t))&&t&&t.Object===Object&&t,v="object"==("undefined"==typeof self?"undefined":r(self))&&self&&self.Object===Object&&self,g=m||v||Function("return this")(),y=Object.prototype.toString,b=Math.max,w=Math.min,x=function(){return g.Date.now()};e.exports=function(e,t,s){var a=!0,r=!0;if("function"!=typeof e)throw new TypeError(o);return n(s)&&(a="leading"in s?!!s.leading:a,r="trailing"in s?!!s.trailing:r),i(e,t,{leading:a,maxWait:t,trailing:r})}}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function i(e){var t=void 0===e?"undefined":a(e);return!!e&&("object"==t||"function"==t)}function n(e){return"symbol"==(void 0===e?"undefined":a(e))||function(e){return!!e&&"object"==(void 0===e?"undefined":a(e))}(e)&&g.call(e)==l}function s(e){if("number"==typeof e)return e;if(n(e))return o;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(u,"");var s=c.test(e);return s||h.test(e)?p(e.slice(2),s?2:8):d.test(e)?o:+e}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r="Expected a function",o=NaN,l="[object Symbol]",u=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,h=/^0o[0-7]+$/i,p=parseInt,f="object"==(void 0===t?"undefined":a(t))&&t&&t.Object===Object&&t,m="object"==("undefined"==typeof self?"undefined":a(self))&&self&&self.Object===Object&&self,v=f||m||Function("return this")(),g=Object.prototype.toString,y=Math.max,b=Math.min,w=function(){return v.Date.now()};e.exports=function(e,t,n){function a(t){var i=h,n=p;return h=p=void 0,x=t,m=e.apply(n,i)}function o(e){return x=e,v=setTimeout(u,t),C?a(e):m}function l(e){var i=e-g;return void 0===g||i>=t||i<0||T&&e-x>=f}function u(){var e=w();return l(e)?d(e):void(v=setTimeout(u,function(e){var i=t-(e-g);return T?b(i,f-(e-x)):i}(e)))}function d(e){return v=void 0,S&&h?a(e):(h=p=void 0,m)}function c(){var e=w(),i=l(e);if(h=arguments,p=this,g=e,i){if(void 0===v)return o(g);if(T)return v=setTimeout(u,t),a(g)}return void 0===v&&(v=setTimeout(u,t)),m}var h,p,f,m,v,g,x=0,C=!1,T=!1,S=!0;if("function"!=typeof e)throw new TypeError(r);return t=s(t)||0,i(n)&&(C=!!n.leading,f=(T="maxWait"in n)?y(s(n.maxWait)||0,t):f,S="trailing"in n?!!n.trailing:S),c.cancel=function(){void 0!==v&&clearTimeout(v),x=0,h=g=p=v=void 0},c.flush=function(){return void 0===v?m:d(w())},c}}).call(t,function(){return this}())},function(e,t){"use strict";function i(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function n(e){e&&e.forEach((function(e){var t=Array.prototype.slice.call(e.addedNodes),i=Array.prototype.slice.call(e.removedNodes);if(function e(t){var i=void 0,n=void 0;for(i=0;i<t.length;i+=1){if((n=t[i]).dataset&&n.dataset.aos)return!0;if(n.children&&e(n.children))return!0}return!1}(t.concat(i)))return s()}))}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){};t.default={isSupported:function(){return!!i()},ready:function(e,t){var a=window.document,r=new(i())(n);s=t,r.observe(a.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}}},function(e,t){"use strict";function i(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,o=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,[{key:"phone",value:function(){var e=i();return!(!s.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=i();return!(!r.test(e)&&!o.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new l},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){var i=window.pageYOffset,n=window.innerHeight;e.forEach((function(e,s){!function(e,t,i){var n=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):void 0!==n&&("false"===n||!i&&"true"!==n)&&e.node.classList.remove("aos-animate")}(e,n+i,t)}))}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(i(12));t.default=function(e,t){return e.forEach((function(e,i){e.node.classList.add("aos-init"),e.position=(0,n.default)(e.node,t.offset)})),e}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(i(13));t.default=function(e,t){var i=0,s=0,a=window.innerHeight,r={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(r.offset&&!isNaN(r.offset)&&(s=parseInt(r.offset)),r.anchor&&document.querySelectorAll(r.anchor)&&(e=document.querySelectorAll(r.anchor)[0]),i=(0,n.default)(e).top,r.anchorPlacement){case"top-bottom":break;case"center-bottom":i+=e.offsetHeight/2;break;case"bottom-bottom":i+=e.offsetHeight;break;case"top-center":i+=a/2;break;case"bottom-center":i+=a/2+e.offsetHeight;break;case"center-center":i+=a/2+e.offsetHeight/2;break;case"top-top":i+=a;break;case"bottom-top":i+=e.offsetHeight+a;break;case"center-top":i+=e.offsetHeight/2+a}return r.anchorPlacement||r.offset||isNaN(t)||(s=t),i+s}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){for(var t=0,i=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),i+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:i,left:t}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,(function(e){return{node:e}}))}}])})),function(e){"use strict";var t=0,i=function(t,i){this.options=i,this.$elementjFilestyle=[],this.$element=e(t)};i.prototype={clear:function(){this.$element.val(""),this.$elementjFilestyle.find(":text").val(""),this.$elementjFilestyle.find(".count-jfilestyle").remove()},destroy:function(){this.$element.removeAttr("style").removeData("jfilestyle").val(""),this.$elementjFilestyle.remove()},dragdrop:function(e){if(!0!==e&&!1!==e)return this.options.dragdrop;this.options.dragdrop=e},disabled:function(e){if(!0===e)this.options.disabled||(this.$element.attr("disabled","true"),this.$elementjFilestyle.find("label").attr("disabled","true"),this.options.disabled=!0);else{if(!1!==e)return this.options.disabled;this.options.disabled&&(this.$element.removeAttr("disabled"),this.$elementjFilestyle.find("label").removeAttr("disabled"),this.options.disabled=!1)}},buttonBefore:function(e){if(!0===e)this.options.buttonBefore||(this.options.buttonBefore=!0,this.options.input&&(this.$elementjFilestyle.remove(),this.constructor(),this.pushNameFiles()));else{if(!1!==e)return this.options.buttonBefore;this.options.buttonBefore&&(this.options.buttonBefore=!1,this.options.input&&(this.$elementjFilestyle.remove(),this.constructor(),this.pushNameFiles()))}},input:function(e){if(!0===e)this.options.input||(this.options.input=!0,this.$elementjFilestyle.find("label").before(this.htmlInput()),this.$elementjFilestyle.find(".count-jfilestyle").remove(),this.pushNameFiles());else{if(!1!==e)return this.options.input;if(this.options.input){this.options.input=!1,this.$elementjFilestyle.find(":text").remove();var t=this.pushNameFiles();t.length>0&&this.$elementjFilestyle.find("label").append(' <span class="count-jfilestyle">'+t.length+"</span>")}}},text:function(e){if(void 0===e)return this.options.text;this.options.text=e,this.$elementjFilestyle.find("label span").html(this.options.text)},theme:function(e){if(void 0===e)return this.options.theme;console.log(this.$elementjFilestyle.attr("class").replace(/.*(jfilestyle-theme-.*).*/,"$1")),this.$elementjFilestyle.removeClass(this.$elementjFilestyle.attr("class").replace(/.*(jfilestyle-theme-.*).*/,"$1")),this.options.theme=e,this.$elementjFilestyle.addClass("jfilestyle-theme-"+this.options.theme)},inputSize:function(e){if(void 0===e)return this.options.inputSize;this.options.inputSize=e,this.$elementjFilestyle.find(":text").css("width",this.options.inputSize)},placeholder:function(e){if(void 0===e)return this.options.placeholder;this.options.placeholder=e,this.$elementjFilestyle.find(":text").attr("placeholder",e)},htmlInput:function(){return this.options.input?'<input type="text" style="width:'+this.options.inputSize+'" placeholder="'+this.options.placeholder+'" disabled> ':""},pushNameFiles:function(){var e="",t=[];void 0===this.$element[0].files?t[0]={name:this.$element.value}:t=this.$element[0].files;for(var i=0;i<t.length;i++)e+=t[i].name.split("\\").pop()+", ";return""!==e?this.$elementjFilestyle.find(":text").val(e.replace(/\, $/g,"")):this.$elementjFilestyle.find(":text").val(""),t},constructor:function(){var i=this,n="",s=i.$element.attr("id");""!==s&&s||(s="jfilestyle-"+t,i.$element.attr({id:s}),t++),n='<span class="focus-jfilestyle"><label for="'+s+'" '+(i.options.disabled?'disabled="true"':"")+"><span>"+i.options.text+"</span></label></span>",!0===i.options.buttonBefore?n+=i.htmlInput():n=i.htmlInput()+n,i.$elementjFilestyle=e('<div class="jfilestyle '+(i.options.input?"jfilestyle-corner":"")+" "+(this.options.buttonBefore?" jfilestyle-buttonbefore":"")+" "+(i.options.theme?"jfilestyle-theme-"+i.options.theme:"")+'"><div name="filedrag"></div>'+n+"</div>"),i.$elementjFilestyle.find(".focus-jfilestyle").attr("tabindex","0").keypress((function(e){if(13===e.keyCode||32===e.charCode)return i.$elementjFilestyle.find("label").click(),!1})),i.$element.css({position:"absolute",clip:"rect(0px 0px 0px 0px)"}).attr("tabindex","-1").after(i.$elementjFilestyle),i.options.disabled&&i.$element.attr("disabled","true"),i.$elementjFilestyle.find('[name="filedrag"]').css({position:"absolute",width:"100%",height:i.$elementjFilestyle.height()+"px","z-index":-1}),i.$element.change((function(){var e=i.pushNameFiles();0==i.options.input?0==i.$elementjFilestyle.find(".count-jfilestyle").length?i.$elementjFilestyle.find("label").append(' <span class="count-jfilestyle">'+e.length+"</span>"):0==e.length?i.$elementjFilestyle.find(".count-jfilestyle").remove():i.$elementjFilestyle.find(".count-jfilestyle").html(e.length):i.$elementjFilestyle.find(".count-jfilestyle").remove(),i.options.onChange(e)})),window.navigator.userAgent.search(/firefox/i)>-1&&this.$elementjFilestyle.find("label").click((function(){return i.$element.click(),!1})),e(document).on("dragover",(function(t){t.preventDefault(),t.stopPropagation(),i.options.dragdrop||e('[name="filedrag"]').css("z-index","9")})).on("drop",(function(t){t.preventDefault(),t.stopPropagation(),i.options.dragdrop||e('[name="filedrag"]').css("z-index","-1")})),i.$elementjFilestyle.find('[name="filedrag"]').on("dragover",(function(e){e.preventDefault(),e.stopPropagation()})).on("dragenter",(function(e){e.preventDefault(),e.stopPropagation()})).on("drop",(function(t){if(t.originalEvent.dataTransfer&&!i.options.disabled&&i.options.dragdrop&&t.originalEvent.dataTransfer.files.length){t.preventDefault(),t.stopPropagation(),i.$element[0].files=t.originalEvent.dataTransfer.files;var n=i.pushNameFiles();0==i.options.input?0==i.$elementjFilestyle.find(".count-jfilestyle").length?i.$elementjFilestyle.find("label").append(' <span class="count-jfilestyle">'+n.length+"</span>"):0==n.length?i.$elementjFilestyle.find(".count-jfilestyle").remove():i.$elementjFilestyle.find(".count-jfilestyle").html(n.length):i.$elementjFilestyle.find(".count-jfilestyle").remove(),e('[name="filedrag"]').css("z-index","-1")}}))}};var n=e.fn.jfilestyle;e.fn.jfilestyle=function(t,n){var s="",a=this.each((function(){if("file"===e(this).attr("type")){var a=e(this),r=a.data("jfilestyle"),o=e.extend({},e.fn.jfilestyle.defaults,t,"object"==typeof t&&t);r||(a.data("jfilestyle",r=new i(this,o)),r.constructor()),"string"==typeof t&&(s=r[t](n))}}));return void 0!==typeof s?s:a},e.fn.jfilestyle.defaults={text:"Choose file",input:!0,disabled:!1,buttonBefore:!1,inputSize:"200px",placeholder:"",dragdrop:!0,theme:"default",onChange:function(){}},e.fn.jfilestyle.noConflict=function(){return e.fn.jfilestyle=n,this},e((function(){e(".jfilestyle").each((function(){var t=e(this),i={text:t.attr("data-text"),input:"false"!==t.attr("data-input"),disabled:"true"===t.attr("data-disabled"),buttonBefore:"true"===t.attr("data-buttonBefore"),inputSize:t.attr("data-inputSize"),placeholder:t.attr("data-placeholder"),theme:t.attr("data-theme"),dragdrop:"false"!==t.attr("data-dragdrop")};t.jfilestyle(i)}))}))}(window.jQuery),function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e}).apply(this,arguments)}function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.d(t,"a",(function(){return o}));var a,r,o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=n({backscroll:!0,linkAttributeName:"data-hystmodal",closeOnOverlay:!0,closeOnEsc:!0,closeOnButton:!0,waitTransitions:!1,catchFocus:!0,fixedSelectors:"*[data-hystfixed]",beforeOpen:function(){},afterClose:function(){}},t),this.config.linkAttributeName&&this.init(),this._closeAfterTransition=this._closeAfterTransition.bind(this)}var t,i;return t=e,(i=[{key:"init",value:function(){this.isOpened=!1,this.openedWindow=!1,this.starter=!1,this._nextWindows=!1,this._scrollPosition=0,this._reopenTrigger=!1,this._overlayChecker=!1,this._isMoved=!1,this._focusElements=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],this._modalBlock=!1,e._shadow||(e._shadow=document.createElement("button"),e._shadow.classList.add("hystmodal__shadow"),document.body.appendChild(e._shadow)),this.eventsFeeler()}},{key:"eventsFeeler",value:function(){document.addEventListener("click",function(e){var t=e.target.closest("["+this.config.linkAttributeName+"]");if(!this._isMoved&&t){e.preventDefault(),this.starter=t;var i=this.starter.getAttribute(this.config.linkAttributeName);return this._nextWindows=document.querySelector(i),void this.open()}this.config.closeOnButton&&e.target.closest("[data-hystclose]")&&this.close()}.bind(this)),this.config.closeOnOverlay&&(document.addEventListener("mousedown",function(e){!this._isMoved&&e.target instanceof Element&&!e.target.classList.contains("hystmodal__wrap")||(this._overlayChecker=!0)}.bind(this)),document.addEventListener("mouseup",function(e){if(!this._isMoved&&e.target instanceof Element&&this._overlayChecker&&e.target.classList.contains("hystmodal__wrap"))return e.preventDefault(),this._overlayChecker,void this.close();this._overlayChecker=!1}.bind(this))),window.addEventListener("keydown",function(e){if(!this._isMoved&&this.config.closeOnEsc&&27==e.which&&this.isOpened)return e.preventDefault(),void this.close();!this._isMoved&&this.config.catchFocus&&9==e.which&&this.isOpened&&this.focusCatcher(e)}.bind(this))}},{key:"open",value:function(t){if(t&&(this._nextWindows="string"==typeof t?document.querySelector(t):t),this._nextWindows){if(this.isOpened)return this._reopenTrigger=!0,void this.close();this.openedWindow=this._nextWindows,this._modalBlock=this.openedWindow.querySelector(".hystmodal__window"),this.config.beforeOpen(this),this._bodyScrollControl(),e._shadow.classList.add("hystmodal__shadow--show"),this.openedWindow.classList.add("hystmodal--active"),this.openedWindow.setAttribute("aria-hidden","false"),this.config.catchFocus&&this.focusContol(),this.isOpened=!0}else console.log("Warinig: hustModal selector is not found")}},{key:"close",value:function(){this.isOpened&&(this.config.waitTransitions?(this.openedWindow.classList.add("hystmodal--moved"),this._isMoved=!0,this.openedWindow.addEventListener("transitionend",this._closeAfterTransition),this.openedWindow.classList.remove("hystmodal--active")):(this.openedWindow.classList.remove("hystmodal--active"),this._closeAfterTransition()))}},{key:"_closeAfterTransition",value:function(){this.openedWindow.classList.remove("hystmodal--moved"),this.openedWindow.removeEventListener("transitionend",this._closeAfterTransition),this._isMoved=!1,e._shadow.classList.remove("hystmodal__shadow--show"),this.openedWindow.setAttribute("aria-hidden","true"),this.config.catchFocus&&this.focusContol(),this._bodyScrollControl(),this.isOpened=!1,this.openedWindow.scrollTop=0,this.config.afterClose(this),this._reopenTrigger&&(this._reopenTrigger=!1,this.open())}},{key:"focusContol",value:function(){var e=this.openedWindow.querySelectorAll(this._focusElements);this.isOpened&&this.starter?this.starter.focus():e.length&&e[0].focus()}},{key:"focusCatcher",value:function(e){var t=this.openedWindow.querySelectorAll(this._focusElements),i=Array.prototype.slice.call(t);if(this.openedWindow.contains(document.activeElement)){var n=i.indexOf(document.activeElement);console.log(n),e.shiftKey&&0===n&&(i[i.length-1].focus(),e.preventDefault()),e.shiftKey||n!==i.length-1||(i[0].focus(),e.preventDefault())}else i[0].focus(),e.preventDefault()}},{key:"_bodyScrollControl",value:function(){if(this.config.backscroll){var e=Array.prototype.slice.call(document.querySelectorAll(this.config.fixedSelectors)),t=document.documentElement;if(!0===this.isOpened)return t.classList.remove("hystmodal__opened"),t.style.marginRight="",e.map((function(e){e.style.marginRight=""})),window.scrollTo(0,this._scrollPosition),void(t.style.top="");this._scrollPosition=window.pageYOffset;var i=window.innerWidth-t.clientWidth;t.style.top=-this._scrollPosition+"px",i&&(t.style.marginRight=i+"px",e.map((function(e){e.style.marginRight=parseInt(getComputedStyle(e).marginRight)+i+"px"}))),t.classList.add("hystmodal__opened")}}}])&&s(t.prototype,i),e}();(r="_shadow")in(a=o)?Object.defineProperty(a,r,{value:!1,enumerable:!0,configurable:!0,writable:!0}):a[r]=!1},function(e,t,i){"use strict";i.r(t),function(e){var t=i(0);i(3),i(4),e.HystModal=t.a}.call(this,i(2))},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})},function(e,t,i){}]),$(document).ready((function(){$("body").on("click","ul.tabs__caption li:not(.tabs__item_active)",(function(){$(this).addClass("tabs__item_active").siblings().removeClass("tabs__item_active").closest(".tabs").find(".tabs__tab").removeClass("tabs__tab_active").eq($(this).index()).addClass("tabs__tab_active")})),$(".input_phone").toArray().forEach((function(e){new Cleave(e,{prefix:"+7 ",phone:!0,phoneRegionCode:"RU"})})),$(".input_sum").toArray().forEach((function(e){new Cleave(e,{delimiter:" ",numeral:!0,numeralThousandsGroupStyle:"thousand"})})),$(".input_date").datepicker({onSelect: function(a, b,c) {
  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  nativeInputValueSetter.call(c.el, new Intl.DateTimeFormat().format(new Date(c.selectedDates[0])));
  
  var ev2 = new Event('input', { bubbles: true});
  c.el.dispatchEvent(ev2);
}}),$(".input_date_period").datepicker({minDate:new Date,range:!0,multipleDatesSeparator:" – "});let e=$("#calcExec"),t=$("#calcPart"),i=$("#calcGO"),n=$("#calcVA"),s=$(".calculator__radios input.checkbox__input");$('[name="calcTab"]').change((function(){"0"===$(this).val()?(e.prop("checked",!0),t.prop("disabled",!1),i.prop("disabled",!1),n.prop("disabled",!0),s.prop("checked",!1)):"1"===$(this).val()?(e.prop("checked",!0),t.prop("disabled",!1),i.prop("disabled",!1),n.removeAttr("disabled"),s.prop("checked",!1)):"2"===$(this).val()&&(e.prop("checked",!0),t.prop("disabled",!0),i.prop("disabled",!0),n.prop("disabled",!0),s.prop("checked",!1))})),$(".calculator-table").stupidtable();new Swiper(".hero-slider",{autoplay:{delay:5e3,disableOnInteraction:!1},speed:600,loop:!0,pagination:{el:".hero-slider__pagination",clickable:!0}}),new Swiper(".partners-slider",{autoplay:{delay:5e3,disableOnInteraction:!1},navigation:{nextEl:".partners-slider__button-next",prevEl:".partners-slider__button-prev"},speed:600,loop:!0,breakpoints:{300:{slidesPerView:1},768:{slidesPerView:2,spaceBetween:20},1200:{slidesPerView:3,spaceBetween:16}}});window.hystModal = new HystModal({linkAttributeName:"data-hystmodal",catchFocus:!1});let a=document.querySelector(".page"),r=document.querySelector(".header-nav__trigger");r && r.addEventListener("click",(function(){a.classList.toggle("page_nav_open")})),document.documentElement.addEventListener("click",(function(e){e.target===r||(r && r.contains(e.target))||(a && (a.classList.remove("page_nav_open")))})),$(".header a.header-nav__text").on("click",(function(e){if(""!==this.hash){e.preventDefault();let t=this.hash;$("html, body").animate({scrollTop:$(t).offset().top},800)}}));let o=$(".page__to-top");$(window).scroll((function(){$(window).scrollTop()>300?o.addClass("show"):o.removeClass("show")})),o.on("click",(function(e){e.preventDefault(),$("html, body").animate({scrollTop:0},"300")})),AOS.init({easing:"ease",duration:1500}),"complete"===document.readyState&&AOS.refresh()}));