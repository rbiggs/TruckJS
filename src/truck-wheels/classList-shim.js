/*
 * Cross-browser node.tscclassList polyfill.
 */
if ("document" in self) {

  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
    (function(view) {
      "use strict";

      if (!('Element' in view)) return;
      var classListProp = "classList";
      var protoProp = "prototype";
      var elemCtrProto = view.Element[protoProp];
      var objCtr = Object;
      var strTrim = String[protoProp].trim || function() {
        return this.replace(/^\s+|\s+$/g, "");
      };
      var arrIndexOf = Array[protoProp].indexOf || function(item) {
        var i = 0;
        var len = this.length;
        for (; i < len; i++) {
          if (i in this && this[i] === item) {
            return i;
          }
        }
        return -1;
      };

      var DOMEx = function(type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      };
      var checkTokenAndGetIndex = function(classList, token) {
        if (token === "") {
          throw new DOMEx(
            "SYNTAX_ERR", "An invalid or illegal string was specified"
          );
        }
        if (/\s/.test(token)) {
          throw new DOMEx(
            "INVALID_CHARACTER_ERR", "String contains an invalid character"
          );
        }
        return arrIndexOf.call(classList, token);
      };
      var ClassList = function(elem) {
        var trimmedClasses = strTrim.call(elem.getAttribute("class") || "");
        var classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
        var i = 0;
        var len = classes.length;
        for (; i < len; i++) {
          this.push(classes[i]);
        }
        this._updateClassName = function() {
          elem.setAttribute("class", this.toString());
        };
      };
      var classListProto = ClassList[protoProp] = [];
      var classListGetter = function() {
        return new ClassList(this);
      };

      DOMEx[protoProp] = Error[protoProp];
      classListProto.item = function(i) {
        return this[i] || null;
      };
      classListProto.contains = function(token) {
        token += "";
        return checkTokenAndGetIndex(this, token) !== -1;
      };
      classListProto.add = function() {
        var tokens = arguments;
        var i = 0;
        var l = tokens.length;
        var token, updated = false;
        do {
          token = tokens[i] + "";
          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.remove = function() {
        var tokens = arguments;
        var i = 0;
        var l = tokens.length;
        var token, updated = false;
        var index;
        do {
          token = tokens[i] + "";
          index = checkTokenAndGetIndex(this, token);
          while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        }
        while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.toggle = function(token, force) {
        token += "";

        var result = this.contains(token);
        var method = result ? force !== true && "remove" : force !== false && "add";

        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };
      classListProto.toString = function() {
        return this.join(" ");
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) {
          if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    }(self));

  } else {

    (function() {
      "use strict";
      var testElement = document.createElement("_");
      testElement.classList.add("c1", "c2");
      if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
          var original = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function(token) {
            var i, len = arguments.length;

            for (i = 0; i < len; i++) {
              token = arguments[i];
              original.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }

      testElement.classList.toggle("c3", false);
      if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          } else {
            return _toggle.call(this, token);
          }
        };
      }
      testElement = null;
    }());
  }
}