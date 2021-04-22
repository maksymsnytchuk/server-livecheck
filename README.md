# Installation

1) ```npm install```
2) Build with ```npm run build```
3) Tests ```npm run test```

# Usage
1) Could be published to npm and be used as package
```import { ServerLiveCheck } from 'server-livecheck';```

2) Default usage

```
import { ServerLiveCheck } from 'src/';

const servers = [
    {url: 'https://google.com', priority: 12},
    {url: 'https://youtube.com', priority: 8}
];

const liveServers = await ServerLiveCheck.findServer(servers);

```
