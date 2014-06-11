// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.prelude
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
if (typeof window == 'undefined') {
	window = function () {};
}
if (typeof module == 'undefined' && typeof window.module == 'undefined') {
	module = {};
}
// ============================================================================

var apimodule_prelude = function (VD) {

    var initVD = {

        // use the init method to set these values correctly
        _apiKey: null,
        _session: null,
        _userStatus: 'unknown', // or 'notConnected' or 'connected'
        _cookieName: null,

        // logging is enabled by default. this is the logging shown to the
        // developer and not at all noisy.
        _logging: true,

        // --------------------------------------------------------------------

        /**
         * Copies things from source into target.
         *
         * @access private
         * @param target    {Object}  the target object where things will be copied
         *                            into
         * @param source    {Object}  the source object where things will be copied
         *                            from
         * @param overwrite {Boolean} indicate if existing items should be
         *                            overwritten
         * @param tranform  {function} [Optional], transformation function for
         *        each item
         */
        copy: function(target, source, overwrite, transform) {
            for (var key in source) {
                if (overwrite || typeof target[key] === 'undefined') {
                    target[key] = transform ? transform(source[key]) : source[key];
                }
            }
            return target;
        },

        // --------------------------------------------------------------------

        /**
         * Create a namespaced object.
         *
         * @access private
         * @param name {String} full qualified name ('Util.foo', etc.)
         * @param value {Object} value to set. Default value is {}. [Optional]
         * @return {Object} The created object
         */
        create: function(name, value) {
            var node = VD, // We will use 'VD' as root namespace
                nameParts = name ? name.split('.') : [],
                c = nameParts.length;

            for (var i = 0; i < c; i++) {
                var part = nameParts[i];
                var nso = node[part];
                if ( ! nso ) {
                    nso = (value && i + 1 == c) ? value : {};
                    node[part] = nso;
                }
                node = nso;
            }
            return node;
        },

        // --------------------------------------------------------------------

        /**
         * Copy stuff from one object to the specified namespace that
         * is VD.<target>.
         * If the namespace target doesn't exist, it will be created automatically.
         *
         * @access private
         * @param target    {Object|String}  the target object to copy into
         * @param source    {Object}         the source object to copy from
         * @param overwrite {Boolean}        indicate if we should overwrite
         * @return {Object} the *same* target object back
         */
        provide: function(target, source, overwrite) {
            // a string means a dot separated object that gets appended to, or created
            return VD.copy (
                typeof target == 'string' ? VD.create(target) : target,
                source, overwrite
            );
        },

        // --------------------------------------------------------------------

        /**
         * Generates a weak random ID.
         *
         * @access private
         * @return {String} a random ID
         */
        guid: function() {
            return 'f' + (Math.random() * (1<<30)).toString(16).replace('.', '');
        },

        // --------------------------------------------------------------------

        /**
         * Logs a message for the developer if logging is on.
         *
         * @access private
         * @param args {Object} the thing to log
         */
        log: function(args) {
            if (VD._logging) {
//#JSCOVERAGE_IF 0
                if (window.Debug && window.Debug.writeln) {
                    window.Debug.writeln(args);
                } else if (window.console) {
                    window.console.log(args);
                }
//#JSCOVERAGE_ENDIF
            }

            // fire an event if the event system is available
            if (VD.Event) {
                VD.Event.fire('vd.log', args);
            }
        },

        // --------------------------------------------------------------------

        /**
         * Logs an error message for the developer.
         *
         * @access private
         * @param args {Object} the thing to log
         */
        error: function(args) {
//#JSCOVERAGE_IF 0
            if (window.console) {
                window.console.error('Error JS coverage :' + args);
            }
//#JSCOVERAGE_ENDIF

            // fire an event if the event system is available
            if (VD.Event) {
                VD.Event.fire('vd.error', args);
            }
        },

        // --------------------------------------------------------------------

        /**
         * Shortcut for document.getElementById
         * @method $
         * @param {string} DOM id
         * @return DOMElement
         * @access private
         */
        $: function(id) {
            return document.getElementById(id);
        }
    };

    for (var item in initVD) {
    	VD[item] = initVD[item];
    }

};

// ----------------------------------------------------------------------------

