import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FaInstagram } from "react-icons/fa";

function Ismail() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="font-bold text-green-100 ">Ismail Achibat</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >   
        <DropdownMenuItem>
          <a href="https://www.linkedin.com/in/ismail-achibat-044813271/" target="_blank" className="m-auto">
            <CiLinkedin size={25} />
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="https://github.com/ismailAchibat" target="_blank" className="m-auto">
            <LuGithub  size={25}/>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="https://www.instagram.com/ismail.achibat/?hl=fr" target="_blank" className="m-auto">
            <FaInstagram size={25} />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Ismail;
