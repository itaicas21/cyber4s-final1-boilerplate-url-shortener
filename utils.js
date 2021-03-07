function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
function getSQLFormat() {
  const dt = new Date();
  const dtstring =
    dt.getFullYear() +
    "-" +
    pad2(dt.getMonth() + 1) +
    "-" +
    pad2(dt.getDate()) +
    " " +
    pad2(dt.getHours()) +
    ":" +
    pad2(dt.getMinutes()) +
    ":" +
    pad2(dt.getSeconds());
  return dtstring;
}

module.exports = { handleErrors, getSQLFormat };