if ( typeof exports == 'undefined' ) {
	window.exports = {};
}

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_prelude;
if ( typeof(window) != 'undefined' ) {
	window.VD = {};
	init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
// - Configuration for standalone library usage
// ============================================================================

var VD_CONFIG = module.exports = {
    get: function() { 
        return {
            api: {
                //oauth_uri: 'https://secure.viadeo.com',
                oauth_uri: 'https://www01.demo.sf.viadeo.internal',
                oauth_token_path: '/oauth-provider/token',
                oauth_authorize_path: '/oauth-provider/authorize2',
                api_uri: function(path) {
                    var uri = 'https://api.viadeo.com/';
                    if (path && path == "profile") {
                        //uri = 'https://partners-api.viadeo.com/';
                         uri = 'http://extapi01.demo.sf.viadeo.internal:8080/';
                    }
                    return uri;
                }
            },
        } 
    }
}
// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
// - Compatibility Node.JS / Standalone JS
// ============================================================================

var require = require;
if ( ! require ) {
    require = function(path) {
        if (path == 'viadeoapi') {
            return { VD: VD };
        }
        if (path == 'config') {
            return VD_CONFIG;
        }
    }
}
// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.event
// @requires vd.prelude vd.array
//
// ============================================================================

var apimodule_event = function (VD) {

    VD.provide('EventProvider', {

        /**
         * Returns the internal subscriber array that can be directly manipulated by
         * adding/removing things.
         *
         * @access private
         * @return {Object}
         */
        subscribers: function() {
            // this odd looking logic is to allow instances to lazily have a map of
            // their events. if subscribers were an object literal itself, we would
            // have issues with instances sharing the subscribers when its being used
            // in a mixin style.
            if (!this._subscribersMap) {
                this._subscribersMap = {};
            }
            return this._subscribersMap;
        },

        // --------------------------------------------------------------------

        /**
         * Subscribe to a given event name, invoking your callback function whenever
         * the event is fired.
         *
         * For example, suppose you want to get notified whenever the session
         * changes:
         *
         *     VD.Event.subscribe('auth.sessionChange', function(response) {
         *       // do something with response.session
         *     });
         *
         * Global Events:
         *
         * - auth.login -- fired when the user logs in
         * - auth.logout -- fired when the user logs out
         * - auth.sessionChange -- fired when the session changes
         * - auth.statusChange -- fired when the status changes
         *
         * @access public
         * @param name {String} Name of the event.
         * @param cb {Function} The handler function.
         */
        subscribe: function(name, cb) {
            var subs = this.subscribers();

            if (!subs[name]) {
                subs[name] = [cb];
            } else {
                subs[name].push(cb);
            }
        },

        // --------------------------------------------------------------------

        /**
         * Removes subscribers, inverse of [VD.Event.subscribe](VD.Event.subscribe).
         *
         * Removing a subscriber is basically the same as adding one. You need to
         * pass the same event name and function to unsubscribe that you passed into
         * subscribe. If we use a similar example to
         * [VD.Event.subscribe](VD.event.subscribe), we get:
         *
         *     var onSessionChange = function(response) {
         *       // do something with response.session
         *     };
         *     VD.Event.subscribe('auth.sessionChange', onSessionChange);
         *
         *     // sometime later in your code you dont want to get notified anymore
         *     VD.Event.unsubscribe('auth.sessionChange', onSessionChange);
         *
         * @access public
         * @param name {String} Name of the event.
         * @param cb {Function} The handler function.
         */
        unsubscribe: function(name, cb) {
            var subs = this.subscribers()[name];

            VD.Array.forEach(subs, function(value, key) {
                if (value == cb) {
                    subs[key] = null;
                }
            });
        },

        // --------------------------------------------------------------------

        /**
         * Repeatedly listen for an event over time. The callback is invoked
         * immediately when monitor is called, and then every time the event
         * fires. The subscription is canceled when the callback returns true.
         *
         * @access private
         * @param {string} name Name of event.
         * @param {function} callback A callback function. Any additional arguments
         * to monitor() will be passed on to the callback. When the callback returns
         * true, the monitoring will cease.
         */
        monitor: function(name, callback) {
            if (!callback()) {
                var ctx = this,
                    fn = function() {
                        if (callback.apply(callback, arguments)) {
                            ctx.unsubscribe(name, fn);
                        }
                    };

                this.subscribe(name, fn);
            }
        },

        // --------------------------------------------------------------------

        /**
         * Removes all subscribers for named event.
         *
         * You need to pass the same event name that was passed to VD.Event.subscribe.
         * This is useful if the event is no longer worth listening to and you
         * believe that multiple subscribers have been set up.
         *
         * @access private
         * @param name    {String}   name of the event
         */
        clear: function(name) {
            delete this.subscribers()[name];
        },

        // --------------------------------------------------------------------

        /**
         * Fires a named event. The first argument is the name, the rest of the
         * arguments are passed to the subscribers.
         *
         * @access private
         * @param name {String} the event name
         */
        fire: function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift();

            VD.Array.forEach(this.subscribers()[name], function(sub) {
                // this is because we sometimes null out unsubscribed rather than jiggle
                // the array
                if (sub) {
                    sub.apply(this, args);
                }
            });
        }
    });

    // ------------------------------------------------------------------------

    /**
     * Event handling mechanism for globally named events.
     *
     * @class VD.Event
     * @extends VD.EventProvider
     */
    VD.provide('Event', VD.EventProvider);

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_event;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.qs
// @requires vd.prelude vd.array
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
var require = require;
// ============================================================================

var apimodule_qs = function (VD) {

    VD.provide('QS', {

        /**
         * Encode parameters to a query string.
         *
         * @access private
         * @param   params {Object}  the parameters to encode
         * @param   sep    {String}  the separator string (defaults to '&')
         * @param   encode {Boolean} indicate if the key/value should be URI encoded
         * @return         {String}  the query string
         */
        encode: function(params, sep, encode) {
            sep = sep === undefined ? '&' : sep;
            encode = encode === false ? function(s) {return s;} : encodeURIComponent;

            var pairs = [];
            VD.Array.forEach(params, function(val, key) {
                if (val !== null && typeof val != 'undefined') {
                    pairs.push(encode(key) + '=' + encode(val));
                }
            });
            pairs.sort();
            return pairs.join(sep);
        },

        // --------------------------------------------------------------------

        /**
         * Decode a query string into a parameters object.
         *
         * @access private
         * @param   str {String} the query string
         * @return      {Object} the parameters to encode
         */
        decode: function(str) {

            var decode = decodeURIComponent,
                params = {},
                parts  = decode(str).split('&'),
                i,
                pair;

            for (i = 0; i < parts.length; i++) {
                pair = parts[i].split('=', 2);
                if (pair && pair[0]) {
                    params[decode(pair[0])] = pair[1] ? decode(pair[1].replace(/\+/g, '%20')) : '';
                }
            }

            return params;
        }
    });

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_qs;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.auth
// @requires vd.prelude
//           vd.qs
//           vd.event
//           vd.json
//           vd.api
//
// ============================================================================

var apimodule_auth = function (VD) {

    /**
     * Authentication, Authorization & Sessions.
     *
     * @class vd
     * @static
     * @access private
     */
    VD.provide('', {

        getLoginStatus: function(cb) {
            if (cb) {
                cb({status: VD._userStatus, session: VD._session});
            }
        },

        // --------------------------------------------------------------------

        getSession: function() {
            if (VD._session && 'expires' in VD._session && VD._session.expires > 0 && new Date().getTime() > VD._session.expires * 1000) {
                VD.Auth.setSession(null, 'notConnected');
            }
            return VD._session;
        },

        // --------------------------------------------------------------------

        login: function(cb, opts) {
          var currentURL = window.location.href;

          //var regexS = "[\\?&]"+"code"+"=([^&#]*)";
          //var regex = new RegExp( regexS );
          //var results = regex.exec( currentURL );
          //if ( results != null ) {
          //  console.log("Error occured during OAuth processus (cycle operation)");
          //  return;
          //}

          if ( typeof window != 'undefined' && typeof window.document != 'undefined' ) {
                // we try to place it at the center of the current window
                var screenX = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
                    screenY = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
                    outerWidth = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth,
                    outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22), // 22 = IE toolbar height
                    width = 780,
                    height = 450,
                    left = parseInt(screenX + ((outerWidth - width) / 2), 10),
                    top = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
                    features = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
        
                opts = VD.copy(opts || {}, {
                    client_id: VD._apiKey,
                    response_type: 'token',
                    display: 'popup',
                    scope: '',
                    state: 'vdauth_' + VD.guid()
                });

                var url = VD.Auth.authorizeUrl + '?' + VD.QS.encode(opts);
                url += '&' + VD.QS.encode({ redirect_uri: currentURL });
                url += '&' + VD.QS.encode({ cancel_url: (currentURL + (currentURL.match(/\?/) ? '&' : '?') + 'canceled=true') });
                if (opts.display === 'popup') {
                    console.log("Open popup " + url);
                    var win = window.open(url, 'vdauth', features);
        
                    if (cb) {
                        VD.Auth._active[opts.state] = {cb: cb, win: win};
                        VD.Auth._popupMonitor();
                    }
                } else {
                    if (opts.display == 'popupInside')
                        opts.display = 'popup';
                    window.location.href = url;
                }
        }
      },

      // ----------------------------------------------------------------------

      logout: function(cb, nodeReq) {
            VD.Auth.setSession(null, 'notConnected', nodeReq);
            VD.Cookie.clear(nodeReq);
            if ( cb ) {
                cb();
            }
      },

      // ----------------------------------------------------------------------

      logoutWeb: function(cb, nodeReq, domain) {
            VD.Cookie.clearWeb(nodeReq, domain);
            if ( cb ) {
                cb();
            }
      }

    });

    // ========================================================================

    var config = require('config').get();
    VD.provide('Auth', {

        authorizeUrl: config.api.oauth_uri + config.api.oauth_authorize_path,
        _active: {},
        _receivedSession: null,

        // --------------------------------------------------------------------

        /**
         * Check if session info are present in the URL fragment
         *
         * @access private
         */
        readFragment: function() {
            if ( typeof window != 'undefined' && typeof window.document != 'undefined' && typeof window.location != 'undefined' ) {
                var h = window.location.href.replace('?', '#'), fragment = h.substr(h.lastIndexOf('#') + 1);
                if (fragment.indexOf('access_token=') >= 0 || fragment.indexOf('error=') >= 0) {
                    var session = VD.QS.decode(fragment);
                    if (window.opener && window.opener.VD.Auth.setSession && window.name == 'vdauth' && window.opener.name != 'vdauth') {
                        // Display none helps prevent loading of some stuff
                        document.documentElement.style.display = 'none';
                        window.opener.VD.Auth.recvSession(session);
                    } else if (session && ('state' in session) && session.state.indexOf('vdauth_') == 0) { // Ensure it's our session
                        // The session have been received as fragment, but we can't find a valid opener.
                        // This happen either when the user is redirected to the authorization page or when the agent
                        // doesn't fully support window.open, and replace the current window by the opened one
                        // (i.e.: iPhone fullscreen webapp mode)
                        if ('access_token' in session) {
                            VD.Auth._receivedSession = session;
                        }
                        // Remove the session from the fragment
                        window.location.hash = h.substr(0, h.lastIndexOf('#'));
                    }
                }
            }
        },

        // --------------------------------------------------------------------

        /**
         * Recieve the authorization server response
         *
         * @access private
         * @param session {Object}  the new Session
         */
        recvSession: function(session) {
            if (!session) {
                VD.error('Received invalid session');
            }

            if ('error' in session) {
                VD.error('Received auth error `' + session.error + '\': ' + session.error_description);
            }

            if (!('state' in session)) {
                VD.error("Received a session with not `state' field");
                return;
            }

            if (!(session.state in VD.Auth._active)) {
                VD.error('Received a session from an inactive window');
                return;
            }

            VD.Auth._active[session.state].session = session;
        },

        // --------------------------------------------------------------------

        /**
         * Set a new session value. Invokes all the registered subscribers
         * if needed.
         *
         * @access private
         * @param session {Object}  the new Session
         * @param status  {String}  the new status
         * @return        {Object}  the "response" object
         */
        setSession: function(session, status, nodeReq) {
            // detect special changes before changing the internal session
            var login = !VD._session && session,
                logout = VD._session && !session,
                both = false, // VD._session && session && VD._session.uid != session.uid,
                sessionChange = login || logout || (VD._session && session && VD._session.access_token != session.access_token) || 
                                (VD._session && session && VD._session.expires_in != session.expires_in),
                statusChange = status != VD._userStatus;

            if (session && 'expires_in' in session) {
                // CAVEAT: the expires here will actually only be valid on the client as end-user machines
                //         clock is rarely synced
                session.expires = Math.round(new Date().getTime() / 1000) + parseInt(session.expires_in, 10);
                delete session.expires_in;
            }

            var response = {
                session: session,
                status: status
            };

            VD._session = session;
            VD._userStatus = status;

            if (session && typeof(session.access_token) != 'undefined') {
                VD.access_token = session.access_token;
            }

            // If cookie support is enabled, set the cookie. Cookie support does not
            // rely on events, because we want the cookie to be set _before_ any of the
            // event handlers are fired. Note, this is a _weak_ dependency on Cookie.
            if (sessionChange && VD.Cookie && VD.Cookie.getEnabled()) {
                VD.Cookie.set(session, nodeReq);
            }

            // events
            if (statusChange) {
                VD.Event.fire('auth.statusChange', response);
            }

            if (logout || both) {
                VD.Event.fire('auth.logout', response);
            }

            if (login || both) {
                VD.Event.fire('auth.login', response);
            }

            if (sessionChange) {
                VD.Event.fire('auth.sessionChange', response);
            }

            return response;
        },

        // --------------------------------------------------------------------

        /**
         * Start and manage the window monitor interval. This allows us to invoke
         * the default callback for a window when the user closes the window
         * directly.
         *
         * @access private
         */
        _popupMonitor: function()
        {
            // check all open windows
            for (var id in VD.Auth._active) {

                if ('win' in VD.Auth._active[id]) {
                    try {
                        // found a closed window
                        if (VD.Auth._active[id].win.closed) {
                            delete VD.Auth._active[id].win;
                            VD.Auth.recvSession(
                                                { error: 'access_denied', 
                                                  error_description: 'Client closed the window', 
                                                  state: id
                                                }
                                               );
                        }
                    } catch (e) {
                        // Do nothing
                    }
                }

                if ('session' in VD.Auth._active[id]) {
                    var callInfo = VD.Auth._active[id];
                    delete VD.Auth._active[id];

                    var session = callInfo.session;
                    if ('access_token' in session) {
                        VD.Auth.setSession(session, 'connected');
                    } else {
                        VD.Auth.setSession(null, 'notConnected');
                    }

                    if ('win' in callInfo) {
                        callInfo.win.close();
                    }

                    if ('cb' in callInfo) {
                        callInfo.cb({status: VD._userStatus, session: VD._session});
                    }
                }
            }

            var hasActive = false;
            for (var id in VD.Auth._active) {
                hasActive = true;
                break;
            }
            if (hasActive && !VD.Auth._popupInterval) {
                // start the monitor if needed and it's not already running
                VD.Auth._popupInterval = window.setInterval(VD.Auth._popupMonitor, 100);
            } else if (!hasActive && VD.Auth._popupInterval) {
                // shutdown if we have nothing to monitor but it's running
                window.clearInterval(VD.Auth._popupInterval);
                VD.Auth._popupInterval = null;
            }
        }
    });

    VD.Auth.readFragment();

}

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_auth;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.init
// @requires vd.prelude
//           vd.auth
//           vd.api
//           vd.cookie
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
if (typeof window.document == 'undefined') {
    window = function () { };
	window.setTimeout = function(x, y) {};
}

if ( ! window.console ) {
    window.console = { log: function(msg) {}, error: function(msg) {} };
}

var require = require;
// ============================================================================

var apimodule_init = function (VD) {

    VD.provide('', {

        init: function(options) {
            // only need to list values here that do not already have a falsy default.
            // this is why cookie/session/status are not listed here.
            options = VD.copy(options || {}, {
                logging: true
            });

            VD._apiKey = options.apiKey;
            if ((typeof(options.cookieName) == 'undefined') || ( ! options.cookieName ) ) {
                var config = require('config').get();
                if (typeof(config.api.cookieName) != 'undefined') {
                    options.cookieName = config.api.cookieName;
                } else {
                    options.cookieName = null;
                }
            }
            VD._cookieName = options.cookieName || "vds_" + VD._apiKey;
            VD._accessToken = options.access_token;

            // disable logging if told to do so, but only if the url doesnt have the
            // token to turn it on. this allows for easier debugging of third party
            // sites even if logging has been turned off.
            if (!options.logging && window.location.toString().indexOf('vd_debug=1') < 0) {
                VD._logging = false;
            }

            if (VD._apiKey) {
                // enable cookie support if told to do so
                VD.Cookie.setEnabled(options.cookie);

                // if an explicit session was not given, try to _read_ an existing cookie.
                // we dont enable writing automatically, but we do read automatically.
                options.session = options.session || VD.Auth._receivedSession || VD.Cookie.load();

                // set the session
                VD.Auth.setSession(options.session, options.session ? 'connected' : 'unknown');

                // load a fresh session if requested
                if (options.status) {
                    VD.getLoginStatus();
                }
            }
        }
    });

    // ------------------------------------------------------------------------

    // this is useful when the library is being loaded asynchronously
    //
    // we do it in a setTimeout to wait until the current event loop as finished.
    // this allows potential library code being included below this block (possible
    // when being served from an automatically combined version)
    window.setTimeout(function() { if (window.vdAsyncInit) { vdAsyncInit(); }}, 0);

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_init;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.cookie
// @requires vd.prelude
//           vd.qs
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
var require = require;
var document = window.document;
document = (typeof document == 'undefined') ? { cookie: ''} : document;
// ============================================================================

var apimodule_cookie = function (VD) {

    VD.provide('Cookie', {
        _domain: null,
        _enabled: false,

        // --------------------------------------------------------------------

        setEnabled: function(val) {
			VD.Cookie._enabled = val;
        },

        getEnabled: function() {
            return VD.Cookie._enabled;
        },

        // --------------------------------------------------------------------

		getViadeo: function(nodeReq) {
	        if (!nodeReq) {
                cookie = document.cookie;
            } else if (nodeReq != -1) {
                cookie = nodeReq.headers.cookie || '';
            } else {
                return null;
            }

            console.log("COOKIE RAW: ", cookie);
            cookie = cookie.match('\\brememberMe=([^;,]*)\\b');

            if (cookie) {
                console.log("CATCHED: ", cookie[1]);
            }

            if (cookie) {
				return cookie[1];
			}
			return null;
		},


        /**
         * Try loading the session from the Cookie.
         *
         * @access private
         * @return {Object} the session object from the cookie if one is found
         */
        load: function(nodeReq) {

            // note, we have the opening quote for the value in the regex, but do
            // not have a closing quote. this is because the \b already handles it.
            var cookie = null,
                session = null,
                cookieName = VD._cookieName
            ;

            if (!nodeReq) {
                cookie = document.cookie;
            } else if (nodeReq != -1) {
                cookie = nodeReq.headers.cookie || '';
            } else {
                return null;
            }

            cookie = cookie.match('\\b' + cookieName + '="?([^;,]*)\\b');

            vd = VD.Cookie.getViadeo(nodeReq);

            console.log("COOKIE VD IN LOAD: " + vd); 

            if (cookie) {
                // url encoded session stored as "sub-cookies"
                session = VD.QS.decode(cookie[1]);
                console.log("SESSION FROM COOKIE: ", session);
				if (vd != session.vd) {
                    console.log("RETURN NULL COOKIE");
					return null;
				}
                // decodes as a string, convert to a number
                session.expires = parseInt(session.expires, 10);
                // capture base_domain for use when we need to clear
                VD.Cookie._domain = session.base_domain;
            }

            return session;
        },

        // --------------------------------------------------------------------

        /**
         * Helper function to set cookie value.

         *
         * @access private
         * @param val    {String} the string value (should already be encoded)
         * @param ts     {Number} a unix timestamp denoting expiry
         * @param domain {String} optional domain for cookie

         */
        setRaw: function(val, ts, domain, nodeReq, originalCookie) {
            var cookieName = originalCookie || VD._cookieName;
            var expires    = (val && ts == 0) ? null : new Date(ts * 1000);
			var nodeReq;

            if (typeof(window.document) == 'undefined') { // Node
                if (nodeReq) {
                    nodeReq.res.cookie(cookieName, val, 
                                       {
                                        expires: expires, 
                                        domain: domain, 
                                        path: '/', 
                                        httpOnly: false 
                                       }
                                      );
                }
            } else { // Browser
                document.cookie = cookieName + '="' + val + '"'
                                + (expires ? '; expires=' + expires : '')
                                + '; path=/'
                                + (domain ? '; domain=' + domain : '') ;
            }
        },

        // --------------------------------------------------------------------

        /**
         * Set the cookie using the given session object.

         *
         * @access private
         * @param session {Object} the session object
         */
        set: function(session, nodeReq) {
            if (session) {
                session.vd = VD.Cookie.getViadeo(nodeReq);
                console.log("SET VD COOKIE: ", session);
                if(isNaN(session.expires)){
                    session.expires = 0;
                }
                VD.Cookie.setRaw(VD.QS.encode(session), session.expires, session.base_domain, nodeReq);
                VD.Cookie._domain = session.base_domain;
            }
        },

        // --------------------------------------------------------------------

        /**
         * Clear the cookie.
         *
         * @access private
         */
        clear: function(nodeReq) {
            console.log('clear cookie');
            VD.Cookie.setRaw('', 0, VD.Cookie._domain, nodeReq);
        },

        // --------------------------------------------------------------------

        clearWeb: function(nodeReq, domain) {
            console.log('clear web cookie');
            var cookies = [ 'apiRememberMe', 'rememberMe', 'autoReconnect', 'stayConnected' ];
            for ( id in cookies ) {
                VD.Cookie.setRaw('', 0, domain, nodeReq, cookies[id]);
            }
        },

    });

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_cookie;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}


/**
 * This is the stock JSON2 implementation from www.json.org.
 *
 * Modifications include:
 * 1/ Removal of jslint settings
 *
 * @provides vd.thirdparty.json2
 */

/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.array
// @layer basic
// @requires vd.prelude
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
var require = require;
// ============================================================================

var apimodule_array = function (VD) {

    VD.provide('Array', {

        /**
         * Get index of item inside an array. Return's -1 if element is not found.
         *
         * @param arr {Array} Array to look through.
         * @param item {Object} Item to locate.
         * @return {Number} Index of item.
         */
        indexOf: function (arr, item) {
            if (arr.indexOf) {
                return arr.indexOf(item);
            }
            var length = arr.length;
            if (length) {
                for (var index = 0; index < length; index++) {
                    if (arr[index] === item) {
                        return index;
                    }
                }
            }
            return -1;
        },

        // --------------------------------------------------------------------

        /**
         * Merge items from source into target, but only if they dont exist. Returns
         * the target array back.
         *
         * @param target {Array} Target array.
         * @param source {Array} Source array.
         * @return {Array} Merged array.
         */
        merge: function(target, source) {
            for (var i = 0; i < source.length; i++) {
                if (VD.Array.indexOf(target, source[i]) < 0) {
                    target.push(source[i]);
                }
            }
            return target;
        },

        // --------------------------------------------------------------------

        /**
         * Create an new array from the given array and a filter function.
         *
         * @param arr {Array} Source array.
         * @param fn {Function} Filter callback function.
         * @return {Array} Filtered array.
         */
        filter: function(arr, fn) {
            var b = [];
            for (var i = 0; i < arr.length; i++) {
                if (fn(arr[i])) {
                    b.push(arr[i]);
                }
            }
            return b;
        },

        // --------------------------------------------------------------------

        /**
         * Create an array from the keys in an object.
         *
         * Example: keys({'x': 2, 'y': 3'}) returns ['x', 'y']
         *
         * @param obj {Object} Source object.
         * @param proto {Boolean} Specify true to include inherited properties.
         * @return {Array} The array of keys.
         */
        keys: function(obj, proto) {
            var arr = [];
            for (var key in obj) {
                if (proto || obj.hasOwnProperty(key)) {
                    arr.push(key);
                }
            }
            return arr;
        },

        // --------------------------------------------------------------------

        /**
         * Create an array by performing transformation on the items in a source
         * array.
         *
         * @param arr {Array} Source array.
         * @param transform {Function} Transformation function.
         * @return {Array} The transformed array.
         */
        map: function(arr, transform) {
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
                ret.push(transform(arr[i]));
            }
            return ret;
        },
        
        // --------------------------------------------------------------------

        /**
         * For looping through Arrays and Objects.
         *
         * @param {Object} item   an Array or an Object
         * @param {Function} fn   the callback function for iteration.
         *    The function will be pass (value, [index/key], item) paramters
         * @param {Bool} proto  indicate if properties from the prototype should
         *                      be included
         *
         */
        forEach: function(item, fn, proto) {
            if ( ! item ) {
                return;
            }

            if (Object.prototype.toString.apply(item) === '[object Array]'
                || (!(item instanceof Function) && typeof item.length == 'number')) {
                if (item.forEach) {
                    item.forEach(fn);
                } else {
                    for (var i = 0, l = item.length; i < l; i++) {
                        fn(item[i], i, item);
                    }
                }
            } else {
                for (var key in item) {
                    if (proto || item.hasOwnProperty(key)) {
                        fn(item[key], key, item);
                    }
                }
            }
        }
    });

}

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_array;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}


// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.json
// @requires vd.prelude
//           vd.thirdparty.json2
//
// ============================================================================

// == NODE/XLP/BROWSER COMPATIBILITY TRICKS ===================================
var require = require;
// ============================================================================

var apimodule_json = function (VD) {

    VD.provide('JSON', {

        /**
         * Stringify an object.
         *
         * @param obj {Object} the input object
         * @return {String} the JSON string
         */
        stringify: function(obj) {
            // PrototypeJS is incompatible with native JSON or JSON2 (which is what
            // native JSON is based on)
            try {
                if (window.Prototype && Object.toJSON) {
                    return Object.toJSON(obj);
                } else {
                    return JSON.stringify(obj);
                }
            } catch (e) {
                console.log('ERROR when stringigy data :');
                console.log(obj);
                throw e;
            }
        },

        // --------------------------------------------------------------------

        /**
         * Parse a JSON string.
         *
         * @param str {String} the JSON string
         * @param {Object} the parsed object
         */
        parse: function(str) {
            return JSON.parse(str);
        },

        // --------------------------------------------------------------------

        /**
         * Flatten an object to "stringified" values only. This is useful as a
         * pre-processing query strings where the server expects query parameter
         * values to be JSON encoded.
         *
         * @param obj {Object} the input object
         * @return {Object} object with only string values
         */
        flatten: function(obj) {
            var flat = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var value = obj[key];
                    if (null === value || undefined === value) {
                        continue;
                    } else if (typeof value == 'string') {
                        flat[key] = value;
                    } else {
                        flat[key] = VD.JSON.stringify(value);
                    }
                }
            }
            return flat;
        }
    });

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_json;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ============================================================================

