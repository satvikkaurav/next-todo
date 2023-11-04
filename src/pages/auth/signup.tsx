import Image from "next/image";
import { Inter } from "next/font/google";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential?.user;
        const docRef = doc(db, "users",user.uid)
        setDoc(docRef,{
          name : name,
          todo : []
        })
      })
      .then(()=>{
        console.log("Successfully Account Created")
        router.push("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className="h-[95vh] w-full flex justify-center items-center">
      <main className="flex flex-col items-center justify-center drop-shadow-md">
        <div className="flex gap-3 bg-white w-3/4 justify-center items-center rounded-lg flex-col p-16 md:w-[500px]">
          <div className="flex font-extrabold text-2xl">Sign Up</div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <button
            className="border bg-teal-500 px-6 rounded-md py-2 cursor-pointer text-white"
            onClick={() => {
              signUp();
            }}
          >
            Sign Up
          </button>
          <div className="flex flex-col justify-center items-center pt-4">
            Already have an account?
            <div className="text-teal-800">
              <Link href="/auth/signup">LogIn</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
