import { IComponentProps, IAffinityComponent } from './models';

/*
 Affinity (Case Study)
 =====================
 affinity is an attempt to create a simple component based library/framework (a la angular, react, vue, preact etc..)
 while using only es-latest and dom - no 3rd party
 
 tood features:
 1. change detection - how? where? when?
 2. property data binding - how (same as @cycle)
 3. test memory leaks = event listeners removal (how? internal store of all events in the app)
 4. store connect -> automatically invoke app render when change happens (how? connect(store)(app)

 @Copyright orizens.com
 @License MIT
*/
let affinity = {
  component: {},
  clean: {},
  app: {}
};
const cycles = ['afterAppend'];
export const component: IAffinityComponent = ({
  template = '',
  childs = [],
  tag = 'div',
  attrs = {},
  ...context
}: IComponentProps) => {
  // const target = document.createDocumentFragment();
  let el = document.createElement(tag);
  // append child nodes
  if (childs.length) {
    childs.forEach(child => el.append(child));
  }
  // append standard html attributes to the actual component's element
  if (attrs) {
    Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
  }
  // append template
  if (template !== '') {
    // replace events prefix @ with af-
    el.innerHTML = template.replace(/(@click)/gim, 'data-af-click');
    // parse event handlers for element only
    const events = el.querySelectorAll('[data-af-click]');
    events.forEach(node => {
      const handlerName = node.getAttribute('data-af-click');
      node.addEventListener('click', context[handlerName]);
    });
  }
  // apply life cycle hooks
  if (cycles.some(cy => context.hasOwnProperty(cy))) {
    cycles.forEach(cy => {
      if (context[cy]) {
        context[cy](el);
      }
    });
  }
  return el;
};

export const app = (target, node) => {
  clean(target);
  const $target = document.querySelector(target);
  $target.append(node);
  return $target;
};

const clean = target => {
  const parent = document.querySelector(target);
  if (parent.children.length) {
    Array(parent.children.length)
      .fill(0, 0)
      .map(i => parent.children[i])
      .forEach(child => child.remove());
  }
};
