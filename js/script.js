(function(){
    let Agency={//메서드 함수
        init:function(){
            this.parallax();
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.footer();
        },
        parallax:function(){
            const scrollEvent = { // 스크롤 이벤트가 필요할 때
                init:function(){
                    this.header();
                    this.section2();
                    this.section3();
                },
                header:function(){
                    let newScr = $(window).scrollTop();//윈도우 스크롤탑값 넣기
                    let oldScr = newScr;
                    let result = "";

                    $(window).scroll(function(){
                        newScr = $(window).scrollTop();
                        //console.log("newScr:"+newScr, 'oldScr:' +oldScr);
                        result = (newScr-oldScr) > 0 ? 'DOWN' : 'UP';
                        //스크롤이 내려가고 있는 걸 보여준다.

                        // 스크롤이 내려가면 헤더가 안보였다가 잠깐 올리면 60이 보이게 하고 완전히 다 올리면 72가 보여지게 해야한다. result의 값은 삼항조건 연산자로 계산해서 newScr에서 oldScr을 뺀값이 0보다 크다면 DOWN이고 그렇지않다면 UP이 될것이다
                        if(result=="DOWN"){
                            $('#header').removeClass('addParallaxDown72');
                            $('#header').removeClass('addParallaxDown60');
                            $('#header').addClass('addParallaxUp');
                            $('#header .header_inner').css('height','72px')
                        }
                        if(result=="UP"){
                            $('#header').removeClass('addParallaxDown72');
                            $('#header').removeClass('addParallaxUp');
                            $('#header').addClass('addParallaxDown60');
                            $('#header .header_inner').css('height','60px')

                            if($(window).scrollTop()==0){
                                $('#header').removeClass('addParallaxDown60');
                                $('#header').addClass('addParallaxDown72');
                                $('#header .header_inner').css('height','72px')
                            }
                        }
                        oldScr = newScr;
                    });
                },
                section2:function(){
                    const titT=$('.section2 .title').offset().top;
                    let widH=$(window).height();
                    let titTop=titT-widH;

                    $(window).scroll(function(){
                        if($(window).scrollTop()>titTop){
                            $('.section2').addClass('addParallax');
                        }
                        // 스크롤이 맨 위에있으면
                        if($(window).scrollTop() == 0){
                            $('.section2').removeClass('addParallax');
                        }
                    })
                },
                section3:function(){}
            }
            scrollEvent.init();
        },
        header:function(){
            // 모바일메뉴 나오게하기
            $('.fa-bars').click(function(){
                $('.mobile-nav').slideToggle();
            });

            // 2deps 3deps만들기
            const container = $('#header .container');
            const mainBtn = $('#nav>ul>li>a');
            const sub = $('.sub');
            const subBtn = $('.sub-btn');
            const subSub = $('.sub-sub');
            
            // 2deps보이게 하기
            mainBtn.on({mouseenter: function(){
                sub.stop().fadeOut(0);
                $(this).next().stop().fadeIn(300);
            }})
            // 3deps보이게 하기
            subBtn.on({mouseenter:function(){
                subSub.stop().fadeOut(0);
                $(this).next().stop().fadeIn(300);
            }})

            container.on({mouseleave:function(){
                sub.stop().fadeOut(300);
                subSub.stop().fadeOut(300);
            }})
        },
        // 이미지 넓이 
        section1:function(){
            $(window).resize(function(){
                let imgW = $('.slide-container>ul>li');
                imgW.each(function(){
                    let thisImgW=$(this).find('img').width();
                    //console.log(thisImgW);
                    if(thisImgW<1920){
                        // 이미지의 넓이와 높이를 알아야함 만약에 800 400이면 *.5만 하면됨
                        $('.section1').height(thisImgW*0.46);
                    }
                })
            });
            //슬라이더
            const imgBanner = $('.slide-container>ul>li');
            let setIn;
            let current=0;

            mainSlide();
            function mainSlide(){
                setIn=setInterval(function(){
                    prev=imgBanner.eq(current);
                    move(prev, 0, '-100%');
                    current++;
                    if(current==imgBanner.size()){
                        current=0;
                    }
                    next=imgBanner.eq(current);
                    move(next, '100%', 0);
                },3000)
            }
            function move(tg, start, end){
                tg.css('left',start).stop().animate({left: end},500);
            }

            $('.slide-container').on({mouseenter:function(){
                clearInterval(setIn);
            }, mouseleave(){
                mainSlide();
            }})
        },
        section2:function(){},
        section3:function(){},
        section4:function(){},
        footer:function(){}
    }
    Agency.init();
})(jQuery);