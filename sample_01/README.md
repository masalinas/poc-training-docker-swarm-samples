$ docker exec -it swarm-manager mkdir /sample_01
$ docker cp docker-compose.yaml swarm-manager:/sample_01
$ docker cp html swarm-manager:/sample_01

$ docker exec -it swarm-manager docker stack deploy -d -c /sample_01/docker-compose.yaml my-web
Creating network my-web_default
Creating service my-web_nginx

$ docker exec -it swarm-manager docker stack ls
NAME      SERVICES
my-web    1

$ docker exec -it swarm-manager docker stack services my-web
ID             NAME           MODE         REPLICAS   IMAGE          PORTS
p61wzqkkbrlx   my-web_nginx   replicated   1/1        nginx:latest   *:8099->80/tcp

http://192.168.49.2:8099/


$ docker service scale my-web_nginx=2
my-web_nginx scaled to 2
overall progress: 2 out of 2 tasks 
1/2: running   [==================================================>] 
2/2: running   [==================================================>] 
verify: Service my-web_nginx converged 

$ docker exec -it swarm-manager docker stack rm my-web