import React from 'react';
import Navbar from "./Navbar";

const AboutPage = () => {
    return (
        <div className="bg-gray-950 min-h-screen min-w-screen p-2">
            <Navbar/>
            <div>
                <div className="container px-10 mx-5">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-white">About Our University</h1>
                        <p className="text-gray-100 mt-4">Dedicated to Excellence in Education</p>
                    </div>

                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
                            <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
                            <p className="text-gray-100">
                                Our mission is to empower students with knowledge, skills, and values needed for a
                                fulfilling and productive life in a rapidly changing global society.
                            </p>
                        </div>

                        <div className="w-full lg:w-1/2 px-4">
                            <h2 className="text-2xl font-semibold text-white mb-3">Our Vision</h2>
                            <p className="text-gray-100">
                                We aspire to be a leading world-class university that nurtures talent and innovatively
                                contributes to the advancement of society and humanity.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-white mb-3">Our History</h2>
                        <p className="text-gray-100">
                            Founded in 1900, our university has a rich history of academic excellence, groundbreaking
                            research, and a commitment to social justice and community service.
                        </p>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-100 mb-3">Contact Information</h2>
                        <p className="text-gray-100"><strong>Main Campus:</strong> 456 University Boulevard,
                            Springfield, ST 12345</p>
                        <p className="text-gray-100"><strong>Satellite Campus:</strong> 789 College Road, Riverside, ST
                            67890</p>
                        <p className="text-gray-100"><strong>Phone:</strong> (555) 123-4567</p>
                        <p className="text-gray-100"><strong>Email:</strong> info@ouruniversity.edu</p>
                        <p className="text-gray-100"><strong>Admissions Office:</strong> admissions@ouruniversity.edu |
                            (555) 987-6543</p>
                        <p className="text-gray-100"><strong>Alumni Relations:</strong> alumni@ouruniversity.edu | (555)
                            654-3210</p>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-100 mb-3">Social Media</h2>
                        <p className="text-gray-100">Follow us on:</p>
                        <p className="text-gray-100">Facebook: @OurUniversityFB</p>
                        <p className="text-gray-100">Twitter: @OurUniversityTweets</p>
                        <p className="text-gray-100">Instagram: @OurUniversityInsta</p>
                        <p className="text-gray-100">LinkedIn: Our University</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AboutPage;
