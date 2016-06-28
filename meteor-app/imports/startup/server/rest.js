import bodyParser from 'body-parser';
import crypto from 'crypto';
import { Picker } from 'meteor/meteorhacks:picker';
import CardsService from '../../api/cards/cards-service';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

const verifyTrelloWebhookRequest = (request) => {
  const { token, callbackURL } = Meteor.settings.trello;

  const base64Digest = (s) => {
    return crypto.createHmac('sha1', token).update(s).digest('base64');
  };
  
  const content = JSON.stringify(request.body) + callbackURL;
  const doubleHash = base64Digest(base64Digest(content));
  const headerHash = base64Digest(request.headers['x-trello-webhook']);
  return doubleHash == headerHash;
};

const POST = Picker.filter((request) => {
  return request.method == 'POST';
});

POST.route('/webhooks', (params, request, response, next)  => {
  if (verifyTrelloWebhookRequest(request)) {
    const { action, model } = request.body;

    if (action.type = 'updateCard') {
      const updateQuery = {
        listId: model.idList,
        name: model.name
      };

      CardsService.update({ _id: model.id }, updateQuery);
    } 

    const res = {
      status: 'success'
    };
    response.end(JSON.stringify(res));
  } else {
    next();
  }
});
