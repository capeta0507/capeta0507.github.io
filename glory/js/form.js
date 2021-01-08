var disabled = false;
$('#mySend').on('click', function(){

  if(disabled == true){
    return false;
  }else{
    disabled = true;
  }
  var result = formDetect();
    if (result == false) {
      disabled = false;
      return false;
  }

  $('#form_load').show();

  var name = $("input[name='myName']").val();
  var gender = $("input[name='genderOptions']:checked").val();
  var phone = $("input[name='myPhone']").val();
  var appointment = $("select[name='sel_time']").val();
  var remarks = $("textarea[name='myMsg']").val();

  $.ajax({
    type: "post",
    url: "api/reservation.php",
    data: {
      "name": name, 
      "gender": gender, 
      "phone": phone,
      "appointment": appointment, 
      "remarks": remarks, 
     
    },
    dataType: "JSON",
    success: function(response) {
      // console.log(response.msg);
      if(response.status === 'success'){
        $('#form_load').hide();
        alert("發送成功");
      }else{
        $('#form_load').hide();
        alert('發送錯誤,請通知業務人員 謝謝');
      }
      disabled = false;
      grecaptcha.reset();
      $('#mainform')[0].reset();
      console.log('unlock');
    },
  });


});


function formDetect() {

      var name = $('[name="myName"]');
      if (name.val() == '') {
          alert('請輸入姓名');
          name.focus();
          return false;
      }

      var gender = $('[name="genderOptions"]');
      // console.log('aaa', gender.val());
      if (!gender.is(":checked")) {
          alert('請選擇性別');
          gender.focus();
          return false;
      }

      
      var phone = $('[name="myPhone"]');
      if (phone.val() == '') {
          alert('請輸入手機號碼');
          phone.focus();
          return false;
      } else {
          match_result = phone.val().match(/09[0-9]{8}/);
          if (match_result == null) {
              alert('手機號碼格式錯誤，例：0912345678');
              phone.focus();
              return false;
          }
      }

      var appointment = $("[name='sel_time']");
      if (appointment.val() == '' || appointment.val() == null) {
          alert('請選擇方便聯絡時間');
          appointment.focus();
          return false;
      }

      var response = grecaptcha.getResponse();
      if(response.length == 0) {
        alert('未機器人驗證');
        return false;
      }

      var agree = $('[name="agree"]');
      if (agree.is(':checked') == false) {
          alert('請閱讀隱私權聲明，並且勾選同意');
          agree.focus();
          return false;
      }
}

