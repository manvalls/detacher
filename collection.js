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
    var d,c;

    if(!this[active]) return;
    this[active] = false;

    c = new Set(this[collection]);
    this[collection].clear();

    for(d of c) d.detach();
  },

  add: function(d){
    if(!this[active]) d.detach();
  },

  remove: function(d){
    this[collection].delete(d);
  }

});

module.exports = Collection;
