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
const PORT = 4222

 var favoriteWords = [];
 var blogNum = 0;
 var shifted = 0;
 var banking = 0;
 var delwordbank = 0;
 
 
 
 function setup() {
   //Created SC 21/03/2022
   //Edited KW 25/03/2022
   //getting data from server
    $.get(SERVER_URL+PORT+'/onload',(dataReturned)=>{
        //placing blogs in text boxes
        $('#text1').val(dataReturned.blogs[0].text)
        $('#text2').val(dataReturned.blogs[1].text)
        $('#text3').val(dataReturned.blogs[2].text)

        //placing saved words from server into the array
        favoriteWords = dataReturned.words
        for(let i = 0 ; i < favoriteWords.length ; i++){
            document.getElementById('wordbankElements').insertAdjacentHTML('beforeend','<button type="button" class="btn btn-light" onclick="delCheck('+"'" +favoriteWords[i]+ "'"+')">' +favoriteWords[i]+ '</button')
        }

        //slide publish sliders to correct position
        $('#pub1').prop('checked',dataReturned.blogs[0].publish)
        $('#pub2').prop('checked',dataReturned.blogs[1].publish)
        $('#pub3').prop('checked',dataReturned.blogs[2].publish)
        for(let i=0;i<dataReturned.blogs.length;i++){
            console.log(dataReturned.blogs[i])
        }
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
        $("#table").attr("hidden", true)
        $("#textArea").attr("hidden", false)
        blogNum = 1
        $('#blogText').text($('#text1').val())
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
       $("#table").attr("hidden", true)
       $("#textArea").attr("hidden", false)
       blogNum = 2;
       $('#blogText').text($('#text2').val())
     }
   });
 
   //Created PA 02/03/2022 
   $("#edit3").change(function() {
     if(this.checked) {
       $("#table").attr("hidden", true)
       $("#textArea").attr("hidden", false)
       blogNum = 3;
       $('#blogText').text($('#text3').val())
     }
   });
 
   //Listener for submit button
   $('#submit').click(()=>{

    //Catches submit button to deal with confirmation boxes
        processSaveModal();
   
    })
    /*    
     //check if storage is available
     if(typeof Storage !=='undefined'){
     
       //get the word from user
       var input = $('#words').val();
 
       //emptying the text box
       //$('#words').val('')
         
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
    */
     
    //Listener for cancel button
    $('#cancel').click(()=>{
        //Catches cancel button to deal with confirmation boxes
     processCancelModal();
    }) 

    //Listener for the undo button
    $('#undo').click(undo)

    //Listener if delete is checked
    //Created by DM 27/03/2022
    $('#delete').on("click", function() {
        if(delwordbank===0){
            delwordbank=1;
            $('#wbtitle').empty().append('Remove from WordBank (Click to Delete)');
            $('#wbarea').css("background-color", "rgb(175, 30, 45)");
        }
        else{
            delwordbank=0;
            $('#wbtitle').empty().append('WordBank (Click to Add)');
            $('#wbarea').css("background-color", "rgb(25, 33, 104)");
        }
    })
 }
 
