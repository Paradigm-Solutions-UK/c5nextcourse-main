import {useEffect, useState} from 'react'
import useDebounce from './hooks/use-debounce'
// destructure syntax
function PostCard({post}){
    return(
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}


export default function Post() {
  const [postData, setPostData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const [originalCopy, setOriginalCopy] = useState([])

  const debouncedValue = useDebounce(searchTerm)


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
            setPostData(json)
            setOriginalCopy(json)
        });
    },[])

    useEffect(()=> {
        if(debouncedValue == ""){
            setPostData(originalCopy)
            return
        }
        const filteredPosts = postData.filter(post => post.title.includes(debouncedValue.toLowerCase()))
        setPostData(filteredPosts)
        
    }, [debouncedValue])

  return (
    <div className='flex flex-col space-y-2'>
        <input onInput={(e) => setSearchTerm(e.target.value)} 
        value={searchTerm}
        type="search" className="border p-2 rounded" />
      
        {postData.map(singlePost => <PostCard key={singlePost.id} post={singlePost} />)}
    </div>
  )
}
