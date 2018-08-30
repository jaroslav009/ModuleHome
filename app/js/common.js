$(function() {
	$('.hamburger').click(function(event) {
		/* Act on the event */
		$('.menu-hide-up').slideToggle(400);
	});

	$(window).on('load', function(event) {
    	$('.brand').jQueryEqualHeight();
	});

});