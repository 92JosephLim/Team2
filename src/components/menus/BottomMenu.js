import { Link } from "react-router-dom";
import selectImage from "../../images/search-line.png"; // 이미지 경로
import homeImage from "../../images/home-line.png"; // 이미지 경로
import mapImage from "../../images/road-map-line.png"; // 이미지 경로

const BottomMenu = () => {
  return (  
    <div className="text-center bg-white "> {/* 부모 요소에 text-center 클래스 추가 */}
      <ul className="flex justify-center p-4 text-white font-bold"> {/* 부모 요소에 justify-center 클래스 추가 */}
        <li className="pr-6 text-2xl" style={{ width: '33.33%', textAlign: 'center', listStyle: 'none' }}> {/* 가로 정렬 속성 추가 */}
          <Link to={'/'}>
            <img src={selectImage} alt="Select" className="h-8 w-auto mx-auto" /> {/* 이미지 추가 */}
          </Link>
        </li>
        <li className="pr-6 text-2xl" style={{ width: '33.33%', textAlign: 'center', listStyle: 'none' }}> {/* 가로 정렬 속성 추가 */}
          <Link to={'/about'}>
            <img src={homeImage} alt="Home" className="h-8 w-auto mx-auto" /> {/* 이미지 추가 */}
          </Link>
        </li>
        <li className="pr-6 text-2xl" style={{ width: '33.33%', textAlign: 'center', listStyle: 'none' }}> {/* 가로 정렬 속성 추가 */}
          <Link to={'/todo/'}>
            <img src={mapImage} alt="Map" className="h-8 w-auto mx-auto" /> {/* 이미지 추가 */}
          </Link>
        </li>
      </ul>
    </div>
  );
}
 
export default BottomMenu;