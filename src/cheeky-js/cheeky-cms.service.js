/**
 * @ngdoc provider
 * @name cheekyCMS
 */
angular.module('cheeky').provider('cheekyCMS', [function () {

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