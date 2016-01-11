/**/ 'use strict' /**/
var resolver = Symbol(),
    args = Symbol(),
    Resolver;

module.exports = function(){ return new Detacher(); };
Resolver = require('y-resolver');

class Detacher extends Resolver.Yielded{

  constructor(){
    super(resolver);
    this[args] = arguments;
  }

  get active(){
    return !this.done;
  }

  detach(){
    var a;

    if(this.done) return;
    this[resolver].accept();

    a = this[args];
    if(a.length) try{ a[0].apply(a[2] || this,a[1] || []); }
    catch(e){ setTimeout(throwError,0,e); }
  }

}

function throwError(e){
  throw e;
}

module.exports.prototype = Detacher.prototype;
