const App = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
  
    return (
      <>
        <div className={'btn-wrapper'}>
          <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
            모달 열기
          </button>
        </div>
        {
          modalOpen &&
          <div className={'modal-container'} ref={modalBackground} onClick={e => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}>
            <div className={'modal-content'}>
              {/* <p>수정이 완료되었습니다.</p> */}
              <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                 로그인 실패
              </button>
            </div>
          </div>
        }
      </>
    );
  };
  
  export default LoginCancel;