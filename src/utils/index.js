import moment from 'moment';

export const DurationType = {
  DAYS: 'days',
  MONTHS: 'months'
}

export const duration = (date1, date2, type) => {
  if (type !== DurationType.MONTHS) {

    const startDate = date1.split('-');
    const endDate = date2.split('-');

    var a = moment([Number(startDate[0]), Number(startDate[1]), Number(startDate[2])]);
    var b = moment([Number(endDate[0]), Number(endDate[1]), Number(endDate[2])]);

    return b.diff(a, DurationType.DAYS);
  }

  const firstMonth = date1.substring(5,7);
  const firstYear = date1.substring(0,4);

  const lastMonth = date2.substring(5,7);
  const lastYear = date2.substring(0,4);

  const duration = Number(lastMonth) + 12*(Number(lastYear)-Number(firstYear)) - Number(firstMonth) + 1;

  return duration;
};
