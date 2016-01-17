/**
 * Interface for TruckJS.
 * This is a multi-purpose singleton, similar in purpose to jQuery.
 * It runs callbacks when the DOM in ready, and enables find elements in the DOM through its selector engine.
 * It also provides a way to create new DOM elements, as well as an extension facility to add further functionality to itself and other objects.
 */
interface TruckStatic {
  /**
   * Accepts a string containing a CSS selector which is then used to match a set of elements.
   *
   * @param selector A string containing a selector expression
   * @param context A DOM HTMLElement to use as context
   * @return DOMStack
   */
  (selector: string | HTMLElement | Element | Document, context?: HTMLElement | DOMStack): Truck;

  /**
   * Binds a function to be executed when the DOM has finished loading.
   *
   * @param callback A function to execute after the DOM is ready.
   * @return void
   */
  (callback: () => any): void;

  /**
   * Accepts a string containing a CSS selector which is then used to match a set of elements.
   *
   * @param element A DOM element to wrap in an array.
   * @return DOMStack
   */
  (element: HTMLElement | Element): Truck;

  /**
   * Accepts an DOMStack which is returned as a DOMStack.
   *
   * @param DOMStack
   * @return Truck Returns a Truck DOMStack
   */
  (elementCollection: DOMStack): Truck;

  /**
   * Accepts the document element and returns it wrapped in a DOMStack.
   *
   * @param document The document object.
   * @return DOMStack
   */
  (document: Document): Truck;

  /**
   * If no argument is provided, return the document as a DOMStack.
   * @return DOMStack
   */
  (): Truck;

  /**
   * Extend the TruckJS object itself with the provided object.
   *
   * @param object The object to add to TruckJS.
   * @return The TruckJS object.
   */
  extend(object: Object): Object;

  /**
   * Extend a target object with another object.
   *
   * @param target An object to extend.
   * @param object The object to add to the target.
   * @return The extended object.
   */
  extend(target: Object, object: Object): Object;

  /**
   * The base for extending TruckJS collections, which are DOMStacks.
   */
  fn: {
    /**
     * This method adds the provided object to the DOMStack prototype to make it available to all instances of DOMStack.
     *
     * @param object And object to add to DOMStack.
     * @return DOMStack
     */
    extend(object: Object): Truck;
  };

  /**
   * An empty function.
   *
   * @return void.
   */
  noop(): void;

  /**
   * Uuid number.
   */
  uuid(): string;

  /**
   * Create elements from an HTML string and return a Truck object.
   *
   * @param selector
   * @return Truck
   */
  html(selector: string): Truck;

  /**
   * Load a JavaScript file from a url, then execute it.
   *
   * @param url A string containing the URL where the script resides.
   * @param callback A callback function that is executed after the script loads.
   * @return void.
   */
  require(url: string, callback: Function): void;

  /**
   * This method will defer the execution of a function until the call stack is clear.
   *
   * @param callback A function to execute.
   * @param duration The number of milliseconds to delay execution.
   * @return any
   */
  delay(callback: Function, duration?: number): any;

  /**
   * The method will defer the execution of its callback until the call stack is clear.
   *
   * @param callback A callback to execute after a delay.
   * @return    Function.
   */
  defer(callback: Function): Function;

  /**
   * This method allows you to execute a callback on each item in an array of elements.
   *
   * @param array An array of elements.
   * @param callback A callback to execute on each element. This has two parameters: the index of the current iteration, followed by the context.
   */
  each<T>(array: T[], callback: (idx: number, ctx: T) => any): any;

  /**
   * Determine the internal JavaScript type of an object. 
   * 
   * @param obj Object to get the internal JavaScript type.
   * @return string A string of boolean, number, string, array, date, error, regexp, or object. 
   */
  type(obj: any): string;

  /**
   * This method converts a string of hyphenated tokens into a camel cased string.
   *
   * @param string A string of hyphenated tokens.
   * @return string
   */
  camelize(string: string): string;

  /**
   * This method converts a camel case string into lowercase with hyphens.
   *
   * @param string A camel case string.
   * @return string
   */
  deCamelize(string: string): string;

  /**
   * This method capitalizes the first letter of a string.
   *
   * @param string A string.
   * @param boolean A boolean value.
   * @return string
   */
  capitalize(string: string, boolean?: boolean): string;

  /**
   * This method takes a space-delimited string of words and returns it as an array where the individual words are indices.
   *
   * @param string A string with values separated by spaces.
   * @return string[] An array of words.
   */
  w(string: string): string[];

  /**
   * Test whether the device is an iPhone.
   *
   * @return: boolean
   */
  isiPhone: boolean;

  /**
   * Test whether a device is an iPad.
   *
   * @return: boolean
   */

  isiPad: boolean;

  /**
   * Test whether a device is an iPod.
   *
   * @return: boolean
   */

  isiPod: boolean; 

  /**
   * Test whether the device is running iOS.
   *
   * @return: boolean
   */

  isiOS: boolean; 

  /**
   * Test whether the device is running Android.
   *
   * @return: boolean
   */

  isAndroid: boolean; 

  /**
   * Test whether the device is running Backberry OS.
   *
   * @return: boolean
   */

  isBlackberry: boolean; 

  /**
   * Test whether the device supports touch events.
   *
   * @return: boolean
   */

  isTouchEnabled: boolean; 

  /**
   * Test whether the device is online. This is only checked at load time. If the connection is lost after load time, this will not reflect that.
   *
   * @return: boolean
   */

  isOnline: boolean; 

  /**
   * Test whether the app is running in standalone mode.
   *
   * @return: boolean
   */

  isStandalone: boolean;

  /**
   * Test whether the OS is Windows.
   *
   * @return: boolean
   */

  isWin: boolean;

  /**
   * Test whether the browser is IE10.
   *
   * @return: boolean
   */

  isIE10: boolean;

  /**
   * Test whether the browser is IE11.
   *
   * @return: boolean
   */

  isIE11: boolean;

  /**
   * Test whether the browser is Webkit-based.
   *
   * @return: boolean
   */

  isWebkit: boolean;

  /**
   * Test whether the browser is running on a desktop computer.
   *
   * @return: boolean
   */

  isDesktop: boolean;

  /**
   * Test whether the browser is Safari.
   *
   * @return: boolean
   */

  isSafari: boolean; 

  /**
   * Test whether the browser is Chrome.
   *
   * @return: boolean
   */

  isChrome: boolean; 

  /**
   * Test whether the browser is the native Android browser.
   *
   * @return: boolean
   */
  isNativeAndroid: boolean;

  /**
   * An alias for mousedown, MSPointerDown, pointerdown and touchstart.
   */
  eventStart: Event;

  /**
   * An alias for mouseup, MSPointerUp, pointerup and touchend.
   */
  eventEnd: Event;

  /**
   * An alias for mousemove, MSPointerMove, pointermove and touchmove.
   */
  eventMove: Event;

  /**
   * An alias for mouseout, MSPointerCancel, pointercancel and touchcancel.
   */
  eventCancel: Event;

  /**
   * Replace one element with another.
   *
   * @param new HTMLElement
   * @param old HTMLElement
   * @return HTMLElement[]
   */
  replace(newElement: string | Element | DOMStack, oldElement: string | Element | DOMStack): void;

  /** 
   *
   *
   * @return boolean
   */
  isEmptyObject(): boolean;

  /** 
   *
   *
   * @return boolean
   */
  isInteger(): boolean;

  /** 
   *
   *
   * @return boolean
   */
  isFloat(): boolean;

  /** 
   * Encodes any provided value.
   *
   * @return string A encodeURIComponent string.
   */
  encode(data: string): string;

  /** 
   * Escapes all HTML entities in a object.
   *
   * @return Object An object with its HTML entities escaped.
   */
  escapeHTML(data: Object): Object;

  /** 
   * Takes the arguments and concatenates them together as a single string.
   *
   * @param comma-separated strings or an array to convert to a string.
   * @return string
   */
  concat(...args): string;

  /**
   * An object that holds the handles for dispatchers
   */
  mediators: Object;

  /**
   * Method to inititalize a receiver for a dispatcher. This takes two arguments: a handle to listen to and a callback to handle the dispatch, including any data received.
   *
   * @param handle A string designating the handle to listen to.
   * @param callback A callback to handle the reception of a dispatch.
   * @return string A token used to identify this receiver.
   */
  receive(handle: string, callback: (data: any) => any): string;

  /**
   * This method creates a Mediator object.
   *
   * @param handle A string defined the handle that the mediator listens to.
   * @return Mediator A Mediator object.
   */
  Mediator: {

    /**
      * This method lets you create a mediator. It takes two arguments: a handle and a callback. The callback gets as its argument any data passed when the mediator is run or a dispatch sent to its handle.
      *
      * @param handle A string defining a handle for the mediator.
      * @param callback A callback to execute when the mediator runs.
      * @retun void
      */
    (handle: string, callback: (data: any) => void): {

      /**
        * This runs the mediator. Any data provided as an argument will be consumed by the mediators callback defined in its `init` method.
        *
        * @param data Any data you want to pass to the mediator.
        * @return void
        */
      run(data?: any): void;

      /**
        * Immediately stop a mediator. After this the mediator will no longer respond to attempts to run. Once stopped, it can be restarted again with the `restart()` method.
        *
        * @return void
        */
      stop(): void;

      /**
        * Tell a mediator to stop running after the designated number of times. Once stopped, it can be restarted again with the `restart()` method.
        *
        * @param after The number of times afterwhich the mediator will stop.
        * @return: void
        */
      stop(after: number): void;

      /**
        * Immediately allow a stopped mediator to respond to run commands.
        *
        * @return void
        */
      start(): void;


      /**
        * The number of times the mediator has run.
        */
      count: number;

      /**
        * Reset to zero the number used by the mediator for keeping track of how many times it has run.
        *
        * @return void
        */
      resetCount(): void;

      /**
        * Stop the mediator from counting how many times it has run.
        *
        * @return void
        */
      stopCount(): void;
    }
    dispatch(handle: string, data?: any): void;
  }

  /** 
   * Method to dispatch a handle and any provided data. This can be intercepted by any receivers listening to the provided handle.
   *
   * @param handle A string describing the handle to listen to.
   * @param data A placeholder for any data accompanying a dispatch.
   * @return boolean
   */
  dispatch(handle: string, data?: any): boolean;

