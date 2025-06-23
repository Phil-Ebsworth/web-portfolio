import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Structure({ path }: { path: string }) {
    const pathName = usePathname();
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {path.split('/').map((item, index) => (
                    item === "main" || item === "game" ? null :
                    (
                        <React.Fragment key={index}>
                            <BreadcrumbItem >
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={path.split('/').slice(0, index + 1).join('/') || '/'}
                                        className={`text-gray-400 ${pathName === (path.split('/').slice(0, index + 1).join('/') || '/') ? 'text-white' : 'hover:text-gray-200'}`}
                                    >
                                        {(item || 'Home').charAt(0).toUpperCase() + (item || 'Home').slice(1)}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    )
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
