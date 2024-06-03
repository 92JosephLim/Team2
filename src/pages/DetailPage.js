import BasicLayout from "../layouts/BasicLayout";
import mainImage from "../images/mainImage.jpg"; // 이미지 경로

const DetailPage = () => {
  return (
    <BasicLayout>
      <div className="border-b-2 border-gray-500 mt-2"></div> {/* 밑줄 */}
      
      <div className="container mx-auto px-10 lg:px-60 mt-5"> {/* mx-auto로 가운데 정렬, px-10은 기본 여백, lg:px-40은 더 큰 화면 크기에서 2배 더 많은 여백 */}
        <img src={mainImage} alt="Main Image" className="w-full h-auto" />
      </div>

      <div className="border-b-2 border-gray-500 mt-5"></div> {/* 밑줄 */}


      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">주요 시설</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">자동차야영장 사이트(30면)</h2>
          <p>개인 트레일러 입장 가능</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">기타 부대 시설</h2>
          <p>바다 사이트쪽은 카라반, 트레일러 입장 금지</p>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-4">기타 정보</h1>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">사이트 간격</h2>
          <p>3M</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">바닥 형태 (단위: 면)</h2>
          <p>파쇄석 (30)</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">사이트 크기</h2>
          <p>9 X 8 : 30개</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">캠핑장비 대여</h2>
          <p>텐트, 릴선, 화로, 대난방기, 식기, 침낭</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">반려동물 출입</h2>
          <p>불가능</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">화로 대</h2>
          <p>개별</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h2 className="text-lg font-semibold mb-2">안전 시설 현황</h2>
          <p>확인 필요</p>
        </div>
      </div>
    </div>


    </BasicLayout>
  );
}

export default DetailPage;