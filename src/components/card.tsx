import React, { useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  data: {
    title: string;
    desc: string;
  };
  index: any;
  tasks: any;
  setTasks: (_: any) => void;
};

export const Card = (props: Props) => {
  const [user, loading, error] = useAuthState(auth);

  async function removeTask() {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      todo: arrayRemove(props.data),
    }).then(() => {
      console.log("Successfully Removed");
    });
  }

  return (
    <div>
      <div className="font-extrabold text-md flex gap-3 w-[27rem] bg-white justify-between items-center rounded-lg p-4  md:w-[500px] mt-3">
        <div className="flex flex-row justify-between p-2 w-full gap-10">
          <div className="flex py-2">{props.data.title}</div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                removeTask();
                const update = [...props.tasks];
                update.splice(props.index, 1);
                props.setTasks(update);
              }}
              className="border bg-teal-500 px-6 rounded-md py-2 cursor-pointer text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
