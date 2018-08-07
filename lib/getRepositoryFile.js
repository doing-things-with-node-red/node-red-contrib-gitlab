const gitlab = require('node-gitlab');
const { getNodeConfig } = require('./shared');

module.exports = function(RED) {
	function GitLabGetRepositoryFile(n) {
		const node = this;
		RED.nodes.createNode(node, n);
		node.gitlabConfig = RED.nodes.getNode(n.gitlabconfig);
		node.ref = n.ref;
		node.on('input', msg => {
			const { file_path, ref } = msg.payload;
			const { api, privateToken, id } = getNodeConfig(node);
			const target = ref || node.ref;
			const client = gitlab.create({ api, privateToken });
			client.repositoryFiles.get(
				{ id, ref: target, file_path },
				(error, body) => {
					if (error) {
						msg.payload = error.toString();
						node.error(error, msg);
					} else {
						msg.payload = body;
						node.log(RED._('Succeeded to API Call.'));
					}
					node.send(msg);
				}
			);
		});
	}
	RED.nodes.registerType('gitlab2-get-repositoryfile', GitLabGetRepositoryFile);
};
