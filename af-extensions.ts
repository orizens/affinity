const afTemplateEngine = (props, el) => {
    if (props.template !== undefined) {
      // replace events prefix @ with af-
      el.innerHTML = props.template.replace(/(@click)/gim, 'data-af-click');
      // parse event handlers for element only
      const events = el.querySelectorAll('[data-af-click]')
      events.forEach(node => {
        const handlerName = node.getAttribute('data-af-click');
        node.addEventListener('click', props[handlerName]);
      });
    }
  };
const componentsRegistration = {
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
      const attrs = Array(node.attributes.length).fill(1, 0).reduce((acc, o, i) => {
        const { name, value } = node.attributes[i];
        const _value = view.hasOwnProperty(value) ? view[value] : value;
        return {
          ...acc,
          [name]: _value
        }
      }, {})
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
