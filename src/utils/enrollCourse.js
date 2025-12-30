import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function enrollCourse(user, courseId) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // first time user
    await setDoc(userRef, {
      enrolledCourses: [courseId],
      completedLessons: [],
      streak: 0,
    });
  } else {
    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseId),
    });
  }
}
