var Detacher = require('../main.js'),
    t = require('u-test'),
    assert = require('assert'),
    Resolver = require('y-resolver'),
    wait = require('y-timers/wait');

t('Detacher',function*(){
  var d,test,e,ev;

  d = new Detacher();
  assert(d.active);
  d.detach();
  d.detach();
  assert(!d.active);
  yield d;

  d = new Detacher(function(){
    test = true;
  });

  assert(!test);
  d.detach();
  assert(test);

  d = new Detacher(function(){
    e = new Error();
    throw e;
  });

  process.once('uncaughtException',function(e){
    ev = e;
  });

  d.detach();
  yield wait(10);
  assert.strictEqual(ev,e);
});

t('Detacher as collection',function*(){
  var n = 0,
      col,d,res;

  col = new Detacher();
  col.add({ pause: () => n++ });
  col.add({ detach: () => n++ });
  col.add({ disconnect: () => n++ });
  col.add({ close: () => n++ });
  col.add({ kill: () => n++ });
  col.add({ accept: () => n++ });
  col.add(d = { reject: () => n++ });
  col.remove(d);
  col.add(d);
  col.add(null);
  assert.strictEqual(n,0);
  col.detach();
  assert.strictEqual(n,7);

  col = new Detacher();
  res = new Resolver();
  col.add(res.yielded);
  res.accept();
  col.add(res.yielded);

  col.detach();
  col.add({ pause: () => n++ });
  assert.strictEqual(n,8);
  col.add({ detach: () => n++ });
  assert.strictEqual(n,9);
  col.add({ disconnect: () => n++ });
  assert.strictEqual(n,10);
  col.add({ close: () => n++ });
  assert.strictEqual(n,11);
  col.add({ kill: () => n++ });
  assert.strictEqual(n,12);
  col.add({ accept: () => n++ });
  assert.strictEqual(n,13);
  col.add({ reject: () => n++ });
  assert.strictEqual(n,14);

});
