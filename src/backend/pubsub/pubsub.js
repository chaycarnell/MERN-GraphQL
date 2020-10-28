const { RedisPubSub } = require('graphql-redis-subscriptions');
const redis = require('redis');
const subscriptions = require('./pubsub.subscriptions');

const urlSegments = new URL(process.env.REDIS);
const options = {
  url: process.env.REDIS,
  host: urlSegments.hostname,
  user: urlSegments.username,
  password: urlSegments.password,
  port: urlSegments.port
};

// Remove auth properties when using localhost Redis
if (!urlSegments.password) delete options.password;
if (!urlSegments.user) delete options.username;

const pubsub = new RedisPubSub({
  publisher: redis.createClient(options),
  subscriber: redis.createClient(options)
});

const publishSomeUpdate = () =>
  pubsub.publish(subscriptions.SOME_UPDATE, { someUpdate: { status: 'ok' } });

setInterval(() => publishSomeUpdate(), 5000);

module.exports = {
  pubsub,
  publishSomeUpdate,
  subscriptions
};
