import { redirect } from "next/navigation";
import ContainerOAuthLogin from "../components/ContainerOAuthLogin";
import { auth } from "../services/auth";

export default async function App() {
    const session = await auth()

    if (session) {
        redirect('/chat')
    }

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <p className="text-white text-8xl tablet:text-5xl mobile:text-5xl font-bold mb-10">
                Chat
                <span className="text-purple-700">Dev</span>
            </p>
            <div className="w-96 mobile:w-[90%] bg-slate-900 rounded-md mx-auto flex flex-col justify-center items-center py-5">
                <p className="text-lg text-white mb-10">Escolha uma conta para logar</p>
                <ContainerOAuthLogin />
            </div>
        </div>
    );
}