var apimodule_network = function (VD) {

    // Network compatibility switchs ==============================================
    if ( typeof window.document != 'undefined' ) { // In browser

        console.log('NETWORK IN BROWSER');
        VD.provide('Network', {
            connect: function(path, method, params, cb) {
                var g = VD.guid(), script = document.createElement('script');
        
                // jsonp needs method overrides as the request itself is always a GET
                if (method && method != 'get' && method != 'GET') {
                  params.method = method;
                }
                params.jsonp = 'VD.ApiServer._callbacks.' + g;
        
                var url = (VD.ApiServer.endpoint(path) + path + (path.indexOf('?') > -1 ? '&' : '?') + VD.QS.encode(params));
                if (url.length > 2000) {
                    throw new Error('JSONP only support a maximum of 2000 bytes of input.');
                }
        
                // this is the JSONP callback invoked by the response
        
                VD.ApiServer._callbacks[g] = function(response) {
                    cb && cb(response);
                    delete VD.ApiServer._callbacks[g];
                    script.src = null;
                    script.parentNode.removeChild(script);
                };
        
                script.src = url;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }); 

    } else { // Node.JS ===========================================================
        
        var log4js     = require('log4js');
        var logger     = log4js.getLogger('api/network');
        var dataLogger = log4js.getLogger('api/network/data');

        console.log('NETWORK IN NODE');
        VD.provide('Network', {
            connect: function(path, method, params, cb) {
                var g = VD.guid();
                var http = (VD.ApiServer.proto == 'https') ? require('https') : require('http');

                var getError = function(type, msg) {
                    return { error: { type: type, message: [ msg ] } };
                }

                // Prepare request ------------------------------------------------
                if (method) {
                    method = method.toUpperCase();
                }

                if (method && method == 'GET') {
                    params.method = null;
                }

                var dataParams = VD.QS.encode(params);
                if ( ! ( method && ( (method == 'POST') || (method == 'PUT') ) ) ) {
                    path = '/' + path + (path.indexOf('?') > -1 ? '&' : '?') + dataParams; 
                } else {
                    // FIXME: Temp hack because of an API bug: access_token must be in url
                    path = '/' + path + (path.indexOf('?') > -1 ? '&' : '?') + 'access_token=' + params['access_token'];
                    params['access_token'] = null;
                    dataParams = VD.QS.encode(params);
                }

                var options = {
                  host: VD.ApiServer.host,
                  port: VD.ApiServer.port,
                  path: path,
                  method: method
                };
                dataLogger.debug('API '+g+' CONNECT : \'', options);

                for (var param in params) {
                    var str = params[param];
                    if (str)
                        dataLogger.debug('API '+g+' PARAM : \''+param+'\': '
                                         + str.substring(0, 50)
                                         + ((str.length > 50) ? '...' : '')
                                        );
                }

                if (method && ((method == 'POST') || (method == 'PUT'))) {
                    options.headers = {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      'Content-Length': dataParams.length
                    }
                }

                // Launch request -------------------------------------------------
                logger.debug('API '+g+': ' + path);
                var req = http.request(options);
                if (method && ((method == 'POST') || (method == 'PUT'))) {
                    req.write(dataParams);
                }
                req.end();
                logger.debug('API '+g+': REQUEST SENT');

                // Response handler -----------------------------------------------
                req.on('response', function(res) {
                  logger.debug('API '+g+': RESPONSE RECEIVED');
                  var body = '';

                  var codeFamily = parseInt(res.statusCode / 100) * 100;
                  logger.debug('API '+g+': statusCode: ', res.statusCode);
                  dataLogger.debug('API '+g+': headers: ', res.headers);

                  // Buffer chunks ------------------------------------------------
                  res.on('data', function (d) {
                    body += d;
                  });

                  // End of buffering ---------------------------------------------
                  res.on('end', function () {
                    logger.debug('API '+g+': REQUEST ENDED');
                    if (cb) {

                        try {
                            body = JSON.parse(body);
                        } catch (e) {
                            logger.error('API '+g+': JSON parse error: '+e);
						    logger.error(body);
                            body = { data: body };
                        }

//                        dataLogger.debug('API '+g+' BODY: ', body);
                        logger.debug(codeFamily);

                        if (codeFamily != 200) {
                            if (body) {
                                cb(body, res.statusCode);
                            } else {
                                cb(getError('API Error', e), res.statusCode);
                            }
                        } else {
                            cb(body, res.statusCode);
                        }

                      }
                  });

                });

                // Error handler --------------------------------------------------
                req.on('error', function(e) {
                  console.error('HTTP error: '+e);
                  cb(getError('Connection Error', e));
                });
        
            }
        });

    }

};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_network;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}

