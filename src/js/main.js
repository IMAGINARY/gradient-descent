/* globals IMAGINARY */
import GradientDescentGame from './game';

async function fetchJson(uri) {
  const response = await fetch(uri, {
    cache: 'no-store',
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      return await response.json();
    } catch (e) {
      throw new Error(`Error parsing JSON file: ${e.message}`);
    }
  }
  throw new Error(`Server returned status ${response.status} (${response.statusText}) loading JSON file.`);
}

async function getDefaultConfig() {
  const defaultConfig = {
    defaultLanguage: 'en',
    languages: undefined, // fill in from tr.json
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
    languageButton: true,
    debugControls: false,
    map: null,
  };
  const tr = await fetchJson(new URL('tr.json', window.location.href));
  defaultConfig.languages = Object.keys(tr).sort();
  return defaultConfig;
}

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
function getConfigCustomUrl() {
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
    const configDefaultUrl = new URL('./config.json', window.location.href);
    const defaultConfigPromise = getDefaultConfig();
    const configCustomUrl = getConfigCustomUrl();
    const configUrl = configCustomUrl ?? configDefaultUrl;
    const configPromise = loadConfig(configUrl.href);
    const [defaultConfig, loadedConfig] = await Promise.all([defaultConfigPromise, configPromise]);
    const config = Object.assign({}, defaultConfig, loadedConfig);
    console.log("Default configuration:", defaultConfig);
    console.log("Loaded configuration:", loadedConfig);
    console.log("Merged configuration:", config);

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
