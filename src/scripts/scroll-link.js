import $, { each } from "jquery";

const ready = function() {
  let currentHash = location.hash;
  if (currentHash) {
    scrollToElement(currentHash);
  }

  $(".js-scroll-link").click(function(e) {
    // e.preventDefault();

    let currentHash = $.attr(this, "href");

    if (currentHash) {
      scrollToElement(currentHash);
    }
  });
};

function scrollToElement(elementHash) {
  let linkOffset = -40;
  let $targetElement = $(elementHash);
  if ($targetElement.data("scroll-link-offset")) {
    linkOffset += $targetElement.data("scroll-link-offset");
  }

  $("html, body").animate(
    {
      scrollTop: $targetElement.offset().top + linkOffset
    },
    600
  );
}

$(document).ready(ready);
