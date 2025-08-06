import fs from "node:fs";
import path from "node:path";
import {frameworks, numberOfRuns} from "../definitions.js";

/**
 * Makes preparations and executes a given test function a number of times
 */
export async function executeRuns(testFunction, folder){
	for (const [framework,url] of Object.entries(frameworks)){
		let folderPath = path.join("results",folder);
		if(!fs.existsSync(folderPath)){
			fs.mkdirSync(folderPath, { recursive: true });
		}
		let file = path.join(folderPath,framework+".csv");
		if(fs.existsSync(file)){
			fs.unlink(file,(err)=> {
				if(err) {
					throw err
				}
			})
		}else {

		}
		for(let i = 0; i < numberOfRuns; i++){
			await testFunction(url,file);
		}
	}
}