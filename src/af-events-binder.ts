const afEvents = ['click', 'change'];
enum EventDatasetAttr {
  EV_ID = 'data-ev-id'
}
interface IEventsRegistry {
  [key: string]: {
    name: string;
    func: Function;
  };
}
const eventsRegistry: IEventsRegistry = {};
const addEvent = (el, evName, func) => {
  const id = Math.random() * 100000000;
  const evId = el.getAttribute(EventDatasetAttr.EV_ID);
  let allEventsIds = `${id}`;
  if (evId) {
    allEventsIds = `${allEventsIds},${evId}`;
  }
  el.setAttribute(EventDatasetAttr.EV_ID, allEventsIds);
  eventsRegistry[id] = { name: evName, func };
  el.addEventListener(evName, eventsRegistry[id].func);
};
const clearEvent = (el, eventId) => {
  el.removeEventListener(
    eventsRegistry[eventId].name,
    eventsRegistry[eventId].func
  );
  eventsRegistry[eventId].func = null;
  eventsRegistry[eventId].name = null;
  eventsRegistry[eventId] = null;
  delete eventsRegistry[eventId];
};
const clearAllEvents = el => {
  const evId = el.getAttribute(EventDatasetAttr.EV_ID);
  if (evId) {
    evId.split(',').forEach(eid => clearEvent(el, eid));
  }
  el.removeAttribute(EventDatasetAttr.EV_ID);
};

export const AfEventsBinder = {
  addEvent,
  clearEvent,
  clearAllEvents,
  afEvents
};
