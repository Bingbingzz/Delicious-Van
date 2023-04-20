import { doc, setDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, firestore, storage } from "./firebase-setup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, updateEmail } from "firebase/auth";

export async function getPostFromDB(id) {
  try {
    const postRef = doc(firestore, "posts", id);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      const queryUsersSnapshot = await getDocs(collection(firestore, "users"));
      let user;
      queryUsersSnapshot.forEach((doc) => {
        if (doc.data().uid === postData.userEmail) {
          user = doc.data();
        }
      });
      return {
        id: postSnapshot.id,
        ...postData,
        user,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}
export async function writePostToDB(post) {
  try {
    // const uploadImage = async (imageUri) => {
    //   try {
    //     const normalizedUri = imageUri.startsWith("file://")
    //       ? imageUri
    //       : "file://" + imageUri;
    //     const response = await fetch(normalizedUri);
    //     const blob = await response.blob();
    //     const storageRef = ref(storage, `images/${Date.now()}_${post.title}`);
    //     const uploadTask = uploadBytesResumable(storageRef, blob);
    //     uploadTask.on("state_changed", (snapshot) => {
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log(`Upload is ${progress}% done`);
    //     });
    //     // Wait for the upload to complete
    //     await uploadTask;
    //     return getDownloadURL(storageRef);
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     console.error("Error payload:", error.serverResponse);
    //     throw error;
    //   }
    // };

    const imageUrls = [];
    for (const imageUri of post.images) {
      const url = await uploadImage(imageUri);
      imageUrls.push(url);
    }

    const postWithImages = { ...post, imageUrls };

    const docRef = await addDoc(collection(firestore, "posts"), postWithImages);
  } catch (err) {
    console.log(err);
  }
}

export const uploadImage = async (imageUri) => {
  try {
    const normalizedUri = imageUri.startsWith("file://")
      ? imageUri
      : "file://" + imageUri;
    const response = await fetch(normalizedUri);
    const blob = await response.blob();
    const random = Math.random() * 100000;
    const storageRef = ref(storage, `images/${Date.now()}_${random}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    });
    // Wait for the upload to complete
    await uploadTask;
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading image:", error);
    console.error("Error payload:", error.serverResponse);
    throw error;
  }
};

export async function deletePostFromDB(postId) {
  try {
    await deleteDoc(doc(firestore, "posts", postId));
  } catch (err) {
    console.log(err);
  }
}

export async function updatePostInDB(postId, updatedPost) {
  try {
    const entryRef = doc(firestore, "posts", postId);
    await updateDoc(entryRef, updatedPost);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserInDB(username, email, location, gender) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: `${username}|${location}|${gender}|${email}`,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateUserPictureInDB(email, url) {
  try {
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    const queryUsersSnapshot = await getDocs(collection(firestore, "users"));
    let userDoc;
    queryUsersSnapshot.forEach((doc) => {
      console.log(doc.data().email, email);
      if (doc.data().email === email) {
        userDoc = { ...doc.data(), id: doc.id };
      }
    });

    if (userDoc) {
      const entryRef = doc(firestore, "users", userDoc.id);
      await updateDoc(entryRef, {
        ...userDoc,
        photoURL: url,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
