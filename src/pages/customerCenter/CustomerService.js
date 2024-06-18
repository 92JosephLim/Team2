import React from 'react';
import Question from '../../components/customercenter/Question';
import TopNav from "../../components/topnav/TopNav";
import Footer from "../../components/footer/Footer";
import MoveButton from '../../components/buttons/MoveButton';

function CustomerServiceBoard() {
  const questions1 = [
    {
      "number": 1,
      "question": "언어 교환 파트너와의 친밀도를 높이는 방법은 무엇인가요?",
      "date": "2024/06/05",
      "answer": "친밀도를 높이는 방법은 서로의 관심사와 취미를 공유하고, 정기적으로 만나는 것입니다. 또한, 친구의 생일이나 특별한 날에 축하 메시지를 보내거나 선물을 주는 것도 좋은 방법입니다. 상대방과의 신뢰 관계를 구축하기 위해 솔직하고 열린 의사소통을 유지하는 것도 중요합니다."
    },
    {
      "number": 2,
      "question": "언어 교환 파트너를 찾는 가장 효과적인 방법은 무엇인가요?",
      "date": "2024/06/05",
      "answer": "언어 교환 파트너를 찾는 가장 효과적인 방법은 언어 교환 앱이나 웹사이트를 활용하는 것입니다. 이러한 플랫폼에서는 자신의 언어와 배우고자 하는 언어를 설정하여 매칭되는 파트너를 찾을 수 있습니다. 또한, 온라인 언어 교환 커뮤니티나 소셜 미디어를 활용하여 파트너를 찾을 수도 있습니다. 자신의 관심사나 활동을 공유하는 그룹에 가입하여 파트너를 찾는 것도 좋은 방법입니다."
    },
    {
      "number": 3,
      "question": "화상통화 중 카메라끄고 음소거도 하고 싶습니다.",
      "date": "2024/06/05",
      "answer": "화상 채팅방에서 내 영상 화면 아래에 있는 카메라 모양의 아이콘을 클릭하면 카메라를 켜고 끌 수 있으며, 마이크 모양을 누르면 마이크를 음소거하거나 다시 활성화할 수 있습니다."
    },
    {
      "number": 4,
      "question": "언어 교환 파트너와의 대화 중에 발생할 수 있는 어려움을 어떻게 해결할 수 있을까요?",
      "date": "2024/06/05",
      "answer": "대화 중 발생하는 어려움을 해결하기 위해 먼저 서로의 언어 수준과 이해도를 고려해야 합니다. 이해되지 않는 부분이 있을 때는 존중하고 분명하게 요청하여 다시 설명해달라고 할 수 있습니다. 또한, 언어 교환 앱이나 웹사이트에서 제공하는 번역 도구를 활용하여 상호 이해를 도울 수도 있습니다. 마지막으로, 긍정적인 태도로 문제를 해결하고 서로를 격려해주는 것이 중요합니다."
    },
    {
      "number": 5,
      "question": "외국인 친구와 언어교환을 하면서 자주 사용되는 표현은 무엇인가요?",
      "date": "2024/06/05",
      "answer": "언어교환을 할 때 자주 사용되는 표현은 '어떤 언어를 배우고 있나요?'' '당신의 모국어는 무엇인가요?'' '언어를 얼마나 오랫동안 공부했나요?'' 등이 있습니다. 또한, '제가 말하는 것을 이해할 수 있나요?'와 같이 이해도를 확인하는 표현도 자주 사용됩니다."
    },
    {
      "number": 6,
      "question": "언어 교환 파트너와의 대화를 흥미롭고 유익하게 유지하는 방법에는 무엇이 있나요?",
      "date": "2024/06/05",
      "answer": "대화를 흥미롭고 유익하게 유지하는 방법은 다양한 주제에 대해 이야기하고 서로의 문화에 대해 배우는 것입니다. 또한, 영상이나 사진을 공유하여 시각적인 자료를 통해 이야기를 이끌어내고, 게임이나 퀴즈를 통해 상호작용하는 것도 좋은 방법입니다. 무엇보다도 호기심을 갖고 상대방의 이야기에 진심으로 관심을 가지는 것이 중요합니다."
    },
    {
      "number": 7,
      "question": "화상채팅하면서 친구추가하는 방법있나요?",
      "date": "2024/06/05",
      "answer": "화상 채팅방 내 친구의 영상 화면 아래에 있는 + 아이콘을 클릭하면 친구를 추가할 수 있습니다."
    },
    {
      "number": 8,
      "question": "동네 친구와 소통하고 싶어요~",
      "date": "2024/06/05",
      "answer": "현재 지역을 입력하여 주변 친구들과 소통할 수 있는 기능은 논의 중에 있습니다. 추가적인 업데이트가 있으면 알려드리겠습니다."
    }
  ]

  return (
    <>
      <div className="aboutContent w-5/6 h-4/6 m-auto pb-10">
        <div className="align-middle p-5">
          <div className="text-6xl font-bold p-5 my-10 font-bold">고객센터</div>
          <div className="grid grid-cols-8 p-5 mb-10 border bg-[#beccde] font-bold text-3xl">
            <div className="col-start-1 col-span-1">순번</div>
            <div className="col-start-2 col-span-6">질문</div>
            <div className="col-start-8 col-span-1">작성일</div>
          </div>
          {questions1.map((q, index) => (
            <Question
              key={index}
              number={q.number}
              question={q.question}
              date={q.date}
              answer={q.answer}
            />
          ))}
        </div>
        <MoveButton />
      </div>
    </>
  );
}

export default CustomerServiceBoard;
