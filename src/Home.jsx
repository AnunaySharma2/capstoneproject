import Navbar from "./Navbar";

const Home = () => {
    return <div className={"bg-gray-950 min-h-screen min-w-screen"}>
        <Navbar/>
        <h1 className="text-5xl font-bold text-white px-5 py-2 text-center">Welcome to University of Virginia</h1>
        <h2 className="text-3xl font-semibold text-gray-200 px-5 py-3 text-center">developing responsible citizen leaders and professionals, advancing, preserving, and disseminating knowledge, and providing world-class patient care.</h2>
        <img className={""} src="https://www.virginia.edu/sites/default/files/201904-sunset.jpg" alt="cover-photo"/>
    </div>
}

export default Home;