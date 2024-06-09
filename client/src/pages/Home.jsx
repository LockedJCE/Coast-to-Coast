import { useQuery } from '@apollo/client';
import { CurrencyDollarIcon, FingerPrintIcon, ListBulletIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import CoastLogo from "../assets/SVG1.svg";

const features = [
  {
    name: 'Detailed Travel Planning',
    description:
      'Our app empowers you to meticulously plan your travels by providing comprehensive itinerary options, customizable trip details, and real-time updates.',
    icon: ListBulletIcon,
  },
  {
    name: 'Expenses',
    description:
      'Our app allows you to effortlessly track your expenses by categorizing your spending, setting budget limits, and providing real-time financial insights.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Trip Overview',
    description:
      'Our app allows you to view all your trip itineraries in one convenient place, making it easy to manage and access your travel plans. With a streamlined interface, you can quickly review detailed schedules, bookings, and activities for each of your trips.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Reviews',
    description:
      'Our app enables you to see detailed reviews of locations and attractions, offering insights from fellow travelers to help you make informed decisions.',
    icon: NewspaperIcon,
  },
]

const Home = () => {
    return (
      <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">We got you!</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                No Plan? No Problem.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the simplest way to plan your next adventure with our company's hassle-free travel planning services.
              Let us turn your dream trip into a reality with ease and convenience.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )
};

export default Home;