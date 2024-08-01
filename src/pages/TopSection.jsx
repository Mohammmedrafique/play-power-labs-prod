// import React from "react";
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import { CalendarDays, CalendarClock, ArrowDownUp, Link2, Sun, Moon } from "lucide-react";
// import "react-datepicker/dist/react-datepicker.css";
// const TopSection = ({
//   allTimezones,
//   addNewTimezone,
//   selectedDate,
//   handleDateChange,
//   reverseTimezones,
//   isSharing,
//   setIsSharing,
//   isDark,
//   setIsDark
// }) => {
//   return (
//     <>
//       <h1 style={{ margin: "3vh 0", color: "gray" }}>Time Converter</h1>
//       <div className="upper-row" id={isDark && "dark-upper-row"}>
//         <Select
//           className="basic-single"
//           classNamePrefix="select"
//           placeholder={"Add Time Zone, City or Town"}
//           isSearchable={true}
//           name="timezone"
//           options={allTimezones}
//           onChange={addNewTimezone}
//           styles={{
//             container: (prev) => ({
//               ...prev,
//               width: "30vw",
//               height: "5vh",
//             }),
//             valueContainer: (prev) => ({
//               ...prev,
//               width: "30vw",
//               height: "6vh",
//               borderRadius: "0.5vh 0 0 0.5vh",
//               backgroundColor: isDark ? "#2c2f34ef" : "white",
//             }),
//             indicatorsContainer: (prev) => ({
//               ...prev,
//               borderRadius: "0 0.5vh 0.5vh 0",
//               backgroundColor: isDark ? "#2c2f34ef" : "white",
//             }),
//           }}
//         />
//         <div className="date-container">
//           <DatePicker
//             className={isDark ? "date-picker dark-date-picker" : "date-picker"}
//             id="date-picker"
//             selected={selectedDate}
//             onChange={handleDateChange}
//             dateFormat="MMMM d, yyyy"
//           />
//           <label
//             className="calendar-box"
//             htmlFor="date-picker"
//             style={
//               isDark
//                 ? { backgroundColor: "#2c2f34ef", borderRadius: "0 1vh 1vh 0" }
//                 : {}
//             }
//           >
//             <CalendarDays />
//           </label>
//         </div>

//         <div className="filter-container">
//           <div>
//             <CalendarClock />
//           </div>
//           <div onClick={reverseTimezones}>
//             <ArrowDownUp />
//           </div>
//           <div onClick={() => setIsSharing(!isSharing)}>
//             <Link2 />
//           </div>
//           <div onClick={() => setIsDark((prev) => !prev)}>
//             {isDark ? <Sun /> : <Moon />}
//           </div>
//         </div>
//       </div>

//       {isSharing && (
//         <div className="link-row" id={isDark && "dark-link-row"}>
//           <input
//             className="link-input"
//             type="text"
//             value={`https://localhost:5173/?time=&date=`}
//           />
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               alignItems: "center",
//             }}
//           >
//             <span style={{ display: "flex" }}>
//               <input type="checkbox" name="time" id="time" />
//               <label htmlFor="time">Include Time</label>
//               <input type="time" name="" id="" />
//             </span>
//             <span style={{ display: "flex" }}>
//               <input type="checkbox" name="date" id="date" />
//               <label htmlFor="date">Include Date</label>
//               <input type="date" name="" id="" />
//             </span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TopSection;
import React, { useState } from "react";
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
  const generateLink = () => {
    const params = new URLSearchParams();
    params.set("date", selectedDate.toISOString().split("T")[0]);
    Object.keys(selectedTimes).forEach((zone) => {
      params.append("zones", zone);
      params.append("times", selectedTimes[zone]);
    });
    return `${window.location.origin}?${params.toString()}`;
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
          <div>
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
        </div>
      )}
    </>
  );
};

export default TopSection;
