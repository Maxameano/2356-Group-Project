let blogNum = 0;

function setup() {
    $("#edit1").change(function() {
        if(this.checked) {
            $("#edit2").hide()
            $("#edit3").hide()
            blogNum = 1;
            $("textArea").show()
        }else{
            $("#edit2").show()
            $("#edit3").show()
            blogNum = 0;
            $("textArea").hide()
        }
    });

    $("#edit2").change(function() {
        if(this.checked) {
            $("#edit1").hide()
            $("#edit3").hide()
            blogNum = 2;
            $("textArea").show()
        }else{
            $("#edit1").show()
            $("#edit3").show()
            blogNum = 0;
            $("textArea").hide()
        }
    });

    $("#edit3").change(function() {
        if(this.checked) {
            $("#edit1").hide()
            $("#edit2").hide()
            blogNum = 3;
            $("textArea").show()
        }else{
            $("#edit1").show()
            $("#edit2").show()
            blogNum = 0;
            $("textArea").hide()
        }
    });
}