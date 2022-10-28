import React, {useState} from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {

  const [post, setPost] = useState({
    title: '',
    body: ''
  });

  const addNewPost = (e) => {
    e.preventDefault();

    const newPost = {...post, id: Date.now()};

    create(newPost)
    setPost({ title: '', body: '' });
  }

  return (
    <form>
      {/** managed component */}
      <MyInput 
        value={post.title}
        onInput={e => setPost({...post, title: e.target.value})}
        type="text" 
        placeholder="Post name" 
      />
      {/* Unmanaged/Uncontrolled component */}
      <MyInput
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
        type="text" 
        placeholder="Post description"
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
  )
}

export default PostForm;