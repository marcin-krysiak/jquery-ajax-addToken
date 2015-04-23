/**
 * Created by marcinkrysiak on 23/04/15.
 */
 
 var originalAjax = jQuery.ajax;

jQuery.extend({

  originalAjax: originalAjax,
  tokenUrl: 'getToken',
  requestsWithToken: ['GET', 'PUT', 'POST', 'DELETE'],
  tokenDataField: 'ownToken',
  tokenHeader: 'Own-Token',
  
  ajax: function(url, options) {
    var deferObj = jQuery.Deferred(),
      self = this;

    /***** THIS IS COMMING FROM ORIGINAL AJAX ******/
        // If url is an object, simulate pre-1.5 signature
        if ( typeof url === "object" ) {
            options = url;
            url = undefined;
        }
  
        // Force options to be an object
        options = options || {};
    /***********************************************/
  
    if ( options.url === this.tokenUrl ) && requestsWithToken.indexOf( options.type.toUpperCase() ) !== -1 ) {
  
      this.originalAjax({
        type: "GET",
        url: 'token'
      }).done( function(data) {
        options.headers = options.headers || {};
        options.headers[this.tokenHeader] = data[tokenDataField];
  
        self.originalAjax(url, options)
          .done( function(data) {deferObj.resolve(data)})
          .fail( function(data) {deferObj.reject(data)});
      });

    } else {
      self.originalAjax(url, options)
        .done( function(data) {deferObj.resolve(data)})
        .fail( function(data) {deferObj.reject(data)});
    }

    return deferObj.promise();
  }
});


