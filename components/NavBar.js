import React, { useEffect, useState, Component } from 'react';
import FilterMyStuff from './FilterMyStuff';
import AuthForm from '@/components/AuthForm';
import firebase from './auth/firebase'; // Adjust the import path according to your file structure
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import AuthDetails from '@/components/auth/AuthDetails';
import { auth } from '@/components/auth/firebase';
// import SignUp from '@/pages/signup';
import { onAuthStateChanged } from 'firebase/auth'



export default class NavBar extends Component {

  


  state = {
        isSignInOpen: false,
        isSignUpOpen: false,
        authUser: null,
      };

    
    
      toggleSignIn = () => {
        this.setState((prevState) => ({
          isSignInOpen: !prevState.isSignInOpen,
        }));
      };

      toggleSignUp = () => {
        this.setState((prevState) => ({
          isSignUpOpen: !prevState.isSignUpOpen,
        }));
      };

      
      
  
    render() {
        const { isSignInOpen, isSignUpOpen, authUser } = this.state;

    

    return (
        <div>
          
          
          <nav class="bg-white dark:bg-gray-900 fixed w-full z-40 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
              {/* <div id='AdvertArea' class='p-2 relative z-4 overflow-y-auto w-auto h-12' style={{textAlign:'center'}}>
                
                  <a>ADVERT GOES HERE</a>
              </div> */}
              
              <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
              <FilterMyStuff/>
              <a href="http://localhost:3000/variants" class="flex items-center">
                  <span className="self-center sm:text-Base md:text-2xl lg:text-3xl font-semibold whitespace-nowrap dark:text-white">One Piece TCG Collector Tool</span>
              </a>
                  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                      <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          <li>
                              <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                          </li>
                          <li>
                              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                          </li>
                          <li>
                              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Card Library</a>
                          </li>
                          <li>
                              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Deck Builder</a>
                          </li>
                          <li>
                              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">News</a>
                          </li>
                          <li>
                            <div id='SignInButtonDiv' className="flex md:order-1" >
                                <button
                                id="SignInButton"
                                onClick={this.toggleSignIn}
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Sign-In
                                </button>
                                
                            </div>
                          </li>
                          <li>
                            <div id='SignUpButtonDiv' className="flex md:order-1">
                                <button
                                id="SignUpButton"
                                onClick={this.toggleSignUp}
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Sign-Up
                                </button>
                            </div>
                            <div className="flex md:order-1">

                            </div>
                          </li>
                          <li>
                            <AuthDetails authUser={authUser}/>
                          </li>
                          
                      </ul>
                      
                  </div>
                  
                  <div className="flex md:order-1">
                  {/* <button
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:text-xs md:text-sm px-4 py-2 sm:px-2 sm:py-1 md:px-4 md:py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                      Login
                  </button> */}

                  

                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:w-8 sm:h-8"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                        </svg>
                    </button>
                  </div>
                  
              </div>
              
          </nav>

          {isSignInOpen && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
                {/* <SignIn /> */}
                {/* <AuthForm isSignIn={true} /> */}
                <SignIn/>
                <button
                  onClick={this.toggleSignIn}
                  className="block py-2 px-4 w-full mt-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {isSignUpOpen && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg">
              <SignUp/>
                
                <button
                  onClick={this.toggleSignUp}
                  className="block py-2 px-4 w-full mt-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
                
              </div>
              
            </div>
          )}

          


        </div>
    )
  }
}
