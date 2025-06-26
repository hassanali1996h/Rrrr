// Arabic letter values mapping
const arabicValues = {
  'ا': 1,'آ':1,'ى':1,'ئ':6,'ؤ':5,'ب':9,'ت':11,'ث':0,'ج':0,'ح':0,'خ':0,'د':0,'ذ':0,'ر':0,'ز':0,'س':0,'ش':0,'ص':0,'ض':0,'ط':0,'ظ':0,'ع':12,'غ':0,'ف':0,'ق':14,'ك':0,'ل':0,'م':0,'ن':0,'ه':0,'و':0,'لا':0,'ئي':0
};

// English letter values mapping (approximation to Arabic equivalents)
const englishValues = {
  'A': 1,'B': 9,'C':0,'D':0,'E':1,'F':0,'G':0,'H':0,'I':1,'J':0,'K':0,'L':0,'M':0,'N':0,'O':0,'P':0,'Q':14,'R':0,'S':0,'T':11,'U':5,'V':0,'W':0,'X':0,'Y':6,'Z':0
};

// Analyze input text
document.getElementById('analyzeBtn').addEventListener('click', () => {
  const text = document.getElementById('inputText').value.trim();
  const words = text.split(/\s+/);
  let resultHTML = '';

  words.forEach(word => {
    let value = 0;
    // If English word in CMU dictionary, use phonemes (optional), else fallback
    if (window.cmuDict && cmuDict[word.toLowerCase()]) {
      // existing CMU-based logic...
      // For simplicity sum letter mapping of phonemes' first letters
      cmuDict[word.toLowerCase()].forEach(ph => {
        const letter = ph[0].toUpperCase();
        value += englishValues[letter] || 0;
      });
    } else {
      // fallback: letter-by-letter using englishValues or arabicValues
      for (let ch of word) {
        if (arabicValues[ch]) {
          value += arabicValues[ch];
        } else {
          const up = ch.toUpperCase();
          value += englishValues[up] || 0;
        }
      }
    }
    resultHTML += `<p><strong>${word}</strong>: ${value}</p>`;
  });

  document.getElementById('result').innerHTML = resultHTML;
});
