/*
The test function for the update and delete button
 */

import {Builder, Browser, until, By,} from "selenium-webdriver";
import * as fs from "node:fs";
import {initMeasurement, measureClickForElement, prepareNumberOfRows} from "../../helper.js";
import {buttonClicks} from "../../definitions.js";

async function advancedButtonClickTest(buttonId,amount, url, file) {
	let driver;

	driver = await new Builder().forBrowser(Browser.CHROME).build();
	await driver.get(url);
	try {
		// wait until the header is loaded
		await driver.wait(until.elementLocated(By.id("framework")));
		const button = await driver.findElement(By.id(buttonId));

		await initMeasurement(driver);

		await prepareNumberOfRows(driver,amount)

		const data  = [];
		for(let i = 0; i<buttonClicks; i++){
			const duration = await measureClickForElement(driver,button);
			data.push(duration)
		}

		// save data to file
		fs.appendFileSync(file,data.join(";")+"\n");

	} catch (e) {
		console.log(e)
	} finally {
		await driver.quit();
	}
}

export function updateButtonTest(amount){
	return (url, file)=> advancedButtonClickTest("update",amount, url, file);
}

export function deleteButtonTest(amount){
	return (url, file)=> advancedButtonClickTest("remove", amount, url, file);
}