  /**
   * Method to stop a receiver. Once stopped, a receiver will not respond to any dispatches. You can reset it with `$.startDispatch(handle)`. You can also pass a mediator as the argument. This will prevent the mediator from responding to dispatches.
   *
   * @param handleOrMediator A handle used by a receiver, or a mediator itself.
   */
  stopDispatch(handleOrMediator: any): void;

  /**
   * Method to start a stopped dispatch handle. You can also restart a stopped mediator by passing it as the argumet.
   *
   * @param handleOrMediator A handle used by a receiver, or a mediator itself.
   */
  startDispatch(handleOrMediator: any): void;

  /**
   * This method creates a Stack object, which is an abstraction for array. You can also use this with a mediator. Just pass the mediator as the argument: `$.startDispatch(MyMediator)`.
   *
   * @param data The data to encapsulate in the stack
   * @return Stack A new instance of Stack.
   */
  Stack(data: any[]): Stack;

  /**
   * This method creates a Model object.
   *
   * @param data The data to encapsulate in the Model.
   * @param handle A string used to describe and identify the model to the system. This is used by Mediators and Dispatchers.
   * @return Model A Model object.
   */
  Model(data: any, handle: string): Model;

  /**
   * This method create a View object.
   *
   * options An object of key/value pairs to initialize the view.
   * @return View A View object.
   */
  View(options: {
    element: string;
    template?: string;
    noTemplate?: boolean;
    model?: Model;
    variable?: string;
    events?: any[];
    startIndexFrom?: number;
    escapeHTML?: boolean;
  }): View;

  /**
   * This method sets up a component. This is a reusable view factory. It takes the same arguments as a view, minus the element property.
   *
   * @param 
   * @return View
   */
  Component(options: {
    template?: string;
    variable?: string;
    events?: any[];
    startIndexFrom?: number;
    escapeHTML?: boolean;
   }): View;

  /**
   * Get the current screen.
   */
  getCurrent(): Truck;

  /**
   * Get the next screen after the current screen.
   */
  getNext(): Truck;

  /**
   * Get the previous screen before the current screen.
   */
  getPrevious(): Truck;

  TruckRoutes: Model;

  Router(): Router;


  /**
   * A cache to hold callbacks execute by the response from a JSONP request. This is an array of strings. By default these values get purged when the callback execute and exposes the data returned by the request.
   */
  JSONPCallbacks: string[];
  /**
   * Method to perform JSONP request. 
   * 
   * @param url A string defining the url to target.
   * @param options And object literal of properties: {timeout? number, callbackName?: string, clear?: boolean}
   */
  jsonp(url: string, options?: {
    /**
     * A number representing milliseconds to express when to refect a JSONP request.
     */
    timeout?: number;
    
    /**
     * The optional name for the callback when the server response will execute. The default value is "callback". However some sites may use a different name for their JSONP function. Consult the documentation on the site to ascertain the correct value for this callback. 
     */
    callbackName?: string;
    
    /**
     * This value determines whether the callbacks and script associate with JSONP persist or are purged after the request returns. By default this is set to true, meaning that they will be purged.
     */
    clear?: boolean;
  }): any;
  
  /**
   * This method takes the data returned by a fetch or jsonp request and parses it, returning a JSON object to the following `then` for consumption by its function.
   *
   * @return JSON
   */
  json(): JSON;

  /**
   * This method allows you to format numbers. By default it uses commas for thousands, but you can provide a custom separator. Decimal markers will be handled locally by the browser.
   * By default this renders the number as is, will any decimal value. By providing a decimalPlace value, you can tell it how many decimals to display. 
   *
   * @param number The number to format.
   * @param separator A string providing the separator to use for thousands.
   * @param decimalPlace The number of deciaml places to display.
   * @return void
   */
  formatNumber(amount: number, separator?: string, decimalPlace?: number): void;

  /**
   * This method lets you get the sum of numbers. These may be comma delimited or an array of numbers.
   *
   * @param array An array of numbers or a comma-separate sequence of numbers.
   * @return number
   */
  sum(...array): number;

  /**
   * This method lets you format a number a currency. The default outputs US dollars. You can change the currency symbol with the symbol parameter. Similarly, you can change the marker used to indicate thousands with the separator parameter. You can also indicate how many decimal places to display using the decimalPlace parameter. The default is two decimal places. Decimals will be rounded off.
   *
   * @param amount A number to format as currency.
   * @param symbol A string defining the currency sumbol.
   * @param separator A string defining the separator to use for thousands.
   * @param decimalPlace The number of decimals to display.
   * @return string The string representation of the number formatted as currency.
   */
  currency(amount: number, symbol?: string, separator?: string, decimalPlace?: number): string;

  /**
   * This method allows you to take easily extract local time from a date object. It is used like this: $.formatTime(date.toLocaleTimeString()); This returns the time with appropriate AM/PM values.
   *
   * @param time A local time string from the Date object.
   * @return string
   */
  formatTime(time: string): string;

  /**
   * This method takes two dates and sorts them. You can use dates as strings in valud JavaScript format, such as: 'Jan 1, 2000'.
   *
   * @param date1 A date to sort.
   * @param date2 A date to sort.
   * @return string
   */
  sortDate(date1: string, date2: string): string;

  /**
   * This method lets you sort two numbers. The order is ascending.
   *
   * @param number1 The first number to sort.
   * @param number2 The second number to sort.
   * @return number
   */
  sortNumbers(number1: number, number2: number): number;

  /**
   * This method lets you sort two numbers. The order is descending.
   *
   * @param number1 The first number to sort.
   * @param number2 The second number to sort.
   * @return number
   */
  sortNumbersDescending(number1: number, number2: number): number;


  /**
   *
   *
   * @password
   * @return boolean
   */
  validatePassword(input1, input2, minimum): boolean;


  /**
   * An array of custom validators that are added with `registerCustomValidator()`.
   */
  customValidators: any[];

  /**
   * This method lets you create custom validators. Use this when you need a validation not provided by the defaults.
   *
   * @param input A selector or DOM node/DOMStack for the element to validate.
   * @param regex A regular express to use to validate the element's value.
   * @return boolean
   */
  validateWithRegex(input: string | Element | DOMStack, regex): boolean;

  /**
   * Use this method to register a custom validator. That way you can reuse it as needed throughout your app. Or reuse it in other apps.
   *
   * @param name The name of the custom validator.
   * @param regex The regular express to use for validation.
   * @return void
   */
  registerCustomValidator(name: string, regex: RegExp): void;

  /**
   * Interface for Box
   */
  Box: {
    /**
     * This method lets you set a key and value in your app's Box for local data persistence. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key to identify the value with in the data store.
     * @param value The value to store with the data store's key.
     * @param successCallback A successCallback to execute.
     * @return Promise
     */
    set<T>(key: string, value: any, successCallback?: Function): Promise<T>;

    /**
     * This method lets you get the value of a key stored in your app's Box. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key in the Box store you wish to retrieve.
     * @param successCallback A successCallback to execute.
     * @return Promise
     */
    get<T>(key: string, successCallback?: Function): Promise<T>;

    /**
     * This method lets you delete a key from your data store. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param key The key to remove from the data store.
     * @return Promise
     */
    remove<T>(key: string, successCallback?: Function): Promise<T>;

    /**
     * This method lets you clear out all the data from your data store. You can run a call back or capture the result of this with a thenable.
     *
     * @return Promise
     */
    clear<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you find out how many keys are stored in your app's Box.  You can handle the result using a success callback, or use a thenable instead.
     *
     * @return Promise
     */
    size<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you get the name of a key based on its index value  You can handle the result using a success callback, or use a thenable instead.
     *
     * @param keyIndex The index value for a key.
     * @return Promise
     */
    key<T>(keyIndex: number, successCallback?: Function): Promise<T>;

    /**
     * This method lets you get all the keys in your data store so you can iterate over them. You can handle the result using a success callback, or use a thenable instead.
     *
     * @return Promise
     */
    keys<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you iterate over every item in the database. You can handle the result using a success callback, or use a thenable instead.
     *
     * @param successCallback A callback to run for each item in the data store.
     * @return Promise
     */
    each<T>(successCallback?: Function): Promise<T>;

    /**
     * This method lets you  You can handle the result using a success callback, or use a thenable instead.
     *
     * @param driver A string indicating the driver to use.
     * @param name A name for the database.
     * @param size The size of the database. Default is 4980736 KB.
     * @param boxName The name of the dataStore.
     * @param version The version of the dataStore. Default is "1.0"
     * @param description A description of the dataStore. Default is empty.
     * @return void
     */
    createInstance(options: {
      driver?: string;
      name?: string;
      size?: number;
      boxName?: string;
      version?: string;
      description?: string;
    });

    /**
     * This method lets you set the name of the drive the data store is using.
     *
     * @param driverName The name of the drive to set.
     * @return void
     */
    setDriver(driverName: string);

    /**
     * This method lets you set multiple drivers for your data store with an array of driver names.
     *
     * @param any[]
     * @return void
     */
    setDriver(...options);

    /**
     * Sets the configuration values for Box to use.
     *
     * @param driver A string indicating the driver to use.
     * @param name A name for the database.
     * @param size The size of the database. Default is 4980736 KB.
     * @param boxName The name of the dataStore.
     * @param version The version of the dataStore. Default is "1.0"
     * @param description A description of the dataStore. Default is empty.
     * @return void
     */
    config(options: {
       driver?: string;
       name?: string;
       size?: number;
       boxName?: string;
       version?: string;
       description?: string;
    });
  }
  
  /**
   * Method to create chainable animations. This takes properties and values and converts them into CSS animations. It expects an element to animate. This can be a valid CSS selector, a DOM node or a DOMStack.
   */
  anim(element: string | Element | DOMStack): Anim;

}

/**
 * Interface for Anim
 */
interface Anim {

  /**
   * Create an instance of Anim. This takes one argument, an element to animate
   * 
   * @param element A CSS selector, DOM node or DOMStack to animate.
   * @return Anim
   */
  (element: string | Element | DOMStack): void;
  
  /**
   * This method lets you skew the element using its x and y axis. If only one value is provided, it skews the x axis.
   * 
   * @param x A number to skew the x axis.
   * @param y A number to skew the y axis.
   * @return Anim
   */
  skew(x: number, y?: number): Anim;
  
