import BasicMenu from "../components/menus/BasicMenu";
import BottomMenu from "../components/menus/BottomMenu";

const BasicLayout = ({ children }) => {
  return (
    <>
      {/* 기존 헤더 대신 BasicMenu, 각 상단에 BasicMenu 컴포넌트를 추가해서 각 화면에 공통의 메뉴가 나오도록 */}
      <BasicMenu />

      <div className="my-1 w-full flex flex-col md:flex-row md:space-x-1 md:space-y-0">
        <main className=" md:w-4/5 lg:w-3/4 px-5 py-5" style={{ width: '100%', height: '100%' }}>
          {children}
        </main>
      </div>

      {/* 아래쪽 중앙으로 고정되도록 수정 */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%" }}>
        <BottomMenu />
      </div>
    </>
  );
}

export default BasicLayout;