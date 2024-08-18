export function DateFunction({ dateToFormate }) {
  if (!dateToFormate) {
    return "";
  }
  const date = new Date(dateToFormate);
  const formatedDate = date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatedDate;
}
