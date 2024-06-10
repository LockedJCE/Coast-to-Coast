import CoastLogo from "../assets/plane2.svg";
import travel1 from "../assets/travel1.jpg";
import travel2 from "../assets/travel2.jpg";
import travel3 from "../assets/travel3.jpg";
import travel4 from "../assets/travel4.jpg";
import travel5 from "../assets/travel5.jpg";
import globe from "../assets/globe.jpg";
import group from "../assets/group.jpg";

const values = [
    {
        name: 'User-Centric Design',
        description:
            'At the core of our platform is a commitment to our users. We prioritize creating an intuitive and seamless experience, ensuring that everyone, regardless of their tech-savviness, can effortlessly plan and manage their travels. Our design philosophy revolves around simplicity and accessibility, making travel planning a delight rather than a chore.',
    },
    {
        name: 'Innovation and Adaptability',
        description:
            'The travel industry is constantly evolving, and so are we. We embrace innovation and continuously update our platform with cutting-edge features and the latest travel trends. Our adaptability ensures that we meet the changing needs of our users, providing them with the most relevant and effective tools for their travel planning.',
    },
    {
        name: 'Comprehensive Resources',
        description:
            'We believe that well-informed travelers make the best journeys. Our website offers a wealth of resources, from detailed destination guides to personalized recommendations. We strive to provide all the information our users need to plan unforgettable trips, all in one convenient place.',
    },
    {
        name: 'Community and Connection',
        description:
            'Travel is about more than just destinations; its about the connections we make along the way. We foster a vibrant community of travelers who share their experiences, tips, and insights. By facilitating these connections, we help our users feel more confident and inspired as they plan their adventures.',
    },
    {
        name: 'Sustainability and Responsibility',
        description:
            'We are committed to promoting responsible travel. Our platform encourages eco-friendly travel options and provides information on sustainable practices. We believe in preserving the beauty of our planet for future generations and helping our users make environmentally conscious travel choices.',
    },
    {
        name: 'Integrity and Transparency',
        description:
            'Trust is the foundation of our relationship with our users. We maintain the highest standards of integrity and transparency in all our operations. Our users can rely on us for accurate information, honest recommendations, and clear communication. By building a trustworthy platform, we ensure our users can plan their travels with confidence and peace of mind.',
    },
]
const team = [
    {
        name: 'Jensen Edwards',
        role: 'Co-Founder/ Front-End',
        imageUrl:
            'https://avatars2.githubusercontent.com/u/163614828',
    },
    {
        name: 'Hunter Hanson',
        role: 'Co-Founder/ Back-End',
        imageUrl:
            'https://avatars2.githubusercontent.com/u/50032027',
    },
    {
        name: 'Gordon Kwan',
        role: 'Co-Founder/Full-Stack',
        imageUrl:
            'https://avatars2.githubusercontent.com/u/163227040',
    },
]


const About = () => {
    return (
        <main className="isolate">
            {/* Hero section */}
            <div className="relative isolate -z-10">
                <svg
                    className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                </svg>
                <div
                    className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                        }}
                    />
                </div>
                <div className="overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                            <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    We’re changing the way you travel.
                                </h1>
                                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                    Experience seamless, personalized, and connected journeys with us. By leveraging cutting-edge technology and understanding your needs, we tailor every trip for you.
                                    From simplified bookings to enhanced comfort and unique destination insights, we make every aspect of travel smoother and more enjoyable.
                                    With us, travel is more than just the destination—it's about the journey.
                                </p>
                            </div>
                            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                    <div className="relative">
                                        <img
                                            src={travel1}
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                    <div className="relative">
                                        <img
                                            src={travel2}
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="relative">
                                        <img
                                            src={travel3}
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                    <div className="relative">
                                        <img
                                            src={travel4}
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                    <div className="relative">
                                        <img
                                            src={travel5}
                                            alt=""
                                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-auto">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Goal</h2>
                    <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                            <p className="text-xl leading-8 text-gray-600">
                                At Coast-to-Coast, our goal is to revolutionize the way people plan their travels.
                                We strive to offer a seamless, user-friendly platform that allows travelers to create, customize, and share detailed travel itineraries effortlessly.
                                By providing a comprehensive set of tools and resources, we aim to empower users to maximize their travel experiences, ensuring every journey is memorable and stress-free.
                            </p>
                            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                <p>
                                    We understand that planning a trip can be overwhelming and time-consuming.
                                    That’s why we’ve designed our website to be intuitive and easy to navigate, catering to both seasoned travelers and those embarking on their first adventure.
                                    By simplifying the planning process, we help our users save time and focus on what truly matters: enjoying their travels.
                                </p>
                                <p className="mt-10">
                                    Our commitment extends beyond just providing an itinerary creation tool.
                                    We continuously update our platform with the latest travel trends, tips, and destination guides, ensuring our users have access to the most relevant and up-to-date information.
                                    With Coast-to-Coast, we aim to be your trusted partner in every step of your journey, making travel planning as exciting and enjoyable as the trip itself.
                                </p>
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-auto lg:justify-center">
                            <dl className="w-64 space-y-8 xl:w-80">
                                <img
                                    src={globe}
                                    alt=""
                                    className="mt-0 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                                />
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image section */}
            <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                <img
                    src={group}
                    alt=""
                    className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                />
            </div>

            {/* Values section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our values</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    At Coast-to-Coast, our values guide every aspect of our work, ensuring we deliver the best possible experience for our users. Here’s a glimpse into the principles that drive us:
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {values.map((value) => (
                        <div key={value.name}>
                            <dt className="font-semibold text-gray-900">{value.name}</dt>
                            <dd className="mt-1 text-gray-600">{value.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* Team section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Meet the dedicated team behind Coast-to-Coast! Our passionate and experienced members work tirelessly to bring you the best travel planning experience.
                        Get to know the innovators making your journeys unforgettable.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                >
                    {team.map((person) => (
                        <li key={person.name}>
                            <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt="" />
                            <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                            <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};
export default About;