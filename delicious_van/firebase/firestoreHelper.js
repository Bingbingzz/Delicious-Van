import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from './firebase-setup';

// Add a new document with a generated id.
export async function writePostToDB(post) {
    try {
        const docRef = await addDoc(collection(firestore, "posts"), post);
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log(err);
    }
}

export async function deletePostFromDB(postId) {
    try {
        await deleteDoc(doc(firestore, "posts", postId));
    } catch (err) {
        console.log(err);
    }
}

export async function updatePostInDB(postId, updatedPost) {
    try {
        const entryRef = doc(firestore, 'posts', postId);
        await updateDoc(entryRef, updatedEntry);
        console.log('Document updated successfully');
    } catch (err) {
        console.log(err);
    }
}