// ============================================================================
// VIADEO GRAPH API CONNECTOR -- NODE.JS FRAMEWORK FOR A BETTER WORLD WITH APIs
//                   XLP - eXecution and Loading Planner
// ============================================================================
//             www.viadeo.com - api.video.com - dev.viadeo.com
//
//             Copyright (C) Viadeo 2011 - All rights reserved
// ============================================================================
//              Highly inspired from Facebook connect JS SDK
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @provides vd.api
// @requires vd.prelude
//           vd.qs
//           vd.json
//           vd.array
//
// ============================================================================

var apimodule_api = function (VD) {

    VD.provide('', {
        api: function()
        {
            VD.ApiServer.call.apply(VD.ApiServer, arguments);
        }
    });

    // ------------------------------------------------------------------------

    var config          = require('config').get();
    var config_endpoint = config.api.api_uri;

    // ------------------------------------------------------------------------

    VD.provide('ApiServer', {

        METHODS: ['get', 'post', 'put', 'delete'],
        endpoint: undefined,
        host: undefined,
        port: undefined,
        proto: undefined,
        _callbacks: {},

        // --------------------------------------------------------------------

        /**
         * Sets the API base url
         *
         * setUrl('http://....');
         * setUrl() default to configuration
         *
         */
        setUrl: function(user_url) {
            var url = config_endpoint;
            if (user_url) {
                url = function() { return user_url }
            }
            var regexp   = /^(https?):\/\/([^\/:]+)(:([0-9]+))?\/?$/;
            var matches  = regexp.exec(url());

            VD.ApiServer.proto    = matches[1];
            try {
                VD.ApiServer.port = matches[4];
            } catch (e) { /* ignore */ }

            if ( ! VD.ApiServer.port ) {
                VD.ApiServer.port = (VD.ApiServer.proto == 'http') ? 80 : 443;
            }
            VD.ApiServer.host     = matches[2];
            VD.ApiServer.endpoint = url;
        },


        // --------------------------------------------------------------------

        /**
         * Make a API call to Viadeo's RESTful API.
         *
         * Except the path, all arguments to this function are optional. So any of
         * these are valid:
         *
         *   VD.api('/me') // throw away the response
         *   VD.api('/me', function(r) { console.log(r) })
         *   VD.api('/me', { fields: 'email' }); // throw away response
         *   VD.api('/me', { fields: 'email' }, function(r) { console.log(r) });
         *   VD.api('/12345678', 'delete', function(r) { console.log(r) });
         *   VD.api(
         *     '/me/feed',
         *     'post',
         *     { body: 'hi there' },
         *     function(r) { console.log(r) }
         *   );
         *
         * @access private
         * @param path   {String}   the url path
         * @param method {String}   the http method
         * @param params {Object}   the parameters for the query
         * @param cb     {Function} the callback function to handle the response
         */
        call: function() {

            var args = Array.prototype.slice.call(arguments),
                path = args.shift(),
                next = args.shift(),
                method, params, cb;

            while (next) {
                var type = typeof next;
                if (type === 'string' && !method) {
                    method = next.toLowerCase();
                } else if (type === 'function' && !cb) {
                    cb = next;
                } else if (type === 'object' && !params) {
                    params = next;
                } else {
                    VD.log('Invalid argument passed to VD.api(): ' + next);
                    return;
                }
                next = args.shift();
            }

            method = method || 'get';
            params = params || {};

            // remove prefix slash if one is given, as it's already in the base url
            if (path[0] === '/') {
                path = path.substr(1);
            }

            if (VD.Array.indexOf(VD.ApiServer.METHODS, method) < 0) {
                VD.log('Invalid method passed to VD.api(): ' + method);
                return;
            }

            VD.ApiServer.oauthRequest(path, method, params, cb);
        },

        // --------------------------------------------------------------------

        /**
         * Add the oauth parameter, and fire off a request.
         *
         * @access private
         * @param path   {String}   the request path
         * @param method {String}   the http method
         * @param params {Object}   the parameters for the query
         * @param cb     {Function} the callback function to handle the response
         */
        oauthRequest: function(path, method, params, cb) {

            if (VD.getSession) {
                var session = VD.getSession();
                if (session && session.access_token && !params.access_token) {
                    params.access_token = session.access_token;
                }
            }

            if (!params.access_token && VD._accessToken) {
                params.access_token = VD._accessToken;
            }

            VD.Network.connect(path, method, VD.JSON.flatten(params), cb);
        },

    });

    // ------------------------------------------------------------------------

    VD.ApiServer.setUrl();
};

// ----------------------------------------------------------------------------

var init = this.init = exports.init = apimodule_api;
if ( typeof window.document != 'undefined' && typeof XLP == 'undefined' ) {
    init(window.VD);
}


