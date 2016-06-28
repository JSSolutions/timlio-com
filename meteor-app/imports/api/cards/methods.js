import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import CardsService from './cards-service';
import { CardsSchema } from './cards-schema';
import { IdSchema } from '../schemas';

export const insert = new ValidatedMethod({
  name: 'Cards.insert',
  
  validate: CardsSchema.validator(),
  
  run(doc) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot create a card'
      )
    }
    
    return CardsService.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'Cards.update',

  validate: IdSchema.validator(),

  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot update a card'
      )
    }

    return CardsService.update({ _id });
  }
});

export const remove = new ValidatedMethod({
  name: 'Cards.remove',
  
  validate: IdSchema.validator(),
  
  run({ _id }) {
    if (!this,userId) {
      throw new Meteor.Error(
        403, 'Unauthorized user cannot remove a card'
      )
    }
    
    return CardsService.remove({ _id });
  }
});