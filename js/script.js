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
	
	$("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash); 
    });
	var aChildren = $("nav li").children();
    var aArray = [];
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
	$(window).scroll(function(){
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top;
            var divHeight = $(theID).height(); 
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav_active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav_active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav_active")) {
                var navActiveCurrent = $(".nav_active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav_active");
                $("nav li:last-child a").addClass("nav_active");
            }
        }
    });
});