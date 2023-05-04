import axios from 'axios';
import React, {useState, useEffect} from "react";
import "firebase/storage";
import {render} from 'react-dom'
import './App.css';
import ReactDOM from 'react-dom';
var firebaseConfig = {apiKey: "AIzaSyAGSNTwjFshoGBdkTzj-HjXWY18h4YWbRE",
authDomain: "doc-edit-76992.firebaseapp.com",
projectId: "doc-edit-76992",
storageBucket: "doc-edit-76992.appspot.com",
messagingSenderId: "125738721432",
appId: "1:125738721432:web:a0a6027c94b27a440b70ed",
measurementId: "G-0BGQRWTTY3"
      // Your Firebase project configuration
};
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    // Create a storage reference
      var storageRef = firebase.storage().ref();

class App extends React.Component{
      
state = {
      selectedFile : null
}    
fileSelectedHandler = event =>{
            this.setState ({
            selectedFile: event.target.files[0]
      })
}

      fileUploadHandler = () =>{
            const fd = new FormData()
            fd.append("image",this.state.selectedFile, this.state.selectedFile.name);
            axios.post("https://us-central1-doc-edit-76992.cloudfunctions.net/uploadFile", fd, {
            onUploadProgress: ProgressEvent => {
                  console.log("Upload progress " + Math.round(ProgressEvent.loaded / ProgressEvent.total*100)+" %")
            }
      })
      .then ((res)=>{
            console.log(res);
      });
}
      render() {
      useEffect(() => {
            loadImage();
            }, []);
      
      useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (originalImage) {
            const img = cropAndResizeImage(originalImage, width, height);
            setCroppedResizedImage(img);
            }
},[originalImage, width, height]
);
}
render() {
            return(
            <div className="App">
                  <h2 align="center">DOCUMENT VIEWER</h2>
                  <div class="center">
                  <input type="file" onChange={this.fileSelectedHandler}/>
                  </div>
                  <button onClick={this.fileUploadHandler}>Upload</button><br/>
                  <button onClick={this.fileUploadHandler}>Upload and Resize</button>

            </div>
            
            );
      }
      
}
function downloadFile() {
      // Get a reference to the file you want to download
      var fileRef = storageRef.child('path/to/file');
      
      // Get the download URL for the file
      fileRef.getDownloadURL().then(function(url) {
        // Create an <a> element with the download URL
            var link = document.createElement('a');
            link.href = url;
            link.download = 'filename.ext';
      
        // Simulate a click on the link to download the file
            link.click();
      }).catch(function(error) {
        // Handle any errors that occur
            console.error(error);
      });
}    
export default App;

