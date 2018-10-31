// Import stylesheets
import './style.css';
import { app } from './affinity';
import { AfCardComponent } from './card.component';

// store is a simple object
const store = {
  img: 'https://via.placeholder.com/150',
  selected: false,
  url: 'http://orizens.com'
};
// currently writing event helpers outside app init
const onGo = ev => {
  store.url = ev;
  console.log('onGo...');
  render();
};
// app() is reusabble and can be binvoked mutiple times
const render = () =>
  app(
    '#app',
    AfCardComponent({
      img: store.img,
      url: store.url,
      onGo: onGo
    })
  );
render();
