import {executeRuns} from "../../executer/runner.js";
import {initialLoad} from "../seleniumTests/initialLoad.js";
import {add10kButtonTest, add1kButtonTest, create10kButtonTest, create1kButtonTest} from "../seleniumTests/addCreateButtonTest.js";
import {numberOfRowsToPrepare} from "../../definitions.js";
import {deleteButtonTest, updateButtonTest} from "../seleniumTests/updateDeleteButtonTest.js";

/*
The definitions of the tester function that are executed in main.js
 */

export async function initialLoadTester(){
	await executeRuns(initialLoad,"initialLoad");
}

export async function add1kElementsTester(){
	await executeRuns(add1kButtonTest,"add1k");
}

export async function add10kElementsTester(){
	await executeRuns(add10kButtonTest,"add10k");
}

export async function create1kElementsTester(){
	await executeRuns(create1kButtonTest,"create1k");
}

export async function create10kElementsTester(){
	await executeRuns(create10kButtonTest,"create10k");
}

export async function updateElementsTester(){
	for(let amount of numberOfRowsToPrepare){
		await executeRuns(updateButtonTest(amount),"update"+amount+"k");
	}
}

export async function deleteElementsTester(){
	for(let amount of numberOfRowsToPrepare){
		await executeRuns(deleteButtonTest(amount),"delete"+amount+"k");
	}
}



