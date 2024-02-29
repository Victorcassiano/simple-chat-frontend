'use client'
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"
import { signOut } from 'next-auth/react'
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Power, SendHorizontal } from "lucide-react";
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";


interface IMessage {
    nickname: string;
    message: string;
    image: string;
    genre: string;
}

interface IUser { name: string, image: string, email: string }

export default function Chat() {
    const route = useRouter()
    const chatRef = useRef(null)
    const [user, setUser] = useState({ name: '', image: '', email: '' });


    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [socket, setSocket] =
        useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };


    const getSessionn = async () => {
        const { user } = await getSession()
        console.log(user)
        setUser(user)
    }




    useEffect(() => {
        const ooo: IUser = user
        if (!socket && ooo.name) {
            setSocket(
                io('http://localhost:3333/', {
                    query: {
                        nickname: ooo.name,
                        image: ooo.image
                    },
                }),
            );
        }
    }, [socket, user]);


    useEffect(() => {
        getSessionn()
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('message', (res) => {
                setMessages(res);
            });

            socket.on('allMessages', (res) => {
                setMessages(res)
            })
        }
    }, [socket]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const signout = () => {
        signOut({ callbackUrl: '/', redirect: true })
    }

    const handleMessage = () => {
        if (!message) {
            alert('Não pode enviar mensagem vazia!')
            return
        }

        if (!socket) return;
        socket.emit('message', message);
        setMessage('')
    }

    const onKeyDown = useCallback(
        (event: any) => {
            if (event.key === 'Enter') {
                handleMessage();
            }
        },
        [handleMessage],
    );

    return (
        <div className="h-full flex flex-col">
            <div className="relative w-2/4  tablet:w-[95%] mobile:w-full rounded-md mx-auto flex flex-row justify-between items-center py-2 gap-4 px-2 my-5">

                <p className="text-white text-6xl font-bold tablet:text-4xl mobile:text-4xl">
                    Chat
                    <span className="text-purple-700">Dev</span>
                </p>
                <Button className="gap-3 mobile:hidden tablet:hidden"
                    onClick={signout}
                >
                    Sair
                    <Power />
                </Button>
                <Button className="desktop:hidden mobile:flex tablet:flex mobile:relative mobile:right-0 mobile:top-0 tablet:relative tablet:right-0 tablet:top-0"
                    onClick={signout}
                >
                    <Power />
                </Button>
            </div>
            <div
                ref={chatRef}
                className="w-2/4 h-[70%] mobile:w-full tablet:w-[95%] tablet:h-[70%] bg-slate-900 rounded-md mx-auto flex flex-col justify-start items-start py-2 gap-4 px-2 overflow-y-auto "
            >
                {messages.map((item) =>
                (
                    <div key={Math.random()}
                        className="min-h-24 h-24 w-full py-5 flex flex-row items-center justify-start border-b-[1px] border-slate-800"
                    >
                        <img src={item.image} alt="profile" className="w-10 h-10 rounded-full mr-3 " />
                        <div>
                            <span className="text-white font-bold mb-3 text-lg">{item.nickname}</span>
                            <p className="text-white">{item.message}</p>
                        </div>
                    </div>
                ))}


            </div>

            <div className="flex flex-row  w-2/4 mobile:flex-row justify-between items-center bg-slate-900 rounded-t-md mobile:w-full tablet:w-[95%] self-center absolute bottom-0 p-10 mobile:gap-3 gap-3">
                <Input placeholder="mensagem" className="flex-1 mobile:mb-0"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <Button
                    className="bg-purple-700 hover:bg-purple-800"
                    size='lg'
                    onClick={handleMessage}
                >
                    <SendHorizontal color="white" />
                </Button>
            </div>
        </div>
    );
}
