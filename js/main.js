window.jQuery(document).ready(function($){

	'use strict';

	//-------------------- jQuery smooth scrolling --------------------//

	$('a.smooth-scroll').on('click', function(event) {
		var $anchor		= $(this);
		var offsetTop	= '';

		if ($(document).width() >= 769) { offsetTop = parseInt($($anchor.attr('href')).offset().top - 70, 0);
		} else { offsetTop = parseInt($($anchor.attr('href')).offset().top, 0); }

		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 2000,'easeInOutExpo');

		event.preventDefault();
	});

	//-------------------- End jQuery smooth scrolling --------------------//



	//-------------------- jQuery tooltips --------------------//

	$('#header .social a, #post.page-author .author-top .social a').tooltip({placement: 'bottom'});

	//-------------------- End jQuery tooltips --------------------//



	//-------------------- Responsive menu --------------------//

	// Create a top navigation menu for the responsive navigation
	$('#header .nav-menu-top > .container > ul').mobileMenu({
		defaultText:'Please select one option....',
		className:'select-top-nav',
		subMenuDash:'&mdash;'
	});

	// Create a main navigation menu for the responsive navigation
	$('#header .nav-menu-main > .container > ul').mobileMenu({
		defaultText: 'Please select one option....',
		className: 'slect-main-nav',
		subMenuDash: '&mdash;'
	});

	// Make the drop-down work
	$('#header .nav-menu-top select, #header .nav-menu-main select').change(function() {
		window.location = $(this).find("option:selected").val();
	});

	//-------------------- End responsive menu --------------------//



	//-------------------- Slider with Flexslider --------------------//

	// Featured posts slider
	$('#featured-posts .flexslider').flexslider({
		controlNav: false,
		pauseOnHover: true
	});

	// General slider
	$('.flexslider').flexslider({
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		easing: 'easeInOutExpo',
		prevText: '',
		nextText: ''
	});

	//-------------------- End slider with Flexslider --------------------//



	//-------------------- jQuery placeholder for IE --------------------//

	$('input, textarea').placeholder();

	//-------------------- End jQuery placeholder for IE --------------------//



	//-------------------- jQuery figure hover effect --------------------//

	$('figure.figure-hover').hover(
		function() {
			$(this).children('div').fadeIn(200);
			$(this).children('div').children('.icon-hover').animate({
				top:0
			}, 200);
		},
		function() {
			$(this).children('div').fadeOut(200);
			$(this).children('div').children('.icon-hover').animate({
				top:'100%'
			}, 200);
		}
	);

	//-------------------- End jQuery figure hover effect --------------------//



	//-------------------- prettyPhoto for image gallery modal popup --------------------//

	$('a[data-rel^="prettyPhoto"]').prettyPhoto({
		social_tools: false,
		hook: 'data-rel'
	});

	//-------------------- End prettyPhoto for image gallery modal popup --------------------//



	//-------------------- Responsive video size with jQuery --------------------//

	$('body').fitVids();

	//-------------------- End responsive video size with jQuery --------------------//



	//-------------------- Embed elemenet overlay effect --------------------//

	$('figure.embed-section .embed-overlay a').on('click', function(event) {
		$(this).parent('.embed-overlay').fadeOut(1000, function() {
			$(this).remove();
		});

		event.preventDefault();
	});

	//-------------------- End embed elemenet overlay effect --------------------//



	//-------------------- Portfolio filter with jQuery Isotope --------------------//

	$(window).load(function(){
        var $container          = $('#portfolio .portfolio-items');
        var $filter             = $('#portfolio .portfolio-menu-nav');

		// Initialize
        $container.isotope({
            filter              : '*',
            layoutMode          : 'fitRows',
            animationOptions    : {duration: 400}
        });

        // Trigger item lists filter when link clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter             : selector,
                animationOptions   : {animationDuration  : 400, queue : false}
            });
            return false;
        });
    });

	//-------------------- End portfolio filter with jQuery Isotope --------------------//



	//-------------------- Contact form submit process --------------------//

	$('#dotstheme-contact-form').submit(function() {
		var submitData	= $(this).serialize();
		var $name		= $(this).find('input[name="name"]');
		var $email		= $(this).find('input[name="email"]');
		var $subject	= $(this).find('input[name="subject"]');
		var $message	= $(this).find('textarea[name="message"]');
		var $submit		= $(this).find('input[name="submit"]');
		var $dataStatus	= $(this).find('.data-status');

		$name.attr('disabled','disabled');
		$email.attr('disabled','disabled');
		$subject.attr('disabled','disabled');
		$message.attr('disabled','disabled');
		$submit.attr('disabled','disabled');

		$dataStatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');

		$.ajax({ // Send an offer process with AJAX
			type: 'POST',
			url: 'process-contact.php',
			data: submitData + '&action=add',
			dataType: 'html',
			success: function(msg){
				if(parseInt(msg, 0) !== 0) {
					var msg_split = msg.split('|');
					if(msg_split[0] === 'success') {
						$name.val('').removeAttr('disabled');
						$email.val('').removeAttr('disabled');
						$subject.val('').removeAttr('disabled');
						$message.val('').removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					} else {
						$name.removeAttr('disabled');
						$email.removeAttr('disabled');
						$subject.removeAttr('disabled');
						$message.removeAttr('disabled');
						$submit.removeAttr('disabled');
						$dataStatus.html(msg_split[1]).fadeIn();
					}
				}
			}
		});
		return false;
	});

	//-------------------- End contact form submit process --------------------//



	//-------------------- Subscribe form submit process --------------------//

	// Checking subcribe form when focus event
	$('#dotstheme-subscribe-form input[type="text"]').live('focus keypress',function() {
		var $email = $(this);
		if ($email.val() === 'Please enter your email address' || $email.val() === 'Please enter a valid email address' || $email.val() === 'Subscribe process completed' || $email.val() === 'Email is already registered') {
			$(this).val('').css({'color': '#909090', 'backgroundColor': '#FFF'});
		}
	});

	// Checking subcribe form when submit to database
	$('#dotstheme-subscribe-form').submit(function() {
		var $email	= $(this).find('input[type="text"]');
		var $submit	= $(this).find('input[type="submit"]');
		var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		if (email_pattern.test($email.val()) === false) {
			$email.val('Please enter a valid email address').css({'color': '#b95353', 'backgroundColor': '#f0c0c0'});
		} else {
			var submitData = $(this).serialize();
			$email.attr('disabled', 'disabled');
			$submit.attr('disabled', 'disabled');
			$.ajax({ // Subcribe process with AJAX
				type: 'POST',
				url: 'process-subscribe.php',
				data: submitData + '&action=add',
				dataType: 'html',
				success: function(msg){
					if (parseInt(msg, 0) !== 0) {
						var msg_splits = msg.split('|');

						if (msg_splits[0] === 'success') {
							$submit.removeAttr('disabled');
							$email.removeAttr('disabled').val(msg_splits[1]).css({'color': '#328a32', 'backgroundColor': '#baeaba'});
						} else {
							$submit.removeAttr('disabled');
							$email.removeAttr('disabled').val(msg_splits[1]).css({'color': '#b95353', 'backgroundColor': '#f0c0c0'});
						}
					}
				}
			});
		}
		return false;
	});

	//-------------------- End subscribe form submit process --------------------//


	//-------------------- Flickr integration with an image gallery --------------------//

	$('.dotstheme_flickr_widget .flexslider .slides').jflickrfeed({
		limit:10,
		qstrings: {
			id:'36587311@N08' // Your flickr id
		},
		useTemplate: false,
		itemCallback: function(item){
			$(this).append('<li><img src="' + item.image_m + '" alt="' + item.title + '"/></li>');
		}
	}, function() {
		$('.dotstheme_flickr_widget .flexslider').hide().delay(300).fadeIn(function() {
			$(this).flexslider({
				controlNav: false,
				slideshow: false,
				smoothHeight: true,
				easing: 'easeInOutExpo',
				prevText: '',
				nextText: ''
			});
		});
	});

	//-------------------- End flickr integration with an image gallery --------------------//



	//-------------------- Back to top scroll --------------------//

	$('.scrollup').click(function(){
		$('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
		return false;
	});

	//-------------------- End back to top scroll --------------------//

});
