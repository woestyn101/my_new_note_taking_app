console.log("connected note taking")
// setting variabls from html id
const divE = document.getElementById('list');
var userTitle = document.getElementById("title");
var userText = document.getElementById("text");
var saveBtn = document.getElementById("postbutton");
var clearBtn = document.getElementById("clearbutton");
var newBtn = document.getElementById("newbutton");
var delBtn = document.getElementById("deletebutton");

// setting buttons to hide
saveBtn.style.display = "none";
clearBtn.style.display = "none";
newBtn.style.display = "none";
delBtn.style.display = "none";

// clear button click
clearBtn.addEventListener("click", clearForm);

// clear form fields values
function clearForm(){
    userTitle.value = "";
    userText.value = "";
    delBtn.style.display = "none";
    
}

// new button click function
newBtn.addEventListener("click", newNote);

// new button function to clear form fields and hide newBtn
function newNote(){
  userTitle.removeAttribute('readonly');
  userText.removeAttribute('readonly');
    userTitle.value = "";
    userText.value = "";
     newBtn.style.display = "none";
     delBtn.style.display = "none";
}

// adding eventlisteners to input fields
   userTitle.addEventListener('keyup', show );
  userText.addEventListener('keyup', show );

  //hiding save and clear buttons
  function show(){
    
    if (userTitle.value != ""){
        saveBtn.style.display = "inline";
        clearBtn.style.display = "inline";
    }
   
  }

  const getNotes = () =>
  fetch('/notes/api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  .then((data) => {
     return data;
    });

  const saveNote = (newNote) =>
  fetch('/notes/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
   
  const deleteNote = (id) =>
  fetch(`/notes/api/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
      
      // setting empty arrar for db.json data
      var textobject = [];
     
      // outputting db.json data to html
    function renderNotes(note){
        var divTitle = document.createElement("div");
        var divText = document.createElement("div");
            
       
        divTitle.classList.add('title-list');
        divTitle.innerHTML = note.title;
        divText.innerHTML = note.text;
        textobject.push(note.title);
        textobject.push(note.text);
        textobject.push(note.id);
        divE.appendChild(divTitle);
               
     
        
        
        // outputting note text to form field
        divE.addEventListener('click', viewNote);
       
            }
   
            // function to view title and text  in form fields
     function viewNote(event){
        
       userTitle.value = event.target.textContent;
      

        //finding index of title in array
        let titleIndex = textobject.findIndex(x => x == event.target.textContent);
       // getting text value from array
        userText.value = textobject[titleIndex + 1];
        var noteId = textobject[titleIndex + 2];
        console.log(noteId);

        //displaying new btn
        newBtn.style.display = "inline";
        delBtn.style.display = "inline";

        //hiding new btn
        saveBtn.style.display = "none";
        clearBtn.style.display = "none";

        userTitle.setAttribute('readonly', true);
        userText.setAttribute('readonly', true);     
        delBtn.addEventListener('click', deletetheNote);

       
        
        function deletetheNote(){
          deleteNote(noteId);
           goRenderNotes();
        }
            
      
        
     }      

    //  .then(data=>data.json()).then(responseData => {
    //   divE.innerHTML = "";
    //   responseData.forEach((information) => renderNotes(information))
    // }).catch((err)=> console.log(err)); ;
     
    

      // getting notes from db.json and outputting to html
    getNotes().then((response) => response.forEach((item) => renderNotes(item)));

    
   // savebtn click 
    saveBtn.addEventListener("click", postData);
    
    // fuction to post new data to db.json
      function postData() {
        console.log (userTitle.value);
        console.log (userText.value);
        // getting data from input fields
        var userdata = {
          title: userTitle.value,
          text: userText.value,
        
        };

        console.log(userdata);
        saveNote(userdata).then(data=>data.json()).then(responseData => {
          divE.innerHTML = "";
          responseData.forEach((information) => renderNotes(information))
        }).catch((err)=> console.log(err)); 
       
      
       
      }

      const goRenderNotes = () => getNotes().then(responseData => {
        divE.innerHTML = "";
        clearForm();
        responseData.forEach((information) => renderNotes(information))
      }).catch((err)=> console.log(err)); 
      

      



