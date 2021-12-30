import $, { each } from "jquery";

const ready = function() {
  if ($(".orb-report-2021-cover").length) {
    orbCoverScroll();
    $(window).scroll(orbCoverScroll);
    var tempDelta;
    var pointsDelta = 0;

    function orbCoverScroll() {
      let containerTop =
        $(".orb-report-2021-cover").offset().top - $(window).height();
      tempDelta =
        $(window).scrollTop() > containerTop
          ? $(window).scrollTop() - containerTop
          : 0;
    }

    function orbCoverParallax() {
      pointsDelta += (tempDelta - pointsDelta) / 2;

      $(".orb-report-2021-cover .future-bg1").css(
        "transform",
        "translateY(" + (40 + pointsDelta / -12) + "px)"
      );
      $(".orb-report-2021-cover .future-bg2").css(
        "transform",
        "translateY(" + pointsDelta / -9 + "px)"
      );
      $(".orb-report-2021-cover .future-bg3").css(
        "transform",
        "translateY(" + (130 + pointsDelta / -6) + "px)"
      );
      $(".orb-report-2021-cover .future-bg4").css(
        "transform",
        "translateY(" + (180 + pointsDelta / -3) + "px)"
      );
    }

    var cycler = setInterval(orbCoverParallax, 5);
  }
};

$(document).ready(ready);
