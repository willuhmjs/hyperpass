const getBarLength = () => {
  let barLength = new URLSearchParams(location.search).get("length") || setBarLength();
  if (barLength > 200 || barLength < 2) {
    setBarLength();
    return getBarLength();
  }
  return parseInt(barLength);
};

const setBarLength = (length = 12) => {
  window.history.replaceState(null, null, `?length=${length}`);
  return length;
};

const generatePassword = (length) => {
  if (length > 200) length = 200;
  if (length < 2) length = 2;
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()/.,;'[]=-_+{}":'><?|~\``.split("").sort((a, b) => 0.5 - Math.random());
  const generateRandomValues = (max) => crypto.getRandomValues(new Uint8Array(1000)).map((int) => int * (max / 255));
  // => true
  const vals = generateRandomValues(chars.length - 1);

  let end = "";
  for (let i = 0; i < length; i++) {
    end += chars[vals[i]];
  }
  return end;
};

// generate a password when the page loads
$(document).ready(() => {
  const loadBarLength = getBarLength();
  $("#passwordLength").val(loadBarLength);
  $("#lengthLabel").text(`${loadBarLength} characters`);
  $("#password").val(generatePassword(loadBarLength));

  /* toggle visibility -- feature disabled
  $("#password").dblclick(() => $("#password").attr("type", $("#password").attr("type") === "password" ? "text": "password"));
*/

  // change label to match range value, gen password
  $("#passwordLength").on("input", () => {
    const requestedLength = parseInt($("#passwordLength").val());
    const generatedPassword = generatePassword(requestedLength);
    setBarLength(requestedLength);
    $("#password").val(generatedPassword);
    $("#lengthLabel").text(`${requestedLength} characters`);
  });
});
