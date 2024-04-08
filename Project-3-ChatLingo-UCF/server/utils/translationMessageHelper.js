async function lang2lang(senderLanguage, receiverLanguage) {
    let translation = `Translated from ${senderLang} to ${receiverLang}: ${originalContent}`;
    return translation;
  }
  
  module.exports = {
    lang2lang,
  };
  