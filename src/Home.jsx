import Navbar from "./Navbar";

const Home = () => {
    return <div className={"bg-gray-950 min-h-screen min-w-screen"}>
        <Navbar/>
        <img className={""} src="https://www.virginia.edu/sites/default/files/201904-sunset.jpg" alt="cover-photo"/>
    </div>
}

export default Home;