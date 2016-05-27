import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
    const { trello } = Meteor.settings;

    ServiceConfiguration.configurations.upsert({ service: 'trello' }, {
        $set: {
            name: 'Timlio-com',
            consumerKey: trello.app_key,
            secret: trello.token,
            scope: ['read', 'write', 'account'],
            loginStyle: 'popup',
            expiration: 'never',
        },
    });

    Accounts.onCreateUser(function(options, user) {
        if (options.profile) {
            user.profile = options.profile;
            user.name = options.profile.name;
        }
        return user;
    });
});
