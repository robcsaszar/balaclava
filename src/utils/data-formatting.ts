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
  return x.toFixed(2);
}

export function secondsToDays(x: number) {
  const days = Math.floor(x / 86400);
  const hours = Math.floor((x % 86400) / 3600);

  return `${days}d ${hours}h`;
}

export function formatNumberByDataType(value: number, datatype: string) {
  if (value === null || value === undefined || value === 0) {
    return "-";
  }

  if (datatype === "percentage") {
    if (typeof value === "string") {
      return `${value}%`;
    }

    value = value * 100;
    return `${value.toFixed(2)}%`;
  }

  if (datatype === "money") {
    return `$${numberShortened(value)}`;
  }

  if (datatype === "number") {
    return numberShortened(value);
  }

  if (datatype === "time") {
    return `${secondsToDays(value)}`;
  }

  if (datatype === "blood") {
    return `${numberShortened(value)} liters`;
  }

  return value;
}
