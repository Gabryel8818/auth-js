var firebaseConfig = {
    apiKey: "AIzaSyDmXOnelyHVWkEvfk28D31px4JHsY06Jxk",
    authDomain: "agenda-5eadc.firebaseapp.com",
    projectId: "agenda-5eadc",
    storageBucket: "agenda-5eadc.appspot.com",
    messagingSenderId: "87008879036",
    appId: "1:87008879036:web:f5c257090ebaf3a8ce8bb9",
    measurementId: "G-5EHFXD3SB5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth()
  const fs = firebase.firestore()



// notes
const notes = document.querySelector('.notes')
const setupNotes = data => {
    if (data.length) {
        let html = ''
        data.forEach(doc => {
            const note = doc.data()
            console.log(note)
            const li = `
            <li style="color:purple;"class= "list-group-item list-group-item-action ">
                <h5>${note.title}</h5>
                <p>${note.description}</p>
                <button style="color:purple;" class="add" onclick="editNote()"> Edit </button>
                <button style="color:purple;" class="add" onclick="delNote()"> Del </button>

            </li>
                    
            `
            html += li
        })

        notes.innerHTML = html
    }  else {
        notes.innerHTML = '<p class="text-center">Não contem nenhuma nota</p>'
    }
}

// events
//list

function readNotes(){
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection('notes')
                .get()
                .then((snapshot) => {
                    console.log(snapshot.docs)
                    setupNotes(snapshot.docs)
                })
        } else {
        console.log('logout')
        
        }
    })
}




document.getElementById('agenda-form').addEventListener("submit", (e)=>{
    var title = document.getElementById("title").value
    var description = document.getElementById("description").value
    e.preventDefault()
    addNote(title,description)
})

//other functions

function addNote(title,description) {
   var newNote = {
       title: title,
       description: description
   }

    let db = fs.collection('notes')
    db.add(newNote).then(()=> {
        swal("Nota Adicionada", "Você editou uma nota", "success");  
    })
        .catch((error) => {
            swal("Error", "error", "error");  
    })
    readNotes()

}

function editNote() {
    swal("Nota Editada", "Você editou uma nota", "success");  

}

function delNote(id){
    fs.collection("notes").doc(id).delete().then(()=>{
        swal("Nota Deletada", "Você deletou uma nota", "error");  
    })
    .catch((error) => {
        swal("Error", "error", "error");  
    })
    
}

readNotes()
