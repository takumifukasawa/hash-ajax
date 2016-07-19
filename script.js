(function($) {

  'use strict';

  /////////////////////////////////////////////////////////////////
  // hash with ajax
  /////////////////////////////////////////////////////////////////

  var HashAjax = function(opts) {
    var opts = opts || {};

    this.wrapperSelector  = opts.wrapperSelector || 'body';
    this.contentSelector  = opts.contentSelector || '.content';
    this.triggerSelector  = opts.triggerSelector || '.link';
    this.initialize();
  };

  HashAjax.prototype.initialize = function() {
    this.$wrapper = $(this.wrapperSelector);
    
    this.initEvent();
  };

  HashAjax.prototype.initEvent = function() {
    var _self = this;
   
    window.onhashchange = function() {
      var target = _self.getRequestPageName();
      console.log('request page is ' + target);
 
      if(!target) return;

      // とりあえずsettimeoutで遅らせる
      _self.$wrapper.addClass('is-hide');
      setTimeout(function() {
        _self.$wrapper.empty();
        _self.fireAjax(target);
      }, 600);
    };
  };

  HashAjax.prototype.getRequestPageName = function() {
    var hash = location.hash;
    var name = hash.split('#')[1];
    return name ? name + '.html' : false;
  };

  HashAjax.prototype.fireAjax = function(target) {
    var _self = this;

    $.ajax({
      type: 'GET',
      url: target,
      dataType: 'html',
      success: function(data) {
        console.log('ajax success!');
        var $outputHtml = $($.parseHTML(data));
        var $contents = $outputHtml.filter(_self.contentSelector);
        _self.$wrapper.append($contents);
        _self.$wrapper.removeClass('is-hide');
      }
    });
  };

  new HashAjax();

})(jQuery);
