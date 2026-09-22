## HOLISTIC PERFORMANCE TESTING FOR MODERN APPLICATIONS

## FRONT-END PERFORMANCE

### TOOLS

#### NODEJS

##### INSTALLATION

Download and install from [the official site](https://nodejs.org/).

#### LIGHTHOUSE

##### INSTALLATION

```shell
npm i -g lighthouse
npm i -g lighthouse-ci
```

##### RUN SIMPLE TEST

```shell
lighthouse --view https://kaushaldalvi.com/
```

##### RUN BUDGET TEST - EASY

```shell
lighthouse-ci https://kaushaldalvi.com/ --budgetPath ./budget.easy.json
```

##### RUN BUDGET TEST - NORMAL

```shell
lighthouse-ci https://kaushaldalvi.com/ --budgetPath ./budget.json
```

##### RUN BUDGET TEST - STRICT

```shell
lighthouse-ci https://kaushaldalvi.com/ --budgetPath ./budget.strict.json
```

#### BUDGET CALCULATOR

##### URL

```url
https://www.performancebudget.io/
```

#### LIGHTHOUSE-PARADE

URL: https://github.com/cloudfour/lighthouse-parade

##### Running a parade

```
npx lighthouse-parade https://kaushaldalvi.com/ --max-crawl-depth 2
```

## BACK-END PERFORMANCE

### TOOLS

#### ARTILLERY

##### INSTALLATION

```shell
npm install -g artillery@latest
npm install -g artillery-plugin-expect
```

The Artillery tests target `http://localhost:8080`, so start the leaky server from [SAMPLE TEST APPLICATION](#sample-test-application) first.

##### RUN SIMPLE TEST

```shell
artillery run test-00-basic-get.yaml -o report.json
```

##### RUN TEST WITH POST

```shell
artillery run test-01-simple-post.yaml -o report.json
```

##### RUN TEST WITH CORRELATION/PARAMETERIZATION

This test reads first and last names from `names.csv` and posts one friend per row.

```shell
artillery run test-02-corr-param.yaml --record --key {key}
```

##### VIEW RESULTS

The `artillery report` command has been removed from the Artillery CLI, so there is no local HTML report any more.

For charts, record the run to [Artillery Cloud](https://app.artillery.io/) by adding `--record --key {key}` to any `artillery run` command. The API key comes from your Artillery Cloud account.

The `-o` flag writes a JSON report, which you can query with [jq](https://jqlang.github.io/jq/):

```shell
jq '.aggregate.summaries["http.response_time"]' report.json
```

#### K6

##### INSTALLATION

###### MAC

```
brew install k6
```

###### Windows

```
choco install k6
```

or

```
winget install k6
```

##### RUN TEST WITH CORRELATION/PARAMETERIZATION

This test picks random names from `test_data.json` and posts them to `http://localhost:3000/friends`, so start the NestJs app from [SAMPLE TEST APPLICATION](#sample-test-application) first.

```shell
k6 run k6-test.js
```

#### SAMPLE TEST APPLICATION

The leaky server (port 8080) is the target for the Artillery tests. The NestJs app (port 3000) is the target for the k6 test. The two use different container names, so both can run at the same time.

##### LEAKY SERVER - X86 (AMD64)

```shell
docker run -d -p 8080:8080 --name leaky_server kaushald/leakyserver
```

##### LEAKY SERVER - ARM

```shell
docker run -d -p 8080:8080 --name leaky_server kaushald/leakyserver-arm
```

##### NestJs App (Universal)

```shell
docker run -d -p 3000:3000 --name sample_app kaushald/sample-app
```

##### CLEAN UP

```shell
docker rm -f leaky_server sample_app
```
