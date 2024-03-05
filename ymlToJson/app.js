const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yamlFilePath = process.argv[2]; // Get the path from command line arguments

try {
	const yamlData = fs.readFileSync(yamlFilePath, 'utf8');
	const jsonData = yaml.load(yamlData);
	const jsonString = JSON.stringify(jsonData, null, 2);

	const jsonFileName = path.basename(yamlFilePath, path.extname(yamlFilePath)) + '.json';
	const jsonFilePath = path.join(path.dirname(yamlFilePath), jsonFileName);

	fs.writeFileSync(jsonFilePath, jsonString);
	console.log('YAML file converted to JSON and saved successfully!');
} catch (error) {
	console.error('Error converting YAML to JSON:', error);
}
