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
	
	
$("#checkall").on("click", function() {
  var all = $(this);
  $('input:checkbox').each(function() {
       $(this).prop("checked", all.prop("checked"));
  });
});

});

// UTILITY FUNCTIONS 

function IsNumeric(n) {
    return !isNaN(n);
} 

function CleanNumber(value) {

    // Assumes string input, removes all commas, dollar signs, and spaces      
    newValue = value.replace(",","");
    newValue = newValue.replace("$","");
    newValue = newValue.replace(/ /g,'');
    return newValue;
    
}

function CommaFormatted(amount) {
    
	var delimiter = ","; 
	var i = parseInt(amount);
	
	if(isNaN(i)) { return ''; }
	
	i = Math.abs(i);
	
	var minus = '';
	if (i < 0) { minus = '-'; }
	
	var n = new String(i);
	var a = [];
	
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	
	if (n.length > 0) { a.unshift(n); }
	
	n = a.join(delimiter);
	
	amount = "$" + minus + n;
	
	return amount;
	
}


// ORDER FORM UTILITY FUNCTIONS

function applyName(klass, numPallets) {

    var toAdd = $("td." + klass).text();
    
    var actualClass = $("td." + klass).attr("rel");
    
    $("input." + actualClass).attr("value", numPallets + " pallets");
    
}

function removeName(klass) {
    
    var actualClass = $("td." + klass).attr("rel");
    
    $("input." + actualClass).attr("value", "");
    
}

function calcTotalPallets() {

    var totalPallets = 0;

    $(".num-pallets-input").each(function() {
    
        var thisValue = $(this).val();
    
        if ( (IsNumeric(thisValue)) && (thisValue != '') && (thisValue > 0)) {
            totalPallets += parseInt(thisValue);
        };
    
    });
    
    $("#total-pallets-input").val(totalPallets);

}

function calcOrderTotal() {
    
    var OrderTotal = 0;

    $(".row-total-input").each(function() {
    
        var valString = $(this).val() || 0;
        
        OrderTotal += parseInt(valString);
                    
    });
        
    $("#order-total").val(CommaFormatted(OrderTotal));

}

// DOM READY
$(function() {

    var inc = 1;

    $(".product-title").each(function() {
        
        $(this).addClass("prod-" + inc).attr("rel", "prod-" + inc);
    
        var prodTitle = $(this).text();
                
        $("#foxycart-order-form").append("<input type='hidden' name='" + prodTitle + "' value='' class='prod-" + inc + "' />");
        
        inc++;
    
    });
    
    // Reset form on page load, optional
    $("#fc-price").val("$0");
    $("#order-total").val("$0");
    $("#total-pallets-input").val("0");
    
    // "The Math" is performed pretty much whenever anything happens in the quanity inputs
    $('.num-pallets-input').bind("focus blur change keyup", function(){
    
        // Caching the selector for efficiency 
        var $el = $(this);
    
        // Grab the new quantity the user entered
        var numPallets = CleanNumber($el.val());
                
        // Find the pricing
        var multiplier = $el
            .parent().parent()
            .find("td.price-per-pallet span")
            .text();
        
        // If the quantity is empty, reset everything back to empty
        if ( (numPallets == '') ) {
        
            $el
                .removeClass("warning")
                .parent().parent()
                .find("td.row-total input")
                .val("");
                
            var titleClass = $el.parent().parent().find("td.product-title").attr("rel");
            
            removeName(titleClass);
        
        // If the quantity is valid, calculate the row total
        } else if ( (IsNumeric(numPallets)) && (numPallets != '') && (numPallets >= 0) ) {
            
            var rowTotal = numPallets * multiplier;
            
            $el
                .removeClass("warning")
                .parent().parent()
                .find("td.row-total input")
                .val(rowTotal);
                
            var titleClass = $el.parent().parent().find("td.product-title").attr("rel");
                    
            applyName(titleClass, numPallets);
        
        // If the quantity is invalid, let the user know with UI change                                    
        } else {
        
            $el
                .addClass("warning")
                .parent().parent()
                .find("td.row-total input")
                .val("");
            
            var titleClass = $el.parent().parent().find("td.product-title").attr("rel");
            
            removeName(titleClass);
                                          
        };
        
        // Calcuate the overal totals
        calcOrderTotal();
        calcTotalPallets();
    
    });

});