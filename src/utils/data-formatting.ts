export function numberShortened(x: number) {
  if (x >= 1000000000000) {
    return (x / 1000000000000).toFixed(2).replace(/\.0$/, "") + "T";
  }
  if (x >= 1000000000) {
    return (x / 1000000000).toFixed(2).replace(/\.0$/, "") + "B";
  }
  if (x >= 1000000) {
    return (x / 1000000).toFixed(2).replace(/\.0$/, "") + "M";
  }
  if (x >= 1000) {
    return (x / 1000).toFixed(2).replace(/\.0$/, "") + "K";
  }
  return x;
}

export function secondsToDays(x: number) {
  const days = Math.floor(x / 86400);
  const hours = Math.floor((x % 86400) / 3600);
  const minutes = Math.floor((x % 3600) / 60);
  const seconds = Math.floor(x % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export function formatNumberByDataType(value: number, datatype: string) {
  if (datatype === "money") {
    return `$${numberShortened(value)}`;
  }

  if (datatype === "number") {
    return numberShortened(value);
  }

  if (datatype === "time") {
    return `${secondsToDays(value)} days`;
  }

  return value;
}
