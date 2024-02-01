'use client'

import React from 'react';
import { Button } from './ui/button';
import Image from "next/image";
import { signIn } from 'next-auth/react'


import IconGoogle from '../../public/assets/icon_google.png'
import IconGithub from '../../public/assets/icon_github.png'

const ContainerOAuthLogin: React.FC = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full px-3 gap-4 mt-10">
            <Button variant="outline" className="gap-3 w-1/2 text-base"
                onClick={() => signIn('google')}
            >
                <Image src={IconGoogle} alt='google' className="w-8 h-8" />
                Google
            </Button>
            <Button variant="outline" className="gap-3 w-1/2 text-base">
                <Image src={IconGithub} alt='Github' className="w-8 h-8" />
                Github
            </Button>
        </div>
    );
}

export default ContainerOAuthLogin;