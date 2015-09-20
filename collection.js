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

    for(d of this[collection]) d.detach();
    this[collection].clear();
  },

  add: function(){
    var i,d;

    for(i = 0;i < arguments.length;i++){
      d = arguments[i];

      if(!this[active]) d.detach();
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

module.exports = Collection;
