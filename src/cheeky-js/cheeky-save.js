'use strict'

// ie9+
var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
    // inject ribbon
    var template = document.getElementById('template/cheeky-ribbon');
    var ribbon = template.innerHTML;
    document.body.insertAdjacentHTML('afterbegin', ribbon);
    document.body.classList.add('cheeky-active');
    
    for (var command in aloha.ui.commands) {
        $('.cheeky-button-' + command).on('click', aloha.ui.command(aloha.ui.commands[command]));
    }
});

/**
 * @ngdoc overview
 * @name cheeky
 * @description Angular Services for Cheeky CMS
 */
angular.module('cheeky', ['angular-cache'])

/**
 * @ngdoc directive
 * @name cheekyContent
 */
    .directive('cheekyContent', ['cheekyCMS',
        function (content) {
            return {
                restrict: 'EA',
                link: function (scope, element, attrs) {
                    var path = attrs.path || attrs.cheekyContent;
                    content.fetch(path).then(function (data) {
                        if (data) {
                            element.html(data);
                        }
                        else {
                            console.log('[cheeky]', 'No content found for path', path);
                        }
                    });
                }
            };
        }
    ])

/**
 * @ngdoc directive
 * @name cheekyEditable
 */
    .directive('cheekyEditable', ['cheekyCMS',
        function (content) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                    var path = attrs.path || attrs.cheekyContent;
                        
                    var $element = angular.element(element);
                    $element.addClass('cheeky-editable');
                    
                    $element.on('click', function(e){
                        window.aloha($element[0]);    
                        $element.addClass('cheeky-edit-active');
                    });
                    
                }
            };
        }
    ])

/**
 * @ngdoc provider
 * @name cheekyCMS
 */
    .provider('cheekyCMS', [function () {

        // configurations
        var CACHE_KEY = 'cheeky';
        var CACHE_LIFETIME = 15 * 60 * 1000;
        var STORAGE_MODE = 'localStorage';
        var KEY_MAP = {};
            
        /**
         * Sets the CMS key mapping
         */
        this.map = function (m) {
            KEY_MAP = m;
        };

        /**
         * Provider extension
         */
        this.$get = ['$q', '$http', 'CacheFactory',
            function ($q, $http, CacheFactory) {
                    
                // configure the cache factory    
                CacheFactory(CACHE_KEY, {
                    maxAge: CACHE_LIFETIME,
                    storageMode: STORAGE_MODE
                });

                // fetches content for a given path
                // path follows the format {namespace}.{name}.{name}
                // the namespace corresponds to an endpoint
                function fetch(path) {

                    var deferred = $q.defer(),
                        parts = path.split('.'),
                        ns = parts[0],
                        cp = parts.slice(1).join('.');

                    _fetch(ns).then(function (cache) {
                        // reject if empty, allow for silent fail
                        deferred.resolve(_.get(cache, cp));
                    });
                    return deferred.promise;
                }

                /**
                 * Warmup the cache
                 */
                function warmup(ns) {
                    _fetch(ns);
                }

                /**
                 * Internal fetch of cms content
                 * @private
                 */
                function _fetch(ns) {
                    var deferred = $q.defer();
                    $http.get(KEY_MAP[ns], {
                        cache: CacheFactory.get(CACHE_KEY)
                    }).success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                }

                return {
                    fetch: fetch,
                    warmup: warmup
                };
            }];
    }
    ]);

