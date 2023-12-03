"use client"
import React from 'react';
import clsx from "clsx";
import { useRouter, useSearchParams } from 'next/navigation';


interface PaginationProps {
    itemsCount : number,
    itemsPerPage : number,
    currentPage : number
}
function Pagination({ itemsCount, itemsPerPage, currentPage } : PaginationProps ) {

    // Calculate number of pages
    const numberOfPages = Math.ceil(itemsCount / itemsPerPage);

    // Router
    const searchParams = useSearchParams();
    const router = useRouter();

    // Handle change page
    const handleChangePage = (page : number) => () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

  return (
    <div className="my-4 flex justify-end">
        <ul className="inline-flex -space-x-px text-sm">
            <li>
                {/* Previous button */}
                <button 
                    disabled={currentPage === 1}
                    className={clsx("flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0 border-gray-300 rounded-s-lg", {
                        "bg-white hover:bg-gray-100 hover:text-gray-700": currentPage !== 1,
                        "bg-gray-200" : currentPage === 1,
                    })}
                    onClick={handleChangePage(currentPage - 1)}
                    >
                    Previous
                </button>
            </li>
            {/* Pages */}
            {[...Array(numberOfPages)].map((_, index) => (
                <li key={index}>
                    <button 
                        className={clsx("flex items-center justify-center px-3 h-8 leading-tight border border-gray-300", {
                        "bg-blue-50 hover:bg-blue-100 hover:text-blue-700" : currentPage === index + 1,
                        "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100" : currentPage !== index + 1,
                        })}
                        onClick={handleChangePage(index + 1)}
                    >
                        {index + 1}
                    </button>
                </li>
            ))}
            {/* Next button */}
            <li>
                <button 
                    disabled={currentPage === numberOfPages}
                    className={clsx("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 rounded-e-lg", {
                        "bg-white hover:bg-gray-100 hover:text-gray-700": currentPage !== numberOfPages,
                        "bg-gray-200" : currentPage === numberOfPages,
                    })}
                    onClick={handleChangePage(currentPage + 1)}
                    >
                    Next
                </button>
            </li>
        </ul>
    </div>
  )
}

export default Pagination