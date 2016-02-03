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
angular.module('cheeky').directive('cheekyRibbon', ['$rootScope', '$document',
    function ($rootScope, $document) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'cheeky-ribbon.html',
            link: function (scope, element, attrs) {
                // left blank intentionally
            },
            controller: ['$rootScope', '$scope', 'cheekyEvents', 'cheekyAloha',
                function ($rootScope, $scope, ckEvents, ckAloha) {
                    $scope.modes = {
                        edit: 'edit',
                        preview: 'preview'
                    };

                    // props
                    $scope.mode = $scope.modes.preview;
                
                    // methods
                    $scope.formatBold = ckAloha.format.bold;
                    $scope.formatItalic = ckAloha.format.italic;
                    $scope.formatUnderline = ckAloha.format.underline;
                    $scope.formatH1 = ckAloha.format.h1;
                    $scope.formatH2 = ckAloha.format.h2;
                    $scope.formatH3 = ckAloha.format.h3;
                    $scope.formatH4 = ckAloha.format.h4;
                    $scope.formatOl = ckAloha.format.ol;
                    $scope.formatUl = ckAloha.format.ul;
                    $scope.unformat = ckAloha.format.unformat;
                    $scope.insertLink = function(){};
                    $scope.insertImage = function(){};
                    $scope.undo = function(){ document.execCommand('undo', false, null); };
                    $scope.redo = function(){ document.execCommand('redo', false, null); };
                    $scope.showEditor = showEditor;
                    $scope.showPreview = showPreview;
                                        
                    // events
                    $scope.$on(ckEvents.beginEdit, onBeginEdit);
                    $scope.$on(ckEvents.endEdit, onEndEdit);
                    
                    // begin edit for content editable area
                    function onBeginEdit(e){
                        
                    }
                    function onEndEdit(e){
                        
                    }
                    
                    // show the editor controls
                    function showEditor() {
                        $scope.mode = $scope.modes.edit;
                        $rootScope.$broadcast(ckEvents.showEditor, {});
                    }

                    // show preview / hide editor
                    function showPreview() {
                        $scope.mode = $scope.modes.preview;
                        $rootScope.$broadcast(ckEvents.showPreview, {});
                    }
                }]
        };
    }
]);