import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import CardsService from './cards-service';
import { CardsSchema } from './cards-schema';

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