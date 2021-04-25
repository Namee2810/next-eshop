import { useEffect, useState } from 'react';
import fixNumber from "utils/fixNumber";

function useCountDown(props) {
  const { date, hour, minute, second } = props
  const [countDown, setCountDown] = useState({
    date,
    hour,
    minute,
    second,
  })
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      let { date, hour, minute, second } = countDown;
      if (second - 1 < 0) {
        second = 59;
        if (minute - 1 < 0) {
          minute = 59;
          if (hour - 1 < 0) {
            hour = 23;
            if (date - 1 < 0) clearInterval(countDownInterval);
            else date -= 1;
          }
          else hour -= 1;
        }
        else minute -= 1;
      }
      else second -= 1;
      setCountDown({
        date: fixNumber(date),
        hour: fixNumber(hour),
        minute: fixNumber(minute),
        second: fixNumber(second)
      })
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    }
  }, [countDown])

  return countDown;
}

export default useCountDown;