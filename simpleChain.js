/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function () {
	console.log("Waiting...")
}, 10000);

/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/


(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block.Block("Test Block - " + (i + 1));
		// Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
		myBlockChain.addBlock(blockTest).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 10000);
  })(0);


/***********************************************
 ** Function to get the Height of the Chain ****
 ***********************************************/

setTimeout(function() {
	myBlockChain.getBlockHeight().then((height) => {
		console.log(height);
	}).catch((err) => { console.log(err);});
},20000);
/*
// Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
myBlockChain.getBlockHeight().then((height) => {
	console.log(height);
}).catch((err) => { console.log(err);});
*/

/***********************************************
 ******** Function to Get a Block  *************
 ***********************************************/

 setTimeout(function() {
	 myBlockChain.getBlock(0).then((block) => {
 		console.log(JSON.stringify(block));
 	}).catch((err) => { console.log(err);});
},20000);

/*
// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
myBlockChain.getBlock(0).then((block) => {
	console.log(JSON.stringify(block));
}).catch((err) => { console.log(err);});
*/

/***********************************************
 ***************** Validate Block  *************
 ***********************************************/
// Tempering block 5 here
 setTimeout(function() {
	 myBlockChain.getBlock(5).then((block) => {
 		let blockAux = block;
 		blockAux.body = "Tampered Block";
 		myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
 			if(blockModified){
 				myBlockChain.validateBlock(blockAux.height).then((valid) => {
 					console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
 				})
 				.catch((error) => {
 					console.log(error);
 				})
 			} else {
 				console.log("The Block wasn't modified");
 			}
 		}).catch((err) => { console.log(err);});
 	}).catch((err) => { console.log(err);});
},70000);


// tempering Block 6 here
setTimeout(function() {
	myBlockChain.getBlock(6).then((block) => {
		let blockAux = block;
		blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
		myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
			if(blockModified){
				console.log("The Block was modified");
			} else {
				console.log("The Block wasn't modified");
			}
		}).catch((err) => { console.log(err);});
	}).catch((err) => { console.log(err);});
},90000);

(function theLoop2(i) {
 setTimeout(function() {
	 myBlockChain.validateBlock(i).then((valid) => {
 		console.log(i + " " + valid);
		i++;
		if (i < 10)
		theLoop2(i);
 	})
 	.catch((error) => {
 		console.log(error);
 	});
},11000);
}(0))


setTimeout(function() {
	myBlockChain.validateChain().then((errorLog) => {
		if(errorLog.length > 0){
			//console.log(errorLog); //added;
			console.log("The chain is not valid:");
			errorLog.forEach(error => {
				console.log(error);
			});
		} else {
			console.log("No errors found, The chain is Valid!");
		}
	})
	.catch((error) => {
		console.log(error);
	});


},110000);




/** Tampering a Block this is only for the purpose of testing the validation methods */
/*
myBlockChain.getBlock(5).then((block) => {
	let blockAux = block;
	blockAux.body = "Tampered Block";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			myBlockChain.validateBlock(blockAux.height).then((valid) => {
				console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
			})
			.catch((error) => {
				console.log(error);
			})
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});

myBlockChain.getBlock(6).then((block) => {
	let blockAux = block;
	blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			console.log("The Block was modified");
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});

/***********************************************
 ***************** Validate Chain  *************
 ***********************************************/

/*
// Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
myBlockChain.validateChain().then((errorLog) => {
	if(errorLog.length > 0){
		console.log("The chain is not valid:");
		errorLog.forEach(error => {
			console.log(error);
		});
	} else {
		console.log("No errors found, The chain is Valid!");
	}
})
.catch((error) => {
	console.log(error);
})
*/
