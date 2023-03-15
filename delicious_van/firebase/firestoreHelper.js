import { doc, setDoc, deleteDoc } from 'firebase/firestore';

import { collection, addDoc } from "firebase/firestore";
import { firestore } from './firebase-setup';

// Add a new document with a generated id.
export async function writeToDB(goal) {
    try {
        const docRef = await addDoc(collection(firestore, ""), goal);
        console.log("Document written with ID: ", docRef.id);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDB(goalId) {
    try {
        await deleteDoc(doc(firestore, "goals", goalId));
    } catch (err) {
        console.log(err);
    }
}
