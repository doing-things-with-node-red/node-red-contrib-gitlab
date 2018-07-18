const gitlab = require('node-gitlab');

module.exports = function(RED) {
	function gitlabConfig(n) {
		const node = this;
		RED.nodes.createNode(node, n);
		node.key = n.key;
		node.url = n.url;
		node.project_id = n.project_id;
		const { credentials } = node;
		if (credentials && credentials.hasOwnProperty('key')) {
			node.key = credentials.key;
		}
	}
	RED.nodes.registerType('gitlab2-config', gitlabConfig, {
		credentials: {
			key: {
				type: 'password'
			}
		}
	});
};
