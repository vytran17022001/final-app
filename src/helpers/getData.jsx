import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";

async function getData(nameCollection) {
  const col = collection(db, nameCollection); // Tro vao collection
  const schoolSnapShot = await getDocs(col); // Lay du lieu trong collection
  const response = schoolSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() }; // Destructuring
  }); // Map du~ lieu thanh json
  return response; // Tra ve du lieu
}
export default getData;
