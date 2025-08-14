const fs = require('fs');
const path = require('path');

const issuesPath = path.join(__dirname, 'DEVELOPMENT_ISSUES.md');
const content = fs.readFileSync(issuesPath, 'utf8');
const lines = content.split('\n');

console.log('Looking for Issue #1...');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('Issue #1:')) {
    console.log(`Found at line ${i + 1}: ${line}`);
    console.log('Next 20 lines:');
    for (let j = i + 1; j < Math.min(i + 21, lines.length); j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
    break;
  }
}