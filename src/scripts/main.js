import "../styles/main.scss";
import $ from "jquery";

const ready = function() {
  let currentColorScheme = "";
  let currentGlobalUnits = "";
  let currentPxInEm = "";
  let unitsListner;

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

  if (localStorage.getItem("global-units")) {
    let globalUnits = localStorage.getItem("global-units");
    setGlobalUnits(globalUnits);
    $(`.units-selector input:radio`)
      .filter(`[value=${globalUnits}]`)
      .prop("checked", true);
  } else {
    currentColorScheme = $(
      ".units-selector input:radio[name=units-selector]:checked"
    ).val();
  }

  if (localStorage.getItem("px-in-em")) {
    let pxInEm = localStorage.getItem("px-in-em");
    setPxValues(pxInEm);
    $(".em-converter input").val(pxInEm);
  } else {
    currentPxInEm = $(".em-converter input").val();
  }

  $(".js-color-switch input:radio").change(function() {
    setColorScheme($(this).val());
  });

  $(".units-selector input:radio").change(function() {
    setGlobalUnits($(this).val());
  });

  unitsListner = setInterval(function() {
    let pxInEm = $(".em-converter input").val();

    if (pxInEm != currentPxInEm) {
      setPxValues(pxInEm);
    }
  }, 300);

  function setColorScheme(newColorScheme) {
    $("body").removeClass(currentColorScheme);
    $("body").addClass(newColorScheme);
    localStorage.setItem("color-scheme", newColorScheme);
    currentColorScheme = newColorScheme;
  }

  function setGlobalUnits(newGlobalUnits) {
    switch (newGlobalUnits) {
      case "em":
        $(".em-converter").removeClass("visible");

        $(".px").hide();
        $(".em").show();
        break;
      case "px":
        $(".em-converter").addClass("visible");

        $(".px").show();
        $(".em").hide();
    }

    localStorage.setItem("global-units", newGlobalUnits);
    currentGlobalUnits = newGlobalUnits;
  }

  function setPxValues(newPxInEm) {
    $(".value").each(function() {
      let emValue = $(this)
        .find(".em")
        .text();
      let pxValue = Math.floor(emValue * newPxInEm * 10) / 10;
      $(this)
        .find(".px")
        .text(pxValue);
    });

    localStorage.setItem("px-in-em", newPxInEm);
    currentPxInEm = newPxInEm;
  }

  $(".js-scroll-link").click(function(e) {
    e.preventDefault();

    var linkOffset = -40;
    if ($($.attr(this, "href")).data("scroll-link-offset")) {
      linkOffset += $($.attr(this, "href")).data("scroll-link-offset");
    }

    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top + linkOffset
      },
      500
    );
  });
};

$(document).ready(ready);
