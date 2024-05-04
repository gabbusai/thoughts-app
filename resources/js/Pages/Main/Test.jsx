import { usePage, router } from "@inertiajs/react";
import react, { useEffect } from "react";


export default function Test(){

    const {value} = usePage().props;
    const {currentUSer} = usePage().props;
    const {thoughts} = usePage().props
    useEffect(() => {
       // console.log(thoughts)
        //console.log(value)
    })
    return(
        <>
        <h1>BRUH</h1>
        </>
    )

}