//Created KW 04/03/2022
 //Edited PG 07/03/2022
 //Edited again PG 28/03/28
 // add into text field keyboard input
 function addChar(selection) {
   if (banking == 0) {
    // Get the value from the id'ed field
    $("#blogText").append(selection);
   } else { // if banking ne word, update that field instead
    $("#newWord").append(selection);
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
  if (banking == 0) {
    let blog = $('#blogText').text();
    blog = blog.substring(0, blog.length - 1);
    $('#blogText').empty().append(blog);
  } else {
    let newWord = $('#newWord').text();
    if (newWord.length == 1) {
      $('#newWord').empty();
      $('#bankKey').empty().append('<i class="bi-star"></i>');
    } else if (newWord.length > 1) {
      newWord = newWord.substring(0, newWord.length - 1);
      $('#newWord').empty().append(newWord);
    }
  }
}  
 
 //Created KW 04/03/2022
 //Add line break when enter is pressed
 function enter() {
   // Get the value from the id'ed field
   addChar("<br>");
 }
 
 function bank() {
   // stub that updates the bank key on click
   // will interact with word bank later
   if (banking == 0) {
     banking = 1;
     $('#bankKey').empty().append('<i class="bi-star"></i>');
   } else if (banking == 1) {
     banking = 0;
    let  newWord = $('#newWord').text();
     $('#bankKey').empty().append('<i class="bi-star-fill"></i>');
     if (newWord.length != 0) {
       $('#newWord').empty();
       $('#blogText').append(newWord);
       // call to function that adds the new word to the word bank
       console.log("Adding '" + newWord + "' to word bank.");
       wordBank(newWord)
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
   $("#table").attr("hidden", false)
         
   //uncheck buttons
   $('#edit1').prop('checked',false)
   $('#edit2').prop('checked',false)
   $('#edit3').prop('checked',false)
         
   //hide text box and keyboard
   $('#textArea').attr("hidden", true)
 
   //blanking the text area
   $('#words').val('')
 }
 

 /*
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
 */
 /*
 //Created DM 14/03/2022
 //Function to add a favorited word to the text box
 function addToText(){
     var currChars = $("#words").val();
     var parentDOM = document.getElementById("elements") 
     var x = parentDOM.getElementsByClassName("active")[0].innerHTML;
     $("#words").val(currChars.concat(" ",x));
 }
 */

 
 function finalSave() { 
     console.log($('#blogText').text()) 
   let blogObj = {numb:blogNum, text: $('#blogText').text()}
   console.log(blogObj)
   
   $.post(SERVER_URL+PORT+'/update',blogObj,(dataReturned)=>{
       $('#text1').val(dataReturned[0].text)
       $('#text2').val(dataReturned[1].text)
       $('#text3').val(dataReturned[2].text)

   })
   //reseting buttons and text area
  reset()
/*
  //check if storage is available
  if(typeof Storage !=='undefined'){
  
    //get the word from user
    var input = $('#words').val();

    //emptying the text box
    $('#words').val('')
     console.log('edit'+blogNum,input); 
    //Store stringified object to localStorage
    window.localStorage.setItem('edit'+blogNum,input)

  //else if there is no local storage
  }else{
    console.log('no local storage available')
  }
  */
  
  

  //Write input to edit box
  closeModal();
}

//Created by SC 10/03/2022
//function to update publish var on server
function publishUpdate(x){
    let pubBool = ($('#pub'+x).prop('checked')===true)

    console.log('pubCheck'+x+': '+pubBool)
    let pubObj = {publish:pubBool}

    $.post(SERVER_URL+PORT+'/pub'+x,pubObj,(dataReturned)=>{
        console.log(dataReturned)
        for(let i=0;i<dataReturned.length;i++){
            console.log('pub'+x+': '+dataReturned[i].publish)
        }
    })

}
 
//Created KW 25/03/22
//Brings up first save modal
function processSaveModal(){
 console.log("I am a callback");
$("#saveConfirm1").show();
console.log("opening Modal");
}

//Created KW 25/03/22
//Brings up first cancel modal
function processCancelModal(){
  console.log("I am a callback");
 $("#cancelConfirm1").show();
 console.log("opening Modal");
 }

 //Created KW 25/03/22
 //Brings up second save modal
function saveClick(){
  $("#saveConfirm1").hide();
  $("#saveConfirm2").show();
}

//Created KW 25/03/22
//Brings up second cancel modal
function cancelClick(){
  $("#cancelConfirm1").hide();
  $("#cancelConfirm2").show();
}

//Created KW 25/03/22 close the modals all of them
function closeModal() {
  console.log("closing Modal")
  $("#saveConfirm1").hide();
  $("#saveConfirm2").hide();
  $("#cancelConfirm1").hide();
  $("#cancelConfirm2").hide();
}

//Created KW 25/03/22
//User hits final cancel resets blog 
function finalCancel(){
  reset();
  closeModal();
}

//Created by SC 03/03/2022
function undo() {
    //Stolen from DM on 21/03/22 by SC
    let words = $('#blogText').text().trim();
    var lastWord = words.split(' ')[words.split(' ').length - 1];
  
    //Created SC 21/03/22
    //take the last word off the whole
    let newWords = words.substring(0,(words.length-lastWord.length))
    $('#blogText').text(newWords)
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

    let wordObj = {word:word}
    $.post(SERVER_URL+PORT+'/favWord',wordObj,(dataReturned)=>{
        console.log(dataReturned)
    })

}


function delCheck(word) {
    if(delwordbank === 0) {
        addToText(word);
    }
    else{
        delWord(word)
    }
}

//Created SC 03/29/2022
//function to delete word from array
function delWord(word){
    for(let i=0;i<favoriteWords.length;i++){
        //search for word and remeove from array
        if(favoriteWords[i]===word){
            //splicing word from array
            favoriteWords.splice(i,1)
            numbObj = {numb:i}
            $.post(SERVER_URL+PORT+'/delFavWord',numbObj,(dataReturned)=>{
                console.log(dataReturned)
            })
        }

    }
    if(favoriteWords.length>0){
        $('#wordbankElements').html('<button type="button" class="btn btn-light" onclick="delCheck('+"'" +favoriteWords[0]+ "'"+')">' +favoriteWords[0]+ '</button')
        for(let i=1;i<favoriteWords.length;i++){
            console.log(i)
            document.getElementById('wordbankElements').insertAdjacentHTML('beforeend','<button type="button" class="btn btn-light" onclick="delCheck('+"'" +favoriteWords[i]+ "'"+')">' +favoriteWords[i]+ '</button')
        }
    }else{
        $('#wordbankElements').html('') 
    }
}

//Created DM 27/03/2022
//Adds the selected banked word(s) to textbox
function addToText(word) {
    let currChars = $('#blogText').text()
    $('#blogText').text(currChars.concat(" ",word));
}