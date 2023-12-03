"use client"
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver} from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validation/issueSchemas";
import { z } from "zod"
import Spinner from "@/app/components/Spinner";
import Heading from "@/app/components/Heading";
import { Issue } from "@/app/types/issueType";
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

// type IssueInputs = z.infer<typeof createIssueSchema>

type IssueInputs = {
    title: string;
    description: string;
}

interface IssueFormProps {
    heading: string,
    btnName: string,
    issue?: Issue,
}

function IssueForm({ issue, heading, btnName }: IssueFormProps) {

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueInputs>();

    const router = useRouter();

    const handleSubmitNewIssue = handleSubmit(async (data: IssueInputs) => {
        try {
            setIsSubmit(true);
            if(issue)
            {
                fetch(`/api/issues/update/${issue.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                router.push("/issues");

            } else {
                await fetch("/api/issues", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                router.push("/issues");
            }
            
        } catch (error) {
            console.log(error);
            setIsSubmit(false);
        }
    })

  return (
    <form onSubmit={handleSubmitNewIssue} className="flex flex-col w-full">
        <Heading title={heading} />
        
        {errors.title && (
            <small className="text-red-500 my-3">{errors.title.message}</small>
        )}
        <input 
            {...register("title")}
            className="mb-4 px-4 py-2 border" 
            type="text" 
            placeholder="Issue Title"
            defaultValue={issue?.title} />
        

        {errors.description && (
            <small className="text-red-500 my-3">{errors.description.message}</small>
        )}
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <SimpleMDE {...field} />
            )}
            defaultValue={issue?.description} />

        <button 
            disabled={isSubmit}
            className="w-28 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded" 
            type="submit">
            <span>{btnName}</span> {isSubmit && <Spinner />}
        </button>
    </form>
  )
}

export default IssueForm