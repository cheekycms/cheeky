/**
 * @ngdoc directive
 * @name cheekyEditable
 */
angular.module('cheeky').directive('cheekyEditable', ['$document', 'cheekyCMS',
    function ($document, content) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                var path = attrs.path || attrs.cheekyContent;

                var $element = angular.element(element);
                $element.addClass('cheeky-editable');

                $element.on('click', function (e) {
                    window.aloha($element[0]);
                    $element.addClass('cheeky-edit-active');
                });
                
            }
        };
    }
]);