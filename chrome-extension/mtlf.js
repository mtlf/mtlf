(function() {
    function getLocalURL(local_path) {
	return chrome.extension.getURL(local_path);
    }
    
    function getBootstrapScope() {
	$.scoped(); // Initialize plugin
	var localBootstrapUrl = getLocalURL('css/bootstrap.min.css');	    
	var localBootstrapThemeUrl = getLocalURL('css/bootstrap-theme.min.css');
	var localCSSUrl = getLocalURL('css/mtlf.css')
	var scopedDiv = $("<div>")
	    .append($("<style scoped>")
		    .html("@import url(" + localBootstrapUrl + "); @import url(" + localBootstrapThemeUrl +"); @import url(" + localCSSUrl + ");"));
	$("body").append(scopedDiv);
	return scopedDiv;
    }

    function getModalHeader() {
	return $("<div>").attr("id", "header")
	    .append($("<h2>")
		    .text("Please rate the HIT you just completed"));
    }

    function getModalBody() {
	var modal = $("<div>").attr("id", "popup").addClass("container");
	var content = $("<div>").addClass("row pad-top")
	    .append($("<label>").addClass("radio-inline col-md-3 pad-left")
		    .append($("<input>")
			    .attr("type", "radio")
			    .attr("name", "vote")
			    .val("+"))
		    .append($("<img>")
			    .attr("src", getLocalURL('img/turker_dialog_up.gif')))
		    .append($("<span>").addClass("pad-left-small")
			    .text("The task was engaging, I enjoyed it.")))
	    .append($("<label>").addClass("radio-inline col-md-3")
		    .append($("<input>")
			    .attr("type", "radio")
			    .attr("name", "vote")
			    .val("-"))
		    .append($("<img>")
			    .attr("src", getLocalURL('img/turker_dialog_down.gif')))
		    .append($("<span>").addClass("pad-left-small")
			    .text("The task was not enjoyable.")));

	var buttons = $("<div>").attr("id", "buttons").addClass("row pad-top pad-bottom")
	    .append($("<button>").addClass("btn btn-default pad-left")
		    .attr("type", "button")
		    .attr("id", "new_button")
		    .text("Recommend a new task"));
	
	return modal.append(content, buttons);	 
	    
	/*	urlParams = getUrlParams()
	return $("<div>").addClass("modal-body")
	    .append($("<p>").text("Viva La Revolucion!"))
	    .append($("<img>")
		    .attr("src", getLocalURL('img/mtlf_logo_small.png')))
		    .append($("<p>").text(urlParams['hitId'])); */
    }

    function getUrlParams()
    {
	var params = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	    {
		hash = hashes[i].split('=');
		params.push(hash[0]);
		params[hash[0]] = hash[1];
	    }
	return params;
    }

    function buildMltfModal(modalId) {
	var modalBody = getModalBody();

	var modalHeader = $("<div>").addClass("modal-header");
	$("<button>")
	    .addClass("close")
	    .attr("data-dismiss", "modal")
	    .attr("aria-hidden", "true")
	    .html("&times;")
	    .appendTo(modalHeader);
	modalHeader.append(getModalHeader().addClass("modal-title"));

	var modalContent = $("<div>").addClass("modal-content")
	    .append(modalHeader, modalBody);

	var modal = $("<div>")
	    .addClass("modal fade row")
	    .attr("id", modalId)
	    .append($("<div>").addClass("modal-dialog span8")
		    .append(modalContent));
	return modal;
    }

    function loadModal() {
	groupDoneStr = "There are no more available HITs";
	alertMessageCond = $("#alertboxMessage").text().indexOf(groupDoneStr) == 0;
	alertHeaderCond = $("#alertboxHeader").text().indexOf(groupDoneStr) == 0;
	if (alertMessageCond || alertHeaderCond) {
	    var modalId = "MTLFModal";
	    var mltfModal = buildMltfModal(modalId);
	    getBootstrapScope().append(mltfModal);
	    $("#" + modalId).modal();
	    $("#" + modalId).css("display", "block");
	    
	    
	$("#new_button").click(function() {
	    console.log("test"); 
	    $.get('/api/recommend_hit_groups', {msg: JSON.stringify(<<parsedListOfStuff>>)}, function( data ) {
		var groupID = data[0];
		
		var mturk_url; "https://workersandbox.mturk.com/mturk/preview?groupId=" + groupID;
		window.location = mturk_url;
	      });
	});
	    
	}
    }






    function getScrape() {
        $.get('/api/recommend_hit_groups', {msg: JSON.stringify(make_json())},
                function(data) {
                    console.log(data);
                    console.log('lydia is a monkey');
                });
    }

    //getScrape();
    loadModal();

})();
