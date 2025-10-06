#!/usr/bin/env node

/* * */

import fs from 'node:fs';

/* * */

//
// Parse command-line arguments

const args = process.argv.slice(2);

const prefixArg = args.find(arg => arg.startsWith('--prefix='));
const prefix = prefixArg ? prefixArg.split('=')[1] : '';

const formatArg = args.find(arg => arg.startsWith('--format='));
const format = formatArg ? formatArg.split('=')[1] : '';

//
// Extract the package.json path (the first non-flag argument)

const packageJsonPathArg = args.find(arg => !arg.startsWith('--'));

if (!packageJsonPathArg) {
	console.error('✘ Error: No path to package.json provided.');
	process.exit(1);
}

//
// Read the package.json file

const packageJsonFile = fs.readFileSync(packageJsonPathArg, 'utf8');
const packageJsonData = JSON.parse(packageJsonFile);

//
// Generate the new version based on the current date and time

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

//
// Format the version string.
// For "default" format: [prefix]YYYYMMDD.HHMM.SS
// For "code" format: YYYYMMDDHHMMSS (as a single number, no prefix)

let futurePackageVersion = '';

if (!format || format === 'default') {
	futurePackageVersion = `${prefix}${year}${month}${day}.${hours}${minutes}.${seconds}`;
}

if (format === 'code') {
	futurePackageVersion = `${year}${month}${day}${hours}${minutes}${seconds}`;
}

//
// Update the package.json file with the new version
// and log the change to the console.

const currentPackageVersion = packageJsonData.version;

packageJsonData.version = futurePackageVersion;

fs.writeFileSync(packageJsonPathArg, JSON.stringify(packageJsonData, null, '\t'));

console.log(`✓ Package Version updated from "${currentPackageVersion}" to "${futurePackageVersion}".`);
