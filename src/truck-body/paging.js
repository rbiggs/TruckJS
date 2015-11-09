// Truck Body - Paging
(function() {
  "use strict";
  $.extend({
    Paging: function(options) {
      if (!options || !options.element) return;
      var screen = $(options.element);
      var pager = '<div class="pager">\n\
      <button class="previous">\n\
        <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M19.7729197,3 L4.25431067,17.8699971 L19.7729196,32.9558941" id="page-previous"></path></g></g></svg>\n\
      </button>\n\
      <button class="next">\n\
        <svg width="24px" height="36px" viewBox="0 0 24 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pagination-icons" stroke="#979797"><path d="M4.08862955,3.06871359 L20.0261609,18.0528447 L4.08862956,32.9999994" id="page-next"></path></g></g></svg>\n\
      </button>\n\
      </div>';

      $(screen).find('nav').append(pager);

      var currentSection = $(screen).find('section');

      var articles = function() {
        return currentSection.find('article').length;
      };
      $.AdjustNavbarLayout(screen);

      // Handle paging forward:
      var pageForward = function($this) {
        if (articles() < 2) return;
        $this.prev().removeClass('selected');
        $this.addClass('selected');
        var currentArticle;
        if ($this[0].classList.contains('disabled')) return;
        currentArticle = currentSection.find('article.current');
        if (currentArticle.index() === articles() - 1) {
          // start again!
          currentArticle.removeClass('current').addClass('next');
          currentArticle.siblings().removeClass('previous').addClass('next');
          currentSection.find('article').eq(0).addClass('current').removeClass('previous').removeClass('next');
        } else {
          currentArticle.removeClass('current').addClass('previous');
          currentArticle.next().removeClass('next').addClass('current');
        }
        setTimeout(function() {
          $this.removeClass('selected');
        }, 250);
      };

      var pageBack = function($this) {
        if (articles() === 1) return;
        $this.next().removeClass('selected');
        $this.addClass('selected');
        var currentArticle;
        currentArticle = currentSection.find('article.current');

        if (currentArticle.index() === 0) {
          currentArticle.removeClass('current');
          currentArticle.siblings().eq(-1).addClass('current').removeClass('next');
          currentArticle.siblings().eq(-1).siblings().removeClass('next').addClass('previous');
        } else {
          currentArticle.removeClass('current').addClass('next');
          currentArticle.prev().removeClass('previous').addClass('current');
        }
        setTimeout(function() {
          $this.removeClass('selected');
        }, 250);
      };

      $('.pager').on($.eventStart, 'button:last-of-type', function() {
        pageForward($(this));
      });
      $('.pager').on($.eventStart, 'button:first-of-type', function() {
        pageBack($(this));
      });

    }
  });
})();