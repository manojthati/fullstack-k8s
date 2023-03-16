#!/bin/bash

# This is a default setup script which is solely written to demo the fullstack deployment.
# This hardcoded github repository reference may be chnaged if you have a fork in your account.

app_namespace="welcomedesk"
default_mongo_user="admin"
default_mongo_pass="pass"

if kubectl get secret mongodb-secrets &> /dev/null; then
  echo "Default secret set already exist"
else
  kubectl create secret generic mongodb-secrets \
    --from-literal=username=$default_mongo_user \
    --from-literal=password=$default_mongo_pass \
    -n $app_namespace
  echo "Default secret set created"
fi

if kubectl get namespace "$app_namespace" &> /dev/null; then
  echo "Namespace $app_namespace already exists."
else
  kubectl create namespace "$app_namespace"
  echo "Namespace $app_namespace created."
fi

kubectl config set-context --current --namespace=argocd

argocd app create welcomedesk \
  --repo https://github.com/manojthati/welcomedesk-fullstack-k8s.git \
  --path ./manifests \
  --revision main \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace $app_namespace
