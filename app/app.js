/**
 * App's JavaScript
 */
$(document).ready(function() { // container for entire script

    // Collapse the navbar menu on anchor click
    $('#navbar .nav a').click(function(){
        $('.collapse').collapse('hide');
    });

    // Dont allow link clicks in flip cards propagate
    $('.flip-container a').click(function(event) {
        event.stopPropagation();
    });
    
    // Flip a card on click by toggling the 'is-flipped' class.
    $('.flip-container').click(function() {
        $('.flip-container.is-flipped').not(this).removeClass('is-flipped');
        $(this).toggleClass('is-flipped');
    });

    // Update footer copyright year
    $('footer .copyright-year').text(new Date().getFullYear());
    
}); // end container for entire script
