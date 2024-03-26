    import React, { useState, useContext, useEffect } from 'react';
    import { usePage, Head, Link, router } from "@inertiajs/react"; // Import needed components
    import Category from './SubComponents/Category';
    import Sidebar from './Sidebar';
    import MainLayout from '@/Layouts/MainLayout';
    import InviteNotification from './SubComponents/InviteNotification';
    import { SelectedUserContext } from './Index';
    const CreateThought = () => {
    const { categories, currentUser }  = usePage().props;
    //const currentUser = data.currentUser;
    const [values, setValues] = useState({
        content: "",
        title: "",
        categories: []
    });


    useEffect(() => {
        
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
        ...values,
        [key]: value,
        }));
    }

    function handleSelect(category) {
        if (values.categories.includes(category.id)) {
        setValues(values => ({
            ...values,
            categories: values.categories.filter(c => c !== category.id)
        }));
        } else {
        setValues(values => ({
            ...values,
            categories: [...values.categories, category.id]
        }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post('/thoughts/store', values);
    }

    const DisplayCategories = () => {
        
        return (
        <div className="grid grid-cols-3 gap-y-2 gap-x-2">
        {categories.map(category => (
            <Category
            key={category.id}
            category={category}
            onSelect={handleSelect}
            categories={values.categories}
            />
        ))}
        </div>
        );
    }

    return (
        <>
        <MainLayout currentUser={currentUser}>
        <div className="grid place-items-center min-h-screen overflow-hidden">
        <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto grid items-center">
            <input
            type="text"
            id="title"
            placeholder="Title"
            value={values.title}
            onChange={handleChange}
            className="mb-4 border border-gray-400 rounded-md"
            />
            <textarea
            id="content"
            placeholder="Content"
            value={values.content}
            onChange={handleChange}
            className="mb-4 p-2 border min-w-lg border-gray-400 rounded-md max-h-sm"
            />
            <div className="mb-4">
            <p className="mb-2">Select categories:</p>
            <DisplayCategories />
            </div>
            <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            >
            Create Thought
            </button>
        </form>
        </div>
        </MainLayout>
        </>
    );
    };

    export default CreateThought;