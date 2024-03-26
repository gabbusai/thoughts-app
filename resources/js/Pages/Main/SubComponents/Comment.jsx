import { useState, react } from "react";
import { usePage, router, Head } from "@inertiajs/react";

function Comment({user, thought}){

    const [values, setValues] = useState({
        content:"",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/thoughts/${thought.id}/comment`, values)
    }

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }
    return(
        <>
        <div className="bg-slate-800 w-[500px] grid place-items-center rounded-lg py-4 my-4">
            <h2 className="text-white text-lg font-[132px]"> {user.name}: </h2>
        <form onSubmit={handleSubmit}
        className="grid place-items-center py-5 ">
        <textarea
            id="content"
            placeholder="Content"
            value={values.content}
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-400 rounded-md max-h-24 w-96"
        />
            <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            >
            COMMENT
            </button>
        </form>
        </div>
        </>
    )
}


export default Comment;