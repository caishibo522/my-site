export default function (time,deep=false) {
  const date = new Date(+time);
  const month = (date.getMonth() + 1).toString().padStart(2,'0');
  const day = date.getDay().toString().padStart(2,'0');
  if(deep) {
    const h = date.getHours().toString().padStart(2,'0');
    const m = date.getMinutes().toString().padStart(2,'0');
    const s = date.getSeconds().toString().padStart(2,'0');
    return `${date.getFullYear()}-${month}-${day}:${h}:${m}:${s}`
  }
  return `${date.getFullYear()}-${month}-${day}`
}