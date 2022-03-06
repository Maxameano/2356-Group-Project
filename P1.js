let blogNum = 0;

function setup() {

    //run onload function
    onload()

    $("#edit1").change(function() {
        if(this.checked) {
            $("#edit2").hide()
            $("#edit3").hide()
            blogNum = 1;
            $("#textArea").show()
        }else{
            $("#edit2").show()
            $("#edit3").show()
            blogNum = 0;
            $("#textArea").hide()
        }
    });

    $("#edit2").change(function() {
        if(this.checked) {
            $("#edit1").hide()
            $("#edit3").hide()
            blogNum = 2;
            $("#textArea").show()
        }else{
            $("#edit1").show()
            $("#edit3").show()
            blogNum = 0;
            $("#textArea").hide()
        }
    });

    $("#edit3").change(function() {
        if(this.checked) {
            $("#edit1").hide()
            $("#edit2").hide()
            blogNum = 3;
            $("#textArea").show()
        }else{
            $("#edit1").show()
            $("#edit2").show()
            blogNum = 0;
            $("#textArea").hide()
        }
    });
    
    //Listener for submit button
    $('#submit').click(()=>{
        
        //check if storage is available
        if(typeof Storage !=='undefined'){
        
            //get the word from user
            var input = $('#words').val();

            //emptying the text box
            $('#words').val('')
        
            //Store stringified object to localStorage
            window.localStorage.setItem('edit'+blogNum,input)

    //else if there is no local storage
    }else{
        console.log('no local storage available')
    }
    
    //reseting buttons and text area
    reset()

    //Write input to edit box
    $('#text'+blogNum).val(input)
    
    })
    
    //Listener for cancel button
    $('#cancel').click(reset)
}

//function to hide text area and reset buttons
function reset() {
    
    //show buttons
    $("#edit1").show()
    $("#edit2").show()
    $("#edit3").show()
        
    //uncheck buttons
    $('#edit1').prop('checked',false)
    $('#edit2').prop('checked',false)
    $('#edit3').prop('checked',false)
        
    //hide text box and keyboard
    $('#textArea').hide()

    //blanking the text area
    $('#words').val('')
}

//function ran onload
function onload() {

    //writing items from local storage to text boxes
    $('#text1').val(localStorage.getItem('edit1'))
    $('#text2').val(localStorage.getItem('edit2'))
    $('#text3').val(localStorage.getItem('edit3'))
    
    
    //hide text area
    $('#textArea').hide()
}
