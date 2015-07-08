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
    
    for(d of this[collection].values()) d.detach();
    this[collection].clear();
  },
  
  add: function(d){
    if(!this[active]) d.detach();
  },
  
  remove: function(d){
    this[collection].delete(d);
  }
  
});

