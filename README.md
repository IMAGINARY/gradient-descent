# Gradient Descent
A game of learning the concepts behind gradient descent by exploring the depths looking for treasure.

Developed for the I AM AI exhibiton by IMAGINARY.
Original concept by Aaron Montag.

## Configuration

The `config.json` file is loaded when opening the application. It supports the following keys:

- **defaultLanguage** (string, default: en): Default language to use. Can be overriden by the 
  `lang` query string.
- **useGamepads** (boolean, default: true): Enables gamepad use.
- **useScreenControls** (boolean, default: true): Shows on-screen controllers.
- **maxPlayers** (integer, default: 2): Maximum number of players. If only using gamepads this 
  number is capped by the number of connected gamepads. Maximum: 4.
- **debugControls** (boolean, default: false): Shows debugging data for controls.

## Compilation

This web application is built using several compilable languages:

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

## Credits

Developed by Christian Stussak and Eric Londaits for IMAGINARY gGmbH.
Based on a prototype by Aaron Montag.

## License

Copyright (c) 2020 IMAGINARY gGmbH
Licensed under the MIT License (see LICENSE)
