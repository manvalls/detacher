var Detacher = require('../main.js'),
    Collection = require('../collection.js'),
    t = require('u-test'),
    assert = require('assert'),
    Resolver = require('y-resolver');

t('Detacher',function*(){
  var d,test;

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
});

t('Collection',function*(){
  var n = 0,
      col,d,res;

  col = new Collection();
  assert.strictEqual(col.size,0);
  col.add({ pause: () => n++ });
  assert.strictEqual(col.size,1);
  col.add({ detach: () => n++ });
  assert.strictEqual(col.size,2);
  col.add({ disconnect: () => n++ });
  assert.strictEqual(col.size,3);
  col.add({ close: () => n++ });
  assert.strictEqual(col.size,4);
  col.add({ kill: () => n++ });
  assert.strictEqual(col.size,5);
  col.add({ accept: () => n++ });
  assert.strictEqual(col.size,6);
  col.add(d = { reject: () => n++ });
  assert.strictEqual(col.size,7);
  col.remove(d);
  assert.strictEqual(col.size,6);
  col.add(d);
  col.add(null);
  assert.strictEqual(n,0);
  col.detach();
  assert.strictEqual(n,7);

  col = new Collection();
  res = new Resolver();
  col.add(res.yielded);
  assert.strictEqual(col.size,1);
  res.accept();
  assert.strictEqual(col.size,0);
  col.add(res.yielded);
  assert.strictEqual(col.size,0);

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
