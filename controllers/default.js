exports.install = function(framework) {
	framework.route('/', view_index);
	framework.route('/japan', view_japan);
};

function view_index() {
	var self = this;
	self.view('index');
}

function view_japan() {
	var self = this;
	self.view('japan');
}