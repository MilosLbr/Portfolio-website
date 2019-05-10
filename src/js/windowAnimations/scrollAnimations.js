const navbar = $('.navbar')[0];
const skillsDivs = $('[data-animate = "skills"]');
const aboutMeDivs = $('[data-animate = "aboutMe"]');


const addAnimationsOnScroll = () => {
    $(window).scroll(() => {
        const scrollTop = $(document).scrollTop();
        const windowHeight = $(window).height();  
        const windowWidth = $(window).width();   
        
        
        if(windowWidth > 751){
            
            animateSkillDivsLargeScreen(skillsDivs, scrollTop, windowHeight);
        }else{
            
            animateSkillDivsSmallScreen(skillsDivs, scrollTop, windowHeight);
            
        };
        animateNavbar(navbar, scrollTop);
        animateAboutMeDivs(aboutMeDivs, scrollTop, windowHeight);
    });
};

const animateNavbar = (navbar, scrollTop) => {
    if(scrollTop > 80){
        $(navbar).css('background-color' , 'rgba(0, 0, 0, 0.65)')
    }else{
        $(navbar).css('background-color' , 'rgba(0, 0, 0, 0.3)')
    }
}

const animateSkillDivsLargeScreen = (skillsDivs, scrollTop, windowHeight) => {
    // add delay to the second and third div on large screens
    skillsDivs.each((index, elem) => {
        let jqelem = $(elem);
        let offset = jqelem.offset();
        if(offset.top + 150 < scrollTop + windowHeight){
            if(index === 0){    
                jqelem.addClass('floatInBottom');
            }else if(index === 1 ){
                jqelem.addClass('floatInBottom delay05');
            }else if(index === 2){
                jqelem.addClass('floatInBottom delay1');
            }
            
        }
    });
};

const animateSkillDivsSmallScreen = (skillsDivs, scrollTop, windowHeight) => {
    // on small screens, animate on scroll into view
    skillsDivs.each((index, elem) => {
        let jqelem = $(elem);
    
        let offset = jqelem.offset();

        if(offset.top + 150 < scrollTop + windowHeight){
            jqelem.removeClass('hide');
            jqelem.addClass('floatInBottom');
        }
    });
}

const animateAboutMeDivs = (aboutMeDivs, scrollTop, windowHeight) => {
    aboutMeDivs.each((index, elem) => {
        let jqelem = $(elem);
        let offset = jqelem.offset();

        if(offset.top + 150 < scrollTop + windowHeight){
            
            index === 0 ? jqelem.addClass('floatInLeft') : jqelem.addClass('floatInRight');
        }
    })
}


export{ addAnimationsOnScroll }