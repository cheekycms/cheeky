/**
 * @ngdoc directive
 * @name cheekyEditable
 */
angular.module('cheeky').directive('cheekyEditable', ['$document', 'cheekyCMS', 'cheekyEvents',
    function ($document, content, events) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                var path = (attrs.path || attrs.cheekyContent),
                    //$element = angular.element(element);
                    $element = element;
                                   
                // editing events
                scope.$on(events.showEditor, onShowEditor);
                scope.$on(events.showPreview, onShowPreview);
                
                function onShowEditor(){
                    $element.addClass('cheeky-editable');
                    $element.on('click', onEditableClick);
                    $document.on('click', onDocumentClick);
                }
                
                function onShowPreview(){
                    onEditableBlur();
                    $element.removeClass('cheeky-editable');
                    $element.off('click', onEditableClick);
                    $document.off('click', onDocumentClick);
                }
                
                function onEditableClick(){
                    window.aloha($element[0]);
                    $element.addClass('cheeky-edit-active');
                }
                
                function onEditableBlur(){
                    if($element.hasClass('cheeky-edit-active')){
                        window.aloha.mahalo($element[0]);
                        console.log($element[0]);
                        console.log(element[0]);
                        $element.removeClass('cheeky-edit-active');
                    }
                }
                                
                function onDocumentClick(e) {
                    var eventOutsideTarget = (element[0] !== event.target) && (0 === element.find(event.target).length);
                    if (eventOutsideTarget) {
                        scope.$apply(onEditableBlur);
                    }
                }
                                
                // data events
                scope.$on(events.cancelChanges, onCancelChanges);
                scope.$on(events.saveChanges, onSaveChanges);
                
                function onCancelChanges(){
                    
                }
                function onSaveChanges(){
                    
                }

                // destroy the scope                
                scope.$on('$destroy', function(){
                    $element.off('click', onEditableClick);
                    $document.off('click', onDocumentClick);
                });
            }
        };
    }
]);