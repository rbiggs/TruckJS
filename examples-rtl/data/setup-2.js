$(function() {

  // Options for Tab Bar:
  //=====================
  var opts = {
     icons: ["music", "pictures", "docs", "dictionary", "more"],
     labels: ["موسيقى", "الصور", "الوثائق", "المعاني", "أكثر"],
     selected: 1,
     screens: ['music', 'pictures', 'documents', 'dictionary', 'fruits']
  };
  
  // Init Tab Bar:
  //==============
  $.WobbaTabbar = $.TabBar(opts);

  // Music View:
  //============
  var musicView = $.View({
    element: '#musicList',
    variable: 'music'
  });
  musicView.render(music);

  // Image Grid View:
  //=================
  var imageGridView = $.View({
    element: '#gridOfImages',
    variable: 'image'
  });
  imageGridView.render(imageCollection);

  // Docs View:
  //===============
  var docsView = $.View({
    element: '#docsList',
    variable: 'doc'
  });
  docsView.render(docs);

  // Recipes View:
  //==================
  var recipesView = $.View({
    element: '#dictionaryList',
    variable: 'dictionary'
  });
  recipesView.render(dictionary);

  // Favorites View:
  //====================
  var fruitsView = $.View({
    element: '#fruitsList',
    variable: 'fruit'
  });
  fruitsView.render(fruits);
  

});