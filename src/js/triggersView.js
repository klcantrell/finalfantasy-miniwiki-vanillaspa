export default function TriggersView (eventBus) {
  const elsArray = [].slice.call(document.querySelectorAll('.js_load-content')),
        triggers = {};

  elsArray.forEach((el) => {
    const triggerName = el.getAttribute('routeTo');
    triggers[triggerName] = el;

    el.addEventListener('click', function(e) {
      e.preventDefault();
      eventBus.emit('routeChange', triggerName);
    });
  });

  return {
    addHighlight(triggerName) {
      triggers[triggerName].classList.add('activeTrigger');
    },

    removeHighlight(triggerName) {
      triggers[triggerName].classList.remove('activeTrigger');
    }
  }

}
