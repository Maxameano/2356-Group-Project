/**
 * Authors:Peter Akerley (PA),
 *         Sebastian Cox (SC),
 *         Dylan MacDonnell (DM),
 *         Kevin Wiwczor (KW)
 * 
 * Key:
 *      Creation/Edits : INITIAL DD/MM/YYYY
 */

//Created By SC 21/03/2022
//Constants for server
const SERVER_URL = 'http://ugdev.cs.smu.ca:'
const PORT = 4242

 var favoriteWords = [];
 var blogNum = 0;
 var shifted = 0;
 var banking = 0;
 var newWord;
 
 
 
 function setup() {
   //Created SC 21/03/2022
   //getting data from server
    $.get(SERVER_URL+PORT+'/onload',(dataReturned)=>{
        //placing blogs in text boxes
        $('#text1').val(dataReturned.blogs[0].text)
        $('#text2').val(dataReturned.blogs[1].text)
        $('#text3').val(dataReturned.blogs[2].text)

        //placing saved words from server into the array
        favoriteWords = dataReturned.words
    })

   /* 
   //Created SC 02/03/2022
   //writing items from local storage to text boxes  
   $('#text1').val(localStorage.getItem('edit1'))
   $('#text2').val(localStorage.getItem('edit2'))
   $('#text3').val(localStorage.getItem('edit3'))
   */
 
   kbdToLC();
 
   //Created PA 14/03/2022
   //Creates a click/hover listener for all the keys
   const kbd = document.querySelectorAll('.myBtn');
   kbd.forEach(key => {
     key.addEventListener('click', function() {
       let input;
       if (shifted == 0){
         input = this.children[0].innerHTML;
       } else {
         input = this.children[1].innerHTML;
       }
       addChar(input);
     });
   });
 
   //Created PA 02/03/2022
   //editted SC 03/22/2022
   $("#edit1").change(function() {
    if(this.checked){
        $("#table").hide()
        $("#textArea").attr("hidden", false)
    }

    /*
    Created PA 02/03/2022
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
     */
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

    //Listener for the undo button
    $('#undo').click(undo)
 }
 
 //Created KW 04/03/2022
 //Edited PG 07/03/2022
 // add into text field keyboard input
 function addChar(selection) {
   // Get the value from the id'ed field
   var currChars = $("#words").val();
 
   // Add letter
   $("#words").val(currChars+selection);
 
   if (banking == 1) {
     newWord = newWord + selection;
     console.log(newWord);
     $('#bankKey').empty().append('<i class="bi-star-half"></i>');
   }
 
   // Unshift if shifted use prebuilt shift function to do this.
   if (shifted == 1) {
     shifted = 2;
     shift();
   }
 }
 
 function shift() {
   if (shifted == 0) {
     shifted = 1;
     kbdToUC();
     $('#shiftKey').empty().append("CAPS");
   } else if (shifted == 1) {
     shifted = 2;
     $('#shiftKey').empty().append("*CAPS*");
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
   if (banking == 1) {
     newWord = newWord.substring(0, newWord.length - 1);
     if (newWord.length == 0) {
       $('#bankKey').empty().append('<i class="bi-star"></i>');
     }
   }
 }
 
 //Created KW 04/03/2022
 //Add line break when enter is pressed
 function enter() {
   // Get the value from the id'ed field
   addChar("\n");
 }
 
 function bank() {
   // stub that updates the bank key on click
   // will interact with word bank later
   if (banking == 0) {
     banking = 1;
     newWord = '';
     $('#bankKey').empty().append('<i class="bi-star"></i>');
   } else if (banking == 1) {
     banking = 0;
     $('#bankKey').empty().append('<i class="bi-star-fill"></i>');
     if (newWord.length != 0) {
       // call to function that adds the new word to the word bank
       wordBank(newWord);
       console.log("Adding '" + newWord + "' to word bank.");
     }
   }
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
   $("#table").show()
         
   //uncheck buttons
   $('#edit1').prop('checked',false)
   $('#edit2').prop('checked',false)
   $('#edit3').prop('checked',false)
         
   //hide text box and keyboard
   $('#textArea').attr("hidden", true)
 
   //blanking the text area
   $('#words').val('')
}

function undo() {
    //Stolen from DM on 21/03/22 by SC
    let words = document.getElementById('words').value.trim();
    var lastWord = words.split(' ')[words.split(' ').length - 1];
  
    //Created SC 21/03/22
    //take the last word off the whole
    let newWords = words.substring(0,(words.length-lastWord.length))
    $('#words').val(newWords)
}

//Created DM 27/03/2022
//Adds new word(s) to word bank
function wordBank(newWord) {
    //removing extra spaces from left/right of word(s) 
    let word = newWord.trim();
    console.log(word);
    
    favoriteWords.push(word);
    var x = document.getElementById('wordbankElements');
    x.insertAdjacentHTML('beforeend','<button type="button" class="btn btn-light" onclick="delCheck('+"'" +word+ "'"+')">' +word+ '</button');
    console.log(favoriteWords);

}

function delCheck(word) {
    let click = 0;
    if(click == 0) {
        addToText(word);
        click = 1;
    }
    else{
        this.delete;
    }
}

//Created DM 27/03/2022
//Adds the selected banked word(s) to textbox
function addToText(word) {
    let currChars = $('#words').val()
    $('#words').val(currChars.concat(" ",word));
}
 
