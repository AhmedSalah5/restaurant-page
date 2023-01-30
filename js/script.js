$(document).ready(function() {
    $('.item-group-tab').click(function(e){
        e.preventDefault()
        $('.items-group').hide()
        $($(this).attr('href')).show()
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


     //Show cart notifications
    function showAlert(seconds) { 
        $('#liveToast').show()
        setTimeout(function() {
            $('#liveToast').hide()
        },seconds*1000)
     }

     $('.cart-count').text($('.cart-items tbody tr').length)
     $('.add-to-cart-btn').click(function() {
        showAlert(2)
        $('.cart-count').text($('.cart-items tbody tr').length)
     })

})