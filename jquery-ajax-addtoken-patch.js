/**
 * Created by marcinkrysiak on 23/04/15.
 */
 
 var originalAjax = jQuery.ajax;

jQuery.extend({

  originalAjax: originalAjax,
  tokenUrl: 'getToken', //in case you want to request token from server and add it to the header prior to each request
  fixedToken: '', //in case if you have fixed token and do not need to request from server every time. Leave empty string, null or false to deactivate or put some string value to make it active and ignore server requesting for token
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
  
    if ( requestsWithToken.indexOf( options.type.toUpperCase() ) !== -1 && !this.fixedToken ) {
     
      this.originalAjax({
        type: "GET",
        url: tokenUrl
      }).done( function(data) {
        options.headers = options.headers || {};
        options.headers[this.tokenHeader] = data[tokenDataField];
  
        self.originalAjax(url, options)
         .done( function(data) {deferObj.resolve(data)})
         .fail( function(data) {deferObj.reject(data)});
      });

    } else {
     
     if ( fixedToken ) {
      options.headers = options.headers || {};
      options.headers[this.tokenHeader] = fixedToken;
     }
     
     self.originalAjax(url, options)
      .done( function(data) {deferObj.resolve(data)})
      .fail( function(data) {deferObj.reject(data)});
    }

    return deferObj.promise();
  }
});


