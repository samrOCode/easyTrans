const fs = require('fs');
const path = require('path');

// Accept two arguments source and target file paths and merge the key-value pairs from source to target recursively
// preserve the structure
// sample source.json
// {
// "fs": {
// 		"common": {
// 			"add_mapping": "Afegir una assignació"
//         }
//     }
// }
// sample target.json
// {
// "fs": {
// 		"common": {}
//}

// source folder to target file mapping
const reverseMappings = {
    "ar": "ar",
    "ca": "ca",
    "cs": "cs",
    "cy": "cy-GB",
    "da": "da",
    "de": "de",
    "es-MX": "es-LA",
    "es-ES": "es",
    "et": "et",
    "fi": "fi",
    "fr": "fr",
    "he": "he",
    "hr": "hr",
    "hu": "hu",
    "id": "id",
    "it": "it",
    "ja": "ja-JP",
    "ko": "ko",
    "lv": "lv-LV",
    "no": "nb-NO",
    "nl": "nl",
    "pl": "pl",
    "pt-BR": "pt-BR",
    "pt-PT": "pt-PT",
    "ro": "ro",
    "ru": "ru-RU",
    "sk": "sk",
    "sl": "sl",
    "sv-SE": "sv-SE",
    "th": "th",
    "tr": "tr",
    "uk": "uk",
    "vi": "vi",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-TW"
}

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            target[key] = deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

function mergeTranslations(translationsSource, translationsTarget) {
	for (const sourceFolder in reverseMappings) {
		const targetFile = reverseMappings[sourceFolder];
		const targetFilePath = path.join(translationsTarget, `${targetFile}.json`);
        const sourceFolderPath = path.join(translationsSource, sourceFolder);

        fs.readdirSync(sourceFolderPath).forEach(file => {
            if (path.extname(file) === '.json') {
                const sourceFilePath = path.join(sourceFolderPath, file);

                // merge the key-value pairs from source to target recursively
                const sourceData = fs.readFileSync(sourceFilePath, 'utf8');
                const targetData = fs.readFileSync(targetFilePath, 'utf8');

                const sourceJson = JSON.parse(sourceData);
                const targetJson = JSON.parse(targetData);

                const mergedJson = deepMerge(targetJson, sourceJson);

                const mergedData = JSON.stringify(mergedJson, null, '\t');

                fs.writeFileSync(targetFilePath, mergedData, 'utf8');
            }
        });
	}
}

const sourceFilePath = process.argv[2];
const targetFilePath = process.argv[3];
mergeTranslations(sourceFilePath, targetFilePath);
console.log('done')
