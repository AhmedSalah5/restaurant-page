$(document).ready(function() {
    $('.item-group-tab').click(function(e){
        e.preventDefault()
        $('.items-group').hide()
        $($(this).attr('href')).show(300)
        let navLeft = Math.ceil($(this).parent().offset().left)
        let tabLeft = Math.ceil($(this).offset().left)
        let navScrollLeft = $('.item-groups-nav').scrollLeft();
        if((tabLeft >= navLeft || tabLeft < navLeft) && tabLeft < (navLeft + $(this).outerWidth()*2 ) ){
            $(this).parent().scrollLeft(navScrollLeft -123) 
        }else if(tabLeft > navLeft+200){
            $(this).parent().scrollLeft(navScrollLeft +123)
        }
    })

    //Categories toggle
    $('.item-group-tab').click(function(){
        $('.item-group-tab').removeClass('active')
        $(this).addClass('active')

    })

    $('.cart-page').hide()
    $('.cart-btn').click(function () { 
        $('.cart-page').show(300)
     })
    $('.close-cart').click(function () { 
        $('.cart-page').hide(100)
     })

})