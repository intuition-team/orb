import "../styles/main.scss";
import $, { each } from "jquery";

const ready = function() {
  scrollMagic();
  $(window).scroll(scrollMagic);

  // handle color schemes

  let currentColorScheme;
  let colorScheme;

  if (localStorage.getItem("color-scheme")) {
    colorScheme = localStorage.getItem("color-scheme");
  } else {
    colorScheme = $(
      ".main-color-switch input:radio[name=color-switcher]:checked"
    ).val();
  }
  setColorScheme(colorScheme);
  $(`.color-switch input:radio`)
    .filter(`[value=${colorScheme}]`)
    .prop("checked", true);
  currentColorScheme = colorScheme;

  $(".color-switch input:radio").change(function() {
    setColorScheme($(this).val());
  });

  // handle units

  let currentGlobalUnits;
  let currentPxInEm;
  let unitsListner;

  let globalUnits;
  if (localStorage.getItem("global-units")) {
    globalUnits = localStorage.getItem("global-units");
  } else {
    globalUnits = $(
      ".main-units-selector input:radio[name=units-selector]:checked"
    ).val();
  }
  setGlobalUnits(globalUnits);
  $(`.units-selector input:radio`)
    .filter(`[value=${globalUnits}]`)
    .prop("checked", true);
  currentGlobalUnits = globalUnits; // not sure if this is necessary

  $(".units-selector input:radio").change(function() {
    setGlobalUnits($(this).val());
  });

  let pxInEm;
  if (localStorage.getItem("px-in-em")) {
    pxInEm = localStorage.getItem("px-in-em");
  } else {
    pxInEm = $(".main-em-converter input").val();
  }
  setPxValues(pxInEm);
  $(".em-converter input").val(pxInEm);
  currentPxInEm = pxInEm;

  unitsListner = setInterval(function() {
    let pxInEm1 = $(".main-em-converter input").val();
    let pxInEm2 = $(".sidebar-em-converter input").val();
    let pxInEm = 0;

    if (pxInEm1 != currentPxInEm) {
      pxInEm = pxInEm1;
    }
    if (pxInEm2 != currentPxInEm) {
      pxInEm = pxInEm2;
    }
    if (pxInEm) setPxValues(pxInEm);
  }, 300);

  // functions

  function setColorScheme(newColorScheme) {
    $("body").removeClass(currentColorScheme);
    $("body").addClass(newColorScheme);
    localStorage.setItem("color-scheme", newColorScheme);
    $(`.color-switch input:radio`)
      .filter(`[value=${newColorScheme}]`)
      .prop("checked", true);

    $(".brand-palette").addClass("hidden");
    $(`.${newColorScheme}-brand-palette`).removeClass("hidden");
    // $(".palette-bar").each(function(){
    //   let colorName = $(this).text();
    //   var body = document.getElementsByTagname("body");
    //   let colorValue = getComputedStyle(body).getPropertyValue(`--${colorName}-color`);
    //   // let colorValue = $(this).get(0).style.getPropertyValue(`--${colorName}-color`);
    //   console.log(`${colorName} — ${colorValue}`);
    // });

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
    $(`.units-selector input:radio`)
      .filter(`[value=${newGlobalUnits}]`)
      .prop("checked", true);
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
    $(".em-converter input").val(newPxInEm);
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

  function scrollMagic() {
    let unitsSelectorShowPosition = $(".units-selector-breakpoint").offset()
      .top;
    let uDelta = $(window).scrollTop() - unitsSelectorShowPosition;

    let colorSwitcherShowPosition = $(".color-switcher-breakpoint").offset()
      .top;
    let cDelta = $(window).scrollTop() - colorSwitcherShowPosition;

    if (uDelta >= 0) {
      $(".unit-control").removeClass("hidden");
    } else {
      $(".unit-control").addClass("hidden");
    }

    if (cDelta >= 0) {
      $(".color-control").removeClass("hidden");
    } else {
      $(".color-control").addClass("hidden");
    }
  }
};

$(document).ready(ready);
