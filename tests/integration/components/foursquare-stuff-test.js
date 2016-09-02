import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('foursquare-stuff', 'Integration | Component | foursquare stuff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{foursquare-stuff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#foursquare-stuff}}
      template block text
    {{/foursquare-stuff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
