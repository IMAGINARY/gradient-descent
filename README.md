# web-tpl
Template project for websites and web apps.

Basic gulpfile with SASS, GULP and Babel/Browserify compilation of Javascript.

## How to use

**Don't fork, don't clone.**

0. Download the latest release and use it as basis for your new repository.
0. Modify package.json and set the first four items
    - name
    - version
    - description
    - repository
    - author
0. Modify `src/pug/config.json` setting the site name, description and URL.
0. Change this README file but keep the **Compiling** section below for reference. 

**Note:** This project does not use semver as future versions might evolve breaking backwards compatibility as new tools 
and standard practices are incorporated.

## Compilation

This website is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files. 

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
yarn
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```
  
- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```
