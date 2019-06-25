window.onscroll = function () { navbarScroll() };

// OnScroll Navbar event
function navbarScroll() {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
        // On Scroll
        $("nav").addClass("scrolled-nav-bar");
    } else {
        // On Start
        $("nav").removeClass("scrolled-nav-bar");
    }
};