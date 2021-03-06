function getNodeField(node, kind, field, RED, msg) {
	switch (kind) {
		case 'flow': {
			return node.context().flow.get(field);
		}
		case 'global': {
			return node.context().global.get(field);
		}
		case 'num': {
			return parseInt(field, 10);
		}
		case 'msg': {
			return RED.util.getMessageProperty(msg, field);
		}
		case 'bool': {
			return JSON.parse(field);
		}
		default: {
			return field;
		}
	}
}

function getNodeConfig(node, RED, msg) {
	const { key, url, projectId, keyFieldType, urlFieldType, projectIdFieldType } = node.config;
	return {
		privateToken: getNodeField(node, keyFieldType, key, RED, msg),
		api: getNodeField(node, urlFieldType, url, RED, msg),
		id: getNodeField(node, projectIdFieldType, projectId, RED, msg)
	};
}

module.exports = {
	getNodeConfig,
	getNodeField
};
