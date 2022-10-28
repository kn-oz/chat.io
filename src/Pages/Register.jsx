import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";


export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const avatar = event.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const date = new Date().getTime();

      const storageRef = ref(storage, `${displayName + date}`);

      try {
        const uploadTask = await uploadBytesResumable(storageRef, avatar);

        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(response.user, {
          displayName,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "users-chats", response.user.uid), {});

        navigate('/chat.io');

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer bg-black h-screen flex justify-center items-center">
      <div className="formWrapper bg-gray px-12 py-16 flex flex-col items-center gap-3 rounded-xl">
        <span className="logo text-3xl text-white font-bold">Chat.io </span>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-4 w-80 border-b border-blue rounded-md placeholder:text-blue-200 focus:outline-none  focus:border-blue-400 focus:border focus:rounded-md"
            type="text"
            name=""
            id=""
            placeholder="display name"
          />
          <input
            className="p-4 w-80 border-b border-blue rounded-md placeholder:text-blue-200 focus:outline-none  focus:border-blue-400 focus:border focus:rounded-md"
            type="email"
            name=""
            id=""
            placeholder="email"
          />
          <input
            className="p-4 w-80 border-b border-blue rounded-md placeholder:text-blue-200 focus:outline-none  focus:border-blue-400 focus:border focus:rounded-md"
            type="password"
            name=""
            id=""
            placeholder="password"
          />
          <label
            htmlFor="file"
            className="flex justify-start items-center cursor-pointer text-blue gap-3 text-xs"
          >
            <img className="w-8" src={Add} alt="avatar" />
            <span>Add an avatar</span>
          </label>
          <input className="p-4 hidden" type="file" name="" id="file" />
          <button disabled={loading} className="bg-purple hover:bg-purpledark text-white p-3 font-bold border-none cursor-pointer rounded-md">
            Register
          </button>
          {loading && "Uploading image..."}
          {error && <span className="text-red">Something went wrong!!!</span>}
        </form>
        <p className="text-xs text-white m-3">
          {" "}
          Already have an account? <Link className="hover:text-purple" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
