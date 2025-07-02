
import multer from "multer";
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

initializeApp(config.firebaseConfig);

const storage = getStorage();

export const uploadBlogPic = multer({ storage: multer.memoryStorage() });
export const uploadProfilePic = multer({ storage: multer.memoryStorage() });



// /// upload profile pictures controller
export async function handleUserPictureUpload(req, res) {

  try{
if(req.file.originalname !== undefined){
 const storageRef = ref(
        storage,
        `pictures/${Date.now() + req.file.originalname}`
      );
      const metadata = {
        contentType: req.file.mimetype,
      };
  
      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
  
      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);
      res.status(201).json({
        message: "file uploaded to firebase storage",
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      });
}

  }catch(err){
    console.log(err);
    throw new Error(err)
  }

   
}


// /// upload blog photos controller
export async function handleUserBlogUpload(req,res){

    const storageRef = ref(
        storage,
        `uploads/${Date.now() + req.file.originalname}`
      );
    
      const metadata = {
        contentType: req.file.mimetype,
      };
    
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
    
      const downloadURL = await getDownloadURL(snapshot.ref);
      res.status(201).json({
        message: "file uploaded to firebase storage",
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      });
}
