/**/ 'use strict' /**/
var Yielded = require('y-resolver').Yielded,
    Detacher = require('./main.js'),
    set = Symbol();

class Collection extends Detacher{

  constructor(){
    var s = new Set();

    super(detachSet,[s]);
    this[set] = s;
  }

  add(){
    var d;

    if(this.done){
      for(d of arguments) detach(d);
      return;
    }

    for(d of arguments){
      this[set].add(d);
      if(Yielded.is(d)) d.listen(this[set].delete,[d],this[set]);
    }
  }

  remove(){
    var d;
    for(d of arguments) this[set].delete(d);
  }

  get size(){
    return this[set].size;
  }

}

function detachSet(set){
  var d;
  for(d of set) detach(d);
  set.clear();
}

function detach(d){
  d = d || {};

  if(d.detach) return d.detach();
  if(d.disconnect) return d.disconnect();
  if(d.close) return d.close();
  if(d.kill) return d.kill();
  if(d.pause) return d.pause();
  if(d.accept) return d.accept();
  if(d.reject) return d.reject();

}

module.exports = Collection;
