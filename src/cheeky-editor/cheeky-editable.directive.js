// ie9+
var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
    // inject ribbon
    var template = document.getElementById('template/cheeky-ribbon');
    var ribbon = template.innerHTML;
    document.body.insertAdjacentHTML('afterbegin', ribbon);
        
    // formatting commands
    for (var command in aloha.ui.commands) {
        $('.cheeky-button-' + command).on('click', aloha.ui.command(aloha.ui.commands[command]));
    }
    
    // enable/disable editor
    document.body.classList.add('cheeky-active');
    // $('.enable-editing').on('click', function(){
    //     document.body.classList.add('cms-active');    
    // });
    // $('.disable-editing').on('click', function(){
    //     document.body.classList.remove('cms-active');
    // });
});

/**
 * @ngdoc directive
 * @name cheekyEditable
 */
angular.module('cheeky').directive('cheekyEditable', ['cheekyCMS',
    function (content) {
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