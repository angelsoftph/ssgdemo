import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia, PageProps } from "@inertiajs/inertia";
import { useState } from "react";

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
    user: User;
    flash: {
        success?: string;
        error?: string;
    };
}

const UserDetails: React.FC<Props> = ({ user, flash }) => {
    const [prefixname, setPrefixname] = useState(user.prefixname || "");
    const [firstname, setFirstname] = useState(user.firstname || "");
    const [middlename, setMiddlename] = useState(user.middlename || "");
    const [lastname, setLastname] = useState(user.lastname || "");
    const [suffixname, setSuffixname] = useState(user.suffixname || "");
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleDestroy = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(`/users/destroy/${id}`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.put(route("users.update", user.id), {
            prefixname,
            firstname,
            middlename,
            lastname,
            suffixname,
            username,
            email,
            ...(password && {
                password,
                password_confirmation: passwordConfirmation,
            }),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit User
                </h2>
            }
        >
            <Head title="Users" />

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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-5 p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-12">
                                <div className="flex flex-row w-3/4 gap-4">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row gap-4">
                                            <div className="w-1/3 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    First Name{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={firstname}
                                                    onChange={(e) =>
                                                        setFirstname(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Middle Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="middlename"
                                                    value={middlename}
                                                    onChange={(e) =>
                                                        setMiddlename(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Last Name{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={lastname}
                                                    onChange={(e) =>
                                                        setLastname(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Prefix Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="prefixname"
                                                    value={prefixname}
                                                    onChange={(e) =>
                                                        setPrefixname(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. MR / MRS / MS"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>

                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Suffix Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="suffixname"
                                                    value={suffixname}
                                                    onChange={(e) =>
                                                        setSuffixname(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. SR / JR / III"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Username{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={username}
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Email Address{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                            <div className="w-1/2 mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-1">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    value={passwordConfirmation}
                                                    onChange={(e) =>
                                                        setPasswordConfirmation(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end mt-4">
                                            <button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold mr-4 py-2 px-4 rounded"
                                                onClick={() =>
                                                    handleDestroy(user.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-1/4 gap-4">
                                    <div className="flex flex-col">
                                        <label>Date Created</label>
                                        <p>
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label>Last Updated</label>
                                        <p>
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserDetails;
