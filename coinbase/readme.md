# Coinbase Pro Integration

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|KEY           | KEY accepted values            | "xxxxx"      |
|SECRET           | KEY accepted values            | "xxxxx"      |
|PASSPHRASE           | KEY accepted values            | "xxxxx"      |


# Pre-requisites
- Install Latest [Node.js](https://nodejs.org/en/) version


# Getting started
- Install dependencies
```
>> cd coinbase
>> npm install
```
- Build and run the project
```
>> npm start
```


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **server.js**                 | Contains the server file to run websockets.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    