  /**
   *  This method lets you skew an element along its x axis.
   * 
   * @param n The number of pixels to skew the x axis. 
   * @return Anim
   */
  skewX(n: number): Anim;
  
  /**
   *  This method lets you skew an element along its y axis.
   * 
   * @param n The number of pixels to skew the y axis.
   * @return Anim
   */
  skewY(n: number): Anim;
  
  /**
   *  This method lets you translate an element along its x and y axis. If only one value is provided, it translates along the x axis.
   * 
   * @param x The number of pixels to translate along the x axis.
   * @param y The number of pixels to translate along the y axis.
   * @return Anim
   */
  translate(x: number, y?: number): Anim;
  
  /**
   *  This method lets you translate an element along its x axis.
   * 
   * @param The number of pixels to translate along the x axis.
   * @return Anim
   */
  translateX(n: number): Anim;
  
  /**
   *  This method lets you translate an element along its y axis.
   * 
   * @param The number of pixels to translate along the y axis.
   * @return Anim
   */
  translateY(n: number): Anim;
  
  /**
   *  This method lets you translate an element along its x axis.
   * 
   * @param The number of pixels to translate along the x axis.
   * @return Anim
   */
  x(n: number): Anim;
  
  /**
   *  This method lets you translate an element along its y axis.
   * 
   * @param The number of pixels to translate along the y axis.
   * @return Anim
   */
  y(n: number): Anim;
  
  /**
   *  This method lets you scale an element along its x and y axis. If only one value is provided, it scales along the x axis.
   * 
   * @param x The number of pixels to scale along the x axis.
   * @param y The number of pixels to scale along the y axis.
   * @return Anim
   */
  scale(x: number, y?: number): Anim;
  
  /**
   * This method lets you scale an element along its x axis.
   * 
   * @param x The number of pixels to scale along the x axis. 
   * @return Anim
   */
  scaleX(n: number): Anim;
  
  /**
   * This method lets you scale an element along its y axis.
   * 
   * @param y The number of pixels to scale along the y axis. 
   * @return Anim
   */
  scaleY(n: number): Anim;
  
  /**
   *  This method lets you define a math matrix to transform an element.
   * 
   * @param numbers A matrix of numbers defining a transform to implement.
   * @return Anim
   */
  matrix(...numbers): Anim;
  
  /**
   * This method lets you rotate an element.
   * 
   * @param degress The number of degrees to rotate the element.
   * @return Anim
   */
  rotate(degrees: number): Anim;
  
  /**
   * This method lets you designate an easing function for an animation sequence.
   * 
   * @param easeingFn An easing function to use.
   * @return Anim
   */
  ease(easeingFn: string): Anim;
  
  /**
   * This method lets you the duration for an animation sequence. This can be a number represeint milliseconds or a valid CSS transtion duration string with a time identifier: .duration('3s')
   * 
   * @param n A number or string designating the duration.
   * @return Anim
   */
  duration(n: number | string): Anim;
  
  /**
   * This method lets you delay the start of an animation sequence. It expects a number for millisecionds or a valid CSS transition duration string with a time identifier: .delay('3s')
   * 
   * @param n A number or string designating the delay.
   * @return Anim
   */
  delay(n: number | string): Anim;
  
  /**
   * This method lets you set a value on a property of the element.
   * 
   * @param propertyName The property to set.
   * @param value The value to set the property to.
   * @return Anim
   */
  set(propertyName: string, value: any): Anim;
  
  /**
   * This method lets you add a numeric pixel value to the designated property on the element. This only works with properties that accept pixel values.
   * 
   * @param propertyName The property to set.
   * @param value The value to set the property to.
   * @return Anim
   */
  add(propertyName: string, value: number): Anim;
  
  /**
   * This method lets you subtract a numeric pixel value from the designated property on the element. This only works with properties that accept pixel values.
   * 
   * @param propertyName The property to set.
   * @param value The value to set the property to.
   * @return Anim
   */
  sub(propertyName: string, value: number): Anim;
  
  /**
   * This method lets you define a new animation on the provided element. This can be the same element, or a completely different element. Using this allows you to set up complex animations involving multiple elements.
   * 
   * @param  element A CSS selector, DOM node or DOMStack to animate.
   * @return Anim
   */
  anim(element: string | Element | DOMStack): Anim;
  
  /**
   * This method lets you create a new aniation sequence. This can have its only duration, delay and easing.
   * 
   * @param callback A callback to execute when the sequence ends.
   * @return Anim
   */
  then(callback?: () => Anim): Anim;
  
  /**
   * This method terminates a previous `then` sequence.
   * 
   * @return Anim
   */
  pop(): Anim;
  
  /**
   * This method lets you run the animation. It needs to be the last method in the chain of methods defining an animation. It can take a callback. If the aniation consists of a single secquence, the callback will execute when that ends. In the case of animation with multiple sequences, it executes when the first sequence ends.
   * 
   * @param callback A callback to execute when the animation sequence ends.
   * @return Anim
   */
  run(callback?: () => Anim): Anim;
  
  /**
   * This method lets you reset the state of an element after it has been animated.
   * 
   * @return Anim
   */
  reset(): Anim;
}

/**
 * Interface for DOMStack.
 * This is an abstraction container for DOM Nodes, similar to a NodeList that allows Truck to add custom functions to manipulate collections of elements without directly modifying native methods.
 */
interface DOMStack extends Object {
  (args: any): Truck;

  /**
   * This method returns the element at the position in the array indicated by the argument. This is a zero-based number.
   * When dealing with document nodes, this allows you to cherry pick a node from its collection based on its
   * position amongst its siblings.
   *
   * @param number Index value indicating the node you wish to access from a collection. This is zero-based.
   * @return DOMStack with one HTMLElement.
   */
  eq(index: number): Truck;

  /**
   * This method pushes the provided element onto the DOMStack's data array.
   *
   * @param element The element to push to the DOMStack data array.
   * @return DOMStack
   */
  push(element: HTMLElement | Element): void;

  /**
   * This method pops the last item off of the DOMStack's data array.
   * The poped item gets returned as the result.
   *
   * @return void
   */
  pop(): any;

  /**
   * This method pushes the provided element to the beginning of the DOMStack's data array.
   *
   * @param element The element to push into the DOMStack data array.
   */
  unshift(element): void;

  /**
   * This method pops the first item off of the DOMStack's data array.
   * The poped item gets returned as the result.
   *
   * @param element An element to push onto the beginning of a DOMStack.
   * @return void
   */
  shift(): any;

  /**
   * This method returns the current length of the DOMStack. If the DOMStack contains no elements, it returns 0. The length is based on the number of items in the DOMStack data array.
   *
   * @return number A number representing the number of items in the DOMStack.
   */
  size(): number;

  /**
   * This method executes the provided callback for each item in the DOMStack.
   * It uses normal JavaScript parameter order: context first, index last.
   *
   * @param Function
   * @return void
   */
  forEach(func: (ctx: any, idx?: number) => void): void;

  /**
   * This method executes the provided callback for each item in the DOMStack.
   * It uses jQuery parameter order: index first, context last.
   *
   * @param Function
   * @return void
   */
  each(func: (idx: number, ctx?: any) => void): void;

  /**
   * This method returns a shallow copy of a portion of the DOMStack as a new DOMStack.
   * It takes two arguments: a start number and an optional end number. These are zero-based.
   *
   * @param start A zero-based number
   * @param end A zero-based number
   * @return DOMStack A subsection of a DOMStack matching the parameters.
   */
  slice(start: number, end?: number): Truck;

  /**
   * This method changes the content of the DOMStack by removing existing elements and/or adding new elements. 
   * The first argument is the start, which is the index at which to start changing the DOMStack. If greater than the length of stack, actual starting index will be set to the length of the stack. If negative, will begin that many elements from the end.
   * The second argument is deleteCount, an integer indicating the number of old DOMStack elements to remove. If deleteCount is 0, no elements are removed. In this case, you should specify at least one new element. If deleteCount is greater than the number of elements left in the DOMStack starting at start, then all of the elements through the end of the DOMStack will be deleted.
   * You can desingate any number of comma separated elements to add to the DOMStack. If you don't specify any elements, splice() will only remove elements from the DOMStack.
   *
   * @param start A zero-based number
   * @param deleteCount A zero-based number
   * @param itemN One or more elements to insert into the DOMStack.
   * @return void
   */
  splice(start: number, deleteCount?: number, ...item: any[]): void;

  /**
   * This method sorts the elements of an DOMStack in place. The sort is not necessarily stable. The default sort order is according to string Unicode code points. Normal this is in ascending order.
   * @return void
   */
  sort(): void;

  /**
   * This method takes a comma separated list of properties by which to sort the DOMStack. If a property is preceded by a hyphen the sort order is descending, otherwise it is ascending.
   *
   * @param property One or more properties by which to sort the DOMStack.
   * @return void
   */
  sortBy(...property: any[]): Truck;

  /**
   * This method creates a new DOMStack with all elements that pass the test implemented by the provided callback.
   *
   * @param callback A calback to execute will filtering the DOMStack.
   * @param thisArg  An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  filter(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): Truck;

  /**
   * This method creates a new DOMStack with the results of calling a provided function on every element in the DOMStack.
   *
   * @param callback A function that accepts up to three arguments. The map method calls the callback function one time for each element in the array. 
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  map(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): any[];

  /**
   * This method joins the elements provided as arguments to the DOMStack.
   *
   * @param value A single element or an array of elements.
   * @return void
   */
  concat(...value: any[]): void;

  /**
   * This method reverses a DOMStack in place. The first DOMStack element becomes the last and the last becomes the first.
   *
   * @return void
   */
  reverse(): void;

  /**
   * This method returns the first index at which a given element can be found in the DOMStack, or -1 if it is not present.
   *
   * @param
   * @return number
   */
  indexOf(searchElement: any, fromIndex?: number): number;

