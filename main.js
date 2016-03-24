/**/ 'use strict' /**/
var resolver = Symbol(),
    args = Symbol(),
    col = Symbol(),
    Resolver,Setter,define;

module.exports = Detacher;
Resolver = require('y-resolver');
Setter = require('y-setter');
define = require('u-proto/define');

function Detacher(){
  Resolver.Yielded.call(this,resolver);
  this[args] = arguments;
  this[col] = new Set();
}

Detacher.prototype = Object.create(Resolver.Yielded.prototype);
Detacher.prototype[define]('constructor',Detacher);

Detacher.prototype[define]({

  get active(){
    return !this.done;
  },

  detach: function(){
    var a,d;

    if(this.done) return;

    a = this[args];
    if(a.length) try{ a[0].apply(a[2] || this,a[1] || []); }
    catch(e){ setTimeout(throwError,0,e); }

    for(d of this[col]) detach(d);
    this[col].clear();
    this[resolver].accept();
  },

  add: function(){
    var d;

    if(this.done){
      for(d of arguments) detach(d);
      return;
    }

    for(d of arguments){
      this[col].add(d);
      if(Resolver.Yielded.is(d)) d.listen(this[col].delete,[d],this[col]);
      else if(Resolver.is(d)) d.yielded.listen(this[col].delete,[d],this[col]);
      else if(Setter.Getter.is(d)) d.frozen().listen(this[col].delete,[d],this[col]);
      else if(Setter.is(d)) d.getter.frozen().listen(this[col].delete,[d],this[col]);
    }

  },

  remove: function(){
    var d;
    for(d of arguments) this[col].delete(d);
  }

});

// - utils

function throwError(e){
  throw e;
}

function detach(d){
  d = d || {};

  if(d.detach) return d.detach();
  if(d.disconnect) return d.disconnect();
  if(d.close) return d.close();
  if(d.kill) return d.kill();
  if(d.pause) return d.pause();
  if(d.freeze) return d.freeze();
  if(d.accept) return d.accept();
  if(d.reject) return d.reject();

}

module.exports.prototype = Detacher.prototype;
