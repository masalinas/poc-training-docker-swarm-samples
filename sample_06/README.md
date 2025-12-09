# Description
Deploy a internal service registry inside the cluster and use it to deploy other services

## Steps to be followed

- **STEP01:**  Deploy Docker Service Registry

Firts we will depploy the Docker Service Registry basic without any security, from manager node:

```
$ docker service create --name registry -p 5000:5000 registry:2
```

Check it:
```
$ curl http://127.0.0.1:5000/v2/
{}
```

- **STEP01:**  Deploy Docker Service Registry