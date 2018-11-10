import { app, use, store } from './affinity';
import { AfCardComponent } from './card.component';
import { TitleComponent } from './title.component';

// first - declare which components are included in the app
[AfCardComponent, TitleComponent].forEach(component => use(component));

// store is a simple object
const state = store({
  img: 'https://via.placeholder.com/150',
  selected: false,
  url: 'http://orizens.com'
});

// currently writing event helpers outside app init
const onGo = ev => {
  state.dispatch('url', ev);
  console.log('onGo...');
  render();
};
// app() is reusabble and can be binvoked mutiple times
const render = () =>
  app(
    '#app',
    AfCardComponent({
      img: state.select('img'),
      url: state.select('url'),
      onGo: onGo
    })
  );
state.connect(render);
