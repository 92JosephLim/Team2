import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-black bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                ourHour TOGETHER
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                This is a simple example of a Landing Page you can build using
                Material Tailwind. It features multiple components based on the
                Tailwind CSS and Material Design by Google.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Working with us is a pleasure
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                Donot let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
                <br />
                <br />
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you are good to
                go. Just make sure you enable them first via JavaScript.
              </Typography>
              <Button variant="filled">read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Top Notch Services
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
            According to the National Oceanic and Atmospheric Administration,
            Ted, Scambos, NSIDClead scentist, puts the potentially record
            maximum.
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="Co-Working" heading="Build something">
            Put the potentially record low maximum sea ice extent tihs year down
            to low ice. According to the National Oceanic and Atmospheric
            Administration, Ted, Scambos.
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="Contact Us" heading="Want to work with us?">
            Complete this form and we will get back to you in 24 hours.
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Mainpage.css"; // CSS 파일을 import
// import mainback from "../../assets/mainback.jpg";
// import pic1 from "../../assets/1.jpg";
// import pic2 from "../../assets/2.jpg";
// import pic3 from "../../assets/3.jpg";
// import pic4 from "../../assets/4.jpg";
// import MainSide from "../../animation/MainSide"

// function Main() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page">

//       <div className="content">
//         <img src={mainback} alt="Main BackGround" className="background-image" />
//         <div className="left-pane"> {/* 왼쪽 패널 */}
//           <div className="profile-grid">
//             <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-1">
//               <img src={pic1} alt="Emma, 25" />
//               <div className="profile-info">
//                 <p>Emma, 25</p>
//               </div>
//             </div>
//             <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-2">
//               <img src={pic2} alt="Sofia, 28" />
//               <div className="profile-info">
//                 <p>Sofia, 28</p>
//               </div>
//             </div>
//             <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-3">
//               <img src={pic4} alt="Lily, 28" />
//               <div className="profile-info">
//                 <p>Lily, 28</p>
//               </div>
//             </div>
//             <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-4">
//               <img src={pic3} alt="Grace, 30" />
//               <div className="profile-info">
//                 <p>Grace, 30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
//           <div className="vertical-section">
//             <MainSide />
//             <p className="animate__animated animate__pulse animate__infinite">247,584 건의 매칭이 진행 중이에요...</p>
//             <button
//               className="start-button flash-border"
//               onClick={() => navigate("/video")}
//             >
//               시작하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Main;










// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Mainpage.css"; // CSS 파일을 import
// import TopNav from "../../components/topnav/TopNav";
// import Footer from "../../components/footer/Footer";
// import MainSide from "../../animation/MainSide";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page">
//       <TopNav />
//       <div className="content">
//         <div className="left-pane"> {/* 왼쪽 패널 */}
//           <MainSide />
//         </div>
//         <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
//           <div className="vertical-section">
//             <div>2조사이트</div>
//             <p className="animate__animated animate__pulse animate__infinite">247,584 건의 매칭이 진행 중이에요...</p>
//             <button
//               className="start-button flash-border"
//               onClick={() => navigate("/video")}
//             >
//               시작하기
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import TopNav from "../../components/topnav/TopNav";
// import Footer from "../../components/footer/Footer";
// import pic1 from "../../assets/1.jpg";
// import pic2 from "../../assets/2.jpg";
// import pic3 from "../../assets/3.jpg";
// import pic4 from "../../assets/4.jpg";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page flex flex-col text-white">
//       <TopNav />
//       <div className="flex flex-grow relative">
//         <div className="flex flex-grow z-1">
//           <div className="flex-1 flex flex-col justify-center items-center text-center">
//             {/* 왼쪽 패널 */}
//             <div className="profile-grid">
//               <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-1">
//                 <img src={pic1} alt="Emma, 25" />
//                 <div className="profile-info">
//                   <p>Emma, 25</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-2">
//                 <img src={pic2} alt="Sofia, 28" />
//                 <div className="profile-info">
//                   <p>Sofia, 28</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInUp animate__infinite profile-delay-3">
//                 <img src={pic4} alt="Lily, 28" />
//                 <div className="profile-info">
//                   <p>Lily, 28</p>
//                 </div>
//               </div>
//               <div className="profile animate__animated animate__slideInDown animate__infinite profile-delay-4">
//                 <img src={pic3} alt="Grace, 30" />
//                 <div className="profile-info">
//                   <p>Grace, 30</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex-1 flex justify-center items-center text-white">
//             <div className="text-center">
//               <div className="text-4xl">2조사이트</div>
//               <p className="animate__animated animate__pulse animate__infinite">
//                 247,584 건의 매칭이 진행 중이에요...
//               </p>
//               <button
//                 className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 onClick={() => navigate("/video")}
//               >
//                 시작하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;



// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./Mainpage.css"; // CSS 파일을 import
// import Footer from "../../components/footer/Footer";
// import TopNav from "../../components/topnav/TopNav";

// function Mainpage() {
//   const navigate = useNavigate();

//   return (
//     <div className="main-page">
//       <TopNav />
//       <div className="content">
//         <div className="left-pane"> {/* 왼쪽 패널 */}
//           <div className="profile-grid">
//             <div className="profile">
//               <img src="profile1.jpg" alt="Emma, 25" />
//               <div className="profile-info">
//                 <p>Emma, 25</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile2.jpg" alt="Sofia, 28" />
//               <div className="profile-info">
//                 <p>Sofia, 28</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile3.jpg" alt="Lily, 28" />
//               <div className="profile-info">
//                 <p>Lily, 28</p>
//               </div>
//             </div>
//             <div className="profile">
//               <img src="profile4.jpg" alt="Grace, 30" />
//               <div className="profile-info">
//                 <p>Grace, 30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mainContent right-pane"> {/* 오른쪽 패널 */}
//           <div className="vertical-section">
//             <h1>2조사이트</h1>
//             <p>247,584 건의 매칭이 진행 중이에요...</p>
//             <button className="start-button" onClick={() => navigate("/video")}>
//               비디오 채팅하기
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mainpage;