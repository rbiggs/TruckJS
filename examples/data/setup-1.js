$(function() {

  // Options for Tab Bar:
  //=====================
  var opts = {
     icons: ["music", "pictures", "docs", "recipes", "top_rated"],
     labels: ["Music", "Pictures", "Docs", "Recipes", "Favs"],
     selected: 1,
     screens: ['music', 'pictures', 'documents', 'recipes', 'favorites'],
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
  var recipesView = $.View({
    element: '#recipesList',
    variable: 'recipe'
  });
  recipesView.render(recipes);

  // Favorites View:
  //====================
  favoritesView = $.View({
    element: '#favoritesList'
  });
  favoritesView.render(favorites);
  
});