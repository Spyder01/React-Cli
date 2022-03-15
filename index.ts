#!/usr/bin/env node

import cli from './services/cli';


try {
cli(process.argv.slice(2));
} catch (error) {
console.log(error);
}
