var define = require('u-proto/define'),
    
    active = Symbol();

function Detacher(){
  this[active] = true;
}

Detacher.prototype[define]({
  
  get active(){
    return this[active];
  },
  
  detach: function(){
    this[active] = false;
  }
  
});

module.exports = Detacher;
