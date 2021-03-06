import { useContext, useEffect, useState } from "react";

import TvDataContext from "../../context/TvDataContext";

import { BsEnvelope } from "react-icons/bs";
import { BsClock } from "react-icons/bs";

import classes from "./ProgramItem.module.css";

const ProgramItem = ({
  notificId,
  reminderId,
  actualTime,
  startTime,
  endTime,
  title,
  filmUrl,
  start_ts,
  end_datetime,
  short_description
}) => {
  const { tvData, setTvData, csrf } = useContext(TvDataContext);
  const [notiStatus, setNotiStatus] = useState(false);
  const [remindStatus, setRemindStatus] = useState(false);
  const [hover, setHover] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const background =
    start_ts > Math.floor(new Date(actualTime).getTime() / 1000)
      ? "#fff"
      : "#f3f3f3";
  const widthCalc =
    (Math.floor(new Date(end_datetime).getTime() / 1000) - start_ts) / 12 +
    "px";

  const addCss = {
    minWidth: widthCalc,
    maxWidth: widthCalc,
    backgroundColor: background,
  };

  const popUpCss = {
    left: (widthCalc.replace('px', '') / 2 - 130) + "px"
  };

  const visible = {
    opacity: 1,
    pointerEvents: "all",
  };

  const notVisible = {
    opacity: 0,
    pointerEvents: "none",
  };

  const toggleHover = () => {
    setHover(!hover);
  };

  const togglePopUp = () => {
    setPopUp(!popUp);
  };

  const setNotiHandler = () => {
    if (notiStatus) {
      const filteredFavorite = tvData.notifications.filter(
        (removeId) => removeId !== notificId
      );
      setTvData((prevData) => ({
        ...prevData,
        notifications: filteredFavorite,
      }));
    } else {
      setTvData((prevData) => ({
        ...prevData,
        notifications: [...prevData.notifications, notificId],
      }));
    }
    setNotiStatus(!notiStatus);
    sendData(true);
  };
  const setRemindHandler = () => {
    if (remindStatus) {
      const filteredFavorite = tvData.reminders.filter(
        (removeId) => removeId !== reminderId
      );
      setTvData((prevData) => ({
        ...prevData,
        reminders: filteredFavorite,
      }));
    } else {
      setTvData((prevData) => ({
        ...prevData,
        reminders: [...prevData.reminders, reminderId],
      }));
    }
    setRemindStatus(!remindStatus);
    sendData(false);
  };

  const sendData = (select) => {
    let selector = "";
    let entity = "entity_id=";
    if (select) {
      selector = "notification-toggle";
      entity += notificId;
    } else {
      selector = "reminder-toggle";
      entity += reminderId;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/felhasznalo/portam/" + selector + "", true);
    xhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    xhttp.setRequestHeader("X-CSRF-Token", csrf);
    xhttp.send(entity);
  };

  useEffect(() => {
    if (tvData.notifications.includes(notificId)) {
      setNotiStatus(true);
    }

    if (tvData.reminders.includes(reminderId)) {
      setRemindStatus(true);
    }
  }, [tvData.notifications, tvData.reminders, notificId, reminderId]);

  return (
    <div
      onMouseLeave={togglePopUp}
      onMouseEnter={togglePopUp}
      className={classes.programHoverContainer}
    >
      <div className={`${classes.hoverInfoContainer} ${popUp ? classes.show : ""}`} style={popUpCss}>
        <span className={classes.title}>{title} <span className={classes.time}>{`(${startTime} - ${endTime})`}</span></span>
        
        <span className={classes.desc}>{short_description}</span>
      </div>
      <div
        onMouseLeave={toggleHover}
        onMouseEnter={toggleHover}
        className={classes.programItem}
        style={addCss}
      >
        <div className={classes.time}>
          {`${startTime} - ${endTime}`}
          <div className={classes.noti}>
            <BsEnvelope
              onClick={setNotiHandler}
              className={`${classes.envelope} ${
                notiStatus ? classes.active : ""
              }`}
              style={hover ? visible : notVisible}
              title="K??rek ??rtes??t??t"
            />
            <BsClock
              onClick={setRemindHandler}
              className={`${classes.clock} ${
                remindStatus ? classes.active : ""
              }`}
              style={hover ? visible : notVisible}
              title="Eml??keztet?? be??ll??t??sa"
            />
          </div>
        </div>
        <a href={filmUrl} className={classes.title}>
          {title}
        </a>
      </div>
    </div>
  );
};

export default ProgramItem;
