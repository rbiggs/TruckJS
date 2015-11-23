// Truck Engine - Promises Module:
(function() {
  "use strict";
  //==================================
  // Define polyfill for ES6 Promises:
  //==================================
  /*jshint validthis:true */
  var extend;
  var cycle;
  var queue;
  extend = function(obj, name, val, config) {
    return Object.defineProperty(obj, name, {
      value: val,
      writable: true,
      configurable: config !== false
    });
  };
  queue = (function() {
    var first, last, item;
    function Item(func, self) {
      this.func = func;
      this.self = self;
      this.next = undefined;
    }
    return {
      add: function(func, self) {
        item = new Item(func, self);
        if (last) {
          last.next = item;
        } else {
          first = item;
        }
        last = item;
        item = undefined;
      },
      unshift: function() {
        var f = first;
        first = last = cycle = undefined;
        while (f) {
          f.func.call(f.self);
          f = f.next;
        }
      }
    };
  })();
  function schedule(func, self) {
    queue.add(func, self);
    if (!cycle) {
      cycle = setTimeout(queue.unshift);
    }
  }
  // Check that Promise is thenable:
  function isThenable(obj) {
    var _then, obj_type = typeof obj;
    if (obj !== null &&
      (obj_type === "object" || obj_type === "function")) {
      _then = obj.then;
    }
    return typeof _then === "function" ? _then : false;
  }
  function notify() {
    for (var i = 0; i < this.chain.length; i++) {
      notifyIsolated(this, (this.state === 1) ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
    }
    this.chain.length = 0;
  }
  function notifyIsolated(self, callback, chain) {
    var ret, _then;
    try {
      if (callback === false) {
        chain.reject(self.msg);
      } else {
        if (callback === true) {
          ret = self.msg;
        } else {
          ret = callback.call(undefined, self.msg);
        }
        if (ret === chain.promise) {
          chain.reject(new TypeError("Promise-chain cycle"));
        } else if (_then = isThenable(ret)) {
          _then.call(ret, chain.resolve, chain.reject);
        } else {
          chain.resolve(ret);
        }
      }
    } catch (err) {
      chain.reject(err);
    }
  }
  function resolve(msg) {
    var _then, deferred, self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    try {
      if (_then = isThenable(msg)) {  // jshint ignore:line
        schedule(function() {
          var deferred_wrapper = new MakeDeferred(self);
          try {
            _then.call(msg, function() { resolve.apply(deferred_wrapper, arguments); }, function() { reject.apply(deferred_wrapper, arguments); });
          } catch (err) {
            reject.call(deferred_wrapper, err);
          }
        });
      } else {
        self.msg = msg;
        self.state = 1;
        if (self.chain.length > 0) {
          schedule(notify, self);
        }
      }
    } catch (err) {
      reject.call(new MakeDeferred(self), err);
    }
  }
  function reject(msg) {
    var self = this;
    if (self.triggered) {
      return;
    }
    self.triggered = true;
    if (self.deferred) {
      self = self.deferred;
    }
    self.msg = msg;
    self.state = 2;
    if (self.chain.length > 0) {
      schedule(notify, self);
    }
  }
  function iteratePromises(Constructor, arr, resolver, rejecter) {
    for (var idx = 0; idx < arr.length; idx++) {
      (function IIFE(idx) {
        Constructor.resolve(arr[idx])
          .then(function(msg) {
          resolver(idx, msg);
        }, rejecter);
      })(idx);
    }
  }
  function MakeDeferred(self) {
    this.deferred = self;
    this.triggered = false;
  }
  function Deferred(self) {
    this.promise = self;
    this.state = 0;
    this.triggered = false;
    this.chain = [];
    this.msg = undefined;
  }
  function Promise(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("Not a function");
    }
    if (this.isValidPromise !== 0) {
      throw new TypeError("Not a promise");
    }
    // Indicate the Promise is initialized:
    this.isValidPromise = 1;
    var deferred = new Deferred(this);
    this.then = function(success, failure) {
      var obj = {
        success: typeof success === "function" ? success : true,
        failure: typeof failure === "function" ? failure : false
      };
      // `.then()` can be used against a different promise
      // constructor for making a chained promise.
      obj.promise = new this.constructor(function extractChain(resolve, reject) {
        if (typeof resolve !== "function" || typeof reject !== "function") {
          throw new TypeError("Not a function");
        }
        obj.resolve = resolve;
        obj.reject = reject;
      });
      deferred.chain.push(obj);
      if (deferred.state !== 0) {
        schedule(notify, deferred);
      }
      return obj.promise;
    };
    this.catch = function(failure) {
      return this.then(undefined, failure);
    };
    try {
      executor.call(undefined, function(msg) {
        resolve.call(deferred, msg);
      }, function(msg) {
        reject.call(deferred, msg);
      });
    } catch (err) {
      reject.call(deferred, err);
    }
  }
  var PromisePrototype = extend({}, "constructor", Promise, false);
  extend(Promise, "prototype", PromisePrototype, false);

  // Check if Promise is initialized:
  extend(PromisePrototype, "isValidPromise", 0, false);
  extend(Promise, "resolve", function(msg) {
    var Constructor = this;

    // Make sure it is a valide Promise:
    if (msg && typeof msg === "object" && msg.isValidPromise === 1) {
      return msg;
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      resolve(msg);
    });
  });
  extend(Promise, "reject", function(msg) {
    return new this(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      reject(msg);
    });
  });
  extend(Promise, "all", function(arr) {
    var Constructor = this;

    // Make sure argument is an array:
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    if (arr.length === 0) {
      return Constructor.resolve([]);
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      var len = arr.length;
      var msgs = new Array(len);
      var count = 0;
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        msgs[idx] = msg;
        if (++count === len) {
          resolve(msgs);
        }
      }, reject);
    });
  });
  extend(Promise, "race", function(arr) {
    var Constructor = this;

    // Make sure argument is an array:
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      return Constructor.reject(new TypeError("Not an array"));
    }
    return new Constructor(function executor(resolve, reject) {
      if (typeof resolve !== "function" || typeof reject !== "function") {
        throw new TypeError("Not a function");
      }
      iteratePromises(Constructor, arr, function resolver(idx, msg) {
        resolve(msg);
      }, reject);
    });
  });

  // If native Promise exists in window, do not use this.
  if ("Promise" in window && "resolve" in window.Promise && "reject" in window.Promise && "all" in window.Promise && "race" in window.Promise) {
    return;
  } else {

    // Otherwise do use this:
    return window.Promise = Promise;
  }
})();