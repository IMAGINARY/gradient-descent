# Gradient Descent

A game of learning the concepts behind gradient descent by exploring the depths looking for
treasure.

Developed for the I AM AI exhibiton by IMAGINARY.

## Configuration

A config file is loaded when opening the application. It supports the following keys:

- **defaultLanguage** (string, default: `"en"`): Default language to use. Can be overriden by the
  `lang` query string.
- **useGamepads** (boolean, default: `true`): Enables gamepad use.
- **useScreenControls** (boolean, default: `true`): Shows on-screen controllers.
- **useKeyboardControls** (boolean, default: `true`): Control the game via keyboard (player 1: <kbd>
  ←</kbd><kbd>↓</kbd><kbd>→</kbd> resp. <kbd>←</kbd><kbd>Space</kbd><kbd>→</kbd>, player 2: <kbd>
  A</kbd><kbd>S</kbd><kbd>D</kbd>).
- **botType** (`"none", "random", "gradient-descent", "tangent-intersection"` or `null`,
  default: `null`): Set the type of bot player to use. Let the user choose if `null`.
- **botTypeLabels** (`"difficulty"` or `"strategy"`, default: `"difficulty"`): Set the type of
  labels used to describe the bot type (`"difficulty"`: difficulty level, `"strategy"`: name of the
  bot strategy)
- **maxPlayers** (integer, default: 2): Maximum number of players (between 1 and 4).
- **maxTime** (integer or string `"Infinity"`, default: `"Infinity"`): Maximum number seconds until
  the game is over.
- **maxProbes** (integer or string `"Infinity"`, default: `"Infinity"`): Maximum number of probes
  until the game is over.
- **showSeaFloor** (boolean, default: `false`): Make the sea floor visible from the very beginning.
- **maxDepthTilt** (float >= 0, default: `4`): Tilt the sea floor generation towards shallow [0,1)
  or deep (1,∞).
- **map** (array or `null`, default: `null`): If `null`, auto-generate a map. Otherwise, use the
  supplied map. See [below](#setting-a-sea-floor-map) for details.
- **continuousGame** (boolean, default: `false`): Skip the title screen and time limit,
  auto-restart.
- **fullScreenButton** (boolean, default: `true`): Show a button to toggle full-screen mode.
- **debugControls** (boolean, default: `false`): Shows debugging data for controls.

By default, the config file `config.json` is used. However, this file name can be overwritten by
setting the `config` query string variable, e.g. `index.html?config=config.local.json`.

## Remote controlling the game

The game adds a `game` object to the global scope.

### Setting a sea floor map

A sea floor map is just an array of numbers between 0 (close to the water surface) and 1 (distant
from the water surface). The array is used to generate a polyline from the left side of the screen
to the right having equidistant nodes at the elements of the map array.

Maps can be set via `game.setMap(map)`, e.g. setting a very simple V-shaped map could look like
this:

```
game.setMap([0, 1, 0]);
```

A simple parabola-like map can be defined like so:

```
const parabola = t => 1 - Math.pow(2 * t - 1, 2);
const createMap = (distance, length) => Array.from(
  { length: length },
  (_, i) => distance(i / (length - 1))
);
game.setMap(createMap(parabola, 100));
```

Passing `null` as map will revert back to auto-generating a new map for every round of the game.

Whenever another game round is started, the current map will be output to the developer console of
the browser. This allows to store the current (possibly auto-generated) map elsewhere and re-use it
later.

Note that the map is only applied for new rounds of the game, not the current one.

### Setting the game mode

The game consists of the modes `title`, `numplayers` and `play`. You can switch to another mode or
re-enter the current mode via `game.setMode(mode)`. E.g. to load a map and play a new round of the
game, run

```
const map = ...;
game.setMap(map);
game.setMode('play');
```

### Showing the sea floor

If the game is in `play` mode, the sea floor of the current game round can be shown via
`game.showSeaFloor(animate)`. If `animate` is true, the sea floor will be uncovered slowly.
Otherwise, it will be shown immediately. This method has no effect in other game modes.

## Compilation

This web application is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files.

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line to install dependencies:

```
cd src
yarn
```

After the dependencies have been installed successfully, you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```

- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **dependencies (ES6)**
    ```
    gulp dependencies
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```
  respectively
    ```
    gulp build
    ```

- **watch for changes and recompile as needed**
    ```
    gulp build
    ```

Note that `gulp html` needs to be run after `gulp styles`, `gulp scripts` and `gulp dependencies`
since the html files need to be updated in order to point to the updated build artifacts.
`gulp build` will run all task in order and take care of `html`.

### Serving and automatic reloading

```
cd src
npx reload -d .. -w ../index.html -p [free port]
```

## Credits

Developed by Christian Stussak and Eric Londaits, based on a concept by Aaron Montag, IMAGINARY
gGmbH.

## License

Copyright (c) 2020 IMAGINARY gGmbH Licensed under the MIT License (see LICENSE)
