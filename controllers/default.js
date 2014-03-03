exports.install = function(framework) {
	framework.route('/', view_index);
};

function view_index() {
	var self = this;
	// var output = "Nachricht";
	self.view('index');
}