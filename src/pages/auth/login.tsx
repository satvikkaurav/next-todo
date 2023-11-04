import Image from "next/image";
import { Inter } from "next/font/google";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="h-[95vh] w-full flex justify-center items-center">
      <main className="flex flex-col items-center justify-center drop-shadow-md">
        <div className="flex gap-3 bg-white w-3/4 justify-center items-center rounded-lg flex-col p-16 md:w-[500px]">
          <div className="flex font-extrabold text-2xl">Login</div>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <button
            onClick={() => signInWithEmailAndPassword(email, password)}
            className="border bg-teal-500 px-6 rounded-md py-2 cursor-pointer text-white"
          >
            Log In
          </button>
          <div className="flex flex-col justify-center items-center pt-4">
            Not have an account?
            <div className="text-teal-800">
              <Link href="/auth/signup">Register Now</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
