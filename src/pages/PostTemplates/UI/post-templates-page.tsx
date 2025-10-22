import { Suspense } from "react"
import { CreateTemplatePost } from "@widgets/createTemplatePost"
import { PostTemplates } from "@features/project"
import { SuspenseLoader } from "@shared/ui"

export const PostTemplatesPage = () => {
    return (
        <Suspense fallback={<SuspenseLoader />}>
            <div className="container md:!py-10 !py-6">
                <CreateTemplatePost />
                <PostTemplates />
            </div>
        </Suspense>
    )
}