<div align=center>
  <img src="https://i.ibb.co/fVc3WVsV/logo-smaller.png" alt="RavageServer Logo">

  ### RavageServer is a WIP private server for Halloween: The Game!
  
</div>

Most of the basic endpoints are added.
I am searching for a fix for the ``Backend login failed, invalid response!`` error in the game (screenshot below)
<img src="https://i.ibb.co/nNvmSv30/20261024200433-1.jpg">

## How to host/use RavageServer
1) Install [NodeJS](https://nodejs.org/en/)
2) Rename ``.env.example`` to ``.env``
3) Run ``npm i`` in the project folder
4) Run ``node .`` in the project folder
5) Use something to redirect the Halloween: The Game servers to 127.0.0.1:3000 (Fiddler, SSL Bypass, etc)

<details>
<summary>Looking for the FiddlerScript? Click here to reveal</summary>

```javascript
import Fiddler;

class Handlers
{
    static function OnBeforeRequest(oSession: Session) {
        if (oSession.hostname.Contains("illfonic"))
        {
            if (oSession.HTTPMethodIs("CONNECT"))
            {
                oSession["x-replywithtunnel"] = "BackendTunnel";
                return;
            }
            oSession.fullUrl = "http://127.0.0.1:3000" + oSession.PathAndQuery;
        }
    }   
}
```

</details>
