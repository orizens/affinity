import { AfEventsBinder } from './af-events-binder';

const findAfEvents = /(@[a-zA-Z]*)/;
const afTemplateEngine = (props, el) => {
  if (props.template !== undefined) {
    // replace events prefix @ with af-
    el.innerHTML = AfEventsBinder.afEvents.reduce(
      (html, afe) => html.replace(`@${afe}`, `data-af-${afe}`),
      props.template
    );
    // parse event handlers for element only
    AfEventsBinder.afEvents.forEach(afe => {
      const events = el.querySelectorAll(`[data-af-${afe}]`);
      events.forEach(node => {
        const handlerName = node.getAttribute(`data-af-${afe}`);
        AfEventsBinder.addEvent(node, afe, props[handlerName]);
      });
    });
  }
};

export const componentsRegistration = {
  ids: {},
  has(component) {
    return this.ids[component.def.tag] !== undefined;
  },
  register(component) {
    // save ref to components' function
    this.ids[component.def.tag] = component;
  },
  getComponent(tag) {
    return this.ids[tag];
  },
  getAll() {
    return Object.keys(this.ids);
  }
};
const afComponentRegistry = (view, el, comp) => {
  // apply custom components
  componentsRegistration.getAll().forEach(selector => {
    const nodes = el.querySelectorAll(selector);
    const _comp = componentsRegistration.getComponent(selector);
    nodes.forEach(node => {
      const allAttrs: any = Array(node.attributes.length);
      const attrs = allAttrs.fill(1, 0).reduce((acc, o, i) => {
        const { name, value } = node.attributes[i];
        const _value = view.hasOwnProperty(value) ? view[value] : value;
        return {
          ...acc,
          [name]: _value
        };
      }, {});
      node.replaceWith(_comp(attrs));
    });
  });
};
export const extensions = [
  // Template Compilation
  afTemplateEngine,
  // Component Registration
  afComponentRegistry
];
