//번역할 구글 스프레드 시트 json 형식으로 다운로드
import { GoogleSpreadsheet } from "google-spreadsheet";

//구글 API 키 설정
const Google_API_KEY = "AIzaSyCroD-weHzB3eZA4MrFHgbMZxfJSqkQ2vs";

//구글 스프레드 시트 ID 설정
const Google_SHEET_ID = "1vesuL7tNt8SfPnePYDp2ah42riIigtuXLHYAFK6WSDw";

export async function fetchSpreadSheetData() {
  //구글 스프레드 시트 객체 생성
  const doc = new GoogleSpreadsheet(Google_SHEET_ID);

  //API 키를 사용해서 인증하기
  await doc.useApiKey(Google_API_KEY);

  //스프레드시트 로드하기
  await doc.loadInfo();

  //빈 객체 생성하기 - 이 data에 구글 스프레드 시트 변수들 저장하기
  const data = {};

  //모든 시트 돌면서 데이터를 가져오기 : TopNav, SideNav, ...
  for (let i = 0; i < doc.sheetCount; i++) {

    //현재 시트 가져오기
    const sheet = doc.sheetsByIndex[i];

    //모든 셀 로드하기
    await sheet.loadCells();

    // 시트의 헤더인 첫번째 행을 가져오기 : ko, en, ja, zh
    const rows = await sheet.getRows();

    //구글 스프레드시트에서 설정한 번역 도착어 [ko, en, ja, zh]
    const langs = sheet._headerValues;

    //언어별 데이터 처리
    langs.forEach((language, index) => {

      //언어별 데이터 저장할 빈 객체 생성
      const jsonData = {};

      //헤더 제외한 나머지 행 돌기
      for (let j = 1; j < rows.length; j++) {

        //1번째 셀 값 키로 가져오기
        const key = sheet.getCell(j, 0).value;

        //현재 언어에 해당하는 셀 값 가져오기
        const value = sheet.getCell(j, index).value;

        //키 값이 있을 때만 jsonData에 추가하기
        if (key) {
          jsonData[key] = value;
        }
      }

      //현재 시트와 언어데 대한 데이터 data 객체에 추가하기
      data[`${sheet.title}_${language}`] = jsonData;
    });
  }

  //data에 담아둔거 반환
  return data;

}

export function downloadJSON(data, filename = 'data.json') {

  //데이터 json으로 변환하고 들여쓰기 2칸
  const jsonStr = JSON.stringify(data, null, 2);
  //json 객체를 파일 데이터로 변환
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}