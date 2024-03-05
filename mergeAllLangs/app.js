const path = require('path');
const { exec } = require('child_process');

// target to source mapping
// const mappings = {
// 	ar: 'ar',
// 	ca: 'ca',
// 	cs: 'cs',
// 	'cy-GB': 'cy-GB',
// 	da: 'da',
// 	de: 'de',
// 	'es-LA': 'es-MX',
// 	'es': 'es-ES',
// 	et: 'et',
// 	fi: 'fi',
// 	fr: 'fr',
// 	he: 'he',
// 	hr: 'hr',
// 	hu: 'hu',
// 	id: 'id',
// 	it: 'it',
// 	'ja-JP': 'ja',
// 	ko: 'ko',
// 	'lv-LV': 'lv',
// 	'nb-NO': 'no',
// 	'nl': 'nl',
// 	'pl': 'pl',
// 	'pt-BR': 'pt-BR',
// 	'pt-PT': 'pt-PT',
// 	'ro': 'ro',
// 	'ru-RU': 'ru',
// 	'sk': 'sk',
// 	'sl': 'sl',
// 	'sv-SE': 'sv-SE',
// 	'th': 'th',
// 	'tr': 'tr',
// 	'uk': 'uk',
// 	'vi': 'vi',
// 	'zh-CN': 'zh-CN',
// 	'zh-TW': 'zh-TW'
// };

// source folder to target file mapping
const reverseMappings = {
    "ar": "ar",
    "ca": "ca",
    "cs": "cs",
    "cy-GB": "cy-GB",
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

// Command line tool
// Take input of the folder which contains all the translations name it translationsSource
// take another input of the target folder which contains the target files name it as translationsTarget
// Iterate through reverseMapping Object which contains the folder name as the key and target file is the value.json
// execute jsonMerger/app.js with the source file and target file
// source file path will be translationsSource/key/*.json
// target file path will be translationsTarget/value.json
// jsonMerge is located at ../jsonMerger/app.js
function mergeTranslations(translationsSource, translationsTarget) {

	for (const sourceFolder in reverseMappings) {
		const targetFile = reverseMappings[sourceFolder];
		const sourceFilePath = path.join(translationsSource, sourceFolder, '*.json');
		const targetFilePath = path.join(translationsTarget, `${targetFile}.json`);

		// execute jsonMerger/app.js with the source file and target file
		const command = `node ../jsonMerger/app.js ${sourceFilePath} ${targetFilePath}`;
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing command: ${command}`);
				console.error(stderr);
			} else {
				console.log(stdout);
			}
		});
	}
}

const sourceFilePath = process.argv[2];
const targetFilePath = process.argv[3];
mergeTranslations(sourceFilePath, targetFilePath);

console.log('Dun dana dun dun! Merging completed successfully!')
