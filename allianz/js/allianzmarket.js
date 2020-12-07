$.when( $.ready ).then(function() {
    if (location.hash != '') {
        window.setTimeout(function() {
            window.scrollBy(0, -100);
        }, 100);
    } else if (location.search != '') {
        var id = $.map(location.search.slice(1).split('&'), function(elementInArray, indexInArray) {
            var re = elementInArray.split('=');
            if (re[0] === 'b') {
                return '#b' + re[1];
            } else {
                return null;
            }
        })[0];console.log(id);
        $(window).scrollTop($(id).offset().top - 100);
    }

    $(".toggle").click(toggleMenu);
    $(".m_nav ul").on("click", "li", toggleMenu);
    $(".top,.m_nav").on("click", "ul li a", function(event) {
        var $this = $(this);
        if (!$this.hasClass("on")) {
            $this.closest("ul").find("a.on").add($this).toggleClass("on");
        }
    });
    $(".gototop").on("click", function() {
        window.scrollTo(0, 0);
        var $nav = $(".top,.m_nav");
        $nav.find("ul li a.on").removeClass("on");
        $nav.find("ul li a:first").addClass("on");
    });
    $(".m_nav ul").on("click", "li a:lt(5):not(:first)", scrollToOffset);
    $(".top ul").on("click", "li a:lt(5):not(:first)", scrollToOffset);
    $(".b1txt ul").on("click", "li a", scrollToOffset);
    $(".tip").on("click", "a", scrollToOffset);
    $(".b2").on("click", "a:lt(2)", scrollToOffset);

    initScrollIn();
    initTabs();

    // $(".op1 ul li").on("click", "input+i", function() {
    //     var $this = $(this);
    //     $this.children("div").toggle();
    //     $this.closest("li").siblings().find("input+i>div").hide();
    // });
    $(".popup").on("wheel", function(event) {
        event.stopPropagation();
        event.preventDefault();
    });
});
function scrollToOffset(event) {
    event.preventDefault();
    $(window).scrollTop($($(this).attr("href")).offset().top - 100);
}
function toggleMenu(event) {
    $(".toggle").toggleClass("active");
    $(".m_nav").slideToggle();
}
function close_popup(v1){
    $(".popup." + v1).fadeOut(300);
    $(".gototop").show();
}
function open_popup(v1){
    $(".popup." + v1).fadeIn(300);
    $(".gototop").hide();
}
function initScrollIn(){
    var $target = $("#b1");
    $target.waypoint(function(direction) {
        $(".top,.m_nav").find("ul li a.on").toggleClass("on");
        if (direction === "down") {
            $(".top,.m_nav").find("ul li a[href='#b1']").toggleClass("on");
        } else {
            $(".top,.m_nav").find("ul li:first-child a").toggleClass("on");
        }
    }, {
        offset: 150
    });
    $target.waypoint(function(direction) {
        if (direction === "down") {
            $(".water").fadeIn();
        } else {
            $(".water").fadeOut();
        }
    }, {
        offset: 300
    });
    $target.waypoint(function(direction) {
        $(".b1").css({ opacity:0 });
    }, {
        offset: '100%'
    });
    $target.waypoint(function(direction) {
        var $elem = $(".b1");
        if (direction === "down" && $elem.css("opacity") === "0") {
            var displacement = Math.floor(Waypoint.viewportHeight() / 2);
            $elem.css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
        }
    }, {
        offset: '60%'
    });

    $target = $("#b2");
    $target.waypoint(function(direction) {
        $(".top,.m_nav").find("ul li a.on").toggleClass("on");
        if (direction === "down") {
            $(".top,.m_nav").find("ul li a[href='#b2']").toggleClass("on");
        } else {
            $(".top,.m_nav").find("ul li a[href='#b1']").toggleClass("on");
        }
    }, {
        offset: 150
    });
    $target.waypoint(function(direction) {
        $(".b2").css({ opacity:0 });
    }, {
        offset: '100%'
    });
    $target.waypoint(function(direction) {
        var $elem = $(".b2");
        if (direction === "down" && $elem.css("opacity") === "0") {
            var displacement = Math.floor(Waypoint.viewportHeight() / 2);
            $elem.css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
        }
    }, {
        offset: '60%'
    });

    $target = $("#b3");
    $target.waypoint(function(direction) {
        $(".top,.m_nav").find("ul li a.on").toggleClass("on");
        if (direction === "down") {
            $(".top,.m_nav").find("ul li a[href='#b3']").toggleClass("on");
        } else {
            $(".top,.m_nav").find("ul li a[href='#b2']").toggleClass("on");
        }
    }, {
        offset: 200
    });
    $target.waypoint(function(direction) {
        $("#b3 > div:lt(4)").css({ opacity:0 });
    }, {
        offset: '100%'
    });
    $target.waypoint(function(direction) {
        var $elem = $("#b3 > div:first");
        if (direction === "down" && $("#b3 > div:first").css("opacity") === "0") {
            var displacement = Math.floor(Waypoint.viewportHeight() / 2);
            $("#b3 > div:lt(4)").each(function(index, element) {
                $(element).css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
            });
        }
    }, {
        offset: '60%'
    });

    $target = $("#b4");
    $target.waypoint(function(direction) {
        $(".top,.m_nav").find("ul li a.on").toggleClass("on");
        if (direction === "down") {
            $(".top,.m_nav").find("ul li a[href='#b4']").toggleClass("on");
        } else {
            $(".top,.m_nav").find("ul li a[href='#b3']").toggleClass("on");
        }
    }, {
        offset: 150
    });
    $target.waypoint(function(direction) {
        $(this.element).next().andSelf().css({ opacity:0 });
    }, {
        offset: '100%'
    });
    $target.waypoint(function(direction) {
        var $elem = $(this.element);
        if (direction === "down" && $elem.css("opacity") === "0") {
            var displacement = Math.floor(Waypoint.viewportHeight() / 2);
            $elem.css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
            $elem.next().css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
        }
    }, {
        offset: '60%'
    });

    $target = $("#b5");
    $target.waypoint(function(direction) {
        $(".top,.m_nav").find("ul li a.on").toggleClass("on");
        if (direction === "down") {
            $(".top,.m_nav").find("ul li a[href='#b5']").toggleClass("on");
        } else {
            $(".top,.m_nav").find("ul li a[href='#b4']").toggleClass("on");
        }
    }, {
        offset: 50
    });
    $target.waypoint(function(direction) {
        $(this.element).next().andSelf().css({ opacity:0 });
    }, {
        offset: '100%'
    });
    $target.waypoint(function(direction) {
        var $elem = $(this.element);
        if (direction === "down" && $elem.css("opacity") === "0") {
            var displacement = Math.floor(Waypoint.viewportHeight() / 2);
            $elem.css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
            $elem.next().css({ y:'+=' + displacement }).transition({ y:'-=' + displacement, opacity:1 }, 1000, 'ease');
        }
    }, {
        offset: '60%'
    });
}

