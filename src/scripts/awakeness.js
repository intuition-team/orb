import $, { each } from "jquery";

const ready = function() {
  const awakeness = () => {
    let windowHeight = window.innerHeight;

    $(window).resize(function() {
      windowHeight = window.innerHeight;
    });

    $(window).bind("beforeprint", function() {
      $(
        ".report-infographics .bar, .poll-infographics .bar, .orb-report-infographics .bar, .report mark"
      ).each(function() {
        $(this).removeClass("sleep");
      });
    });

    $(
      ".report-infographics .bar, .poll-infographics .bar, .orb-report-infographics .bar, .report mark"
    ).each(function() {
      var elementMiddle = $(this).offset().top + $(this).height() / 2;

      if (
        elementMiddle < $(window).scrollTop() ||
        elementMiddle > $(window).scrollTop() + windowHeight
      ) {
        $(this).addClass("sleep");
      } else {
        $(this).removeClass("sleep");
      }
    });
  };
  awakeness();
  window.addEventListener("scroll", awakeness);
};

$(document).ready(ready);
