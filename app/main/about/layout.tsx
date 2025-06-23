import Navigation from "./ui/navigation";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
        <div className="p-4 w-full flex flex-col justify-center">
        <div className=" mx-auto mb-4 max-w-2xl">
            <Navigation />
        </div>
            {children}
          
        </div>
      );
}