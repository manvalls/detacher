var define = require('u-proto/define'),

    active = Symbol(),
    collection = Symbol();

function Collection(){
  this[active] = true;
  this[collection] = new Set();
}

Collection.prototype[define]({

  get active(){
    return this[active];
  },

  detach: function(){
    var d;

    if(!this[active]) return;
    this[active] = false;

    for(d of this[collection]) detach(d);
    this[collection].clear();
  },

  add: function(){
    var i,d;

    for(i = 0;i < arguments.length;i++){
      d = arguments[i];

      if(!this[active]) detach(d);
      else this[collection].add(d);
    }

  },

  remove: function(){
    var i,d;

    for(i = 0;i < arguments.length;i++){
      d = arguments[i];
      this[collection].delete(d);
    }

  },

  get size(){
    return this[collection].size;
  }

});

// utils

function detach(d){

  if(d.detach) return d.detach();
  if(d.disconnect) return d.disconnect();
  if(d.close) return d.close();
  if(d.kill()) return d.kill();

}

/*/ exports /*/

module.exports = Collection;
