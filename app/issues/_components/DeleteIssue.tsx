"use client"
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function DeleteIssue({ issueId }: { issueId: string }) {

    const router = useRouter();

    const [show, setShow] = useState(false);

    const handleDeleteIssue = ()=> {
        fetch(`/api/issues/delete/${issueId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        setShow(false);
        router.push("/issues");
    }
  return (

    <div>
        <button onClick={()=> setShow(true)} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">Delete</button>

       
        {
            show && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div className="max-w-2xl p-6 bg-white">
                        <div className="p-6 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this issue?</h3>
                            <button 
                                onClick={handleDeleteIssue}
                                type="button" 
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Delete
                            </button>
                            <button 
                                onClick={() => setShow(false)}
                                type="button" 
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default DeleteIssue