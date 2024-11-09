import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia, PageProps } from "@inertiajs/inertia";
import { Button } from "@headlessui/react";

interface User {
    id: number;
    prefixname: string;
    firstname: string;
    middlename: string;
    lastname: string;
    suffixname: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    users: User[];
    flash: {
        success?: string;
        error?: string;
    };
}

const TrashedUsers: React.FC<Props> = ({ users, flash }) => {
    const handleRestore = (id: number) => {
        if (confirm("Are you sure you want to restore this user?")) {
            Inertia.put(`/users/restore/${id}`);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to permanently delete this user?")) {
            Inertia.delete(`/users/delete/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Users
                        </h2>
                    </div>
                    <div>
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <Link href="/users">View Active Users</Link>
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title="Trash" />

            <div className="pt-2 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mt-4 p-2 bg-red-200 text-red-800 rounded">
                            {flash.error}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-5">
                        <table className="table-auto w-full border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border text-left">
                                        ID
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        First Name
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Last Name
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Username
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Email
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Created At
                                    </th>
                                    <th className="px-4 py-2 border text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-2 border">
                                            {user.id}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {user.firstname}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {user.lastname}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {user.username}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 border flex flex-row">
                                            <span
                                                className="action-link action-delete"
                                                onClick={() =>
                                                    handleRestore(user.id)
                                                }
                                            >
                                                Restore
                                            </span>
                                            <span className="pipe">|</span>
                                            <span
                                                className="action-link action-delete"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default TrashedUsers;
