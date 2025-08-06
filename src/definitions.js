// the definition for what framework runs under what url
export const frameworks={
	vue: "http://localhost:3003",
	//react:"http://localhost:3006",
	//svelte:"http://localhost:3009",
	//leptos:"",
};

// the number of browser test execution should be done
export const numberOfRuns = 2;
// the number of button clicks for the simple button tests should be done
export const buttonClicks = 10;
// the number of rows that should be updated (in tausend)
export const numberOfRowsToUpdate = [1,2,]