# fullstack-k8s

The application and the controls scripts in this repository is only meant to be used for educational and/or assesment purpose.
This applications will perform good in a __Macintosh Darwin__ machine with Docker as the minikube driver.

---

## Prerequisites
1. Docker : To install docker in your environment, please follow official installation document [here](https://docs.docker.com/desktop/install/mac-install/). Once installed, you may try running `docker -v` command from your terminal. If the installation was successful and the docker desktop is running, the output may be similar to the one below. It can be different as well. No strict version expectancy. 
```
$docker -v
Docker version 20.10.12, build e91ed57
```
2. Minikube: To install minikube in your local environment, please follow the installation document provided in [offical minikube website](https://minikube.sigs.k8s.io/docs/start/). Once installiation is completed following the documentation, you can confirm installation by checking the minikube version with the command `minikube version`. Minikube installation will setup the kubectl configuration automatically to point to your local minikube cluster. You may expect output as similar output as 👇
```
$minikube version
minikube version: v1.29.0
commit: ddac20b4b34a9c8c857fc602203b6ba2679794d3
```
3. ArgoCD: ArgoCD is a declarative GitOps tool that helps to deploy the changes to application in your Kubernetes environment seamlessly. To deploy this application in your local `minikube cluster` and experiment, you may make sure that you have your Argo setup ready. Following the [documentation](https://argo-cd.readthedocs.io/en/stable/#:~:text=Argo%20CD%20is%20implemented%20as,target%20state%20is%20considered%20OutOfSync%20.) from the website will help you setup and run an ArgoCD installation in your cluster. We have also added a bash script that can create an ArgoCD application and map it to the repository to get you started easily.
4. Git: Git is a commandline tool that allows you to manage and operate a source code repository. As you are looking at this page now, you may already be familiar with git. The [installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) can help you if you have got any confusion. To check the git version, type `git --version` in a terminal.

## Application and its components
This repository has got a full stack application in which the frontend is built using ReactJS, the backend in FastAPI and MongoDB as the database. The application acts as a reception record book that can store the name and message from your visitor in the reverse order of their entry.
The application doesn't have a mechanism to authenticate the request as of now as the data stored is public in nature.

## Deploying the application

### In docker using docker compose
As you may have cloned the repo to your machine and you have the docker running in your machine, all you need to do is navigate to the cloned repo and run `docker compose up --build`. You will have the frontend serving on http://localhost:3000 once the image is build successfully. Following snapshot shows the demo UI of application. The visitor entries will be stacked right below the form.

<img width="1052" alt="Screen Shot 2023-03-16 at 12 29 01 AM" src="https://user-images.githubusercontent.com/36253339/225545299-c0c2d20c-7557-4b7b-972b-2389c58cd706.png">

### In your local minikube single node cluster
1. Start your minikube by running `minikube start`
2. Make sure you have ArgoCD environmet running in your minikube cluster
3. git clone the repo by running `git clone https://github.com/manojthati/fullstack-k8s.git` 
4. Navigate in to the locally cloned repo
5. Run `setup_argo.sh` script to add a new ArgoCD welcomedesk application and connect it to the repo to watch for changes.
6. If there is a drift between the manifest files in the github and application in your cluster, ArgoCD will detect the changes and give you sync status as `OutOfSync`. If any node/pods are unhealthy you will be shown the status in the ArgoCD application dashboard.
7. As you see the sync status `OutOfSync`, you can navigate to the application console and `SYNCHRONIZE RESOURCES`
8. Once the synchronization is done, now open your terminal and run the command `minikube tunnel`. Since we are running on local machines network will be different than the production. `minikube tunnel` will enable a proxy to pass all traffic from `127.0.0.1:3000` to the fronend application load balancer service running on the port `3000` inside the cluster. This is essentially a way of port forwarding from the host machine to the node port.
9. Our frontend application will be serving on `http://localhost:3000`
10. Although the frontend is being served to the user, the backend calls from the frontend will not be successful unless we have another proxy to enable the traffic from host to backend service. This is required only in a development environment running in minikube cluster locally. To enable the proxy please run `kubectl port-forward svc/welcomedesk-be -n welcomedesk 8000:8000` and keep the termina running.
11. The user can now submit visitor entry by visiting `http://localhost:3000`, visitors entries will be stacked right below the form.
