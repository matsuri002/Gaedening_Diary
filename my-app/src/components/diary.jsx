// diary.jsx
import React , { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Diary = () => {
  const { id, date } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dates/find/${date}/${id}`);
        if (response.data && response.data.photo) {
          setPhoto(response.data.photo);
        } else {
          setPhoto(null); // データがない場合はnullに設定
        }
      } catch (error) {
        setPhoto(null); // エラーが発生した場合もnullに設定
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id, date]);

  const defaultPhoto = "https://lh3.googleusercontent.com/pw/AP1GczNHVQgH7DKQuwjhJ7ItfNAneL2Dq33Kelc8QwQNmFEM8xcPxB-7gcWBt0tBgKhybqv9qWoO_wdTtokxEgOyG4sNkG1H_-D5CwPzclsEOP3u1KafNSPbQ1dluBBNNMoA7xXoeIJEh9AErcYM3CaKHL2Waw=w965-h543-s-no";

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:8000/upload_url', {
        diary_date: date,
        vegetable_id: id,
        photo_url: imageUrl
      });
      setPhoto(response.data.photo);
    } catch (error) {
      console.error('Error uploading URL:', error);
    }
  };

  return(
    <div id="today">
      <div className='todays'>
      <h1>今日の記録</h1> </div>           
      <div id="result"></div>
      <Link to="/"><button className="before-botton">＜</button></Link>
      {loading ? (
          <p>読み込み中...</p>
        ) : (
          <img 
            src={photo || defaultPhoto}
            width="758" 
            height="340" 
            alt="写真" 
          />
        )}
      <Link to="/"><button className="after-botton">＞</button></Link>
      <div id="memo-set">
        <div className="dairy-container">
          <Link to="/"><button className="diary-back-botton">戻る</button></Link>
          <div><label htmlFor="memo">メモ</label><br /></div>
          <div><textarea id="memo" name="memo" rows="4" cols="50"></textarea><br /><br /></div>
          
          <div>
            <label htmlFor="photoUrl">写真URL</label><br />
            <input type="text" id="photoUrl" value={imageUrl} onChange={handleUrlChange} /><br /><br />
            <button onClick={handleUpload}>アップロード</button>
          </div>

          <Link to="/"><button className="diary-botton">完了</button></Link>
        </div>
       </div>
     </div>
  );
};

export default Diary;