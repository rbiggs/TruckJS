// Truck Engine - Box, Data Persistence Module:
(function() {
  "use strict";
  $.extend({
    Box: (function() {
      //==================
      // IndexedDB Driver:
      //==================
      (function() {
        var globalObject = this;
        var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB || this.OIndexedDB || this.msIndexedDB;
        if (!indexedDB) {
          return;
        }

        var DETECT_BLOB__support_STORE = 'truck-box-detect-blob-support';
        var supportsBlobs;
        var dbContexts;

        function __createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};
          try {
            return new Blob(parts, properties);
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }
            var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;
            var builder = new BlobBuilder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }
            return builder.getBlob(properties.type);
          }
        }

        function __binStringToArrayBuffer(bin) {
          var length = bin.length;
          var buf = new ArrayBuffer(length);
          var arr = new Uint8Array(buf);
          for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
          }
          return buf;
        }

        function __blobAjax(url) {
          return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.withCredentials = true;
            xhr.responseType = 'arraybuffer';

            xhr.onreadystatechange = function() {
              if (xhr.readyState !== 4) {
                return;
              }
              if (xhr.status === 200) {
                return resolve({
                  response: xhr.response,
                  type: xhr.getResponseHeader('Content-Type')
                });
              }
              reject({
                status: xhr.status,
                response: xhr.response
              });
            };
            xhr.send();
          });
        }

        function __checkBlobSupportWithoutCaching(idb) {
          return new Promise(function(resolve, reject) {
            var blob = __createBlob([''], {
              type: 'image/png'
            });
            var txn = idb.transaction([DETECT_BLOB__support_STORE], 'readwrite');
            txn.objectStore(DETECT_BLOB__support_STORE).put(blob, 'key');
            txn.oncomplete = function() {
              var blobTxn = idb.transaction([DETECT_BLOB__support_STORE], 'readwrite');
              var getBlobReq = blobTxn.objectStore(DETECT_BLOB__support_STORE).get('key');
              getBlobReq.onerror = reject;
              getBlobReq.onsuccess = function(e) {

                var storedBlob = e.target.result;
                var url = URL.createObjectURL(storedBlob);

                __blobAjax(url).then(function(res) {
                  resolve(!!(res && res.type === 'image/png'));
                }, function() {
                  resolve(false);
                }).then(function() {
                  URL.revokeObjectURL(url);
                });
              };
            };
          })['catch'](function() {
            return false; // error, so assume unsupported
          });
        }

        function __checkBlobSupport(idb) {
          if (typeof supportsBlobs === 'boolean') {
            return Promise.resolve(supportsBlobs);
          }
          return __checkBlobSupportWithoutCaching(idb).then(function(value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }

        function __encodeBlob(blob) {
          return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function(e) {
              var base64 = btoa(e.target.result || '');
              resolve({
                __truck_box_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };
            reader.readAsBinaryString(blob);
          });
        }

        function __decodeBlob(encodedBlob) {
          var arrayBuff = __binStringToArrayBuffer(atob(encodedBlob.data));
          return __createBlob([arrayBuff], {
            type: encodedBlob.type
          });
        }

        function __isEncodedBlob(value) {
          return value && value.__truck_box_encoded_blob;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          if (!dbContexts) {
            dbContexts = {};
          }

          var dbContext = dbContexts[dbInfo.name];

          if (!dbContext) {
            dbContext = {
              box: [],
              db: null
            };
            dbContexts[dbInfo.name] = dbContext;
          }

          dbContext.box.push(this);

          var readyPromises = [];

          function ignoreErrors() {
            return Promise.resolve();
          }

          for (var j = 0; j < dbContext.box.length; j++) {
            var truckbox = dbContext.box[j];
            if (truckbox !== this) {
              readyPromises.push(truckbox.ready()['catch'](ignoreErrors));
            }
          }

          var box = dbContext.box.slice(0);
          return Promise.all(readyPromises).then(function() {
            dbInfo.db = dbContext.db;
            return __getOriginalConnection(dbInfo);
          }).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self.__defaultConfig.version)) {
              return __getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            self.__dbInfo = dbInfo;
            for (var k in box) {
              var truckbox = box[k];
              if (truckbox !== self) {
                truckbox.__dbInfo.db = dbInfo.db;
                truckbox.__dbInfo.version = dbInfo.version;
              }
            }
          });
        }

        function __getOriginalConnection(dbInfo) {
          return __getConnection(dbInfo, false);
        }

        function __getUpgradedConnection(dbInfo) {
          return __getConnection(dbInfo, true);
        }

        function __getConnection(dbInfo, upgradeNeeded) {
          return new Promise(function(resolve, reject) {
            if (dbInfo.db) {
              if (upgradeNeeded) {
                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }

            var dbArgs = [dbInfo.name];

            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }

            var openreq = indexedDB.open.apply(indexedDB, dbArgs);

            if (upgradeNeeded) {
              openreq.onupgradeneeded = function(e) {
                var db = openreq.result;
                try {
                  db.createObjectStore(dbInfo.boxName);
                  if (e.oldVersion <= 1) {
                    db.createObjectStore(DETECT_BLOB__support_STORE);
                  }
                } catch (ex) {
                  if (ex.name === 'ConstraintError') {
                    globalObject.console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.boxName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }

            openreq.onerror = function() {
              reject(openreq.error);
            };

            openreq.onsuccess = function() {
              resolve(openreq.result);
            };
          });
        }

        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }

          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.boxName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;

          if (isDowngrade) {
            if (dbInfo.version !== defaultVersion) {
              globalObject.console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
            }
            dbInfo.version = dbInfo.db.version;
          }

          if (isUpgrade || isNewStore) {
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;
              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }

            return true;
          }

          return false;
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);
              var req = store.get(key);

              req.onsuccess = function() {
                var value = req.result;
                if (value === undefined) {
                  value = null;
                }
                if (__isEncodedBlob(value)) {
                  value = __decodeBlob(value);
                }
                resolve(value);
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var req = store.openCursor();
              var iterationNumber = 1;

              req.onsuccess = function() {
                var cursor = req.result;

                if (cursor) {
                  var value = cursor.value;
                  if (__isEncodedBlob(value)) {
                    value = __decodeBlob(value);
                  }
                  var result = iterator(value, cursor.key, iterationNumber++);

                  if (result !== void 0) {
                    resolve(result);
                  } else {
                    cursor['continue']();
                  }
                } else {
                  resolve();
                }
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            var dbInfo;
            self.ready().then(function() {
              dbInfo = self.__dbInfo;
              return __checkBlobSupport(dbInfo.db);
            }).then(function(blobSupport) {
              if (!blobSupport && value instanceof Blob) {
                return __encodeBlob(value);
              }
              return value;
            }).then(function(value) {
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              if (value === null) {
                value = undefined;
              }

              var req = store.put(value, key);
              transaction.oncomplete = function() {
                if (value === undefined) {
                  value = null;
                }

                resolve(value);
              };
              transaction.onabort = transaction.onerror = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              var req = store['delete'](key);
              transaction.oncomplete = function() {
                resolve();
              };

              transaction.onerror = function() {
                reject(req.error);
              };

              transaction.onabort = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var transaction = dbInfo.db.transaction(dbInfo.boxName, 'readwrite');
              var store = transaction.objectStore(dbInfo.boxName);
              var req = store.clear();

              transaction.oncomplete = function() {
                resolve();
              };

              transaction.onabort = transaction.onerror = function() {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);
              var req = store.count();

              req.onsuccess = function() {
                resolve(req.result);
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            if (n < 0) {
              resolve(null);

              return;
            }

            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var advanced = false;
              var req = store.openCursor();
              req.onsuccess = function() {
                var cursor = req.result;
                if (!cursor) {
                  resolve(null);

                  return;
                }

                if (n === 0) {
                  resolve(cursor.key);
                } else {
                  if (!advanced) {
                    advanced = true;
                    cursor.advance(n);
                  } else {
                    resolve(cursor.key);
                  }
                }
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              var store = dbInfo.db.transaction(dbInfo.boxName, 'readonly').objectStore(dbInfo.boxName);

              var req = store.openCursor();
              var keys = [];

              req.onsuccess = function() {
                var cursor = req.result;

                if (!cursor) {
                  resolve(keys);
                  return;
                }

                keys.push(cursor.key);
                cursor['continue']();
              };

              req.onerror = function() {
                reject(req.error);
              };
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var asyncStorage = {
          __driver: 'asyncStorage',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.asyncStorage = asyncStorage;
        window.asyncStorage = asyncStorage;
      }).call(window);

      //===============
      // WebSQL Driver:
      //===============
      (function() {
        var globalObject = this;
        var openDatabase = this.openDatabase;
        if (!openDatabase) {
          return;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
          }

          var dbInfoPromise = new Promise(function(resolve, reject) {
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
              return self.setDriver(self.LOCALSTORAGE).then(function() {
                return self.__initStorage(options);
              }).then(resolve)['catch'](reject);
            }

            dbInfo.db.transaction(function(t) {
              t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.boxName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function() {
                self.__dbInfo = dbInfo;
                resolve();
              }, function(t, error) {
                reject(error);
              });
            });
          });

          return new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer);
          }).then(function(lib) {
            dbInfo.serializer = lib;
            return dbInfoPromise;
          });
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT * FROM ' + dbInfo.boxName + ' WHERE key = ? LIMIT 1', [key], function(t, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }

                  resolve(result);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;

              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT * FROM ' + dbInfo.boxName, [], function(t, results) {
                  var rows = results.rows;
                  var length = rows.length;

                  for (var i = 0; i < length; i++) {
                    var item = rows.item(i);
                    var result = item.value;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    result = iterator(result, item.key, i + 1);
                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }

                  resolve();
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              if (value === undefined) {
                value = null;
              }

              var originalValue = value;

              var dbInfo = self.__dbInfo;
              dbInfo.serializer.serialize(value, function(value, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function(t) {
                    t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.boxName + ' (key, value) VALUES (?, ?)', [key, value], function() {
                      resolve(originalValue);
                    }, function(t, error) {
                      reject(error);
                    });
                  }, function(sqlError) {
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      reject(sqlError);
                    }
                  });
                }
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('DELETE FROM ' + dbInfo.boxName + ' WHERE key = ?', [key], function() {
                  resolve();
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('DELETE FROM ' + dbInfo.boxName, [], function() {
                  resolve();
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.boxName, [], function(t, results) {
                  var result = results.rows.item(0).c;

                  resolve(result);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;

          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT key FROM ' + dbInfo.boxName + ' WHERE id = ? LIMIT 1', [n + 1], function(t, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function(t, error) {
                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise(function(resolve, reject) {
            self.ready().then(function() {
              var dbInfo = self.__dbInfo;
              dbInfo.db.transaction(function(t) {
                t.executeSql('SELECT key FROM ' + dbInfo.boxName, [], function(t, results) {
                  var keys = [];

                  for (var i = 0; i < results.rows.length; i++) {
                    keys.push(results.rows.item(i).key);
                  }

                  resolve(keys);
                }, function(t, error) {

                  reject(error);
                });
              });
            })['catch'](reject);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var webSQLStorage = {
          __driver: 'webSQLStorage',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.webSQLStorage = webSQLStorage;
        window.webSQLStorage = webSQLStorage;
      }).call(window);

      //=====================
      // localStorage Driver:
      //=====================
      (function() {
        var globalObject = this;
        var localStorage = null;
        try {
          if (!this.localStorage || !('setItem' in this.localStorage)) {
            return;
          }
          localStorage = this.localStorage;
        } catch (e) {
          return;
        }

        function __initStorage(options) {
          var self = this;
          var dbInfo = {};
          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          dbInfo.keyPrefix = dbInfo.name + '/';

          if (dbInfo.boxName !== self.__defaultConfig.boxName) {
            dbInfo.keyPrefix += dbInfo.boxName + '/';
          }

          self.__dbInfo = dbInfo;

          return new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer);
          }).then(function(lib) {
            dbInfo.serializer = lib;
            return Promise.resolve();
          });
        }

        function clear(callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var keyPrefix = self.__dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });

          executeCallback(promise, callback);
          return promise;
        }

        function get(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key);
            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }

            return result;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function each(iterator, callback) {
          var self = this;

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length;
            var iterationNumber = 1;

            for (var i = 0; i < length; i++) {
              var key = localStorage.key(i);
              if (key.indexOf(keyPrefix) !== 0) {
                continue;
              }
              var value = localStorage.getItem(key);
              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }

              value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
              if (value !== void 0) {
                return value;
              }
            }
          });

          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var result;
            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            }

            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
              if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
              }
            }
            return keys;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function size(callback) {
          var self = this;
          var promise = self.keys().then(function(keys) {
            return keys.length;
          });

          executeCallback(promise, callback);
          return promise;
        }

        function remove(key, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            var dbInfo = self.__dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
          });

          executeCallback(promise, callback);
          return promise;
        }

        function set(key, value, callback) {
          var self = this;
          if (typeof key !== 'string') {
            globalObject.console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          var promise = self.ready().then(function() {
            if (value === undefined) {
              value = null;
            }
            var originalValue = value;

            return new Promise(function(resolve, reject) {
              var dbInfo = self.__dbInfo;
              dbInfo.serializer.serialize(value, function(value, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                    resolve(originalValue);
                  } catch (e) {
                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                      reject(e);
                    }
                    reject(e);
                  }
                }
              });
            });
          });

          executeCallback(promise, callback);
          return promise;
        }

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }

        var localStorageWrapper = {
          __driver: 'localStorageWrapper',
          __initStorage: __initStorage,
          each: each,
          get: get,
          set: set,
          remove: remove,
          clear: clear,
          size: size,
          key: key,
          keys: keys
        };

        // Export driver:
        this.localStorageWrapper = localStorageWrapper;
        window.localStorageWrapper = localStorageWrapper;
      }).call(window);

      //=================
      // Blob Serializer:
      //=================
      (function() {
        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        var BLOB_TYPE_PREFIX = '~~truck_box_type~';
        var BLOB_TYPE_PREFIX_REGEX = /^~~truck_box_type~([^~]+)~/;
        var SERIALIZED_MARKER = '__lfsc__:';
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
        var TYPE_ARRAYBUFFER = 'arbf';
        var TYPE_BLOB = 'blob';
        var TYPE_INT8ARRAY = 'si08';
        var TYPE_UINT8ARRAY = 'ui08';
        var TYPE_UINT8CLAMPEDARRAY = 'uic8';
        var TYPE_INT16ARRAY = 'si16';
        var TYPE_INT32ARRAY = 'si32';
        var TYPE_UINT16ARRAY = 'ur16';
        var TYPE_UINT32ARRAY = 'ui32';
        var TYPE_FLOAT32ARRAY = 'fl32';
        var TYPE_FLOAT64ARRAY = 'fl64';
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var globalObject = this;

        function __createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};

          try {
            return new Blob(parts, properties);
          } catch (err) {
            if (err.name !== 'TypeError') {
              throw err;
            }

            var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;

            var builder = new BlobBuilder();
            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }

            return builder.getBlob(properties.type);
          }
        }

        function serialize(value, callback) {
          var valueString = '';
          if (value) {
            valueString = value.toString();
          }

          if (value && (value.toString() === '[object ArrayBuffer]' || value.buffer && value.buffer.toString() === '[object ArrayBuffer]')) {
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;

              if (valueString === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
              } else if (valueString === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
              } else if (valueString === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueString === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
              } else if (valueString === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
              } else if (valueString === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
              } else if (valueString === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
              } else if (valueString === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueString === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error('Failed to get type for BinaryArray'));
              }
            }

            callback(marker + bufferToString(buffer));
          } else if (valueString === '[object Blob]') {
            var fileReader = new FileReader();

            fileReader.onload = function() {
              var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e) {
              console.error("Couldn't convert value into a JSON string: ", value);

              callback(null, e);
            }
          }
        }

        function deserialize(value) {
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          }
          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType;
          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }
          var buffer = stringToBuffer(serializedString);

          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;
            case TYPE_BLOB:
              return __createBlob([buffer], {
                type: blobType
              });
            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);
            default:
              throw new Error('Unkown type: ' + type);
          }
        }

        function stringToBuffer(serializedString) {
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p = 0;
          var encoded1, encoded2, encoded3, encoded4;
          if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === '=') {
              bufferLength--;
            }
          }
          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);

          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

            /*jslint bitwise: true */
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        }

        function bufferToString(buffer) {
          var bytes = new Uint8Array(buffer);
          var base64String = '';
          var i;

          for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }
          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
          }
          return base64String;
        }

        var truckBoxSerializer = {
          serialize: serialize,
          deserialize: deserialize,
          stringToBuffer: stringToBuffer,
          bufferToString: bufferToString
        };

        // Export driver:
        this.truckBoxSerializer = truckBoxSerializer;
        window.truckBoxSerializer = truckBoxSerializer;
      }).call(window);

      //==========================
      // Truck Box Implementation:
      //==========================
      var CustomDrivers = {};
      var DriverType = {
        INDEXEDDB: 'asyncStorage',
        LOCALSTORAGE: 'localStorageWrapper',
        WEBSQL: 'webSQLStorage'
      };
      var DefaultDriverOrder = [DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE];
      var LibraryMethods = ['clear', 'get', 'each', 'key', 'keys', 'size', 'remove', 'set'];

      var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'truckbox',
        size: 4980736,
        boxName: 'keyvaluepairs',
        version: 1.0
      };

      var driverSupport = (function(self) {
        var indexedDB = indexedDB || self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB;
        var result = {};
        result[DriverType.WEBSQL] = !!self.openDatabase;
        result[DriverType.INDEXEDDB] = !!(function() {
          if (typeof self.openDatabase !== 'undefined' && self.navigator && self.navigator.userAgent && /Safari/.test(self.navigator.userAgent) && !/Chrome/.test(self.navigator.userAgent)) {
            return false;
          }
          try {
            return indexedDB && typeof indexedDB.open === 'function' &&
              typeof self.IDBKeyRange !== 'undefined';
          } catch (e) {
            return false;
          }
        })();

        result[DriverType.LOCALSTORAGE] = !!(function() {
          try {
            return self.localStorage && 'setItem' in self.localStorage && self.localStorage.setItem;
          } catch (e) {
            return false;
          }
        })();

        return result;
      })(window);

      var isArray = Array.isArray || function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };

      function callWhenReady(truckBoxInstance, libraryMethod) {
        truckBoxInstance[libraryMethod] = function() {
          var __args = arguments;
          return truckBoxInstance.ready().then(function() {
            return truckBoxInstance[libraryMethod].apply(truckBoxInstance, __args);
          });
        };
      }

      function extend() {
        for (var i = 1; i < arguments.length; i++) {
          var arg = arguments[i];

          if (arg) {
            for (var key in arg) {
              if (arg.hasOwnProperty(key)) {
                if (isArray(arg[key])) {
                  arguments[0][key] = arg[key].slice();
                } else {
                  arguments[0][key] = arg[key];
                }
              }
            }
          }
        }

        return arguments[0];
      }

      function isLibraryDriver(driverName) {
        for (var driver in DriverType) {
          if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {
            return true;
          }
        }

        return false;
      }

      var TruckBox = (function() {
        function TruckBox(options) {

          this.INDEXEDDB = DriverType.INDEXEDDB;
          this.LOCALSTORAGE = DriverType.LOCALSTORAGE;
          this.WEBSQL = DriverType.WEBSQL;

          this.__defaultConfig = extend({}, DefaultConfig);
          this.__config = extend({}, this.__defaultConfig, options);
          this.__driverSet = null;
          this.__initDriver = null;
          this.__ready = false;
          this.__dbInfo = null;

          this.__wrapLibraryMethodsWithReady();
          this.setDriver(this.__config.driver);
        }

        TruckBox.prototype.config = function(options) {
          if (typeof options === 'object') {
            if (this.__ready) {
              return new Error("Can't call config() after truckbox " + 'has been used.');
            }
            for (var i in options) {
              if (i === 'boxName') {
                options[i] = options[i].replace(/\W/g, '_');
              }

              this.__config[i] = options[i];
            }
            if ('driver' in options && options.driver) {
              this.setDriver(this.__config.driver);
            }

            return true;
          } else if (typeof options === 'string') {
            return this.__config[options];
          } else {
            return this.__config;
          }
        };

        TruckBox.prototype.defineDriver = function(driverObject, callback, errorCallback) {
          var promise = new Promise(function(resolve, reject) {
            try {
              var driverName = driverObject.__driver;
              var complianceError = new Error('Custom driver not compliant; see Truck Box documentation');
              var namingError = new Error('Custom driver name already in use: ' + driverObject.__driver);
              if (!driverObject.__driver) {
                reject(complianceError);
                return;
              }
              if (isLibraryDriver(driverObject.__driver)) {
                reject(namingError);
                return;
              }

              var customDriverMethods = LibraryMethods.concat('__initStorage');
              for (var i = 0; i < customDriverMethods.length; i++) {
                var customDriverMethod = customDriverMethods[i];
                if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                  reject(complianceError);
                  return;
                }
              }

              var supportPromise = Promise.resolve(true);
              if ('__support' in driverObject) {
                if (driverObject.__support && typeof driverObject.__support === 'function') {
                  supportPromise = driverObject.__support();
                } else {
                  supportPromise = Promise.resolve(!!driverObject.__support);
                }
              }

              supportPromise.then(function(supportResult) {
                driverSupport[driverName] = supportResult;
                CustomDrivers[driverName] = driverObject;
                resolve();
              }, reject);
            } catch (e) {
              reject(e);
            }
          });

          promise.then(callback, errorCallback);
          return promise;
        };

        TruckBox.prototype.driver = function() {
          return this.__driver || null;
        };

        TruckBox.prototype.getDriver = function(driverName, callback, errorCallback) {
          var self = this;
          var getDriverPromise = (function() {
            if (isLibraryDriver(driverName)) {
              switch (driverName) {
                case self.INDEXEDDB:
                  return new Promise(function(resolve, reject) {
                    resolve(asyncStorage);
                  });
                case self.LOCALSTORAGE:
                  return new Promise(function(resolve, reject) {
                    resolve(localStorageWrapper);
                  });
                case self.WEBSQL:
                  return new Promise(function(resolve, reject) {
                    resolve(webSQLStorage);
                  });
              }
            } else if (CustomDrivers[driverName]) {
              console.log('Using: ' + driverName)
              return Promise.resolve(CustomDrivers[driverName]);
            }

            return Promise.reject(new Error('Driver not found.'));
          })();

          getDriverPromise.then(callback, errorCallback);
          return getDriverPromise;
        };

        TruckBox.prototype.getSerializer = function(callback) {
          var serializerPromise = new Promise(function(resolve, reject) {
            resolve(truckBoxSerializer)
          });
          if (callback && typeof callback === 'function') {
            serializerPromise.then(function(result) {
              callback(result);
            });
          }
          return serializerPromise;
        };

        TruckBox.prototype.ready = function(callback) {
          var self = this;

          var promise = self.__driverSet.then(function() {
            if (self.__ready === null) {
              self.__ready = self.__initDriver();
            }

            return self.__ready;
          });

          promise.then(callback, callback);
          return promise;
        };

        TruckBox.prototype.setDriver = function(drivers, callback, errorCallback) {
          var self = this;

          if (!isArray(drivers)) {
            drivers = [drivers];
          }

          var supportedDrivers = this.__getSupportedDrivers(drivers);

          function setDriverToConfig() {
            self.__config.driver = self.driver();
          }

          function initDriver(supportedDrivers) {
            return function() {
              var currentDriverIndex = 0;

              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers.length) {
                  var driverName = supportedDrivers[currentDriverIndex];
                  currentDriverIndex++;

                  self.__dbInfo = null;
                  self.__ready = null;

                  return self.getDriver(driverName).then(function(driver) {
                    self.__extend(driver);
                    setDriverToConfig();

                    self.__ready = self.__initStorage(self.__config);
                    return self.__ready;
                  })['catch'](driverPromiseLoop);
                }

                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self.__driverSet = Promise.reject(error);
                return self.__driverSet;
              }

              return driverPromiseLoop();
            };
          }

          var oldDriverSetDone = this.__driverSet !== null ? this.__driverSet['catch'](function() {
            return Promise.resolve();
          }) : Promise.resolve();

          this.__driverSet = oldDriverSetDone.then(function() {
            var driverName = supportedDrivers[0];
            self.__dbInfo = null;
            self.__ready = null;

            return self.getDriver(driverName).then(function(driver) {
              self.__driver = driver.__driver;
              setDriverToConfig();
              self.__wrapLibraryMethodsWithReady();
              self.__initDriver = initDriver(supportedDrivers);
            });
          })['catch'](function() {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self.__driverSet = Promise.reject(error);
            return self.__driverSet;
          });

          this.__driverSet.then(callback, errorCallback);
          return this.__driverSet;
        };

        TruckBox.prototype.supports = function(driverName) {
          return !!driverSupport[driverName];
        };

        TruckBox.prototype.__extend = function(libraryMethodsAndProperties) {
          extend(this, libraryMethodsAndProperties);
        };

        TruckBox.prototype.__getSupportedDrivers = function(drivers) {
          var supportedDrivers = [];
          for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }
          return supportedDrivers;
        };

        TruckBox.prototype.__wrapLibraryMethodsWithReady = function() {
          for (var i = 0; i < LibraryMethods.length; i++) {
            callWhenReady(this, LibraryMethods[i]);
          }
        };

        TruckBox.prototype.createInstance = function(options) {
          return new TruckBox(options);
        };

        return TruckBox;
      })();

      var truckBox = new TruckBox();
      return truckBox;
    })()
  });
})();

