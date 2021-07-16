import $, { each } from "jquery";

const ready = function() {
  $(".download-plate").hover(
    function(e) {
      $(this).addClass("hover");
    },
    function(e) {
      $(this).removeClass("hover");
      $(this)
        .find(".download-menu")
        .removeClass("visible");
    }
  );

  $(".download-plate").on("click", function(e) {
    $(this)
      .find(".download-menu")
      .addClass("visible");
  });
};

$(document).ready(ready);
