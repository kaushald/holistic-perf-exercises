import http from "k6/http";
import { sleep } from "k6";
import { SharedArray } from "k6/data";
import { check } from "k6";

// Load test data from JSON file into a SharedArray to be used by all VUs (virtual users)
const testData = new SharedArray("testData", function () {
  // Parsing the JSON file and mapping each row to an array of firstName and lastName
  return JSON.parse(open("test_data.json")).map((row) => [
    row.firstName,
    row.lastName,
  ]);
});

export const options = {
  stages: [
    // Ramp-up: start with 1 virtual user and increase to 5 over 1 minute
    { duration: "1m", target: 5 },
    // Hold: maintain 5 virtual users for 2 minutes
    { duration: "2m", target: 5 },
    // Ramp-down: decrease from 5 virtual users to 0 over 1 minute
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    // Set a threshold that 95% of the requests should complete within 500ms
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  // Select a random set of firstName and lastName from the test data
  const [firstName, lastName] =
    testData[Math.floor(Math.random() * testData.length)];

  // Define the target URL for the POST request
  const url = "http://localhost:3000/friends";

  // Prepare the payload for the POST request, converting it to JSON
  const payload = JSON.stringify({
    firstName,
    lastName,
  });

  // Set the headers for the HTTP request
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Send the POST request and store the response
  const res = http.post(url, payload, params);

  // Validate the response status is 201 (Created)
  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  // Parse the response body to access the returned data
  const responseBody = JSON.parse(res.body);

  // Extract the first name, last name, and link from the response
  const retrievedFirstName = responseBody.firstName;
  const retrievedLastName = responseBody.lastName;
  const friendLink = responseBody._links.self.href;

  // Log the creation of the friend entry
  console.log(`Created friend ${firstName} ${lastName} at ${friendLink}`);

  // Check if the sent and received names match, and log the result
  if (retrievedFirstName === firstName && retrievedLastName === lastName) {
    console.log("Names match");
  }

  // Pause for 0.1 seconds between iterations to simulate a realistic user wait time
  sleep(0.1);
}
