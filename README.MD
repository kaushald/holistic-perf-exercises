## HOLISTIC PERFORMANCE TESTING FOR MODERN APPLICATIONS

## FRONT-END PERFORMANCE

### TOOLS

#### LIGHTHOUSE

##### INSTALLATION

```shell
$ npm i -g lighthouse
```

##### RUN SIMPLE TEST

```shell
$ lighthouse --view https://stareast.techwell.com/
```

##### RUN BUDGET TEST - EASY

```shell
$ lighthouse --budgetPath ./budget.easy.json --view https://stareast.techwell.com/
```

##### RUN BUDGET TEST - NORMAL

```shell
$ lighthouse --budgetPath ./budget.json --view https://stareast.techwell.com/
```

##### RUN BUDGET TEST - STRICT

```shell
$ lighthouse --budgetPath ./budget.strict.json --view https://stareast.techwell.com/
```

#### BUDGET CALCULATOR

##### URL

```url
https://www.performancebudget.io/
```

## BACK-END PERFORMANCE

### TOOLS

#### ARTILLERY

##### INSTALLATION

```shell
$ npm install -g artillery@latest
$ npm install -g artillery-plugin-expect
```

##### RUN SIMPLE TEST

```shell
$ artillery run test-00-basic-get.yaml -o report.yml
```

##### RUN TEST WITH POST

```shell
$ artillery run test-01-simple-post.yaml -o report.yml
```

##### RUN TEST WITH CORRELATION/PARAMETERIZATION

```shell
$ artillery run test-02-corr-param.yaml -o report.yml
```

##### GENERATE REPORT

```shell
$ artillery run test-00-basic-get.yaml -o report.yml
```

#### SAMPLE TEST APPLICATION

##### 8086

```shell
$ docker run -d -p 8080:8080 kaushald/leakyserver
```

##### ARM

```shell
$ docker run -d -p 8080:8080 kaushald/leakyserver-arm
```
