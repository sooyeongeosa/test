// 비쥬얼 슬라이드
new Swiper('.sw-visual',{
    loop: true,
    pagination: {
        el: '.sw-pagination',
        clickable: true,
    },
    effect: 'fade',  // 페이드 전환 효과 사용
    fadeEffect: {
      crossFade: true,  // 이전 슬라이드와 현재 슬라이드가 서서히 교차하는 효과
    },
    speed: 1000,  // 슬라이드 전환 속도 (1초)
    autoplay: {
        delay: 4000,  // 자동 전환 시간 (4초마다 슬라이드 전환)
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.visual-arrow-next',
        prevEl: '.visual-arrow-prev'
    },
})

// new-item 슬라이드
new Swiper('.sw-new-item',{
    loop: true,
    slidesPerView: 3,
    speed: 1000,  // 슬라이드 전환 속도 (1초)
    autoplay: {
        delay: 2500,  // 자동 전환 시간 (2.5초마다 슬라이드 전환)
        disableOnInteraction: true,
    },
    centeredSlide: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0, /* 슬라이드 회전 각도 (기본값: 50) */
        stretch: 80, /* 슬라이드사이에 간격 (기본값: 0) - 숫자가 클수록 슬라이드가 서로 많이 겹친다 */
        scale: 1,
        depth: 150, /* 슬라이드의 깊이 즉, z측방향의 거리 (기본값: 100) */
        modifier: 1.2,
        slideShadows: false,
    },
    navigation: {
        nextEl: '.slide-arrow-next',
        prevEl: '.slide-arrow-prev'
    },
    breakpoints: {
        1281: { slidesPerView: 3, coverflowEffect: { depth: 150 , stretch: 80 } },
        681: { slidesPerView: 3, coverflowEffect: { depth: 100 , stretch: 58 } },
        0: { slidesPerView: 1 },
    },
})

// 베스트셀러 슬라이드
new Swiper('.sw-best-sellers',{
    slidesPerView: 1.25,
    spaceBetween: 15,
    centeredSlides: true, // 중앙 정렬하여 양쪽 슬라이드 살짝 보이게
    slidesOffsetBefore: 0, // 첫 슬라이드 왼쪽에 여백 추가
    slidesOffsetAfter: 0, // 마지막 슬라이드 오른쪽에 여백 추가
    navigation: {
        nextEl: '.slide-arrow-next',
        prevEl: '.slide-arrow-prev'
    },
    breakpoints: {
        1281: { slidesPerView: 4, centeredSlides: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        681: { slidesPerView: 3, centeredSlides: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        481: { slidesPerView: 2, centeredSlides: false, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        0: { slidesPerView: 1.25, centeredSlides: true, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
    },
})

$(function(){
    // *****모바일 버튼*****
    const mbBtn = $('.mobile-menu-btn .hamburger'),
    mbBtnClose = $('.btnMenu-mClose'),
    mbNav = $('.mobile-menu'),
    mbMenuMask = $('.mb-menu-mask');
    // 모바일 버튼이 클릭되면
    mbBtn.click(function(){
    mbNav.toggleClass('active')
    mbMenuMask.toggleClass('active')
    })
    mbBtnClose.click(function(){
    mbNav.toggleClass('active');
    mbMenuMask.toggleClass('active');

    // 모든 서브메뉴를 닫고 'open' 클래스를 제거
    mbMainMenu.removeClass('open');
    mbSubMenu.stop().slideUp(600);  // 모든 서브메뉴 슬라이드 업

    // 모든 메뉴에서 'active' 클래스를 제거
    mbMenuList.removeClass('active');
    })
    // 모바일 서브메뉴 펼치기(아코디언)기능
    const mbMenuList = $(".menu-m > li"),
    mbMainMenu = $(".menu-m > li a"),
    mbSubMenu = $(".submenu-m");
    // 모바일메뉴(li>a(.mb-mainMenu))를 클릭했을 때
    mbMainMenu.click(function(e){
    let isSubMenu = $(this).siblings('ul').length // siblings-형제자매
    if(isSubMenu) { // 서브메뉴가 있을 때
        e.preventDefault(); // a tag니까 링크안걸리게 해준다.
        let isOpen = $(this).hasClass('open')

        // 모든 서브메뉴를 닫는다
        mbMainMenu.removeClass('open');
        mbMainMenu.next().stop().slideUp(600);
        
        if (isOpen) { // 서브메뉴 열린상태
            $(this).next().stop().slideUp(600) // next-다음요소(여기에서는 a tag 다음인 ul)/600(속도)
            $(this).removeClass('open')
        } else { // 서브메뉴 닫힌상태
            $(this).next().stop().slideDown(600)
            $(this).addClass('open')
        }
    }else { // 서브메뉴가 없을 때
        mbMainMenu.removeClass('open')
        mbMainMenu.next().stop().slideUp(600)
    }
    // 클릭한 a, a span의 부모 li에만 active 클래스 추가/제거
    let isActive = $(this).parent().hasClass("active");
    if(isActive) {
        // 이미 active 클래스가 있으면 제거
        $(this).parent().removeClass('active');
    } else {
        // 모든 메뉴에서 active 클래스 제거하고 클릭한 항목에만 추가
        mbMenuList.removeClass('active');
        $(this).parent().addClass('active');
    }
    })

    // 화면사이즈 체크
    window.addEventListener("resize",function(){
        let winWidth=window.innerWidth; // innerWidth = 브라우저 뷰포터 창너비
        console.log(winWidth);
        if(winWidth > 980) {
            mbNav.removeClass("active")
            mbMenuMask.removeClass("active")
        }
    })
    
    // *****헤더 sticky*****
    const header = $('.header')
    let headerOffsetTop = header.offset().top; // offset 떨어져있다. .top에서
    // console.log(headerOffsetTop)
    $(window).on('scroll',function(){
        let $scrollTop = $(this).scrollTop();
        // console.log("스크롤된 길이: " + $scrollTop)
        // console.log("header의 위치: " + headerOffsetTop)
        if($scrollTop > headerOffsetTop) {
            header.addClass('sticky')
        }else {
            header.removeClass('sticky')
        }         
    });

    // *****gift-item 클릭 이벤트*****
    const giftItems = $('.right-gift-item ul li');
    const leftImages = $('.left-img-wrap img');
    // 기본적으로 index 5에 해당하는 이미지를 보이도록 설정
    leftImages.each(function(index) {
        if (index !== 5) {
            $(this).hide();  // index 5 외의 이미지는 숨기기
        }
    });
    // 클릭 이벤트 처리
    giftItems.each(function(index, item) {
        $(item).on('click', function(event) {
            event.preventDefault(); // a 태그 기본 동작(페이지 이동) 방지
            // 모든 이미지를 숨기고, 클릭된 순서에 해당하는 이미지만 보이도록 처리
            leftImages.each(function() {
                $(this).hide();  // 모든 이미지 숨기기
            });
            // 클릭된 li의 index에 해당하는 이미지만 보이도록 설정
            $(leftImages[index]).fadeIn(1000);
        });
    });
})

// AOS 애니메이션
AOS.init({
    once: true // 한번만 애니메이션이 작동하게 설정
  })