import moment from "moment-timezone";

export const generateInitialTimes = () => ({
  "Asia/Kolkata": moment().tz("Asia/Kolkata").format("HH:mm"),
  UTC: moment().tz("UTC").format("HH:mm"),
});

export const generateInitialTimezones = () => ({
  "Asia/Kolkata": "Asia/Kolkata",
  UTC: "UTC",
});

export const generateSliderMarks = () => {
  const marks = [];
  const numMarks = 25;
  const markSpacing = 1440 / (numMarks - 1);
  for (let i = 0; i < numMarks; i++) {
    const markPosition = i * markSpacing;
    marks.push(markPosition);
  }
  return marks;
};

export const generateTimeOptions = () => {
  const options = [];
  for (let i = 0; i < 96; i++) {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const time = moment()
      .startOf("day")
      .add(hour, "hours")
      .add(minute, "minutes")
      .format("h:mm A");
    options.push({
      value: `${hour}:${minute < 10 ? "0" : ""}${minute}`,
      label: time,
    });
  }
  return options;
};

export const getTimezoneAbbr = (zone) => moment.tz(zone).format("z");

export const getTimezoneOffset = (zone) => {
  const offset = moment.tz(zone).format("Z");
  return `GMT ${offset}`;
};
