/**
 * Created by marcinkrysiak on 23/04/15.
 */
 
 var originalAjax = jQuery.ajax;

jQuery.extend({

  originalAjax: originalAjax,
  tokenUrl: 'getToken', //in case you want to request token from server and add it to the header prior to each request
  fixedToken: '', //in case if you have fixed token and do not need to request from server every time. Leave empty string, null or false to deactivate or put some string value to make it active and ignore server requesting for token
  requestsWithToken: ['GET', 'PUT', 'POST', 'DELETE'], //define here to which type of request you want to add token
  tokenDataField: 'ownToken', //if you requesting token fron server each time define here what data field in the response body contains the token
  tokenHeader: 'Own-Token', //define what would be the name containing the token in the final request header
  
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
  
    //check if for the request type we want to add token and if its not fixed token
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
     
     //if the token is fixed just add it
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