  /**
   * This method tests whether all elements in the DOMStack pass the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The every method calls the callback function for each element in the DOMStack until the callback returns false, or until the end of the DOMStack.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  every(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;

  /**
   * This method tests whether some element in the DOMStack passes the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The some method calls the callback function for each element in the DOMStack until the callback returns true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return DOMStack
   */
  some(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;

  /**
   * This method removes all duplicates from the DOMStack.
   *
   * @return void
   */
  unique(): void;

  /**
   * This method returns the data array that the DOMStack holds. If the DOMStack has no elements, this will be an empty array with a length of 0.
   *
   * @return data Whatever data the DOMStack contains.
   */
  getData(): any[];

  /**
   * This method returns the type of the DOMStack, which is 'domstack'.
   *
   * @return a string The value 'domstack'.
   */
  type(): string;

  /**
   * This method removes all data from the DOMStack. This reduces its internal array to empty with a length of 0.
   *
   * @return void
   */
  purge(): void;
}

/**
 * Interface for TruckJS Collections.
 * This is defines the methods added to the DOMStack prototype using `$.fn.extend`.
 */
interface Truck extends DOMStack {

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by an element.
   *
   * @param selector A selector to test.
   * @return Truck Returns a Truck DOMStack
   */
  find(selector: string): Truck;

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by an element.
   *
   * @param element An element to test.
   * @return Truck Returns a Truck DOMStack
   */
  find(element: Element): Truck;

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by a DOMStack.
   *
   * @param element An element to test.
   * @return Truck Returns a Truck DOMStack
   */
  find(element: DOMStack): Truck;

  /**
   *  Check the current matched set of elements against a selector and return true if at least one of these elements matches the given arguments.
   * 
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  is(selector: string): boolean;

  /**
   *  Check the current matched set of elements against a an array of elements and return true if at least one of these elements matches the given arguments.
   * 
   * @param elements An array containing elements to match against.
   * @return boolean
   */
  is(elements: Element[]): boolean;

  /**
   * Check the current matched set of elements against a selector, element, or an array of elements and return true if at least one of these elements matches the given arguments.
   * 
   * @param callback A function used as a test for the set of elements.Within the function, `this` refers to the current DOM element.
   * @return boolean
   */
  is(callback: (index: number, element: Element) => boolean): boolean;

  /**
   * Remove elements from the set of matched elements.
   * 
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  not(selector: string): Truck;

  /**
   * This method removes elements from the set of matched elements.
   *
   * @param element An HTML element to test againts.
   * @return Truck Returns a Truck DOMStack
   */
  not(element: Element): Truck;

  /**
   * This method removes elements from the set of matched elements.
   *
   * @param collection A DOMStack.
   * @return Truck Returns a Truck DOMStack
   */
  not(collection: Truck);

  /**
   * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
   *
   * @param selector A string defining a valid HTML selector.
   * @return Truck Returns a Truck DOMStack
   */
  has(selector: string): Truck;

  /**
   * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
   *
   * @param node A single DOM node.
   * @return Truck Returns a Truck DOMStack
   */
  has(node: Element): Truck;

  /**
   * Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return
   */
  prev(selector?: string): Truck;

  /**
   * Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  prevAll(selector?: string): Truck;

  /**
   * Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  next(): Truck;

  /**
   * Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  nextAll(): Truck;

  /**
   * Reduce the set of matched elements to the first in the set.
   *
   * @return Truck Returns a Truck DOMStack
   */
  first(): Truck;

  /**
   * Reduce the set of matched elements to the final one in the set.
   *
   * @return Truck Returns a Truck DOMStack
   */
  last(): Truck;

  /**
   * Search for a given element from among the matched elements.
   *
   * @return Truck Returns a Truck DOMStack
   */
  index(): Truck;

  /**
   * Search for a given element from among the matched elements.
   *
   * @param selector A selector representing a jQuery collection in which to look for an element.
   * @return Truck Returns a Truck DOMStack
   */
  index(selector: string | Truck): Truck;

  /**
   * Get the children of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  children(selector?: string): Truck;

  /**
   * Get the siblings of each element in the set of matched elements, optionally filtered by a selector.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  siblings(selector?: string): Truck;

  /**
   * Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
   * 
   * @return Truck Returns a Truck DOMStack
   */
  parent(): Truck;

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   *
   * @param selector A string containing a selector expression to match elements against.
   * @return Truck Returns a Truck DOMStack
   */
  closest(selector: string): Truck;

  /**
   * For each element in the set, get the element that matches the position by traversing up through its ancestors in the DOM tree.
   *
   * @param position A number indicating the position of the element ancestor to return.
   * @return Truck Returns a Truck DOMStack
   */
  closest(position: number): Truck;

  /**
   * Get the value of style properties for the first element in the set of matched elements.
   *
   * @param property A CSS property.
   * @return Truck Returns a CSS value in string format.
   */
  css(property: string): string;

  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param property A CSS property name.
   * @param value A value to set for the property.
   * @return CSS property value as string.
   */
  css(property: string, value: string | number): Truck;

  /**
   * Set one or more CSS properties for the set of matched elements.
   *
   * @param properties An object of property-value pairs to set.
   * @return Truck Returns a Truck DOMStack
   */
  css(properties: Object): Truck;

  /**
   * Get the current computed width for the first element in the set of matched elements,
   * including padding but excluding borders.
   *
   * @param
   * @return number
   */
  width(): number;

  /**
   * Get the current computed height for the first element in the set of matched elements,
   * including padding but excluding borders.
   *
   * @return number
   */
  height(): number;

  /**
   * Insert content, specified by the parameter, before each element in the set of matched elements.
   *
   * @param content HTML string, DOM element, or DOMStack to insert before each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  before(content: Truck | Element | string | number): Truck;

  /**
   * Insert content, specified by the parameter, after each element in the set of matched elements.
   *
   * @param content HTML string, DOM element, or DOMStack to insert after each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  after(content: Truck | Element | string | number): Truck;

  /**
   * Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  prepend(content: Truck | Element | string | number): Truck;

  /**
   * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  append(content: Truck | Element | string | number): Truck;

  /**
   * Insert every element in the set of matched elements to the beginning of the target.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  prependTo(content: Truck | Element | string | number): Truck;

  /**
   * Insert every element in the set of matched elements to the end of the target.
   *
   * @param content DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  appendTo(content: Truck | Element | string | number): Truck;

  /**
   * Create a copy of the set of matched elements.
   *
   * @param deep A Boolean indicating whether to copy the element(s) with their children. A true value copies the children.
   * @return Truck Returns a clone of a Truck DOMStack with all of its descendents.
   */
  clone(deep?: boolean): Truck;

  /**
   * Wrap an HTML structure around each element in the set of matched elements.
   *
   * @param wrappingElement A selector or HTML string specifying the structure to wrap around the matched elements.
   * @return Truck Returns a Truck DOMStack
   */
  wrap(): Truck;

  /**
   * Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.
   *
   * @return Truck Returns a Truck DOMStack
   */
  unwrap(): Truck;

  /**
   * Get the current coordinates of the first element in the set of matched elements, relative to the document.
   *
   * @return An object containing the properties top and left, which are integers indicating the new top and left coordinates for the element.
   */
  offset(): Truck;

  /**
   * Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.
   *
   * @return An object with the top and left absolute position of the element.
   */
  position(): Truck;

  /**
   * Remove all child nodes of the set of matched elements from the DOM. Before doing so, all events will be unbound from the elements.
   *
   * @return Truck Returns a Truck DOMStack
   */
  empty(): Truck;

  /**
   * Get the HTML contents of the first element in the set of matched elements.
   *
   * @return string A string representation of an element's content.
   */
  html(): string;

  /**
   * Set the HTML contents of each element in the set of matched elements.
   *
   * @return Truck Returns a Truck DOMStack
   */
  html(htmlString: string): string;

  /**
   * Get the combined text contents of each element in the set of matched elements, including their descendants.
   *
   * @return string A string representation of an element's content.
   */
  text(): Truck;

  /**
   * Set the content of each element in the set of matched elements to the specified text.
   *
   * @param text The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.
   * @return Truck Returns a Truck DOMStack
   */
  text(text: string | number | boolean): Truck;

  /**
   * Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.
   *
   * @param newContent The content to insert. May be an HTML string, DOM element, or Truck DOMStack.
   * @return void
   */
  replaceWith(newContent: Truck | Element | string): void;

  /**
   * Removes the elements from the DOM. Before doing so, it unbinds all events.
   *
   * @return void
   */
  remove(): void;

  /**
   *  Adds the specified class(es) to each of the set of matched elements.
   *
   * @param className One or more space-separated classes to be added to the class attribute of each matched element.
   * @return Truck Returns a Truck DOMStack
   */
  addClass(className: string): Truck;

  /**
   * Determine whether any of the matched elements are assigned the given class.
   *
   * @param className The class name to search for.
   * @return boolean
   */
  hasClass(): boolean;

  /**
   * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
   *
   * @param className One or more space-separated classes to be removed from the class attribute of each matched element.
   * @return Truck Returns a Truck DOMStack
   */
  removeClass(className?: string): Truck;

  /**
   * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.
   *
   * @param className One or more class names (separated by spaces) to be toggled for each element in the matched set.
   */
  toggleClass(className: string): Truck;

  /**
   * Get the value of an attribute for the first element in the set of matched elements.
   *
   * @param param attribute The name of the attribute to get.
   * @return string A string representing the attribute value.
   */
  attr(attribute: string): string;

  /**
   * Set the attribute and value for the set of matched elements.
   *
   * @param
   * @return Truck Returns a Truck DOMStack
   */
  attr(attribute: string, value: string | number | boolean): Truck;

  /**
   * Remove an attribute from each element in the set of matched elements.
   *
   * @param attribute An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.
   * @return Truck Returns a Truck DOMStack
   */
  removeAttr(): Truck;

  /**
   * Get the value of a property for the first element in the set of matched elements.
   *
   * @param propertyName The name of the property to get.
   */
  prop(property: string): string;

  /**
   * Set one or more properties for the set of matched elements.
   *
   * @param property The name of the property to set.
   * @param value A value to set for the property.
   * @return string A string represent the property value.
   */
  prop(property: string, value: string | number | boolean): Truck;

  /**
   * Remove a property for the set of matched elements.
   *
   * @param property The name of the property to remove.
   * @return Truck Returns a Truck DOMStack
   */
  removeProp(): Truck;

  /**
   * Add the class 'disabled' to the element(s).
   *
   * @return Truck Returns a Truck DOMStack
   */
  disable(): Truck;

  /**
   * Remove the class 'disabled' from the element(s).
   *
   * @return Truck Returns a Truck DOMStack
   */
  enable(): Truck;

