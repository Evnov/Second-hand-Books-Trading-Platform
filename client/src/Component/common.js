export function getTime(timestamp){
    let d = new Date(timestamp);
    return `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`;
  }

export function getAlpha(num){
    return (num%26 + 9).toString(36).toUpperCase();
}