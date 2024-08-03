import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Slider from "react-slider";
import Select from "react-select";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SliderMarks,
  TimeOptions,
  TimezoneAbbr,
  TimezoneOffset,
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
  const timeOptions = TimeOptions();

  return (
    <div
      className={`relative border border-[rgb(147,147,147)] h-[25vh] mb-4 px-2 ${
        isDark ? "bg-[#2c2f34]" : ""
      }`}
      ref={setNodeRef}
      style={style}
    >
      <div className="h-[55%] flex items-center gap-4">
        <div
          className="cursor-grab select-none flex flex-col text-[rgb(161,155,155)]"
          {...listeners}
          {...attributes}
        >
          <GripVertical size={18} />
          <GripVertical size={18} />
          <GripVertical size={18} />
          <GripVertical size={18} />
        </div>
        <div className="text-gray-500 w-[60%] h-[80%] flex flex-col items-start justify-between">
          <h1 className={isDark ? "text-white" : "text-[rgb(63,63,63)]"}>
            {TimezoneAbbr(timezones[zone])}
          </h1>
          <p>{zone.replace(/-/g, "/")}</p>
        </div>
        <div className="flex flex-col h-[80%]">
          <Select
            className="time-picker"
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
                backgroundColor: isDark ? "#d4d4d5ee" : "white",
              }),
            }}
          />
          <span className="flex justify-between text-[rgba(158,147,147,0.805)]">
            <span>{TimezoneOffset(zone)}</span>
            <span>{formatDisplayDate(zone, localTime)}</span>
          </span>
        </div>
        <button
          className="absolute right-4 top-2 text-2xl text-[rgb(173,169,169)] bg-transparent outline-none border-none cursor-pointer"
          onClick={() => removeTimezone(zone)}
        >
          x
        </button>
      </div>
      <Slider
        className="time-slider w-full lg:h-[60px] flex items-center h-[80px] "
        thumbClassName="time-thumb border border-[rgb(104,104,104)] text-[rgb(158,157,157)] rounded-sm bg-[#f7f4f4] h-[30px] w-[35px] cursor-grab outline-none"
        trackClassName={`time-track h-[3.5vh] rounded-[0.5vh] ${
          isDark
            ? "bg-gradient-to-r from-[#5780b0] via-[#f9e7a6] to-[#5780b0]"
            : "bg-gradient-to-r from-[#577faf] via-[#ccf1f0] to-[#577faf]"
        }`}
        markClassName="time-mark bg-[rgb(113,110,110)] text-xs h-[20px] w-[2px]"
        marks={SliderMarks()}
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
        <div className="labels w-full h-[2vh] mt-[-2vh] text-[2vh] flex items-center justify-between text-gray-500">
          {SliderMarks()
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
