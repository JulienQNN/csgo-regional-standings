import { OcMarkgithub2 } from 'solid-icons/oc';
import { americasData, europeData, asiaData } from '../Data/DataStandings';

export const Nav = (props: any) => {
    const { refreshData, refreshTitle, refreshSubtitle } = props;

    const refreshDatas = (data: any, title: string, subtitle: string) => {
        refreshData(data)
        refreshTitle(title)
        refreshSubtitle(subtitle)
    }
    return (
        <nav class='fixed top-0 left-0 right-0 z-10 bg-gray-800'>
            <div class='mx-auto max-w-5xl px-2 sm:px-6 lg:px-8'>
                <div class='relative flex h-16 items-center justify-between'>
                    <div class='flex flex-1 items-center'>
                        <div class='sm:ml-6 sm:block'>
                            <div class='flex space-x-4'>
                                <a
                                    href='#'
                                    onClick={() => refreshDatas(europeData.slice(1), "EUROPE", europeData[0].title)}
                                    class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                    EUROPE
                                </a>

                                <a
                                    href='#'
                                    onClick={() => refreshDatas(americasData.slice(1), "AMERICAS", americasData[0].title)}
                                    class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                    AMERICAS
                                </a>

                                <a
                                    href='#'
                                    onClick={() => refreshDatas(asiaData.slice(1), "ASIA", asiaData[0].title)}
                                    class='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                    ASIA
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class='absolute inset-y-0 right-0 flex items-center pr-6 sm:static sm:inset-auto sm:ml-8 mr-8 sm:pr-0'>
                        <a
                            type='button'
                           href='https://github.com/JulienQNN/csgo-regional-standings' 
                            class='rounded-full bg-gray-800 text-gray-400 hover:text-white'>
                            <span class='sr-only'>Github</span>
                            <OcMarkgithub2 />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
