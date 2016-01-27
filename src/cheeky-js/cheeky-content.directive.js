/**
 * @ngdoc directive
 * @name cheekyContent
 */
angular.module('cheeky').directive('cheekyContent', ['cheekyCMS',
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
]);