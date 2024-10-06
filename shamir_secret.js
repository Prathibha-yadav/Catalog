const fs = require('fs');

// Function to decode the value based on its base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange interpolation function to find the constant term (y-intercept)
function lagrangeInterpolation(points, degree) {
    let constantTerm = 0;
    for (let i = 0; i < degree; i++) {
        let li = 1;
        for (let j = 0; j < degree; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        constantTerm += li * points[i].y;
    }
    return constantTerm;
}
// Function to check if a given point fits the polynomial
function checkIfPointFits(x, y, points, degree) {
    let interpolatedY = lagrangeInterpolation(points, degree); // Interpolating the polynomial
    return y === Math.round(interpolatedY); // Compare with rounded interpolated y
}

// Function to process a single test case
function processTestCase(testCase) {
    const n = testCase.keys.n;
    const k = testCase.keys.k;
    const degree = k; // k = m + 1 -> m = k - 1, so we are using k points

    // Decode all the given points
    const points = [];
    for (let i = 1; i <= n; i++) {
        const key = i.toString(); // Convert index to string to match the JSON keys
        if (testCase[key]) { // Ensure the point exists in the testCase
            const x = i; // the key acts as x value
            const base = parseInt(testCase[key].base);
            const value = testCase[key].value;
            const y = decodeValue(base, value); // decode the y value
            points.push({ x, y });
        }
    }

    // Calculate the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points.slice(0, degree), degree);

    // Find wrong points
    const wrongPoints = [];
    
    // Loop through the remaining points (from degree to the end of the points array)
    for (let i = degree; i < points.length; i++) {
        const point = points[i];
        const fits = checkIfPointFits(point.x, point.y, points.slice(0, degree), degree);
        if (!fits) {
            wrongPoints.push(point);
        }
    }

    return {
        constantTerm,
        wrongPoints
    };
}

// Function to print results for all test cases
function printResults(testCase1, testCase2, testCase3) {
    const result1 = processTestCase(testCase1);
    const result2 = processTestCase(testCase2);
    const result3 = processTestCase(testCase3);

    console.log("Secret for Test Case 1: ", result1.constantTerm);
    console.log("Secret for Test Case 2: ", result2.constantTerm);
    console.log("Secret for Test Case 3: ", result3.constantTerm);

    if (result2.wrongPoints.length > 0) {
        console.log("Wrong points in Test Case 2:");
        result2.wrongPoints.forEach(point => {
            console.log(`Point with x = ${point.x} and y = ${point.y} is wrong`);
        });
    } else {
        console.log("No wrong points found in Test Case 2.");
    }

    if (result3.wrongPoints.length > 0) {
        console.log("Wrong points in Test Case 3:");
        result3.wrongPoints.forEach(point => {
            console.log(`Point with x = ${point.x} and y = ${point.y} is wrong`);
        });
    } else {
        console.log("No wrong points found in Test Case 3.");
    }
}

// Main function to read the input JSON and call the processing functions
function main() {
    // Read test cases from files
    const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
    const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));
    const testCase3 = JSON.parse(fs.readFileSync('testcase3.json', 'utf8'));

    // Print results for all test cases
    printResults(testCase1, testCase2, testCase3);
}

// Execute the main function
main();
