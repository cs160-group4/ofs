
import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { DiscordSignInButton } from '@/app/ui/auth/DiscordSignInButton';
import { GitHubSignInButton } from '@/app/ui/auth/GitHubSignInButton';
import { TwitchSignInButton } from '@/app/ui/auth/TwitchSignInButton';
import { SigninForm } from '@/app/ui/auth/SigninForm';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
    const session = await getAuthSession();
    if (session?.user) {
        redirect("/");
    }
    async function handleSignIn(formData: any) {
        console.log("Sign in");
        // const email = formData.get('email');
        // const password = formData.get('password');
        // console.log(email, password);
        // await signIn('credentials', { email, password, callbackUrl: '/' });
    }
    return (
        <section className="flex flex-wrap items-center justify-center font-poppins">
            <div className="max-w-6xl mx-auto ">
                <div className=" lg:py-7">
                    <div
                        className="max-w-xl lg:p-12 shadow-md rounded-md p-6 mx-auto text-center bg-[#dbeafe6e]  ">
                        <h2 className="mb-4 text-3xl font-bold lg:mb-7 lg:text-5xl ">
                            Sign In</h2>
                        <SigninForm />
                        <div className="my-3 lg:my-6"><span className="text-sm text-gray-700 dark:text-gray-300">
                            Or, login with</span></div>
                        <div className="flex flex-wrap ">
                            <GitHubSignInButton />
                            <DiscordSignInButton />
                            <TwitchSignInButton />
                        </div>
                        <p className="px-2 mt-6 text-sm text-left text-gray-700 dark:text-gray-400">
                            If you dont have an account?
                            <Link href="/auth/register" className="ml-2 text-base font-semibold text-cyan-400 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500">
                                Create new account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

