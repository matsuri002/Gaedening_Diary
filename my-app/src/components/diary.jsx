// // // // diary.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import axios from 'axios';

// // const Diary = () => {
// //   const { id, date } = useParams();
// //   const [photo, setPhoto] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPhoto = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8000/dates/find/${date}/${id}`);
// //         if (response.data && response.data.photo) {
// //           setPhoto(response.data.photo);
// //         } else {
// //           setPhoto(null); // データがない場合はnullに設定
// //         }
// //       } catch (error) {
// //         setPhoto(null); // エラーが発生した場合もnullに設定
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPhoto();
// //   }, [id, date]);

// //   const defaultPhoto = "https://lh3.googleusercontent.com/pw/AP1GczNHVQgH7DKQuwjhJ7ItfNAneL2Dq33Kelc8QwQNmFEM8xcPxB-7gcWBt0tBgKhybqv9qWoO_wdTtokxEgOyG4sNkG1H_-D5CwPzclsEOP3u1KafNSPbQ1dluBBNNMoA7xXoeIJEh9AErcYM3CaKHL2Waw=w965-h543-s-no";

// //   return (
// //     <div>
// //       <div id="today">
// //         <div className='todays'>
// //           <h1>今日の記録</h1> 
// //         </div>           
// //         <div id="result"></div>
// //         <Link to="/"><button className="before-botton">＜</button></Link>
// //         {loading ? (
// //           <p>読み込み中...</p>
// //         ) : (
// //           <img 
// //             src={photo || defaultPhoto}
// //             width="758" 
// //             height="340" 
// //             alt="写真" 
// //           />
// //         )}
// //       {/* <img src="https://lh3.googleusercontent.com/pw/AP1GczNEmhAg8HfnF7NAFUZ86xSiO7aWLpN88Fa6SnRdSTlxPTxSPqUQ-4F31PRsRYUt3QYVBNJJQthf14mlsPHWyUJ02uGvfvFaSxrHLDwtJ4_7T1wHXMUJCLQJBZFbiSb9VXTW9AgAzEofrOQhIuESdh7y=w835-h627-s-no" className="ms-1 list-group-horizontal" width="758" height="340" alt="" /> */}     
// //         <div id="memo-set">
// //           <div className="dairy-container">
// //             <Link to="/"><button className="diary-back-botton">戻る</button></Link>
// //             <div><label htmlFor="memo">メモ</label><br /></div>
// //             <div><textarea id="memo" name="memo" rows="4" cols="50"></textarea><br /><br /></div>
// //             <Link to="/"><button className="diary-botton">完了</button></Link>
// //            </div>
// //          </div>
// //        </div>
// //      </div>  
// //   );
// // };

// // export default Diary;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Diary = () => {
  const { id, date } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
  // <img src="https://photos.app.goo.gl/rXRkorv7FgGWEpHS8" alt="drive image" />

  // const defaultPhoto = "https://photos.google.com/share/AF1QipMAG9O-fm4iLmLenHhHpaseRZCpCfU7SrxpTSY1z6taVfV9zeRRZkJh1AxZf_Apkg/photo/AF1QipMy5Au4YQcGHJF5xg8LOs7nRSIsiCL67TVmBUlh?key=bjRYc0xHQXMtcjNtSUhUeUM3WXViX0ZuRnIzWUV3";
  const defaultPhoto = "https://lh3.googleusercontent.com/pw/AP1GczNHVQgH7DKQuwjhJ7ItfNAneL2Dq33Kelc8QwQNmFEM8xcPxB-7gcWBt0tBgKhybqv9qWoO_wdTtokxEgOyG4sNkG1H_-D5CwPzclsEOP3u1KafNSPbQ1dluBBNNMoA7xXoeIJEh9AErcYM3CaKHL2Waw=w965-h543-s-no";

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);
    formData.append('id', id);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.photo) {
        setPhoto(response.data.photo);
      }
    } catch (error) {
      console.error('ファイルアップロード中にエラーが発生しました', error);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div>
      <div id="today">
        <div className='todays'>
          <h1>今日の記録</h1> 
        </div>           
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
        <div>
          <input type="file" onChange={handleFileChange} disabled={uploading} />
          {uploading && <p>アップロード中...</p>}
        </div>
        <div id="memo-set">
          <div className="dairy-container">
            <Link to="/"><button className="diary-back-botton">戻る</button></Link>
            <div><label htmlFor="memo">メモ</label><br /></div>
            <div><textarea id="memo" name="memo" rows="4" cols="50"></textarea><br /><br /></div>
            <Link to="/"><button className="diary-botton">完了</button></Link>
          </div>
        </div>
      </div>
    </div>  
  );
};


export default Diary;