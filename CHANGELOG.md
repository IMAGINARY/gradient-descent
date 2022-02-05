# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [1.5.2]

### Fixed

- Location of the treasure being visible to the attentive player

## [1.5.1]

### Fixed

- Loading of config files with digits in file name

## [1.5.0]

### Added

- Game start sequence

## [1.4.1]

### Added

- `reload` package for auto-reloading during development

### Changed

- Move water surface and sea floor towards the bottom of the screen

### Fixed

- Parallelism in `gulp build` and `gulp watch`

## [1.4.0] - 2020-12-03

### Added

- Add `botTypeLabels` config option for switching between different sets of labels
  (`difficulty`, `strategy`) in the bot type menu

## [1.3.0] - 2020-11-24

### Added

- Skip cache when fetching the config file.
- Add hashes to the precompiled CSS and JS filenames in order to avoid the cache.

## [1.2.1] - 2020-11-24

### Fixed

- Increased resource consumption every time the game mode is switched
- Faster water waves animation using SMIL
- Use same styling for light and dark modes

## [1.2.0] - 2020-11-19

### Added

- Set `maxDepthTilt` config option to tilt the sea floor generation towards shallow [0,1) or deep (
  1,∞)
- This change log

### Fixed

- Limit the treasure location to range of boat

## [1.1.1] - 2020-07-27

### Security

- Restrict possible config file names

## [1.1.0] - 2020-07-22

### Added

- Add `random`, `gradient-descent` and `tangent-intersection` bots
- Let first player also probe via <kbd>SPACE</kbd>
- Add `showSeaFloor` config option
- Add `game.showSeaFloor(animate)` method
- Print current sea floor map to console
- Allow to set sea floor map in config file
- Fullscreen toggle
- Improve tangent visibility
- Configure config file name via `config` URL query string
- Raise probe limit to 20
- Remember previous game settings

## [1.0.0] - 2020-06-09

### Added

- Initial game

[unreleased]: https://github.com/IMAGINARY/gradient-descent/compare/v1.5.2...HEAD

[1.5.2]: https://github.com/IMAGINARY/gradient-descent/compare/v1.5.2...v1.5.1

[1.5.1]: https://github.com/IMAGINARY/gradient-descent/compare/v1.5.1...v1.5.0

[1.5.0]: https://github.com/IMAGINARY/gradient-descent/compare/v1.5.0...v1.4.1

[1.4.1]: https://github.com/IMAGINARY/gradient-descent/compare/v1.4.1...v1.4.0

[1.4.0]: https://github.com/IMAGINARY/gradient-descent/compare/v1.4.0...v1.3.0

[1.3.0]: https://github.com/IMAGINARY/gradient-descent/compare/v1.3.0...v1.2.1

[1.2.1]: https://github.com/IMAGINARY/gradient-descent/compare/v1.2.1...v1.2.0

[1.2.0]: https://github.com/IMAGINARY/gradient-descent/compare/v1.2.0...v1.1.1

[1.1.1]: https://github.com/IMAGINARY/gradient-descent/compare/v1.1.1...v1.1.0

[1.1.0]: https://github.com/IMAGINARY/gradient-descent/compare/v1.1.0...v1.0.0

[1.0.0]: https://github.com/IMAGINARY/gradient-descent/tree/v1.0.0
