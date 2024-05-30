// diary.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Diary = () => {
  const { id, date } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [memo, setMemo] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [vegetableId, setVegetableId] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dates/find/${date}/${id}`);
        if (response.data && response.data.photo) {
          setPhoto(response.data.photo);
        } else {
          setPhoto(null);
        }
      } catch (error) {
        setPhoto(null);
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

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleDiaryDateChange = (event) => {
    setDiaryDate(event.target.value);
  };

  const handleVegetableIdChange = (event) => {
    setVegetableId(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleCreateDate = async () => {
    try {
      const newDateResponse = await axios.post('http://localhost:8000/dates', {
        diary_date: diaryDate,
        vegetable_id: vegetableId,
        time: time,
        photo_url: imageUrl || defaultPhoto,
        weather: '',
        memo: memo
      });
      setMessage('日付が正常に作成されました！');
      setDiaryDate('');
      setVegetableId('');
      setTime('');
      setPhoto(defaultPhoto);
      setMemo('');
      setImageUrl('');
      setShowForm(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('エラー: この日付と野菜IDの組み合わせはすでに存在します。');
      } else {
        setMessage('エラー: 日付の作成中にエラーが発生しました。');
      }
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  // 現在の日付の前日を計算し、そのルートに移動
  const handlePrevDate = () => {
    const prevDate = dayjs(date).subtract(1, 'day').format('YYYY-MM-DD');
    navigate(`/Diary/${id}/${prevDate}`);
  };

  // 現在の日付の翌日を計算し、そのルートに移動
  const handleNextDate = () => {
    const nextDate = dayjs(date).add(1, 'day').format('YYYY-MM-DD');
    navigate(`/Diary/${id}/${nextDate}`);
  };

  return (
    <div id="today">
      <div className='todays'>
        <h1>{dayjs(date).format('YYYY-MM-DD')}の記録</h1> 
      </div>           
      <div id="result"></div>
      <button className="before-botton" onClick={handlePrevDate}>＜</button>
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
      <button className="after-botton" onClick={handleNextDate}>＞</button>
      <div id="memo-set">
        <div className="dairy-container">
          <Link to="/"><button className="diary-back-botton">戻る</button></Link>
          <div><label htmlFor="memo">メモ</label><br /></div>
          <div><textarea id="memo" name="memo" rows="4" cols="50" value={memo} onChange={handleMemoChange}></textarea><br /><br />
          <Link to="/"><button className="diary-botton">完了</button></Link></div>

          <button onClick={handleShowForm}>登録</button>

          {showForm && (
            <div className="dairy-container-wrapper">
              <div className="dairy-container">
                <label htmlFor="photoUrl">写真URL</label><br />
                <input type="text" id="photoUrl" value={imageUrl} onChange={handleUrlChange} /><br /><br />
              </div>

              <div>
                <label htmlFor="diaryDate">日付</label><br />
                <input type="date" id="diaryDate" value={diaryDate} onChange={handleDiaryDateChange} /><br /><br />
              </div>

              <div>
                <label htmlFor="vegetableId">野菜ID</label><br />
                <input type="number" id="vegetableId" value={vegetableId} onChange={handleVegetableIdChange} /><br /><br />
              </div>

              <div>
                <label htmlFor="time">時間</label><br />
                <input type="time" id="time" value={time} onChange={handleTimeChange} /><br /><br />
              </div>

              <button onClick={handleCreateDate}>日付を作成</button>

              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diary;
