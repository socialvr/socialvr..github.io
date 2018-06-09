/**
 * Read data from various APIs
 * http://stackoverflow.com/questions/9922101/get-json-data-from-external-url-and-display-it-in-a-div-as-plain-text
 */

var getJSON = function(url) {
	  return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('get', url, true);
	    xhr.responseType = 'json';
	    xhr.onload = function() {
	      var status = xhr.status;
	      if (status == 200) {
	        resolve(xhr.response);
	      } else {
	        reject(status);
	      }
	    };
	    xhr.send();
	  });
	};
	
//https://www.googleapis.com/freebase/v1/text/en/bob_dylan?callback=insertReply
//http://www.convrge.co/api/users

getJSON('http://www.convrge.co/api/users').then(function(data) {
	
	var keys = Object.keys(data.playersOnline);
	
	console.log("------------");
	console.log(data);
	//console.log(data.playersOnline);	
	console.log('Your Json result is:  ' + data.playersOnline.size + ' :: ' + data.playersWatching);
	console.log('keys is:  ' + keys);
	
	var playerCount = countProperties(data.playersOnline);

	//console.log("-- itemCount is: "+itemCount);
	
	if (playerCount > 0) {
		$('#monitor-online-convrge span').html(playerCount);		
	}
	if (data.playersWatching > 0) {
		$('#monitor-watching-convrge span').html(data.playersWatching);		
	}
	
    //result.innerText = data.result; //display the result in an HTML element
}, function(status) { //error detection....
	console.log('Something went wrong.');
});

getJSON('http://convrge.co/api/events').then(function(data) {
		
	console.log("--events----------");
	console.log(data);
	console.log("------------");	
	//console.log('Your Json result is:  ' + data.playersOnline.size + ' :: ' + data.playersWatching);
	//console.log('keys is:  ' + keys);
	
	
}, function(status) { //error detection....
	console.log('Something went wrong.');
});

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}