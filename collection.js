/**/ 'use strict' /**/
var Detacher = require('./main.js'),
    col = Symbol(),
    Yielded;

class Collection extends Detacher{

  constructor(){
    var s = new Set();

    super(detachSet,[s]);
    this[col] = s;
  }

  add(){
    var d;

    if(this.done){
      for(d of arguments) detach(d);
      return;
    }

    for(d of arguments){
      this[col].add(d);
      if(Yielded.is(d)) d.listen(this[col].delete,[d],this[col]);
    }
  }

  remove(){
    var d;
    for(d of arguments) this[col].delete(d);
  }

  get size(){
    return this[col].size;
  }

}

function detachSet(col){
  var d;
  for(d of col) detach(d);
  col.clear();
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

Yielded = require('y-resolver').Yielded;
module.exports = Collection;
