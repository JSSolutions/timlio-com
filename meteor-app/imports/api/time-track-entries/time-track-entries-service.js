import { TimeTrackEntries } from './time-track-entries';
import { createService } from '../helpers';
import { Boards } from '../boards/boards';

const TimeTrackEntryService = Object.assign(createService(TimeTrackEntries), {
  timeByCard(userId) {
    const pipeline = [
      { $match: { userId }},
      { $project: { cardId: 1, timeSpent: { $subtract: ['$stopDate', '$startDate'] }}},
      {
        $lookup: {
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
  timeByBoard(start, end, userIds, boardIds) {
    const pipeline = [
      { $match: { _id: boardIds && boardIds.length ? { $in: boardIds } : { $exists: true }}},
      { 
        $lookup: {
          from: 'cards',
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      },
      { $unwind: '$cards' },
      { 
        $lookup: {
          from: 'timeTrackEntries',
          localField: 'cards._id',
          foreignField: 'cardId',
          as: 'timeTrackEntries'
        }
      },
      { $unwind: '$timeTrackEntries' },
      {
        $match: Object.assign({
          'timeTrackEntries.startDate': { $gte: start },
          'timeTrackEntries.stopDate': { $lt: end }
        }, { 'timeTrackEntries.userId': userIds && userIds.length ? { $in: userIds } : { $exists: true }})
      },
      { $project: { name: 1, timeSpent: { $subtract: ['$timeTrackEntries.stopDate', '$timeTrackEntries.startDate'] }}},
      { $group: { _id: '$_id', name: { $first: '$name' }, time: { $sum: '$timeSpent' }}}
    ];

    return Boards.aggregate(pipeline); 
  },
  timeByDay(start, end, userIds, boardIds) {
    const pipeline = [
      { 
        $match: Object.assign({
          startDate: { $gte: start },
          stopDate: { $lt: end }
        }, { userId: userIds && userIds.length ? { $in: userIds } : { $exists: true } })
      },
      { 
        $lookup: {
          from: 'cards',
          localField: 'cardId',
          foreignField: '_id',
          as: 'cards'
        }
      },
      { $unwind: '$cards' },
      {
        $lookup: {
          from: 'boards',
          localField: 'cards.boardId',
          foreignField: '_id',
          as: 'boards'
        }
      },
      { $unwind: '$boards' },
      { $match: { 'boards._id': boardIds && boardIds.length ? { $in: boardIds } : { $exists: true }}},
      { 
        $project: {
          day: { $dayOfMonth: '$startDate' },
          year: { $year: '$startDate' },
          month: { $month: '$startDate' },
          timeSpend: { $subtract: ['$stopDate', '$startDate']}
        }
      },
      { 
        $group: {
          _id: { day: '$day', year: '$year', month: '$month' },
          time: { $sum: '$timeSpend' }
        }
      },
      { 
        $project: {
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