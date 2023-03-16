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



