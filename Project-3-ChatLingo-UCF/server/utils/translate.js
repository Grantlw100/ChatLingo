// translateUtils.js
const {Translate} = require('@google-cloud/translate').v2;

// Initialize the translation client with your API key
const translator = new Translate({
  key: `${process.env.GOOGLE_TRANSLATE_API_KEY}`,
});

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
