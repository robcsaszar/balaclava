export function numberShortened(x: number) {
  const trillion = 10e11;
  const billion = 10e8;
  const million = 10e5;
  const thousand = 10e2;

  if (x >= trillion) {
    if (x % trillion === 0) {
      x = x / trillion;
      return `${x}T`;
    }

    x = x / trillion;
    return `${x.toFixed(1)}T`;
  }

  if (x >= billion) {
    if (x % billion === 0) {
      x = x / billion;
      return `${x}B`;
    }

    x = x / billion;
    return `${x.toFixed(1)}B`;
  }

  if (x >= million) {
    if (x % million === 0) {
      x = x / million;
      return `${x}M`;
    }

    x = x / million;
    return `${x.toFixed(1)}M`;
  }

  if (x >= thousand) {
    if (x % thousand === 0) {
      x = x / thousand;
      return `${x}K`;
    }

    x = x / thousand;
    return `${x.toFixed(1)}K`;
  }

  if (x % 1 === 0) {
    return `${x}`;
  }

  return `${x.toFixed(2)}`;
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

  if (datatype === "liquid") {
    return `${numberShortened(value)} liters`;
  }

  return value;
}
