import { InstagramIcon, Linkedin, TwitterIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";



interface Icon {
  icon: React.ReactNode;
  url: string;
}

const icons: Icon[] = [
  { icon: <InstagramIcon/>, url: "#" },
  { icon: <Linkedin />, url: "#" },
  { icon: <TwitterIcon />, url: "#" },
];

type Link = {
  text?: string;
  url?: string;
};

const links: Link[] = [
  { text: "About", url: "#" },
  { text: "Services", url: "#" },
  { text: "Contact", url: "#" },
  {text: "SignIn"  , url : "/signin"
  }
];

export function Footer() {
 
  const Navigate = useNavigate()


  return (
    <footer className="flex flex-col gap-y-5 rounded-lg px-7 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
            NITA Life
          </h2>
        </div>

        <div className="flex gap-x-2">
          {icons.map((icon, index) => (
            <a
              key={index}
              href={icon.url}
              className="flex h-5 w-5 items-center justify-center text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-500 hover:dark:text-neutral-100"
            >
              {icon.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
        <ul className="flex flex-col gap-x-5 gap-y-2 text-neutral-500 md:flex-row md:items-center ">
          {links.map((link, index) => (
            <li
              key={index}
              className="cursor-pointer text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:font-medium dark:text-neutral-400 hover:dark:text-neutral-100"
               
              onClick={()=> Navigate(link.url as string)}
            >
              {link.text}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
          <p>All right reserverd.</p>
        </div>
      </div>
    </footer>
  );
}
