import { fetchData, fetchImg } from './utils';

export default function Controller(contentView, triggersView, store) {
  const cV = contentView,
        tV = triggersView,
        st = store;

  function getAllCharactersInfo() {
    return fetchData(require('../data/data.json'))
      .then((response) => {
        st.populateData(response);
      });
  }

  function getCharacterSprite(routeRule) {
    const spriteId = st.getCharacterData(routeRule).sprite;
    return fetchImg(require(`../imgs/${spriteId}`).src)
      .then((blob) => {
        st.populateCharacterImgData(routeRule, URL.createObjectURL(blob));
      })
  }

  return {
    render(route) {
      let charInfo;
      if (route.rule == '/') {
        cV.returnHome();
      } else if (st.isEmpty()) {
        getAllCharactersInfo()
          .then(() => {
            getCharacterSprite(route.rule)
              .then(() => {
                charInfo = st.getCharacterData(route.rule);
                cV.update(charInfo);
              })
          })
      } else if (!st.hasCharacterSprite(route.rule)) {
        getCharacterSprite(route.rule)
          .then(() => {
            charInfo = st.getCharacterData(route.rule);
            cV.update(charInfo);
          })
      } else {
        charInfo = st.getCharacterData(route.rule);
        cV.update(charInfo);
      }
    },

    activateTrigger(route) {
      if (route.rule !== '/') {
        tV.addHighlight(route.rule);  
      }
    },

    deactivateTrigger(route) {
      if (route.rule !== '/') {
        tV.removeHighlight(route.rule);
      }
    }
  }
}
