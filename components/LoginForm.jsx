"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, 
                password, 
                erdirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid place-content-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-400">
                <h1 className="geistphetsarathOT text-4xl font-bold my-4">ລ໋ອກອິນ</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={e => setEmail(e.target.value)} className="geistphetsarathOT" type="text" placeholder="ອີເມວ" />
                    <input onChange={e => setPassword(e.target.value)} className="geistphetsarathOT" type="password" placeholder="ລະຫັດ" />
                    <button className="geistphetsarathOT bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">ເຂົ້າສູ່ລະບົບ</button>
                    {error && (
                        <div className="geistphetsarathOT bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <Link className="geistphetsarathOT text-sm mt-3 text-right" href={'/register'}>
                        ຍັງບໍ່ມີບັນຊີບໍ? <span className="geistphetsarathOT underline">ລົງທະບຽນ</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}