import http from "k6/http";
import { sleep } from "k6";
import { SharedArray } from "k6/data";
import { check } from "k6";

// Load test data from JSON file
const testData = new SharedArray("testData", function () {
  return JSON.parse(open("test_data.json")).map((row) => [
    row.firstName,
    row.lastName,
  ]);
});

export const options = {
  iterations: 50,
  vus: 5, // Adjust this value based on your desired number of virtual users
};

// export const options = {
//   stages: [
//     // Ramp-up from 1 to 10 virtual users over 1 minute
//     { duration: "1m", target: 2 },
//     // Stay at 10 virtual users for 4 minutes
//     { duration: "3m", target: 2 },
//     // Ramp-down from 10 to 0 virtual users over 1 minute
//     { duration: "1m", target: 0 },
//   ],
//   thresholds: {
//     http_req_duration: ["p(95)<500"],
//   },
// };

export default function () {
  const [firstName, lastName] =
    testData[Math.floor(Math.random() * testData.length)];

  const url = "http://localhost:8080/friend";
  const payload = JSON.stringify({
    firstName,
    lastName,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  // const responseBody = JSON.parse(res.body);
  // const friendLink = responseBody._links.friend.href;
  // console.log(`Created friend ${firstName} ${lastName} at ${friendLink}`);

  console.log(
    `Created friend entry for ${firstName} ${lastName} at ${res.headers["Location"]}`
  );

  sleep(4);
}
