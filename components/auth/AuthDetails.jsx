import React, {useEffect, useState} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase';
import { useTool } from '../ToolContext';


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    // const signInElement = document.getElementById('SignInButtonDiv');
    // const signUpElement = document.getElementById('SignUpButtonDiv');
    
    
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                // signInElement.style.display = 'none';
                // signUpElement.style.display = 'none';
            } else {
                setAuthUser(null);
                // signInElement.style.display = 'block';
                // signUpElement.style.display = 'block';
            }   
        });

        return () => {
            listen();
            
        };

    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Successfully Signed Out');
        })
            .catch(error => console.log(error));
            // signInElement.style.display = 'block';
            // signUpElement.style.display = 'block';
    }

    const [userTabFilter, setUserTabFilter] = useState(0);
    

    function adjustUserTabArea() {
        const userTabElement = document.getElementById('UserTab');
        const isUserTabVisible = userTabFilter === 1;
    
        if (isUserTabVisible) {
            userTabElement.style.display = 'none';
            
          
          setUserTabFilter(0);
        } else {
            userTabElement.style.display = 'block';
          setUserTabFilter(1);
        }
      }

  return (
    <div>
        {authUser ? <>
            <div>
                <a onClick={adjustUserTabArea}>
                    <img className='flex rounded-full h-10' src={authUser.photoURL} alt={authUser.email}/>
                </a>
            </div>
            <div id='UserTab' style={{display:'none'}}>
                <p>{authUser.email}</p>
                <button onClick={userSignOut}>Sign Out</button>
            
            </div>
        </> 
        : 
        <p>Signed Out</p>}
    </div>
    
  );
};

export default AuthDetails;