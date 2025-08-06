import {By} from "selenium-webdriver";

/**
 * Clicks a given element and measures how long till the next page is rendered
 */
export async function measureClickForElement(driver, elem) {
	return (await driver.executeAsyncScript(
		`
      let callback = arguments[arguments.length - 1];
      let elem = arguments[0];
      let base = document;
      let t0 = performance.now(); 
      elem.click();
      window.afterFrame(() => 
      {
        let t = performance.now()-t0;
        // @ts-ignore
        window.lastDuration = t;
        callback(t);
      })
    `, elem
	))
}

/**
 * Initializes the needed hooks and data in the browser to take measurements
 */
export async function initMeasurement(driver) {
	// From https://github.com/andrewiggins/afterframe, MIT licensed
	const afterFrame = `
		let callbacks = [];
		let channel = new MessageChannel();
		let postMessage = (function() {
			this.postMessage(undefined);
		}).bind(channel.port2);
		
		channel.port1.onmessage = () => {

			let toFlush = callbacks;
			callbacks = [];
			let time = performance.now();
			for (let i = 0; i < toFlush.length; i++) {
				// Call all callbacks with the time the flush began, similar to requestAnimationFrame
				// TODO: Error handling?
				toFlush[i](time);
			}
		};
		channel = null;

		window.afterFrame = function(callback) {
			if (callbacks.push(callback) === 1) {
				requestAnimationFrame(postMessage);
			}
		}
	`;
	await driver.executeScript(afterFrame);
}

/**
 * Creates a certain number of rows
 */
export async function prepareNumberOfRows(driver,amountInThousand){
	const button = await driver.findElement(By.id("add-1000"));
	for(let i = 0; i<amountInThousand; i ++){
		await measureClickForElement(driver,button);
	}
}