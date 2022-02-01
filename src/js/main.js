/* globals IMAGINARY */
import GradientDescentGame from './game';

const defaultConfig = {
  defaultLanguage: 'en',
  useGamepads: true,
  useScreenControls: true,
  useKeyboardControls: true,
  botType: null,
  botTypeLabels: 'difficulty',
  maxPlayers: 2,
  maxTime: Number.POSITIVE_INFINITY,
  maxProbes: Number.POSITIVE_INFINITY,
  continuousGame: false,
  showSeaFloor: false,
  maxDepthTilt: 4,
  fullScreenButton: true,
  debugControls: false,
  map: null,
};

/**
 * Loads the config file from an external JSON file
 *
 * @param {String} uri
 * @return {Promise<any>}
 */
async function loadConfig(uri) {
  const response = await fetch(uri, {
    cache: 'no-store',
  });
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
 * Return the URL of the user-supplied config file or {null} if it is not present.
 *
 * A custom config file name can be provided via the 'config' query string variable.
 * Allowed file names must match the regex /^[A-Za-z0\-_.]+$/.
 *
 * @returns {URL|null} User-supplied config URL or {null} if not supplied.
 * @throws {Error} If the user-supplied config file name doesn't match the regex.
 */
function getCustomConfigUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (!urlSearchParams.has('config')) {
    return null;
  } else {
    const customConfigName = urlSearchParams.get('config');
    const whitelistRegex = /^[A-Za-z0-9\-_.]+$/;
    if (whitelistRegex.test(customConfigName)) {
      return new URL(customConfigName, window.location.href);
    } else {
      throw new Error(`Custom config path ${customConfigName} must match ${whitelistRegex.toString()}.`);
    }
  }
}

/**
 * Load config files and start the program
 */
(async function main() {
  try {
    const defaultConfigUrl = new URL('./config.json', window.location.href);
    const costumConfigUrl = getCustomConfigUrl();
    const configUrl = costumConfigUrl ? costumConfigUrl : defaultConfigUrl;
    const config = Object.assign({}, defaultConfig, await loadConfig(configUrl.href));

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
