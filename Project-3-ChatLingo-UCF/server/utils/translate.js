// translateUtils.js
const {Translate} = require('@google-cloud/translate').v2;

// Initialize the translation client with your API key
const translator = new Translate({
  key: `${process.env.GOOGLE_TRANSLATE_API_KEY}`,
});

/**
 * Translates the given text to the target language.
 *
 * @param {string} text The original text to be translated.
 * @param {string} targetLang The target language code (e.g., 'es' for Spanish).
 * @returns {Promise<{originalText: string, translatedText: string}>} A promise that resolves with the original and translated text.
 */
async function translateText(text, targetLang) {
  try {
    const [translation] = await translator.translate(text, targetLang);
    return {
      originalText: text,
      translatedText: translation,
    };
  } catch (error) {
    console.error('Error during translation:', error);
    throw error;
  }
}

module.exports = { translateText };
