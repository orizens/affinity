import { IComponentProps, IAffinityComponent } from './models';
import { extensions, componentsRegistration } from './af-extensions';
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
/*
 Affinity
 ========
 affinity is an attempt to create a simple component based library/framework (a la angular, react, vue, preact etc..)
 while using only es-latest and dom - no 3rd party
 
 @Copyright orizens.com
 @License MIT
*/
const affinity = {
  component: null,
  clean: null,
  app: null,
  store: null,
  use: null
};
const cycles = ['afterAppend'];
// The lib

export const component = comp => {
  const render = (_comp, view) => {
    const { childs = [], attrs = {}, ...context } = view;
    const { tag = 'div' } = _comp;
    let el = document.createElement(tag);
    // append child nodes
    // if (childs.length) {
    //   childs.forEach(child => el.append(child));
    // }
    // append standard html attributes to the actual component's element
    // if (attrs) {
    //   Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
    // }
    // append template
    extensions.forEach(ext => ext(view, el, comp));
    // apply life cycle hooks
    if (cycles.some(cy => comp.hasOwnProperty(cy))) {
      cycles.forEach(cy => {
        if (context[cy]) {
          context[cy](el);
        }
      });
    }
    return el;
  };
  let product: any = props => {
    return render(comp, comp.view(props));
  };
  product.def = comp;
  return product;
};

export const app = (target, node) => {
  clean(target);
  const $target = document.querySelector(target);
  $target.append(node);
  return $target;
};

export const clean = target => {
  const parent = document.querySelector(target);
  if (parent.children.length) {
    Array(parent.children.length)
      .fill(0, 0)
      .map(i => parent.children[i])
      .forEach(child => child.remove());
  }
};
export const store = (store = {}) => {
  let render;
  return {
    ...store,
    dispatch(key, value) {
      store[key] = value;
      render();
    },
    select(key) {
      return store[key];
    },
    connect(_fn) {
      render = _fn;
      render();
    }
  };
};
export const use = component => {
  if (!componentsRegistration.has(component)) {
    componentsRegistration.register(component);
  }
};
affinity.component = component;
affinity.clean = clean;
affinity.app = app;
affinity.store = store;
affinity.use = use;
