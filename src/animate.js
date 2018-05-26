import { TimelineMax } from 'gsap'

// R-2
function startLoopingRotations(boxesCollection, initialDuration) {
  const tl = new TimelineMax()
  for (const i of boxesCollection) {
    tl.to(
      i.rotation,
      initialDuration,
      {
        z: "-=6.2832",
        ease: Power0.easeNone,
        repeat: -1
      },
      0
    );
  }
  return tl
}

// R - 2
function animateToGoal(data, collections) {
  const tl = new TimelineMax()
  data.forEach((element, index) => {
    const duration = element.duration
    const delay = element.delay
    const destination = element.destination
    tl.to(collections[index].rotation, duration,
      {
        directionalRotation: {
          z: destination + "_ccw",
          useRadians: true
        },
        ease: Power0.easeNone
        // onStart: function () {
        //   if (index === 282) {
        //     const item = collections[index].rotation.z
        //     // check each column starting
        //     console.log('--when i first started rotating--')
        //     console.log(item)
        //   }
        // }
      }, delay
    )
  })
  return tl
}

export {
  startLoopingRotations,
  animateToGoal
}
