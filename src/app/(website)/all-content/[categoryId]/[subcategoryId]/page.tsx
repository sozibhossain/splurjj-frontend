import { useParams } from 'next/navigation'
import React from 'react'

function page() {


    const params = useParams()
    const categoryId = params?.categoryId
    const subcategoryId = params?.subcategoryId


    console.log(categoryId, subcategoryId)
    return (
        <div>
            <h1>{categoryId}</h1>
            <h1>{subcategoryId}</h1>
            {/* Here you can render the content based on categoryId and subcategoryId */}
            {/* For example, you can fetch data from an API or display static content */}

            <section>
                banner
            </section>

            <section>
                Related Categories 1   2
            </section>
            
            </div>
    )
}

export default page