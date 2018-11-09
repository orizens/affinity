const afEvents = ['click', 'change'];
interface IEventsRegistry {
  [key: string]: {
    name: string;
    func: Function;
  };
}
const eventsRegistry = {};
const addEvent = (el, evName, func) => {
  const id = Math.random() * 100000000;
  const evId = el.getAttribute('data-ev-id');
  let ids = '';
  if (evId) {
    ids = `${ids},${evId}`;
  }
  el.setAttribute('data-evId', ids);
  eventsRegistry[ids] = { name: evName, func };
  el.addEventListener(evName, eventsRegistry[ids]);
};
const clearEvent = (el, eventId) => {
  el.removeEventListener(
    eventsRegistry[eventId].name,
    eventsRegistry[eventId].func
  );
  eventsRegistry[eventId].func = null;
  eventsRegistry[eventId].name = null;
  eventsRegistry[eventId] = null;
};
const clearAllEvents = el => {
  const evId = el.getAttribute('data-ev-id');
  if (evId) {
    evId.split(',').forEach(eid => clearEvent(el, eid));
  }
  el.removeAttribute('data-ev-id');
};

export const AfEventsBinder = {
  addEvent,
  clearEvent,
  clearAllEvents,
  afEvents
};
