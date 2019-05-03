# Duration.js
----
Simple to use TypeScript built framework for parsing time durations.

# Example usage
----

Vanilla JS

```JS
const duration = require("../lib/index");

const time = Date.now();

console.log(time + duration.parse("1d 2h 30m"));
// time + 95400000

console.log(time + duration.parse("1d2h30m"));
// time + 95400000

console.log(duration.parse("1yeet"));
// -1

console.log(duration.validate("1d 2h 30m"));
// true

console.log(duration.validate("1d2h30m"));
// true

console.log(duration.validate("1yeet"));
// false
```