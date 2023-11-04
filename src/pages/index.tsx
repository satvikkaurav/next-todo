import Image from "next/image";
import { Inter } from "next/font/google";
import { Card } from "@/components/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import Header from "@/components/navbar";
import { useRouter } from "next/router";
import { title } from "process";

const inter = Inter({ subsets: ["latin"] });

type datatype = {
  title: string;
  desc: string;
};

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<datatype>({ title: "", desc: "" });
  const router = useRouter();

  const [tasks, setTasks] = useState<any>();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((d) => {
        const data2 = d.data() ?? {};
        console.log(data2?.todo);
        setTasks(data2?.todo);
      });
    }
  }, [user]);

  async function postData(uid: any) {
    console.log(data);
    const dd = [...tasks, data];
    setTasks(dd);
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      todo: arrayUnion(data),
    });
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center drop-shadow-md mt-20">
        <div className="flex gap-3 bg-white w-3/4 justify-center items-center rounded-lg flex-col p-6 md:w-[500px]">
          <div className="flex font-extrabold text-2xl">Task Manager</div>
          <input
            placeholder="Task Title"
            value={data.title}
            onChange={(e) =>
              setData((val) => {
                return { ...val, title: e.target.value };
              })
            }
            className="px-6 py-2 rounded-md border border-blue-200"
          ></input>
          <textarea
            placeholder="Task Description"
            className="px-7 py-8 rounded-md border border-blue-200"
            value={data.desc}
            onChange={(e) =>
              setData((val) => {
                return { ...val, desc: e.target.value };
              })
            }
          ></textarea>
          <button
            type="submit"
            className="border bg-teal-500 px-6 rounded-md py-2 cursor-pointer text-white"
            onClick={() => postData(user?.uid)}
          >
            Add Task
          </button>
        </div>

        <h2 className="text-2xl font-extrabold mt-5 mb-2 gap">Tasks</h2>
        {tasks &&
          tasks.map((data:any, index:any) => {
            return (
              <Card
                data={data}
                key={index}
                index={index}
                tasks={tasks}
                setTasks={setTasks}
              />
            );
          })}
      </main>
    </>
  );
}