  /**
   * Get the current value of the first element in the set of matched elements.
   *
   * @return string A string representing the element value.
   */
  val(): string | number;

  /**
   * Set the value of each element in the set of matched elements.
   *
   * @param value A string of text or number corresponding to the value of each matched element to set as selected/checked.
   * @return Truck Returns a Truck DOMStack
   */
  val(value: string | number): Truck;

  /**
   * Sets the display value of the element to  `none`, while storing its previous display value on the `display_attr` attribute for later retrieval.
   *
   * @param
   * @return Truck Returns a Truck DOMStack
   */
  hide(): Truck;

  /**
   *  Sets the display state of the element(s). If the element has the attrbute `display_attr`, it sets the element to that value, otherwise it sets it to `block`.
   *
   * @return Truck Returns a Truck DOMStack
   */
  show(): Truck;

  /**
   * Get arbitrary data associated with the matched elements based on the provided key.
   *
   * @param key A string naming the piece of data to set.
   * @return data The data associated with the element.
   */
  data(key: string): any;

  /**
   * Store arbitrary data associated with the matched elements.
   *
   * @param key A string naming the piece of data to set.
   * @param value The new data value; it can be any Javascript type including Array or Object.
   */
  data(key: string, value: any): Truck;

  /**
   * Remove a previously-stored piece of data.
   *
   * @param name A string naming the piece of data to delete or space-separated string naming the pieces of data to delete.
   */
  removeData(name: string): Truck;

  /**
   * Encode a set of form elements as a string for submission.
   *
   * return string A string version of a form's serialized data.
   */
  serialize(): string;

  /**
   * Encode a set of form elements as an array of object names and values.
   */
  serializeArray(): Object[];

  /**
   * Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.
   *
   * @return Object[] An array of object name value pairs.
   */
  param: Object[];

  /**
   * Add a handler for an event on elements.
   *
   * @param eventType A string containing one or more DOM event types, such as "tap" or "submit", etc..
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return Truck
   */
  on(eventType: string | Event, handler?: (eventObject: Event) => any, capturePhase?: boolean): Truck;

  /**
   * Add a handler to an event for elements. When a selector is provided as the second argument, this implements a delegated event where Truck listens on the element for events on the designated descendent element.
   *
   * @param eventType A string containing one or more DOM event types, such as "tap" or "submit", 
   * @param selector A string defining the descendant elements are listening for the event.
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return Truck
   */
  on(eventType: string | Event, selector: any, handler?: (eventObject: Event) => any, capturePhase?: boolean): Truck;

  /**
   * Remove a handler for an event from the elements. If the second argument is a selector, it tries to undelegate the event.
   * If no arugments are provided, it removes all events from the element(s).
   *
   * @param eventType A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
   * @param selector A string defining the descendant elements are listening for the event.
   * @param handler A function handler assigned to this event.
   * @param useCapture Setting the third argument to true will trigger event bubbling. The default is false.
   * @return Truck
   */
  off(eventType?: string | Event, selector?: any, handler?: (eventObject: Event) => any, capturePhase?: boolean): Truck;

  /**
  * Trigger an event on an element.
  * 
  * @param eventType The event to trigger.
  * @return void
  */
  trigger(eventType: string | Event): void;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return Truck
   */
  iz(selector: string | Element | Truck): Truck;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return Truck
   */
  iznt(selector: string | Element | Truck): Truck;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return Truck
   */
  haz(selector: string | Element | Truck): Truck;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param selector A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return Truck
   */
  haznt(selector: string | Element | Truck): Truck;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return
   */
  hazClass(className: string): Truck;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param A valid CSS selector, DOM node, or Truck DOMStack element.
   * @return Truck
   */
  hazntClass(className: string): Truck;

  /** 
   * Returns all elements that match the provided selector.
   * 
   * @param attributeName A string specifying the attribute to check against.
   * @return Truck
   */
  hazAttr(attributeName: string): Truck;

  /** 
   * Returns all elements that do not match the provided selector.
   * 
   * @param attributeName A string specifying the attribute to check against.
   * @return Truck
   */
  hazntAttr(attributeName: string): Truck;

  /**
   * Test whether a form input is empty or not.
   *
   * @return boolean
   */
  isNotEmpty(): boolean;

  /**
   * Test whether the value of a form input is alphabetic.
   *
   * @return boolean
   */
  validateAlphabetic(): boolean;

  /**
   * Test whether the value of a form input is Numeric.
   *
   * @return boolean
   */
  validateNumber(): boolean;

  /**
   * Test whether the value of a form input is alphanumeric.
   *
   * @param 
   * @return boolean
   */
  validateAlphaNumeric(): boolean;

  /**
   * Test whether the value of a form input is a valid user name, meaning whether it is alphanumeric and whether it match the minimum number of characters.
   *
   * @param minimum The minimum number of characters for a user name.
   * @return boolean
   */
  validateUserName(minimum?: number): boolean;

  /**
   * Test whether the value of a form input is a valid email addres.
   *
   * @return boolean
   */
  validateEmail(): boolean;

  /**
   * Test whether the value of a form input is a valid telephone number. This uses standar North America telephone format. If you have other needs, look at defining a custom validator with `$.registerCustomValidator(name, regex)`.
   *
   * @param 
   * @return boolean
   */
  validatePhoneNumber(): boolean;

  /**
   * Test whether the value of a form input is a valid url.
   *
   * @return boolean
   */
  validateUrl(): boolean;

  /**
   * Test whether the value of a form input is valid age. An age must be a number and the validation requires a minimum number for age. 
   *
   * @param minimum A number indicating the minimum age required.
   * @return boolean
   */
  validateAge(minimum: number): boolean;

  /**
   * Test whether the checkbox is checked or not.
   *
   * @return boolean
   */
  validateCheckbox(): boolean;

  /**
   * Test whether the radio button is checked or not.
   *
   * @return boolean
   */
  validateRadioButtons(): boolean;

  /**
   * Test whether the user made a selection in the select box.
   *
   * @return boolean
   */
  validateSelectBox(): boolean;

  /**
   * Test whether the switch is on or not.
   *
   * @return boolean
   */
  validateSwitch(): boolean;

  /**
   * Test whether the user chose something in a Truck Select List.
   *
   * @return boolean
   */
  validateSelectList(): boolean;

  /**
   * Test whether the user chose something in a Truck Multi-Select List.
   *
   * @return boolean
   */
  validateMultiSelectList(): boolean;
}

/**
 * Interface for Stack, an abstraction for arrays.
 */
interface Stack {

  /**
   * Returns the number of items in the stack.
   *
   * @return number
   */
  size(): number;
  
  /**
   * Pushes the provided data onto the stack.
   *
   * @param data The data to push to the stack.
   * @return void
   */
  push(data: any): void;
  
  /**
   * Pops off the last item in the stack
   *
   * @return Last item in the stack.
   */
  pop(): any;
  
  /**
   * Push the provided data at the beginning of the stack.
   *
   * @param data The data to put in the stack.
   * @return void
   */
  unshift(data: any): void;
  
  /**
   * Pop off the first item in the stack.
   *
   * @return The first item in the stack.
   */
  shift(): any;
  
  /**
   * Get item from stack based on its numeric position. This is zero-based. If no item matches the provided position, it returns undefined.
   *
   * @param number
   * @return Item at the provided position.
   */
  eq(position: number): any;
  
  /**
   * Performs a forEach loop equivalent to the array function with context first and index last.
   *
   * @param callback A callback to execute.
   * @return void
   */
  forEach(callback: (context: any, index: number) => any): void;
  
  /**
   * Performs a forEach loop equivalent to jQuery [].each with index first and context last.
   *
   * @param callback A callback to execute.
   * @return void
   */
  each(callback: (index: number, context: any) => any): void;
  
  /**
   * Performs a slice of the stack equivalent to the array function.
   *
   * @param start A number indicating the start position.
   * @param end A number inidicating the end position.
   * @return void
   */
  slice(start: number, end?: number): Stack;
  
  /**
   * Performs a splice on the stack equivalent to the array function.
   *
   * @param start A number indicating the start position.
   * @param deleteCount A number indicating how may indices to splice.
   * @param item Optional items to insert.
   * @return void
   */
  splice(start: number, deleteCount?: number, ...item: any[]): void;
  sort(): void;
  
  /**
   * This method takes a comma separated list of properties by which to sort the stack. If a property is preceded by a hyphen the sort order is descending, otherwise it is ascending.
   *
   * @return void
   */
  sortBy(...property: any[]): void;
  
  /**
   * Performs a filter of the stack equivalent to the array function.
   *
   * @param callback A callback to execute.
   * @return Stack A new stack based on the results of the filter.
   */
  filter(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): Stack;
  
  /**
   * Performs a map of the stack equivalent to the array function.
   *
   * @param callback A callback to execute.
   * @return Stack A new stack based on the results of the map.
   */
  map(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): Stack;
  
  /**
   * Joins all the items in the stack as a string. Equivalent to the array function of the same name.
   *
   * @param
   * @return string A string resulting from joining all items in the stack.
   */
  join(): string;
  
  /**
   * Concatenates the provided array to the stack. Equivalent to the array function of the same name.
   *
   * @param array An array to concat onto the stack.
   * @return void
   */
  concat(array: any[]): void; 
  
  /**
   * Reverses the content of the stack.
   *
   * @return void
   */
  reverse(): void; 
  
  /**
   * Performs a forEach loop equivalent to the array function.
   *
   * @param searchElement The element to search for.
   * @param fromIndex The index to start from.
   * @return number The position of the search result. If not found this will be -1.
   */
  indexOf(searchElement: any, fromIndex?: number): number;
  
  /**
   * This method tests whether all elements in the stack pass the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The every method calls the callback function for each element in the stack until the callback returns false, or until the end of the stack.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return
   */
  every(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean;
  
  /**
   * This method tests whether some element in the stack passes the test implemented by the provided function.
   *
   * @param callback A function that accepts up to three arguments. The some method calls the callback function for each element in the stack until the callback returns true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   * @return
   */
  some(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): boolean; 
  
  /**
   * This method removes all duplicates from the stack.
   *
   * @return void
   */
  unique(): void; 
  
  /**
   * Remove all items from the stack. The stack will be equal to [].
   *
   * @return
   */
  purge(): void; 
  
  /**
   * Get the items in the stack. This will return an array of all data.
   *
   * @return array An array of all data in the stack.
   */
  getData(): any[]; 
}

/** 
 * Interface for Model
 */
 interface Model {
   (data: any, handel: string): Model;
   /**
    * Returns the key used by Box for storing the model for local persistence.
    *
    * return key The key used by Box when a model is boxed or set to auto-box. This key is used to store the model in whatever store Box is using for the current browser.
    */
   key(): string

