let serviceSec = document.getElementById('second-content');
let serviceArr = document.querySelectorAll('.service');
let serviceText = document.querySelector('.about-service');
let thumbnail = document.querySelectorAll('.thumbnail');

const colors = [
    '#75B1FD', // Background color for element1 when hovered
    '#9075FD', // Background color for element2 when hovered
    '#D175FD', // Background color for element3 when hovered
    '#FD7575', // Background color for element4 when hovered
    '#FDAE75', // Background color for element5 when hovered
    '#FDD775', // Background color for element6 when hovered
    '#8DC363', // Background color for element7 when hovered
];

thumbnail.forEach((elem,index) =>{
    elem.style.backgroundColor = colors[index];
})


serviceArr.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
      serviceSec.style.backgroundColor = colors[index];
      serviceText.classList.add('hovered');
      element.classList.add('white-text');
      thumbnail[index].style.backgroundColor = 'rgba(255,255,255,0.2)';
      thumbnail[index].style.border = '3px solid #fff';
    });
  
    element.addEventListener('mouseleave', () => {
      serviceSec.style.backgroundColor = '#ffffff'; // Change to the default background color
      serviceText.classList.remove('hovered');
      element.classList.remove('white-text');

      thumbnail.forEach((elem,index) =>{
        elem.style.backgroundColor = colors[index];
        elem.style.border = 'none';

    })
    });
});

