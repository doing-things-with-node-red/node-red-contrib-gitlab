module.exports = function(RED) {
	function gitlabConfig(n) {
		const node = this;
		RED.nodes.createNode(node, n);
		node.url = n.url;
		node.urlFieldType = n.urlFieldType;
		node.project_id = n.project_id;
		node.projectIdFieldType = n.projectIdFieldType;
		node.key = n.key;
		node.keyFieldType = n.keyFieldType;
	}
	RED.nodes.registerType('gitlab2-config', gitlabConfig);
};
