import Navbar from "./Navbar";
import React, {useState, useEffect} from 'react';
import axios from "axios";


const Courses = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCEBb1b_L6zDS3xTUrIALZOw&order=date&type=video&key=AIzaSyAeEQLMavJeveLdeZo9u1fzdhUYkJrlmWI`);
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        setLoading(false);

        fetchVideos();
    }, []);


    return <div className="bg-gray-950 min-h-screen min-w-screen p-2">
        <Navbar/>
        {loading && <div className="m-5 p-5 text-lg badge badge-error gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 className="inline-block w-4 h-4 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Loading data...
        </div>}
        <div>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white">Check out latest university lectures</h1>
                <p className="text-gray-100 mt-4">Dedicated to Excellence in Education</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {videos.map(video => (
                    <div key={video.id.videoId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-48"
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title={video.snippet.title}
                        ></iframe>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{video.snippet.title}</h3>
                            <p className="text-sm text-gray-600">{video.snippet.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default Courses