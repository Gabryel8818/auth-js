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
  var logout = document.querySelector("#logout")


// notes
function readNotes(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    fs.collection("notes").onSnapshot(function(snapshot){
        document.querySelector(".notes").innerHTML=''
        snapshot.forEach(function(noteValue) {
            document.querySelector(".notes").innerHTML+=`
            <li style="color:purple;"class= "list-group-item list-group-item-action ">
              <h5>${noteValue.data().title}</h5>
              <p>${noteValue.data().description}</p>
              <button style="color:purple;" class="add" onclick="editNote('${noteValue.id}')"> Edit </button>
              <button style="color:purple;" class="add" onclick="delNote('${noteValue.id}')"> Del </button>
            </li>
            `
        })
    })  } else {
        swal("Error", "Você não esta conectado", "error");
  }
});

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
        swal("Nota Adicionada", "Você adicionou uma nota", "success");
    })
        .catch((error) => {
            swal("Error", "error", "error");
    })
    readNotes()

}

function editNote(id) {
    Swal.fire({
        title: 'Editar Nota',
        html: `<input type="text" id="title" class="swal2-input" placeholder="Titulo">
        <input type="text" id="description" class="swal2-input" placeholder="Descrição">`,
        confirmButtonText: 'Confirmar',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          const description = Swal.getPopup().querySelector('#description').value
          if (!title || !description) {
            Swal.showValidationMessage(`Please enter title and desc`)
          }
          return { title: title, description: description }
        }
      }).then((result) => {
          var noteUpdate = {
              title: result.value.title,
              description: result.value.description
          }
        let db = fs.collection("notes").doc(id)
        db.set(noteUpdate).then(()=> {
            Swal.fire(`
                Novo Titulo: ${result.value.title}
                Nova Descrição: ${result.value.description}
        `.trim())
        })

      })
}

function delNote(id){
    fs.collection("notes").doc(id).delete().then(()=>{
        swal("Nota Deletada", "Você deletou uma nota", "error");
    })
    .catch((error) => {
        swal("Error", "error", "error");
    })

}

logout.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
          window.location.href = "index.html";

        }, function (error) {
            console.error(error);
          });
});

readNotes()
