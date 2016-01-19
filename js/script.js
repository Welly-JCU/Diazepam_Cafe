// JavaScript Document
jQuery(document).ready(function() {
	var navOffset = jQuery("nav").offset().top;
	
	jQuery("nav").wrap('<div class="nav-placeholder"></div>');
	jQuery(".nav-placeholder").height(jQuery("nav").outerHeight());
	
	
	jQuery(window).scroll(function() {
		var scrollPos = jQuery(window).scrollTop();			
		if(scrollPos >= navOffset) {
			jQuery("nav").addClass("fixed");
	} else {
		jQuery("nav").removeClass("fixed");
		}
	
	});
		
	$('.image-popup').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          mainClass: 'mfp-img-mobile',
          image: {
            verticalFit: true,
			titleSrc: 'title',
			cursor: 'mfp-zoom-out-cur',
          }
		  
		  });
	
	
});