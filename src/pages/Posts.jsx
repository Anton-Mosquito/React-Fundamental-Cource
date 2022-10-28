import React, { useEffect, useRef, useState } from 'react';
import PostList         from '../components/PostList';
import PostForm         from '../components/PostForm';
import PostFilter       from '../components/PostFilter';
import MyModal          from '../components/UI/MyModal/MyModal';
import MyButton         from '../components/UI/button/MyButton';
import { usePosts }     from '../hooks/usePosts';
import PostService      from '../API/PostService';
import Loader           from '../components/UI/loader/loader';
import { useFetching }  from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination       from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [visible, setVisible] = useState(false);
  const [totalPages , setTotalPages] = useState(0);
  const [limit , setLimit] = useState(10);
  const [page , setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);

    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setVisible(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setVisible(true)}>
        Create user
      </MyButton>
      <MyModal visible={visible} setVisible={setVisible}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError && 
        <h1>Error ${postError}</h1>
      }
      <MySelect
        value={limit}
        onChange={ value => setLimit(value)}
        defaultValue="Posts quantity"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'All posts'},
        ]}
      />
      <PostList remove={removePost} posts={sortedAndSearchPosts} title="javascript posts"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      {isPostLoading && 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      }
      <Pagination 
        totalPages={totalPages} 
        page={page} 
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
