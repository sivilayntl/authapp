"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.");
            return;
        }

        try {
            const resUserExists = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Conten-Type": "application/json"
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("ມີຜູ້ໃຊ້ແລ້ວ.");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Conten-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/");
            } else {
                console.log("ການລົງທະບຽນຜູ້ໃຊ້ບໍສຳເລັດ.");
            }
        } catch (error) {
            console.log("ເກີດຄວາມຜິດພາດໃນລະຫວ່າງການລົງທະບຽນ: ", error);
        }
    };


    return (
        <div className="grid place-content-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
                <h1 className="geistphetsarathOT text-4xl font-bold my-4">ລົງທະບຽນ</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={(e) => setName(e.target.value)} className="geistphetsarathOT" type="text" placeholder="ຊື່-ນາມສະກຸນ" />
                    <input onChange={(e) => setEmail(e.target.value)} className="geistphetsarathOT" type="text" placeholder="ອີເມວ" />
                    <input onChange={(e) => setPassword(e.target.value)} className="geistphetsarathOT" type="password" placeholder="ລະຫັດ" />
                    <button className="geistphetsarathOT bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">ລົງທະບຽນ</button>

                    {error && (
                        <div className="geistphetsarathOT bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )
                    }


                    <Link className="geistphetsarathOT text-sm mt-3 text-right" href={"/"}>
                        ມີບັນຊີຢູ່ແລ້ວແມ່ນບໍ? <span className="geistphetsarathOT underline">ລ໋ອກອິນ</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}