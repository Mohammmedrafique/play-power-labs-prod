import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Slider from "react-slider";
import Select from "react-select";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  generateSliderMarks,
  generateTimeOptions,
  getTimezoneAbbr,
  getTimezoneOffset,
} from "./utils";

const TimezoneCard = ({
  zone,
  time,
  selectedDate,
  handleTimeChange,
  removeTimezone,
  timezones,
  isDark,
}) => {
  const [localTime, setLocalTime] = useState(
    moment.duration(time, "HH:mm").asMinutes()
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: zone });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleSliderChange = (value) => {
    setLocalTime(value);
  };

  const handleSliderChangeComplete = (value) => {
    handleTimeChange(zone, value);
  };

  const handleTimeSelectChange = (selectedOption) => {
    setLocalTime(moment.duration(selectedOption.value).asMinutes());
    handleTimeChange(zone, moment.duration(selectedOption.value).asMinutes());
  };

  useEffect(() => {
    setLocalTime(moment.duration(time, "HH:mm").asMinutes());
  }, [time]);

  const formatDisplayTime = (zone, minutes) => {
    const updatedDateTime = moment(selectedDate)
      .startOf("day")
      .add(minutes, "minutes")
      .format("YYYY-MM-DD HH:mm");
    return moment.tz(updatedDateTime, timezones[zone]).format("h:mm A");
  };

  const formatDisplayDate = (zone, minutes) => {
    const updatedDateTime = moment(selectedDate)
      .startOf("day")
      .add(minutes, "minutes")
      .format("YYYY-MM-DD HH:mm");
    return moment.tz(updatedDateTime, timezones[zone]).format("ddd D, MMMM");
  };

  const labels = ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM"];
  const timeOptions = generateTimeOptions();

  return (
    <div
      className={"zone-container"}
      id={isDark && "dark-zone-container"}
      ref={setNodeRef}
      style={style}
    >
      <div className="zone-upper-row">
        <div className="drag-button" {...listeners} {...attributes}>
          <GripVertical size={18} />
          <GripVertical size={18} />
          <GripVertical size={18} />
          <GripVertical size={18} />
        </div>
        <div className="zone-left-box">
          <h1 style={isDark ? { color: "white" } : {}}>
            {getTimezoneAbbr(timezones[zone])}
          </h1>
          <p>{zone.replace(/-/g, "/")}</p>
        </div>
        <div className="zone-right-box">
          <Select
            className={"time-picker"}
            classNamePrefix="select"
            placeholder={formatDisplayTime(zone, localTime)}
            value={timeOptions.find(
              (option) =>
                moment.duration(option.value).asMinutes() === localTime
            )}
            options={timeOptions}
            onChange={handleTimeSelectChange}
            styles={{
              indicatorsContainer: () => ({ display: "none" }),
              container: (prev) => ({
                ...prev,
                width: "15vw",
                height: "8vh",
              }),
              placeholder: (prev) => ({
                ...prev,
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: isDark ? "white" : "black",
              }),
              valueContainer: (prev) => ({
                ...prev,
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderRadius: "0.5vh",
                color: isDark ? "white" : "black",
                backgroundColor: isDark ? "#2c2f34ef" : "white",
              }),
            }}
          />
          <span>
            <span>{getTimezoneOffset(zone)}</span>
            <span>{formatDisplayDate(zone, localTime)}</span>
          </span>
        </div>
        <button className="remove" onClick={() => removeTimezone(zone)}>
          x
        </button>
      </div>
      <Slider
        className="time-slider"
        thumbClassName="time-thumb"
        trackClassName={isDark ? "time-track dark-time-track" : "time-track"}
        markClassName="time-mark"
        marks={generateSliderMarks()}
        min={0}
        max={1440}
        step={15}
        value={localTime}
        onChange={handleSliderChange}
        onAfterChange={handleSliderChangeComplete}
        renderThumb={(props, state) => <div {...props}>||</div>}
        renderMark={(props) => <span {...props} />}
      />
      {labels && (
        <div className="labels">
          {generateSliderMarks()
            .filter((mark, index) => mark % 180 === 0)
            .map((mark, index) => (
              <div key={mark}>{labels[index]}</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TimezoneCard;
