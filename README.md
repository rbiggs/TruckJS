#Truck

##An MVC Framework for Mobile Web Apps

Truck provides you with tools for creating amazing Web apps for mobile devices. Using themes, it gives you the native look and feel of Android, iOS and Windows Phone from one code base. This is a true write-once, deploy-everywhere framework.

Truck's design was inspired by the mechanics of trucks. Think of your app like a truck. All trucks share certain structures: a fuel tank, an engine and a body. Data is your app's fuel. Truck's model is the fule tank with carburetor, injector, etc. It holds the app's fuel and makes it available for the app to consume. Truck's mediators is like the engine. You start it, stop it, restart it, see how many cycles it's run, or kill it. Killing a mediator is a final act. Truck's view is the body providing physical structure and interactive parts. It's the part of your app the user sees.

Truck has a standalone DOM library called Wheels, which is a light version of jQuery. It gives you 80% of the functionality of jQuery. Functions and properties that were esoteric or rarely used were left out. It accomplishes this in under 1,800 lines of code, compared to jQuery's 9,000 plus lines of code. What it lacks from jQuery's API, it makes up for with Models, Mediators, Views, automated data binding, plugins, Promises and Fetch. Truck reduces the amount of code you have to write to get things done. 

To learn more about TruckJS, please visit the [TruckJS website](http://truckjs.io).

##Getting Started

Everything you need is in the folder `dist`. The sub-folder `styles` holds the themes for Android, iOS and Windows.

If you want to, you can build Truck from the command line. This uses gulp.

###Setting up to build

First you need to install the dependencies:

```
npm install
```

If you're on a Mac, you'll need to prefix that with `sudo` and enter you password.

###Build Options

If you just run `gulp` this will build the default.

There are four build options:

1. The complete package
2. Just the selector engine
3. Just the MVC components
4. Everyting except the selector engine

These cover four uses cases:

1. You want the complete package.
  
  run: `gulp`
2. You just want a small and future-facing DOM library as an alternative to jQuery.
  
  run `gulp --wheels`
3. You don't care about the widgets, etc. You just want the MVC parts. You'll be using this with jQuery. You might want to make a desktop web app instead of mobile.
  
  run: `gulp --mvc`
4. You'd rather use jQuery because, well, we're not really sure why. But you can. This needs jQuery to make the other parts work.
  
  run `gulp --engine`

In fact, you can load jQuery before loading the default build of jQuery and Truck will use jQuery instead of its own DOM library.



###DOM Traversal and Modification
Truck Engine has the following methods:

- $(selector)
- $(function() { 
    \\\ Your code here
  });
- $.extend()
- $.fn.extend()
- $.noop()
- $.html()
- $.each()
- $.type()
- $.camelize()
- $.deCamelize()
- $.capitalize()
- $.w()
- $(selector).find()
- $(selector).is()
- $(selector).not()
- $(selector).has()
- $(selector).prev()
- $(selector).prevAll()
- $(selector).next()
- $(selector).nextAll()
- $(selector).first()
- $(selector).last()
- $(selector).index()
- $(selector).eq()
- $(selector).children()
- $(selector).siblings()
- $(selector).parent()
- $(selector).closest()
- $(selector).css()
- $(selector).width()
- $(selector).height()
- $(selector).before()
- $(selector).after()
- $(selector).prepend()
- $(element).prependTo()
- $(selector).append(selector)
- $(element).appendTo(selector)
- $(selector).clone()
- $(selector).wrap()
- $(selector).unwrap()
- $(selector).replace()
- $(selector).offset()
- $(selector).position()
- $(selector).empty()
- $(selector).html()
- $(selector).text()
- $(selector).remove()
- $(selector).addClass()
- $(selector).hasClass()
- $(selector).removeClass()
- $(selector).toggleClass()
- $(selector).attr()
- $(selector).removeAttr()
- $(selector).prop()
- $(selector).removeProp()
- $(selector).disable()
- $(selector).enable()
- $(selector).val()
- $(selector).data()
- $(selector).removeData()
- $(selector).on()
- $(selector).off()
- $(selector).trigger()
- $(selector).hide()
- $(selector).show()

Truck Engine also has the following generic element collection functions:
  
- $(selector).push()
- $(selector).pop()
- $(selector).unshift()
- $(selector).shift()
- $(selector).size()
- $(selector).each()
- $(selector).forEach()
- $(selector).slice()
- $(selector).splice()
- $(selector).sort()
- $(selector).sortBy()
- $(selector).filter()
- $(selector).concat()
- $(selector).reverse()
- $(selector).indexOf()
- $(selector).some()
- $(selector).every()
- $(selector).unique()
- $(selector).getData()
- $(selector).type()
- $(selector).purge()

Truck has a number of components to help you implement MVC patterns in your code. The following components are available:

- Gestures
- Stack
- Model
- Mediator
- View
- Promises
- Fetch
- Data Formatters
- Data Validators


###Gestures
Besides the basic desktop events, Truck also supports the following touch gestures:
- tap
- doubletap
- longtap
- swipe
- swiperight
- swipeleft
- swipeup
- swipedown

###Stack
The Stack is the basis of everything in Truck. It uses stack of various flavors to create data abstractions for most of its functionality. You can use a stack to store any kind of repetitive data. Stacks store their data in a private cache that is only accessible with the stack's accessor methods. These are:

```
var myStack = $.Stack();
```
    
- myStack.size()
- myStack.push()
- myStack.pop()
- myStack.eq()
- myStack.forEach()
- myStack.each()
- myStack.shift()
- myStack.unshift()
- myStack.slice()
- myStack.splice()
- myStack.sort()
- myStack.sortBy()
- myStack.filter()
- myStack.map()
- myStack.join()
- myStack.concat()
- myStack.reverse()
- myStack.indexOf()
- myStack.every()
- myStack.some()
- myStack.unique()
- myStack.purge()
- myStack.getData()

###Model
Truck's Model is helps you manage your data. It can accomodate a object graph with properties, or a collection of objects. Models can propagate their changes to the system using their handles. These are used by controllers to manage the changes and to possibly update the view. Like Stacks, Models store their data in a private cache and expose it to you with the following methods:

```
var myModel = $.Model();
```

- myModel.size()
- myModel.eq()
- myModel.setProp()
- myModel.setObject()
- myModel.push()
- myModel.pop()
- myModel.unshift()
- myModel.shift()
- myModel.concat()
- myModel.insert()
- myModel.unique()
- myModel.index()
- myModel.filter()
- myModel.map()
- myModel.pluck()
- myModel.sort()
- myModel.sort()
- myModel.sortBy()
- myModel.reverse()
- myModel.delete()
- myModel.run()
- myModel.poke()
- myModel.getHandle()
- myModel.purge()
- myModel.hasData()
- myModel.getType()
- myModel.isIterable()
- myModel.forEach()
- myModel.getData()
- myModel.setItemProp()
- myModel.getItemProp()
- myModel.deleteItemProp()
- getLastModTime()
- myModel.box()
- myModel.setToAutobox()
- myModel.isBoxed()
- myModel.isAutoBoxed()
- myModel.getLastBoxTime()

###Mediators
Truck's Mediator is a power tool for managing your model and view. When you implement data binding, Truck automatically creates mediators to update the view when its model changes. Mediators use handles to listen to and communicate with the system. A mediator can share the same handle as a model or another mediator. If you'd rather have complete mediator over the interaction between a view and a model, you can create one mediator to handle the view and another to handle the model. By sharing the same handle, they can separate the concerns of the view and model. Each mediator is identified by a unique token. Mediators have the following methods:

```
var myMtor = $.Mediator()
```
    
- myMtor.init()
- myMtor.run()
- myMtor.stop()
- myMtor.restart()
- myMtor.getCount()
- myMtor.resetCount()
- myMtor.stopCount()
- myMtor.kill()

The following methods let you examine and manage how many times your mediators run:

- myMtor.getCount()
- myMtor.resetCount()
- myMtor.stopCount()

You can pause a mediator and resume it later. You can also tell a mediator to pause after a specified number of runs, or tell it to resume after a specified number of seconds. You can find out how many times a mediator has run, or reset its count to 0.

###View
Truck's View is a magical shape-shifter. You can start out by creating an empty view object, and then gradually add a reference to its parent element, its template, its model and its mediator. Or, if you want the easy way, you can define a view with its parent and model. Truck will grab the template from the parent element and automatically bind the model to the view by creating a mediator in the background. Any changes to the view's model will automatically be reflected in the view. This is illustrated in the examle below.

Truck views are extremely flexible. At any time you can change the template that a view is using, or its model or its mediator. Views can be initialized with the following parameters:

```
myView = $.View({
  element: '#templateTag,
  model: myDataModel,
  variable: 'person',
  events: [
    {
      element: 'li',
      event: 'click',
      callback: function(){
        alert($(this).text());
      };  
    } 
  ]
});
```    
    
 Since no template was provided, Truck will try to parse a template from the element provided, '#templateTag'. This could be like so:
 
```
<ul class="list">
    <script type='text/x-template'>
      <li>${ person.firstName } ${ person.lastName }, age: ${ person.age }</li>
    </script>
</ul>
```

 Because we provided the variable "person" we can use that for the output of our data. This template is assuming we'll have model whose data is an array of objects:
 
```
[
{firstName: "John", lastName: "Doe", age: 24},
{firstName: "Suzy", lastName: "Cue", age: 21},
...
]
```

You can output the current index in a repeater loop using $.view.index in the template. This is not zero-based, it starts at 1:

```
<ul class="list">
    <script type='text/x-template'>
      <li>${ $.view.index }: ${ person.firstName } ${ person.lastName }, age: ${ person.age }</li>
    </script>
</ul>
```    
You can also put the template directly inside the parent element. In that case make sure to give the parent the class "cloak". This will hide the element until it is rendered.

```
<ul class="list cloak">
  <li>${ $.view.index }: ${ person.firstName }</li>
</ul>
```
     
Views have the following methods:

```
myView = $.View();
```

- myView.render()
- myView.empty()
- myView.resetIndex()
- myView.startIndexFrom()
- myView.beginFromIndex()
- myView.getTemplate()
- myView.setTemplate()
- myView.getModel()
- myView.setModel()
- myView.getMediator()
- myView.isRendered()
- myView.isEmpty()
- myView.bind()
- myView.unbind()
- myView.off()
- myView.bind()
- myView.setParent()
- myView.stop()
- myView.isStopped()
- myView.restart()
- myView.getRestartTime()
- myView.renderViewAfter()
- myView.renderViewEvery()
- myView.stopRenderViewEvery()
- myView.getLastRenderTime()
- myView.getViewName()
- myView.escapeHTML()
- myView.isEscapingHTML()
- myView.getRenderCount()

You can define helpers for your views using $.helpers. You create a helper by extending $.helpers:

```
$.defineHelper({
  capitalizeName: function(data) {
    return data.firstName.toUpperCase();
  }
});
```
REMEMBER, view helpers have to be defined before you try to initialize the view, otherwise the view parser will not find the helper and will throw an error. By defined view helpers at the top of your code, you make them available to use in all of your views.

With a helper defined, we can use it like this:

```
<ul class="list cloak">
  <li>${ $.view.index }: ${ $.helpers.capitalizeName(person) }</li>
</ul>
```
     
###Promises
Truck comes with full support for ECMAScript Promsies. It provides a polyfill for browsers that do not yet support them. ES6 promises are quite different from the deferred object/promise implementation in jQuery. Truck's promises are available for you to use, even if you use jQuery with Truck.

- Promise
- Promise.then()
- Promise.resolve()
- Promise.reject()
- Promise.catch()
- Promise.race()
- Promise.all()

Here's an example of a basic promise:

```
var myPromise = new Promise(function(resolve, reject) {
  var value;
  // Do something to get value;
  // ...
  // Then test value to determine how to handle the promise:
  if (value === 'good') {
    resolve(value);
  } else {
    // When you reject the promise,
    // you also get the reason it failed,
    // which you can choose to output if you want:
    reject(reason);
  }
});
```
    
Here's an example of the use of "then":

```
// Create an instance of a promise:
var myPromise = new Promise(function(resolve, reject) {
  // Resolve the promise:
  resolve('Success!');
  // or reject it:
  // reject('Lost in Space!');
});
myPromise.then(function(value) {
  // Success:
  console.log(value);
},
// Opps! There was a problem:
function(reason) {
  console.log(reason);
});
```

And here's an example of then chaining:

```
var myPromise = new Promise(function(resolve, reject) {
  resolve(1);
});
myPromise.then(function(value) {
  console.log(value); // 1
  // Return the value:
  return value + 1;
})
.then(fuction(value) {
  console.log(value) // 2
})
```

###Fetch
Ajax is so last century! The WHATWG (Web Hypertext Application Technology Working Group) has an API called [Fetch](https://fetch.spec.whatwg.org), that, well, fetches data. What's novel is the interface. It's designed to work with ECMAScript promises. Truck uses Fetch in browsers that support it, and falls back to a polyfill for those that don't.

Fetch takes up to two arguments: input and init. Input is a url. If only a url is provided, fetch assumes a GET request. Init is an optional object of key/value pairs. The possible values for init are:

```
init: {
  method: {
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'HEAD'
  },
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding', 'deflate',
    'Accept-Encoding', 'gzip'
    'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
    'Content-Type', 'image/jpeg',
    'Content-Type', 'text/html'
  },
  body: {
    json,
    text,
    formData,
    blob,
    arrayBuffer
  },
  mode:  {
    "cors",
    "no-cors",
    "same-origin",
  },
  credentials: {
    "omit",
    "same-origin",
    "include"
  },
  cache: {
    "default",
    "no-store",
    "reload",
    "no-cache",
    "force-cache",
    "only-if-cached"
  },
  timeout: 10000
}
```

####Get

In this example we fetch from a url, parse the JSON, pass it to a forEach function and append the data to the document.

```
$("#submit").on("click", function(e) {
  fetch('../data/wines.json')
  // Parse response to JSON:
  .then($.json)
  .then(function(json) {
    json.forEach(function(wine) {
      $('#message_ajax').append('<li>' + wine.name + '</li>');
    })
  });
});
```
    
####Get Some HTML

If you want to get some an HTML document or document fragment, do the following:

```
fetch('https://foo.com/fragments/page-1.html')
  .then(function(response) {
    return resonse.text();
  })
  .then(function(result) {
    $('body').append(result);
  });
```

####JSONP
Although not a part of the fetch API, we created an interface for JSONP that matches that of fetch.

Jsonp takes the following parameters, though only the url is required:

```
url,
options: {
  timeout: 5000,
  callbackName: 'myCallbackHandler',
  clear: true/false
}
```

Here's an example of a JSONP request:

```
$("#submit").on("click", function(e) {
  $.jsonp('https://something/is/here?name=chipper', { timeout: 10000 })
  .then($.json)
  .then(function(obj) {
    console.log(obj)
    obj.forEach(function(repo) {
      $('#message_ajax').append("<li>" + repo.name + "</li>");
    });
  })
  .catch(function(error) {
    $('#message_ajax').append("<li>" + error.message + "</li>")
  });
});
```

###Data Formatters
Truck provides a set of functions to format data. You can even use them in a View template. They are the following:

- $.formatNumber()
- $.sum()
- $.currency()
- $.formatTime()
- $.sortDate()
- $.sortNumbers()
- $.sortNumbersDescending()

```
<ul class="list">
    <script type='text/x-template'>
      <li>${ item.name }, ${ item.amount }, price: ${ $.currency(item.price) }</li>
    </script>
</ul>
```

###Data Validators
Truck provides a set of functions to validate common form elements. You can use them on the elements whose values you want to validate. The available functions are:


- $(selector).isNotEmpty()
- $(selector).validateAlphabetic()
- $(selector).validateNumber()
- $(selector).validateAlphaNumeric()
- $(selector).validateUserName()
- $(selector).validateEmail()
- $(selector).validatePhoneNumber()
- $(selector).validateUrl()
- $(selector).validateAge()
- $(selector).validateCheckbox()
- $(selector).validateRadioButtons()
- $(selector).validateSelectBox()
- $(selector).validatePassword()
- $(selector).validateWithRegex()
- $(selector).switch()
- $(selector).selectList()
- $(selector).multiSelectList()

###Plugins
Truck provides the following attribute type methods for writing one liners. Why write a loop to do something when Truck lets you do it in one line?

$(selector).iz(argument).chainADomMethodHere()
$(selector).iznt(argument).chainADomMethodHere()
$(selector).haz(argument).chainADomMethodHere()
$(selector).haznt(argument).chainADomMethodHere()
$(selector).hazAttr(argument).chainADomMethodHere()
$(selector).hazntAttr(argument).chainADomMethodHere()
$(selector).hazClass(argument).chainADomMethodHere()
$(selector).hazntClass(argument).chainADomMethodHere()

Example:

```
$('li').iz('.selected').css({color: 'white', 'background-color': '#666'});
$('li').haznt('span').removeClass('important');
$('li').hazAttr('busy').removeAttr('busy').prepend('Need to update:');
```

And some boolean helpers here:

- $.isEmptyObject()
- $.isInteger()
- $.isFloat

And to let jQuery do what Truck Engine does:

- $.delay()
- $.defer()
- $.require()
- $(selector).disable()
- $(selector).enable()

##Example of Truck in Action

Below we'll have some data. We're going to turn the data into a model. Because the data is in the model, we can get rid of the data be setting it to undefined so that it's memory can be garbage collected:

```
var vips = [
  {firstName: "Steven", lastName: "Hawking", image: 'images/Hawking.jpg',},
  {firstName: "Albert", lastName: "Einstein", image: 'images/Einstein.jpg'},
  {firstName: "Leonardo", lastName: "Da Vinci", image: 'images/DaVinci.jpg'},
  {firstName: "Galileo", lastName: "Galilei", image: 'images/Galileo.jpg'},
  {firstName: "Nicholas", lastName: "Copernicus", image: 'images/Copernicus.jpg'}  
];

var vipModel = $.Model(vips, 'vips-model');
vips = undefined;
```

In our document we will have a view template:

````
<ul class="list cloak" id="vipView">
  <li class='comp'>
    <aside>
      <img data-src='${ data.image }}' alt="${ data.lastName }">
    </aside>
    <div>
      <h3>
        ${ $.view.index }: ${ data.firstName } ${ data.lastName }
      </h3>
    </div>
  </li>
</ul>
```
      
 Truck uses Mustache-style template delimiters. The property "$.view.index" will be rendered as a sequential index value. By default, templates expose their data objects with the keyword "data". Using this, you can access the properties on the object instance. If you want, you can define your template with a custom variable which you can use instead of "data" inside your template.
 
 Notice how we designed an image with the "data-src" attribute. At render time Truck will convert this into an image source attribute. This prevents the browser from loggin an error when it doesn't find the source for an image template.
 
 You can define a template helper to get the full name:
 
```
$.defineHelper({
  fullName(data) {
    return data.lastName.toUpperCase() + ', ' + data.firstName; 
  }
});
```

You can then use the template helper like this:

```
<ul class="list cloak" id="vipView">
  <li class='comp'>
    <aside>
      <img data-src='${ data.image }' alt="${ data.lastName }">
    </aside>
    <div>
      <h3>
        ${ $.helpers.fullName(data) }
      </h3>
    </div>
  </li>
</ul>
```

###Data Binding
Truck lets you bind a view to a model at design time. Provide the model you want to bind to in the definition of the model:

```
var vipView = $.View({
  element: '#vipView',
  model: vipModel
});
```

This will bind the view to the model and immediately render it with the model's current data. If you update that model, that change will propagate to the view:

```
vipModel.push({firstName: 'Neil', lastName: 'deGrasse Tyson', image: 'images/deGrasse'});
vipModel.shift();
```

The view will immediate rerender minus the first vip and with the new one at the end.

###Box
Truck provides Box, a local storage persistence option. The is an abstraction layer that uses IndexedDB, WebSQL and localStorage, depending on which browser the app is loading in. It provides an simple and consistent interface to make it easy for you to store important data locally. 

You can also set a model to automatically store its changes in Box. We call that auto-boxing. 

```
PeopleModel = $.Model([], 'people-model');
app.PeopleModel.box({key: 'auto-boxed-people', autobox: true});
```

When set to auto-box, you need to check at load time to see if Box holds anything for that model. If it does, you extract it and rehydrate your model with that. 

Please see the example: `auto-box.html` in examples.

Editable list can be set to auto-box. This means that when the user taps the `Done` button, the changes get boxed. Then, at load time, you can check Box and reload the list as the user left it, or use that for some configuration/setup of the app.

Please look at `editable-auto-box.html` in examples.

###To learn more about TruckJS, please visit the [TruckJS website](http://
truckjs.io).
