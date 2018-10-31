import { app, component } from './affinity';

export const AfCardComponent = ({ img = '', url = '', onGo, ...props }) =>
  component({
    tag: 'af-card',
    template: `
      <div class="card"
        @click="handleOnClick">
        <img class="card-img-top" src="${img}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="btn btn-primary">Go To ${url}</button>
        </div>
      </div>
    `,
    attrs: {
      class: 'custom-class-for-af-card'
    },
    handleOnClick(ev) {
      onGo(url);
    },
    afterAppend(el) {
      // dom some manipulations here - after dom appending
      // thirdParty.enhance(el)
    }
  });
