const { pubsub } = require('../../pubsub/pubsub');

const resolver = {
  Query: {
    someUpdate: async (obj, args) => ({ status: 'ok' })
  },
  Subscription: {
    someUpdate: {
      subscribe: () => pubsub.asyncIterator(['SOME_UPDATE'])
    }
  }
};

exports.resolver = resolver;
