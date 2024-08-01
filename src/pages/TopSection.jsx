import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  CalendarDays,
  CalendarClock,
  ArrowDownUp,
  Link2,
  Sun,
  Moon,
} from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

const TopSection = ({
  allTimezones,
  addNewTimezone,
  selectedDate,
  handleDateChange,
  reverseTimezones,
  isSharing,
  setIsSharing,
  isDark,
  setIsDark,
  selectedTimes,
  timezones,
}) => {
  const [includeTime, setIncludeTime] = React.useState(true);
  const [includeDate, setIncludeDate] = React.useState(true);

  const generateLink = () => {
    const baseUrl = `${window.location.origin}`;
    const params = new URLSearchParams();

    if (includeDate) {
      params.set("date", selectedDate.toISOString().split("T")[0]);
    }

    if (includeTime) {
      Object.keys(selectedTimes).forEach((zone) => {
        params.append("zones", zone);
        params.append("times", selectedTimes[zone]);
      });
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const handleGoogleCalendarClick = () => {
    const startTime = moment
      .tz(selectedDate.toISOString(), timezones[Object.keys(selectedTimes)[0]])
      .format("YYYYMMDDTHHmmssZ");
    const endTime = moment
      .tz(selectedDate.toISOString(), timezones[Object.keys(selectedTimes)[0]])
      .add(1, "hour")
      .format("YYYYMMDDTHHmmssZ"); // Assuming a 1-hour duration

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Event&dates=${startTime}/${endTime}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <>
      <h1 style={{ margin: "3vh 0", color: "gray" }}>Time Converter</h1>
      <div className="upper-row" id={isDark ? "dark-upper-row" : ""}>
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder={"Add Time Zone, City or Town"}
          isSearchable={true}
          name="timezone"
          options={allTimezones}
          onChange={addNewTimezone}
          styles={{
            container: (prev) => ({
              ...prev,
              width: "30vw",
              height: "5vh",
            }),
            valueContainer: (prev) => ({
              ...prev,
              width: "30vw",
              height: "6vh",
              borderRadius: "0.5vh 0 0 0.5vh",
              backgroundColor: isDark ? "#2c2f34ef" : "white",
            }),
            indicatorsContainer: (prev) => ({
              ...prev,
              borderRadius: "0 0.5vh 0.5vh 0",
              backgroundColor: isDark ? "#2c2f34ef" : "white",
            }),
          }}
        />
        <div className="date-container">
          <DatePicker
            className={isDark ? "date-picker dark-date-picker" : "date-picker"}
            id="date-picker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
          />
          <label
            className="calendar-box"
            htmlFor="date-picker"
            style={
              isDark
                ? { backgroundColor: "#2c2f34ef", borderRadius: "0 1vh 1vh 0" }
                : {}
            }
          >
            <CalendarDays />
          </label>
        </div>

        <div className="filter-container">
          <div onClick={handleGoogleCalendarClick}>
            <CalendarClock />
          </div>
          <div onClick={reverseTimezones}>
            <ArrowDownUp />
          </div>
          <div onClick={() => setIsSharing(!isSharing)}>
            <Link2 />
          </div>
          <div onClick={() => setIsDark((prev) => !prev)}>
            {isDark ? <Sun /> : <Moon />}
          </div>
        </div>
      </div>

      {isSharing && (
        <div className="link-row" id={isDark ? "dark-link-row" : ""}>
          <input
            className="link-input"
            type="text"
            value={generateLink()}
            readOnly
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex" }}>
              <input
                type="checkbox"
                checked={includeTime}
                onChange={() => setIncludeTime(!includeTime)}
              />
              <label>Include Time</label>
            </span>
            <span style={{ display: "flex" }}>
              <input
                type="checkbox"
                checked={includeDate}
                onChange={() => setIncludeDate(!includeDate)}
              />
              <label>Include Date</label>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TopSection;