   /**
    * Returns the number of items in a model if the model holds a collection. If the model holds a single object, this returns undefined. 
    *
    * return number The number of items in a model.
    */
   size(): number;

   /**
   * This method returns the element at the position in the model indicated by the argument. This is a zero-based number.
   * If the model does not hold a collection but a single object, this returns undefined.
   * position amongst its siblings.
   *
   * @param number Index value indicating the node you wish to access from a collection. This is zero-based.
   */
   eq(number: number): any;

   /**
    * The method lets you set a value on a property in an object in the model. If the property does not exist, it will be addded. Otherwise the property's current value will be replaced with the new value.
    *
    * @param propertyName The property to update.
    * @param value The value to set to the property.
    * @param doNotPropogate An optional true boolean. When present the model will not propagate its changes when they occur.
    * @return void
    */
   setProp(propertyName: string, value: any, doNotPropogate?: boolean): void;

   /**
    * Get the value of the provided property.
    *
   * @param doNotPropogate A boolean to controller change propagation.
    * @return value The value of the property.
    */
   getProp(propertyName: string): any;

   /**
    * When the model holds a single object, this method lets you do a wholesale replacement of the model's object with the one provided as an argument.
    *
    * @param object The object to replace the current object with.
    * @return void
    */
   setObject(object: Object): void;

   /**
    * When the model contains a single object, this method lets you merge an object with the model's current object so you can add multple property/value pairs in one pass.
    *
    * @param object The object to merge with the model's object.
    * @return void
    */
   mergeObject(object: Object): void;

   /**
   * This pushes the provided data onto the model when it is a collection.
   *
   * @param data The data to push on the the model.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   push(data: any, doNotPropogate?: boolean): void;

   /**
   * This pops the last item off of the model's collection.
   *
   * @param doNotPropogate A boolean to controller change propagation.
   * @return data The last item in the model's collection.
   */
   pop(doNotPropogate?: boolean): any;

   /**
   * This inserts the provided data at the beginning of a model's collection.
   *
   * @param data The data to insert at the beginning of the model's collection.
   * @return void
   */
   unshift(data: any, doNotPropogate?: boolean): void;

   /**
   * This pops the first item off of the model's collection.
   *
   * @param doNotPropogate A boolean to controller change propagation.
   * @return data The first item of the model's collection
   */
   shift(doNotPropogate?: boolean): any;

   /**
   * Concatenate an array of data to the model's collection.
   *
   * @param data An array of data to add to the end of the model's collection.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   concat(data: any[], doNotPropogate?: boolean): void;

   /**
   * Insert data into the provided position of the model's collection. If the position provided is greater than the number of items in the collection, the data will be push onto the end of the colleciton.
   *
   * @param data The data to insert.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   insert(position: number, data: any, doNotPropogate?: boolean): void;

   /**
   * Remove all duplicates from the model's collection.
   *
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   unique(doNotPropogate?: boolean): void;

   /**
   * Get the index of an object in a collection based on a property and value.
   *
   * @param propertyName The property to search for.
   * @param value The value that the property must have.
   * @return number The zero-based position of the object.
   */
   index(propertyName: string, value: any): number;

   /**
   * Performs a filter of the model's colleciton equivalent to the array function.
   *
   * @param
   * @return
   */
   filter(callback: (value: any, index: number, array: any[]) => boolean, thisArg?: any): any[];

   /**
   *Performs a map of the model's colleciton equivalent to the array function.
   *
   * @param
   * @return
   */
   map(callback: (value: any, index: number, array: any[]) => any, thisArg?: any): any[];

   /**
   * Returns an array of objects of all the properties and their values that are in the model's collection.
   *
   * @param propertyName The name of the property to retrieve results for.
   * @return array An array of all the properties and their values in the model.
   */
   pluck(propertyName: string): any[];

   /**
   * Performs a sort of the model's colleciton equivalent to the array function.
   *
   * @param start A number indicating the start position.
   * @param deleteCount A number indicating how may indices to splice.
   * @param item Optional items to insert.
   * @return
   */
   sort(start: number, deleteCount?: number, ...item: any[]): void;

   /**
   * Reverses the order of the model's collection.
   *
   * @return void
   */
   reverse(): void;

   /**
   * This method takes a comma separated list of properties by which to sort the model's collection. If a property is preceded by a hyphen the sort order is descending, otherwise it is ascending.
   *
   * @return void
   */
   sortBy(...property: any[]): void;

   /**
   * The method lets you delete the property of an object when the model holds a single object, or, if a number is provided, it deletes the object at that location in the model's collection. The number is zero-based.
   *
   * @param item The item or index position.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   delete(item: any, doNotPropogate?: boolean): void;

   /**
   * This method lets you run a callback that gets the model's collection as its argument.
   *
   * @param callback A callback to execute.
   * @return void
   */
   run(callback: (data: any) => void): void;

   /**
   * This method forces the model to propagate its current state so that any mediators or dispatch receivers can intercept it.
   *
   * @return void
   */
   poke(): void;

   /**
   * Get the handle the model is using.
   *
   * @return string
   */
   getHandle(): string;

   /**
   * This lets you set the handle the model uses when it propagates its changes. This allows you to change which mediators and dispatch receivers are reacting to the model's changes.
   *
   * @param handle A string defining a new handle for the model.
   * @return void
   */
   setHandle(handle: string): void;

   /**
   * This method deletes all data from the model. In the case of a model with a single object, the object is reduced to {}. In the case of a collection, it is reduced to [].
   *
   * @return void
   */
   purge(): void;

   /**
   * Check whether the model has any data. This works for models with single objects or collections.
   *
   * @return boolean
   */
   hasData(): boolean;

   /**
   * This lets you check what type of model you are dealing with. If the model holds an object, this returns 'object'. If it holds a collection, it returns 'array'.
   *
   * @return string
   */
   getType(): string;

   /**
   *  Lets you check whether the model is a collection that is iterable or not. If the collection is empty or it is an object, this will return false.
   *
   * @return boolean
   */
   isIterable(): boolean;

   /**
   * Performs a forEach loop equivalent to the array function with context first and index last.
   *
   * @param callback A callback to execute.
   * @return void
   */
   forEach(callback: (context: any, index: number) => any): void;

   /**
   * This method returns whatever data the model holds. This could be an object or an array.
   *
   * @return any Whatever data the model holds.
   */
   getData(): any;

   /**
   *  This method lets you set the value of a property on the model's object. When the holds a single object, this is equivalent to `model.setProp(propertyName, value)`. If the property does not exist on the object, it will be created. If the property already exists, its value will be replaced by the value provided.
   *
   * @param propertyName The property whose value you want to set.
   * @param value The value to set for the property.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   setItemProp(propertyName: string, value: any, doNotPropogate?: boolean): void;

   /**
   *  This method lets you set the value of a property on an object in a model's collection. To do so you must provide an index position for the object in the colleciton. If the property does not exist on the object at that index, it will be created, otherwise its value will be updated to the value provided.
   *
   * @param
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   setItemProp(index: number, propertyName: string, value: any, doNotPropogate?: boolean): void;

   /**
   * This method lets you get the value of the model's object.
   *
   * @param propertyName The property whose value you want to retrieve.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return value The value of the property.
   */
   getItemProp(propertyName: string): any;

   /**
   * This method lets you get the value of a propert from an object at the index position your provided in the model's collection.
   *
   * @param index The index position of the object whose property you want to retrieve.
   * @param propertyName The property whose value you want to retrieve.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return value The value of the property.
   */
   getItemProp(index: number, propertyName: string): any;

   /**
   * This method allows you to delete an item from the model's collection based on the index of the object.
   *
   * @param index A number indicated the zero-based position of the object your wish to delete.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   deleteItemProp(index: number, doNotPropogate?: boolean): void;

   /**
   * This method allows you to delete a property from an item at the designated position in the model's collection.
   *
   * @param index Position of the object in the model's colleciton.
   * @propertyName The name of the property you wish to delete.
   * @param doNotPropogate A boolean to controller change propagation.
   * @return void
   */
   deleteItemProp(index: number, propertyName: string, doNotPropogate?: boolean): void;

   /**
   * Find out when the modle was last changed.
   *
   * @return string A Unix timestamp indicating the last time the model was changed.
   */
   getLastModTime(): string;

   /**
   * This method lets you store the model in Truck's Box for local data persistence. It takes an object of three arguments: { key: "my-key", boxName: "my-data-store" }. The key is used as the key in the data store for retrieving later. The boxName is the name for the data store.
   *
   * @param options And object of the following key/value pairts to box the model.
   * @return void
   */
   box(options: {
      autobox: boolean;
      boxName: string;
      key: string;
      name: string;

   }): void;

   /**
   * This method tells Truck to automatically store any changes to the model in its Box for local data persistence.
   *
   * @return void
   */
   setToAutobox(options: {
      autobox: boolean;
      boxName: string;
      key: string;
      name: string;
   }): void;

   /**
   * This method tests whether the model has been boxed or saved in Truck's local data persistence Box.
   *
   * @return boolean
   */
   isBoxed(): boolean;

   /**
   * This method tests whether the model is set to automatically persist its state in Truck's Box for local data persistence.
   *
   * @return boolean
   */
   isAutoBoxed(): boolean;

   /**
   * Get the last time the model was stored in Truck's Box for local data persistence. 
   *
   * @return string A unix timestamp.
   */
   getLastBoxTime(): string;
 }

 /**
  * Interface for View
  */
interface View {

  /**
   * Render a view with the provided data. If the append true boolean is provided, the data will be rendered and appended to the view.
   *
   * @param data The data to render the view with.
   * @param append A boolean to determine whether to append the rendered data to the view or rerender the view with the full set of data.
   * @return void
   */
  render(data: any, append?: boolean): void;

  /**
   * Delete all of the view's content from the DOM.
   *
   * @return void
   */
  empty(): void;

