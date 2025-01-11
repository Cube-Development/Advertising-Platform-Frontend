export const formatToNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

export const formatFullDate = (event: React.ChangeEvent<HTMLInputElement>) => {
  let value = event.target.value.replace(/[^0-9]/g, "");
  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  let formattedValue = value;
  if (value.length >= 3) {
    formattedValue = `${value.slice(0, 2)}.${value.slice(2)}`;
  }
  if (value.length >= 5) {
    formattedValue = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
  }

  event.target.value = formattedValue;
};

export const formatCardDate = (event: React.ChangeEvent<HTMLInputElement>) => {
  let value = event.target.value.replace(/[^0-9]/g, "");
  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  let formattedValue = value;
  if (value.length >= 3) {
    formattedValue = `${value.slice(0, 2)}/${value.slice(2)}`;
  }

  event.target.value = formattedValue;
};
