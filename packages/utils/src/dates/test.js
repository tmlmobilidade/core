import { Dates } from './../../dist/src/dates/dates.js';

// const result1 = Dates
// 	.fromUnixTimestamp(1754038800000);

const result1 = Dates
	.fromOperationalDate('20250715', 'Europe/Lisbon')
	.set({ hour: 12 });

const result2 = Dates
	.fromOperationalDate('20250715', 'Asia/Bangkok')
	.set({ hour: 12 });

console.log('result1', result1);
console.log('------------------------------');
console.log('result2', result2);
