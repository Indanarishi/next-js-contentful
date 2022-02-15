import { createClient } from "contentful"
import RecipeCard from "../components/RecipeCard"

export default function Home({recipes}) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({ content_type: 'recipe' })
  
  return {
    props: {
      recipes: res.items
    }
  }

}