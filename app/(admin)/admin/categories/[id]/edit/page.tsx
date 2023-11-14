import EditForm from '@/app/ui/admin/categories/EditCategory';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getCategoryById } from '@/lib/categories';
import { notFound } from 'next/navigation';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Edit Category | OFS Admin',
// };

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const category = await getCategoryById(id)
        if (!category) {
            notFound();
        }
        return (
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Categories', href: '/admin/categories' },
                        {
                            label: 'Edit Category',
                            href: `/admin/categories/${id}/edit`,
                            active: true,
                        },
                    ]}
                />
               <EditForm category={category}/>
            </main>
        );
    } catch (err) {
        notFound();
    }
}
