import server from "bunrest";
import { redisClient } from "./lredisClient";
import { promisify } from "./utils";

const cache: Record<number, number> = {};
const sqs_url = "http://light-app-sqs-1:5000/api";

const queueId = "651bde211bb0d4606e83f025";
// console.log('cache', cache);
function fibonacci(n: number): number {
  if (cache[n]) {
    // console.log('cache hit');
    return cache[n];
  }
  if (n <= 1) {
    return n;
  }
  // console.log(`cache miss ${n}`);
  const first = fibonacci(n - 1);
  cache[n - 1] = first;
  const second = fibonacci(n - 2);
  cache[n - 2] = second;
  cache[n] = first + second;
  return cache[n];
}

const timer: Timer | null = null;

function sqsPolling() {
  if (timer) {
    clearInterval(timer);
  }
  setInterval(async () => {
    const actionsRes = await fetch(`${sqs_url}/messages/consume`, {
      method: "POST",
      body: JSON.stringify({
        queueId: queueId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result: { body: string; id: string }[] = await actionsRes.json();
    if (!result) {
      return;
    }
    if (actionsRes.status === 200) {
      if (result.length === 0) {
        return;
      }
      // biome-ignore lint/complexity/noForEach: <explanation>
      result.forEach(async (action) => {
        const number = parseInt(action.body);
        const fibResult = fibonacci(number);
        console.log("LS -> src/index.ts:51 -> fibResult: ", fibResult);

        await promisify((callback: any) =>
          redisClient.set(
            { key: number.toString(), value: fibResult.toString() },
            callback,
          ),
        );
      });
      const deleteResp = await fetch(
        `${sqs_url}/messages/${queueId}/handledSuccessfully`,
        { method: "PATCH" },
      );
      if (deleteResp.status === 200) {
        // console.log('deleted');
      }
    } else {
      console.warn("Error in fetcing actions", actionsRes);
    }
  }, 10_000);
}
sqsPolling();

const app = server();
app.post("/api/fib/:number", async (req, res) => {
  const numberParam = req.params?.number;
  if (!numberParam) {
    res.send("Please enter a number in url param");
  }
  const number = parseInt(numberParam);
  if (isNaN(number)) {
    res.send("Please enter a valid number in url param");
  }
  console.log("LS -> backend/fib-calc/src/index.ts:82 -> number: ", number);
  const existsInCache = await promisify((callback: any) =>
    redisClient.has({ key: number.toString() }, callback),
  );
  console.log("exists in cache", existsInCache);
  if (!existsInCache.has) {
    const queueResult = await fetch(`${sqs_url}/messages/produce`, {
      method: "POST",
      body: JSON.stringify({
        queueId: "651bde211bb0d4606e83f025",
        body: number,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Exposed-Headers": "*",
      },
    });
  }
  // console.log('sent to queue', queueResult);
  // const result = fibonacci(number);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Exposed-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Content-Type", "application/json");
  res.json("thanks");
  // console.log('handler', res);
});

app.get("/api/fib/:number", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Exposed-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Content-Type", "application/json");
  // console.log('get result', cache, req.params?.number);
  const num = req.params?.number;
  const existsInCache = await promisify((callback: any) =>
    redisClient.has({ key: num.toString() }, callback),
  );
  console.log("LS -> src/index.ts:125 -> existsInCache: ", existsInCache);

  if (existsInCache.has) {
    res.json({ result: existsInCache.value });
    return;
  }
  res.json({ result: null });
});

app.use((req, res, next) => {
  // console.log('middlewares called');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // console.log('res', res);
  // to call next middlewares
  next?.();
});
app.listen(8001, () => {
  console.log("Server started on port 8001");
});
