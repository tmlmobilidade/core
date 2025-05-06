#!/bin/bash

# For each package in the packages directory, add it to the YALC registry
for package in ./packages/*; do
    if [ -d "$package" ] && [ -f "$package/package.json" ]; then
        yalc push "$package"
    fi
done