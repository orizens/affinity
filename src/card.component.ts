import { component } from './affinity';

export const AfCardComponent = component({
  tag: 'af-card',
  view({ img = '', url = '', onGo, ...props }) {
    return {
      template: `
      <div class="card"
        @click="handleOnClick">
        <img class="card-img-bottom" src="${img}" alt="Card image cap">
        <div class="card-body">
          <af-title title="The Card Title"></af-title>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="btn btn-primary">Go To ${url}</button>
        </div>
      </div>
    `,
      handleOnClick(ev) {
        onGo(url);
      },
      onChange() {
        console.log('changed..');
      }
    };
  }
});
