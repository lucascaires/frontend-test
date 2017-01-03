/**
 * Rank app created for R7 Front-end Test
 * This app get a json data from a file
 * then render it in a simple HTML page
 */
var rankApp = {

	//Store the template and target DOM node
	template : document.getElementById("rank-template"),
	target : document.getElementById("rank-target"),

	//Setup the app
	init : function() {
		this.getData('fazenda.json', function(obj) {
			rankApp.renderRank(obj.data);
		});
	},

	//Ajax method to get the json data
	getData : function(path, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.onload = function() {
  			if (request.status >= 200 && request.status < 400)				
				callback(JSON.parse(request.responseText)); //put the result in a callback			
		}
		request.send();		
	},

	//Render the underscore template in its target
	renderRank : function(data) {		
		var tmpl = _.template(this.template.innerHTML);		
		this.target.innerHTML = tmpl({
			items: this.orderByPositive(data).reverse()
		});
	},

	//Order the ranking by positive percentage	
	orderByPositive : function(data) {
		return _.sortBy(data, function(d) {		
			return rankApp.getPercent(d.positive, d.negative);
		});
	},

	//Get the first value percent from the total of two values
	getPercent : function(n1, n2) {
		if(!n1 || isNaN(n1)) return 0;
		var tot = parseInt(n1) + parseInt(n2);	
		return Math.round((n1 / tot)*100);	
	}

}




rankApp.init();

