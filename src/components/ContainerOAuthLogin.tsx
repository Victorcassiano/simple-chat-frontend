'use client'

import React from 'react';
import { Button } from '../components/ui/button';
import Image from "next/image";
import { signIn } from 'next-auth/react'


import IconGoogle from '../../public/assets/icon_google.png'
import IconGithub from '../../public/assets/icon_github.png'

const ContainerOAuthLogin: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full px-3 gap-4">
            <Button variant="outline" className="gap-3 w-full text-base"
                onClick={() => signIn('google', { redirect: true, callbackUrl: '/chat' })}
            >
                <Image src={IconGoogle} alt='google' className="w-8 h-8" />
                Continuar com o Google
            </Button>
            <Button variant="outline" className="gap-3 w-full text-base"
                onClick={() => signIn('github', { redirect: true, callbackUrl: '/chat' })}
            >
                <Image src={IconGithub} alt='Github' className="w-10 h-10" />
                Continuar com o Github
            </Button>
        </div>
    );
}

export default ContainerOAuthLogin;