$.when( $.ready ).then(function() {
    $(".toggle").click(toggleMenu);
    $(".m_nav ul").on("click", "li", toggleMenu);
    $(".top,.m_nav").on("click", "ul li a", function() {
        var $this = $(this);
        if (!$this.hasClass("on")) {
            $this.closest("ul").find("a.on").add($this).toggleClass("on");
        }
    });
    
    $(".op1 ul li").on("click", "input+i", function() {
        var $this = $(this);
        $this.children("div").toggle();
        $this.closest("li").siblings().find("input+i>div").hide();
    });
    $(".popup").on("wheel", function(event) {
        event.stopPropagation();
        event.preventDefault();
    });
    initTabs();
});
function toggleMenu(event) {
    $(".toggle").toggleClass("active");
    $(".m_nav").slideToggle();
}
function close_popup(v1){
    $(".popup." + v1).fadeOut(300);
}
function open_popup(v1){
    $(".popup." + v1).fadeIn(300);
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
