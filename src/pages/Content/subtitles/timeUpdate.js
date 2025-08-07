export default function timeUpdate(subs, video, pos, setPos) {
  if (subs && subs.length > 1) {
    const disney = window.location.hostname === 'www.disneyplus.com';
    let time = 0;
    if (disney) {
      // Disney+ uses a different way to get the current time
      time = Number(Number(document.querySelector("div[class='slider-container']").ariaValueNow).toFixed(3));
    } else {
      // For all other sites we can use the video element's currentTime
      time = Number(video.currentTime.toFixed(3));
    }
    // See if it's the next or previous position.
    if (
      subs[pos] &&
      subs[pos + 1] &&
      time >= subs[pos].start &&
      time < subs[pos + 1].start
    ) {
      // Don't do anything. "pos" is correct
    } else if (
      subs[pos + 1] &&
      subs[pos + 2] &&
      time >= subs[pos + 1].start &&
      time < subs[pos + 2].start
    ) {
      setPos(pos + 1);
    } else if (
      subs[pos - 1] &&
      time >= subs[pos - 1].start &&
      time < subs[pos].start
    ) {
      setPos(pos - 1);
    } else {
      // Look through the whole array to find the correct position
      const newPos = subs.findIndex((el) => el.start > time);
      // If a match was found update "pos"
      if (newPos > 0) {
        setPos(newPos - 1);
      } else {
        if (time < 200) {
          setPos(0);
        } else {
          setPos(subs.length - 1);
        }
      }
    }
  }
}
