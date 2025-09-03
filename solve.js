
function baseToBigInt(value, base) {
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
  const b = BigInt(base);
  let result = 0n;
  value = value.toLowerCase();
  for (const ch of value) {
    const val = BigInt(digits.indexOf(ch));
    if (val === -1n || val >= b) {
      throw new Error(`Invalid digit ${ch} for base ${base}`);
    }
    result = result * b + val;
  }
  return result;
}

function getCoefficients(roots) {
  const degree = roots.length;

  const coeffs = Array(degree + 1).fill(0n);
  coeffs[0] = 1n;

  for (const r of roots) {
    for (let i = degree; i >= 1; i--) {
      coeffs[i] = coeffs[i] - r * coeffs[i - 1];
    }
  }
  return coeffs;
}

function processTestCase(jsonStr) {
  const jsonData = JSON.parse(jsonStr);
  const n = jsonData.keys.n;
  const k = jsonData.keys.k;

  
  const roots = [];
  for (let i = 1; i <= n; i++) {
    const root = jsonData[i];
    if (!root) continue;
    const base = parseInt(root.base);
    const value = root.value;
    const decRoot = baseToBigInt(value, base);
    roots.push(decRoot);
  }

  
  const coeffs = getCoefficients(roots.slice(0, k));

 
  return coeffs.map(c => c.toString());
}


const json1 = `{
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
}`;


const json2 = `{
  "keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d635"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  },
  "4": {
    "base": "16",
    "value": "e1b5e05623d881f"
  },
  "5": {
    "base": "8",
    "value": "316034514573652620673"
  },
  "6": {
    "base": "3",
    "value": "2122212201122002221120200210011020220200"
  },
  "7": {
    "base": "3",
    "value": "20120221122211000100210021102001201112121"
  },
  "8": {
    "base": "6",
    "value": "20220554335330240002224253"
  },
  "9": {
    "base": "12",
    "value": "45153788322a1255483"
  },
  "10": {
    "base": "7",
    "value": "1101613130313526312514143"
  }
}`;


console.log('Test case 1 coefficients:', processTestCase(json1));
console.log('Test case 2 coefficients:', processTestCase(json2));
