import { ServerLiveCheck } from '../';

describe('Basic App test', () => {
    const servers = [
        {url: 'https://google.com', priority: 12},
        {url: 'https://youtube.com', priority: 8}
    ];

    const offlineServers = [
        {url: 'https://somefalcy.google.com', priority: 12},
    ];

    it('Test Default google services (search and youtube)', async () => {
        const res = await ServerLiveCheck.findServer(servers);

        expect(res).toBeDefined();
        expect(res?.online).toBeTruthy();
        expect(res?.url).toEqual('https://youtube.com');
        expect(res?.priority).toEqual(8);
    });

    it('Test offline servers', async () => {
        const res = await ServerLiveCheck.findServer(offlineServers).catch(res => res);
        expect(res).toBeDefined();
        expect(res.online).toEqual(false);
    });

    it('Test empty array case', async () => {
        const res = await ServerLiveCheck.findServer([]);

        expect(res).toBeNull();
    });
});
