import { TimelineMax, Power0 } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

let duration = 8

function regularRotation(boxes) {
  let tl = new TimelineMax();
  tl.to(boxes, duration, {
    pixi: {
      rotation: "+=360"
    },
    ease: Power0.easeNone,
    repeat: -1
  });
}

function animateTo(data, boxes) {
  let { common, red } = data;
  let counter = 0;
  let itemCounter = 0;
  let delay = 0;
  let length = common.length;

  let tl = new TimelineMax();
  while (counter < length) {
    let commonRot = common[counter];
    let redRot = red[counter];

    // animate left
    tl.to(
      boxes[itemCounter],
      duration,
      {
        directionalRotation: {
          rotation: commonRot + "_cw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      delay
    );

    // animate right
    tl.to(
      boxes[itemCounter + 1],
      duration,
      {
        directionalRotation: {
          rotation: commonRot + "_cw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      delay
    );

    // after both in position, continue animating the right
    tl.to(
      boxes[itemCounter + 1],
      duration / 4,
      {
        directionalRotation: {
          rotation: redRot + "_cw",
          useRadians: true
        },
        ease: Power0.easeNone
      },
      duration + delay
    );

    counter++;
    itemCounter += 2;
    delay += 0.2;
  }
}


export {
  regularRotation,
  animateTo
}
