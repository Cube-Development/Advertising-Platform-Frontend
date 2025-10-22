import { X } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@shared/ui"
import { PostTemplates } from "@features/project"

export const TemplatePostsDialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="text-sm font-semibold cursor-pointer">
                    <p>Template Posts</p>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogDescription className="sr-only"></AlertDialogDescription>
                <AlertDialogTitle className="sr-only"></AlertDialogTitle>
                <div className="relative">
                    <AlertDialogAction className="!bg-transparent absolute -right-[60px] -top-8">
                        <X className="w-[30px] rounded-full p-2 bg-white cursor-pointer text-black" />
                    </AlertDialogAction>
                </div>
                <PostTemplates />
            </AlertDialogContent>
        </AlertDialog>
    )
}