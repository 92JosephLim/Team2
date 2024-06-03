import { useEffect, useState } from "react";
import { getList2 } from "../../api/weatherApi";
import useCustomMove from "../../hooks/useCustomMove";

import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListWeatherComponent = () => {
   const {page, size, refresh, moveToList, moveToRead} = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList2({ page, size }).then(data => {
            console.log(data);
            console.log("************************************");
            setServerData(data);
        });
    }, [page, size, refresh]);

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(openWeather => {
                    console.log("*************"+openWeather); // openWeather의 데이터를 확인
                    return (
                        <div key={openWeather.tno} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md" onClick={() => moveToRead(openWeather.tno)}>
                            <div className="flex">
                                <div className="font-extrabold text-base p-2 w-1/12">
                                    {openWeather.tno}
                                </div>
                                <div className="text-base m-1 p-2 w-8/12 font-extrabold">
                                    {openWeather.weatherName}
                                </div>
                                <div className="text-base m-1 p-2 w-2/10 font-medium">
                                    {openWeather.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    );
}
export default ListWeatherComponent;