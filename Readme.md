# Shamir's Secret Sharing Algorithm in JavaScript

This project implements a simplified version of Shamir's Secret Sharing algorithm in JavaScript. The objective is to find the constant term (`c`) of an unknown polynomial using Lagrange Interpolation and detect any "wrong" points in the given input.

## Problem Description

Shamir's Secret Sharing is an algorithm that divides a secret into multiple parts and distributes them among participants. To reconstruct the secret, a certain number of parts (or roots) are needed. In this project, we are given a set of points on a polynomial curve, and our task is to:

1. Decode the Y-values from various bases (binary, decimal, hexadecimal, etc.).
2. Use Lagrange Interpolation to find the constant term (`c`), which represents the secret.
3. Detect and print any points that don't fit the polynomial in the second test case.

## Input Format

The input is provided in JSON format. There are two test cases, each in its own JSON file.

### Test Case 1 (`testcase1.json`):
```json
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
```

### Test Case 2 (`testcase2.json`):
```json
{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}
```

### Explanation of Input:
- `n`: Total number of points (roots) provided.
- `k`: Minimum number of points required to find the polynomial (k = m + 1, where m is the degree of the polynomial).
- Each point has:
  - `base`: The base in which the Y-value is encoded.
  - `value`: The encoded Y-value in the specified base.
  
### Decoding the Points:
- Convert the Y-values from the specified base to decimal (base 10).
- The X-values are implicitly represented by the keys (`1`, `2`, `3`, etc.).

## How the Code Works

1. **Parsing Input**: 
   - The input JSON files are read using Node.js `fs` module.
   - X-values are extracted from the keys of the JSON.
   - Y-values are decoded from their given base.

2. **Lagrange Interpolation**:
   - The first `k` points are used to perform Lagrange Interpolation, which computes the constant term (`c`) of the polynomial.

3. **Detecting Wrong Points**:
   - The remaining points are checked against the polynomial.
   - Any points that do not fit the polynomial are considered "wrong" and are printed.

## Code Structure

- **`decodeValue(base, value)`**: Decodes the Y-value from the given base.
- **`lagrangeInterpolation(points, degree)`**: Computes the polynomial's constant term (`c`) using the first `k` points.
- **`checkIfPointFits(x, y, points, degree)`**: Verifies if a point fits the polynomial.
- **`processTestCase(testCase)`**: Processes each test case to find the constant term and wrong points.
- **`printResults(testCase1, testCase2)`**: Prints the results for both test cases.

## How to Run the Code

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Place the two input JSON files (`testcase1.json` and `testcase2.json`) in the same directory as the script.
3. Run the script using the following command:
   ```bash
   node shamir_secret.js
   ```

4. The output will display:
   - The secret (constant term `c`) for both test cases.
   - Any wrong points in the second test case.

## Example Output

```bash
Secret for Test Case 1:  4.0
Secret for Test Case 2:  28735619723837.0
Wrong points in Test Case 2:
Point with x = 3 and y = 32811A4AA0B7B is wrong
Point with x = 4 and y = 917978721331A is wrong
```

## Files Included

- `shamir_secret.js`: The main JavaScript file containing the code.
- `testcase1.json`: The first test case.
- `testcase2.json`: The second test case.
- `README.md`: This file, explaining how to run and understand the project.
