/* globals IMAGINARY */
import GradientDescentGame from './game';

const defaultConfig = {
  defaultLanguage: 'en',
  useGamepads: true,
  useScreenControls: true,
  maxPlayers: 2,
  maxTime: Number.POSITIVE_INFINITY,
  maxProbes: Number.POSITIVE_INFINITY,
  continuousGame: false,
  debugControls: false,
};

/**
 * Loads the config file from an external JSON file
 *
 * @param {String} uri
 * @return {Promise<any>}
 */
async function loadConfig(uri) {
  const response = await fetch(uri);
  if (response.status >= 200 && response.status < 300) {
    try {
      const config = await response.json();
      // Take into account the INFINITY is a valid value for maxTime and maxProbes
      const titleCase = s => (l => l.charAt(0).toUpperCase() + l.slice(1))(String(s).toLowerCase());
      if (Number(titleCase(config.maxTime)) === Number.POSITIVE_INFINITY)
        config.maxTime = Number.POSITIVE_INFINITY;
      if (Number(titleCase(config.maxProbes)) === Number.POSITIVE_INFINITY)
        config.maxProbes = Number.POSITIVE_INFINITY;
      return config;
    } catch (e) {
      throw new Error(`Error parsing config file: ${e.message}`);
    }
  }
  throw new Error(`Server returned status ${response.status} (${response.statusText}) loading config file.`);
}

/**
 * Load config files and start the program
 */
(async function main() {
  try {
    const config = Object.assign({}, defaultConfig, await loadConfig('./config.json'));
    await IMAGINARY.i18n.init({
      queryStringVariable: 'lang',
      translationsDirectory: 'tr',
      defaultLanguage: config.defaultLanguage || 'en',
    });
    // eslint-disable-next-line no-unused-vars
    const game = new GradientDescentGame(
      document.querySelector('.main'),
      config
    );
    window.game = game;
    await game.init();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}());