function initTabs() {
    var $tabs = $(".op4 .tltab");
    $(".op4 .treasurelist ~ .poptxt").hide().filter(".tb" + ($tabs.children(".on").index() + 1).toString()).show();
    $tabs.on("click", "div", function() {
        var $this = $(this);
        var $tabPanels = $(".op4 .treasurelist ~ .poptxt");
        if (!$this.hasClass("on")) {
            var $on = $this.parent().children(".on").toggleClass("on");
            $this.toggleClass("on");
            $on.children("i").prependTo($this);
            console.log($tabPanels);
            console.log($tabPanels.filter(".tb" + ($on.index() + 1).toString()));
            console.log($this.index() + 1);
            $tabPanels.filter(".tb" + ($on.index() + 1).toString()).hide();
            $tabPanels.filter(".tb" + ($this.index() + 1).toString()).fadeIn();
        }
    });

    $tabs = $(".op5 .treasurelist .tltab");
    $(".op5 .treasurelist .treasureall").hide().filter(".tb" + ($tabs.children(".on").index() + 1).toString()).show();
    $tabs.on("click", "div", function() {
        var $this = $(this);
        var $tabPanels = $(".op5 .treasurelist .treasureall");
        if (!$this.hasClass("on")) {
            var $on = $this.parent().children(".on").toggleClass("on");
            $this.toggleClass("on");
            $on.children("i").prependTo($this);
            $tabPanels.filter(".tb" + ($on.index() + 1).toString()).hide();
            $tabPanels.filter(".tb" + ($this.index() + 1).toString()).fadeIn();
        }
    });

    //TODO remove this
    $(".op5 .treasurelist .treasureall.tb3").click(function() {
        $(this).hide();
        $(".op5 .treasurelist .treasureall.tb4").show();
    });
}

