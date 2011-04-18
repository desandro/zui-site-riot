

(function(){

  // only proceed if CSS transforms are supported
  if ( !Modernizr.csstransforms ) {
    return;
  }
  
  // the constructor that will do all the work
  function Zoomer( content, nav, navItems ) {
    // keep track of DOM
    this.content = content;
    this.nav = nav;
    this.navItems = navItems;
    
    // position of vertical scroll
    this.scrolled = 0;
    // zero-based number of sections
    this.levels = 4;
    // height of document
    this.docHeight = document.documentElement.offsetHeight
    
    this.levelGuide = {
      '#web-dev' : 0,
      '#front-end' : 1,
      '#css' : 2,
      '#css3' : 3,
      '#transforms' : 4
    };
  }
  
  // enables constructor to be used within event listener
  // like obj.addEventListener( eventName, this, false )
  Zoomer.prototype.handleEvent = function( event ) {
    if ( this[event.type] ) {
      this[event.type](event);
    }
  };
  
  // triggered every time window scrolls
  Zoomer.prototype.scroll = function( event ) {
    // normalize scroll value from 0 to 1
    this.scrolled = window.scrollY / ( this.docHeight - window.innerHeight );
    
    var scale = Math.pow( 3, this.scrolled * this.levels ),
        transformValue = 'scale('+scale+')';
    
    this.content.style.WebkitTransform = transformValue;
    this.content.style.MozTransform = transformValue;
    this.content.style.OTransform = transformValue;
    this.content.style.transform = transformValue;
    
    // change current selection on nav
    this.currentLevel = Math.round( this.scrolled * this.levels );

    if ( this.currentLevel !== this.previousLevel ) {
      var currentNavItem = this.nav.querySelector('.current');
      if ( currentNavItem ) {
        currentNavItem.className = '';
      }
      this.navItems[ this.currentLevel ].className = 'current';
      this.previousLevel = this.currentLevel;
    }
    
  };
  
  // triggered on nav click
  Zoomer.prototype.click = function( event ) {
    //  get scroll based on href of clicked nav item
    var hash = event.target.hash || event.target.parentNode.hash;
    
    if ( Modernizr.csstransitions ) {
      this.content.className = 'transitions-enabled';
      this.content.addEventListener( 'webkitTransitionEnd', this, false );
      this.content.addEventListener( 'oTransitionEnd', this, false );
      this.content.addEventListener( 'transitionend', this, false );
    }
    
    this.scrollFromHash( hash );
    event.preventDefault();
  };
  
  Zoomer.prototype.scrollFromHash = function( hash ) {
    var targetLevel = this.levelGuide[ hash ];
    // proceed only if hash matches a level
    if ( targetLevel === undefined ) {
      return;
    }
    var scrollY = targetLevel / this.levels;
    // adjust for scrollable height
    scrollY = scrollY * ( this.docHeight - window.innerHeight );
    // set hash in location URL
    window.location.hash = hash;
    // set scroll position, Zoomer.scroll will take care of the rest
    window.scrollTo( 0, scrollY );
  };

  Zoomer.prototype.webkitTransitionEnd = function( event ) {
    this.transitionEnded( event );
  };
  Zoomer.prototype.transitionend = function( event ) {
    this.transitionEnded( event );
  };
  Zoomer.prototype.oTransitionEnd = function( event ) {
    this.transitionEnded( event );
  };

  // disables transition after nav click
  Zoomer.prototype.transitionEnded = function( event ) {
    this.content.className = '';
    this.content.removeEventListener( 'webkitTransitionEnd', this, false );
    this.content.removeEventListener( 'transitionend', this, false );
    this.content.removeEventListener( 'oTransitionEnd', this, false );
  };

  function init() {
    var content = document.getElementById('content'),
        nav = document.getElementById('nav'),
        navItems = nav.getElementsByTagName('li'),

        // init Zoomer constructor
        ZUI = new Zoomer( content, nav, navItems );

    // bind Zoomer to scroll event
    window.addEventListener( 'scroll', ZUI, false);
    
    if ( window.location.hash ) {
      ZUI.scrollFromHash( window.location.hash );
    }
    
    // bind Zoomer.click to nav item clicks
    var navItems = document.querySelectorAll('#nav a');
    for (var i=0, len = navItems.length; i < len; i++) {
      navItems[i].addEventListener( 'click', ZUI, false );
    }
  }
  
  window.addEventListener( 'load', init, false );
  
})();
