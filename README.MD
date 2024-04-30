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
lighthouse-ci --budgetPath ./budget.easy.json --view https://kaushaldalvi.com/
```

##### RUN BUDGET TEST - NORMAL

```shell
lighthouse-ci --budgetPath ./budget.json --view https://kaushaldalvi.com/
```

##### RUN BUDGET TEST - STRICT

```shell
lighthouse-ci --budgetPath ./budget.strict.json --view https://kaushaldalvi.com/
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

##### RUN SIMPLE TEST

```shell
artillery run test-00-basic-get.yaml -o report.yml
```

##### RUN TEST WITH POST

```shell
artillery run test-01-simple-post.yaml -o report.yml
```

##### RUN TEST WITH CORRELATION/PARAMETERIZATION

```shell
artillery run test-02-corr-param.yaml --record --key {key}
```

##### GENERATE REPORT

```shell
artillery report report.yml
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

```shell
k6 run k6-test.js
```

#### SAMPLE TEST APPLICATION

##### 8086

```shell
docker run -d -p 8080:8080 --name test_app kaushald/leakyserver
```

##### ARM

```shell
docker run -d -p 8080:8080 --name test_app kaushald/leakyserver-arm
```
