import { getloggedInUser } from "@/lib/action/users.action";
import { redirect } from "next/navigation";
export default async function Layout({
    children,
}:Readonly<{
    children:React.ReactNode;
}>){
    const loggedInUser = await getloggedInUser();
   if(!loggedInUser){
    redirect("/sign-in");
   }
    return (
     <main className="flex h-screen w-full font-inter">
        <div className="flex size-full flex-col items-center justify-center">
            {children}
        </div>
     </main>
    );
}