'use strict';

/**
 * Cheeky event constants
 * @ngdoc constant
 * @name cheekyEvents
 */
angular.module('cheeky').constant('cheekyEvents', {
    showEditor: '$cheekyShowEditor',
    showPreview: '$cheekyShowPreview',
    cancelChanges: '$cheekyCancelChanges',
    saveChanges: '$cheekySaveChanges',
    beginEdit: '$cheekyBeginEdit',
    endEdit: '$cheekyEndEdit',
});