// Truck Engine - Driver for sessionStorage:
(function() {
  'use strict';
  var globalObject = this;
  var serializer = null;
  var sessionStorage = null;

  function getSupport() {
    try {
      if (globalObject.sessionStorage && ('setItem' in globalObject.sessionStorage)) {
        return true;
      }
    } catch (e) {}
    return false;
  }
  if (getSupport()) {
    sessionStorage = this.sessionStorage;
  } else {
    return;
  }

  function __initStorage(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
      for (var i in options) {
        dbInfo[i] = options[i];
      }
    }

    dbInfo.keyPrefix = dbInfo.name + '/';
    self.__dbInfo = dbInfo;

    var serializerPromise = new Promise(function(resolve, reject) {
      if (typeof self.getSerializer === 'function') {
        self.getSerializer().then(resolve, reject);
        return;
      }
      resolve(globalObject.truckBoxSerializer);
    });

    return serializerPromise.then(function(lib) {
      serializer = lib;
      return Promise.resolve();
    });
  }

  function clear(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self.__dbInfo.keyPrefix;
      for (var i = sessionStorage.length - 1; i >= 0; i--) {
        var key = sessionStorage.key(i);
        if (key.indexOf(keyPrefix) === 0) {
          sessionStorage.removeItem(key);
        }
      }
    });
    executeCallback(promise, callback);
    return promise;
  }

  function get(key, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var result = sessionStorage.getItem(dbInfo.keyPrefix + key);
      if (result) {
        result = serializer.deserialize(result);
      }
      return result;
    });

    executeCallback(promise, callback);
    return promise;
  }

  function each(iterator, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var keyPrefix = self.__dbInfo.keyPrefix;
      var keyPrefixLength = keyPrefix.length;
      var length = sessionStorage.length;
      for (var i = 0; i < length; i++) {
        var key = sessionStorage.key(i);
        var value = sessionStorage.getItem(key);
        if (value) {
          value = serializer.deserialize(value);
        }
        value = iterator(value, key.substring(keyPrefixLength), i + 1);
        if (value !== void(0)) {
          return value;
        }
      }
    });

    executeCallback(promise, callback);
    return promise;
  }

  function key(n, callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var result;
      try {
        result = sessionStorage.key(n);
      } catch (error) {
        result = null;
      }
      if (result) {
        result = result.substring(dbInfo.keyPrefix.length);
      }
      return result;
    });
    executeCallback(promise, callback);
    return promise;
  }

  function keys(callback) {
    var self = this;
    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      var length = sessionStorage.length;
      var keys = [];
      for (var i = 0; i < length; i++) {
        if (sessionStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
          keys.push(sessionStorage.key(i).substring(dbInfo.keyPrefix.length));
        }
      }
      return keys;
    });

    executeCallback(promise, callback);
    return promise;
  }

  function size(callback) {
    var self = this;
    var promise = self.keys().then(function(keys) {
      return keys.length;
    });
    executeCallback(promise, callback);
    return promise;
  }

  function remove(key, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      var dbInfo = self.__dbInfo;
      sessionStorage.removeItem(dbInfo.keyPrefix + key);
    });
    executeCallback(promise, callback);
    return promise;
  }

  function set(key, value, callback) {
    var self = this;
    if (typeof key !== 'string') {
      window.console.warn(key + ' used as a key, but it is not a string.');
      key = String(key);
    }

    var promise = self.ready().then(function() {
      if (value === undefined) {
        value = null;
      }
      var originalValue = value;
      return new Promise(function(resolve, reject) {
        serializer.serialize(value, function(value, error) {
          if (error) {
            reject(error);
          } else {
            try {
              var dbInfo = self.__dbInfo;
              sessionStorage.setItem(dbInfo.keyPrefix + key, value);
              resolve(originalValue);
            } catch (e) {
              if (e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                reject(e);
              }
              reject(e);
            }
          }
        });
      });
    });
    executeCallback(promise, callback);
    return promise;
  }

  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }

  var sessionStorageDriver = {
    __driver: 'sessionStorageDriver',
    __initStorage: __initStorage,
    __support: function() {
      return new Promise(function(resolve) {
        resolve(getSupport());
      });
    },
    each: each,
    get: get,
    set: set,
    remove: remove,
    clear: clear,
    size: size,
    key: key,
    keys: keys
  };
  // Export driver:
  this.sessionStorageDriver = sessionStorageDriver;
  window.sessionStorageDriver = sessionStorageDriver;
}).call(window);