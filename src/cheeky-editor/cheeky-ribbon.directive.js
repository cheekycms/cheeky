'use strict';

/**
 * Injects the ribbon into the DOM and hooks into angulars scope
 */
$(function () {
    var $div = $('<cheeky-ribbon></cheeky-ribbon>');
    $(document.body).prepend($div);
    document.body.classList.add('cheeky-ribbon-visible');
    
    var injector = angular.element('[ng-app]').injector();
    
    injector.invoke(['$compile', function($compile){
       var scope = angular.element($div).scope();
       $compile($div)(scope);
    }]);
});

/**
 * @ngdoc directive
 * @name cheekyRibbon
 */
angular.module('cheeky').directive('cheekyRibbon', ['$document', 'cheekyCMS',
    function ($document, content) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'cheeky-ribbon.html',
            link: function (scope, element, attrs) {
                if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                $document.on('click', onDocumentClick);
                scope.$on('$destroy', function () {
                    $document.off('click', onDocumentClick);
                });
                
                function onDocumentClick(){
                    console.log('ugh');
                }
            }
        };
    }
]);