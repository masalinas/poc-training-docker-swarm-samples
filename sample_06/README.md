# Description
Deploy a internal service registry inside the cluster and use it to deploy other services

## Steps to be followed

- **STEP01:**  Deploy Docker Service Registry v2

    Firts we will depploy the Docker Service Registry basic without any security, from manager node:

    ```
    $ docker service create --name registry -p 5000:5000 registry:2
    ```

    Check status from host listing the images for example

    ```
    $ curl http://192.168.49.2:5000/v2/_catalog
    {}
    ```

- **STEP02:** Reconfigure docker daemon 
    
    We must configure our host docker engine to use not https service registry connection.

    Create or edit the file `daemon.json` in your host and configure the manager swarm ip like this:

    ```
    $ sudo nano /etc/docker/daemon.json

    {
        "insecure-registries": [
            "192.168.49.2:5000"
        ]
    }
    ```

    Restart host docker engine:

    ```
    $ sudo systemctl restart docker
    ```

- **STEP03:**  Test the app locally compose

    If you don't have virtual env for Python 3.8 install like this:

    ```
    $ sudo apt install python3.8-venv
    ```

    Create the virtual environment and install dependencies and requirement.txt

    $ python3 -m venv .venv
    $ source .venv/bin/activate
    $ pip install redis
    $ pip install flask
    $ pip freeze > requitements.txt

    ```
    $ docker compose up -d
    ```

    browse to:

    ```
    http://localhost:8001
    ```

- **STEP04:**: Push inage to Docker Registry

    Push image to Docker registry in swarm
    ```
    $ docker push 192.168.49.2:5000/stackdemo
    Using default tag: latest
    The push refers to repository [192.168.49.2:5000/stackdemo]
    2e2ddf144e63: Pushed 
    fba013a4adeb: Pushed 
    817fa7f5a4af: Pushed 
    6b49371d7ed7: Pushed 
    50acbb6dc641: Pushed 
    63ca1fbb43ae: Pushed 
    latest: digest: sha256:f45bcce9a139eac8eb39cf484d72260317489588643037e5cb68dd61ac3b71e2 size: 1579
    ```

    List the new image pushed in the registry:

    ```
    $ curl http://192.168.49.2:5000/v2/_catalog
    {"repositories":["stackdemo"]}
    ```

- **STEP05:**: Deploy stack in swarm

    ```
    $ docker exec -it swarm-manager-share docker stack deploy --compose-file docker-compose.yaml stackdemo-stack
    ```