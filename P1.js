let blogNum = 0;

function setup() {
  $("#textArea").hide()

  $("#edit1").change(function() {
    if(this.checked) {
      $("#edit2").hide()
      $("#edit3").hide()
      $("#textArea").show()
      blogNum = 1;
    }else{
      $("#edit2").show()
      $("#edit3").show()
      $("#textArea").hide()
      blogNum = 0;
    }
  });

  $("#edit2").change(function() {
    if(this.checked) {
      $("#edit1").hide()
      $("#edit3").hide()
      $("#textArea").show()
      blogNum = 2;
    }else{
      $("#edit1").show()
      $("#edit3").show()
      $("#textArea").hide()
      blogNum = 0;
    }
  });

  $("#edit3").change(function() {
    if(this.checked) {
      $("#edit1").hide()
      $("#edit2").hide()
      $("#textArea").show()
      blogNum = 3;
    }else{
      $("#edit1").show()
      $("#edit2").show()
      $("#textArea").hide()
      blogNum = 0;
    }
  });
}
