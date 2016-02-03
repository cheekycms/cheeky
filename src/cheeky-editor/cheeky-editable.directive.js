/**
 * @ngdoc directive
 * @name cheekyEditable
 */
angular.module('cheeky').directive('cheekyEditable', ['$rootScope', '$document', 'cheekyCMS', 'cheekyEvents',
    function ($rootScope, $document, content, ckEvents) {
        return {
            restrict: 'A',
            link: function (scope, $element, attrs) {
                if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                var path = (attrs.path || attrs.cheekyContent);
                                   
                // editing ckEvents
                scope.$on(ckEvents.showEditor, onShowEditor);
                scope.$on(ckEvents.showPreview, onShowPreview);
                
                function onShowEditor(){
                    $element.addClass('cheeky-editable');
                    $element.on('click', onEditableClick);
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
                    $rootScope.$broadcast(ckEvents.beginEdit, { element: $element[0] });
                    $document.on('click', onDocumentClick);
                }
                
                function onEditableBlur(){
                    if($element.hasClass('cheeky-edit-active')){
                        window.aloha.mahalo($element[0]);
                        $element.removeClass('cheeky-edit-active');
                        $rootScope.$broadcast(ckEvents.endEdit, { element: $element[0] });
                        $document.off('click', onDocumentClick);
                    }
                }
                                
                function onDocumentClick(event) {
                    // TODO: we need to do mouse math here instead for more accuracy
                    var eventOutsideTarget = (element[0] !== event.target) && (0 === element.find(event.target).length),
                        isRibbon = angular.element('#cheeky-ribbon').find(event.target).length > 0;
                    
                    if (eventOutsideTarget && !isRibbon) {
                        scope.$apply(onEditableBlur);
                    }
                }
                                
                // data ckEvents
                scope.$on(ckEvents.cancelChanges, onCancelChanges);
                scope.$on(ckEvents.saveChanges, onSaveChanges);
                
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