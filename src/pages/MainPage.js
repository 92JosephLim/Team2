import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import mainImage from "../images/mainImage.jpg"; // 이미지 경로

const MainPage = () => {
  return (
    <BasicLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <Link to="/detail"> {/* 이미지를 클릭하면 "/about" 경로로 이동 */}
          <img src={mainImage} alt="Main Image" className="w-full h-auto" />
        </Link>
        <div className="text-3xl mt-8">Welcome to Main Page</div>
      </div>
    </BasicLayout>
  );
}

export default MainPage;