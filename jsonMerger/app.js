#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the file paths from command line arguments
const sourceFilePath = process.argv[2];
const targetFilePath = process.argv[3];

// Read the source JSON file
const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));

// Read the target JSON file
const targetData = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));

// Read the mapping JSON file
const mappingFilePath = path.resolve(path.dirname(sourceFilePath), '..', 'mapping.json');
const mappingData = JSON.parse(fs.readFileSync(mappingFilePath, 'utf8'));

// Recursive function to merge objects
// eg:
// source { "string1": "value1"}
// mapping { "string1": "fs.c.e"}
// target { "fs": { "c": { "e": { "string1": "value1" }}}}
function mergeObjects(target, source, mapping) {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const sourceValue = source[key];
			if (mapping.hasOwnProperty(key)) {
				const targetKey = mapping[key];
				if (typeof targetKey === 'string') {
					const targetPath = targetKey.split('.');
					let currentTarget = target;
					for (let i = 0; i < targetPath.length - 1; i++) {
						const pathSegment = targetPath[i];
						if (!currentTarget.hasOwnProperty(pathSegment)) {
							currentTarget[pathSegment] = {};
						}
						currentTarget = currentTarget[pathSegment];
					}
					if (!currentTarget.hasOwnProperty(targetPath[targetPath.length - 1])) {
						currentTarget[targetPath[targetPath.length - 1]] = {};
					}
					currentTarget = currentTarget[targetPath[targetPath.length - 1]];
					currentTarget[key] = sourceValue;
				} else if (typeof targetKey === 'object') {
					mergeObjects(target, sourceValue, targetKey);
				}
			} else {
				target[key] = sourceValue;
			}
		}
	}
}

// Merge the key-value pairs from source to target recursively using mapping
mergeObjects(targetData, sourceData, mappingData);

// Write the merged data to the target JSON file
fs.writeFileSync(targetFilePath, JSON.stringify(targetData, null, 2));

console.log('Merging completed successfully!');
