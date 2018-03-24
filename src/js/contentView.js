import characterTemplate from '../includes/characterInfo.pug';
import { html } from './utils';

export default function ContentView () {
  const el = document.querySelector('.js_character');

  return {
    update(characterInfo) {
      el.innerHTML = characterTemplate(characterInfo);
    },

    returnHome() {
      el.innerHTML = html`<h1 class="info__header">SELECT A CHARACTER<h1>`
    }
  }

}
