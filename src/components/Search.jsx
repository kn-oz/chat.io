import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Search() {
  const [userName, setUserName] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const handleKeyDown = (event) => {
    event.code === "Enter" && searchUser();
  };

  const searchUser = async () => {
    try {
      console.log(`this try block executed ${userName}`);
      const userSearchQuery = query(
        collection(db, "users"),
        where("displayName", "==", userName)
      );

      console.log('check point 1');
      setError(false);
      const userSearchQuerySnapshot = await getDocs(userSearchQuery);
      console.log(userSearchQuerySnapshot);
      userSearchQuerySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
        console.log(doc.data());
      });
      console.log('check point 3');
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  const handleSelect = async () => {
    console.log("handle Select called");

    const combinedId =
      user.uid > searchedUser.uid
        ? user.uid + searchedUser.uid
        : searchedUser.uid + user.uid;

    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
      }

      await updateDoc(doc(db, "users-chats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: searchedUser.uid,
          displayName: searchedUser.displayName,
          photoURL: searchedUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "users-chats", searchedUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }

    setSearchedUser(null);
    setUserName("");
  };

  return (
    <div className="search border-b border-gray">
      <div className="searchForm p-3">
        <input
          className="bg-transparent outline-none border-none text-white placeholder:text-gray-100"
          type="text"
          placeholder="find a user"
          onKeyDown={handleKeyDown}
          onChange={(event) => setUserName(event.target.value)}
          value={userName}
        />
      </div>
      {error && <p className="text-red-500 text-center">User not found!</p>}
      {searchedUser && (
        <div
          className="user-chat p-3 flex items-center gap-3 text-white cursor-pointer hover:bg-gray"
          onClick={handleSelect}
        >
          <img
            className="w-12 h-12 rounded-[50%] object-cover"
            src={searchedUser.photoURL}
            alt="user"
          />
          <div className="user-chat-info">
            <span className="text-lg font-medium">
              {searchedUser.displayName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
