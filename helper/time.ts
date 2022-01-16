
export const formatHHMMSS = (secs: number): string => {
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor((secs - (hours * 3600)) / 60);
  let seconds = secs - (hours * 3600) - (minutes * 60);

  let hoursStr = (hours < 10) ? "0" + hours : hours.toString();
  let minutesStr = (minutes < 10) ? "0" + minutes : minutes.toString();
  let secondsStr = (seconds < 10) ? "0" + seconds : seconds.toString();

  if (secs > 3600) {
    return hoursStr + ':' + minutesStr + ':' + secondsStr;
  } else {
    return minutesStr + ':' + secondsStr;
  }
}