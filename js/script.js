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
                section2:function(){},
                section3:function(){}
            }
            scrollEvent.init();
        },
        header:function(){
            // 모바일메뉴 나오게하기
            $('.fa-bars').click(function(){
                $('.mobile-nav').slideToggle();
            });
        },
        section1:function(){},
        section2:function(){},
        section3:function(){},
        section4:function(){},
        footer:function(){}
    }
    Agency.init();
})(jQuery);