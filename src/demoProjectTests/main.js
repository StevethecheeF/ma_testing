import {
	add10kElementsTester,
	add1kElementsTester,
	create10kElementsTester,
	create1kElementsTester,
	deleteElementsTester,
	initialLoadTester,
	updateElementsTester
} from "./executer/testRunDefinitions.js";

// enable/disable what tests should be run
// the testing applications need to run before the tests are executed (see where the url should be in the definitions.js file)

// testcases for demo  project
await initialLoadTester();
await add1kElementsTester();
await add10kElementsTester();
await create1kElementsTester();
await create10kElementsTester();
await updateElementsTester();
await deleteElementsTester();