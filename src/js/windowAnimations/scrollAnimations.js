const skillsDivs = $('[data-animate = "skills"]');


const addAnimationsOnScroll = () => {
    $(window).scroll(() => {
        const scrollTop = $(document).scrollTop();
        const windowHeight = $(window).height();  
        const windowWidth = $(window).width();   
        
        // add delay to the second and third div on large scrreens
        if(windowWidth > 751){
            
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
        }else{
            // small screens, animate on scroll into view
            
            skillsDivs.each((index, elem) => {
                let jqelem = $(elem);
            
                let offset = jqelem.offset();
    
                if(offset.top + 150 < scrollTop + windowHeight){
                    jqelem.removeClass('hide');
                    jqelem.addClass('floatInBottom');
                }
            });
        }
    });
};


export{ addAnimationsOnScroll }