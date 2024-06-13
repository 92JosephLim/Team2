import React from "react";
// 다국어 지원 모드 추가
import { useTranslation } from "react-i18next";

function AddFriendTitle() {

  const { t } = useTranslation();

  return (
    <>
      <div className="py-10 text-left">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">{t("addFriend")}</h1>
        </div>
      </div>
    </>
  )
}

export default AddFriendTitle;