let blogNum = 0;

function setup() {
  
  //Created SC 02/03/2022
  //writing items from local storage to text boxes
  $('#text1').val(localStorage.getItem('edit1'))
  $('#text2').val(localStorage.getItem('edit2'))
  $('#text3').val(localStorage.getItem('edit3'))

  //Created PA 02/03/2022
  $("#edit1").change(function() {
    if(this.checked) {
      $("#edit2").hide()
      $("#edit3").hide()
      $("#textArea").attr("hidden", false)
      blogNum = 1;
    }else{
      $("#edit2").show()
      $("#edit3").show()
      $("#textArea").attr("hidden", true)
      blogNum = 0;
    }
  });

  //Created PA 02/03/2022
  $("#edit2").change(function() {
    if(this.checked) {
      $("#edit1").hide()
      $("#edit3").hide()
      $("#textArea").attr("hidden", false)
      blogNum = 2;
    }else{
      $("#edit1").show()
      $("#edit3").show()
      $("#textArea").attr("hidden", true)
      blogNum = 0;
    }
  });

  //Created PA 02/03/2022 
  $("#edit3").change(function() {
    if(this.checked) {
      $("#edit1").hide()
      $("#edit2").hide()
      $("#textArea").attr("hidden", false)
      blogNum = 3;
    }else{
      $("#edit1").show()
      $("#edit2").show()
      $("#textArea").attr("hidden", true)
      blogNum = 0;
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

//Created KW 04/03/2022
//Edited PG 07/03/2022
// add into text field keyboard input
function addChar(selection) {
  // Get the value from the id'ed field
  var currChars = $("#words").val();

  if (selection === "bksp") {
    
    // Set the id'ed field to a shortened string
    $("#words").val(currChars.substring(0, currChars.length - 1));
  } else if (selection === "enter") {

    // Add line break when enter is pressed
    $("#words").val(currChars+"\n");
  } else {

    // Set the id'ed field to the longer string
    $("#words").val(currChars.concat(selection));
  }
}

//Created PA 07/03/2022
//stub function to later handle the shift key
function shift() {
  console.log("shift");
}

//Created SC 07/03/2022
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
  $('#textArea').attr("hidden", true)

  //blanking the text area
  $('#words').val('')
}
