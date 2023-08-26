const Mint = require('./index'); // Using CommonJS module import

// Dummy expect function for simplicity
function expect(actual) {
    return {
        toEqual: function (expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                console.log("Test passed!");
            } else {
                console.log(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
            }
        },
        toBeFalsy: function () {
            if (!actual) {
                console.log("Test passed!");
            } else {
                console.log(`Expected falsy value but got ${actual}`);
            }
        },
        toBeTruthy: function () {
            if (actual) {
                console.log("Test passed!");
            } else {
                console.log(`Expected truthy value but got ${actual}`);
            }
        },
        objectContaining: function (expectedPartial) {
            let passed = true;
            for (let key in expectedPartial) {
                if (expectedPartial[key] !== actual[key]) {
                    passed = false;
                    break;
                }
            }
            if (passed) {
                console.log("Test passed!");
            } else {
                console.log(`Object did not contain expected values. Expected part of the object to be ${JSON.stringify(expectedPartial)}, but got ${JSON.stringify(actual)}`);
            }
        }
    };
}

// You would put your tests here, for instance:
const mint = new Mint(['her', 'heq', 'xshr']);
expect(mint.filter('xshre').text).toEqual('xs***');

// ... and so on for other tests
