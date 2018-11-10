import { component } from './affinity';

export const TitleComponent = component({
  tag: 'af-title',
  view({ title }) {
    return {
      template: `
      <h5 class="card-title">${title}</h5>
      `
    };
  }
});
