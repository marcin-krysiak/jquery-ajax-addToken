## jquery-ajax-addToken

* Include this in your project to add security token to your ajax requests
* Retrieves token from server and adds to your calls at the global layer.

The scenario is when the server has a get service providing you with one time token that you should include with your next request (usually some timeout is set as well). Then server checks the header of the next request if it's including the token. 

This should give a solution for hijacking get requests problem and for adding additional security to any other request types.

# To use just set up folowing vaiables to your own needs:  
* tokenUrl: 'getToken' - url to the get token web service
* requestsWithToken: ['GET', 'PUT', 'POST', 'DELETE'] - array of requests types where you want to include the token
* tokenDataField: 'ownToken' - server response token field. In this case the example server response body would be {"ownToken": "SDFSDFSDfwerwefs2341!±!@£"}
* tokenHeader: 'Own-Token' - your own request header containing the token string

please let me know if you have any issues or need additional comment on this code.
