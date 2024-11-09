import { Head, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface FormData {
    prefixname: string;
    firstname: string;
    middlename: string;
    lastname: string;
    suffixname: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    photo: File | null;
}

const CreateUser: React.FC = () => {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            prefixname: "",
            firstname: "",
            middlename: "",
            lastname: "",
            suffixname: "",
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            photo: null,
        });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData({
                ...data,
                photo: e.target.files[0],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("users.store"), {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create User
                </h2>
            }
        >
            <Head title="Create User" />

            <div className="pt-2 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mt-5 p-5">
                        <form onSubmit={handleSubmit}>
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
                                            value={data.firstname}
                                            onChange={(e) =>
                                                setData(
                                                    "firstname",
                                                    e.target.value
                                                )
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            required
                                        />
                                        {errors.firstname && (
                                            <div className="text-red-500">
                                                {errors.firstname}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/3 mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-1">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            name="middlename"
                                            value={data.middlename}
                                            onChange={(e) =>
                                                setData(
                                                    "middlename",
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
                                            value={data.lastname}
                                            onChange={(e) =>
                                                setData(
                                                    "lastname",
                                                    e.target.value
                                                )
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                        />
                                        {errors.lastname && (
                                            <div className="text-red-500">
                                                {errors.lastname}
                                            </div>
                                        )}
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
                                            value={data.prefixname}
                                            onChange={(e) =>
                                                setData(
                                                    "prefixname",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. Mr / Mrs / Ms"
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
                                            value={data.suffixname}
                                            onChange={(e) =>
                                                setData(
                                                    "suffixname",
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
                                            value={data.username}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            required
                                        />
                                        {errors.username && (
                                            <div className="text-red-500">
                                                {errors.username}
                                            </div>
                                        )}
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
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            required
                                        />
                                        {errors.email && (
                                            <div className="text-red-500">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="w-1/2 mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-1">
                                            Password{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            required
                                        />
                                        {errors.password && (
                                            <div className="text-red-500">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-1/2 mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-1">
                                            Confirm Password{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row items-center mt-4">
                                    <label
                                        htmlFor="photo"
                                        className="block mr-2"
                                    >
                                        File
                                    </label>
                                    <input
                                        type="file"
                                        name="photo"
                                        id="photo"
                                        onChange={handleFileChange}
                                        className="border p-2"
                                    />
                                    {errors.photo && (
                                        <div className="text-red-500">
                                            {errors.photo}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateUser;
