const SERVER_URL = "http://ugdev.cs.smu.ca:"
const PORT = 4222

//function for public setup
function setup1(){
    pubCheck()

    //listeners for blogs to save blog numb to local Storage
    $('#blog1').click(()=>{
        if(typeof Storage !=='undefined'){
            window.localStorage.setItem('blog',1)
        }
    })
    $('#blog2').click(()=>{
        if(typeof Storage !=='undefined'){
            window.localStorage.setItem('blog',2)
        }
    })
    $('#blog3').click(()=>{
        if(typeof Storage !=='undefined'){
            window.localStorage.setItem('blog',3)
        }
    })
}
function pubCheck(){
    $.get(SERVER_URL+PORT+'/onload',(dataReturned)=>{
        //loop through array of blogs
        for(let i=0;i<3;i++){
            //check if blog should be published
            if(!dataReturned.blogs[i].publish){
                //hide blog if not published
                $('#blog'+(i+1)).hide()
            }
        }
    })
}


function blogGet(){
    let numb = parseInt(window.localStorage.getItem('blog'))
    $.post(SERVER_URL+PORT+'/reqBlog',{numb:numb},(dataReturned)=>{
        console.log(dataReturned)
        let text = dataReturned.text
        $('#blogTitle').text('Blog '+numb)
        $('#blogContent').text(text)
        
    })
}
