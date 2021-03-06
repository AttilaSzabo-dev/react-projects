import { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";
import AdFejlecCsik from "../ad-items/AdFejlecCsik";
import AdLB from "../ad-items/AdLB";
import AdRB from "../ad-items/AdRB";
import AdRich from "../ad-items/AdRich";

import classes from "./AllChannelMobile.module.css";

const AllChannelMobile = ({ initData, url, channelFilterUrl }) => {
  const [timeline, setTimeline] = useState([]);
  const [urlIndex, setUrlIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /* const timelineTimesHandler = () => {
    let startTime = [];
    let endTime = [];
    programsState.listToShow.forEach((item) => {
      item.channels.forEach((channel) => {
        if (channel !== "Virtual") {
          startTime.push(channel.programs[0].start_ts);
          endTime.push(
            Math.floor(
              new Date(
                channel.programs[channel.programs.length - 1].end_datetime
              ).getTime() / 1000
            )
          );
        }
      });
    });

    const minStart = Math.min(...startTime);
    const minStartMiliseconds = minStart * 1000;
    const startDateObject = new Date(minStartMiliseconds);
    //console.log("startDateObject: ", startDateObject);
    const startDateFormatHour = startDateObject.toLocaleString("hu-HU", {
      hour: "numeric",
    });
    const startDateFormatMinute = startDateObject.toLocaleString("hu-HU", {
      minute: "numeric",
    });

    const startDateFormatMinuteModulo = startDateFormatMinute % 30;
    const startDateFormatMinuteFinal =
      startDateFormatMinute - startDateFormatMinuteModulo;

    const newStartDate = startDateObject.setMinutes(startDateFormatMinuteFinal);

    //console.log("startDateObject: ", startDateObject);
    //console.log("newDate: ", newStartDate);

    // ------------------------------------------------------------------------

    const maxEnd = Math.max(...endTime);
    const maxEndMiliseconds = maxEnd * 1000;
    const endDateObject = new Date(maxEndMiliseconds);
    const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
      hour: "numeric",
    });
    const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
      minute: "numeric",
    });

    const endDateFormatMinuteModulo = endDateFormatMinute % 30;
    const endDateFormatMinuteFinal =
      endDateFormatMinute + endDateFormatMinuteModulo;

    const newEndDate = endDateObject.setMinutes(endDateFormatMinuteFinal);

    setTimelineTimes({
      startTimestamp: newStartDate,
      endTimestamp: newEndDate,
      startMinute: startDateFormatMinuteFinal,
      startHour: +startDateFormatHour,
      endMinute: endDateFormatMinuteFinal,
      endHour: +endDateFormatHour,
      firstProgramsStartTime: startTime,
    });
  }; */

  /* useEffect(() => {
    let incrementValue = timelineTimes.startTimestamp;
    setTimeline([]);

    do {
      const endDateObject = new Date(incrementValue);
      const endDateFormatHour = endDateObject.toLocaleString("hu-HU", {
        hour: "2-digit",
      });
      const endDateFormatMinute = endDateObject.toLocaleString("hu-HU", {
        minute: "2-digit",
        hour12: false,
      });

      if (endDateFormatHour !== "Invalid Date" || !isNaN(endDateFormatHour)) {
        setTimeline((prevTimeline) => {
          return [
            ...prevTimeline,
            { hour: endDateFormatHour, minute: endDateFormatMinute },
          ];
        });
      }

      incrementValue += 1800000;
    } while (incrementValue <= timelineTimes.endTimestamp - 1800000);
  }, [timelineTimes]); */

  //mi kell a mobileData-b??l: date(hogy tudjuk az aktu??lis id??t) / channelsb??l: id, logo, url / programsb??l: end_datetime, end_time, film_url, start_datetime, start_time, title

  const createListToShow = (data) => {
    let update = [];
    let today = data.date.replace("T", " ");
    const date = new Date(today);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("hu-HU");
    console.log("mobileData: ", data);
    console.log("mobileDataDateTS: ", unixTimestamp);
    console.log("mobileDataDataReverse: ", humanDateFormat);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${url[urlIndex]}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        createListToShow(data);
        setIsLoading(false);
      })
      .catch((error) => {
        //setError(error.message);
      });
  }, [urlIndex]);

  

  return (
    <div>
      {isLoading && <Spinner />}
      <header></header>
      <AdFejlecCsik />
      <AdLB/>
      <AdRich/>
      <AdRB/>
      <div>tartalom</div>
    </div>
  );
};

export default AllChannelMobile;
