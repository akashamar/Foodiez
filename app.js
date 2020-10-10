function init(){
   const slides = document.querySelectorAll('.slide');
   const pages = document.querySelectorAll('.page');
   const background = [
       'radial-gradient(rgb(235, 183, 183),red)',
       'radial-gradient(#0129FF,#03010C)',
       'radial-gradient(#FF1F00,#3A0F81)'
    ];
    
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide,index)=>{
       slide.addEventListener('click',function(){
           changeDots(this);
           nextSlide(index)
       })
    })

    function changeDots(dot){
        slides.forEach(slide=>{
            slide.classList.remove('active')
        })
         dot.classList.add('active')
    }

    function nextSlide(pageNumber){
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero .model-left');
        const nextRight = nextPage.querySelector('.hero .model-Right');
        const currentLeft = currentPage.querySelector('.hero .model-left');
        const currentRight = currentPage.querySelector('.hero .model-Right');
        const nextText = nextPage.querySelector('.details');
        const food = document.querySelector('.food');

        const t1 = new TimelineMax({
            onStart: function(){
                slides.forEach(slide=>{
                    slide.style.pointerEvents="none"
                })
            },
            onComplete: function(){
                slides.forEach(slide=>{
                    slide.style.pointerEvents="all"
                })
            }
        });

      t1.fromTo(currentLeft,0.3,{y:'-10%'},{y:'-100%'})
      .fromTo(currentRight,0.3,{y:'10%'},{y:'-100%'}, '-=0.2') 
      .to(food,0.3,{backgroundImage: background[pageNumber]})
      .fromTo(currentPage, 0.3, {opacity:1,pointerEvents:'all'},{opacity:0,pointerEvents:'none'})
      .fromTo(nextPage,0.3,{opacity:0,pointerEvents:'none'}, {opacity:1,pointerEvents:'all'},'-=0.2')
      .fromTo(nextLeft, 0.3, {y:'-100%'},{y:'-10%'},'-=0.6')
      .fromTo(nextRight, 0.3, {y:'-100%'},{y:'10%'},'-=0.8')
      .fromTo(nextText,0.5,{opacity:0,y:30,},{opacity:1,y:0})
      .set(nextLeft,{clearProps:'all'})
      .set(nextRight,{clearProps:'all'})

      current = pageNumber;
    }

    const hamburger = document.querySelector('.menu');
    const hamburgerLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');


    const t1 = new TimelineMax({paused:true, reversed:true});

    t1.to(navOpen,0.5,{y:0})
    .fromTo(contact,0.5,{opacity:0,y:10},{opacity:1,y:0},'-=0.1')
    .fromTo(social,0.5,{opacity:0,y:10},{opacity:1,y:0},'-=0.5')

    hamburger.addEventListener('click',()=>{
        t1.reversed() ? t1.play() : t1.reverse();
    });

    document.addEventListener('wheel',throttle(scrollChange,1500));
    document.addEventListener('touchmove',throttle(scrollChange,1500));

    function switchDots(dotNumber){
        const activeDot = document.querySelectorAll('.slide')[dotNumber];
        slides.forEach(slide=>{
            slide.classList.remove('active');
        });
        activeDot.classList.add('active');
    }

    function scrollChange(e){
        if(e.deltaY>0){
            scrollSlide += 1;
        }else{
            scrollSlide -= 1;
        }

        if(scrollSlide > 2){
            scrollSlide = 0;
        }
        if(scrollSlide < 0){
            scrollSlide = 2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
    }

}

function throttle(func,limit){
    let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if(!inThrottle){
            func.apply(context,args);
            inThrottle = true;
            setTimeout(()=>(inThrottle = false),limit);
        }
    };
}

init();