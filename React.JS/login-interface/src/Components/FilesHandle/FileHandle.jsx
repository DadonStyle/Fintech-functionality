import React, { useCallback, useContext, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import firebase from "firebase";
import NotyfContext from "../../utill/NotyfContext";
import { dateFormat } from "../../Service/TimeFormater";
import { useHistory } from "react-router";

const FileHandle = () => {
  //redirect
  const history = useHistory();
  //notyf
  const notyf = useContext(NotyfContext);
  //current user uid
  const [userUID] = useState(localStorage.getItem("currentUser"));
  //gather files to the state
  const [userFiles, setUserFiles] = useState([]);
  //easy access to the storage
  const storageRef = firebase.storage().ref();
  //force render to display on screen (not ideal)
  const [state, setState] = useState(0);
  //help initialize the state
  const myFiles = [];

  useEffect(() => {
    getUserFiles();
  }, []);

  //Loader ?

  //getting the files of the logged in user for display
  const getUserFiles = async () => {
    if (!userUID) {
      history.push("/login-auth");
    }
    let listRef = storageRef.child(userUID);

    const res = await listRef.listAll();
    //iterate over the files in the storage
    for (var itemRef of res.items) {
      const itemMetadata = await itemRef.getMetadata();
      const url = await itemRef.getDownloadURL();
      //saves the data to one object
      var file = {
        name: itemMetadata.name.toString(),
        timeCreated: itemMetadata.timeCreated.toString(),
        link: url,
      };
      //adds to the array
      myFiles.push(file);
    }
    //update the state
    setUserFiles(myFiles);
    //only this trick (re render with another state change) made it work and display
    setState(1);
  };

  //use for the drop zone, saves the files to the storage by uid
  const onDrop = useCallback((acceptedFiles) => {
    if (!userUID) {
      console.log(userUID);
      notyf.error("please login first");
      return null;
    }

    let ref = storageRef.child(userUID + "/" + acceptedFiles[0].name);

    ref.put(acceptedFiles[0]).then((snapshot) => {
      console.log(snapshot);
      notyf.success("upload successfully");
    });
  }, []);

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>

      {userFiles.length > 0
        ? userFiles.map((item) => {
            return (
              <>
                <div>{item.name}</div>
                <div>{dateFormat(item.timeCreated)}</div>
                <a href={item.link}>Download File</a>
                <br></br>
              </>
            );
          })
        : "loading"}
    </div>
  );
};

export default FileHandle;
