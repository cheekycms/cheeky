$(function() {
    $('*').filter(function() {
        // Prevent navbars from getting stuck under the ribbon.  Note: This may cause adverse effects elsewhere, and may need to change.
        if($(this).css("position") === 'fixed'){
            $(this).css('position','static');
        }
    });

    // TODO: If you want tp prevent the ribbon from covering part of the page when the ribbon breaks to two lines, implement this logic where the height of the ribbon can be determined.  Because of how it's added to the page, the method below does not work.
    //var ribbonheight = $('#cheeky-ribbon').height();
    //$('.cheeky-active').css('padding-top',ribbonheight);
});