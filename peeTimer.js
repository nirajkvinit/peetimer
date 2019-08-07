/**
 *
 * @param {*} effHours Effective Hours input as 'hh:mm'
 * @param {*} lastCheckin Last Checkin time input as 'hh:mm a'
 * @param minEffHours (Optional) Minimum effective hours needed by default it is 7 hours
 *
 * @returns Returns an object containing remainingTime and endTime as string
 */
const peeTimeCalculator = (effHours, lastCheckin, minEffHours = "7") => {
  if (!effHours) throw "Effective hours input is not provided";
  if (!lastCheckin) throw "Last check in time input is not provided";
  if (!minEffHours) throw "Minimum Effective hours input is not provided";

  let startTime = moment(lastCheckin, "hh:mma");
  if (effHours.includes(":")) {
    effHours = effHours.split(":");
    startTime
      .subtract(parseInt(effHours[0]), "hours")
      .subtract(parseInt(effHours[1]), "minutes");
  } else {
    startTime.subtract(parseInt(effHours), "hours");
  }

  let endTime = startTime.clone();
  if (minEffHours.includes(":")) {
    minEffHours = minEffHours.split(":");
    endTime
      .add(parseInt(minEffHours[0]), "hours")
      .add(parseInt(minEffHours[1]), "minutes");
  } else {
    endTime.add(parseInt(minEffHours), "hours");
  }

  let remainingTime = endTime.diff(moment(), "minutes");
  remainingTime =
    Math.floor(remainingTime / 60) +
    " hours " +
    (remainingTime % 60) +
    " minutes";
  return {
    remainingTime,
    endTime: endTime.format("hh:mm a")
  };
};

export default peeTimeCalculator;
