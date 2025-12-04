Install nfs in ubuntu 20 convert as nfs server
$ sudo apt install nfs-kernel-server
$ systemctl status nfs-kernel-server
$ grep nfsd /proc/filesystems

Install nfs utils nfs client
$ sudo apt install nfs-common

Install in container this tools
apk add nfs-utils

mount folder inside each node
$ mount -t nfs -o nolock 192.168.49.5:/data /mnt/shared_volume

From host
$ docker volume create nfsdata

$ docker run -d \
  --name nfs-server \
  --privileged \
  -v nfsdata:/data \
  -e SHARED_DIRECTORY=/data \
  -p 2049:2049 \
  --network minikube \
  itsthenetwork/nfs-server-alpine:latest

$ docker run -d \
  --name nfs-server \
  --privileged \
  -v nfsdata:/data \
  -e SHARED_DIRECTORY=/data \
  \
  -p 2049:2049/tcp -p 2049:2049/udp \
  -p 32765:32765/tcp -p 32765:32765/udp \
  -p 32766:32766/tcp -p 32766:32766/udp \
  -p 32767:32767/tcp -p 32767:32767/udp \
  -p 32768:32768/tcp -p 32768:32768/udp \
  -p 32769:32769/tcp -p 32769:32769/udp \
  \
  --network minikube \
  itsthenetwork/nfs-server-alpine:latest

$ docker run -d \
  --name nfs-server \
  --privileged \
  --network host \
  -v /home/kubernetes/temp/shared-volume:/data \
  -e SHARED_DIRECTORY=/data \
  itsthenetwork/nfs-server-alpine:latest

Inside manager swarm:

  $ docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=10.0.0.50,rw \
  --opt device=:/srv/shared \
  shared_volume