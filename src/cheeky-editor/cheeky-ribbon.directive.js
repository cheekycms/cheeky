'use strict';

/**
 * Injects the ribbon into the DOM and hooks into angulars scope
 */
$(function () {
    var $div = $('<cheeky-ribbon></cheeky-ribbon>');
    $(document.body).prepend($div);
    document.body.classList.add('cheeky-ribbon-visible');

    var injector = angular.element('[ng-app]').injector();

    injector.invoke(['$compile', function ($compile) {
        var scope = angular.element($div).scope();
        $compile($div)(scope);
    }]);
});

/**
 * @ngdoc directive
 * @name cheekyRibbon
 */
angular.module('cheeky').directive('cheekyRibbon', ['$rootScope', '$document', 'cheekyEvents',
    function ($rootScope, $document, events) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'cheeky-ribbon.html',
            link: function (scope, element, attrs) {
                if (!window.aloha) return; // if aloha does not exist, editing is disabled
                        
                
            },
            controller: ['$rootScope', '$scope', 'cheekyEvents',
                function ($rootScope, $scope, events) {
                    $scope.modes = {
                        edit: 'edit',
                        preview: 'preview'
                    };

                    // props
                    $scope.mode = $scope.modes.preview;
                
                    // methods
                    $scope.showEditor = showEditor;
                    $scope.showPreview = showPreview;

                    function showEditor() {
                        $scope.mode = $scope.modes.edit;
                        $rootScope.$broadcast(events.showEditor, {});
                    }

                    function showPreview() {
                        $scope.mode = $scope.modes.preview;
                        $rootScope.$broadcast(events.showPreview, {});
                    }
                }]
        };
    }
]);