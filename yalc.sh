#!/bin/bash

# For each package in the packages directory, add it to the YALC registry
for package in ./packages/*; do
    yalc push $package
done