  /**
   * Reset to 1 the index used by the view when rendering collections.
   *
   * @return void
   */
  resetIndex(): void;

  /**
   * This lets you set the number for the view's index to start from.
   *
   * @param number The number to start the index value from.
   * @return void
   */
  startIndexFrom(number: number): void;

  /**
   * Gets the template the view is currently using.
   *
   * @return string The template used by the view.
   */
  getTemplate(): string

  /**
   * Set a template on the view. If the view already has a template, it will be replaced with this one.
   *
   * @param teplate A string defining a template for the view.
   * @return void
   */
  setTemplate(template: string): void;

  /**
   * Returns the name of the model the view is bound to.
   *
   * @return string
   */
  getModel(): string;

  /**
   * This tells truck what model the view should be rendered with.
   *
   * @param model A model to bind the view to.
   * @return void
   */
  setModel(model: Model): void;

  /**
   * Get the mediator a view is being rendered by if it is bound to a model
   *
   * @return string The mediator associated with the view.
   */
  getMediator(): string;

  /**
   * Check whether the view has been rendered.
   *
   * @return boolean
   */
  isRendered(): boolean;

  /**
   * Check whether the view is empty or not.
   *
   * @return boolean
   */
  isEmpty(): boolean;

  /**
   * This binds a view to a model, which immediately causes the view to be rendered with the model. Using this method, you can change the data a view is using to render.
   *
   * @param model A model to bind the view to.
   * @return void
   */
  bind(model): void;

  /**
   * Unbind a view from its model. After being unboud, the view will remain static.
   *
   * @return void
   */
  unbind(): void;

  /**
   * This method lets you define an event on a view. It takes an objec indicating the element, event and callback to use. If no element is provided, or the word `self` is used, the event is registered on the element itself, otherwise the event is registered as a delegate for the provided element.
   * If an optional true value is provided as the last argument, the event will replace any other events currently registered on the view.
   *
   * @param events An object defining an elemnt, event and callback for the view.
   * @return void
   */
  addEvent(events: { element: string | Element | DOMStack, event: string, callback: (event?: Event) => void }, replace?: boolean): void;

  /**
   * Remove all events form the view.
   *
   * @return void
   */
  off(): void;

  /**
   * This
   *
   * @param event The event to remove.
   * @param element The element the event is bound to.
   * @param callback The named callback the event fires.
   * @return void
   */
  off(event: string, element?: string | Element, callback?: Function): void;

  /**
   * Get a reference to the element the view is registered to.
   *
   * @return parent The parent element the view is bound to.
   */
  getElement(): Truck;

  /**
   *
   *
   * @param element 
   * @return void
   */
  setElement(element: string | Element | DOMStack): void;

  /**
   * Tell a view to stop responding to render commands. Even though the view may be bound to a model, after it has been stopped, it will not respond to changes in the model. You can make the model respond again to model changes by using the `restart` method.
   *
   * @return void
   */
  stop(): void;

  /**
   * Tell a view to stop responding to render commands after rendering the designated number of times. You can make the model respond again to model changes by using the `restart` method.
   *
   * @return void
   */
  stop(after: number): void;

  /**
   * Check whether a view has been stopped.
   *
   * @return boolean
   */
  isStopped(): boolean;

  /**
   * Tell a stopped view that it can begin responding to render commands again.
   *
   * @return void
   */
  restart(): void;

  /**
   * Tell a stopped view that it can begin responding to render commands after the designated time in seconds.
   *
   * @param seconds The number of seconds before the view will respond to render commands.
   * @return void
   */
  restart(seconds: number): void;

  /**
   * Find out how long before a stoppped view will restart.
   *
   * @return string
   */
  getRestartTime(): string;

  /**
   * Tell a stopped view to render after the designated number of seconds.
   *
   * @param seconds The number of seconds after which the view will render itself.
   * @return void
   */
  renderViewAfter(seconds: number): void;

  /**
   * Use this method to set a loop for rendering the view on a regular cycle of seconds. You can exit the render loop using the method `stopRenderViewEvery()`.
   *
   * @param seconds The number of seconds the view should repeatedly render.
   * @return void
   */
  renderViewEvery(seconds: number): void;

  /**
   * Tell a view that was set to render on a loop to exit it.
   *
   * @return void
   */
  stopRenderViewEvery(): void;

  /**
   * Find out when the view was last rendered.
   *
   * @return string A Unix timestamp
   */
  getLastRenderTime(): string;

  /**
   * Tell the view to escape all HTML elements. By default Truck does not escpate HTML code. You can also set the view up to automatically escape HTML at initialization time with the property `escapeHTML` set to true.
   *
   * @return void
   */
  escapeHTML(): void;

  /**
   * Find out whether a view is escaping HTML when it renders data.
   *
   * @return boolean
   */
  isEscapingHTML(): boolean;

  /**
   * Find out how many times the view has rendered.
   *
   * @return number
   */
  getRenderCount(): number;
}

/**
 * Interface for Router
 */
interface Router {

  /**
   * Setup up a route. This takes two arguments: the route and a callback to execute when the route is dispatched. You can provide an ID for a route using a colon: route: 'myroute:UniqueID'.
   *
   * @return void
   */
  addRoute(options: [{
    route: string,
    callback: (...args) => void
  }]): void;

  /**
   * Get the current full route of the app. This returns a string in this format: "my/route/here:someID". IDs are indicated by a colon.
   *
   * @return string The current full route. Routes are separated by forward slashes '/'.
   */
  getFullRoute(): void;

  /**
   * Get an array of the current routes.
   *
   * @return stack An array of the current routes.
   */
  getRoutesStack(): void;

  /**
   * Get the current route. This will be identical to the current screen, etc.
   *
   * @return string The current route.
   */
  getCurrentLoc(): void;

  /**
   * This method lets you dispatch a route. You can include an ID for the router to handle by putting it after a color: $.dispatch('myRoute:UniqueID').
   *
   * @param reoute A string defining the route to disptach.
   * @return void
   */
  dispatch(route: string): void;

  /**
   * Push a route to the $.TruckRoutes model. This method lets you control what route is getting pushed to the navigation stack. When pushing a route you also need to make sure that its screen is current.
   *
   * @param route A string defining a route to push to the $.TruckRoutes model.
   * @return void
   */
  pushRoute(route): void;

  /**
   * Pop off the last route from the $.TruckRoutes model. If you do this, you'll need to update the state of the affected screens, changing their current status, etc.
   *
   * @return The last item from the $.TruckRoutes model.
   */
  popRoute(): void;

  /**
   * Insert a route at the beginning of the $.TruckRoutes model. If you do this, you'll need to update the state of the affected screens, changing their current status, etc.
   *
   * @return void
   */
  unshiftRoute(): void;

  /**
   * Remove a route from the beginning of the $.TruckRoutes model. If you do this, you'll need to update the state of the affected screens, changing their current status, etc.
   *
   * @return route A string defining the removed route.
   */
  shiftRoute(): void;

  /**
   * This method lets you insert a route at the specified location in the $.TruckRoutes model.
   *
   * @param position The numeric position at which to insert the route.
   * @param route The name for the route.
   * @return void
   */
  insert(position: number, route: string): void;

  /**
   * This method lets you get a route's value based on its index in the  $.TruckRoutes model. It does not effect the content of the $.TruckRoutes model.
   *
   * @return route The route represented by the index number.
   */
  eq(number: number): string;

  /**
   * This method lets you find out what the index value is of a route. If the route is not found, it will return -1. If the route has an ID associated with it and you do not include, it will not be found.
   *
   * @return number
   */
  indexOf(route: string): number;

  /**
   * This method lets you delete a route from the $.TruckRoutes model, even if it has an id attached to it.
   *
   * @param route The route to delete.
   * @return void
   */
  delete(route: string): void;

  /**
   * This method lets you delete a route from the $.TruckRoutes model, but only if the route exactly matches it, meaning it has no id attached to it.
   *
   * @param route The route to delete.
   * @param baseRouteOnly A boolean true indicates whether a route will be deleted with its id or not.
   * @return void
   */
  delete(route: string, baseRouteOnly: boolean): void;
}


/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   *
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @return Promise A Promise for the completion of which ever callback is executed.
   * @return Promise A new Promise
   */
  then<TResult>(onfulfilled?: (value: T) => TResult | Promise<TResult>, onrejected?: (reason: any) => TResult | Promise<TResult>): Promise<TResult>;

  /**
   * Attaches a callback for only the rejection of the Promise.
   *
   * @param onrejected The callback to execute when the Promise is rejected.
   * @return Promise A Promise for the completion of the callback.
   * @return Promise A new Promise
   */
  catch(onrejected?: (reason: any) => T | Promise<T>): Promise<T>;
}

interface PromiseConstructor {

