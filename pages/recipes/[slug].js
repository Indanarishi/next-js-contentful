import { createClient } from "contentful"

const RecipeDetails = ({recipe}) => {
    console.log(recipe)
    return (
        <div>RecipeDetails</div>
    )
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
})

export const getStaticPaths = async () => {

    const res = await client.getEntries({ content_type: 'recipe' })

    const paths = res.items.map(item => {
        return {
            params: {
                slug: item.fields.slug
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {

    const res = await client.getEntries({
        content_type: 'recipe',
        'fields.slug': params.slug
    })

    return {
        props: {
            recipe: res.items[0]
        }
    }

}

export default RecipeDetails