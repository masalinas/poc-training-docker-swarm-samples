# Description
Using configs and secrets  in your apps

## Steps

- **STEP_01**: create some configs and secrets in docker swarm
```
$ echo '{"logLevel": "debug"}' | docker config create app_config 
```

```
$ echo "mydbuser" | docker secret create db_user -
$ echo "supersecret" | docker secret create db_pass -
```

- **STEP_02**: compile and push image

```
$ docker build ofertoio/sample-07 .
```

```
$ docker push ofertoio/sample-07 .
```

- **STEP_03**: deploy stack in swarm

```
$ docker stack deploy -c docker-compose.yml sample-07-stack
```