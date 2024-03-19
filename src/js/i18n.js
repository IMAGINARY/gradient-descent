const I18N_KEY_DATA_ATTRIBUTE = 'i18n-key';
const I18N_KEY_ATTRIBUTE = `data-${I18N_KEY_DATA_ATTRIBUTE}`;
const I18N_KEY_SELECTOR = `*[${I18N_KEY_ATTRIBUTE}]`;

function localeInit(elem, ...keys) {
    const encodedKeys = keys.map(encodeURIComponent);
    const $elem = $(elem);
    $elem.attr(I18N_KEY_ATTRIBUTE, encodedKeys.join(","));
    localize(elem);
    return elem;
}

export default function localize(elems) {
    localizeFlat(elems);
    const $i18nElemsDescendants = $(elems).find(I18N_KEY_SELECTOR);
    localizeFlat($i18nElemsDescendants);
    return elems;
}

function localizeFlat(elems) {
    const $elems = $(elems);
    const $i18nElems = $elems.filter(I18N_KEY_SELECTOR);
    $i18nElems.each(function () {
        const $i18nElem = $(this);
        const encodedKeys = $i18nElem.attr(I18N_KEY_ATTRIBUTE).split(",");
        const keys = encodedKeys.map(decodeURIComponent);
        if (keys.length > 0) {
            const object = {[keys[0]]: IMAGINARY.i18n.t(keys[0])};
            const text = recursiveGet(object, ...keys) || '';
            $i18nElem.text(text);
        }
    })
    return elems;
}

function recursiveGet(object, key, ...otherKeys) {
    const value = object[key];
    if (otherKeys.length === 0) {
        return value;
    } else {
        return recursiveGet(value, ...otherKeys);
    }
}

export {
    I18N_KEY_DATA_ATTRIBUTE,
    I18N_KEY_ATTRIBUTE,
    localeInit,
    localize,
    localizeFlat,
}
