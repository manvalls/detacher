# Detacher

## Sample usage

```javascript
var Detacher = require('detacher'),
    Collection = require('detacher/collection'),
    
    d1 = new Detacher(),
    d2 = new Detacher(),
    d3 = new Detacher(),
    
    c = new Collection();

console.log(d1.active); // true
d1.detach();
console.log(d1.active); // false

console.log(d2.active); // true
console.log(d3.active); // true

c.add(d2);
c.add(d3);
c.detach();

console.log(d2.active); // false
console.log(d3.active); // false
```
