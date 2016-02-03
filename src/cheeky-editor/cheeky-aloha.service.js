'use strict';

/**
 * @ngdoc service
 * @name cheekyAloha
 */
angular.module('cheeky').factory('cheekyAloha', [function(){
    
    // built-in aloha formatting commands
    var prebuiltCommands = ['p', 'h1', 'h2', 'h3', 'h4', 'ol', 'ul', 'pre', 'bold', 'italic', 'underline', 'unformat'];

    // build prebuilt format commands 
    var format = {};
    for(var i = 0; i < prebuiltCommands.length; i++){
        format[prebuiltCommands[i]] = alohaFormatCommand(aloha.ui.commands[prebuiltCommands[i]]);
    }
        
    // command formatter
    function alohaFormatCommand(alohaCommand){
        return function(event){
            return aloha.ui.command(alohaCommand)(event);
        }
    }
    
    return {
        format: format
    };
    
}]);