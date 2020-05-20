const { Keystone } = require('@keystonejs/keystone');
const { KnexAdapter } = require('@keystonejs/adapter-knex');
const { Text } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const adapterConfig = {
  knexOptions: {
    connection: 'postgresql://postgres:pgpassword@localhost:5432/pokertest',
  },
}

const keystone = new Keystone({
  name: 'Player List',
  adapter: new KnexAdapter(adapterConfig),
});

keystone.createList('player', {
  schemaDoc: 'Player',
  fields: {
     avatar_url: { type: Text, isRequired: false }
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ enableDefaultRoute: true }),
  ],
};
