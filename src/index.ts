import fetch from 'node-fetch'

export interface ServerData {
    url: string,
    priority: number,
    online?: boolean
}

const TIMEOUT_AFTER_MS = 5000;

export const ServerLiveCheck = {
    findServer: async (servers: ServerData[]): Promise<ServerData | null> => {
        const serversPromises = servers.map(server => isServerLive(server));

        const serverResults = await Promise.all(serversPromises);

        const onlineServers = serverResults.filter(server => server.online);

        return onlineServers.length > 0 ?
            onlineServers.reduce((current, next) => (current.priority < next.priority ? current : next), onlineServers[0]):
            null
    }
}

const isServerLive = async (serverData: ServerData): Promise<ServerData> => {
    return new Promise<ServerData>((resolve, reject) => {
        const timer = setTimeout(() => {
            reject({...serverData, online: false})
        }, TIMEOUT_AFTER_MS)

        fetch(serverData.url, {method: 'GET'})
            .then(value => {
                clearTimeout(timer)
                resolve({...serverData, online: true})
            })
            .catch(reason => {
                clearTimeout(timer)
                reject({...serverData, online: false})
            })
    })
}