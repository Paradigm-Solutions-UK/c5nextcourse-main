import React from 'react'
import Head from 'next/head'
import {useState, useEffect} from 'react'
import _ from 'lodash';
import Counter from '@/components/Counter'
import ChangePage from '@/components/ChangePage'
import NavBar from '@/components/NavBar';
import PopOutMenu from '@/components/PopOutMenu';
import { auth } from '@/components/auth/firebase';
import AuthDetails from '@/components/auth/AuthDetails';
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider, useAuth, getAuthUser } from '@/components/auth/AuthContext';
import { parse } from 'cookie';
import { useRouter } from 'next/router';


import firebase from 'firebase/app';
import { PrevButton } from '@/components/PrevButton';
import { NextButton } from '@/components/NextButton';
import { PageDisplay } from '@/components/PageDisplay';


let page = 1;
let pageSize = 30;
let changeUser = 0;
// import { useNavigate } from "react-router-dom";

// import cardColors from '@/data/card_colors';



export default function Variants({ collectionData}) {
   
    return (
        <>
            <AuthProvider>
                <Head>
                    <title>Card Library</title>
                </Head>
                <NavBar/>
                <Content className="p-4" collectionData={collectionData}/>
                {/* <div className='static p-1'><ChangePage page={page}/></div> */}
            </AuthProvider>
        </>
    );
}

const Content = ({ collectionData}) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isPopOutOpen, setIsPopOutOpen] = useState(false);
    const router = useRouter(); // Initialize the router
    
    
    //     // Navigate to the same page with new query parameters
    //     router.push({
    //         pathname: router.pathname,
    //         query: queryParams.toString(),
    //     });
    // // };
    

    const navigateToCollection = (collection) => {
        console.log(collection.name);
        router.push(`/filteredResults?collectionName=${collection.name}`);
    };
    

    
    const {authUser} = useAuth();

    return (
        <>
            <div className="py-11 p-11">
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-11">
                    {collectionData.map((collection) => (
                    <div key={collection.id} className="bg-white rounded-lg shadow-md p-4">
                        {/* Add an onClick handler to the collection item */}
                        <div className="cursor-pointer" onClick={() => navigateToCollection(collection)}>
                            {/* Render collection information here */}
                            <h3 className="text-lg font-semibold">{collection.name}</h3>
                            {/* Add any other collection details you want to display */}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

const replaceEmptyStr = (str, defaultVal) => {
    console.log(str, 'str')
    console.log(defaultVal, 'defaultVal')
    console.log(typeof str === 'string' && str.trim() === '' ? defaultVal : str, 'res')
    return typeof str === 'string' && str.trim() === '' ? defaultVal : str
}

export async function getServerSideProps() {
    // Extract page and filter parameters from the query
   
    
    const collectionResponse = await fetch(`${process.env.NEXT_API_URL}/collections`)
    const collectionData = await collectionResponse.json()
    // console.log("data",data)
    return {
        props: {
            collectionData            
        }
    }
}

