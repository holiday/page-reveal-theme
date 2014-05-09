/**
 *	Parallax Effect
 * 	Credits go to optikalefx for his explanation
 */


var Parallax = (function($){

	function Parallax(el) {
		this.el = el;
		this.sections = $(el);
		this.top = $(window).scrollTop();
		this.len = this.sections.length;
		this.i = 0;
		this.y;
		this.div;
		this.offset;
		this.offsets;
		this.scroll;
		this.top;
		this.transform;

		//compute offsets of each section from top using a mapping function
		this.offsets = this.sections.get().map(function(div,d) {
			return $(div).offset();
		});

		//listen for scroll events so we prevent choppy scrolling
		window.addEventListener("mousewheel", Parallax.prototype.mouseScroll, false);
	}

	/**
	 *	Fix For choppy/jerky scroll on browsers without smooth scroll
	 */
	Parallax.prototype.mouseScroll = function(evt) {		         
	    // cancel the default scroll behavior
	    if (evt.preventDefault) {
	        evt.preventDefault();
	    }
	     
	    // deal with different browsers calculating the delta differently
	    if (evt.wheelDelta) {
	        mouseDelta = evt.wheelDelta / 120;
	    } else if (e.detail) {
	        mouseDelta = -evt.detail / 3;
	    }

	    self.y = $(window).scrollTop();  //your current y position on the page
	    $(window).scrollTop(self.y + evt.deltaY);
	}

	Parallax.prototype.start = function() {
		var self = this;

		var render = function() {

			self.top = $(window).scrollTop();

			for(self.i = 0; self.i < self.len; self.i++) {

				self.div = self.sections[self.i];

				self.offset = self.top - self.offsets[self.i].top;

				self.scroll = ~~((self.offset / 600) * 300);

				self.transform = 'translate3d(0px, ' + self.scroll + 'px, 0px)';

				self.div.style.webkitTransform = self.transform;
				self.div.style.MozTransform = self.transform
				self.div.style.msTransform = self.transform;
				self.div.style.OTransform = self.transform;
				self.div.style.transform = self.transform;
			}
		};

		(function loop() {
			requestAnimationFrame(loop);
			render();
		})();
	};

	 /**
	  *	Paul Irish's requestAnimationFrame polyfill
	  */
	 (function() {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame =
	          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }

	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };

	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

	return Parallax;	

})(jQuery);