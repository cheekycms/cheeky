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
                        
                var path = (attrs.path || attrs.cheekyContent),
                    $element = angular.element(element);
                
                scope.$on('$cheekyEditModeActive', onEditMode);
                scope.$on('$cheekyViewModeActive', onViewMode);
                
                function onEditMode(){
                    $element.addClass('cheeky-editable');
                    $element.on('click', onEditableClick);
                }
                
                function onViewMode(){
                    $element.removeClass('cheeky-editable');
                    $element.off('click', onEditableClick);
                }

                scope.$on('$destroy', function(){
                    $element.off('click', onEditableClick);
                });
                
                function onEditableClick(){
                    window.aloha($element[0]);
                    $element.addClass('cheeky-edit-active');
                }
            }
        };
    }
]);