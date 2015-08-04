var define = require('u-proto/define'),

    args = Symbol(),
    active = Symbol();

function Detacher(){
  this[active] = true;
  this[args] = arguments;
}

Detacher.prototype[define]({

  get active(){
    return this[active];
  },

  detach: function(){
    var a;

    if(!this[active]) return;

    this[active] = false;
    a = this[args];

    if(a.length) try{ a[0].apply(a[2] || this,a[1] || []); }
    catch(e){ setTimeout(throwError,0,e); }
  }

});

function throwError(e){
  throw e;
}

module.exports = Detacher;
