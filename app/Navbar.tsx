"use client"

import Image from "next/image"
import Link from "next/link"
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Navbar() {

    // Session
    const { status, data: session } = useSession();

    // Links Items
    const links = [
        {
            name: "Dashboard",
            href: "/"
        },
        {
            name: "Issues",
            href: "/issues"
        },
    ];

    // Current Pathname
    const pathName = usePathname();

  return (
    <div className="flex flex-row justify-between items-center h-24 w-full p-3 md:max-w-3xl md:mx-auto mb-5 border-b">
        <Link href={"/"}>
            <Image src="/images/logo.png" alt="issue tracker logo" width={50} height={50} />
        </Link>

        <ul className="flex flex-row gap-5">
            {links.map((link, index) => (
                <li key={index}>
                    <Link 
                        className={clsx("hover:text-cyan-500 transition-colors", {
                            "text-cyan-600": pathName === link.href,
                            "text-slate-700" : pathName !== link.href
                        })}
                        href={link.href} >
                        {link.name}
                    </Link>
                </li>
            ))}
            <li>
            {status === "authenticated" && (
                <Link href="/api/auth/signout">Log out</Link>
            )}
            {status === "unauthenticated" && (
                <Link href="/api/auth/signin">Login</Link>
            )}
            </li>
        </ul>
    </div>
  )
}

export default Navbar