import Categories from '../../components/ProductCategoryComponent'

export default function CategoryPage({ params }: { params: { slug: string } }) {
    return (
        <>
            <Categories />
            <div className="flex flex-col items-center justify-center py-2">
                <p className="mt-3 text-2xl">Category: {params.slug}</p>
            </div>
        </>
    )

}