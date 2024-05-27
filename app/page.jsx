'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Engine, Render, Composite, Bodies, Runner } from 'matter-js';
import { FaArrowDown  } from "react-icons/fa";
import { CiMedicalCase } from "react-icons/ci";
import Modal from 'react-modal';

function Page() {
    const [isNavbarOpen, setNavbarOpen] = React.useState(false);
    const navbarClick = () => setNavbarOpen(!isNavbarOpen);

    /* for adding balls/icons  ---------------------------------------------------------------*/
    const [currentText, setCurrentText] = useState("am Huaming");
    const things = ["am a student", "am a programmer", "am a cook", "am a writer", "am a game maker", 
    "am a ML enthusiast", "am a designer", "am a doer", "am a Psychology lover", "am a Cog Sci major", 
    "am a CS minor", "am a bodybuilder", "am a data scientist", "am a web developer", 
    "am a software engineer", "am a reader", "am a badminton player", "am a learner", "am a problem solver", "am a creative thinker"]
    
    /* check if already rendered */
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const canvasRef = useRef(null);
    const iconsRef = React.useRef(null);
    const [ball, setBall] = useState();
    const [icon, setIcon] = useState([]);
    
    /* add balls to the screen */
    useEffect(() => {
        let iconImg = icon[(ballCount - 2) % icon.length]; 
        console.log(ballCount)
        if (ball) {
            const ballBody = Bodies.circle(ball.position[0], ball.position[1], 65, { 
                render: { 
                    sprite: { 
                    texture: iconImg
                }
            }
        }); 
            Composite.add(engineRef.current.world, [ballBody]);
        }
    }, [ball]);

    const addBall = () => {
        if (isTyping || ballCount >= (things.length+1)) return;
        const position = [Math.random() * 500, 0];
        setBall({position});
        setBallCount(prevBallCount => prevBallCount + 1); 
    };

    /* typing effect for the main container ---------------------------------------------------------------*/
    const [isTyping, setIsTyping] = useState(false);
    const [ballCount, setBallCount] = useState(0);
    const [isArrowVisible, setIsArrowVisible] = useState(true);
    /* change the text in the main container */
 
    const changeClick = (index = 0) => {
        if (isTyping) {
            return;
        }
        setIsTyping(true);
        let newText = things[index % things.length];
        let i = 0;
        addBall();
        setIsArrowVisible(false);
        const typing = setInterval(() => {
            setCurrentText(newText.slice(0, i + 1));
            i++;
            if (i > newText.length) {
                clearInterval(typing);
                setIsTyping(false);
                if (index < things.length - 1) {
                    changeClick(index + 1);
                }
            }
        }, 50);
        return () => {
            clearInterval(typing);
        };
    };

    /* transition to main page ---------------------------------------------------------------*/
    const [isCurtainUpWAI, setCurtainUpWAI] = useState(true);
    const [showMain, setMain] = useState(false);

    const toggleCurtainWAI = () => {
        if (isNavbarOpen)
            setNavbarOpen(false);
        setCurtainUpWAI(false);
        
        setTimeout(() => {
            setShowLanding(false);
            setShowContactResume(false);
            setMain(true);
            setCurtainUpWAI(true)
        }, 1000);
    }

    const [isCurtainUpResume, setCurtainUpResume] = useState(true);
    const [showLanding, setShowLanding] = useState(true);
    const [showContactResume, setShowContactResume] = useState(false);

    const toggleCurtainResume = () => {
        if (isNavbarOpen)
            setNavbarOpen(false);
        setCurtainUpResume(false);

        setTimeout(() => {
            setShowLanding(false);
            setMain(false);
            setShowContactResume(true);
            setCurtainUpResume(true);
            window.scrollTo(0, 0);
        }, 1000)
    };

    const [isCurtainUpReset, setCurtainUpReset] = useState(true);
    const toggleReset = () => {
        if (isNavbarOpen)
            setNavbarOpen(false);
        setCurtainUpReset(false);
        setTimeout(() => {
            setShowLanding(true);
            setShowContactResume(false);
            setMain(false);
            setCurtainUpReset(true)
            window.scrollTo(0, 0);
        }, 1000)
    };
    
    useEffect(() => {
        const generateIcon = (text) => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            const radius = 64; 
            const center = 65; 
            canvas.width = center * 2;
            canvas.height = center * 2;
            context.font = '50px Arial';
        
            context.textAlign = 'center';
            context.fillText(text, center, center + 15);
            context.arc(center, center, radius, 0, 2 * Math.PI);
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.stroke();
            return canvas.toDataURL();
        };

        const student = generateIcon("👨‍🎓");
        const programmer = generateIcon("💻");
        const cook = generateIcon("👨‍🍳");
        const writer = generateIcon("📝");
        const gameMaker = generateIcon("🎮");
        const mlEnthusiast = generateIcon("🤖");
        const designer = generateIcon("🎨");
        const doer = generateIcon("🔨");
        const psychEnthusiast = generateIcon("🧠");
        const cogSciMajor = generateIcon("🧬")
        const csMinor = generateIcon("👾")
        const bodyBuilder = generateIcon("🏋️");
        const dataScientist = generateIcon("📊");
        const webDeveloper = generateIcon("🌐");
        const softwareEngineer = generateIcon("💼");
        const reader = generateIcon("📚");
        const badmintonPlayer = generateIcon("🏸");
        const learner = generateIcon("📖");
        const problemSolver = generateIcon("🧩");
        const creativeThinker = generateIcon("💡");

        setIcon([student, programmer, cook, writer, gameMaker, mlEnthusiast, designer, doer, psychEnthusiast, cogSciMajor, csMinor, bodyBuilder, dataScientist, webDeveloper, softwareEngineer, reader, badmintonPlayer, learner, problemSolver, creativeThinker]);
        
        if (!engineRef.current && isCurtainUpWAI && iconsRef.current) {
            engineRef.current = Engine.create();
            renderRef.current = Render.create({
                element: iconsRef.current,
                engine: engineRef.current,
                options: {
                    width: 600,
                    height: 600,
                    wireframes: false,
                    background: 'transparent'
                }
            });
            var bottomWall = Bodies.rectangle(300, 595, 600, 10, { isStatic: true, render: { fillStyle: 'black' } });
            var leftWall = Bodies.rectangle(0, 300, 1, 600, { isStatic: true, render: { fillStyle: 'transparent' } });
            var rightWall = Bodies.rectangle(600, 300, 1, 600, { isStatic: true, render: { fillStyle: 'transparent' } });
            Composite.add(engineRef.current.world, [bottomWall, leftWall, rightWall]);
            Render.run(renderRef.current);
            var runner = Runner.create();
            Runner.run(runner, engineRef.current);
        }
    }, [isCurtainUpWAI]); 

    const handleCrossClickFromResume = (location) => {
        if (isNavbarOpen)
            setNavbarOpen(false);
        toggleCurtainWAI();
        setTimeout(() => {
          window.location.hash = location;
        }, 1050); 
    };
    const handleCrossClickFromAbout = (location) => {
        if (isNavbarOpen)
            setNavbarOpen(false);
        toggleCurtainResume();
        setTimeout(() => {
          window.location.hash = location;
        }, 1050); 
    };

    const [isVisible, setIsVisible] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
        <>  
            {/* Landing page*/}
            <section id="landing-page">
                {showLanding && <div id="landing">
                        <header className="text-2xl sm:text-6xl select-none text-center bg-gradient-to-r from-orange-200 to-orange-100 text-gray-700 flex justify-center items-center h-screen w-screen">
                            <div className="space-y-4">
                                <button className="flex hover:bg-orange-100 rounded-lg p-10 font-bold" onClick={ toggleCurtainResume }> Resume/Projects </button>
                                <p>or</p>
                                <button className="flex justify-center hover:bg-orange-100 rounded-lg p-10 text-xl sm:text-4xl w-full" onClick={ toggleCurtainWAI }>Quick: Who am I?</button>
                            </div>
                        </header> 
                </div>}
            </section>
            {/* Showcase page*/}
            <section id="showcase-page">
                <div className={`fixed left-0 w-full h-full bg-orange-50 z-10 transition-all duration-500 ease-linear ${isCurtainUpWAI ? 'top-[-100%]' : 'top-0'}`}></div>
                {showMain && <div id="showcase">
                    {/* Curtain transition*/}
                    
                    {/* Navbar default*/}
                    <div id="navbars">
                        <ul className="hidden list-none m-0 p-0 flex bg-orange-50 text-gray-700 md:block">
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" onClick={ toggleReset } href="#">Home</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" href="#about">About</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" onClick={ () => handleCrossClickFromAbout("projects") } href="#projects">Projects</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" href="#contact">Contact</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" onClick={ () => handleCrossClickFromAbout("official-resume") } href="#official-resume">Resume</a></li>
                        </ul>

                        {/* Navbar minimized*/}
                        <button className="block text-gray-700 font-bold text-2xl md:hidden m-auto px-10 pb-2 w-full hover:bg-gray-200 bg-orange-50" onClick={ navbarClick }>≡</button>
                        <nav className={`${isNavbarOpen ? 'block' : 'hidden'} md:hidden bg-orange-50`}>
                            <ul className="flex flex-col items-center text-2xl list-none m-0 p-0 bg-orange-50">
                                <li><a className="hover:bg-gray-200" onClick={ toggleReset } href="#">Home</a></li>
                                <li><a className="hover:bg-gray-200" href="#about">About</a></li>
                                <li><a className="hover:bg-gray-200" href="#projects" onClick={ () => handleCrossClickFromAbout("projects")}>Projects</a></li>
                                <li><a className="hover:bg-gray-200" href="#contact">Contact</a></li>
                                <li><a className="hover:bg-gray-200" href="#contact" onClick={ () => handleCrossClickFromAbout("official-resume")}>Resume</a></li>
                            </ul>
                        </nav>
                    </div>
                    
                    {/* Main page*/}
                    <div id="main">
                        <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-5"></div>
                        <div className="flex-grow flex flex-col justify-center">
                            <header className="select-none text-center bg-gradient-to-r from-orange-200 to-orange-100 text-gray-700 text-6xl flex justify-center items-center">
                                {/* Left with typing description*/ }
                                <div className="flex flex-col justify-center flex-3/5 h-screen-85">
                                    <h1 className="pt-5 text-5xl"> <span style={{ fontWeight: 'bold' }}></span> <br></br>
                                    {isArrowVisible && <div id="arrow" className="bg-opacity-50 h-20 flex justify-center item-center pt-10">
                                        <FaArrowDown className="animate-bounce w-6 h-6 text-gray-700" />
                                    </div>}
                                    <span className="font-bold">I</span> <span id="change" className="shadow bg-gradient-to-r from-orange-50 to-orange-50 hover:from-orange-100 hover:to-orange-100 p-1 rounded" onClick={(e) =>{ changeClick(); addBall();}}> { currentText } </span>
                                    </h1>
                                </div>
                                {/* Right with balls */ }
                                <div id="icons-id" className="hidden flex-2/5 h-screen-85 bg-orange-50 mr-20 rounded-lg shadow-2xl lg:block" ref={iconsRef}></div>
                            </header>
                            {/* Ball to transition */}
                            <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-20 flex justify-center item-center pt-4">
                                <a href="#about">
                                    <svg className="animate-bounce w-6 h-6" viewBox="0 0 24 24" fill="#fdba74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* About me */}
                    <div id="about" className="bg-orange-50 pt-10 pb-32">
                        <div className="text-5xl p-5 pb-20">
                            Here&#39;s a summary.
                        </div>
                                
                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 rounded-t-lg shadow-2xl">
                        <button className="rounded-lg p-2 hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div1: !prevState.div1 }))}>a student 👨‍🎓</button>
                            {/* Dropdown for student */}
                            {isVisible.div1 && 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg">
                                <p>I am a student at UCSD, majoring in Cognitive Science with a specialization in Machine Learning and Neural Computation and a minor in Computer Science.</p>
                            </div>}
                        </div>
                        
                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 shadow-2xl">
                            <button className="rounded-lg p-2  hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div2: !prevState.div2 }))}>a programmer 💻</button>
                            {/* Dropdown for programmer */}
                            {isVisible.div2&& 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg">
                                <p>I&#39;ve always been into scripting (aka making my life easier) and creating random applications that are rarely useful. However, I have gotten to a point 
                                    where I can make most things that I think of. Which is cool.
                                </p>
                            </div>}
                        </div>

                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 shadow-2xl">
                            <button className="rounded-lg p-2  hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div3: !prevState.div3 }))}>a cook 👨‍🍳</button>
                            {/* Dropdown for cook */}
                            {isVisible.div3&& 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg">
                                <p>While I mainly cook to survive my dining hall prices, I enjoy creating random things that I find online with my girlfriend.</p>
                            </div>}
                        </div>

                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 shadow-2xl">
                            <button className="rounded-lg p-2  hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div4: !prevState.div4 }))}>a writer 📝</button>
                            {/* Dropdown for writer */}
                            {isVisible.div4&& 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg">
                                <p>During quarantine, I got so bored that I ended up writing stories with my friends. They were the cringiest things that I will never release to the public.</p>
                            </div>}
                        </div>
                                        
                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 shadow-2xl">
                            <button className="rounded-lg p-2  hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div5: !prevState.div5 }))}>a game maker 🎮</button>
                            {/* Dropdown for game maker */}
                            {isVisible.div5&& 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg">
                                <p>I decided to start making games with my friends as a hobby. The hardest part was drawing. I suck at drawing.</p>
                            </div>}
                        </div>

                        <div className="ml-1/10 p-10 text-4xl bg-gradient-to-r from-orange-200 to-orange-100 rounded-b-lg">

                            <button className="rounded-lg p-2  hover:bg-orange-50" onClick={() => setIsVisible(prevState => ({ ...prevState, div6: !prevState.div6 }))}>a ML enthusiast 🤖</button>
                            {/* Dropdown for ML enthusiast */}
                            {isVisible.div6&& 
                            <div className="fadeIn bg-orange-50 p-5 m-5 text-2xl rounded-lg    ">
                                <p>A while ago, I watched a video by AI Warehouse where they taught an AI to walk. I thought that was
                                    the coolest thing ever and decided to learn more about ML. I have tried creating prediction models, image classifiers, RL agents and environments, and more. 
                                    I am trying to figure out what I actually want to do with my life.
                                </p>
                            </div>}
                        </div>
                    </div>
                    
                    {/* Redirect */}
                    <div id="redirect" className="bg-gradient-to-r from-orange-200 to-orange-100">
                        <div className="text-2xl p-10">
                            Thanks for reading all of that.
                            <br></br>
                            <br></br>
                            Heres a link to <a className="bg-orange-50 hover:bg-orange-100 cursor-pointer" onClick={toggleCurtainResume}>my projects and resume</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <footer id="contact" className="text-center px-4 py-1 text-sm bg-orange-50">
                        <p>Contact me at <a href="mailto:huw029@ucsd.edu">huw029@ucsd.edu</a> or <a href="mailto:hm.wu727@gmail.com">hm.wu727@gmail.com</a></p>
                        <p>&copy; 2024 Huaming Wu. All rights reserved.</p>
                    </footer>
                </div> }
            </section>
            <div className={`fixed left-0 w-full h-full bg-orange-50 z-10 transition-all duration-500 ease-linear ${isCurtainUpResume? 'top-[-100%]' : 'top-0'}`}></div>
            {/* Resume page */}
            <section id="resume-page">
                {showContactResume && <div id="resume">
                    {/* Navbar default*/}
                    <div id="navbars">
                        <ul className="hidden list-none m-0 p-0 flex bg-orange-50 text-gray-700 md:block">
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" onClick={ toggleReset } href="#">Home</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" onClick={ () => handleCrossClickFromResume("about")} href="#about">About</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" href="#projects">Projects</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" href="#contact-resume">Contact</a></li>
                            <li className="inline-flex"><a className="block text-black text-center px-8 py-3 hover:bg-gray-200" href="#official-resume">Resume</a></li>
                        </ul>

                        {/* Navbar minimized*/}
                        <button className="block text-gray-700 font-bold text-4xl md:hidden m-auto px-10 pb-2 w-full hover:bg-gray-200 bg-orange-50" onClick={ navbarClick }>≡</button>
                        <nav className={`${isNavbarOpen ? 'block' : 'hidden'} md:hidden bg-orange-50`}>
                            <ul className="flex flex-col items-center text-2xl list-none m-0 p-0 bg-orange-50">
                                <li><a className="hover:bg-gray-200" onClick={ toggleReset } href="#">Home</a></li>
                                <li><a className="hover:bg-gray-200" onClick={ () => handleCrossClickFromResume("about") } href="#about">About</a></li>
                                <li><a className="hover:bg-gray-200" href="#projects">Projects</a></li>
                                <li><a className="hover:bg-gray-200" href="#contact-resume">Contact</a></li>
                                <li><a className="hover:bg-gray-200" href="#official-resume">Resume</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div id="main-resume" className="flex flex-row bg-gradient-to-r from-orange-200 to-orange-100 h-screen-100">
                        <div className="flex flex-col w-1/3 bg-orange-50 h-screen-85 m-5 rounded-lg shadow-xl flex-col">

                            <img className="lg:h-1/2 mx-auto mt-5 rounded-lg" src="./images/me.png" alt="picture of me"></img> 
                            
                            <div className="items-center text-center">
                                
                                <div className="font-bold text-2xl m-5">Hi, I&#39;m Huaming</div>

                                <div className="font-bold flex justify-center items-center m-2">
                                    <img className="h-7" src="./images/UCSD.png" alt="UCSD icon"></img>
                                    <p className="ml-2">UC San Diego</p>
                                </div>
                
                                <div className="m-2 hidden lg:block"><span className="font-bold">Major: </span>Cognitive Science with a Specialization in Machine Learning and Neural Computation</div>
                                <div className="m-2 block lg:hidden"><span className="font-bold">Major: </span>Cog Sci. ML and Neural</div>

                                <div className="m-2"><span className="font-bold">Minor: </span>Computer Science</div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-orange-50 m-5 w-full rounded-lg shadow-xl overflow-auto">
                            <div className="m-10 font-bold text-5xl">
                                Projects
                            </div>
                            {/* Row 1 */}
                            <div className="flex flex-col md:flex-row md:space-x-4 mx-4 mb-4 text-xl">
                                <div id="portfolio" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/hm" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            Portfolio Website
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto" src="./images/website.png" alt="picture of website code"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="mediresponse" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/mediresponse-personal" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                        MediResponse: The Emotional Medical Chatbot
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/react_medical.png" alt="picture of medical icon"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="financial-nlp" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/financial-sentiment-nlp" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            Financial Sentiment Analysis NLP
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/huggingface.png" alt="picture of Hugging Face"></img>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Row 2 */}
                            
                            <div className="flex flex-col md:flex-row md:space-x-4 mx-4 mb-4 text-xl">
                                <div id="ecommerce-backend" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/ecommerce-backend" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            E-Commerce Backend 
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto" src="./images/shoomimi.png" alt="picture of shoo & mimi"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="mlproj" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/mlproj" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            mlproj
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/mlproj.png" alt="picture of mlproj landing page"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="apartment finder" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/apartment_finder/tree/main" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                        Apartment Finder using Google Cloud
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/cloud.png" alt="google cloud icon"></img>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Row 3 */}
                            <div className="flex flex-col md:flex-row md:space-x-4 ml-4 mr-4 mb-4 text-xl">
                                <div id="robocup" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/robocup-test" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            RoboCup SSL
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/robocup.png" alt="picture of robocup environment"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="rltree" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/rl_tree" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            RL Tree
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/rltree.png" alt="picture of rl environment"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="pima" className="w-full md:w-1/3">
                                    <a href="https://github.com/hwu27/diabetes-mlpipeline" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            Pima Indians Diabetes Prediction
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="./images/pima.png" alt="picture of pima indians diabetes dataset"></img>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            {/* Row 4 */}
                            <div className="flex flex-col md:flex-row md:space-x-4 ml-4 mr-4 text-xl">
                                <div id="data-synth" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/data_synthesizer" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            Data Synthesizer
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto" src="./images/data.png" alt="random lines of data"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="ailand" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="https://github.com/hwu27/Ailand-Personal" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                            AiLand
                                        </div> 
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto" src="./images/ailand.png" alt="picture of a tile block that I am very proud of"></img>
                                        </div>
                                    </a>
                                </div>
                                <div id="work-in-progress" className="w-full mb-5 md:mb-0 md:w-1/3">
                                    <a href="" target="_blank" rel="noopener noreferrer">
                                        <div className="text-center bg-orange-300 shadow-xl rounded-t-lg p-1">
                                        Work in Progress
                                        </div>
                                        <div className="text-center bg-orange-200 shadow-xl rounded-b-lg hover:bg-gray-200">
                                            <img className="opacity-60 rounded-b-lg mx-auto"src="" alt="work in progress"></img>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div id="official-resume" className="bg-orange-50">
                        <div>
                            <div className="p-10 pb-0 font-bold text-5xl">
                                <span className="flex items-center">Official Resume <FaArrowDown className="animate-bounce w-6 h-6 text-gray-700 ml-10 mt-3"/></span>
                            </div>
                        </div>
                        <div className="m-10 mb-0 font-bold text-5xl">
                            <img className="p-5 mx-auto" src="./images/resume.png" onClick={handleImageClick} alt="picture of resume"></img>
                        </div>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={ handleCloseModal }
                            style={{
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                            content: {
                                border: "none",
                                overflow: "auto",
                            },
                            }}
                        >
                            <img
                            src = "./images/resume.png"
                            style = {{ width: "250%", height: "250%", objectFit: "contain" }}
                            alt = "picture of resume zoomed in"
                            />
                        </Modal>
                    </div>
                    {/* Contact */}
                    <footer id="contact-resume" className="text-center px-4 py-1 text-sm bg-orange-50">
                        <p>Contact me at <a href="mailto:huw029@ucsd.edu">huw029@ucsd.edu</a> or <a href="mailto:hm.wu727@gmail.com">hm.wu727@gmail.com</a></p>
                        <p>&copy; 2024 Huaming Wu. All rights reserved.</p>
                    </footer>
                </div>}
            </section>
            <div className={`fixed left-0 w-full h-full bg-orange-50 z-10 transition-all duration-500 ease-linear ${isCurtainUpReset ? 'top-[-100%]' : 'top-0'}`}></div>
            <canvas className="hidden" ref={canvasRef} width={75} height={75} />
        </>
    );
}


export default Page;
