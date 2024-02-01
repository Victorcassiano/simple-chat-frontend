import ContainerNickname from "../components/ContainerNickname";
import ContainerOAuthLogin from "../components/ContainerOAuthLogin";

export default async function App() {

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <p className="text-white text-8xl font-bold mb-10">
                Chat
                <span className="text-purple-700">Dev</span>
            </p>
            <div className="w-96 h-96 bg-slate-900 rounded-md mx-auto flex flex-col justify-center items-center">
                <h1 className="text-white text-center font-medium text-2xl">
                    Para continuar faça o login
                </h1>

                <ContainerNickname />

                <ContainerOAuthLogin />


            </div>
        </div>
    );
}
