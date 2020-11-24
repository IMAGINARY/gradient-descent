const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const localizedStrings = require('./strings.json');

let lang = 'en';

function str(id) {
  if (localizedStrings[id] !== undefined && localizedStrings[id][lang] !== undefined) {
    return localizedStrings[id][lang];
  }
  return id;
}

function setLang(code) {
  lang = code;
}

function getLang() {
  return lang;
}

function pageTitle(title) {
  if (title === undefined) {
    return config.siteName;
  }
  return `${title} - ${config.siteName}`;
}

function url(aPath, absolute = false) {
  return `${absolute ? config.siteURL : ''}${config.basePath}${aPath}`;
}

function asset(filepath) {
  const revManifest = JSON.parse(fs.readFileSync('./pug/rev-manifest.json', 'utf8'));
  const parts = path.parse(filepath);
  return url(`${parts.base in revManifest ? path.join(parts.dir, revManifest[parts.base]) : filepath}`);
}

module.exports = {
  str,
  setLang,
  getLang,
  pageTitle,
  url,
  asset,
  config,
};
