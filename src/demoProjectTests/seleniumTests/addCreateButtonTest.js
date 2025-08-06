/*
The test function for the add and create button
 */

import {Builder, Browser, until, By,} from "selenium-webdriver";
import * as fs from "node:fs";
import {initMeasurement, measureClickForElement} from "../../helper.js";
import {buttonClicks} from "../../definitions.js";

async function simpleButtonClickTest(buttonId, url, file) {
	let driver;

	driver = await new Builder().forBrowser(Browser.CHROME).build();
	await driver.get(url);
	try {
		// wait until the header is loaded
		await driver.wait(until.elementLocated(By.id("framework")));
		const button = await driver.findElement(By.id(buttonId));

		await initMeasurement(driver);

		const data  = [];
		for(let i = 0; i<buttonClicks; i++){
			const duration = await measureClickForElement(driver,button);
			console.log(duration)
			data.push(duration)
		}

		// save data to file
		fs.appendFileSync(file,data.join(";")+"\n");

	} catch (e) {
		console.log(e)
	} finally {
		//await driver.quit();

	}
}

export async function add1kButtonTest(url, file){
	return simpleButtonClickTest("add-1000", url, file);
}

export async function add10kButtonTest(url, file){
	return simpleButtonClickTest("add-10000", url, file);
}

export async function create1kButtonTest(url, file){
	return simpleButtonClickTest("create-1000", url, file);
}

export async function create10kButtonTest(url, file){
	return simpleButtonClickTest("create-10000", url, file);
}