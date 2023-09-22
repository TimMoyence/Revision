# How to install and configure the architecture of project 

## First the installation 

`npm install dotenv express pg winston`

`npm install --save-dev eslint`

## Second Initalisation of Eslint

`npm init @eslint/config`

### Response for now : 
  - To check syntax, find problems and enforce code style 
  - JavaScript modules (import/export)  => on doit rajouter type : "module", sous le main dans le packages json
  - none (pas de front)
  - No (pas typeScript)
  - Espace pour décocher Browser et espace pour cocher node
  - Use popular questions about your style 
  - AirBnb
  - Json (fichier config en JSON)
  - Yes
  - npm 


### Surcharge a mettre dans le fichier .eslintrc.json

```json
"rules": {
        "import/extensions": ["error", "always"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    }
```