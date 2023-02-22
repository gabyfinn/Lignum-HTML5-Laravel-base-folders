function fadeIn() {
  console.log("entre")
  let element = document.getElementById('hide');
  console.log(element.style.display)
  // if (element.style.display == '') {
  //   setTimeout(() => {
  //     element.style.display = "block";
  //   }, "1000")
    element.style.transition = "opacity 5s linear 2s";
    element.style.opacity = 1;
  
  console.log(element.style.display)
  // element.style.transition = "opacity 5s linear 2s";

  // element.style.transitionDelay = '2s';
  // element.style.opacity = 1;
}