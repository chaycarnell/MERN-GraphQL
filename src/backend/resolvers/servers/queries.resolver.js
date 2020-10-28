const { pubsub, subscriptions } = require('../../pubsub/pubsub');

const resolver = {
  Query: {
    someUpdate: async (obj, args) => ({ status: 'ok' })
  },
  Subscription: {
    someUpdate: {
      subscribe: () => pubsub.asyncIterator([subscriptions.SOME_UPDATE])
    }
  }
};

exports.resolver = resolver;
