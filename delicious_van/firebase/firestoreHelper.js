import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { firestore, storage } from './firebase-setup';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function writePostToDB(post) {
    try {
        const uploadImage = async (imageUri) => {
            try {

                const response = await fetch(imageUri);
                const blob = await response.blob();
                const storageRef = ref(storage, `images/${Date.now()}_${post.title}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                });
                // Wait for the upload to complete
                await uploadTask;
                return getDownloadURL(storageRef);
            } catch (error) {
                console.error('Error uploading image:', error);
                console.error('Error payload:', error.serverResponse);
                throw error;
            }
        };
        const imageUrls = [];
        for (const imageUri of post.images) {
            const url = await uploadImage(imageUri);
            imageUrls.push(url);
        }


        const postWithImages = { ...post, imageUrls };

        const docRef = await addDoc(collection(firestore, "posts"), postWithImages);
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
