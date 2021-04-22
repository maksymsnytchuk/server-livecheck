import {ServerLiveCheck} from './index';

const fn = async () => {
    const offlineServers = [
        {url: 'https://somefalcy.google.com', priority: 12},
    ];

    try {
        const res = await ServerLiveCheck.findServer(offlineServers);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

fn();


