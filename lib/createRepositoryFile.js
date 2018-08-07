const gitlab = require('node-gitlab');
const { getNodeConfig } = require('./shared');

module.exports = function(RED) {
	function GitLabCreateRepositoryFile(n) {
		const node = this;
		RED.nodes.createNode(node, n);
		node.config = RED.nodes.getNode(n.gitlabconfig);
		node.branch_name = n.branch_name;
		node.encoding = n.encoding;
		node.on('input', msg => {
			const {
				branch_name,
				encoding,
				content,
				commit_message,
				file_path
			} = msg.payload;
			const { api, privateToken, id } = getNodeConfig(node, RED, msg);
			const client = gitlab.create({ api, privateToken });
			client.repositoryFiles.create(
				{
					id,
					file_path,
					branch_name: branch_name ? branch_name : node.branch_name,
					content,
					commit_message,
					encoding: encoding ? encoding : node.encoding
				},
				(error, body) => {
					if (error) {
						msg.payload = error.toString();
						node.error(error, msg);
						node.send([null, msg]);
					} else {
						msg.payload = body;
						node.log(RED._('Succeeded to API Call.'));
						node.send([msg, null]);
					}
				}
			);
		});
	}
	RED.nodes.registerType(
		'gitlab2-create-repositoryfile',
		GitLabCreateRepositoryFile
	);
};
