import { TimelineMax, Power0 } from "gsap";
import PixiPlugin from "gsap/PixiPlugin";

let duration = 0.5

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
    delay += 0.02;
  }
}

function animatePartsTo (data, boxes) {
  let tl = new TimelineMax();
  let counter = 0
  let baseDelay = 0
  // let length = 96
  while (counter < 191) {
    // animate left
    let commonRot = data[counter]
    let redRot = data[counter+1]
    // console.log('--what-')
    // console.log(commonRot)
    tl.to(
      boxes[counter],
      commonRot.duration,
      {
        directionalRotation: {
          rotation: "+=" + commonRot.diff,
          useRadians: true
        },
        ease: Power0.easeNone
      },
      commonRot.delay + baseDelay
    )

    tl.to(
      boxes[counter+1],
      redRot.duration,
      {
        directionalRotation: {
          rotation: "+=" + redRot.diff,
          useRadians: true
        },
        ease: Power0.easeNone
      },
      redRot.delay + baseDelay
    );
    counter += 2
    baseDelay += 0.02
  }
}
export {
  regularRotation,
  animateTo,
  animatePartsTo
}
