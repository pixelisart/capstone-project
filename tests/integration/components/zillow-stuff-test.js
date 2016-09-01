import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('zillow-stuff', 'Integration | Component | zillow stuff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{zillow-stuff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#zillow-stuff}}
      template block text
    {{/zillow-stuff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
