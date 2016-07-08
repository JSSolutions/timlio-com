import { TimeTrackEntries } from './time-track-entries';
import { createService } from '../helpers';
import { Boards } from '../boards/boards';

const TimeTrackEntryService = Object.assign(createService(TimeTrackEntries), {
  timeOnCards(userId) {
    const pipeline = [
      { $match: { userId }},
      { $project: { cardId: 1, timeSpent: { $subtract: ['$stopDate', '$startDate'] }}},
      { $lookup: {
          from: 'cards',
          localField: 'cardId',
          foreignField: '_id',
          as: 'card'
        }
      },
      { $unwind: '$card' },
      { $group: { _id: '$cardId', name: { $first: '$card.name' }, time: { $sum: '$timeSpent' }}}
    ];

    return this.collection.aggregate(pipeline);
  },
  timeOnBoards(userId) {
    const pipeline = [
      { $lookup: {
          from: 'cards',
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      },
      { $unwind: '$cards' },
      { $lookup: {
          from: 'timeTrackEntries',
          localField: 'cards._id',
          foreignField: 'cardId',
          as: 'timeTrackEntries'
        }
      },
      { $unwind: '$timeTrackEntries' },
      { $match: { 'timeTrackEntries.userId': userId }},
      { $project: { name: 1, timeSpent: { $subtract: ['$timeTrackEntries.stopDate', '$timeTrackEntries.startDate'] }}},
      { $group: { _id: '$_id', name: { $first: '$name' }, time: { $sum: '$timeSpent' }}}
    ];

    return Boards.aggregate(pipeline); 
  },
  betweenDates(start, end, userId) {
    const pipeline = [
      { $match: {
          userId,
          startDate: { $gte: start },
          stopDate: { $lt: end }
        }
      },
      { $project: {
          day: { $dayOfMonth: '$startDate' },
          year: { $year: '$startDate' },
          month: { $month: '$startDate' },
          timeSpent: { $subtract: ['$stopDate', '$startDate'] }
        }
      },
      { $group: {
          _id: { day: '$day', year: '$year', month: '$month' },
          time: { $sum: '$timeSpent' }
        }
      },
      { $project: {
          _id: 0,
          day: '$_id.day', 
          year: '$_id.year', 
          month: '$_id.month',
          time: 1
        }
      }
    ];
    
    return this.collection.aggregate(pipeline);
  }
});

export default TimeTrackEntryService;