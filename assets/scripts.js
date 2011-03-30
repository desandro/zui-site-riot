/* Modernizr custom build of 1.7: csstransforms | csstransitions | iepp */
window.Modernizr=function(a,b,c){function G(){}function F(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+p.join(c+" ")+c).split(" ");return!!E(d,b)}function E(a,b){for(var d in a)if(k[a[d]]!==c&&(!b||b(a[d],j)))return!0}function D(a,b){return(""+a).indexOf(b)!==-1}function C(a,b){return typeof a===b}function B(a,b){return A(o.join(a+";")+(b||""))}function A(a){k.cssText=a}var d="1.7",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l=b.createElement("input"),m=":)",n=Object.prototype.toString,o=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),p="Webkit Moz O ms Khtml".split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v,w=function(a){var c=b.createElement("style"),d=b.createElement("div"),e;c.textContent=a+"{#modernizr{height:3px}}",h.appendChild(c),d.id="modernizr",g.appendChild(d),e=d.offsetHeight===3,c.parentNode.removeChild(c),d.parentNode.removeChild(d);return!!e},x=function(){function d(d,e){e=e||b.createElement(a[d]||"div");var f=(d="on"+d)in e;f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=C(e[d],"function"),C(e[d],c)||(e[d]=c),e.removeAttribute(d))),e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),y=({}).hasOwnProperty,z;C(y,c)||C(y.call,c)?z=function(a,b){return b in a&&C(a.constructor.prototype[b],c)}:z=function(a,b){return y.call(a,b)},r.csstransforms=function(){return!!E(["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"])},r.csstransitions=function(){return F("transitionProperty")};for(var H in r)z(r,H)&&(v=H.toLowerCase(),e[v]=r[H](),u.push((e[v]?"":"no-")+v));e.input||G(),e.crosswindowmessaging=e.postmessage,e.historymanagement=e.history,e.addTest=function(a,b){a=a.toLowerCase();if(!e[a]){b=!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b;return e}},A(""),j=l=null,f&&a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function p(a,b){var c=-1,d=a.length,e,f=[];while(++c<d)e=a[c],(b=e.media||b)!="screen"&&f.push(p(e.imports,b),e.cssText);return f.join("")}function o(a){var b=-1;while(++b<e)a.createElement(d[b])}var c="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",d=c.split("|"),e=d.length,f=new RegExp("(^|\\s)("+c+")","gi"),g=new RegExp("<(/*)("+c+")","gi"),h=new RegExp("(^|[^\\n]*?\\s)("+c+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),i=b.createDocumentFragment(),j=b.documentElement,k=j.firstChild,l=b.createElement("body"),m=b.createElement("style"),n;o(b),o(i),k.insertBefore(m,k.firstChild),m.media="print",a.attachEvent("onbeforeprint",function(){var a=-1,c=p(b.styleSheets,"all"),k=[],o;n=n||b.body;while((o=h.exec(c))!=null)k.push((o[1]+o[2]+o[3]).replace(f,"$1.iepp_$2")+o[4]);m.styleSheet.cssText=k.join("\n");while(++a<e){var q=b.getElementsByTagName(d[a]),r=q.length,s=-1;while(++s<r)q[s].className.indexOf("iepp_")<0&&(q[s].className+=" iepp_"+d[a])}i.appendChild(n),j.appendChild(l),l.className=n.className,l.innerHTML=n.innerHTML.replace(g,"<$1font")}),a.attachEvent("onafterprint",function(){l.innerHTML="",j.removeChild(l),j.appendChild(n),m.styleSheet.cssText=""})}(a,b),e._enableHTML5=f,e._version=d,g.className=g.className.replace(/\bno-js\b/,"")+" js "+u.join(" ");return e}(this,this.document);

(function(){

  // only proceed if CSS transforms are supported
  if ( !Modernizr.csstransforms ) {
    return;
  }
  
  // the constructor that will do all the work
  function Zoomer() {
    // position of vertical scroll
    this.scrolled = 0;
    // zero-based number of sections
    this.levels = 4;
    
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
    // init Zoomer constructor
    var ZUI = new Zoomer();
    // get height of page
    ZUI.docHeight = document.documentElement.offsetHeight;
    ZUI.content = document.getElementById('content');
    ZUI.nav = document.getElementById('nav');
    ZUI.navItems = ZUI.nav.querySelectorAll('li');
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
