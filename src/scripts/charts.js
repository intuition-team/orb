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
      "rgb(35, 87, 197)",
      "rgb(73, 121, 209)",
      "rgb(118, 158, 229)",
      "rgb(170, 194, 240)",
      "rgb(204, 217, 245)"
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
      // debugger;
      iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css(
        "border-color",
        color[i]
      );
      offset += size;
    }
  }

  // function shuffle(a) {
  //     var j, x, i;
  //     for (i = a.length; i; i--) {
  //         j = Math.floor(Math.random() * i);
  //         x = a[i - 1];
  //         a[i - 1] = a[j];
  //         a[j] = x;
  //     }

  //     return a;
  // }

  function createPieCharts() {
    // debugger;
    createPie(".pieID--education");
  }

  createPieCharts();
};

$(document).ready(ready);
