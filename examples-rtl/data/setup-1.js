$(function() {

  // Options for Tab Bar:
  //=====================
  var opts = {
     icons: ["music", "pictures", "docs", "dictionary", "top_rated"],
     labels: ["موسيقى", "الصور", "الوثائق", "المعاني", "المفضل"],
     selected: 1,
     screens: ['music', 'pictures', 'documents', 'dictionary', 'favorites'],
     showIcons: false
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
  var dictionaryView = $.View({
    element: '#dictionaryList',
    variable: 'dictionary'
  });
  dictionaryView.render(dictionary);

  // Favorites View:
  //====================
  favoritesView = $.View({
    element: '#favoritesList'
  });
  favoritesView.render(favorites);
  
});