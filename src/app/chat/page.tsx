'use client'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Power, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

import { useState } from "react";

export default function Chat() {
    const { data } = useSession()

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    console.log(data)


    return (
        <div className="h-full flex flex-col">
            <div className="relative w-2/4 rounded-md mx-auto flex flex-col justify-start items-start py-2 gap-4 px-2 overflow-y-auto">

                <p className="text-white text-8xl font-bold mb-10 self-center mt-3">
                    Chat
                    <span className="text-purple-700">Dev</span>
                </p>
                <Button className="absolute right-0 gap-3"
                >
                    Sair
                    <Power />
                </Button>
            </div>
            <div
                className="relative w-2/4 h-2/3 bg-slate-900 rounded-md mx-auto flex flex-col justify-start items-start py-2 gap-4 px-2 overflow-y-auto"
            >
                {messages.map((item) =>
                (
                    <div key={Math.random()}
                        className="min-h-14 w-full flex flex-col items-start justify-center border-b-[1px] border-slate-800"
                    >
                        <h1 className="text-white">{item}</h1>
                    </div>
                ))}

            </div>

            <div className="flex bg-slate-900 rounded-t-md items-center w-2/4 self-center absolute bottom-0 p-10">
                <Input placeholder="mensagem" className="flex-1 mr-10"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <Button className="bg-purple-700" size='lg'

                    onClick={() => {
                        if (!message) {
                            alert('Não pode enviar mensagem vazia!')
                            return
                        }

                        setMessages(prev => [...prev, message])
                        setMessage('')
                    }}
                >
                    <SendHorizontal color="white" />
                </Button>
            </div>
        </div>
    );
}
