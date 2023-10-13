import {
  differenceInMilliseconds,
  format,
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from "date-fns";

export const Format_HH_mm_ss = (date: string) => {
  const newDate = new Date(date);
  // console.log("Old date: ", date);
  // console.log("New date: ", newDate);

  const time = format(newDate, "HH:mm:ss");
  const hours = getHours(newDate),
    minutes = getMinutes(newDate),
    seconds = getSeconds(newDate);
  return {
    time,
    hours,
    minutes,
    seconds,
  };
};

export const Format_YYYY_MM_DD = (date: string) => {
  const newDate = new Date(date);
  // console.log("Old date: ", date);
  // console.log("New date: ", newDate);

  const time = format(newDate, "yyyy-MM-dd");
  const years = getYear(newDate),
    months = getMonth(newDate) + 1,
    days = getDate(newDate);

  return {
    time,
    years,
    months,
    days,
  };
};

export const Format_YYYY_MM_DD_HH_mm_ss = (date: string) => {
  const newDate = new Date(date);
  // console.log("Old date: ", date);
  // console.log("New date: ", newDate);

  const time = format(newDate, "yyyy-MM-dd HH:mm:ss");
  const years = getYear(newDate),
    months = getMonth(newDate) + 1,
    days = getDate(newDate),
    hours = getHours(newDate),
    minutes = getMinutes(newDate),
    seconds = getSeconds(newDate);

  return {
    time,
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const compareTime = (a: string, b: string): number => {
  const newA = new Date(a),
    newB = new Date(b);
  const yA = getYear(newA),
    yB = getYear(newB);
  if (yA == yB) {
    const mA = getMonth(newA),
      mB = getMonth(newB);
    if (mA == mB) {
      const dA = getDate(newA),
        dB = getDate(newB);
      if (dA == dB) {
        const hA = getHours(newA),
          hB = getHours(newB);
        if (hA == hB) {
          const MA = getMinutes(newA),
            MB = getMinutes(newB);
          if (MA == MB) {
            const sA = getSeconds(newA),
              sB = getSeconds(newB);
            if (sA == sB) {
              return 0;
            }
            return sA - sB;
          }
          return MA - MB;
        }
        return hA - hB;
      }
      return dA - dB;
    }
    return mA - mB;
  }
  return yA - yB;
};

export const differenceBetweenTwoTime = (a: string, b: string) => {
  const startTime = new Date(a),
    endTime = new Date(b);
  const timeDiff = differenceInMilliseconds(endTime, startTime);
  const hoursDiff = Math.floor(timeDiff / (60 * 60 * 1000));
  const minutesDiff = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
  return { hours: hoursDiff, minutes: minutesDiff };
};
