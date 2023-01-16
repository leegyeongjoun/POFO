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
                    });
                },
                section3:function(){
                    const titT=$('.section3 .title').offset().top;
                    let widH=$(window).height();
                    let titTop=titT-widH;

                    $(window).scroll(function(){
                        if($(window).scrollTop()>titTop){
                            $('.section3').addClass('addParallax');
                        }
                        // 스크롤이 맨 위에있으면
                        if($(window).scrollTop() == 0){
                            $('.section3').removeClass('addParallax');
                        }
                    });
                }
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
        section4:function(){
            let no=0;
            //갤러리 이벤트
            //클릭 이벤트
            //ALL
            //hide
            //show;20,23,22,21,24,16,26,19
            let winW= $(window).width(); // 1903px 스크롤바 17px 뺏기때문에
            //let galleryW = $('.gallery').width(); //gallery의 넓이 값
            webResizeFn();
            $(window).resize(function(){webResizeFn();})
            function webResizeFn(){
                winW=$(window).width();
                $('.gallery-btn').eq(0).on({//all일때
                    click:function(){
                        no=0;
                        gallery();
                    }
                });
                //hide 20,22,19
                //show 23,21,24,16,26
                $('.gallery-btn').eq(1).on({//BROCHURE일때
                    click:function(){
                        no=1;
                        gallery();
                    }
                });
                //hide 20,19
                //show 23,22,21,24,16,26
                $('.gallery-btn').eq(2).on({//BRANDING일때
                    click:function(){
                        no=2;
                        gallery();
                    }
                });
                $('.gallery-btn').eq(3).on({//IDENTITY일때
                    click:function(){
                        no=3;
                        gallery();
                    }
                });
                $('.gallery-btn').eq(4).on({//WEB일때
                    click:function(){
                        no=4;
                        gallery();
                    }
                });
                $('.gallery-btn').eq(5).on({//PHOTOGRAPHY일때
                    click:function(){
                        no=5;
                        gallery();
                    }
                });
                
                // console.log(winW); 
                if(winW>=1427){
                    $('.gallery').css('height','calc(1903px/4*0.8125*2)');
                    gallery();
                    function gallery(){
                        if(no==0){//all일때
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*3},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*1},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*1, left: 1903/4*2},300);
                            $('.gallery li').eq(7).show().animate({top: 1903/4*0.8125*1, left: 1903/4*3},300);
                        }else if(no==1){//BROCHURE일때
                            //hide 0,2,7
                            //show 1,3,4,5,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*0, left: 1903/4*3},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                        }else if(no==2){//BRANDING일때
                            //hide 0,7
                            //show 1,2,3,4,5,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*0, left: 1903/4*3},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*1, left: 1903/4*1},300);
                        }else if(no==3){//IDENTITY일때
                            //hide 1,3,6,7
                            //show 0,2,4,5
                            $('.gallery li').eq(1).hide();
                            $('.gallery li').eq(3).hide();
                            $('.gallery li').eq(6).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*0, left: 1903/4*3},300);
        
                        }else if(no==4){//WEB일때
                            //hide 1,2,3,4,5,6
                            //show 0,7
                            $('.gallery li').eq(1).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(3).hide();
                            $('.gallery li').eq(4).hide();
                            $('.gallery li').eq(5).hide();
                            $('.gallery li').eq(6).hide();
        
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(7).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                        }else{//PHOTOGRAPHY일때
                            //hide 0,2,4,5,7
                            //show 1,3,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(4).hide();
                            $('.gallery li').eq(5).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                        }
                    }
                }else if(winW>=951 && winW<1427){
                    //console.log(951);
                    $('.gallery').css('height','calc(1903px/4*0.8125*3)');
                    gallery();
                    function gallery(){
                        if(no==0){//all일때
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*1, left: 1903/4*1},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*2},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*2, left: 1903/4*0},300);
                            $('.gallery li').eq(7).show().animate({top: 1903/4*0.8125*2, left: 1903/4*1},300);
                        }else if(no==1){//BROCHURE일때
                            //hide 0,2,7
                            //show 1,3,4,5,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*1, left: 1903/4*1},300);
                        }else if(no==2){//BRANDING일때
                            //hide 0,7
                            //show 1,2,3,4,5,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*1},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*1, left: 1903/4*2},300);
                        }else if(no==3){//IDENTITY일때
                            //hide 1,3,6,7
                            //show 0,2,4,5
                            $('.gallery li').eq(1).hide();
                            $('.gallery li').eq(3).hide();
                            $('.gallery li').eq(6).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(2).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(4).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                            $('.gallery li').eq(5).show().animate({top: 1903/4*0.8125*1, left: 1903/4*0},300);
        
                        }else if(no==4){//WEB일때
                            //hide 1,2,3,4,5,6
                            //show 0,7
                            $('.gallery li').eq(1).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(3).hide();
                            $('.gallery li').eq(4).hide();
                            $('.gallery li').eq(5).hide();
                            $('.gallery li').eq(6).hide();
        
                            $('.gallery li').eq(0).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(7).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                        }else{//PHOTOGRAPHY일때
                            //hide 0,2,4,5,7
                            //show 1,3,6
                            $('.gallery li').eq(0).hide();
                            $('.gallery li').eq(2).hide();
                            $('.gallery li').eq(4).hide();
                            $('.gallery li').eq(5).hide();
                            $('.gallery li').eq(7).hide();
        
                            $('.gallery li').eq(1).show().animate({top: 1903/4*0.8125*0, left: 1903/4*0},300);
                            $('.gallery li').eq(3).show().animate({top: 1903/4*0.8125*0, left: 1903/4*1},300);
                            $('.gallery li').eq(6).show().animate({top: 1903/4*0.8125*0, left: 1903/4*2},300);
                        }
                    }
                }
            }
        },
        footer:function(){}
    }
    Agency.init();
})(jQuery);