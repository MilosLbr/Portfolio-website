const navbar = $('.navbar')[0];
const skillsDivs = $('[data-animate = "skills"]');
const aboutMeDivs = $('[data-animate = "aboutMe"]');

const addAnimationsOnScroll = () => {
    $(window).scroll(() => {
        const scrollTop = $(document).scrollTop();
        const windowHeight = $(window).height();  
        const windowWidth = $(window).width();  
        
        
        animateNavbar(navbar, scrollTop);
        animateAboutMe(aboutMeDivs, scrollTop, windowHeight);

        if(windowWidth > 751){
            animateSkillsLg(skillsDivs, scrollTop, windowHeight);
            
        }else{
            animateSkillsSmall(skillsDivs, scrollTop, windowHeight);
        }
    });
};

const animateNavbar = (navbar, scrollTop) => {
    let jqnavbar = $(navbar);

    scrollTop > 80 ?
        jqnavbar.css('background-color', 'rgba(0, 0, 0, 0.65)')
        :
        jqnavbar.css('background-color', 'rgba(0, 0, 0, 0.3)');
}

const animateAboutMe = (aboutMeDivs, scrollTop, windowHeight) => {
    aboutMeDivs.each((index, elem) => {
        let jqelem = $(elem);
        let offset = jqelem.offset();
        if(offset.top + 150 < scrollTop + windowHeight){
            if(index === 0){
                jqelem.addClass('floatInFromLeft');
            }else{
                jqelem.addClass('floatInFromRight');
            }
            
        }
    })
}

const animateSkillsLg = (skillsDivs, scrollTop, windowHeight) => {
    // add delay to the second and third div on large scrreens
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
}

const animateSkillsSmall = (skillsDivs, scrollTop, windowHeight) => {
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