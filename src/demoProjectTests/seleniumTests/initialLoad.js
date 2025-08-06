/*
The test function for the initial load
 */

import {Builder, Browser, until, By,} from "selenium-webdriver";
import * as fs from "node:fs";

export async function initialLoad(url, file) {
	let driver;

	driver = await new Builder().forBrowser(Browser.CHROME).build();
	await driver.get(url);
	try {
		// wait until the header is loaded
		await driver.wait(until.elementLocated(By.id("framework")));


		// get data from the performance api load
		let navigation = await driver.executeScript("return performance.getEntriesByType(\"navigation\")[0]");

		let responseEnd = navigation.responseEnd;
		let domInteractive = navigation.domInteractive;
		let domContentLoadedEventStart = navigation.domContentLoadedEventStart;
		let domContentLoadedEventEnd = navigation.domContentLoadedEventEnd;
		let domComplete = navigation.domComplete;
		let loadEventStart = navigation.loadEventStart;
		let loadEventEnd = navigation.loadEventEnd;
		let duration = navigation.duration;
		let data = [
			responseEnd,
			domInteractive,
			domContentLoadedEventStart,
			domContentLoadedEventEnd,
			domComplete,
			loadEventStart,
			loadEventEnd,
			duration
		];

		// save data to file
		fs.appendFileSync(file,data.join(";")+"\n");

	} catch (e) {
		console.log(e)
	} finally {
		await driver.quit();

	}
}
