import "../styles/main.scss";
import $ from "jquery";

const ready = function() {
  let currentColorScheme = "";

  if (localStorage.getItem("color-scheme")) {
    let colorScheme = localStorage.getItem("color-scheme");
    setColorScheme(colorScheme);
    $(`.js-color-switch input:radio`)
      .filter(`[value=${colorScheme}]`)
      .prop("checked", true);
  } else {
    currentColorScheme = $(
      ".js-color-switch input:radio[name=color-switcher]:checked"
    ).val();
  }

  $(".js-color-switch input:radio").change(function() {
    setColorScheme($(this).val());
  });

  function setColorScheme(newColorScheme) {
    $("body").removeClass(currentColorScheme);
    $("body").addClass(newColorScheme);
    localStorage.setItem("color-scheme", newColorScheme);
    currentColorScheme = newColorScheme;
  }
};

$(document).ready(ready);
