import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import { get } from 'http';
import { getOrders } from '@/lib/orders';
import OrdersStatusComponent from '@/components/OrdersStatusComponent';
import { getUsers } from '@/lib/users';
import CommentsComponent from '@/components/products/CommentsComponent';
import { getComments } from '@/lib/comments';
import { TotalCustomersComponent } from '@/components/admin/TotalCustomersComponent';
import { TotalOrdersComponent } from '@/components/admin/TotalOrdersComponent';
import { TotalRevenueComponent } from '@/components/admin/TotalRevenueComponent';
import { TotalProductsComponent } from '@/components/admin/TotalProductsComponent';
import { getProducts } from '@/lib/products';
export default async function AdminPage() {
    const session = await getAuthSession();
    if (!session || !session.user || session.user.role !== "admin") {
        return <>
            <div className="flex flex-col justify-center items-center h-96">
                <h1 className='text-3xl font-bold m-12'>You are not authorized to view this page</h1>

                <div>
                    <Link href="/" className='btn btn-primary text-white'>Go back to home page</Link>
                </div>
            </div>
        </>
    }
    let customerCount = (await getUsers()).length;
    let orders = await getOrders();
    let totalRevenue = 0;
    let totalCustomers = 0;
    orders.forEach(order => {
        totalRevenue += Number(order.grandTotal);
        totalCustomers += 1;
    });
    let products = await getProducts();
    let comments = await getComments();
    return (
        <>
            <div className="mx-auto transition-all content-wrapper" id="dash">
                <section
                    className="sticky top-0 z-0 px-3 py-3 bg-white shadow dark:text-gray-100 dark:bg-gray-900 lg:px-5">
                    <nav className="relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <button
                                    // x-on:click="open = ! open"
                                    className="open px-2 py-3 text-blue-500 bg-blue-100 rounded dark:text-gray-400 dark:bg-gray-800">
                                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.50002 1.66667H16.5C16.721 1.66667 16.933 1.57887 17.0893 1.42259C17.2456 1.26631 17.3334 1.05435 17.3334 0.833333C17.3334 0.61232 17.2456 0.400358 17.0893 0.244078C16.933 0.0877975 16.721 0 16.5 0H1.50002C1.27901 0 1.06704 0.0877975 0.910765 0.244078C0.754484 0.400358 0.666687 0.61232 0.666687 0.833333C0.666687 1.05435 0.754484 1.26631 0.910765 1.42259C1.06704 1.57887 1.27901 1.66667 1.50002 1.66667V1.66667ZM16.5 8.33333H1.50002C1.27901 8.33333 1.06704 8.42113 0.910765 8.57741C0.754484 8.73369 0.666687 8.94565 0.666687 9.16667C0.666687 9.38768 0.754484 9.59964 0.910765 9.75592C1.06704 9.9122 1.27901 10 1.50002 10H16.5C16.721 10 16.933 9.9122 17.0893 9.75592C17.2456 9.59964 17.3334 9.38768 17.3334 9.16667C17.3334 8.94565 17.2456 8.73369 17.0893 8.57741C16.933 8.42113 16.721 8.33333 16.5 8.33333ZM16.5 4.16667H1.50002C1.27901 4.16667 1.06704 4.25446 0.910765 4.41074C0.754484 4.56702 0.666687 4.77899 0.666687 5C0.666687 5.22101 0.754484 5.43298 0.910765 5.58926C1.06704 5.74554 1.27901 5.83333 1.50002 5.83333H16.5C16.721 5.83333 16.933 5.74554 17.0893 5.58926C17.2456 5.43298 17.3334 5.22101 17.3334 5C17.3334 4.77899 17.2456 4.56702 17.0893 4.41074C16.933 4.25446 16.721 4.16667 16.5 4.16667Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </button>
                                <span className="text-sm font-bold"> <Link href="/admin/products">Products</Link></span>
                            </div>

                            <div className="flex items-center">
                                <div className="justify-center hidden mr-4 md:flex">
                                    <div className=" xl:w-96">
                                        <div className="relative flex flex-wrap items-center w-full ">
                                            <input type="search"
                                                className="form-control relative flex-auto min-w-0 block w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white  dark:text-gray-100  border border-solid border-gray-300 dark:border-gray-800 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white dark:bg-gray-800  focus:border-b dark:border-gray-700lue-600 focus:outline-none"
                                                placeholder="Search"></input>
                                            <button
                                                className="btn i px-6 py-2.5 bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-400  dark:text-gray-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                                                type="button" id="button-addon2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="relative mr-4 ">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                                            <path
                                                d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path
                                                d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </nav>
                </section>
                <section className="px-4 pt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <TotalCustomersComponent total={customerCount} />
                        <TotalOrdersComponent total={orders.length} />
                        <TotalRevenueComponent total={totalRevenue} />
                        <TotalProductsComponent total={products.length} />
                    </div>
                </section>
                <section className="px-4 py-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
                        <div className="p-4 bg-white rounded-md shadow md:p-6 ">
                            <h2 className="pb-4 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">Orders Status</h2>
                            <div className="px-4 py-3 text-xs font-medium">
                                <div className="flex px-4 mb-3 text-gray-500 dark:text-gray-400">
                                    <h2 className="mr-auto">Orders</h2>
                                    <h2>Action</h2>
                                </div>
                                {orders.map((order) => (
                                    <OrdersStatusComponent key={order.id} order={order} />
                                ))}

                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-md shadow md:p-6 dark:bg-gray-900">
                            <h2 className="pb-2 mb-2 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">
                                Comments</h2>
                            {comments.map((comment) => (
                                <CommentsComponent key={comment.id} comment={comment} />
                            ))}
                        </div>
                        <div className="p-4 bg-white rounded-md shadow md:p-6 dark:bg-gray-900">
                            <h2 className="pb-2 mb-2 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">
                                Notice</h2>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        John Lennon just ordered 2 items
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 7:50pm </p>
                                </div>
                                <p className="text-sm text-gray-400">10m ago</p>
                            </div>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        Anna Smith just ordered 5 items
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 7:30pm </p>
                                </div>
                                <p className="text-sm text-gray-400">30m ago</p>
                            </div>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        Larry Page just ordered 1 item
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 6:00pm </p>
                                </div>
                                <p className="text-sm text-gray-400">1h ago</p>
                            </div>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        Steve Jobs just ordered 2 items
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 5:00pm </p>
                                </div>
                                <p className="text-sm text-gray-400">2h ago</p>
                            </div>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        Kevin Mitnick just ordered 1 item
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 4:00pm </p>
                                </div>
                                <p className="text-sm text-gray-400">5h ago</p>
                            </div>
                            <div className="flex flex-wrap justify-between mb-4">
                                <div>
                                    <p className="font-bold dark:text-gray-400">
                                        Paul McCartney just ordered 1 item
                                    </p>
                                    <p className="text-sm text-gray-400"> Today 3:00pm </p>
                                </div>
                                <p className="text-sm text-gray-400">4h ago</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )

}
