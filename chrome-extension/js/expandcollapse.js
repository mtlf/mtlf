//OnLoadHandler.functions.push(initCollapseAllCapsules);

Capsule.capsules = [];

function Capsule(target, links) {
	this.target = target;
	this.collapse();

	var _this = this;
	for (var i in links) {
		links[i].onclick = function() {
			_this.toggle();
			return false
		}
    }
}

Capsule.prototype.toggle = function() {
	this.expanded ? this.collapse() : this.expand();
}

Capsule.prototype.collapse = function() {
	this.expanded = false;
	this.target.style.display = 'none';
}

Capsule.prototype.expand = function() {
	this.expanded = true;
	this.target.style.display = 'block';
}


function initCollapseAllCapsules() {
        var target;

	// find and set up all capsule targets
	for (var i = 0; target = document.getElementById('capsule' + i + 'target'); i++) {
		var links = [];
		var link;
		for (var j = 0; link = document.getElementById('capsule' + i + '-' + j); j++) {
			links.push(link);
		}

		Capsule.capsules.push(new Capsule(target, links));
	}

	var element = document.getElementById('expandall');
	if (element) {
		element.onclick = function() {
			for (var i in Capsule.capsules) {
				Capsule.capsules[i].expand();
			}
			return false;
		}
	}

	element = document.getElementById('collapseall');
	if (element) {
		element.onclick = function() {
			var firstkey = null;
			for (var i in Capsule.capsules) {
				if (firstkey == null)
					firstkey = i;
				Capsule.capsules[i].collapse();
			}
			// Force a reflow, work around Moz brokenness...
			setTimeout(function() { Capsule.capsules[firstkey].expand(); Capsule.capsules[firstkey].collapse(); }, 10);
			return false;
		}
	}
}

