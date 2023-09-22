## Jest is an environnement to make some test 

## First the installation 

`npm install --save-dev jest`

## Second Initalisation of Jest

`npm init jest@latest`

### Response for now : 
   - yes
   - no 
   - node
   - yes
   - V8 (plutot back)
   - no

## script d'excecusion

```json
"scripts": {
    "dev": "npx nodemon --experimental-json-modules",
    "test": "NODE_OPTIONS=--experimental-vm-modules npx jest",
}
```