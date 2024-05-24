Todo: Improve documentation
Todo: Simplify and add it to itildesk 

Usage

```
	node mergeAllLangs/app.js sourceTranslationsFolder targetTranslationsFolder
```

Important: Extract your source translation folder, and add a mapping.json that contains the mapping to the parent object of the string
eg:
```
{
	newString: "fs.common"
}
```
implies newString is located at fs.common.newString
