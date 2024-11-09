import { db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore/lite";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

async function postData(nameCollection, data) {
  await setDoc(doc(db, nameCollection, uuidv4()), data);
}

export default postData;
