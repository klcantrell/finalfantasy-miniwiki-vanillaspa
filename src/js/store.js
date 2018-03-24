export default function Store() {
  const characterData = {};
  return {
    isEmpty() {
      return Object.keys(characterData).length === 0;
    },

    hasCharacterSprite(character) {
      return characterData[character].hasOwnProperty('imgSrc');
    },

    populateData(data) {
      for (const prop in data) {
        characterData[prop] = data[prop];
      }
    },

    populateCharacterImgData(character, imgData) {
      characterData[character].imgSrc = imgData;
    },

    getCharacterData(character) {
      return characterData[character];
    }
  }
}
