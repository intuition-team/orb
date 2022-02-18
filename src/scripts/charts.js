import $, { each } from "jquery";

const ready = function() {
  function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append(
      "<div class='slice " + sliceID + "'><span></span></div>"
    );
    offset = offset - 1;
    let sizeRotation = -179 + sliceSize;

    $(id + " ." + sliceID).css({
      transform: "rotate(" + offset + "deg) translate3d(0,0,0)"
    });

    $(id + " ." + sliceID + " span").css({
      transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
      "background-color": color
    });
  }

  function iterateSlices(
    id,
    sliceSize,
    pieElement,
    offset,
    dataCount,
    sliceCount,
    color
  ) {
    let maxSize = 179;
    let sliceID = "s" + dataCount + "-" + sliceCount;
    if (sliceSize <= maxSize) {
      addSlice(id, sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(id, maxSize, pieElement, offset, sliceID, color);
      iterateSlices(
        id,
        sliceSize - maxSize,
        pieElement,
        offset + maxSize,
        dataCount,
        sliceCount + 1,
        color
      );
    }
  }

  function createPie(id) {
    let listData = [];
    let listTotal = 0;
    let offset = 0;
    let i = 0;
    const pieElement = id + " .pie-chart__pie";
    const dataElement = id + " .pie-chart__legend";

    const color = [
      "rgb(38, 69, 130)",
      "rgb(35, 87, 197)",
      "rgb(73, 121, 209)",
      "rgb(118, 158, 229)",
      "rgb(170, 194, 240)",
      "rgb(204, 217, 245)",
      "rgb(231, 238, 255)"
    ];

    $(dataElement + " li").each(function() {
      let value = $(this).data("value");
      // debugger;
      listData.push(parseFloat(value));
    });

    for (i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }

    for (i = 0; i < listData.length; i++) {
      let size = sliceSize(listData[i], listTotal);

      let currentColor = color[i];
      iterateSlices(id, size, pieElement, offset, i, 0, currentColor);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css(
        "border-color",
        currentColor
      );
      offset += size;
    }
  }

  function createPieCharts() {
    // debugger;
    $(".pie-chart--wrapper").each(function() {
      let id = $(this).data("id");
      if (id) createPie('[data-id="' + $(this).data("id") + '"]');
    });
  }

  createPieCharts();
};

$(document).ready(ready);
