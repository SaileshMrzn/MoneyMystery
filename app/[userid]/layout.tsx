import Navbar from "@/src/components/Navbar";

export default function LoggedInLayout({
  children,
  params,
}:
Readonly<{
  children: React.ReactNode,
  params: any,
}>) {
  
  console.log(params.userid)
  return (
    <div>
      <Navbar userid ={params.userid}/>
      {children}
    </div>
  );
}
