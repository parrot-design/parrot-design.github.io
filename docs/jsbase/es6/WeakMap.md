# WeakMap

WeakMap和Map大致相同，主要有下面这几点区别：
- WeakMap只接受对象作为键名（null除外）。
- WeakMap的键名所指向的对象，不计入垃圾回收机制。