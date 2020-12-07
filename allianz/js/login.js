// 登入欄位明碼暗碼
$('#lg01').on('click', function(){
    $('#lg01').hide();
    $('#lg01_2').show();
    $('#myIdentity').attr('type', 'text');
})
$('#lg01_2').on('click', function(){
    $('#lg01').show();
    $('#lg01_2').hide();
    $('#myIdentity').attr('type', 'password');
})
    
$('#lg02').on('click', function(){
    $('#lg02').hide();
    $('#lg02_2').show();
    $('#myUser').attr('type', 'text');
})
$('#lg02_2').on('click', function(){
    $('#lg02').show();
    $('#lg02_2').hide();
    $('#myUser').attr('type', 'password');
})
    
$('#lg03').on('click', function(){
    $('#lg03').hide();
    $('#lg03_2').show();
    $('#myPassword').attr('type', 'text');
})
$('#lg03_2').on('click', function(){
    $('#lg03').show();
    $('#lg03_2').hide();
    $('#myPassword').attr('type', 'password');
})