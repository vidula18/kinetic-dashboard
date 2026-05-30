const fs = require('fs');
let content = fs.readFileSync('src/data/mockPerformance.ts', 'utf-8');

content = content.replace(/label: number;/, 'label: string;');
content = content.replace(/labelDist: Record<number, number>;/g, 'labelDist: Record<string, number>;');

content = content.replace(/label: 1,/g, "label: 'Try 1',");
content = content.replace(/label: 2,/g, "label: 'Try 2',");
content = content.replace(/label: 3,/g, "label: 'Try 3',");
content = content.replace(/label: 4,/g, "label: 'Cold',");
content = content.replace(/label: 5,/g, "label: 'Ready for the trial',");

content = content.replace(/{ 1: 9, 2: 6, 3: 4, 4: 3, 5: 2 }/g, "{ 'Try 1': 9, 'Try 2': 6, 'Try 3': 4, 'Cold': 3, 'Ready for the trial': 2 }");
content = content.replace(/{ 1: 7, 2: 5, 3: 3, 4: 2, 5: 2 }/g, "{ 'Try 1': 7, 'Try 2': 5, 'Try 3': 3, 'Cold': 2, 'Ready for the trial': 2 }");

content = content.replace(/{ 1: 4, 2: 3, 3: 3, 4: 2, 5: 2 }/g, "{ 'Try 1': 4, 'Try 2': 3, 'Try 3': 3, 'Cold': 2, 'Ready for the trial': 2 }");
content = content.replace(/{ 1: 3, 2: 3, 3: 2, 4: 2, 5: 2 }/g, "{ 'Try 1': 3, 'Try 2': 3, 'Try 3': 2, 'Cold': 2, 'Ready for the trial': 2 }");
content = content.replace(/{ 1: 14, 2: 11, 3: 10, 4: 8, 5: 6 }/g, "{ 'Try 1': 14, 'Try 2': 11, 'Try 3': 10, 'Cold': 8, 'Ready for the trial': 6 }");
content = content.replace(/{ 1: 12, 2: 10, 3: 9, 4: 7, 5: 5 }/g, "{ 'Try 1': 12, 'Try 2': 10, 'Try 3': 9, 'Cold': 7, 'Ready for the trial': 5 }");
content = content.replace(/{ 1: 40, 2: 30, 3: 28, 4: 20, 5: 17 }/g, "{ 'Try 1': 40, 'Try 2': 30, 'Try 3': 28, 'Cold': 20, 'Ready for the trial': 17 }");
content = content.replace(/{ 1: 34, 2: 28, 3: 24, 4: 18, 5: 16 }/g, "{ 'Try 1': 34, 'Try 2': 28, 'Try 3': 24, 'Cold': 18, 'Ready for the trial': 16 }");

fs.writeFileSync('src/data/mockPerformance.ts', content, 'utf-8');
