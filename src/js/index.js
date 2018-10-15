require("../css/index.css");

var crypto = require("crypto");

function decrypt(text, password) {
  var decipher = crypto.createDecipher("aes-256-cbc", password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

window.logout = function() {
  localStorage.removeItem("password", "");
  window.location.reload();
};

window.addEventListener("load", function() {
  var el = document.getElementById("encrypted");
  if (!el) return;
  var password = localStorage.getItem("password") || prompt("Password?");
  localStorage.setItem("password", password);
  try {
    var content = decrypt(el.value, password);
  } catch (e) {
    window.logout();
  }
  document.getElementById("contents").innerHTML = content;
  createToc();
});
