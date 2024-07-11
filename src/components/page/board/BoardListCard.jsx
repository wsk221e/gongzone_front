import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GZAPI from "../../../utils/api";

export default function BoardListCard({
  children,
  img,
  title,
  id,
  cate,
  amount,
  memberNo,
  boardNo,
  partyNo,
  wish,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(wish);
  const navigate = useNavigate();

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = async () => {
    try{
      await GZAPI.post(`/api/boards/addView/${boardNo}`)

      navigate(`/party/detail/${memberNo}/${partyNo}`, {
        state: { memberNo, partyNo },
      });
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try{
      likeBtn();
      await GZAPI.post(`/api/boards/wish/${boardNo}/${memberNo}`)
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };
  
  return (
    <button
      type="button"
      className="w-full h-full text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          className="w-full p-2 rounded-2xl h-48 object-cover"
          src={img}
          alt=""
        />
        {like && (
          <div
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer"
            onClick={handleLikeClick}
          >
            <HeartIcon
              className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
            />
          </div>
        )}
      </div>
      <div className="px-6 py-3">
        <div className="font-bold text-ml mb-2">{title}</div>
        <div className="text-right text-gray-700 text-xs">{cate}</div>
        <div className="text-right font-bold text-gray-500 text-xl mt-2 mb-3">
          남은수량 : {amount}
        </div>
      </div>
    </button>
  );
}