  /**
   * Creates a new Promise.
   *
   * @param init A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error.
   * @return Promise A new Proimise
   */
  new <T>(init: (resolve: (value?: T | Promise<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

  <T>(init: (resolve: (value?: T | Promise<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
   *
   * @param values An array of Promises.
   * @return Promise A new Promise.
   */
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;

  /**
   * Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
   *
   * @param values An array of values.
   * @returns A new Promise.
   */
  all(values: Promise<void>[]): Promise<void>;

  /**
   * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved or rejected.
   *
   * @param values An array of Promises.
   * @return Promise A new Promise.
   */
  race<T>(values: (T | Promise<T>)[]): Promise<T>;

  /**
   * Creates a new rejected promise for the provided reason.
   *
   * @param reason The reason the promise was rejected.
   * @return Promise A new rejected Promise.
   */
  reject(reason: any): Promise<void>;

  /**
   * Creates a new rejected promise for the provided reason.
   *
   * @param reason The reason the promise was rejected.
   * @return void A Promise is rejected.
   */
  reject<T>(reason: any): Promise<T>;

  /**
   * Creates a new resolved promise for the provided value.
   *
   * @param value A promise.
   * @return Promise A promise whose internal state matches the provided promise.
   */
  resolve<T>(value: T | Promise<T>): Promise<T>;

  /**
   * Creates a new resolved promise.
   *
   * @return Promise A resolved promise.
   */
  resolve(): Promise<void>;
}

/**
 * Ambient declarations:
 */
declare var Promise: PromiseConstructor;
declare type ByteString = string;
declare type USVString = string;
declare type DOMString = string;
declare type OpenEndedDictionary = Object;


/**
 * Interface for fetch API.
 *
 * @param input A string representing a valid url.
 * @param init An object literal of key value pairs to set method, headers, body, credentials or cache.
 * @return Promise.
 */
interface fetch {
  (input: string,
    init?: {
      method?: string;
      headers?: {};
      body?: any;
      mode?: {
        cors: string;
        "no-cors": string;
        "same-origin": string;
      };
      credentials?: {
        omit: string;
        "same-origin": string;
        include: string;
      };
      cache?: {
        default: string;
        "no-store": string;
        reload: string;
        "no-cache": string;
        "force-cache": string;
        "only-if-cached": string;
      };
      timeout?: number;
    }): Promise<any>;
}

interface XMLHttpRequest {
  responseURL: string;
}

/**
 * Headers Interface. This defines the methods exposed by the Headers object.
 */
interface Headers {
  (headers?: any): void;
  append(name: string, value: string): void;
  delete(name: string): any;
  get(name: string): any;
  getAll(name: string): any;
  has(name: string): any;
  set(name: string, value: string): any;
  forEach(callback: Function, thisArg: any): any;
}

interface decode {
  (body: any): FormData;
}

/**
 * Request Interface. This defines the properties and methods exposed by the Request object.
 */
interface Request {
  (input: {
    url: string;
    request: Request;
  }, init: Object): Request;
  clone(): Request;
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  formData(): FormData;
  json(): JSON;
  text(): string;

  method: string;
  url: string;
  heaers: Headers;
  context: any;
  referrer: any;
  mode: string;
  credentials: any;
  cache: string;
  bodyUsed: boolean;
}

interface URLSearchParams {
  (): URLSearchParams;
}

/**
 * Resonse Interface. This defines the properties and methods exposed by the Response object.
 */
interface Response {
  (body?: {
    blob: Blob;
    bormData: FormData;
    urlParams: URLSearchParams;
    url: string;
  },
    init?: {
      status?: string | number;
      statusText?: string;
      headers: Headers;
    }): Response;
  clone(): Response;
  redirect(): Response;
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  formData(): FormData;
  json(): JSON;
  text(): string;

  type: string;
  url: string;
  useFinalURL: boolean;
  ok: boolean;
  statusText: string;
  headers: Headers;
  bodyUsed: boolean;
}
interface TruckStatic {
  /**
   * This method adjust the centering of the title in the navigation bar for iOS. It leaves the title alone on Android and Windows. When elements on either side of the title are taking up too much space, the title will be adjusted to the opposite side where space is available.
   */
  AdjustNavbarLayout(screen: string | Element | DOMStack): void;
  
  /**
   * This method lets you direct the user to the designated screen. The screen is the id value of the screen minus the `#`.
   */
  GoToScreen(sceen: string): void;
  
  /**
   * This method returns the user to the previous screen. It gets executed automatically if the current navigation bar has a button with the class `backTo`.
   */
  GoBack(): void;
  
  /**
   * This method lets you direct the user back to a previous screen outside the path the user took to the current screen. You provide the destination screen id without the `#`. Truck will automaticaly slice the $.TruckRoutes stack to contain the correct navigation history after this is preformed.
   */
  GoBackToScreen(screen: string): void;
  
  /**
   * This method lets you create a tab bar interface for you app. On iOS the tab bar expects icons. You can tell Truck to also display icons on Android and Window. By default they do not use icons in their tab bars.
   */
  TabBar: Tabbar;
  
  /**
   * This method lets you create a slide out menu. After running this function, you can populate the slide out with menu items by using the `populate` method.
   */
  SlideOut: {
    (): {
      /**
       * This method lets you populate the slide out menu with navigation items. It takes an array of key value pairs: [{music: 'Music'},{food: 'Food'}].
       * The label should indicate a screen id. the label value will be displayed as the item name.
       */
      populate(options: [{
        label: string;
      }]): void;
    }
  }
  
  /**
   * This method lets you create an editable list. That means the user can delete items or move items or both. You can bind the list to a model so that user changes are pushed to the mode, and you can box the model so that the user choices are persisted in the local data store.
   */
  EditList(options: {
    editLabel?: string;
    doneLabel?: string;
    deleteLabel?: string;
    cancelLabel?: string;
    callback?: (...args) => any;
    deletable?: boolean;
    movable?: boolean;
    model?: Model;
    modelProp?: string;
    view: View;
  });
  
  /**
   * This method lets you set up validation and JSONification of a form. It takes an array of key value pairs to define the validation to perform. This takes an element to validate, the type of validation to perform and a callback to execute if the validation fails.
   */
  Form(options: [
    {
      element: string | Element | DOMStack ,
      type: string;
      callback: Function;
    }
  ]): {
  
  /**
   * Get an object of all errors from the form.
   */
    getErrors(): any[];
  
  /**
   * Check whether there were any validation errors.
   */
    error(): boolean;
  
  /**
   * Get the form's data as a JSON object.
   */
    get(): JSON;
  };
  
  /**
   * 
   */
  SelectList(options: {
    element: string | Element | DOMStack,
    selected?: number,
    name?: string,
    callback?: Function,
    model?: Model

  }): {
  
  /**
   * Get the current SelectList selection. This is an object with an index number and value.
   */
    getSelection(): {
      index: number;
      value: any;
    };
  }
  
  /**
   * 
   */
  MultiSelectList(options: {
    element: string | Element | DOMStack,
    selected?: number[],
    name?: string,
    callback?: Function,
    model?: Model
  }): {
  
  /**
   * Get the current selections on the Multi-Select List. This returns an array of objects with index numbers and values.
   */
    getSelection(): [{
      index: number,
      value: any;
    }];
  };
  
  /**
   * This method setups up a switch. It takes an element, a possible name for the switch's checkbox, a value for the switch, a checked value (true or false) and a two callbacks: one for when the switch is turned on and another for when it is turned off.
   */
  Switch(options: {
    element: string | Element | DOMStack,
    name: string,
    value: any,
    checked: boolean,
    onCallback: Function;
    offCallback: Function;
  }): {
  /**
   * Get the current state of the switch. This returns an object with the checked state and value of the switch.
   */
    getValue(): {
      checked: boolean;
      value: any;
    }
  }
  
  /**
   * This method allows you to throw up a mask covering the entire screen. You can provide an opacity value to control the mask's opacity to your liking.
   */
  Block(opacity: string): void;
  
  /**
   * This removes any currently displayed mask.
   */
  Unblock(): void;
  
  /**
   * This method lets you create a popup. You can provide an id, a title, a message, a value for the cancel button, a value for the continue button, a width, a callback to execute when the continue button is tapped and control whether the popup is completely empty. If you want only one button, leave off the cancel button. The continue button is required for the popup to work properly.
   */
  Popup(options: {
    id?: string;
    title?: string;
    message?: string;
    cancelButton?: string;
    continueButton?: string;
    width?: string;
    callback?: Function;
    empty?: boolean;
  });
  
  /**
   * This method lets you correctly center a popup on the screen. 
   */
  CenterPopup(): void;
  
  /**
   * This method lets you create a segmented button collection. It expects an element in which to insert the buttons. You can provide labels for the buttons, a default selected button and a callback to execute when the user clicks a button.
   */
  Segmented(options: {
    element: string;
    labels: any[];
    selected: number;
    callback: Function;
  }): {
  /**
   * Get the currently selected button. This reutrns a zero-based number.
   */
    getSelection(): number;
  };
  
  /**
   * Create a sheet. You can control whether the sheet slides down from the top or up from the bottom with the `slideDown` property. If true, it slides down from the top, otherwise it slides up form the bottom. You can also control whether the handle appears or not with the handle property set to false or ture. The default is true. You can provide a background color in hex format using the `background` property.
   */
  Sheet(options: {
    id?: string;
    background?: string;
    handle?: boolean | string;
    slideDown?: boolean | string;
  }): void;
  
  /**
   * Show the sheet whose id you provide.
   */
  ShowSheet(id: string): void;
  
  /**
   * Hide the sheet whose id you provide.
   */
  HideSheet(id: string): void;
  
  /**
   * This method lets you initialize a paging widgets. Each page is an article tag with the class `paging` inside the section tag of a screen.
   */
  Paging(): void;
  
  /**
   * This method lets you set up a stepper control. This takes an element to convert into a stepper, a min and max value and whatever default value you want it to have at load time.
   */
  Stepper(options: {
    element: string | Element | DOMStack;
    min: number;
    max: number;
    defaultValue: any;
  }): {
  /**
   * This method lets you get the curren value of the stepper.
   */
    getValue(): any;
  }
  
  /**
   * This method lets you set up a popover widget. It takes an id, a title, and a callback to execute when the user taps on items. If no title is provided, it will be empty.
   */
  Popover(options: {
    id: string;
    callback: Function;
    title: string;
  }): void;
  
  /**
   * This method aligns the popover so that it is positioned relative to the element that popped it up.
   */
  AlignPopover(): void;
  
  /**
   * This method closes any currently displayed popover.
   */
  ClosePopover(): void;
}
interface Truck {
  
  /**
   * When executed on a popup, this method wil display it.
   */
  ShowPopup(): void;
  
  /**
   * When executed on a popup, this method will close it.
   */
  ClosePopup(): void;
  
  /**
   * This method will center any element it is execute on inside its parent container.
   */
  Center(position?: string): void;
  
  /**
   * This method lets you create a busy widget. This varies in shape and animation type depending on the operating system. You can provide a size and color and whether it should be absolutely positioned or not.
   */
  Busy(options: {
    size?: number;
    color?: string;
    position?: boolean;
  }): void;
}

interface Tabbar {
  (options: {
    id?: string;
    labels: string[];
    icons?: string[];
    selected?: number;
    showIcons?: boolean;
  }): Tabbar;
  
  /**
   * This method lets you get the currently selected tab. This is a zero-based number.
   */
  getSelectedTab(): Truck;
  
  /**
   * Get the screen for the currently selected tab. This returns the screen's id.
   */
  getSelectedScreen(): Truck;
  
  /**
   * Set a tab as current. Doing so will also display its corresponding screen.
   */
  setSelectedTab(position: number): void;
}
/**
 * Ambient declarations:
 */
declare var DOMStack: any;
declare var TruckJS: TruckStatic;
declare var $: TruckStatic;
declare var fetch: fetch;
