export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const formater = new Intl.DateTimeFormat("es-CO", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formater.format(date);
};
