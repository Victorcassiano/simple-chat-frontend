'use client'
import React, { useEffect, useState } from 'react';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useRouter } from 'next/navigation';
import JsonImage from '../../public/json/image_profiles.json'

const ContainerNickname: React.FC = () => {
    const route = useRouter()
    const [user,] = useState(
        typeof window !== "undefined" ? localStorage.getItem('@user') : ""
    );

    function generateRandomNumber() {
        const numberRandomDecimal = Math.random();

        const numberRandomInteger = Math.floor(numberRandomDecimal * 3);

        return numberRandomInteger;
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const nickname = formData.get("nickname");
        const genre = formData.get("genre");


        if (genre === 'Masculino') {
            localStorage.setItem('@user', JSON.stringify({ genre, nickname, image: JsonImage.male[generateRandomNumber()] }) || '')
        } else {
            localStorage.setItem('@user', JSON.stringify({ genre, nickname, image: JsonImage.feminine[generateRandomNumber()] }) || '')

        }


        route.replace('/chat')
    }



    useEffect(() => {
        if (!user) return

        route.replace('/chat')
    }, [route, user])


    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 px-10 mt-10">
            <form onSubmit={onSubmit} className='flex flex-col'>
                <div className='mb-5'>
                    <Label className='text-white'>Nickname</Label>
                    <Input name='nickname' type="text" placeholder="Nickname" className="outline-none" required />
                </div>
                <select
                    className='h-10 rounded-md'
                    name='genre'
                    defaultValue='Escolha seu gênero'
                    required
                >
                    <option>Masculino</option>
                    <option>Feminino</option>
                </select>
                <Button type='submit' className="bg-purple-700 mt-3 hover:bg-purple-900">
                    Entrar
                </Button>
            </form>
        </div>
    );
}

export default ContainerNickname;