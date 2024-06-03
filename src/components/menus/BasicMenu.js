import { Link } from "react-router-dom";
import logoImage from "../../images/logo.png"; // 이미지 경로
import sunImage from "../../images/sun-line.png"; // 이미지 경로

const BasicMenu = () => {
  return (  
  <nav id='navbar' className=" flex">

    <div className="w-4/5  " >
      <ul className="flex p-4 text-black font-bold">
        <li className="pr-10 text-2xl">
        

          <Link to={'/'}>
  <div style={{ width: '30%', height: '100%' }}>
    <img src={logoImage} alt="Select" style={{ width: '150%', height: '130%' }} /> {/* 이미지 추가 */}
  </div>

          </Link>
        </li>
        <li className="pr-6 text-2xl">
        </li>
        <li className="pr-6 text-2xl">
        </li>
      </ul>
    </div>

    <div className="w-1/5 flex justify-end p-4 font-medium">
        <div className="text-black text-sm m-1 rounded" >
        <img src={sunImage} alt="Select" style={{ width: '70%', height: '50%' }} /> {/* 이미지 추가 */}
        서울
        </div>
    </div>
  </nav>
  );
}
 
export default BasicMenu;
