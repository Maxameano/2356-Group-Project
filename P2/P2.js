/**
 * Authors:Peter Akerley (PA),
 *         Sebastian Cox (SC),
 *         Dylan MacDonnell (DM),
 *         Kevin Wiwczor (KW)
 * 
 * Key:
 *      Creation/Edits : INITIAL DD/MM/YYYY
 */

var favoriteWords = [];
let blogNum = 0;
let shifted = 0;


function setup() {
  
  //Created SC 02/03/2022
  //writing items from local storage to text boxes
  $('#text1').val(localStorage.getItem('edit1'))
  $('#text2').val(localStorage.getItem('edit2'))
  $('#text3').val(localStorage.getItem('edit3'))

  kbdToLC();

  //Created PA 14/03/2022
  //Creates a click/hover listener for all the keys
  const kbd = document.querySelectorAll('.btn-secondary');
  kbd.forEach(key => {
    //Changes key to red when mouse is over it
    key.addEventListener('mouseover', function() {
      key.setAttribute('style', 'background-color: red;');
    });

    //Changes key back when mouse leaves it
    key.addEventListener('mouseout', function() {
      key.setAttribute('style', 'background-color: blue-grey;');
    });

    key.addEventListener('click', function() {
      let input = this.innerHTML;
      addChar(input);
    });
  });

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

  // Add letter
  $("#words").val(currChars+selection);
}

function shift() {
  if (shifted == 0) {
    shifted = 1;
    kbdToUC();
    $('#shiftKey').empty().append("CAPS");
  } else if (shifted == 1) {
    shifted = 2;
  } else if (shifted == 2) {
    shifted = 0;
    kbdToLC();
    $('#shiftKey').empty().append('<i class="bi-arrow-up"></i>');
  }
}

//Created KW 04/03/2022
//Set the id'ed field to a shortened string
function bksp() {
  // Get the value from the id'ed field
  var currChars = $("#words").val();
  $("#words").val(currChars.substring(0, currChars.length - 1));
}

//Created KW 04/03/2022
//Add line break when enter is pressed
function enter() {
  // Get the value from the id'ed field
  var currChars = $("#words").val();
  $("#words").val(currChars+"\n");
}

//Created PA 07/03/2022
//Edited KW 14/03/2022
//Edited further PA 21/03/2022
//updates characters on the keyboard appropriately
function kbdToUC() {
  $(".lowerCase").hide();
  $(".upperCase").show();
}

//Created PA 07/03/2022
//Edited PA 21/03/2022
//updates characters on the keyboard appropriately
function kbdToLC() {
  $(".upperCase").hide();
  $(".lowerCase").show();
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

//Created DM 13/03/2022
//Function to add elements to carousel of favorite words
function addFavorite() {
    //Gets last word written in textbox
    let words = document.getElementById('words').value.trim();
    var lastWord = words.split(' ')[words.split(' ').length - 1];
    console.log(lastWord);

    //Checks if a word wanting to be favorited is already saved
    //If it doesn't already exist, adds it to the carousel
    if(favoriteWords.includes(lastWord)) {
        alert("\"" + lastWord + "\" is already saved");        
    }
    else {
        let favCount = 0;
        favoriteWords.push(lastWord);
        var x =document.getElementById('elements');
        x.insertAdjacentHTML('beforeend','<div class=carousel-item id=' +favCount+ ' onclick="addToText()">'+lastWord+'</div>');
        favCount++;
        console.log(favoriteWords);    
    }  
}

//Created DM 14/03/2022
//Function to add a favorited word to the text box
function addToText(){
    var currChars = $("#words").val();
    var parentDOM = document.getElementById("elements") 
    var x = parentDOM.getElementsByClassName("active")[0].innerHTML;
    $("#words").val(currChars.concat(" ",x));
    
  }

