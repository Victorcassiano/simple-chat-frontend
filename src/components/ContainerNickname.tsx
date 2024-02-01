'use client'
import React from 'react';

import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';

const ContainerNickname: React.FC = () => {
    const route = useRouter()

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5 px-10 mt-10">
            <Label className='text-white'>Nickname</Label>
            <Input type="email" placeholder="Nickname" className="outline-none" />
            <Button className="bg-purple-700 mt-3 hover:bg-purple-900"
                onClick={() => route.replace('/chat')}
            >
                Entrar
            </Button>
        </div>
    );
}

export default ContainerNickname;