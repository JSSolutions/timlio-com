import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

const { trello } = Meteor.settings;

ServiceConfiguration.configurations.upsert({ service: 'trello' }, {
  $set: {
    name: 'Timlio-com',
    consumerKey: trello.app_key,
    secret: trello.token,
    scope: ['read', 'write', 'account'],
    loginStyle: 'popup',
    expiration: 'never'
  }
});


Accounts.registerLoginHandler('trello', function(params) {
  const data = params.trello;

  // If this isn't facebook login then we don't care about it. No need to proceed.
  if (!data) {
    return undefined;
  }

  // / The fields we care about (same as Meteor's)
  const whitelisted = [ 'id', 'email', 'confirmed', 'username', 'fullName',
    'bioData', 'bio', 'avatarSource', 'gravatarHash', 'avatarHast', 'url', 'memberType', 'initials',
    'idBoards', 'idOrganizations'];
  
  // Get our user's identifying information. This also checks if the accessToken
  // is valid. If not it will error out.
  const identity = getIdentity(data.appKey, data.authToken, whitelisted);

  // Build our actual data object.
  const serviceData = {
    key: data.appKey,
    token: data.authToken,
    expiresAt: (+new Date) + (1000 * data.expirationTime)
  };

  const fields = Object.assign({}, serviceData, identity);

  // Search for an existing user with that facebook id
  const existingUser = Meteor.users.findOne({ 'services.trello.id': identity.id });
  let userId;
  if (existingUser) {
    userId = existingUser._id;

    // Update our data to be in line with the latest from Facebook
    const prefixedData = {};
    _.each(fields, (val, key) => {
      prefixedData[`services.trello.${key}`] = val;
    });

    Meteor.users.update({ _id: userId }, {
      $set: prefixedData,
      $addToSet: { emails: { address: identity.email, verified: true } }
    });
  } else {
    // Create our user
    userId = Meteor.users.insert({
      services: {
        trello: fields
      },
      profile: {
        name: identity.fullName,
        fullName: identity.fullName,
        userName: identity.username
      },
      emails: [{
        address: identity.email,
        verified: true
      }]
    });
  }
  return { userId };
});

function getIdentity(key, token, fields) {
  try {
    return HTTP.get("https://api.trello.com/1/members/me", {
      params: {
        key,
        token,
        fields
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Trello. " + err.message),
      {response: err.response});
  }
}
