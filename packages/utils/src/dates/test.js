import { Dates } from './../../dist/src/dates/dates.js';

// const result1 = Dates
// 	.fromUnixTimestamp(1754038800000);

const result1 = Dates
	.now('Europe/Lisbon')
	.minus({ seconds: 30 });

const result2 = Dates
	.fromOperationalDate('20240101', 'Europe/Lisbon')
	.set({ hour: 4, minute: 0, second: 0 });

console.log('result1', result1);
console.log('------------------------------');
console.log('result2', result2);
