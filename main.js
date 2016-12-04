/**/ 'use strict' /**/
var resolver = Symbol(),
    args = Symbol(),
    Resolver,define;

module.exports = Detacher;
Resolver = require('y-resolver');
define = require('u-proto/define');

function Detacher(){
  Resolver.Yielded.call(this,resolver);
  this[args] = arguments;
}

Detacher.prototype = Object.create(Resolver.Yielded.prototype);
Detacher.prototype[define]('constructor',Detacher);

Detacher.prototype[define]({

  get active(){
    return !this.done;
  },

  detach: function(){
    var a;

    if(this.done) return;

    a = this[args];
    delete this[args];

    if(a.length) try{ a[0].apply(a[2] || this,a[1] || []); }
    catch(e){ setTimeout(throwError,0,e); }

    this[resolver].accept();
  }

});

// - utils

function throwError(e){
  throw e;
}

module.exports.prototype = Detacher.prototype;
